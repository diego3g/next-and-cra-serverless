'use strict';

var serdePlugin = require('./serdePlugin-281f3123.js');
var index = require('./index-b67069db.js');

/**
 * Builds a proper UTC HttpDate timestamp from a Date object
 * since not all environments will have this as the expected
 * format.
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toUTCString
 * > Prior to ECMAScript 2018, the format of the return value
 * > varied according to the platform. The most common return
 * > value was an RFC-1123 formatted date stamp, which is a
 * > slightly updated version of RFC-822 date stamps.
 */
// Build indexes outside so we allocate them once.
var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// prettier-ignore
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function dateToUtcString(date) {
    var year = date.getUTCFullYear();
    var month = date.getUTCMonth();
    var dayOfWeek = date.getUTCDay();
    var dayOfMonthInt = date.getUTCDate();
    var hoursInt = date.getUTCHours();
    var minutesInt = date.getUTCMinutes();
    var secondsInt = date.getUTCSeconds();
    // Build 0 prefixed strings for contents that need to be
    // two digits and where we get an integer back.
    var dayOfMonthString = dayOfMonthInt < 10 ? "0" + dayOfMonthInt : "" + dayOfMonthInt;
    var hoursString = hoursInt < 10 ? "0" + hoursInt : "" + hoursInt;
    var minutesString = minutesInt < 10 ? "0" + minutesInt : "" + minutesInt;
    var secondsString = secondsInt < 10 ? "0" + secondsInt : "" + secondsInt;
    return days[dayOfWeek] + ", " + dayOfMonthString + " " + months[month] + " " + year + " " + hoursString + ":" + minutesString + ":" + secondsString + " GMT";
}

var DOMAIN_PATTERN = /^[a-z0-9][a-z0-9\.\-]{1,61}[a-z0-9]$/;
var IP_ADDRESS_PATTERN = /(\d+\.){3}\d+/;
var DOTS_PATTERN = /\.\./;
var DOT_PATTERN = /\./;
var S3_HOSTNAME_PATTERN = /^(.+\.)?s3[.-]([a-z0-9-]+)\./;
var S3_US_EAST_1_ALTNAME_PATTERN = /^s3(-external-1)?\.amazonaws\.com$/;
var AWS_PARTITION_SUFFIX = "amazonaws.com";
var isBucketNameOptions = function (options) { return typeof options.bucketName === "string"; };
/**
 * Get pseudo region from supplied region. For example, if supplied with `fips-us-west-2`, it returns `us-west-2`.
 * @internal
 */
var getPseudoRegion = function (region) { return (isFipsRegion(region) ? region.replace(/fips-|-fips/, "") : region); };
/**
 * Determines whether a given string is DNS compliant per the rules outlined by
 * S3. Length, capitaization, and leading dot restrictions are enforced by the
 * DOMAIN_PATTERN regular expression.
 * @internal
 *
 * @see https://docs.aws.amazon.com/AmazonS3/latest/dev/BucketRestrictions.html
 */
var isDnsCompatibleBucketName = function (bucketName) {
    return DOMAIN_PATTERN.test(bucketName) && !IP_ADDRESS_PATTERN.test(bucketName) && !DOTS_PATTERN.test(bucketName);
};
var getRegionalSuffix = function (hostname) {
    var parts = hostname.match(S3_HOSTNAME_PATTERN);
    return [parts[2], hostname.replace(new RegExp("^" + parts[0]), "")];
};
var getSuffix = function (hostname) {
    return S3_US_EAST_1_ALTNAME_PATTERN.test(hostname) ? ["us-east-1", AWS_PARTITION_SUFFIX] : getRegionalSuffix(hostname);
};
/**
 * Infer region and hostname suffix from a complete hostname
 * @internal
 * @param hostname - Hostname
 * @returns [Region, Hostname suffix]
 */
var getSuffixForArnEndpoint = function (hostname) {
    return S3_US_EAST_1_ALTNAME_PATTERN.test(hostname)
        ? [hostname.replace("." + AWS_PARTITION_SUFFIX, ""), AWS_PARTITION_SUFFIX]
        : getRegionalSuffix(hostname);
};
var validateArnEndpointOptions = function (options) {
    if (options.pathStyleEndpoint) {
        throw new Error("Path-style S3 endpoint is not supported when bucket is an ARN");
    }
    if (options.accelerateEndpoint) {
        throw new Error("Accelerate endpoint is not supported when bucket is an ARN");
    }
    if (!options.tlsCompatible) {
        throw new Error("HTTPS is required when bucket is an ARN");
    }
};
var validateService = function (service) {
    if (service !== "s3" && service !== "s3-outposts" && service !== "s3-object-lambda") {
        throw new Error("Expect 's3' or 's3-outposts' or 's3-object-lambda' in ARN service component");
    }
};
var validateS3Service = function (service) {
    if (service !== "s3") {
        throw new Error("Expect 's3' in Accesspoint ARN service component");
    }
};
var validateOutpostService = function (service) {
    if (service !== "s3-outposts") {
        throw new Error("Expect 's3-posts' in Outpost ARN service component");
    }
};
/**
 * Validate partition inferred from ARN is the same to `options.clientPartition`.
 * @internal
 */
var validatePartition = function (partition, options) {
    if (partition !== options.clientPartition) {
        throw new Error("Partition in ARN is incompatible, got \"" + partition + "\" but expected \"" + options.clientPartition + "\"");
    }
};
/**
 * validate region value inferred from ARN. If `options.useArnRegion` is set, it validates the region is not a FIPS
 * region. If `options.useArnRegion` is unset, it validates the region is equal to `options.clientRegion` or
 * `options.clientSigningRegion`.
 * @internal
 */
var validateRegion = function (region, options) {
    if (region === "") {
        throw new Error("ARN region is empty");
    }
    if (isFipsRegion(options.clientRegion)) {
        if (!options.allowFipsRegion) {
            throw new Error("FIPS region is not supported");
        }
        else if (!isEqualRegions(region, options.clientRegion)) {
            throw new Error("Client FIPS region " + options.clientRegion + " doesn't match region " + region + " in ARN");
        }
    }
    if (!options.useArnRegion &&
        !isEqualRegions(region, options.clientRegion) &&
        !isEqualRegions(region, options.clientSigningRegion)) {
        throw new Error("Region in ARN is incompatible, got " + region + " but expected " + options.clientRegion);
    }
};
/**
 *
 * @param region
 */
var validateRegionalClient = function (region) {
    if (["s3-external-1", "aws-global"].includes(getPseudoRegion(region))) {
        throw new Error("Client region " + region + " is not regional");
    }
};
/**
 * @internal
 */
var isFipsRegion = function (region) { return region.startsWith("fips-") || region.endsWith("-fips"); };
var isEqualRegions = function (regionA, regionB) {
    return regionA === regionB || getPseudoRegion(regionA) === regionB || regionA === getPseudoRegion(regionB);
};
/**
 * Validate an account ID
 * @internal
 */
var validateAccountId = function (accountId) {
    if (!/[0-9]{12}/.exec(accountId)) {
        throw new Error("Access point ARN accountID does not match regex '[0-9]{12}'");
    }
};
/**
 * Validate a host label according to https://tools.ietf.org/html/rfc3986#section-3.2.2
 * @internal
 */
var validateDNSHostLabel = function (label, options) {
    if (options === void 0) { options = { tlsCompatible: true }; }
    // reference: https://tools.ietf.org/html/rfc3986#section-3.2.2
    if (label.length >= 64 ||
        !/^[a-z0-9][a-z0-9.-]+[a-z0-9]$/.test(label) ||
        /(\d+\.){3}\d+/.test(label) ||
        /[.-]{2}/.test(label) ||
        ((options === null || options === void 0 ? void 0 : options.tlsCompatible) && DOT_PATTERN.test(label))) {
        throw new Error("Invalid DNS label " + label);
    }
};
/**
 * Validate and parse an Access Point ARN or Outposts ARN
 * @internal
 *
 * @param resource - The resource section of an ARN
 * @returns Access Point Name and optional Outpost ID.
 */
var getArnResources = function (resource) {
    var delimiter = resource.includes(":") ? ":" : "/";
    var _a = serdePlugin.__read(resource.split(delimiter)), resourceType = _a[0], rest = _a.slice(1);
    if (resourceType === "accesspoint") {
        // Parse accesspoint ARN
        if (rest.length !== 1 || rest[0] === "") {
            throw new Error("Access Point ARN should have one resource accesspoint" + delimiter + "{accesspointname}");
        }
        return { accesspointName: rest[0] };
    }
    else if (resourceType === "outpost") {
        // Parse outpost ARN
        if (!rest[0] || rest[1] !== "accesspoint" || !rest[2] || rest.length !== 3) {
            throw new Error("Outpost ARN should have resource outpost" + delimiter + "{outpostId}" + delimiter + "accesspoint" + delimiter + "{accesspointName}");
        }
        var _b = serdePlugin.__read(rest, 3), outpostId = _b[0]; _b[1]; var accesspointName = _b[2];
        return { outpostId: outpostId, accesspointName: accesspointName };
    }
    else {
        throw new Error("ARN resource should begin with 'accesspoint" + delimiter + "' or 'outpost" + delimiter + "'");
    }
};
/**
 * Throw if dual stack configuration is set to true.
 * @internal
 */
var validateNoDualstack = function (dualstackEndpoint) {
    if (dualstackEndpoint)
        throw new Error("Dualstack endpoint is not supported with Outpost");
};
/**
 * Validate region is not appended or prepended with a `fips-`
 * @internal
 */
var validateNoFIPS = function (region) {
    if (isFipsRegion(region !== null && region !== void 0 ? region : ""))
        throw new Error("FIPS region is not supported with Outpost, got " + region);
};

var bucketHostname = function (options) {
    var isCustomEndpoint = options.isCustomEndpoint; options.baseHostname; var dualstackEndpoint = options.dualstackEndpoint, accelerateEndpoint = options.accelerateEndpoint;
    if (isCustomEndpoint) {
        if (dualstackEndpoint)
            throw new Error("Dualstack endpoint is not supported with custom endpoint");
        if (accelerateEndpoint)
            throw new Error("Accelerate endpoint is not supported with custom endpoint");
    }
    return isBucketNameOptions(options)
        ? // Construct endpoint when bucketName is a string referring to a bucket name
            getEndpointFromBucketName(serdePlugin.__assign(serdePlugin.__assign({}, options), { isCustomEndpoint: isCustomEndpoint }))
        : // Construct endpoint when bucketName is an ARN referring to an S3 resource like Access Point
            getEndpointFromArn(serdePlugin.__assign(serdePlugin.__assign({}, options), { isCustomEndpoint: isCustomEndpoint }));
};
var getEndpointFromArn = function (options) {
    var isCustomEndpoint = options.isCustomEndpoint, baseHostname = options.baseHostname, clientRegion = options.clientRegion;
    var hostnameSuffix = isCustomEndpoint ? baseHostname : getSuffixForArnEndpoint(baseHostname)[1];
    var pathStyleEndpoint = options.pathStyleEndpoint, _a = options.dualstackEndpoint, dualstackEndpoint = _a === void 0 ? false : _a, _b = options.accelerateEndpoint, accelerateEndpoint = _b === void 0 ? false : _b, _c = options.tlsCompatible, tlsCompatible = _c === void 0 ? true : _c, useArnRegion = options.useArnRegion, bucketName = options.bucketName, _d = options.clientPartition, clientPartition = _d === void 0 ? "aws" : _d, _e = options.clientSigningRegion, clientSigningRegion = _e === void 0 ? clientRegion : _e;
    validateArnEndpointOptions({ pathStyleEndpoint: pathStyleEndpoint, accelerateEndpoint: accelerateEndpoint, tlsCompatible: tlsCompatible });
    // Validate and parse the ARN supplied as a bucket name
    var service = bucketName.service, partition = bucketName.partition, accountId = bucketName.accountId, region = bucketName.region, resource = bucketName.resource;
    validateService(service);
    validatePartition(partition, { clientPartition: clientPartition });
    validateAccountId(accountId);
    validateRegionalClient(clientRegion);
    var _f = getArnResources(resource), accesspointName = _f.accesspointName, outpostId = _f.outpostId;
    var DNSHostLabel = accesspointName + "-" + accountId;
    validateDNSHostLabel(DNSHostLabel, { tlsCompatible: tlsCompatible });
    var endpointRegion = useArnRegion ? region : clientRegion;
    var signingRegion = useArnRegion ? region : clientSigningRegion;
    if (service === "s3-object-lambda") {
        validateRegion(region, { useArnRegion: useArnRegion, clientRegion: clientRegion, clientSigningRegion: clientSigningRegion, allowFipsRegion: true });
        validateNoDualstack(dualstackEndpoint);
        return {
            bucketEndpoint: true,
            hostname: DNSHostLabel + "." + service + (isFipsRegion(clientRegion) ? "-fips" : "") + "." + getPseudoRegion(endpointRegion) + "." + hostnameSuffix,
            signingRegion: signingRegion,
            signingService: service,
        };
    }
    else if (outpostId) {
        // if this is an Outpost ARN
        validateRegion(region, { useArnRegion: useArnRegion, clientRegion: clientRegion, clientSigningRegion: clientSigningRegion });
        validateOutpostService(service);
        validateDNSHostLabel(outpostId, { tlsCompatible: tlsCompatible });
        validateNoDualstack(dualstackEndpoint);
        validateNoFIPS(endpointRegion);
        var hostnamePrefix_1 = DNSHostLabel + "." + outpostId;
        return {
            bucketEndpoint: true,
            hostname: "" + hostnamePrefix_1 + (isCustomEndpoint ? "" : ".s3-outposts." + endpointRegion) + "." + hostnameSuffix,
            signingRegion: signingRegion,
            signingService: "s3-outposts",
        };
    }
    // construct endpoint from Accesspoint ARN
    validateRegion(region, { useArnRegion: useArnRegion, clientRegion: clientRegion, clientSigningRegion: clientSigningRegion, allowFipsRegion: true });
    validateS3Service(service);
    var hostnamePrefix = "" + DNSHostLabel;
    return {
        bucketEndpoint: true,
        hostname: "" + hostnamePrefix + (isCustomEndpoint
            ? ""
            : ".s3-accesspoint" + (isFipsRegion(clientRegion) ? "-fips" : "") + (dualstackEndpoint ? ".dualstack" : "") + "." + getPseudoRegion(endpointRegion)) + "." + hostnameSuffix,
        signingRegion: signingRegion,
    };
};
var getEndpointFromBucketName = function (_a) {
    var _b = _a.accelerateEndpoint, accelerateEndpoint = _b === void 0 ? false : _b, region = _a.clientRegion, baseHostname = _a.baseHostname, bucketName = _a.bucketName, _c = _a.dualstackEndpoint, dualstackEndpoint = _c === void 0 ? false : _c, _d = _a.pathStyleEndpoint, pathStyleEndpoint = _d === void 0 ? false : _d, _e = _a.tlsCompatible, tlsCompatible = _e === void 0 ? true : _e, _f = _a.isCustomEndpoint, isCustomEndpoint = _f === void 0 ? false : _f;
    var _g = serdePlugin.__read(isCustomEndpoint ? [region, baseHostname] : getSuffix(baseHostname), 2), clientRegion = _g[0], hostnameSuffix = _g[1];
    if (pathStyleEndpoint || !isDnsCompatibleBucketName(bucketName) || (tlsCompatible && DOT_PATTERN.test(bucketName))) {
        return {
            bucketEndpoint: false,
            hostname: dualstackEndpoint ? "s3.dualstack." + clientRegion + "." + hostnameSuffix : baseHostname,
        };
    }
    if (accelerateEndpoint) {
        baseHostname = "s3-accelerate" + (dualstackEndpoint ? ".dualstack" : "") + "." + hostnameSuffix;
    }
    else if (dualstackEndpoint) {
        baseHostname = "s3.dualstack." + clientRegion + "." + hostnameSuffix;
    }
    return {
        bucketEndpoint: true,
        hostname: bucketName + "." + baseHostname,
    };
};

var bucketEndpointMiddleware = function (options) {
    return function (next, context) {
        return function (args) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
            var bucketName, replaceBucketInPath, request, bucketArn, clientRegion, _a, _b, partition, _c, signingRegion, useArnRegion, _d, hostname, bucketEndpoint, modifiedSigningRegion, signingService, clientRegion, _e, _f, hostname, bucketEndpoint;
            return serdePlugin.__generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        bucketName = args.input.Bucket;
                        replaceBucketInPath = options.bucketEndpoint;
                        request = args.request;
                        if (!serdePlugin.HttpRequest.isInstance(request)) return [3 /*break*/, 8];
                        if (!options.bucketEndpoint) return [3 /*break*/, 1];
                        request.hostname = bucketName;
                        return [3 /*break*/, 7];
                    case 1:
                        if (!index.validate(bucketName)) return [3 /*break*/, 5];
                        bucketArn = index.parse(bucketName);
                        _a = getPseudoRegion;
                        return [4 /*yield*/, options.region()];
                    case 2:
                        clientRegion = _a.apply(void 0, [_g.sent()]);
                        return [4 /*yield*/, options.regionInfoProvider(clientRegion)];
                    case 3:
                        _b = (_g.sent()) || {}, partition = _b.partition, _c = _b.signingRegion, signingRegion = _c === void 0 ? clientRegion : _c;
                        return [4 /*yield*/, options.useArnRegion()];
                    case 4:
                        useArnRegion = _g.sent();
                        _d = bucketHostname({
                            bucketName: bucketArn,
                            baseHostname: request.hostname,
                            accelerateEndpoint: options.useAccelerateEndpoint,
                            dualstackEndpoint: options.useDualstackEndpoint,
                            pathStyleEndpoint: options.forcePathStyle,
                            tlsCompatible: request.protocol === "https:",
                            useArnRegion: useArnRegion,
                            clientPartition: partition,
                            clientSigningRegion: signingRegion,
                            clientRegion: clientRegion,
                            isCustomEndpoint: options.isCustomEndpoint,
                        }), hostname = _d.hostname, bucketEndpoint = _d.bucketEndpoint, modifiedSigningRegion = _d.signingRegion, signingService = _d.signingService;
                        // If the request needs to use a region or service name inferred from ARN that different from client region, we
                        // need to set them in the handler context so the signer will use them
                        if (modifiedSigningRegion && modifiedSigningRegion !== signingRegion) {
                            context["signing_region"] = modifiedSigningRegion;
                        }
                        if (signingService && signingService !== "s3") {
                            context["signing_service"] = signingService;
                        }
                        request.hostname = hostname;
                        replaceBucketInPath = bucketEndpoint;
                        return [3 /*break*/, 7];
                    case 5:
                        _e = getPseudoRegion;
                        return [4 /*yield*/, options.region()];
                    case 6:
                        clientRegion = _e.apply(void 0, [_g.sent()]);
                        _f = bucketHostname({
                            bucketName: bucketName,
                            clientRegion: clientRegion,
                            baseHostname: request.hostname,
                            accelerateEndpoint: options.useAccelerateEndpoint,
                            dualstackEndpoint: options.useDualstackEndpoint,
                            pathStyleEndpoint: options.forcePathStyle,
                            tlsCompatible: request.protocol === "https:",
                            isCustomEndpoint: options.isCustomEndpoint,
                        }), hostname = _f.hostname, bucketEndpoint = _f.bucketEndpoint;
                        request.hostname = hostname;
                        replaceBucketInPath = bucketEndpoint;
                        _g.label = 7;
                    case 7:
                        if (replaceBucketInPath) {
                            request.path = request.path.replace(/^(\/)?[^\/]+/, "");
                            if (request.path === "") {
                                request.path = "/";
                            }
                        }
                        _g.label = 8;
                    case 8: return [2 /*return*/, next(serdePlugin.__assign(serdePlugin.__assign({}, args), { request: request }))];
                }
            });
        }); };
    };
};
var bucketEndpointMiddlewareOptions = {
    tags: ["BUCKET_ENDPOINT"],
    name: "bucketEndpointMiddleware",
    relation: "before",
    toMiddleware: "hostHeaderMiddleware",
    override: true,
};
var getBucketEndpointPlugin = function (options) { return ({
    applyToStack: function (clientStack) {
        clientStack.addRelativeTo(bucketEndpointMiddleware(options), bucketEndpointMiddlewareOptions);
    },
}); };

var AbortIncompleteMultipartUpload;
(function (AbortIncompleteMultipartUpload) {
    /**
     * @internal
     */
    AbortIncompleteMultipartUpload.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(AbortIncompleteMultipartUpload || (AbortIncompleteMultipartUpload = {}));
var AbortMultipartUploadOutput;
(function (AbortMultipartUploadOutput) {
    /**
     * @internal
     */
    AbortMultipartUploadOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(AbortMultipartUploadOutput || (AbortMultipartUploadOutput = {}));
var AbortMultipartUploadRequest;
(function (AbortMultipartUploadRequest) {
    /**
     * @internal
     */
    AbortMultipartUploadRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(AbortMultipartUploadRequest || (AbortMultipartUploadRequest = {}));
var NoSuchUpload;
(function (NoSuchUpload) {
    /**
     * @internal
     */
    NoSuchUpload.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(NoSuchUpload || (NoSuchUpload = {}));
var AccelerateConfiguration;
(function (AccelerateConfiguration) {
    /**
     * @internal
     */
    AccelerateConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(AccelerateConfiguration || (AccelerateConfiguration = {}));
var Grantee;
(function (Grantee) {
    /**
     * @internal
     */
    Grantee.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Grantee || (Grantee = {}));
var Grant;
(function (Grant) {
    /**
     * @internal
     */
    Grant.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Grant || (Grant = {}));
var Owner;
(function (Owner) {
    /**
     * @internal
     */
    Owner.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Owner || (Owner = {}));
var AccessControlPolicy;
(function (AccessControlPolicy) {
    /**
     * @internal
     */
    AccessControlPolicy.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(AccessControlPolicy || (AccessControlPolicy = {}));
var AccessControlTranslation;
(function (AccessControlTranslation) {
    /**
     * @internal
     */
    AccessControlTranslation.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(AccessControlTranslation || (AccessControlTranslation = {}));
var CompleteMultipartUploadOutput;
(function (CompleteMultipartUploadOutput) {
    /**
     * @internal
     */
    CompleteMultipartUploadOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.SSEKMSKeyId && { SSEKMSKeyId: serdePlugin.SENSITIVE_STRING }),
    });
})(CompleteMultipartUploadOutput || (CompleteMultipartUploadOutput = {}));
var CompletedPart;
(function (CompletedPart) {
    /**
     * @internal
     */
    CompletedPart.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CompletedPart || (CompletedPart = {}));
var CompletedMultipartUpload;
(function (CompletedMultipartUpload) {
    /**
     * @internal
     */
    CompletedMultipartUpload.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CompletedMultipartUpload || (CompletedMultipartUpload = {}));
var CompleteMultipartUploadRequest;
(function (CompleteMultipartUploadRequest) {
    /**
     * @internal
     */
    CompleteMultipartUploadRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CompleteMultipartUploadRequest || (CompleteMultipartUploadRequest = {}));
var CopyObjectResult;
(function (CopyObjectResult) {
    /**
     * @internal
     */
    CopyObjectResult.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CopyObjectResult || (CopyObjectResult = {}));
var CopyObjectOutput;
(function (CopyObjectOutput) {
    /**
     * @internal
     */
    CopyObjectOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.SSEKMSKeyId && { SSEKMSKeyId: serdePlugin.SENSITIVE_STRING }),
        ...(obj.SSEKMSEncryptionContext && { SSEKMSEncryptionContext: serdePlugin.SENSITIVE_STRING }),
    });
})(CopyObjectOutput || (CopyObjectOutput = {}));
var CopyObjectRequest;
(function (CopyObjectRequest) {
    /**
     * @internal
     */
    CopyObjectRequest.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.SSECustomerKey && { SSECustomerKey: serdePlugin.SENSITIVE_STRING }),
        ...(obj.SSEKMSKeyId && { SSEKMSKeyId: serdePlugin.SENSITIVE_STRING }),
        ...(obj.SSEKMSEncryptionContext && { SSEKMSEncryptionContext: serdePlugin.SENSITIVE_STRING }),
        ...(obj.CopySourceSSECustomerKey && { CopySourceSSECustomerKey: serdePlugin.SENSITIVE_STRING }),
    });
})(CopyObjectRequest || (CopyObjectRequest = {}));
var ObjectNotInActiveTierError;
(function (ObjectNotInActiveTierError) {
    /**
     * @internal
     */
    ObjectNotInActiveTierError.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ObjectNotInActiveTierError || (ObjectNotInActiveTierError = {}));
var BucketAlreadyExists;
(function (BucketAlreadyExists) {
    /**
     * @internal
     */
    BucketAlreadyExists.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(BucketAlreadyExists || (BucketAlreadyExists = {}));
var BucketAlreadyOwnedByYou;
(function (BucketAlreadyOwnedByYou) {
    /**
     * @internal
     */
    BucketAlreadyOwnedByYou.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(BucketAlreadyOwnedByYou || (BucketAlreadyOwnedByYou = {}));
var CreateBucketOutput;
(function (CreateBucketOutput) {
    /**
     * @internal
     */
    CreateBucketOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateBucketOutput || (CreateBucketOutput = {}));
var CreateBucketConfiguration;
(function (CreateBucketConfiguration) {
    /**
     * @internal
     */
    CreateBucketConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateBucketConfiguration || (CreateBucketConfiguration = {}));
var CreateBucketRequest;
(function (CreateBucketRequest) {
    /**
     * @internal
     */
    CreateBucketRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateBucketRequest || (CreateBucketRequest = {}));
var CreateMultipartUploadOutput;
(function (CreateMultipartUploadOutput) {
    /**
     * @internal
     */
    CreateMultipartUploadOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.SSEKMSKeyId && { SSEKMSKeyId: serdePlugin.SENSITIVE_STRING }),
        ...(obj.SSEKMSEncryptionContext && { SSEKMSEncryptionContext: serdePlugin.SENSITIVE_STRING }),
    });
})(CreateMultipartUploadOutput || (CreateMultipartUploadOutput = {}));
var CreateMultipartUploadRequest;
(function (CreateMultipartUploadRequest) {
    /**
     * @internal
     */
    CreateMultipartUploadRequest.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.SSECustomerKey && { SSECustomerKey: serdePlugin.SENSITIVE_STRING }),
        ...(obj.SSEKMSKeyId && { SSEKMSKeyId: serdePlugin.SENSITIVE_STRING }),
        ...(obj.SSEKMSEncryptionContext && { SSEKMSEncryptionContext: serdePlugin.SENSITIVE_STRING }),
    });
})(CreateMultipartUploadRequest || (CreateMultipartUploadRequest = {}));
var DeleteBucketRequest;
(function (DeleteBucketRequest) {
    /**
     * @internal
     */
    DeleteBucketRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteBucketRequest || (DeleteBucketRequest = {}));
var DeleteBucketAnalyticsConfigurationRequest;
(function (DeleteBucketAnalyticsConfigurationRequest) {
    /**
     * @internal
     */
    DeleteBucketAnalyticsConfigurationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteBucketAnalyticsConfigurationRequest || (DeleteBucketAnalyticsConfigurationRequest = {}));
var DeleteBucketCorsRequest;
(function (DeleteBucketCorsRequest) {
    /**
     * @internal
     */
    DeleteBucketCorsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteBucketCorsRequest || (DeleteBucketCorsRequest = {}));
var DeleteBucketEncryptionRequest;
(function (DeleteBucketEncryptionRequest) {
    /**
     * @internal
     */
    DeleteBucketEncryptionRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteBucketEncryptionRequest || (DeleteBucketEncryptionRequest = {}));
var DeleteBucketIntelligentTieringConfigurationRequest;
(function (DeleteBucketIntelligentTieringConfigurationRequest) {
    /**
     * @internal
     */
    DeleteBucketIntelligentTieringConfigurationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteBucketIntelligentTieringConfigurationRequest || (DeleteBucketIntelligentTieringConfigurationRequest = {}));
var DeleteBucketInventoryConfigurationRequest;
(function (DeleteBucketInventoryConfigurationRequest) {
    /**
     * @internal
     */
    DeleteBucketInventoryConfigurationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteBucketInventoryConfigurationRequest || (DeleteBucketInventoryConfigurationRequest = {}));
var DeleteBucketLifecycleRequest;
(function (DeleteBucketLifecycleRequest) {
    /**
     * @internal
     */
    DeleteBucketLifecycleRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteBucketLifecycleRequest || (DeleteBucketLifecycleRequest = {}));
var DeleteBucketMetricsConfigurationRequest;
(function (DeleteBucketMetricsConfigurationRequest) {
    /**
     * @internal
     */
    DeleteBucketMetricsConfigurationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteBucketMetricsConfigurationRequest || (DeleteBucketMetricsConfigurationRequest = {}));
var DeleteBucketOwnershipControlsRequest;
(function (DeleteBucketOwnershipControlsRequest) {
    /**
     * @internal
     */
    DeleteBucketOwnershipControlsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteBucketOwnershipControlsRequest || (DeleteBucketOwnershipControlsRequest = {}));
var DeleteBucketPolicyRequest;
(function (DeleteBucketPolicyRequest) {
    /**
     * @internal
     */
    DeleteBucketPolicyRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteBucketPolicyRequest || (DeleteBucketPolicyRequest = {}));
var DeleteBucketReplicationRequest;
(function (DeleteBucketReplicationRequest) {
    /**
     * @internal
     */
    DeleteBucketReplicationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteBucketReplicationRequest || (DeleteBucketReplicationRequest = {}));
var DeleteBucketTaggingRequest;
(function (DeleteBucketTaggingRequest) {
    /**
     * @internal
     */
    DeleteBucketTaggingRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteBucketTaggingRequest || (DeleteBucketTaggingRequest = {}));
var DeleteBucketWebsiteRequest;
(function (DeleteBucketWebsiteRequest) {
    /**
     * @internal
     */
    DeleteBucketWebsiteRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteBucketWebsiteRequest || (DeleteBucketWebsiteRequest = {}));
var DeleteObjectOutput;
(function (DeleteObjectOutput) {
    /**
     * @internal
     */
    DeleteObjectOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteObjectOutput || (DeleteObjectOutput = {}));
var DeleteObjectRequest;
(function (DeleteObjectRequest) {
    /**
     * @internal
     */
    DeleteObjectRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteObjectRequest || (DeleteObjectRequest = {}));
var DeletedObject;
(function (DeletedObject) {
    /**
     * @internal
     */
    DeletedObject.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeletedObject || (DeletedObject = {}));
var _Error;
(function (_Error) {
    /**
     * @internal
     */
    _Error.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(_Error || (_Error = {}));
var DeleteObjectsOutput;
(function (DeleteObjectsOutput) {
    /**
     * @internal
     */
    DeleteObjectsOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteObjectsOutput || (DeleteObjectsOutput = {}));
var ObjectIdentifier;
(function (ObjectIdentifier) {
    /**
     * @internal
     */
    ObjectIdentifier.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ObjectIdentifier || (ObjectIdentifier = {}));
var Delete;
(function (Delete) {
    /**
     * @internal
     */
    Delete.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Delete || (Delete = {}));
var DeleteObjectsRequest;
(function (DeleteObjectsRequest) {
    /**
     * @internal
     */
    DeleteObjectsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteObjectsRequest || (DeleteObjectsRequest = {}));
var DeleteObjectTaggingOutput;
(function (DeleteObjectTaggingOutput) {
    /**
     * @internal
     */
    DeleteObjectTaggingOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteObjectTaggingOutput || (DeleteObjectTaggingOutput = {}));
var DeleteObjectTaggingRequest;
(function (DeleteObjectTaggingRequest) {
    /**
     * @internal
     */
    DeleteObjectTaggingRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteObjectTaggingRequest || (DeleteObjectTaggingRequest = {}));
var DeletePublicAccessBlockRequest;
(function (DeletePublicAccessBlockRequest) {
    /**
     * @internal
     */
    DeletePublicAccessBlockRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeletePublicAccessBlockRequest || (DeletePublicAccessBlockRequest = {}));
var GetBucketAccelerateConfigurationOutput;
(function (GetBucketAccelerateConfigurationOutput) {
    /**
     * @internal
     */
    GetBucketAccelerateConfigurationOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketAccelerateConfigurationOutput || (GetBucketAccelerateConfigurationOutput = {}));
var GetBucketAccelerateConfigurationRequest;
(function (GetBucketAccelerateConfigurationRequest) {
    /**
     * @internal
     */
    GetBucketAccelerateConfigurationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketAccelerateConfigurationRequest || (GetBucketAccelerateConfigurationRequest = {}));
var GetBucketAclOutput;
(function (GetBucketAclOutput) {
    /**
     * @internal
     */
    GetBucketAclOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketAclOutput || (GetBucketAclOutput = {}));
var GetBucketAclRequest;
(function (GetBucketAclRequest) {
    /**
     * @internal
     */
    GetBucketAclRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketAclRequest || (GetBucketAclRequest = {}));
var Tag;
(function (Tag) {
    /**
     * @internal
     */
    Tag.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Tag || (Tag = {}));
var AnalyticsAndOperator;
(function (AnalyticsAndOperator) {
    /**
     * @internal
     */
    AnalyticsAndOperator.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(AnalyticsAndOperator || (AnalyticsAndOperator = {}));
var AnalyticsFilter;
(function (AnalyticsFilter) {
    AnalyticsFilter.visit = (value, visitor) => {
        if (value.Prefix !== undefined)
            return visitor.Prefix(value.Prefix);
        if (value.Tag !== undefined)
            return visitor.Tag(value.Tag);
        if (value.And !== undefined)
            return visitor.And(value.And);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
    /**
     * @internal
     */
    AnalyticsFilter.filterSensitiveLog = (obj) => {
        if (obj.Prefix !== undefined)
            return { Prefix: obj.Prefix };
        if (obj.Tag !== undefined)
            return { Tag: Tag.filterSensitiveLog(obj.Tag) };
        if (obj.And !== undefined)
            return { And: AnalyticsAndOperator.filterSensitiveLog(obj.And) };
        if (obj.$unknown !== undefined)
            return { [obj.$unknown[0]]: "UNKNOWN" };
    };
})(AnalyticsFilter || (AnalyticsFilter = {}));
var AnalyticsS3BucketDestination;
(function (AnalyticsS3BucketDestination) {
    /**
     * @internal
     */
    AnalyticsS3BucketDestination.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(AnalyticsS3BucketDestination || (AnalyticsS3BucketDestination = {}));
var AnalyticsExportDestination;
(function (AnalyticsExportDestination) {
    /**
     * @internal
     */
    AnalyticsExportDestination.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(AnalyticsExportDestination || (AnalyticsExportDestination = {}));
var StorageClassAnalysisDataExport;
(function (StorageClassAnalysisDataExport) {
    /**
     * @internal
     */
    StorageClassAnalysisDataExport.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StorageClassAnalysisDataExport || (StorageClassAnalysisDataExport = {}));
var StorageClassAnalysis;
(function (StorageClassAnalysis) {
    /**
     * @internal
     */
    StorageClassAnalysis.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StorageClassAnalysis || (StorageClassAnalysis = {}));
var AnalyticsConfiguration;
(function (AnalyticsConfiguration) {
    /**
     * @internal
     */
    AnalyticsConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.Filter && { Filter: AnalyticsFilter.filterSensitiveLog(obj.Filter) }),
    });
})(AnalyticsConfiguration || (AnalyticsConfiguration = {}));
var GetBucketAnalyticsConfigurationOutput;
(function (GetBucketAnalyticsConfigurationOutput) {
    /**
     * @internal
     */
    GetBucketAnalyticsConfigurationOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.AnalyticsConfiguration && {
            AnalyticsConfiguration: AnalyticsConfiguration.filterSensitiveLog(obj.AnalyticsConfiguration),
        }),
    });
})(GetBucketAnalyticsConfigurationOutput || (GetBucketAnalyticsConfigurationOutput = {}));
var GetBucketAnalyticsConfigurationRequest;
(function (GetBucketAnalyticsConfigurationRequest) {
    /**
     * @internal
     */
    GetBucketAnalyticsConfigurationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketAnalyticsConfigurationRequest || (GetBucketAnalyticsConfigurationRequest = {}));
var CORSRule;
(function (CORSRule) {
    /**
     * @internal
     */
    CORSRule.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CORSRule || (CORSRule = {}));
var GetBucketCorsOutput;
(function (GetBucketCorsOutput) {
    /**
     * @internal
     */
    GetBucketCorsOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketCorsOutput || (GetBucketCorsOutput = {}));
var GetBucketCorsRequest;
(function (GetBucketCorsRequest) {
    /**
     * @internal
     */
    GetBucketCorsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketCorsRequest || (GetBucketCorsRequest = {}));
var ServerSideEncryptionByDefault;
(function (ServerSideEncryptionByDefault) {
    /**
     * @internal
     */
    ServerSideEncryptionByDefault.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.KMSMasterKeyID && { KMSMasterKeyID: serdePlugin.SENSITIVE_STRING }),
    });
})(ServerSideEncryptionByDefault || (ServerSideEncryptionByDefault = {}));
var ServerSideEncryptionRule;
(function (ServerSideEncryptionRule) {
    /**
     * @internal
     */
    ServerSideEncryptionRule.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.ApplyServerSideEncryptionByDefault && {
            ApplyServerSideEncryptionByDefault: ServerSideEncryptionByDefault.filterSensitiveLog(obj.ApplyServerSideEncryptionByDefault),
        }),
    });
})(ServerSideEncryptionRule || (ServerSideEncryptionRule = {}));
var ServerSideEncryptionConfiguration;
(function (ServerSideEncryptionConfiguration) {
    /**
     * @internal
     */
    ServerSideEncryptionConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.Rules && { Rules: obj.Rules.map((item) => ServerSideEncryptionRule.filterSensitiveLog(item)) }),
    });
})(ServerSideEncryptionConfiguration || (ServerSideEncryptionConfiguration = {}));
var GetBucketEncryptionOutput;
(function (GetBucketEncryptionOutput) {
    /**
     * @internal
     */
    GetBucketEncryptionOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.ServerSideEncryptionConfiguration && {
            ServerSideEncryptionConfiguration: ServerSideEncryptionConfiguration.filterSensitiveLog(obj.ServerSideEncryptionConfiguration),
        }),
    });
})(GetBucketEncryptionOutput || (GetBucketEncryptionOutput = {}));
var GetBucketEncryptionRequest;
(function (GetBucketEncryptionRequest) {
    /**
     * @internal
     */
    GetBucketEncryptionRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketEncryptionRequest || (GetBucketEncryptionRequest = {}));
var IntelligentTieringAndOperator;
(function (IntelligentTieringAndOperator) {
    /**
     * @internal
     */
    IntelligentTieringAndOperator.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(IntelligentTieringAndOperator || (IntelligentTieringAndOperator = {}));
var IntelligentTieringFilter;
(function (IntelligentTieringFilter) {
    /**
     * @internal
     */
    IntelligentTieringFilter.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(IntelligentTieringFilter || (IntelligentTieringFilter = {}));
var Tiering;
(function (Tiering) {
    /**
     * @internal
     */
    Tiering.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Tiering || (Tiering = {}));
var IntelligentTieringConfiguration;
(function (IntelligentTieringConfiguration) {
    /**
     * @internal
     */
    IntelligentTieringConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(IntelligentTieringConfiguration || (IntelligentTieringConfiguration = {}));
var GetBucketIntelligentTieringConfigurationOutput;
(function (GetBucketIntelligentTieringConfigurationOutput) {
    /**
     * @internal
     */
    GetBucketIntelligentTieringConfigurationOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketIntelligentTieringConfigurationOutput || (GetBucketIntelligentTieringConfigurationOutput = {}));
var GetBucketIntelligentTieringConfigurationRequest;
(function (GetBucketIntelligentTieringConfigurationRequest) {
    /**
     * @internal
     */
    GetBucketIntelligentTieringConfigurationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketIntelligentTieringConfigurationRequest || (GetBucketIntelligentTieringConfigurationRequest = {}));
var SSEKMS;
(function (SSEKMS) {
    /**
     * @internal
     */
    SSEKMS.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.KeyId && { KeyId: serdePlugin.SENSITIVE_STRING }),
    });
})(SSEKMS || (SSEKMS = {}));
var SSES3;
(function (SSES3) {
    /**
     * @internal
     */
    SSES3.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SSES3 || (SSES3 = {}));
var InventoryEncryption;
(function (InventoryEncryption) {
    /**
     * @internal
     */
    InventoryEncryption.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.SSEKMS && { SSEKMS: SSEKMS.filterSensitiveLog(obj.SSEKMS) }),
    });
})(InventoryEncryption || (InventoryEncryption = {}));
var InventoryS3BucketDestination;
(function (InventoryS3BucketDestination) {
    /**
     * @internal
     */
    InventoryS3BucketDestination.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.Encryption && { Encryption: InventoryEncryption.filterSensitiveLog(obj.Encryption) }),
    });
})(InventoryS3BucketDestination || (InventoryS3BucketDestination = {}));
var InventoryDestination;
(function (InventoryDestination) {
    /**
     * @internal
     */
    InventoryDestination.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.S3BucketDestination && {
            S3BucketDestination: InventoryS3BucketDestination.filterSensitiveLog(obj.S3BucketDestination),
        }),
    });
})(InventoryDestination || (InventoryDestination = {}));
var InventoryFilter;
(function (InventoryFilter) {
    /**
     * @internal
     */
    InventoryFilter.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InventoryFilter || (InventoryFilter = {}));
var InventorySchedule;
(function (InventorySchedule) {
    /**
     * @internal
     */
    InventorySchedule.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InventorySchedule || (InventorySchedule = {}));
var InventoryConfiguration;
(function (InventoryConfiguration) {
    /**
     * @internal
     */
    InventoryConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.Destination && { Destination: InventoryDestination.filterSensitiveLog(obj.Destination) }),
    });
})(InventoryConfiguration || (InventoryConfiguration = {}));
var GetBucketInventoryConfigurationOutput;
(function (GetBucketInventoryConfigurationOutput) {
    /**
     * @internal
     */
    GetBucketInventoryConfigurationOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.InventoryConfiguration && {
            InventoryConfiguration: InventoryConfiguration.filterSensitiveLog(obj.InventoryConfiguration),
        }),
    });
})(GetBucketInventoryConfigurationOutput || (GetBucketInventoryConfigurationOutput = {}));
var GetBucketInventoryConfigurationRequest;
(function (GetBucketInventoryConfigurationRequest) {
    /**
     * @internal
     */
    GetBucketInventoryConfigurationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketInventoryConfigurationRequest || (GetBucketInventoryConfigurationRequest = {}));
var LifecycleExpiration;
(function (LifecycleExpiration) {
    /**
     * @internal
     */
    LifecycleExpiration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(LifecycleExpiration || (LifecycleExpiration = {}));
var LifecycleRuleAndOperator;
(function (LifecycleRuleAndOperator) {
    /**
     * @internal
     */
    LifecycleRuleAndOperator.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(LifecycleRuleAndOperator || (LifecycleRuleAndOperator = {}));
var LifecycleRuleFilter;
(function (LifecycleRuleFilter) {
    LifecycleRuleFilter.visit = (value, visitor) => {
        if (value.Prefix !== undefined)
            return visitor.Prefix(value.Prefix);
        if (value.Tag !== undefined)
            return visitor.Tag(value.Tag);
        if (value.And !== undefined)
            return visitor.And(value.And);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
    /**
     * @internal
     */
    LifecycleRuleFilter.filterSensitiveLog = (obj) => {
        if (obj.Prefix !== undefined)
            return { Prefix: obj.Prefix };
        if (obj.Tag !== undefined)
            return { Tag: Tag.filterSensitiveLog(obj.Tag) };
        if (obj.And !== undefined)
            return { And: LifecycleRuleAndOperator.filterSensitiveLog(obj.And) };
        if (obj.$unknown !== undefined)
            return { [obj.$unknown[0]]: "UNKNOWN" };
    };
})(LifecycleRuleFilter || (LifecycleRuleFilter = {}));
var NoncurrentVersionExpiration;
(function (NoncurrentVersionExpiration) {
    /**
     * @internal
     */
    NoncurrentVersionExpiration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(NoncurrentVersionExpiration || (NoncurrentVersionExpiration = {}));
var NoncurrentVersionTransition;
(function (NoncurrentVersionTransition) {
    /**
     * @internal
     */
    NoncurrentVersionTransition.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(NoncurrentVersionTransition || (NoncurrentVersionTransition = {}));
var Transition;
(function (Transition) {
    /**
     * @internal
     */
    Transition.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Transition || (Transition = {}));
var LifecycleRule;
(function (LifecycleRule) {
    /**
     * @internal
     */
    LifecycleRule.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.Filter && { Filter: LifecycleRuleFilter.filterSensitiveLog(obj.Filter) }),
    });
})(LifecycleRule || (LifecycleRule = {}));
var GetBucketLifecycleConfigurationOutput;
(function (GetBucketLifecycleConfigurationOutput) {
    /**
     * @internal
     */
    GetBucketLifecycleConfigurationOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.Rules && { Rules: obj.Rules.map((item) => LifecycleRule.filterSensitiveLog(item)) }),
    });
})(GetBucketLifecycleConfigurationOutput || (GetBucketLifecycleConfigurationOutput = {}));
var GetBucketLifecycleConfigurationRequest;
(function (GetBucketLifecycleConfigurationRequest) {
    /**
     * @internal
     */
    GetBucketLifecycleConfigurationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketLifecycleConfigurationRequest || (GetBucketLifecycleConfigurationRequest = {}));
var GetBucketLocationOutput;
(function (GetBucketLocationOutput) {
    /**
     * @internal
     */
    GetBucketLocationOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketLocationOutput || (GetBucketLocationOutput = {}));
var GetBucketLocationRequest;
(function (GetBucketLocationRequest) {
    /**
     * @internal
     */
    GetBucketLocationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketLocationRequest || (GetBucketLocationRequest = {}));
var TargetGrant;
(function (TargetGrant) {
    /**
     * @internal
     */
    TargetGrant.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(TargetGrant || (TargetGrant = {}));
var LoggingEnabled;
(function (LoggingEnabled) {
    /**
     * @internal
     */
    LoggingEnabled.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(LoggingEnabled || (LoggingEnabled = {}));
var GetBucketLoggingOutput;
(function (GetBucketLoggingOutput) {
    /**
     * @internal
     */
    GetBucketLoggingOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketLoggingOutput || (GetBucketLoggingOutput = {}));
var GetBucketLoggingRequest;
(function (GetBucketLoggingRequest) {
    /**
     * @internal
     */
    GetBucketLoggingRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketLoggingRequest || (GetBucketLoggingRequest = {}));
var MetricsAndOperator;
(function (MetricsAndOperator) {
    /**
     * @internal
     */
    MetricsAndOperator.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(MetricsAndOperator || (MetricsAndOperator = {}));
var MetricsFilter;
(function (MetricsFilter) {
    MetricsFilter.visit = (value, visitor) => {
        if (value.Prefix !== undefined)
            return visitor.Prefix(value.Prefix);
        if (value.Tag !== undefined)
            return visitor.Tag(value.Tag);
        if (value.And !== undefined)
            return visitor.And(value.And);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
    /**
     * @internal
     */
    MetricsFilter.filterSensitiveLog = (obj) => {
        if (obj.Prefix !== undefined)
            return { Prefix: obj.Prefix };
        if (obj.Tag !== undefined)
            return { Tag: Tag.filterSensitiveLog(obj.Tag) };
        if (obj.And !== undefined)
            return { And: MetricsAndOperator.filterSensitiveLog(obj.And) };
        if (obj.$unknown !== undefined)
            return { [obj.$unknown[0]]: "UNKNOWN" };
    };
})(MetricsFilter || (MetricsFilter = {}));
var MetricsConfiguration;
(function (MetricsConfiguration) {
    /**
     * @internal
     */
    MetricsConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.Filter && { Filter: MetricsFilter.filterSensitiveLog(obj.Filter) }),
    });
})(MetricsConfiguration || (MetricsConfiguration = {}));
var GetBucketMetricsConfigurationOutput;
(function (GetBucketMetricsConfigurationOutput) {
    /**
     * @internal
     */
    GetBucketMetricsConfigurationOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.MetricsConfiguration && {
            MetricsConfiguration: MetricsConfiguration.filterSensitiveLog(obj.MetricsConfiguration),
        }),
    });
})(GetBucketMetricsConfigurationOutput || (GetBucketMetricsConfigurationOutput = {}));
var GetBucketMetricsConfigurationRequest;
(function (GetBucketMetricsConfigurationRequest) {
    /**
     * @internal
     */
    GetBucketMetricsConfigurationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketMetricsConfigurationRequest || (GetBucketMetricsConfigurationRequest = {}));
var GetBucketNotificationConfigurationRequest;
(function (GetBucketNotificationConfigurationRequest) {
    /**
     * @internal
     */
    GetBucketNotificationConfigurationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketNotificationConfigurationRequest || (GetBucketNotificationConfigurationRequest = {}));
var FilterRule;
(function (FilterRule) {
    /**
     * @internal
     */
    FilterRule.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(FilterRule || (FilterRule = {}));
var S3KeyFilter;
(function (S3KeyFilter) {
    /**
     * @internal
     */
    S3KeyFilter.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(S3KeyFilter || (S3KeyFilter = {}));
var NotificationConfigurationFilter;
(function (NotificationConfigurationFilter) {
    /**
     * @internal
     */
    NotificationConfigurationFilter.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(NotificationConfigurationFilter || (NotificationConfigurationFilter = {}));
var LambdaFunctionConfiguration;
(function (LambdaFunctionConfiguration) {
    /**
     * @internal
     */
    LambdaFunctionConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(LambdaFunctionConfiguration || (LambdaFunctionConfiguration = {}));
var QueueConfiguration;
(function (QueueConfiguration) {
    /**
     * @internal
     */
    QueueConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(QueueConfiguration || (QueueConfiguration = {}));
var TopicConfiguration;
(function (TopicConfiguration) {
    /**
     * @internal
     */
    TopicConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(TopicConfiguration || (TopicConfiguration = {}));
var NotificationConfiguration;
(function (NotificationConfiguration) {
    /**
     * @internal
     */
    NotificationConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(NotificationConfiguration || (NotificationConfiguration = {}));
var OwnershipControlsRule;
(function (OwnershipControlsRule) {
    /**
     * @internal
     */
    OwnershipControlsRule.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(OwnershipControlsRule || (OwnershipControlsRule = {}));
var OwnershipControls;
(function (OwnershipControls) {
    /**
     * @internal
     */
    OwnershipControls.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(OwnershipControls || (OwnershipControls = {}));
var GetBucketOwnershipControlsOutput;
(function (GetBucketOwnershipControlsOutput) {
    /**
     * @internal
     */
    GetBucketOwnershipControlsOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketOwnershipControlsOutput || (GetBucketOwnershipControlsOutput = {}));
var GetBucketOwnershipControlsRequest;
(function (GetBucketOwnershipControlsRequest) {
    /**
     * @internal
     */
    GetBucketOwnershipControlsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketOwnershipControlsRequest || (GetBucketOwnershipControlsRequest = {}));
var GetBucketPolicyOutput;
(function (GetBucketPolicyOutput) {
    /**
     * @internal
     */
    GetBucketPolicyOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketPolicyOutput || (GetBucketPolicyOutput = {}));
var GetBucketPolicyRequest;
(function (GetBucketPolicyRequest) {
    /**
     * @internal
     */
    GetBucketPolicyRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketPolicyRequest || (GetBucketPolicyRequest = {}));
var PolicyStatus;
(function (PolicyStatus) {
    /**
     * @internal
     */
    PolicyStatus.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PolicyStatus || (PolicyStatus = {}));
var GetBucketPolicyStatusOutput;
(function (GetBucketPolicyStatusOutput) {
    /**
     * @internal
     */
    GetBucketPolicyStatusOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketPolicyStatusOutput || (GetBucketPolicyStatusOutput = {}));
var GetBucketPolicyStatusRequest;
(function (GetBucketPolicyStatusRequest) {
    /**
     * @internal
     */
    GetBucketPolicyStatusRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketPolicyStatusRequest || (GetBucketPolicyStatusRequest = {}));
var DeleteMarkerReplication;
(function (DeleteMarkerReplication) {
    /**
     * @internal
     */
    DeleteMarkerReplication.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteMarkerReplication || (DeleteMarkerReplication = {}));
var EncryptionConfiguration;
(function (EncryptionConfiguration) {
    /**
     * @internal
     */
    EncryptionConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(EncryptionConfiguration || (EncryptionConfiguration = {}));
var ReplicationTimeValue;
(function (ReplicationTimeValue) {
    /**
     * @internal
     */
    ReplicationTimeValue.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ReplicationTimeValue || (ReplicationTimeValue = {}));
var Metrics;
(function (Metrics) {
    /**
     * @internal
     */
    Metrics.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Metrics || (Metrics = {}));
var ReplicationTime;
(function (ReplicationTime) {
    /**
     * @internal
     */
    ReplicationTime.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ReplicationTime || (ReplicationTime = {}));
var Destination;
(function (Destination) {
    /**
     * @internal
     */
    Destination.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Destination || (Destination = {}));
var ExistingObjectReplication;
(function (ExistingObjectReplication) {
    /**
     * @internal
     */
    ExistingObjectReplication.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ExistingObjectReplication || (ExistingObjectReplication = {}));
var ReplicationRuleAndOperator;
(function (ReplicationRuleAndOperator) {
    /**
     * @internal
     */
    ReplicationRuleAndOperator.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ReplicationRuleAndOperator || (ReplicationRuleAndOperator = {}));
var ReplicationRuleFilter;
(function (ReplicationRuleFilter) {
    ReplicationRuleFilter.visit = (value, visitor) => {
        if (value.Prefix !== undefined)
            return visitor.Prefix(value.Prefix);
        if (value.Tag !== undefined)
            return visitor.Tag(value.Tag);
        if (value.And !== undefined)
            return visitor.And(value.And);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
    /**
     * @internal
     */
    ReplicationRuleFilter.filterSensitiveLog = (obj) => {
        if (obj.Prefix !== undefined)
            return { Prefix: obj.Prefix };
        if (obj.Tag !== undefined)
            return { Tag: Tag.filterSensitiveLog(obj.Tag) };
        if (obj.And !== undefined)
            return { And: ReplicationRuleAndOperator.filterSensitiveLog(obj.And) };
        if (obj.$unknown !== undefined)
            return { [obj.$unknown[0]]: "UNKNOWN" };
    };
})(ReplicationRuleFilter || (ReplicationRuleFilter = {}));
var ReplicaModifications;
(function (ReplicaModifications) {
    /**
     * @internal
     */
    ReplicaModifications.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ReplicaModifications || (ReplicaModifications = {}));
var SseKmsEncryptedObjects;
(function (SseKmsEncryptedObjects) {
    /**
     * @internal
     */
    SseKmsEncryptedObjects.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SseKmsEncryptedObjects || (SseKmsEncryptedObjects = {}));
var SourceSelectionCriteria;
(function (SourceSelectionCriteria) {
    /**
     * @internal
     */
    SourceSelectionCriteria.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SourceSelectionCriteria || (SourceSelectionCriteria = {}));
var ReplicationRule;
(function (ReplicationRule) {
    /**
     * @internal
     */
    ReplicationRule.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.Filter && { Filter: ReplicationRuleFilter.filterSensitiveLog(obj.Filter) }),
    });
})(ReplicationRule || (ReplicationRule = {}));
var ReplicationConfiguration;
(function (ReplicationConfiguration) {
    /**
     * @internal
     */
    ReplicationConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.Rules && { Rules: obj.Rules.map((item) => ReplicationRule.filterSensitiveLog(item)) }),
    });
})(ReplicationConfiguration || (ReplicationConfiguration = {}));
var GetBucketReplicationOutput;
(function (GetBucketReplicationOutput) {
    /**
     * @internal
     */
    GetBucketReplicationOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.ReplicationConfiguration && {
            ReplicationConfiguration: ReplicationConfiguration.filterSensitiveLog(obj.ReplicationConfiguration),
        }),
    });
})(GetBucketReplicationOutput || (GetBucketReplicationOutput = {}));
var GetBucketReplicationRequest;
(function (GetBucketReplicationRequest) {
    /**
     * @internal
     */
    GetBucketReplicationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketReplicationRequest || (GetBucketReplicationRequest = {}));
var GetBucketRequestPaymentOutput;
(function (GetBucketRequestPaymentOutput) {
    /**
     * @internal
     */
    GetBucketRequestPaymentOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketRequestPaymentOutput || (GetBucketRequestPaymentOutput = {}));
var GetBucketRequestPaymentRequest;
(function (GetBucketRequestPaymentRequest) {
    /**
     * @internal
     */
    GetBucketRequestPaymentRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketRequestPaymentRequest || (GetBucketRequestPaymentRequest = {}));
var GetBucketTaggingOutput;
(function (GetBucketTaggingOutput) {
    /**
     * @internal
     */
    GetBucketTaggingOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketTaggingOutput || (GetBucketTaggingOutput = {}));
var GetBucketTaggingRequest;
(function (GetBucketTaggingRequest) {
    /**
     * @internal
     */
    GetBucketTaggingRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketTaggingRequest || (GetBucketTaggingRequest = {}));
var GetBucketVersioningOutput;
(function (GetBucketVersioningOutput) {
    /**
     * @internal
     */
    GetBucketVersioningOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketVersioningOutput || (GetBucketVersioningOutput = {}));
var GetBucketVersioningRequest;
(function (GetBucketVersioningRequest) {
    /**
     * @internal
     */
    GetBucketVersioningRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketVersioningRequest || (GetBucketVersioningRequest = {}));
var ErrorDocument;
(function (ErrorDocument) {
    /**
     * @internal
     */
    ErrorDocument.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ErrorDocument || (ErrorDocument = {}));
var IndexDocument;
(function (IndexDocument) {
    /**
     * @internal
     */
    IndexDocument.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(IndexDocument || (IndexDocument = {}));
var RedirectAllRequestsTo;
(function (RedirectAllRequestsTo) {
    /**
     * @internal
     */
    RedirectAllRequestsTo.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(RedirectAllRequestsTo || (RedirectAllRequestsTo = {}));
var Condition;
(function (Condition) {
    /**
     * @internal
     */
    Condition.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Condition || (Condition = {}));
var Redirect;
(function (Redirect) {
    /**
     * @internal
     */
    Redirect.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Redirect || (Redirect = {}));
var RoutingRule;
(function (RoutingRule) {
    /**
     * @internal
     */
    RoutingRule.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(RoutingRule || (RoutingRule = {}));
var GetBucketWebsiteOutput;
(function (GetBucketWebsiteOutput) {
    /**
     * @internal
     */
    GetBucketWebsiteOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketWebsiteOutput || (GetBucketWebsiteOutput = {}));
var GetBucketWebsiteRequest;
(function (GetBucketWebsiteRequest) {
    /**
     * @internal
     */
    GetBucketWebsiteRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetBucketWebsiteRequest || (GetBucketWebsiteRequest = {}));
exports.GetObjectOutput = void 0;
(function (GetObjectOutput) {
    /**
     * @internal
     */
    GetObjectOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.SSEKMSKeyId && { SSEKMSKeyId: serdePlugin.SENSITIVE_STRING }),
    });
})(exports.GetObjectOutput || (exports.GetObjectOutput = {}));
exports.GetObjectRequest = void 0;
(function (GetObjectRequest) {
    /**
     * @internal
     */
    GetObjectRequest.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.SSECustomerKey && { SSECustomerKey: serdePlugin.SENSITIVE_STRING }),
    });
})(exports.GetObjectRequest || (exports.GetObjectRequest = {}));
var InvalidObjectState;
(function (InvalidObjectState) {
    /**
     * @internal
     */
    InvalidObjectState.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InvalidObjectState || (InvalidObjectState = {}));
var NoSuchKey;
(function (NoSuchKey) {
    /**
     * @internal
     */
    NoSuchKey.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(NoSuchKey || (NoSuchKey = {}));
var GetObjectAclOutput;
(function (GetObjectAclOutput) {
    /**
     * @internal
     */
    GetObjectAclOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetObjectAclOutput || (GetObjectAclOutput = {}));
var GetObjectAclRequest;
(function (GetObjectAclRequest) {
    /**
     * @internal
     */
    GetObjectAclRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetObjectAclRequest || (GetObjectAclRequest = {}));
var ObjectLockLegalHold;
(function (ObjectLockLegalHold) {
    /**
     * @internal
     */
    ObjectLockLegalHold.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ObjectLockLegalHold || (ObjectLockLegalHold = {}));
var GetObjectLegalHoldOutput;
(function (GetObjectLegalHoldOutput) {
    /**
     * @internal
     */
    GetObjectLegalHoldOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetObjectLegalHoldOutput || (GetObjectLegalHoldOutput = {}));
var GetObjectLegalHoldRequest;
(function (GetObjectLegalHoldRequest) {
    /**
     * @internal
     */
    GetObjectLegalHoldRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetObjectLegalHoldRequest || (GetObjectLegalHoldRequest = {}));
var DefaultRetention;
(function (DefaultRetention) {
    /**
     * @internal
     */
    DefaultRetention.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DefaultRetention || (DefaultRetention = {}));
var ObjectLockRule;
(function (ObjectLockRule) {
    /**
     * @internal
     */
    ObjectLockRule.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ObjectLockRule || (ObjectLockRule = {}));
var ObjectLockConfiguration;
(function (ObjectLockConfiguration) {
    /**
     * @internal
     */
    ObjectLockConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ObjectLockConfiguration || (ObjectLockConfiguration = {}));
var GetObjectLockConfigurationOutput;
(function (GetObjectLockConfigurationOutput) {
    /**
     * @internal
     */
    GetObjectLockConfigurationOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetObjectLockConfigurationOutput || (GetObjectLockConfigurationOutput = {}));
var GetObjectLockConfigurationRequest;
(function (GetObjectLockConfigurationRequest) {
    /**
     * @internal
     */
    GetObjectLockConfigurationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetObjectLockConfigurationRequest || (GetObjectLockConfigurationRequest = {}));
var ObjectLockRetention;
(function (ObjectLockRetention) {
    /**
     * @internal
     */
    ObjectLockRetention.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ObjectLockRetention || (ObjectLockRetention = {}));
var GetObjectRetentionOutput;
(function (GetObjectRetentionOutput) {
    /**
     * @internal
     */
    GetObjectRetentionOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetObjectRetentionOutput || (GetObjectRetentionOutput = {}));
var GetObjectRetentionRequest;
(function (GetObjectRetentionRequest) {
    /**
     * @internal
     */
    GetObjectRetentionRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetObjectRetentionRequest || (GetObjectRetentionRequest = {}));
var GetObjectTaggingOutput;
(function (GetObjectTaggingOutput) {
    /**
     * @internal
     */
    GetObjectTaggingOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetObjectTaggingOutput || (GetObjectTaggingOutput = {}));
var GetObjectTaggingRequest;
(function (GetObjectTaggingRequest) {
    /**
     * @internal
     */
    GetObjectTaggingRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetObjectTaggingRequest || (GetObjectTaggingRequest = {}));
var GetObjectTorrentOutput;
(function (GetObjectTorrentOutput) {
    /**
     * @internal
     */
    GetObjectTorrentOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetObjectTorrentOutput || (GetObjectTorrentOutput = {}));
var GetObjectTorrentRequest;
(function (GetObjectTorrentRequest) {
    /**
     * @internal
     */
    GetObjectTorrentRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetObjectTorrentRequest || (GetObjectTorrentRequest = {}));
var PublicAccessBlockConfiguration;
(function (PublicAccessBlockConfiguration) {
    /**
     * @internal
     */
    PublicAccessBlockConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PublicAccessBlockConfiguration || (PublicAccessBlockConfiguration = {}));
var GetPublicAccessBlockOutput;
(function (GetPublicAccessBlockOutput) {
    /**
     * @internal
     */
    GetPublicAccessBlockOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetPublicAccessBlockOutput || (GetPublicAccessBlockOutput = {}));
var GetPublicAccessBlockRequest;
(function (GetPublicAccessBlockRequest) {
    /**
     * @internal
     */
    GetPublicAccessBlockRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetPublicAccessBlockRequest || (GetPublicAccessBlockRequest = {}));
var HeadBucketRequest;
(function (HeadBucketRequest) {
    /**
     * @internal
     */
    HeadBucketRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(HeadBucketRequest || (HeadBucketRequest = {}));
var NotFound;
(function (NotFound) {
    /**
     * @internal
     */
    NotFound.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(NotFound || (NotFound = {}));
var HeadObjectOutput;
(function (HeadObjectOutput) {
    /**
     * @internal
     */
    HeadObjectOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.SSEKMSKeyId && { SSEKMSKeyId: serdePlugin.SENSITIVE_STRING }),
    });
})(HeadObjectOutput || (HeadObjectOutput = {}));
var HeadObjectRequest;
(function (HeadObjectRequest) {
    /**
     * @internal
     */
    HeadObjectRequest.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.SSECustomerKey && { SSECustomerKey: serdePlugin.SENSITIVE_STRING }),
    });
})(HeadObjectRequest || (HeadObjectRequest = {}));
var ListBucketAnalyticsConfigurationsOutput;
(function (ListBucketAnalyticsConfigurationsOutput) {
    /**
     * @internal
     */
    ListBucketAnalyticsConfigurationsOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.AnalyticsConfigurationList && {
            AnalyticsConfigurationList: obj.AnalyticsConfigurationList.map((item) => AnalyticsConfiguration.filterSensitiveLog(item)),
        }),
    });
})(ListBucketAnalyticsConfigurationsOutput || (ListBucketAnalyticsConfigurationsOutput = {}));
var ListBucketAnalyticsConfigurationsRequest;
(function (ListBucketAnalyticsConfigurationsRequest) {
    /**
     * @internal
     */
    ListBucketAnalyticsConfigurationsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListBucketAnalyticsConfigurationsRequest || (ListBucketAnalyticsConfigurationsRequest = {}));
var ListBucketIntelligentTieringConfigurationsOutput;
(function (ListBucketIntelligentTieringConfigurationsOutput) {
    /**
     * @internal
     */
    ListBucketIntelligentTieringConfigurationsOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListBucketIntelligentTieringConfigurationsOutput || (ListBucketIntelligentTieringConfigurationsOutput = {}));
var ListBucketIntelligentTieringConfigurationsRequest;
(function (ListBucketIntelligentTieringConfigurationsRequest) {
    /**
     * @internal
     */
    ListBucketIntelligentTieringConfigurationsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListBucketIntelligentTieringConfigurationsRequest || (ListBucketIntelligentTieringConfigurationsRequest = {}));
var ListBucketInventoryConfigurationsOutput;
(function (ListBucketInventoryConfigurationsOutput) {
    /**
     * @internal
     */
    ListBucketInventoryConfigurationsOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.InventoryConfigurationList && {
            InventoryConfigurationList: obj.InventoryConfigurationList.map((item) => InventoryConfiguration.filterSensitiveLog(item)),
        }),
    });
})(ListBucketInventoryConfigurationsOutput || (ListBucketInventoryConfigurationsOutput = {}));
var ListBucketInventoryConfigurationsRequest;
(function (ListBucketInventoryConfigurationsRequest) {
    /**
     * @internal
     */
    ListBucketInventoryConfigurationsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListBucketInventoryConfigurationsRequest || (ListBucketInventoryConfigurationsRequest = {}));
var ListBucketMetricsConfigurationsOutput;
(function (ListBucketMetricsConfigurationsOutput) {
    /**
     * @internal
     */
    ListBucketMetricsConfigurationsOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.MetricsConfigurationList && {
            MetricsConfigurationList: obj.MetricsConfigurationList.map((item) => MetricsConfiguration.filterSensitiveLog(item)),
        }),
    });
})(ListBucketMetricsConfigurationsOutput || (ListBucketMetricsConfigurationsOutput = {}));
var ListBucketMetricsConfigurationsRequest;
(function (ListBucketMetricsConfigurationsRequest) {
    /**
     * @internal
     */
    ListBucketMetricsConfigurationsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListBucketMetricsConfigurationsRequest || (ListBucketMetricsConfigurationsRequest = {}));
var Bucket;
(function (Bucket) {
    /**
     * @internal
     */
    Bucket.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Bucket || (Bucket = {}));
var ListBucketsOutput;
(function (ListBucketsOutput) {
    /**
     * @internal
     */
    ListBucketsOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListBucketsOutput || (ListBucketsOutput = {}));
var CommonPrefix;
(function (CommonPrefix) {
    /**
     * @internal
     */
    CommonPrefix.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CommonPrefix || (CommonPrefix = {}));
var Initiator;
(function (Initiator) {
    /**
     * @internal
     */
    Initiator.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Initiator || (Initiator = {}));
var MultipartUpload;
(function (MultipartUpload) {
    /**
     * @internal
     */
    MultipartUpload.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(MultipartUpload || (MultipartUpload = {}));
var ListMultipartUploadsOutput;
(function (ListMultipartUploadsOutput) {
    /**
     * @internal
     */
    ListMultipartUploadsOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListMultipartUploadsOutput || (ListMultipartUploadsOutput = {}));
var ListMultipartUploadsRequest;
(function (ListMultipartUploadsRequest) {
    /**
     * @internal
     */
    ListMultipartUploadsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListMultipartUploadsRequest || (ListMultipartUploadsRequest = {}));
var _Object;
(function (_Object) {
    /**
     * @internal
     */
    _Object.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(_Object || (_Object = {}));
var ListObjectsOutput;
(function (ListObjectsOutput) {
    /**
     * @internal
     */
    ListObjectsOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListObjectsOutput || (ListObjectsOutput = {}));
var ListObjectsRequest;
(function (ListObjectsRequest) {
    /**
     * @internal
     */
    ListObjectsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListObjectsRequest || (ListObjectsRequest = {}));
var NoSuchBucket;
(function (NoSuchBucket) {
    /**
     * @internal
     */
    NoSuchBucket.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(NoSuchBucket || (NoSuchBucket = {}));
var ListObjectsV2Output;
(function (ListObjectsV2Output) {
    /**
     * @internal
     */
    ListObjectsV2Output.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListObjectsV2Output || (ListObjectsV2Output = {}));
var ListObjectsV2Request;
(function (ListObjectsV2Request) {
    /**
     * @internal
     */
    ListObjectsV2Request.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListObjectsV2Request || (ListObjectsV2Request = {}));
var DeleteMarkerEntry;
(function (DeleteMarkerEntry) {
    /**
     * @internal
     */
    DeleteMarkerEntry.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteMarkerEntry || (DeleteMarkerEntry = {}));
var ObjectVersion;
(function (ObjectVersion) {
    /**
     * @internal
     */
    ObjectVersion.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ObjectVersion || (ObjectVersion = {}));
var ListObjectVersionsOutput;
(function (ListObjectVersionsOutput) {
    /**
     * @internal
     */
    ListObjectVersionsOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListObjectVersionsOutput || (ListObjectVersionsOutput = {}));
var ListObjectVersionsRequest;
(function (ListObjectVersionsRequest) {
    /**
     * @internal
     */
    ListObjectVersionsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListObjectVersionsRequest || (ListObjectVersionsRequest = {}));
var Part;
(function (Part) {
    /**
     * @internal
     */
    Part.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Part || (Part = {}));
var ListPartsOutput;
(function (ListPartsOutput) {
    /**
     * @internal
     */
    ListPartsOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListPartsOutput || (ListPartsOutput = {}));
var ListPartsRequest;
(function (ListPartsRequest) {
    /**
     * @internal
     */
    ListPartsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListPartsRequest || (ListPartsRequest = {}));
var PutBucketAccelerateConfigurationRequest;
(function (PutBucketAccelerateConfigurationRequest) {
    /**
     * @internal
     */
    PutBucketAccelerateConfigurationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutBucketAccelerateConfigurationRequest || (PutBucketAccelerateConfigurationRequest = {}));
var PutBucketAclRequest;
(function (PutBucketAclRequest) {
    /**
     * @internal
     */
    PutBucketAclRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutBucketAclRequest || (PutBucketAclRequest = {}));
var PutBucketAnalyticsConfigurationRequest;
(function (PutBucketAnalyticsConfigurationRequest) {
    /**
     * @internal
     */
    PutBucketAnalyticsConfigurationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.AnalyticsConfiguration && {
            AnalyticsConfiguration: AnalyticsConfiguration.filterSensitiveLog(obj.AnalyticsConfiguration),
        }),
    });
})(PutBucketAnalyticsConfigurationRequest || (PutBucketAnalyticsConfigurationRequest = {}));
var CORSConfiguration;
(function (CORSConfiguration) {
    /**
     * @internal
     */
    CORSConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CORSConfiguration || (CORSConfiguration = {}));
var PutBucketCorsRequest;
(function (PutBucketCorsRequest) {
    /**
     * @internal
     */
    PutBucketCorsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutBucketCorsRequest || (PutBucketCorsRequest = {}));
var PutBucketEncryptionRequest;
(function (PutBucketEncryptionRequest) {
    /**
     * @internal
     */
    PutBucketEncryptionRequest.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.ServerSideEncryptionConfiguration && {
            ServerSideEncryptionConfiguration: ServerSideEncryptionConfiguration.filterSensitiveLog(obj.ServerSideEncryptionConfiguration),
        }),
    });
})(PutBucketEncryptionRequest || (PutBucketEncryptionRequest = {}));
var PutBucketIntelligentTieringConfigurationRequest;
(function (PutBucketIntelligentTieringConfigurationRequest) {
    /**
     * @internal
     */
    PutBucketIntelligentTieringConfigurationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutBucketIntelligentTieringConfigurationRequest || (PutBucketIntelligentTieringConfigurationRequest = {}));
var PutBucketInventoryConfigurationRequest;
(function (PutBucketInventoryConfigurationRequest) {
    /**
     * @internal
     */
    PutBucketInventoryConfigurationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.InventoryConfiguration && {
            InventoryConfiguration: InventoryConfiguration.filterSensitiveLog(obj.InventoryConfiguration),
        }),
    });
})(PutBucketInventoryConfigurationRequest || (PutBucketInventoryConfigurationRequest = {}));
var BucketLifecycleConfiguration;
(function (BucketLifecycleConfiguration) {
    /**
     * @internal
     */
    BucketLifecycleConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.Rules && { Rules: obj.Rules.map((item) => LifecycleRule.filterSensitiveLog(item)) }),
    });
})(BucketLifecycleConfiguration || (BucketLifecycleConfiguration = {}));
var PutBucketLifecycleConfigurationRequest;
(function (PutBucketLifecycleConfigurationRequest) {
    /**
     * @internal
     */
    PutBucketLifecycleConfigurationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.LifecycleConfiguration && {
            LifecycleConfiguration: BucketLifecycleConfiguration.filterSensitiveLog(obj.LifecycleConfiguration),
        }),
    });
})(PutBucketLifecycleConfigurationRequest || (PutBucketLifecycleConfigurationRequest = {}));
var BucketLoggingStatus;
(function (BucketLoggingStatus) {
    /**
     * @internal
     */
    BucketLoggingStatus.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(BucketLoggingStatus || (BucketLoggingStatus = {}));
var PutBucketLoggingRequest;
(function (PutBucketLoggingRequest) {
    /**
     * @internal
     */
    PutBucketLoggingRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutBucketLoggingRequest || (PutBucketLoggingRequest = {}));
var PutBucketMetricsConfigurationRequest;
(function (PutBucketMetricsConfigurationRequest) {
    /**
     * @internal
     */
    PutBucketMetricsConfigurationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.MetricsConfiguration && {
            MetricsConfiguration: MetricsConfiguration.filterSensitiveLog(obj.MetricsConfiguration),
        }),
    });
})(PutBucketMetricsConfigurationRequest || (PutBucketMetricsConfigurationRequest = {}));
var PutBucketNotificationConfigurationRequest;
(function (PutBucketNotificationConfigurationRequest) {
    /**
     * @internal
     */
    PutBucketNotificationConfigurationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutBucketNotificationConfigurationRequest || (PutBucketNotificationConfigurationRequest = {}));
var PutBucketOwnershipControlsRequest;
(function (PutBucketOwnershipControlsRequest) {
    /**
     * @internal
     */
    PutBucketOwnershipControlsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutBucketOwnershipControlsRequest || (PutBucketOwnershipControlsRequest = {}));
var PutBucketPolicyRequest;
(function (PutBucketPolicyRequest) {
    /**
     * @internal
     */
    PutBucketPolicyRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutBucketPolicyRequest || (PutBucketPolicyRequest = {}));
var PutBucketReplicationRequest;
(function (PutBucketReplicationRequest) {
    /**
     * @internal
     */
    PutBucketReplicationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.ReplicationConfiguration && {
            ReplicationConfiguration: ReplicationConfiguration.filterSensitiveLog(obj.ReplicationConfiguration),
        }),
    });
})(PutBucketReplicationRequest || (PutBucketReplicationRequest = {}));
var RequestPaymentConfiguration;
(function (RequestPaymentConfiguration) {
    /**
     * @internal
     */
    RequestPaymentConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(RequestPaymentConfiguration || (RequestPaymentConfiguration = {}));
var PutBucketRequestPaymentRequest;
(function (PutBucketRequestPaymentRequest) {
    /**
     * @internal
     */
    PutBucketRequestPaymentRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutBucketRequestPaymentRequest || (PutBucketRequestPaymentRequest = {}));
var Tagging;
(function (Tagging) {
    /**
     * @internal
     */
    Tagging.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Tagging || (Tagging = {}));
var PutBucketTaggingRequest;
(function (PutBucketTaggingRequest) {
    /**
     * @internal
     */
    PutBucketTaggingRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutBucketTaggingRequest || (PutBucketTaggingRequest = {}));
var VersioningConfiguration;
(function (VersioningConfiguration) {
    /**
     * @internal
     */
    VersioningConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(VersioningConfiguration || (VersioningConfiguration = {}));
var PutBucketVersioningRequest;
(function (PutBucketVersioningRequest) {
    /**
     * @internal
     */
    PutBucketVersioningRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutBucketVersioningRequest || (PutBucketVersioningRequest = {}));
var WebsiteConfiguration;
(function (WebsiteConfiguration) {
    /**
     * @internal
     */
    WebsiteConfiguration.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(WebsiteConfiguration || (WebsiteConfiguration = {}));
var PutBucketWebsiteRequest;
(function (PutBucketWebsiteRequest) {
    /**
     * @internal
     */
    PutBucketWebsiteRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutBucketWebsiteRequest || (PutBucketWebsiteRequest = {}));
exports.PutObjectOutput = void 0;
(function (PutObjectOutput) {
    /**
     * @internal
     */
    PutObjectOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.SSEKMSKeyId && { SSEKMSKeyId: serdePlugin.SENSITIVE_STRING }),
        ...(obj.SSEKMSEncryptionContext && { SSEKMSEncryptionContext: serdePlugin.SENSITIVE_STRING }),
    });
})(exports.PutObjectOutput || (exports.PutObjectOutput = {}));
exports.PutObjectRequest = void 0;
(function (PutObjectRequest) {
    /**
     * @internal
     */
    PutObjectRequest.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.SSECustomerKey && { SSECustomerKey: serdePlugin.SENSITIVE_STRING }),
        ...(obj.SSEKMSKeyId && { SSEKMSKeyId: serdePlugin.SENSITIVE_STRING }),
        ...(obj.SSEKMSEncryptionContext && { SSEKMSEncryptionContext: serdePlugin.SENSITIVE_STRING }),
    });
})(exports.PutObjectRequest || (exports.PutObjectRequest = {}));
var PutObjectAclOutput;
(function (PutObjectAclOutput) {
    /**
     * @internal
     */
    PutObjectAclOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutObjectAclOutput || (PutObjectAclOutput = {}));
var PutObjectAclRequest;
(function (PutObjectAclRequest) {
    /**
     * @internal
     */
    PutObjectAclRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutObjectAclRequest || (PutObjectAclRequest = {}));
var PutObjectLegalHoldOutput;
(function (PutObjectLegalHoldOutput) {
    /**
     * @internal
     */
    PutObjectLegalHoldOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutObjectLegalHoldOutput || (PutObjectLegalHoldOutput = {}));
var PutObjectLegalHoldRequest;
(function (PutObjectLegalHoldRequest) {
    /**
     * @internal
     */
    PutObjectLegalHoldRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutObjectLegalHoldRequest || (PutObjectLegalHoldRequest = {}));
var PutObjectLockConfigurationOutput;
(function (PutObjectLockConfigurationOutput) {
    /**
     * @internal
     */
    PutObjectLockConfigurationOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutObjectLockConfigurationOutput || (PutObjectLockConfigurationOutput = {}));
var PutObjectLockConfigurationRequest;
(function (PutObjectLockConfigurationRequest) {
    /**
     * @internal
     */
    PutObjectLockConfigurationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutObjectLockConfigurationRequest || (PutObjectLockConfigurationRequest = {}));
var PutObjectRetentionOutput;
(function (PutObjectRetentionOutput) {
    /**
     * @internal
     */
    PutObjectRetentionOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutObjectRetentionOutput || (PutObjectRetentionOutput = {}));
var PutObjectRetentionRequest;
(function (PutObjectRetentionRequest) {
    /**
     * @internal
     */
    PutObjectRetentionRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutObjectRetentionRequest || (PutObjectRetentionRequest = {}));
var PutObjectTaggingOutput;
(function (PutObjectTaggingOutput) {
    /**
     * @internal
     */
    PutObjectTaggingOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutObjectTaggingOutput || (PutObjectTaggingOutput = {}));
var PutObjectTaggingRequest;
(function (PutObjectTaggingRequest) {
    /**
     * @internal
     */
    PutObjectTaggingRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutObjectTaggingRequest || (PutObjectTaggingRequest = {}));
var PutPublicAccessBlockRequest;
(function (PutPublicAccessBlockRequest) {
    /**
     * @internal
     */
    PutPublicAccessBlockRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutPublicAccessBlockRequest || (PutPublicAccessBlockRequest = {}));
var ObjectAlreadyInActiveTierError;
(function (ObjectAlreadyInActiveTierError) {
    /**
     * @internal
     */
    ObjectAlreadyInActiveTierError.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ObjectAlreadyInActiveTierError || (ObjectAlreadyInActiveTierError = {}));
var RestoreObjectOutput;
(function (RestoreObjectOutput) {
    /**
     * @internal
     */
    RestoreObjectOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(RestoreObjectOutput || (RestoreObjectOutput = {}));
var GlacierJobParameters;
(function (GlacierJobParameters) {
    /**
     * @internal
     */
    GlacierJobParameters.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GlacierJobParameters || (GlacierJobParameters = {}));

const serializeAws_restXmlGetObjectCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {
        ...(isSerializableHeaderValue(input.IfMatch) && { "if-match": input.IfMatch }),
        ...(isSerializableHeaderValue(input.IfModifiedSince) && {
            "if-modified-since": dateToUtcString(input.IfModifiedSince).toString(),
        }),
        ...(isSerializableHeaderValue(input.IfNoneMatch) && { "if-none-match": input.IfNoneMatch }),
        ...(isSerializableHeaderValue(input.IfUnmodifiedSince) && {
            "if-unmodified-since": dateToUtcString(input.IfUnmodifiedSince).toString(),
        }),
        ...(isSerializableHeaderValue(input.Range) && { range: input.Range }),
        ...(isSerializableHeaderValue(input.SSECustomerAlgorithm) && {
            "x-amz-server-side-encryption-customer-algorithm": input.SSECustomerAlgorithm,
        }),
        ...(isSerializableHeaderValue(input.SSECustomerKey) && {
            "x-amz-server-side-encryption-customer-key": input.SSECustomerKey,
        }),
        ...(isSerializableHeaderValue(input.SSECustomerKeyMD5) && {
            "x-amz-server-side-encryption-customer-key-md5": input.SSECustomerKeyMD5,
        }),
        ...(isSerializableHeaderValue(input.RequestPayer) && { "x-amz-request-payer": input.RequestPayer }),
        ...(isSerializableHeaderValue(input.ExpectedBucketOwner) && {
            "x-amz-expected-bucket-owner": input.ExpectedBucketOwner,
        }),
    };
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith("/")) ? basePath.slice(0, -1) : basePath || ""}` + "/{Bucket}/{Key+}";
    if (input.Bucket !== undefined) {
        const labelValue = input.Bucket;
        if (labelValue.length <= 0) {
            throw new Error("Empty value provided for input HTTP label: Bucket.");
        }
        resolvedPath = resolvedPath.replace("{Bucket}", serdePlugin.extendedEncodeURIComponent(labelValue));
    }
    else {
        throw new Error("No value provided for input HTTP label: Bucket.");
    }
    if (input.Key !== undefined) {
        const labelValue = input.Key;
        if (labelValue.length <= 0) {
            throw new Error("Empty value provided for input HTTP label: Key.");
        }
        resolvedPath = resolvedPath.replace("{Key+}", labelValue
            .split("/")
            .map((segment) => serdePlugin.extendedEncodeURIComponent(segment))
            .join("/"));
    }
    else {
        throw new Error("No value provided for input HTTP label: Key.");
    }
    const query = {
        "x-id": "GetObject",
        ...(input.ResponseCacheControl !== undefined && { "response-cache-control": input.ResponseCacheControl }),
        ...(input.ResponseContentDisposition !== undefined && {
            "response-content-disposition": input.ResponseContentDisposition,
        }),
        ...(input.ResponseContentEncoding !== undefined && { "response-content-encoding": input.ResponseContentEncoding }),
        ...(input.ResponseContentLanguage !== undefined && { "response-content-language": input.ResponseContentLanguage }),
        ...(input.ResponseContentType !== undefined && { "response-content-type": input.ResponseContentType }),
        ...(input.ResponseExpires !== undefined && {
            "response-expires": dateToUtcString(input.ResponseExpires).toString(),
        }),
        ...(input.VersionId !== undefined && { versionId: input.VersionId }),
        ...(input.PartNumber !== undefined && { partNumber: input.PartNumber.toString() }),
    };
    let body;
    return new serdePlugin.HttpRequest({
        protocol,
        hostname,
        port,
        method: "GET",
        headers,
        path: resolvedPath,
        query,
        body,
    });
};
const serializeAws_restXmlPutObjectCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {
        "content-type": "application/octet-stream",
        ...(isSerializableHeaderValue(input.ACL) && { "x-amz-acl": input.ACL }),
        ...(isSerializableHeaderValue(input.CacheControl) && { "cache-control": input.CacheControl }),
        ...(isSerializableHeaderValue(input.ContentDisposition) && { "content-disposition": input.ContentDisposition }),
        ...(isSerializableHeaderValue(input.ContentEncoding) && { "content-encoding": input.ContentEncoding }),
        ...(isSerializableHeaderValue(input.ContentLanguage) && { "content-language": input.ContentLanguage }),
        ...(isSerializableHeaderValue(input.ContentLength) && { "content-length": input.ContentLength.toString() }),
        ...(isSerializableHeaderValue(input.ContentMD5) && { "content-md5": input.ContentMD5 }),
        ...(isSerializableHeaderValue(input.ContentType) && { "content-type": input.ContentType }),
        ...(isSerializableHeaderValue(input.Expires) && { expires: dateToUtcString(input.Expires).toString() }),
        ...(isSerializableHeaderValue(input.GrantFullControl) && { "x-amz-grant-full-control": input.GrantFullControl }),
        ...(isSerializableHeaderValue(input.GrantRead) && { "x-amz-grant-read": input.GrantRead }),
        ...(isSerializableHeaderValue(input.GrantReadACP) && { "x-amz-grant-read-acp": input.GrantReadACP }),
        ...(isSerializableHeaderValue(input.GrantWriteACP) && { "x-amz-grant-write-acp": input.GrantWriteACP }),
        ...(isSerializableHeaderValue(input.ServerSideEncryption) && {
            "x-amz-server-side-encryption": input.ServerSideEncryption,
        }),
        ...(isSerializableHeaderValue(input.StorageClass) && { "x-amz-storage-class": input.StorageClass }),
        ...(isSerializableHeaderValue(input.WebsiteRedirectLocation) && {
            "x-amz-website-redirect-location": input.WebsiteRedirectLocation,
        }),
        ...(isSerializableHeaderValue(input.SSECustomerAlgorithm) && {
            "x-amz-server-side-encryption-customer-algorithm": input.SSECustomerAlgorithm,
        }),
        ...(isSerializableHeaderValue(input.SSECustomerKey) && {
            "x-amz-server-side-encryption-customer-key": input.SSECustomerKey,
        }),
        ...(isSerializableHeaderValue(input.SSECustomerKeyMD5) && {
            "x-amz-server-side-encryption-customer-key-md5": input.SSECustomerKeyMD5,
        }),
        ...(isSerializableHeaderValue(input.SSEKMSKeyId) && {
            "x-amz-server-side-encryption-aws-kms-key-id": input.SSEKMSKeyId,
        }),
        ...(isSerializableHeaderValue(input.SSEKMSEncryptionContext) && {
            "x-amz-server-side-encryption-context": input.SSEKMSEncryptionContext,
        }),
        ...(isSerializableHeaderValue(input.BucketKeyEnabled) && {
            "x-amz-server-side-encryption-bucket-key-enabled": input.BucketKeyEnabled.toString(),
        }),
        ...(isSerializableHeaderValue(input.RequestPayer) && { "x-amz-request-payer": input.RequestPayer }),
        ...(isSerializableHeaderValue(input.Tagging) && { "x-amz-tagging": input.Tagging }),
        ...(isSerializableHeaderValue(input.ObjectLockMode) && { "x-amz-object-lock-mode": input.ObjectLockMode }),
        ...(isSerializableHeaderValue(input.ObjectLockRetainUntilDate) && {
            "x-amz-object-lock-retain-until-date": (input.ObjectLockRetainUntilDate.toISOString().split(".")[0] + "Z").toString(),
        }),
        ...(isSerializableHeaderValue(input.ObjectLockLegalHoldStatus) && {
            "x-amz-object-lock-legal-hold": input.ObjectLockLegalHoldStatus,
        }),
        ...(isSerializableHeaderValue(input.ExpectedBucketOwner) && {
            "x-amz-expected-bucket-owner": input.ExpectedBucketOwner,
        }),
        ...(input.Metadata !== undefined &&
            Object.keys(input.Metadata).reduce((acc, suffix) => ({
                ...acc,
                [`x-amz-meta-${suffix.toLowerCase()}`]: input.Metadata[suffix],
            }), {})),
    };
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith("/")) ? basePath.slice(0, -1) : basePath || ""}` + "/{Bucket}/{Key+}";
    if (input.Bucket !== undefined) {
        const labelValue = input.Bucket;
        if (labelValue.length <= 0) {
            throw new Error("Empty value provided for input HTTP label: Bucket.");
        }
        resolvedPath = resolvedPath.replace("{Bucket}", serdePlugin.extendedEncodeURIComponent(labelValue));
    }
    else {
        throw new Error("No value provided for input HTTP label: Bucket.");
    }
    if (input.Key !== undefined) {
        const labelValue = input.Key;
        if (labelValue.length <= 0) {
            throw new Error("Empty value provided for input HTTP label: Key.");
        }
        resolvedPath = resolvedPath.replace("{Key+}", labelValue
            .split("/")
            .map((segment) => serdePlugin.extendedEncodeURIComponent(segment))
            .join("/"));
    }
    else {
        throw new Error("No value provided for input HTTP label: Key.");
    }
    const query = {
        "x-id": "PutObject",
    };
    let body;
    if (input.Body !== undefined) {
        body = input.Body;
    }
    let contents;
    if (input.Body !== undefined) {
        contents = input.Body;
        body = contents;
    }
    return new serdePlugin.HttpRequest({
        protocol,
        hostname,
        port,
        method: "PUT",
        headers,
        path: resolvedPath,
        query,
        body,
    });
};
const deserializeAws_restXmlGetObjectCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restXmlGetObjectCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        AcceptRanges: undefined,
        Body: undefined,
        BucketKeyEnabled: undefined,
        CacheControl: undefined,
        ContentDisposition: undefined,
        ContentEncoding: undefined,
        ContentLanguage: undefined,
        ContentLength: undefined,
        ContentRange: undefined,
        ContentType: undefined,
        DeleteMarker: undefined,
        ETag: undefined,
        Expiration: undefined,
        Expires: undefined,
        LastModified: undefined,
        Metadata: undefined,
        MissingMeta: undefined,
        ObjectLockLegalHoldStatus: undefined,
        ObjectLockMode: undefined,
        ObjectLockRetainUntilDate: undefined,
        PartsCount: undefined,
        ReplicationStatus: undefined,
        RequestCharged: undefined,
        Restore: undefined,
        SSECustomerAlgorithm: undefined,
        SSECustomerKeyMD5: undefined,
        SSEKMSKeyId: undefined,
        ServerSideEncryption: undefined,
        StorageClass: undefined,
        TagCount: undefined,
        VersionId: undefined,
        WebsiteRedirectLocation: undefined,
    };
    if (output.headers["x-amz-delete-marker"] !== undefined) {
        contents.DeleteMarker = serdePlugin.parseBoolean(output.headers["x-amz-delete-marker"]);
    }
    if (output.headers["accept-ranges"] !== undefined) {
        contents.AcceptRanges = output.headers["accept-ranges"];
    }
    if (output.headers["x-amz-expiration"] !== undefined) {
        contents.Expiration = output.headers["x-amz-expiration"];
    }
    if (output.headers["x-amz-restore"] !== undefined) {
        contents.Restore = output.headers["x-amz-restore"];
    }
    if (output.headers["last-modified"] !== undefined) {
        contents.LastModified = new Date(output.headers["last-modified"]);
    }
    if (output.headers["content-length"] !== undefined) {
        contents.ContentLength = serdePlugin.strictParseInt(output.headers["content-length"]);
    }
    if (output.headers["etag"] !== undefined) {
        contents.ETag = output.headers["etag"];
    }
    if (output.headers["x-amz-missing-meta"] !== undefined) {
        contents.MissingMeta = serdePlugin.strictParseInt(output.headers["x-amz-missing-meta"]);
    }
    if (output.headers["x-amz-version-id"] !== undefined) {
        contents.VersionId = output.headers["x-amz-version-id"];
    }
    if (output.headers["cache-control"] !== undefined) {
        contents.CacheControl = output.headers["cache-control"];
    }
    if (output.headers["content-disposition"] !== undefined) {
        contents.ContentDisposition = output.headers["content-disposition"];
    }
    if (output.headers["content-encoding"] !== undefined) {
        contents.ContentEncoding = output.headers["content-encoding"];
    }
    if (output.headers["content-language"] !== undefined) {
        contents.ContentLanguage = output.headers["content-language"];
    }
    if (output.headers["content-range"] !== undefined) {
        contents.ContentRange = output.headers["content-range"];
    }
    if (output.headers["content-type"] !== undefined) {
        contents.ContentType = output.headers["content-type"];
    }
    if (output.headers["expires"] !== undefined) {
        contents.Expires = new Date(output.headers["expires"]);
    }
    if (output.headers["x-amz-website-redirect-location"] !== undefined) {
        contents.WebsiteRedirectLocation = output.headers["x-amz-website-redirect-location"];
    }
    if (output.headers["x-amz-server-side-encryption"] !== undefined) {
        contents.ServerSideEncryption = output.headers["x-amz-server-side-encryption"];
    }
    if (output.headers["x-amz-server-side-encryption-customer-algorithm"] !== undefined) {
        contents.SSECustomerAlgorithm = output.headers["x-amz-server-side-encryption-customer-algorithm"];
    }
    if (output.headers["x-amz-server-side-encryption-customer-key-md5"] !== undefined) {
        contents.SSECustomerKeyMD5 = output.headers["x-amz-server-side-encryption-customer-key-md5"];
    }
    if (output.headers["x-amz-server-side-encryption-aws-kms-key-id"] !== undefined) {
        contents.SSEKMSKeyId = output.headers["x-amz-server-side-encryption-aws-kms-key-id"];
    }
    if (output.headers["x-amz-server-side-encryption-bucket-key-enabled"] !== undefined) {
        contents.BucketKeyEnabled = serdePlugin.parseBoolean(output.headers["x-amz-server-side-encryption-bucket-key-enabled"]);
    }
    if (output.headers["x-amz-storage-class"] !== undefined) {
        contents.StorageClass = output.headers["x-amz-storage-class"];
    }
    if (output.headers["x-amz-request-charged"] !== undefined) {
        contents.RequestCharged = output.headers["x-amz-request-charged"];
    }
    if (output.headers["x-amz-replication-status"] !== undefined) {
        contents.ReplicationStatus = output.headers["x-amz-replication-status"];
    }
    if (output.headers["x-amz-mp-parts-count"] !== undefined) {
        contents.PartsCount = serdePlugin.strictParseInt(output.headers["x-amz-mp-parts-count"]);
    }
    if (output.headers["x-amz-tagging-count"] !== undefined) {
        contents.TagCount = serdePlugin.strictParseInt(output.headers["x-amz-tagging-count"]);
    }
    if (output.headers["x-amz-object-lock-mode"] !== undefined) {
        contents.ObjectLockMode = output.headers["x-amz-object-lock-mode"];
    }
    if (output.headers["x-amz-object-lock-retain-until-date"] !== undefined) {
        contents.ObjectLockRetainUntilDate = new Date(output.headers["x-amz-object-lock-retain-until-date"]);
    }
    if (output.headers["x-amz-object-lock-legal-hold"] !== undefined) {
        contents.ObjectLockLegalHoldStatus = output.headers["x-amz-object-lock-legal-hold"];
    }
    Object.keys(output.headers).forEach((header) => {
        if (contents.Metadata === undefined) {
            contents.Metadata = {};
        }
        if (header.startsWith("x-amz-meta-")) {
            contents.Metadata[header.substring(11)] = output.headers[header];
        }
    });
    const data = output.body;
    contents.Body = data;
    return Promise.resolve(contents);
};
const deserializeAws_restXmlGetObjectCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestXmlErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidObjectState":
        case "com.amazonaws.s3#InvalidObjectState":
            response = {
                ...(await deserializeAws_restXmlInvalidObjectStateResponse(parsedOutput)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "NoSuchKey":
        case "com.amazonaws.s3#NoSuchKey":
            response = {
                ...(await deserializeAws_restXmlNoSuchKeyResponse(parsedOutput)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_restXmlPutObjectCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restXmlPutObjectCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        BucketKeyEnabled: undefined,
        ETag: undefined,
        Expiration: undefined,
        RequestCharged: undefined,
        SSECustomerAlgorithm: undefined,
        SSECustomerKeyMD5: undefined,
        SSEKMSEncryptionContext: undefined,
        SSEKMSKeyId: undefined,
        ServerSideEncryption: undefined,
        VersionId: undefined,
    };
    if (output.headers["x-amz-expiration"] !== undefined) {
        contents.Expiration = output.headers["x-amz-expiration"];
    }
    if (output.headers["etag"] !== undefined) {
        contents.ETag = output.headers["etag"];
    }
    if (output.headers["x-amz-server-side-encryption"] !== undefined) {
        contents.ServerSideEncryption = output.headers["x-amz-server-side-encryption"];
    }
    if (output.headers["x-amz-version-id"] !== undefined) {
        contents.VersionId = output.headers["x-amz-version-id"];
    }
    if (output.headers["x-amz-server-side-encryption-customer-algorithm"] !== undefined) {
        contents.SSECustomerAlgorithm = output.headers["x-amz-server-side-encryption-customer-algorithm"];
    }
    if (output.headers["x-amz-server-side-encryption-customer-key-md5"] !== undefined) {
        contents.SSECustomerKeyMD5 = output.headers["x-amz-server-side-encryption-customer-key-md5"];
    }
    if (output.headers["x-amz-server-side-encryption-aws-kms-key-id"] !== undefined) {
        contents.SSEKMSKeyId = output.headers["x-amz-server-side-encryption-aws-kms-key-id"];
    }
    if (output.headers["x-amz-server-side-encryption-context"] !== undefined) {
        contents.SSEKMSEncryptionContext = output.headers["x-amz-server-side-encryption-context"];
    }
    if (output.headers["x-amz-server-side-encryption-bucket-key-enabled"] !== undefined) {
        contents.BucketKeyEnabled = serdePlugin.parseBoolean(output.headers["x-amz-server-side-encryption-bucket-key-enabled"]);
    }
    if (output.headers["x-amz-request-charged"] !== undefined) {
        contents.RequestCharged = output.headers["x-amz-request-charged"];
    }
    await collectBody(output.body, context);
    return Promise.resolve(contents);
};
const deserializeAws_restXmlPutObjectCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestXmlErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_restXmlInvalidObjectStateResponse = async (parsedOutput, context) => {
    const contents = {
        name: "InvalidObjectState",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        AccessTier: undefined,
        StorageClass: undefined,
    };
    const data = parsedOutput.body;
    if (data["AccessTier"] !== undefined) {
        contents.AccessTier = serdePlugin.expectString(data["AccessTier"]);
    }
    if (data["StorageClass"] !== undefined) {
        contents.StorageClass = serdePlugin.expectString(data["StorageClass"]);
    }
    return contents;
};
const deserializeAws_restXmlNoSuchKeyResponse = async (parsedOutput, context) => {
    const contents = {
        name: "NoSuchKey",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
    };
    parsedOutput.body;
    return contents;
};
const deserializeMetadata = (output) => {
    var _a;
    return ({
        httpStatusCode: output.statusCode,
        requestId: (_a = output.headers["x-amzn-requestid"]) !== null && _a !== void 0 ? _a : output.headers["x-amzn-request-id"],
        extendedRequestId: output.headers["x-amz-id-2"],
        cfId: output.headers["x-amz-cf-id"],
    });
};
// Collect low-level response body stream to Uint8Array.
const collectBody = (streamBody = new Uint8Array(), context) => {
    if (streamBody instanceof Uint8Array) {
        return Promise.resolve(streamBody);
    }
    return context.streamCollector(streamBody) || Promise.resolve(new Uint8Array());
};
// Encode Uint8Array data into string with utf-8.
const collectBodyString = (streamBody, context) => collectBody(streamBody, context).then((body) => context.utf8Encoder(body));
const isSerializableHeaderValue = (value) => value !== undefined &&
    value !== null &&
    value !== "" &&
    (!Object.getOwnPropertyNames(value).includes("length") || value.length != 0) &&
    (!Object.getOwnPropertyNames(value).includes("size") || value.size != 0);
const parseBody = (streamBody, context) => collectBodyString(streamBody, context).then((encoded) => {
    if (encoded.length) {
        const parsedObj = serdePlugin.parser.parse(encoded, {
            attributeNamePrefix: "",
            ignoreAttributes: false,
            parseNodeValue: false,
            trimValues: false,
            tagValueProcessor: (val) => (val.trim() === "" && val.includes("\n") ? "" : serdePlugin.lib.decodeHTML(val)),
        });
        const textNodeName = "#text";
        const key = Object.keys(parsedObj)[0];
        const parsedObjToReturn = parsedObj[key];
        if (parsedObjToReturn[textNodeName]) {
            parsedObjToReturn[key] = parsedObjToReturn[textNodeName];
            delete parsedObjToReturn[textNodeName];
        }
        return serdePlugin.getValueFromTextNode(parsedObjToReturn);
    }
    return {};
});
const loadRestXmlErrorCode = (output, data) => {
    if (data.Code !== undefined) {
        return data.Code;
    }
    if (output.statusCode == 404) {
        return "NotFound";
    }
    return "";
};

function ssecMiddleware(options) {
    var _this = this;
    return function (next) {
        return function (args) { return serdePlugin.__awaiter(_this, void 0, void 0, function () {
            var input, properties, properties_1, properties_1_1, prop, value, valueView, encoded, hash, _a, _b, _c, _d, e_1_1;
            var e_1, _e, _f;
            return serdePlugin.__generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        input = serdePlugin.__assign({}, args.input);
                        properties = [
                            {
                                target: "SSECustomerKey",
                                hash: "SSECustomerKeyMD5",
                            },
                            {
                                target: "CopySourceSSECustomerKey",
                                hash: "CopySourceSSECustomerKeyMD5",
                            },
                        ];
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 6, 7, 8]);
                        properties_1 = serdePlugin.__values(properties), properties_1_1 = properties_1.next();
                        _g.label = 2;
                    case 2:
                        if (!!properties_1_1.done) return [3 /*break*/, 5];
                        prop = properties_1_1.value;
                        value = input[prop.target];
                        if (!value) return [3 /*break*/, 4];
                        valueView = ArrayBuffer.isView(value)
                            ? new Uint8Array(value.buffer, value.byteOffset, value.byteLength)
                            : typeof value === "string"
                                ? options.utf8Decoder(value)
                                : new Uint8Array(value);
                        encoded = options.base64Encoder(valueView);
                        hash = new options.md5();
                        hash.update(valueView);
                        _a = [serdePlugin.__assign({}, input)];
                        _f = {}, _f[prop.target] = encoded;
                        _b = prop.hash;
                        _d = (_c = options).base64Encoder;
                        return [4 /*yield*/, hash.digest()];
                    case 3:
                        input = serdePlugin.__assign.apply(void 0, _a.concat([(_f[_b] = _d.apply(_c, [_g.sent()]), _f)]));
                        _g.label = 4;
                    case 4:
                        properties_1_1 = properties_1.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_1_1 = _g.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (properties_1_1 && !properties_1_1.done && (_e = properties_1.return)) _e.call(properties_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/, next(serdePlugin.__assign(serdePlugin.__assign({}, args), { input: input }))];
                }
            });
        }); };
    };
}
var ssecMiddlewareOptions = {
    name: "ssecMiddleware",
    step: "initialize",
    tags: ["SSE"],
    override: true,
};
var getSsecPlugin = function (config) { return ({
    applyToStack: function (clientStack) {
        clientStack.add(ssecMiddleware(config), ssecMiddlewareOptions);
    },
}); };

exports.deserializeAws_restXmlGetObjectCommand = deserializeAws_restXmlGetObjectCommand;
exports.deserializeAws_restXmlPutObjectCommand = deserializeAws_restXmlPutObjectCommand;
exports.getBucketEndpointPlugin = getBucketEndpointPlugin;
exports.getSsecPlugin = getSsecPlugin;
exports.serializeAws_restXmlGetObjectCommand = serializeAws_restXmlGetObjectCommand;
exports.serializeAws_restXmlPutObjectCommand = serializeAws_restXmlPutObjectCommand;
