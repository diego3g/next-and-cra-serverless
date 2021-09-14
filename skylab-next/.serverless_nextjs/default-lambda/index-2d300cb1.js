'use strict';

var serdePlugin = require('./serdePlugin-281f3123.js');
var defaultRoleAssumers = require('./defaultRoleAssumers-cd1582cc.js');
require('http2');
require('stream');
require('./default-handler-8e2cab56.js');
require('./prerender-manifest.json');
require('./manifest.json');
require('./routes-manifest.json');
require('zlib');
require('http');
require('perf_hooks');
require('url');
require('buffer');
require('fs');
require('os');
require('path');
require('crypto');
require('https');
require('process');
require('child_process');

var name = "@aws-sdk/client-sqs";
var description = "AWS SDK for JavaScript Sqs Client for Node.js, Browser and React Native";
var version = "3.27.0";
var scripts = {
	clean: "yarn remove-definitions && yarn remove-dist && yarn remove-documentation",
	"build-documentation": "yarn remove-documentation && typedoc ./",
	"remove-definitions": "rimraf ./types",
	"remove-dist": "rimraf ./dist",
	"remove-documentation": "rimraf ./docs",
	test: "exit 0",
	"build:cjs": "tsc -p tsconfig.json",
	"build:es": "tsc -p tsconfig.es.json",
	build: "yarn build:cjs && yarn build:es",
	"downlevel-dts": "downlevel-dts dist/types dist/types/ts3.4"
};
var main = "./dist/cjs/index.js";
var types = "./dist/types/index.d.ts";
var module$1 = "./dist/es/index.js";
var browser = {
	"./runtimeConfig": "./runtimeConfig.browser"
};
var sideEffects = false;
var dependencies = {
	"@aws-crypto/sha256-browser": "^1.0.0",
	"@aws-crypto/sha256-js": "^1.0.0",
	"@aws-sdk/client-sts": "3.27.0",
	"@aws-sdk/config-resolver": "3.27.0",
	"@aws-sdk/credential-provider-node": "3.27.0",
	"@aws-sdk/fetch-http-handler": "3.25.0",
	"@aws-sdk/hash-node": "3.25.0",
	"@aws-sdk/invalid-dependency": "3.25.0",
	"@aws-sdk/md5-js": "3.25.0",
	"@aws-sdk/middleware-content-length": "3.25.0",
	"@aws-sdk/middleware-host-header": "3.25.0",
	"@aws-sdk/middleware-logger": "3.25.0",
	"@aws-sdk/middleware-retry": "3.27.0",
	"@aws-sdk/middleware-sdk-sqs": "3.25.0",
	"@aws-sdk/middleware-serde": "3.25.0",
	"@aws-sdk/middleware-signing": "3.27.0",
	"@aws-sdk/middleware-stack": "3.25.0",
	"@aws-sdk/middleware-user-agent": "3.25.0",
	"@aws-sdk/node-config-provider": "3.27.0",
	"@aws-sdk/node-http-handler": "3.25.0",
	"@aws-sdk/protocol-http": "3.25.0",
	"@aws-sdk/smithy-client": "3.27.0",
	"@aws-sdk/types": "3.25.0",
	"@aws-sdk/url-parser": "3.25.0",
	"@aws-sdk/util-base64-browser": "3.23.0",
	"@aws-sdk/util-base64-node": "3.23.0",
	"@aws-sdk/util-body-length-browser": "3.23.0",
	"@aws-sdk/util-body-length-node": "3.23.0",
	"@aws-sdk/util-user-agent-browser": "3.25.0",
	"@aws-sdk/util-user-agent-node": "3.27.0",
	"@aws-sdk/util-utf8-browser": "3.23.0",
	"@aws-sdk/util-utf8-node": "3.23.0",
	entities: "2.2.0",
	"fast-xml-parser": "3.19.0",
	tslib: "^2.3.0"
};
var devDependencies = {
	"@aws-sdk/client-documentation-generator": "3.23.0",
	"@types/node": "^12.7.5",
	"downlevel-dts": "0.7.0",
	jest: "^26.1.0",
	rimraf: "^3.0.0",
	"ts-jest": "^26.4.1",
	typedoc: "^0.19.2",
	typescript: "~4.3.2"
};
var engines = {
	node: ">=10.0.0"
};
var typesVersions = {
	"<4.0": {
		"dist/types/*": [
			"dist/types/ts3.4/*"
		]
	}
};
var author = {
	name: "AWS SDK for JavaScript Team",
	url: "https://aws.amazon.com/javascript/"
};
var license = "Apache-2.0";
var homepage = "https://github.com/aws/aws-sdk-js-v3/tree/main/clients/client-sqs";
var repository = {
	type: "git",
	url: "https://github.com/aws/aws-sdk-js-v3.git",
	directory: "clients/client-sqs"
};
var packageInfo = {
	name: name,
	description: description,
	version: version,
	scripts: scripts,
	main: main,
	types: types,
	module: module$1,
	browser: browser,
	"react-native": {
	"./runtimeConfig": "./runtimeConfig.native"
},
	sideEffects: sideEffects,
	dependencies: dependencies,
	devDependencies: devDependencies,
	engines: engines,
	typesVersions: typesVersions,
	author: author,
	license: license,
	homepage: homepage,
	repository: repository
};

/**
 * The XML parser will set one K:V for a member that could
 * return multiple entries but only has one.
 */
var getArrayIfSingleItem = function (mayBeArray) {
    return Array.isArray(mayBeArray) ? mayBeArray : [mayBeArray];
};

// Partition default templates
var AWS_TEMPLATE = "sqs.{region}.amazonaws.com";
var AWS_CN_TEMPLATE = "sqs.{region}.amazonaws.com.cn";
var AWS_ISO_TEMPLATE = "sqs.{region}.c2s.ic.gov";
var AWS_ISO_B_TEMPLATE = "sqs.{region}.sc2s.sgov.gov";
var AWS_US_GOV_TEMPLATE = "sqs.{region}.amazonaws.com";
// Partition regions
var AWS_REGIONS = new Set([
    "af-south-1",
    "ap-east-1",
    "ap-northeast-1",
    "ap-northeast-2",
    "ap-northeast-3",
    "ap-south-1",
    "ap-southeast-1",
    "ap-southeast-2",
    "ca-central-1",
    "eu-central-1",
    "eu-north-1",
    "eu-south-1",
    "eu-west-1",
    "eu-west-2",
    "eu-west-3",
    "me-south-1",
    "sa-east-1",
    "us-east-1",
    "us-east-2",
    "us-west-1",
    "us-west-2",
]);
var AWS_CN_REGIONS = new Set(["cn-north-1", "cn-northwest-1"]);
var AWS_ISO_REGIONS = new Set(["us-iso-east-1"]);
var AWS_ISO_B_REGIONS = new Set(["us-isob-east-1"]);
var AWS_US_GOV_REGIONS = new Set(["us-gov-east-1", "us-gov-west-1"]);
var defaultRegionInfoProvider = function (region, options) {
    var regionInfo = undefined;
    switch (region) {
        // First, try to match exact region names.
        case "af-south-1":
            regionInfo = {
                hostname: "sqs.af-south-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "ap-east-1":
            regionInfo = {
                hostname: "sqs.ap-east-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "ap-northeast-1":
            regionInfo = {
                hostname: "sqs.ap-northeast-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "ap-northeast-2":
            regionInfo = {
                hostname: "sqs.ap-northeast-2.amazonaws.com",
                partition: "aws",
            };
            break;
        case "ap-northeast-3":
            regionInfo = {
                hostname: "sqs.ap-northeast-3.amazonaws.com",
                partition: "aws",
            };
            break;
        case "ap-south-1":
            regionInfo = {
                hostname: "sqs.ap-south-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "ap-southeast-1":
            regionInfo = {
                hostname: "sqs.ap-southeast-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "ap-southeast-2":
            regionInfo = {
                hostname: "sqs.ap-southeast-2.amazonaws.com",
                partition: "aws",
            };
            break;
        case "ca-central-1":
            regionInfo = {
                hostname: "sqs.ca-central-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "cn-north-1":
            regionInfo = {
                hostname: "sqs.cn-north-1.amazonaws.com.cn",
                partition: "aws-cn",
            };
            break;
        case "cn-northwest-1":
            regionInfo = {
                hostname: "sqs.cn-northwest-1.amazonaws.com.cn",
                partition: "aws-cn",
            };
            break;
        case "eu-central-1":
            regionInfo = {
                hostname: "sqs.eu-central-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "eu-north-1":
            regionInfo = {
                hostname: "sqs.eu-north-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "eu-south-1":
            regionInfo = {
                hostname: "sqs.eu-south-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "eu-west-1":
            regionInfo = {
                hostname: "sqs.eu-west-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "eu-west-2":
            regionInfo = {
                hostname: "sqs.eu-west-2.amazonaws.com",
                partition: "aws",
            };
            break;
        case "eu-west-3":
            regionInfo = {
                hostname: "sqs.eu-west-3.amazonaws.com",
                partition: "aws",
            };
            break;
        case "fips-us-east-1":
            regionInfo = {
                hostname: "sqs-fips.us-east-1.amazonaws.com",
                partition: "aws",
                signingRegion: "us-east-1",
            };
            break;
        case "fips-us-east-2":
            regionInfo = {
                hostname: "sqs-fips.us-east-2.amazonaws.com",
                partition: "aws",
                signingRegion: "us-east-2",
            };
            break;
        case "fips-us-west-1":
            regionInfo = {
                hostname: "sqs-fips.us-west-1.amazonaws.com",
                partition: "aws",
                signingRegion: "us-west-1",
            };
            break;
        case "fips-us-west-2":
            regionInfo = {
                hostname: "sqs-fips.us-west-2.amazonaws.com",
                partition: "aws",
                signingRegion: "us-west-2",
            };
            break;
        case "me-south-1":
            regionInfo = {
                hostname: "sqs.me-south-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "sa-east-1":
            regionInfo = {
                hostname: "sqs.sa-east-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "us-east-1":
            regionInfo = {
                hostname: "sqs.us-east-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "us-east-2":
            regionInfo = {
                hostname: "sqs.us-east-2.amazonaws.com",
                partition: "aws",
            };
            break;
        case "us-gov-east-1":
            regionInfo = {
                hostname: "sqs.us-gov-east-1.amazonaws.com",
                partition: "aws-us-gov",
                signingRegion: "us-gov-east-1",
            };
            break;
        case "us-gov-west-1":
            regionInfo = {
                hostname: "sqs.us-gov-west-1.amazonaws.com",
                partition: "aws-us-gov",
                signingRegion: "us-gov-west-1",
            };
            break;
        case "us-iso-east-1":
            regionInfo = {
                hostname: "sqs.us-iso-east-1.c2s.ic.gov",
                partition: "aws-iso",
            };
            break;
        case "us-isob-east-1":
            regionInfo = {
                hostname: "sqs.us-isob-east-1.sc2s.sgov.gov",
                partition: "aws-iso-b",
            };
            break;
        case "us-west-1":
            regionInfo = {
                hostname: "sqs.us-west-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "us-west-2":
            regionInfo = {
                hostname: "sqs.us-west-2.amazonaws.com",
                partition: "aws",
            };
            break;
        // Next, try to match partition endpoints.
        default:
            if (AWS_REGIONS.has(region)) {
                regionInfo = {
                    hostname: AWS_TEMPLATE.replace("{region}", region),
                    partition: "aws",
                };
            }
            if (AWS_CN_REGIONS.has(region)) {
                regionInfo = {
                    hostname: AWS_CN_TEMPLATE.replace("{region}", region),
                    partition: "aws-cn",
                };
            }
            if (AWS_ISO_REGIONS.has(region)) {
                regionInfo = {
                    hostname: AWS_ISO_TEMPLATE.replace("{region}", region),
                    partition: "aws-iso",
                };
            }
            if (AWS_ISO_B_REGIONS.has(region)) {
                regionInfo = {
                    hostname: AWS_ISO_B_TEMPLATE.replace("{region}", region),
                    partition: "aws-iso-b",
                };
            }
            if (AWS_US_GOV_REGIONS.has(region)) {
                regionInfo = {
                    hostname: AWS_US_GOV_TEMPLATE.replace("{region}", region),
                    partition: "aws-us-gov",
                };
            }
            // Finally, assume it's an AWS partition endpoint.
            if (regionInfo === undefined) {
                regionInfo = {
                    hostname: AWS_TEMPLATE.replace("{region}", region),
                    partition: "aws",
                };
            }
    }
    return Promise.resolve(serdePlugin.__assign({ signingService: "sqs" }, regionInfo));
};

/**
 * @internal
 */
var getRuntimeConfig$1 = function (config) {
    var _a, _b, _c, _d, _e;
    if (config === void 0) { config = {}; }
    return ({
        apiVersion: "2012-11-05",
        disableHostPrefix: (_a = config.disableHostPrefix) !== null && _a !== void 0 ? _a : false,
        logger: (_b = config.logger) !== null && _b !== void 0 ? _b : {},
        regionInfoProvider: (_c = config.regionInfoProvider) !== null && _c !== void 0 ? _c : defaultRegionInfoProvider,
        serviceId: (_d = config.serviceId) !== null && _d !== void 0 ? _d : "SQS",
        urlParser: (_e = config.urlParser) !== null && _e !== void 0 ? _e : defaultRoleAssumers.parseUrl,
    });
};

/**
 * @internal
 */
var getRuntimeConfig = function (config) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    if (config === void 0) { config = {}; }
    defaultRoleAssumers.emitWarningIfUnsupportedVersion(process.version);
    var clientSharedValues = getRuntimeConfig$1(config);
    return serdePlugin.__assign(serdePlugin.__assign(serdePlugin.__assign({}, clientSharedValues), config), { runtime: "node", base64Decoder: (_a = config.base64Decoder) !== null && _a !== void 0 ? _a : defaultRoleAssumers.fromBase64, base64Encoder: (_b = config.base64Encoder) !== null && _b !== void 0 ? _b : defaultRoleAssumers.toBase64, bodyLengthChecker: (_c = config.bodyLengthChecker) !== null && _c !== void 0 ? _c : defaultRoleAssumers.calculateBodyLength, credentialDefaultProvider: (_d = config.credentialDefaultProvider) !== null && _d !== void 0 ? _d : defaultRoleAssumers.decorateDefaultCredentialProvider(defaultRoleAssumers.defaultProvider), defaultUserAgentProvider: (_e = config.defaultUserAgentProvider) !== null && _e !== void 0 ? _e : defaultRoleAssumers.defaultUserAgent({ serviceId: clientSharedValues.serviceId, clientVersion: packageInfo.version }), maxAttempts: (_f = config.maxAttempts) !== null && _f !== void 0 ? _f : defaultRoleAssumers.loadConfig(defaultRoleAssumers.NODE_MAX_ATTEMPT_CONFIG_OPTIONS), md5: (_g = config.md5) !== null && _g !== void 0 ? _g : defaultRoleAssumers.Hash.bind(null, "md5"), region: (_h = config.region) !== null && _h !== void 0 ? _h : defaultRoleAssumers.loadConfig(defaultRoleAssumers.NODE_REGION_CONFIG_OPTIONS, defaultRoleAssumers.NODE_REGION_CONFIG_FILE_OPTIONS), requestHandler: (_j = config.requestHandler) !== null && _j !== void 0 ? _j : new defaultRoleAssumers.NodeHttpHandler(), retryModeProvider: (_k = config.retryModeProvider) !== null && _k !== void 0 ? _k : defaultRoleAssumers.loadConfig(defaultRoleAssumers.NODE_RETRY_MODE_CONFIG_OPTIONS), sha256: (_l = config.sha256) !== null && _l !== void 0 ? _l : defaultRoleAssumers.Hash.bind(null, "sha256"), streamCollector: (_m = config.streamCollector) !== null && _m !== void 0 ? _m : defaultRoleAssumers.streamCollector, utf8Decoder: (_o = config.utf8Decoder) !== null && _o !== void 0 ? _o : defaultRoleAssumers.fromUtf8, utf8Encoder: (_p = config.utf8Encoder) !== null && _p !== void 0 ? _p : defaultRoleAssumers.toUtf8 });
};

/**
 * <p>Welcome to the <i>Amazon SQS API Reference</i>.</p>
 *         <p>Amazon SQS is a reliable, highly-scalable hosted queue for storing messages as they travel between applications or microservices. Amazon SQS moves data between distributed application components and helps you decouple these components.</p>
 *         <p>For information on the permissions you need to use this API, see
 *             <a href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-authentication-and-access-control.html">Identity and
 *             access management</a> in the <i>Amazon SQS Developer Guide.</i>
 *          </p>
 *         <p>You can use <a href="http://aws.amazon.com/tools/#sdk">Amazon Web Services SDKs</a> to access Amazon SQS using your favorite programming language. The SDKs perform tasks such as the following automatically:</p>
 *         <ul>
 *             <li>
 *                 <p>Cryptographically sign your service requests</p>
 *             </li>
 *             <li>
 *                 <p>Retry requests</p>
 *             </li>
 *             <li>
 *                 <p>Handle error responses</p>
 *             </li>
 *          </ul>
 *
 *         <p>
 *             <b>Additional information</b>
 *          </p>
 *         <ul>
 *             <li>
 *                 <p>
 *                     <a href="http://aws.amazon.com/sqs/">Amazon SQS Product Page</a>
 *                 </p>
 *             </li>
 *             <li>
 *                 <p>
 *                   <i>Amazon SQS Developer Guide</i>
 *                </p>
 *                 <ul>
 *                   <li>
 *                      <p>
 *                         <a href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-making-api-requests.html">Making API Requests</a>
 *                      </p>
 *                   </li>
 *                   <li>
 *                      <p>
 *                         <a href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-metadata.html#sqs-message-attributes">Amazon SQS Message Attributes</a>
 *                      </p>
 *                   </li>
 *                   <li>
 *                      <p>
 *                         <a href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html">Amazon SQS Dead-Letter Queues</a>
 *                      </p>
 *                   </li>
 *                </ul>
 *             </li>
 *             <li>
 *                 <p>
 *                   <a href="http://docs.aws.amazon.com/cli/latest/reference/sqs/index.html">Amazon SQS in the <i>Command Line Interface</i>
 *                   </a>
 *                </p>
 *             </li>
 *             <li>
 *                 <p>
 *                   <i>Amazon Web Services General Reference</i>
 *                </p>
 *                 <ul>
 *                   <li>
 *                      <p>
 *                         <a href="https://docs.aws.amazon.com/general/latest/gr/rande.html#sqs_region">Regions and Endpoints</a>
 *                      </p>
 *                   </li>
 *                </ul>
 *             </li>
 *          </ul>
 */
var SQSClient = /** @class */ (function (_super) {
    serdePlugin.__extends(SQSClient, _super);
    function SQSClient(configuration) {
        var _this = this;
        var _config_0 = getRuntimeConfig(configuration);
        var _config_1 = defaultRoleAssumers.resolveRegionConfig(_config_0);
        var _config_2 = defaultRoleAssumers.resolveEndpointsConfig(_config_1);
        var _config_3 = defaultRoleAssumers.resolveRetryConfig(_config_2);
        var _config_4 = defaultRoleAssumers.resolveHostHeaderConfig(_config_3);
        var _config_5 = defaultRoleAssumers.resolveAwsAuthConfig(_config_4);
        var _config_6 = defaultRoleAssumers.resolveUserAgentConfig(_config_5);
        _this = _super.call(this, _config_6) || this;
        _this.config = _config_6;
        _this.middlewareStack.use(defaultRoleAssumers.getRetryPlugin(_this.config));
        _this.middlewareStack.use(defaultRoleAssumers.getContentLengthPlugin(_this.config));
        _this.middlewareStack.use(defaultRoleAssumers.getHostHeaderPlugin(_this.config));
        _this.middlewareStack.use(defaultRoleAssumers.getLoggerPlugin(_this.config));
        _this.middlewareStack.use(defaultRoleAssumers.getAwsAuthPlugin(_this.config));
        _this.middlewareStack.use(defaultRoleAssumers.getUserAgentPlugin(_this.config));
        return _this;
    }
    /**
     * Destroy underlying resources, like sockets. It's usually not necessary to do this.
     * However in Node.js, it's best to explicitly shut down the client's agent when it is no longer needed.
     * Otherwise, sockets might stay open for quite a long time before the server terminates them.
     */
    SQSClient.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
    };
    return SQSClient;
}(serdePlugin.Client));

exports.AddPermissionRequest = void 0;
(function (AddPermissionRequest) {
    /**
     * @internal
     */
    AddPermissionRequest.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.AddPermissionRequest || (exports.AddPermissionRequest = {}));
exports.OverLimit = void 0;
(function (OverLimit) {
    /**
     * @internal
     */
    OverLimit.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.OverLimit || (exports.OverLimit = {}));
exports.ChangeMessageVisibilityRequest = void 0;
(function (ChangeMessageVisibilityRequest) {
    /**
     * @internal
     */
    ChangeMessageVisibilityRequest.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.ChangeMessageVisibilityRequest || (exports.ChangeMessageVisibilityRequest = {}));
exports.MessageNotInflight = void 0;
(function (MessageNotInflight) {
    /**
     * @internal
     */
    MessageNotInflight.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.MessageNotInflight || (exports.MessageNotInflight = {}));
exports.ReceiptHandleIsInvalid = void 0;
(function (ReceiptHandleIsInvalid) {
    /**
     * @internal
     */
    ReceiptHandleIsInvalid.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.ReceiptHandleIsInvalid || (exports.ReceiptHandleIsInvalid = {}));
exports.BatchEntryIdsNotDistinct = void 0;
(function (BatchEntryIdsNotDistinct) {
    /**
     * @internal
     */
    BatchEntryIdsNotDistinct.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.BatchEntryIdsNotDistinct || (exports.BatchEntryIdsNotDistinct = {}));
exports.ChangeMessageVisibilityBatchRequestEntry = void 0;
(function (ChangeMessageVisibilityBatchRequestEntry) {
    /**
     * @internal
     */
    ChangeMessageVisibilityBatchRequestEntry.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.ChangeMessageVisibilityBatchRequestEntry || (exports.ChangeMessageVisibilityBatchRequestEntry = {}));
exports.ChangeMessageVisibilityBatchRequest = void 0;
(function (ChangeMessageVisibilityBatchRequest) {
    /**
     * @internal
     */
    ChangeMessageVisibilityBatchRequest.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.ChangeMessageVisibilityBatchRequest || (exports.ChangeMessageVisibilityBatchRequest = {}));
exports.BatchResultErrorEntry = void 0;
(function (BatchResultErrorEntry) {
    /**
     * @internal
     */
    BatchResultErrorEntry.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.BatchResultErrorEntry || (exports.BatchResultErrorEntry = {}));
exports.ChangeMessageVisibilityBatchResultEntry = void 0;
(function (ChangeMessageVisibilityBatchResultEntry) {
    /**
     * @internal
     */
    ChangeMessageVisibilityBatchResultEntry.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.ChangeMessageVisibilityBatchResultEntry || (exports.ChangeMessageVisibilityBatchResultEntry = {}));
exports.ChangeMessageVisibilityBatchResult = void 0;
(function (ChangeMessageVisibilityBatchResult) {
    /**
     * @internal
     */
    ChangeMessageVisibilityBatchResult.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.ChangeMessageVisibilityBatchResult || (exports.ChangeMessageVisibilityBatchResult = {}));
exports.EmptyBatchRequest = void 0;
(function (EmptyBatchRequest) {
    /**
     * @internal
     */
    EmptyBatchRequest.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.EmptyBatchRequest || (exports.EmptyBatchRequest = {}));
exports.InvalidBatchEntryId = void 0;
(function (InvalidBatchEntryId) {
    /**
     * @internal
     */
    InvalidBatchEntryId.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.InvalidBatchEntryId || (exports.InvalidBatchEntryId = {}));
exports.TooManyEntriesInBatchRequest = void 0;
(function (TooManyEntriesInBatchRequest) {
    /**
     * @internal
     */
    TooManyEntriesInBatchRequest.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.TooManyEntriesInBatchRequest || (exports.TooManyEntriesInBatchRequest = {}));
exports.CreateQueueRequest = void 0;
(function (CreateQueueRequest) {
    /**
     * @internal
     */
    CreateQueueRequest.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.CreateQueueRequest || (exports.CreateQueueRequest = {}));
exports.CreateQueueResult = void 0;
(function (CreateQueueResult) {
    /**
     * @internal
     */
    CreateQueueResult.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.CreateQueueResult || (exports.CreateQueueResult = {}));
exports.QueueDeletedRecently = void 0;
(function (QueueDeletedRecently) {
    /**
     * @internal
     */
    QueueDeletedRecently.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.QueueDeletedRecently || (exports.QueueDeletedRecently = {}));
exports.QueueNameExists = void 0;
(function (QueueNameExists) {
    /**
     * @internal
     */
    QueueNameExists.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.QueueNameExists || (exports.QueueNameExists = {}));
exports.DeleteMessageRequest = void 0;
(function (DeleteMessageRequest) {
    /**
     * @internal
     */
    DeleteMessageRequest.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.DeleteMessageRequest || (exports.DeleteMessageRequest = {}));
exports.InvalidIdFormat = void 0;
(function (InvalidIdFormat) {
    /**
     * @internal
     */
    InvalidIdFormat.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.InvalidIdFormat || (exports.InvalidIdFormat = {}));
exports.DeleteMessageBatchRequestEntry = void 0;
(function (DeleteMessageBatchRequestEntry) {
    /**
     * @internal
     */
    DeleteMessageBatchRequestEntry.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.DeleteMessageBatchRequestEntry || (exports.DeleteMessageBatchRequestEntry = {}));
exports.DeleteMessageBatchRequest = void 0;
(function (DeleteMessageBatchRequest) {
    /**
     * @internal
     */
    DeleteMessageBatchRequest.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.DeleteMessageBatchRequest || (exports.DeleteMessageBatchRequest = {}));
exports.DeleteMessageBatchResultEntry = void 0;
(function (DeleteMessageBatchResultEntry) {
    /**
     * @internal
     */
    DeleteMessageBatchResultEntry.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.DeleteMessageBatchResultEntry || (exports.DeleteMessageBatchResultEntry = {}));
exports.DeleteMessageBatchResult = void 0;
(function (DeleteMessageBatchResult) {
    /**
     * @internal
     */
    DeleteMessageBatchResult.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.DeleteMessageBatchResult || (exports.DeleteMessageBatchResult = {}));
exports.DeleteQueueRequest = void 0;
(function (DeleteQueueRequest) {
    /**
     * @internal
     */
    DeleteQueueRequest.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.DeleteQueueRequest || (exports.DeleteQueueRequest = {}));
exports.GetQueueAttributesRequest = void 0;
(function (GetQueueAttributesRequest) {
    /**
     * @internal
     */
    GetQueueAttributesRequest.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.GetQueueAttributesRequest || (exports.GetQueueAttributesRequest = {}));
exports.GetQueueAttributesResult = void 0;
(function (GetQueueAttributesResult) {
    /**
     * @internal
     */
    GetQueueAttributesResult.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.GetQueueAttributesResult || (exports.GetQueueAttributesResult = {}));
exports.InvalidAttributeName = void 0;
(function (InvalidAttributeName) {
    /**
     * @internal
     */
    InvalidAttributeName.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.InvalidAttributeName || (exports.InvalidAttributeName = {}));
exports.GetQueueUrlRequest = void 0;
(function (GetQueueUrlRequest) {
    /**
     * @internal
     */
    GetQueueUrlRequest.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.GetQueueUrlRequest || (exports.GetQueueUrlRequest = {}));
exports.GetQueueUrlResult = void 0;
(function (GetQueueUrlResult) {
    /**
     * @internal
     */
    GetQueueUrlResult.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.GetQueueUrlResult || (exports.GetQueueUrlResult = {}));
exports.QueueDoesNotExist = void 0;
(function (QueueDoesNotExist) {
    /**
     * @internal
     */
    QueueDoesNotExist.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.QueueDoesNotExist || (exports.QueueDoesNotExist = {}));
exports.ListDeadLetterSourceQueuesRequest = void 0;
(function (ListDeadLetterSourceQueuesRequest) {
    /**
     * @internal
     */
    ListDeadLetterSourceQueuesRequest.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.ListDeadLetterSourceQueuesRequest || (exports.ListDeadLetterSourceQueuesRequest = {}));
exports.ListDeadLetterSourceQueuesResult = void 0;
(function (ListDeadLetterSourceQueuesResult) {
    /**
     * @internal
     */
    ListDeadLetterSourceQueuesResult.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.ListDeadLetterSourceQueuesResult || (exports.ListDeadLetterSourceQueuesResult = {}));
exports.ListQueuesRequest = void 0;
(function (ListQueuesRequest) {
    /**
     * @internal
     */
    ListQueuesRequest.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.ListQueuesRequest || (exports.ListQueuesRequest = {}));
exports.ListQueuesResult = void 0;
(function (ListQueuesResult) {
    /**
     * @internal
     */
    ListQueuesResult.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.ListQueuesResult || (exports.ListQueuesResult = {}));
exports.ListQueueTagsRequest = void 0;
(function (ListQueueTagsRequest) {
    /**
     * @internal
     */
    ListQueueTagsRequest.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.ListQueueTagsRequest || (exports.ListQueueTagsRequest = {}));
exports.ListQueueTagsResult = void 0;
(function (ListQueueTagsResult) {
    /**
     * @internal
     */
    ListQueueTagsResult.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.ListQueueTagsResult || (exports.ListQueueTagsResult = {}));
exports.PurgeQueueInProgress = void 0;
(function (PurgeQueueInProgress) {
    /**
     * @internal
     */
    PurgeQueueInProgress.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.PurgeQueueInProgress || (exports.PurgeQueueInProgress = {}));
exports.PurgeQueueRequest = void 0;
(function (PurgeQueueRequest) {
    /**
     * @internal
     */
    PurgeQueueRequest.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.PurgeQueueRequest || (exports.PurgeQueueRequest = {}));
exports.ReceiveMessageRequest = void 0;
(function (ReceiveMessageRequest) {
    /**
     * @internal
     */
    ReceiveMessageRequest.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.ReceiveMessageRequest || (exports.ReceiveMessageRequest = {}));
exports.MessageAttributeValue = void 0;
(function (MessageAttributeValue) {
    /**
     * @internal
     */
    MessageAttributeValue.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.MessageAttributeValue || (exports.MessageAttributeValue = {}));
exports.Message = void 0;
(function (Message) {
    /**
     * @internal
     */
    Message.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.Message || (exports.Message = {}));
exports.ReceiveMessageResult = void 0;
(function (ReceiveMessageResult) {
    /**
     * @internal
     */
    ReceiveMessageResult.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.ReceiveMessageResult || (exports.ReceiveMessageResult = {}));
exports.RemovePermissionRequest = void 0;
(function (RemovePermissionRequest) {
    /**
     * @internal
     */
    RemovePermissionRequest.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.RemovePermissionRequest || (exports.RemovePermissionRequest = {}));
exports.InvalidMessageContents = void 0;
(function (InvalidMessageContents) {
    /**
     * @internal
     */
    InvalidMessageContents.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.InvalidMessageContents || (exports.InvalidMessageContents = {}));
exports.MessageSystemAttributeValue = void 0;
(function (MessageSystemAttributeValue) {
    /**
     * @internal
     */
    MessageSystemAttributeValue.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.MessageSystemAttributeValue || (exports.MessageSystemAttributeValue = {}));
exports.SendMessageRequest = void 0;
(function (SendMessageRequest) {
    /**
     * @internal
     */
    SendMessageRequest.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.SendMessageRequest || (exports.SendMessageRequest = {}));
exports.SendMessageResult = void 0;
(function (SendMessageResult) {
    /**
     * @internal
     */
    SendMessageResult.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.SendMessageResult || (exports.SendMessageResult = {}));
exports.UnsupportedOperation = void 0;
(function (UnsupportedOperation) {
    /**
     * @internal
     */
    UnsupportedOperation.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.UnsupportedOperation || (exports.UnsupportedOperation = {}));
exports.BatchRequestTooLong = void 0;
(function (BatchRequestTooLong) {
    /**
     * @internal
     */
    BatchRequestTooLong.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.BatchRequestTooLong || (exports.BatchRequestTooLong = {}));
exports.SendMessageBatchRequestEntry = void 0;
(function (SendMessageBatchRequestEntry) {
    /**
     * @internal
     */
    SendMessageBatchRequestEntry.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.SendMessageBatchRequestEntry || (exports.SendMessageBatchRequestEntry = {}));
exports.SendMessageBatchRequest = void 0;
(function (SendMessageBatchRequest) {
    /**
     * @internal
     */
    SendMessageBatchRequest.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.SendMessageBatchRequest || (exports.SendMessageBatchRequest = {}));
exports.SendMessageBatchResultEntry = void 0;
(function (SendMessageBatchResultEntry) {
    /**
     * @internal
     */
    SendMessageBatchResultEntry.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.SendMessageBatchResultEntry || (exports.SendMessageBatchResultEntry = {}));
exports.SendMessageBatchResult = void 0;
(function (SendMessageBatchResult) {
    /**
     * @internal
     */
    SendMessageBatchResult.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.SendMessageBatchResult || (exports.SendMessageBatchResult = {}));
exports.SetQueueAttributesRequest = void 0;
(function (SetQueueAttributesRequest) {
    /**
     * @internal
     */
    SetQueueAttributesRequest.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.SetQueueAttributesRequest || (exports.SetQueueAttributesRequest = {}));
exports.TagQueueRequest = void 0;
(function (TagQueueRequest) {
    /**
     * @internal
     */
    TagQueueRequest.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.TagQueueRequest || (exports.TagQueueRequest = {}));
exports.UntagQueueRequest = void 0;
(function (UntagQueueRequest) {
    /**
     * @internal
     */
    UntagQueueRequest.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(exports.UntagQueueRequest || (exports.UntagQueueRequest = {}));

var serializeAws_queryAddPermissionCommand = function (input, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return serdePlugin.__generator(this, function (_a) {
        headers = {
            "content-type": "application/x-www-form-urlencoded",
        };
        body = buildFormUrlencodedString(serdePlugin.__assign(serdePlugin.__assign({}, serializeAws_queryAddPermissionRequest(input, context)), { Action: "AddPermission", Version: "2012-11-05" }));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
var serializeAws_queryChangeMessageVisibilityCommand = function (input, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return serdePlugin.__generator(this, function (_a) {
        headers = {
            "content-type": "application/x-www-form-urlencoded",
        };
        body = buildFormUrlencodedString(serdePlugin.__assign(serdePlugin.__assign({}, serializeAws_queryChangeMessageVisibilityRequest(input, context)), { Action: "ChangeMessageVisibility", Version: "2012-11-05" }));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
var serializeAws_queryChangeMessageVisibilityBatchCommand = function (input, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return serdePlugin.__generator(this, function (_a) {
        headers = {
            "content-type": "application/x-www-form-urlencoded",
        };
        body = buildFormUrlencodedString(serdePlugin.__assign(serdePlugin.__assign({}, serializeAws_queryChangeMessageVisibilityBatchRequest(input, context)), { Action: "ChangeMessageVisibilityBatch", Version: "2012-11-05" }));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
var serializeAws_queryCreateQueueCommand = function (input, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return serdePlugin.__generator(this, function (_a) {
        headers = {
            "content-type": "application/x-www-form-urlencoded",
        };
        body = buildFormUrlencodedString(serdePlugin.__assign(serdePlugin.__assign({}, serializeAws_queryCreateQueueRequest(input, context)), { Action: "CreateQueue", Version: "2012-11-05" }));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
var serializeAws_queryDeleteMessageCommand = function (input, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return serdePlugin.__generator(this, function (_a) {
        headers = {
            "content-type": "application/x-www-form-urlencoded",
        };
        body = buildFormUrlencodedString(serdePlugin.__assign(serdePlugin.__assign({}, serializeAws_queryDeleteMessageRequest(input, context)), { Action: "DeleteMessage", Version: "2012-11-05" }));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
var serializeAws_queryDeleteMessageBatchCommand = function (input, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return serdePlugin.__generator(this, function (_a) {
        headers = {
            "content-type": "application/x-www-form-urlencoded",
        };
        body = buildFormUrlencodedString(serdePlugin.__assign(serdePlugin.__assign({}, serializeAws_queryDeleteMessageBatchRequest(input, context)), { Action: "DeleteMessageBatch", Version: "2012-11-05" }));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
var serializeAws_queryDeleteQueueCommand = function (input, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return serdePlugin.__generator(this, function (_a) {
        headers = {
            "content-type": "application/x-www-form-urlencoded",
        };
        body = buildFormUrlencodedString(serdePlugin.__assign(serdePlugin.__assign({}, serializeAws_queryDeleteQueueRequest(input, context)), { Action: "DeleteQueue", Version: "2012-11-05" }));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
var serializeAws_queryGetQueueAttributesCommand = function (input, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return serdePlugin.__generator(this, function (_a) {
        headers = {
            "content-type": "application/x-www-form-urlencoded",
        };
        body = buildFormUrlencodedString(serdePlugin.__assign(serdePlugin.__assign({}, serializeAws_queryGetQueueAttributesRequest(input, context)), { Action: "GetQueueAttributes", Version: "2012-11-05" }));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
var serializeAws_queryGetQueueUrlCommand = function (input, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return serdePlugin.__generator(this, function (_a) {
        headers = {
            "content-type": "application/x-www-form-urlencoded",
        };
        body = buildFormUrlencodedString(serdePlugin.__assign(serdePlugin.__assign({}, serializeAws_queryGetQueueUrlRequest(input, context)), { Action: "GetQueueUrl", Version: "2012-11-05" }));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
var serializeAws_queryListDeadLetterSourceQueuesCommand = function (input, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return serdePlugin.__generator(this, function (_a) {
        headers = {
            "content-type": "application/x-www-form-urlencoded",
        };
        body = buildFormUrlencodedString(serdePlugin.__assign(serdePlugin.__assign({}, serializeAws_queryListDeadLetterSourceQueuesRequest(input, context)), { Action: "ListDeadLetterSourceQueues", Version: "2012-11-05" }));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
var serializeAws_queryListQueuesCommand = function (input, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return serdePlugin.__generator(this, function (_a) {
        headers = {
            "content-type": "application/x-www-form-urlencoded",
        };
        body = buildFormUrlencodedString(serdePlugin.__assign(serdePlugin.__assign({}, serializeAws_queryListQueuesRequest(input, context)), { Action: "ListQueues", Version: "2012-11-05" }));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
var serializeAws_queryListQueueTagsCommand = function (input, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return serdePlugin.__generator(this, function (_a) {
        headers = {
            "content-type": "application/x-www-form-urlencoded",
        };
        body = buildFormUrlencodedString(serdePlugin.__assign(serdePlugin.__assign({}, serializeAws_queryListQueueTagsRequest(input, context)), { Action: "ListQueueTags", Version: "2012-11-05" }));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
var serializeAws_queryPurgeQueueCommand = function (input, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return serdePlugin.__generator(this, function (_a) {
        headers = {
            "content-type": "application/x-www-form-urlencoded",
        };
        body = buildFormUrlencodedString(serdePlugin.__assign(serdePlugin.__assign({}, serializeAws_queryPurgeQueueRequest(input, context)), { Action: "PurgeQueue", Version: "2012-11-05" }));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
var serializeAws_queryReceiveMessageCommand = function (input, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return serdePlugin.__generator(this, function (_a) {
        headers = {
            "content-type": "application/x-www-form-urlencoded",
        };
        body = buildFormUrlencodedString(serdePlugin.__assign(serdePlugin.__assign({}, serializeAws_queryReceiveMessageRequest(input, context)), { Action: "ReceiveMessage", Version: "2012-11-05" }));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
var serializeAws_queryRemovePermissionCommand = function (input, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return serdePlugin.__generator(this, function (_a) {
        headers = {
            "content-type": "application/x-www-form-urlencoded",
        };
        body = buildFormUrlencodedString(serdePlugin.__assign(serdePlugin.__assign({}, serializeAws_queryRemovePermissionRequest(input, context)), { Action: "RemovePermission", Version: "2012-11-05" }));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
var serializeAws_querySendMessageCommand = function (input, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return serdePlugin.__generator(this, function (_a) {
        headers = {
            "content-type": "application/x-www-form-urlencoded",
        };
        body = buildFormUrlencodedString(serdePlugin.__assign(serdePlugin.__assign({}, serializeAws_querySendMessageRequest(input, context)), { Action: "SendMessage", Version: "2012-11-05" }));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
var serializeAws_querySendMessageBatchCommand = function (input, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return serdePlugin.__generator(this, function (_a) {
        headers = {
            "content-type": "application/x-www-form-urlencoded",
        };
        body = buildFormUrlencodedString(serdePlugin.__assign(serdePlugin.__assign({}, serializeAws_querySendMessageBatchRequest(input, context)), { Action: "SendMessageBatch", Version: "2012-11-05" }));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
var serializeAws_querySetQueueAttributesCommand = function (input, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return serdePlugin.__generator(this, function (_a) {
        headers = {
            "content-type": "application/x-www-form-urlencoded",
        };
        body = buildFormUrlencodedString(serdePlugin.__assign(serdePlugin.__assign({}, serializeAws_querySetQueueAttributesRequest(input, context)), { Action: "SetQueueAttributes", Version: "2012-11-05" }));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
var serializeAws_queryTagQueueCommand = function (input, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return serdePlugin.__generator(this, function (_a) {
        headers = {
            "content-type": "application/x-www-form-urlencoded",
        };
        body = buildFormUrlencodedString(serdePlugin.__assign(serdePlugin.__assign({}, serializeAws_queryTagQueueRequest(input, context)), { Action: "TagQueue", Version: "2012-11-05" }));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
var serializeAws_queryUntagQueueCommand = function (input, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return serdePlugin.__generator(this, function (_a) {
        headers = {
            "content-type": "application/x-www-form-urlencoded",
        };
        body = buildFormUrlencodedString(serdePlugin.__assign(serdePlugin.__assign({}, serializeAws_queryUntagQueueRequest(input, context)), { Action: "UntagQueue", Version: "2012-11-05" }));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
var deserializeAws_queryAddPermissionCommand = function (output, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var response;
    return serdePlugin.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_queryAddPermissionCommandError(output, context)];
                }
                return [4 /*yield*/, collectBody(output.body, context)];
            case 1:
                _a.sent();
                response = {
                    $metadata: deserializeMetadata(output),
                };
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_queryAddPermissionCommandError = function (output, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, parsedBody, message;
    var _d;
    return serdePlugin.__generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _a = [serdePlugin.__assign({}, output)];
                _d = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = serdePlugin.__assign.apply(void 0, _a.concat([(_d.body = _e.sent(), _d)]));
                errorCode = "UnknownError";
                errorCode = loadQueryErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "OverLimit": return [3 /*break*/, 2];
                    case "com.amazonaws.sqs#OverLimit": return [3 /*break*/, 2];
                }
                return [3 /*break*/, 4];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_queryOverLimitResponse(parsedOutput, context)];
            case 3:
                response = serdePlugin.__assign.apply(void 0, [serdePlugin.__assign.apply(void 0, _c.concat([(_e.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 5];
            case 4:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.Error.code || parsedBody.Error.Code || errorCode;
                response = serdePlugin.__assign(serdePlugin.__assign({}, parsedBody.Error), { name: "" + errorCode, message: parsedBody.Error.message || parsedBody.Error.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _e.label = 5;
            case 5:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
var deserializeAws_queryChangeMessageVisibilityCommand = function (output, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var response;
    return serdePlugin.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_queryChangeMessageVisibilityCommandError(output, context)];
                }
                return [4 /*yield*/, collectBody(output.body, context)];
            case 1:
                _a.sent();
                response = {
                    $metadata: deserializeMetadata(output),
                };
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_queryChangeMessageVisibilityCommandError = function (output, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, parsedBody, message;
    var _e;
    return serdePlugin.__generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _a = [serdePlugin.__assign({}, output)];
                _e = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = serdePlugin.__assign.apply(void 0, _a.concat([(_e.body = _f.sent(), _e)]));
                errorCode = "UnknownError";
                errorCode = loadQueryErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "MessageNotInflight": return [3 /*break*/, 2];
                    case "com.amazonaws.sqs#MessageNotInflight": return [3 /*break*/, 2];
                    case "ReceiptHandleIsInvalid": return [3 /*break*/, 4];
                    case "com.amazonaws.sqs#ReceiptHandleIsInvalid": return [3 /*break*/, 4];
                }
                return [3 /*break*/, 6];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_queryMessageNotInflightResponse(parsedOutput, context)];
            case 3:
                response = serdePlugin.__assign.apply(void 0, [serdePlugin.__assign.apply(void 0, _c.concat([(_f.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 7];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_queryReceiptHandleIsInvalidResponse(parsedOutput, context)];
            case 5:
                response = serdePlugin.__assign.apply(void 0, [serdePlugin.__assign.apply(void 0, _d.concat([(_f.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 7];
            case 6:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.Error.code || parsedBody.Error.Code || errorCode;
                response = serdePlugin.__assign(serdePlugin.__assign({}, parsedBody.Error), { name: "" + errorCode, message: parsedBody.Error.message || parsedBody.Error.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _f.label = 7;
            case 7:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
var deserializeAws_queryChangeMessageVisibilityBatchCommand = function (output, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return serdePlugin.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_queryChangeMessageVisibilityBatchCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_queryChangeMessageVisibilityBatchResult(data.ChangeMessageVisibilityBatchResult, context);
                response = serdePlugin.__assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_queryChangeMessageVisibilityBatchCommandError = function (output, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, _e, _f, parsedBody, message;
    var _g;
    return serdePlugin.__generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                _a = [serdePlugin.__assign({}, output)];
                _g = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = serdePlugin.__assign.apply(void 0, _a.concat([(_g.body = _h.sent(), _g)]));
                errorCode = "UnknownError";
                errorCode = loadQueryErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "BatchEntryIdsNotDistinct": return [3 /*break*/, 2];
                    case "com.amazonaws.sqs#BatchEntryIdsNotDistinct": return [3 /*break*/, 2];
                    case "EmptyBatchRequest": return [3 /*break*/, 4];
                    case "com.amazonaws.sqs#EmptyBatchRequest": return [3 /*break*/, 4];
                    case "InvalidBatchEntryId": return [3 /*break*/, 6];
                    case "com.amazonaws.sqs#InvalidBatchEntryId": return [3 /*break*/, 6];
                    case "TooManyEntriesInBatchRequest": return [3 /*break*/, 8];
                    case "com.amazonaws.sqs#TooManyEntriesInBatchRequest": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_queryBatchEntryIdsNotDistinctResponse(parsedOutput, context)];
            case 3:
                response = serdePlugin.__assign.apply(void 0, [serdePlugin.__assign.apply(void 0, _c.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_queryEmptyBatchRequestResponse(parsedOutput, context)];
            case 5:
                response = serdePlugin.__assign.apply(void 0, [serdePlugin.__assign.apply(void 0, _d.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_queryInvalidBatchEntryIdResponse(parsedOutput, context)];
            case 7:
                response = serdePlugin.__assign.apply(void 0, [serdePlugin.__assign.apply(void 0, _e.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_queryTooManyEntriesInBatchRequestResponse(parsedOutput, context)];
            case 9:
                response = serdePlugin.__assign.apply(void 0, [serdePlugin.__assign.apply(void 0, _f.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 10:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.Error.code || parsedBody.Error.Code || errorCode;
                response = serdePlugin.__assign(serdePlugin.__assign({}, parsedBody.Error), { name: "" + errorCode, message: parsedBody.Error.message || parsedBody.Error.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _h.label = 11;
            case 11:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
var deserializeAws_queryCreateQueueCommand = function (output, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return serdePlugin.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_queryCreateQueueCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_queryCreateQueueResult(data.CreateQueueResult, context);
                response = serdePlugin.__assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_queryCreateQueueCommandError = function (output, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, parsedBody, message;
    var _e;
    return serdePlugin.__generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _a = [serdePlugin.__assign({}, output)];
                _e = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = serdePlugin.__assign.apply(void 0, _a.concat([(_e.body = _f.sent(), _e)]));
                errorCode = "UnknownError";
                errorCode = loadQueryErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "QueueDeletedRecently": return [3 /*break*/, 2];
                    case "com.amazonaws.sqs#QueueDeletedRecently": return [3 /*break*/, 2];
                    case "QueueNameExists": return [3 /*break*/, 4];
                    case "com.amazonaws.sqs#QueueNameExists": return [3 /*break*/, 4];
                }
                return [3 /*break*/, 6];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_queryQueueDeletedRecentlyResponse(parsedOutput, context)];
            case 3:
                response = serdePlugin.__assign.apply(void 0, [serdePlugin.__assign.apply(void 0, _c.concat([(_f.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 7];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_queryQueueNameExistsResponse(parsedOutput, context)];
            case 5:
                response = serdePlugin.__assign.apply(void 0, [serdePlugin.__assign.apply(void 0, _d.concat([(_f.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 7];
            case 6:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.Error.code || parsedBody.Error.Code || errorCode;
                response = serdePlugin.__assign(serdePlugin.__assign({}, parsedBody.Error), { name: "" + errorCode, message: parsedBody.Error.message || parsedBody.Error.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _f.label = 7;
            case 7:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
var deserializeAws_queryDeleteMessageCommand = function (output, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var response;
    return serdePlugin.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_queryDeleteMessageCommandError(output, context)];
                }
                return [4 /*yield*/, collectBody(output.body, context)];
            case 1:
                _a.sent();
                response = {
                    $metadata: deserializeMetadata(output),
                };
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_queryDeleteMessageCommandError = function (output, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, parsedBody, message;
    var _e;
    return serdePlugin.__generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _a = [serdePlugin.__assign({}, output)];
                _e = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = serdePlugin.__assign.apply(void 0, _a.concat([(_e.body = _f.sent(), _e)]));
                errorCode = "UnknownError";
                errorCode = loadQueryErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "InvalidIdFormat": return [3 /*break*/, 2];
                    case "com.amazonaws.sqs#InvalidIdFormat": return [3 /*break*/, 2];
                    case "ReceiptHandleIsInvalid": return [3 /*break*/, 4];
                    case "com.amazonaws.sqs#ReceiptHandleIsInvalid": return [3 /*break*/, 4];
                }
                return [3 /*break*/, 6];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_queryInvalidIdFormatResponse(parsedOutput, context)];
            case 3:
                response = serdePlugin.__assign.apply(void 0, [serdePlugin.__assign.apply(void 0, _c.concat([(_f.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 7];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_queryReceiptHandleIsInvalidResponse(parsedOutput, context)];
            case 5:
                response = serdePlugin.__assign.apply(void 0, [serdePlugin.__assign.apply(void 0, _d.concat([(_f.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 7];
            case 6:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.Error.code || parsedBody.Error.Code || errorCode;
                response = serdePlugin.__assign(serdePlugin.__assign({}, parsedBody.Error), { name: "" + errorCode, message: parsedBody.Error.message || parsedBody.Error.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _f.label = 7;
            case 7:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
var deserializeAws_queryDeleteMessageBatchCommand = function (output, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return serdePlugin.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_queryDeleteMessageBatchCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_queryDeleteMessageBatchResult(data.DeleteMessageBatchResult, context);
                response = serdePlugin.__assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_queryDeleteMessageBatchCommandError = function (output, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, _e, _f, parsedBody, message;
    var _g;
    return serdePlugin.__generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                _a = [serdePlugin.__assign({}, output)];
                _g = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = serdePlugin.__assign.apply(void 0, _a.concat([(_g.body = _h.sent(), _g)]));
                errorCode = "UnknownError";
                errorCode = loadQueryErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "BatchEntryIdsNotDistinct": return [3 /*break*/, 2];
                    case "com.amazonaws.sqs#BatchEntryIdsNotDistinct": return [3 /*break*/, 2];
                    case "EmptyBatchRequest": return [3 /*break*/, 4];
                    case "com.amazonaws.sqs#EmptyBatchRequest": return [3 /*break*/, 4];
                    case "InvalidBatchEntryId": return [3 /*break*/, 6];
                    case "com.amazonaws.sqs#InvalidBatchEntryId": return [3 /*break*/, 6];
                    case "TooManyEntriesInBatchRequest": return [3 /*break*/, 8];
                    case "com.amazonaws.sqs#TooManyEntriesInBatchRequest": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_queryBatchEntryIdsNotDistinctResponse(parsedOutput, context)];
            case 3:
                response = serdePlugin.__assign.apply(void 0, [serdePlugin.__assign.apply(void 0, _c.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_queryEmptyBatchRequestResponse(parsedOutput, context)];
            case 5:
                response = serdePlugin.__assign.apply(void 0, [serdePlugin.__assign.apply(void 0, _d.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_queryInvalidBatchEntryIdResponse(parsedOutput, context)];
            case 7:
                response = serdePlugin.__assign.apply(void 0, [serdePlugin.__assign.apply(void 0, _e.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_queryTooManyEntriesInBatchRequestResponse(parsedOutput, context)];
            case 9:
                response = serdePlugin.__assign.apply(void 0, [serdePlugin.__assign.apply(void 0, _f.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 10:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.Error.code || parsedBody.Error.Code || errorCode;
                response = serdePlugin.__assign(serdePlugin.__assign({}, parsedBody.Error), { name: "" + errorCode, message: parsedBody.Error.message || parsedBody.Error.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _h.label = 11;
            case 11:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
var deserializeAws_queryDeleteQueueCommand = function (output, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var response;
    return serdePlugin.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_queryDeleteQueueCommandError(output, context)];
                }
                return [4 /*yield*/, collectBody(output.body, context)];
            case 1:
                _a.sent();
                response = {
                    $metadata: deserializeMetadata(output),
                };
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_queryDeleteQueueCommandError = function (output, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, parsedBody, message;
    var _b;
    return serdePlugin.__generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = [serdePlugin.__assign({}, output)];
                _b = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = serdePlugin.__assign.apply(void 0, _a.concat([(_b.body = _c.sent(), _b)]));
                errorCode = "UnknownError";
                errorCode = loadQueryErrorCode(output, parsedOutput.body);
                switch (errorCode) {
                    default:
                        parsedBody = parsedOutput.body;
                        errorCode = parsedBody.Error.code || parsedBody.Error.Code || errorCode;
                        response = serdePlugin.__assign(serdePlugin.__assign({}, parsedBody.Error), { name: "" + errorCode, message: parsedBody.Error.message || parsedBody.Error.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                }
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
var deserializeAws_queryGetQueueAttributesCommand = function (output, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return serdePlugin.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_queryGetQueueAttributesCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_queryGetQueueAttributesResult(data.GetQueueAttributesResult, context);
                response = serdePlugin.__assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_queryGetQueueAttributesCommandError = function (output, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, parsedBody, message;
    var _d;
    return serdePlugin.__generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _a = [serdePlugin.__assign({}, output)];
                _d = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = serdePlugin.__assign.apply(void 0, _a.concat([(_d.body = _e.sent(), _d)]));
                errorCode = "UnknownError";
                errorCode = loadQueryErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "InvalidAttributeName": return [3 /*break*/, 2];
                    case "com.amazonaws.sqs#InvalidAttributeName": return [3 /*break*/, 2];
                }
                return [3 /*break*/, 4];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_queryInvalidAttributeNameResponse(parsedOutput, context)];
            case 3:
                response = serdePlugin.__assign.apply(void 0, [serdePlugin.__assign.apply(void 0, _c.concat([(_e.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 5];
            case 4:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.Error.code || parsedBody.Error.Code || errorCode;
                response = serdePlugin.__assign(serdePlugin.__assign({}, parsedBody.Error), { name: "" + errorCode, message: parsedBody.Error.message || parsedBody.Error.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _e.label = 5;
            case 5:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
var deserializeAws_queryGetQueueUrlCommand = function (output, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return serdePlugin.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_queryGetQueueUrlCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_queryGetQueueUrlResult(data.GetQueueUrlResult, context);
                response = serdePlugin.__assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_queryGetQueueUrlCommandError = function (output, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, parsedBody, message;
    var _d;
    return serdePlugin.__generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _a = [serdePlugin.__assign({}, output)];
                _d = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = serdePlugin.__assign.apply(void 0, _a.concat([(_d.body = _e.sent(), _d)]));
                errorCode = "UnknownError";
                errorCode = loadQueryErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "QueueDoesNotExist": return [3 /*break*/, 2];
                    case "com.amazonaws.sqs#QueueDoesNotExist": return [3 /*break*/, 2];
                }
                return [3 /*break*/, 4];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_queryQueueDoesNotExistResponse(parsedOutput, context)];
            case 3:
                response = serdePlugin.__assign.apply(void 0, [serdePlugin.__assign.apply(void 0, _c.concat([(_e.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 5];
            case 4:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.Error.code || parsedBody.Error.Code || errorCode;
                response = serdePlugin.__assign(serdePlugin.__assign({}, parsedBody.Error), { name: "" + errorCode, message: parsedBody.Error.message || parsedBody.Error.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _e.label = 5;
            case 5:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
var deserializeAws_queryListDeadLetterSourceQueuesCommand = function (output, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return serdePlugin.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_queryListDeadLetterSourceQueuesCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_queryListDeadLetterSourceQueuesResult(data.ListDeadLetterSourceQueuesResult, context);
                response = serdePlugin.__assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_queryListDeadLetterSourceQueuesCommandError = function (output, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, parsedBody, message;
    var _d;
    return serdePlugin.__generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _a = [serdePlugin.__assign({}, output)];
                _d = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = serdePlugin.__assign.apply(void 0, _a.concat([(_d.body = _e.sent(), _d)]));
                errorCode = "UnknownError";
                errorCode = loadQueryErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "QueueDoesNotExist": return [3 /*break*/, 2];
                    case "com.amazonaws.sqs#QueueDoesNotExist": return [3 /*break*/, 2];
                }
                return [3 /*break*/, 4];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_queryQueueDoesNotExistResponse(parsedOutput, context)];
            case 3:
                response = serdePlugin.__assign.apply(void 0, [serdePlugin.__assign.apply(void 0, _c.concat([(_e.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 5];
            case 4:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.Error.code || parsedBody.Error.Code || errorCode;
                response = serdePlugin.__assign(serdePlugin.__assign({}, parsedBody.Error), { name: "" + errorCode, message: parsedBody.Error.message || parsedBody.Error.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _e.label = 5;
            case 5:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
var deserializeAws_queryListQueuesCommand = function (output, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return serdePlugin.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_queryListQueuesCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_queryListQueuesResult(data.ListQueuesResult, context);
                response = serdePlugin.__assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_queryListQueuesCommandError = function (output, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, parsedBody, message;
    var _b;
    return serdePlugin.__generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = [serdePlugin.__assign({}, output)];
                _b = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = serdePlugin.__assign.apply(void 0, _a.concat([(_b.body = _c.sent(), _b)]));
                errorCode = "UnknownError";
                errorCode = loadQueryErrorCode(output, parsedOutput.body);
                switch (errorCode) {
                    default:
                        parsedBody = parsedOutput.body;
                        errorCode = parsedBody.Error.code || parsedBody.Error.Code || errorCode;
                        response = serdePlugin.__assign(serdePlugin.__assign({}, parsedBody.Error), { name: "" + errorCode, message: parsedBody.Error.message || parsedBody.Error.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                }
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
var deserializeAws_queryListQueueTagsCommand = function (output, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return serdePlugin.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_queryListQueueTagsCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_queryListQueueTagsResult(data.ListQueueTagsResult, context);
                response = serdePlugin.__assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_queryListQueueTagsCommandError = function (output, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, parsedBody, message;
    var _b;
    return serdePlugin.__generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = [serdePlugin.__assign({}, output)];
                _b = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = serdePlugin.__assign.apply(void 0, _a.concat([(_b.body = _c.sent(), _b)]));
                errorCode = "UnknownError";
                errorCode = loadQueryErrorCode(output, parsedOutput.body);
                switch (errorCode) {
                    default:
                        parsedBody = parsedOutput.body;
                        errorCode = parsedBody.Error.code || parsedBody.Error.Code || errorCode;
                        response = serdePlugin.__assign(serdePlugin.__assign({}, parsedBody.Error), { name: "" + errorCode, message: parsedBody.Error.message || parsedBody.Error.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                }
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
var deserializeAws_queryPurgeQueueCommand = function (output, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var response;
    return serdePlugin.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_queryPurgeQueueCommandError(output, context)];
                }
                return [4 /*yield*/, collectBody(output.body, context)];
            case 1:
                _a.sent();
                response = {
                    $metadata: deserializeMetadata(output),
                };
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_queryPurgeQueueCommandError = function (output, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, parsedBody, message;
    var _e;
    return serdePlugin.__generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _a = [serdePlugin.__assign({}, output)];
                _e = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = serdePlugin.__assign.apply(void 0, _a.concat([(_e.body = _f.sent(), _e)]));
                errorCode = "UnknownError";
                errorCode = loadQueryErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "PurgeQueueInProgress": return [3 /*break*/, 2];
                    case "com.amazonaws.sqs#PurgeQueueInProgress": return [3 /*break*/, 2];
                    case "QueueDoesNotExist": return [3 /*break*/, 4];
                    case "com.amazonaws.sqs#QueueDoesNotExist": return [3 /*break*/, 4];
                }
                return [3 /*break*/, 6];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_queryPurgeQueueInProgressResponse(parsedOutput, context)];
            case 3:
                response = serdePlugin.__assign.apply(void 0, [serdePlugin.__assign.apply(void 0, _c.concat([(_f.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 7];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_queryQueueDoesNotExistResponse(parsedOutput, context)];
            case 5:
                response = serdePlugin.__assign.apply(void 0, [serdePlugin.__assign.apply(void 0, _d.concat([(_f.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 7];
            case 6:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.Error.code || parsedBody.Error.Code || errorCode;
                response = serdePlugin.__assign(serdePlugin.__assign({}, parsedBody.Error), { name: "" + errorCode, message: parsedBody.Error.message || parsedBody.Error.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _f.label = 7;
            case 7:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
var deserializeAws_queryReceiveMessageCommand = function (output, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return serdePlugin.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_queryReceiveMessageCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_queryReceiveMessageResult(data.ReceiveMessageResult, context);
                response = serdePlugin.__assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_queryReceiveMessageCommandError = function (output, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, parsedBody, message;
    var _d;
    return serdePlugin.__generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _a = [serdePlugin.__assign({}, output)];
                _d = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = serdePlugin.__assign.apply(void 0, _a.concat([(_d.body = _e.sent(), _d)]));
                errorCode = "UnknownError";
                errorCode = loadQueryErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "OverLimit": return [3 /*break*/, 2];
                    case "com.amazonaws.sqs#OverLimit": return [3 /*break*/, 2];
                }
                return [3 /*break*/, 4];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_queryOverLimitResponse(parsedOutput, context)];
            case 3:
                response = serdePlugin.__assign.apply(void 0, [serdePlugin.__assign.apply(void 0, _c.concat([(_e.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 5];
            case 4:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.Error.code || parsedBody.Error.Code || errorCode;
                response = serdePlugin.__assign(serdePlugin.__assign({}, parsedBody.Error), { name: "" + errorCode, message: parsedBody.Error.message || parsedBody.Error.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _e.label = 5;
            case 5:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
var deserializeAws_queryRemovePermissionCommand = function (output, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var response;
    return serdePlugin.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_queryRemovePermissionCommandError(output, context)];
                }
                return [4 /*yield*/, collectBody(output.body, context)];
            case 1:
                _a.sent();
                response = {
                    $metadata: deserializeMetadata(output),
                };
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_queryRemovePermissionCommandError = function (output, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, parsedBody, message;
    var _b;
    return serdePlugin.__generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = [serdePlugin.__assign({}, output)];
                _b = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = serdePlugin.__assign.apply(void 0, _a.concat([(_b.body = _c.sent(), _b)]));
                errorCode = "UnknownError";
                errorCode = loadQueryErrorCode(output, parsedOutput.body);
                switch (errorCode) {
                    default:
                        parsedBody = parsedOutput.body;
                        errorCode = parsedBody.Error.code || parsedBody.Error.Code || errorCode;
                        response = serdePlugin.__assign(serdePlugin.__assign({}, parsedBody.Error), { name: "" + errorCode, message: parsedBody.Error.message || parsedBody.Error.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                }
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
var deserializeAws_querySendMessageCommand = function (output, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return serdePlugin.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_querySendMessageCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_querySendMessageResult(data.SendMessageResult, context);
                response = serdePlugin.__assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_querySendMessageCommandError = function (output, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, parsedBody, message;
    var _e;
    return serdePlugin.__generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _a = [serdePlugin.__assign({}, output)];
                _e = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = serdePlugin.__assign.apply(void 0, _a.concat([(_e.body = _f.sent(), _e)]));
                errorCode = "UnknownError";
                errorCode = loadQueryErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "InvalidMessageContents": return [3 /*break*/, 2];
                    case "com.amazonaws.sqs#InvalidMessageContents": return [3 /*break*/, 2];
                    case "UnsupportedOperation": return [3 /*break*/, 4];
                    case "com.amazonaws.sqs#UnsupportedOperation": return [3 /*break*/, 4];
                }
                return [3 /*break*/, 6];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_queryInvalidMessageContentsResponse(parsedOutput, context)];
            case 3:
                response = serdePlugin.__assign.apply(void 0, [serdePlugin.__assign.apply(void 0, _c.concat([(_f.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 7];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_queryUnsupportedOperationResponse(parsedOutput, context)];
            case 5:
                response = serdePlugin.__assign.apply(void 0, [serdePlugin.__assign.apply(void 0, _d.concat([(_f.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 7];
            case 6:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.Error.code || parsedBody.Error.Code || errorCode;
                response = serdePlugin.__assign(serdePlugin.__assign({}, parsedBody.Error), { name: "" + errorCode, message: parsedBody.Error.message || parsedBody.Error.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _f.label = 7;
            case 7:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
var deserializeAws_querySendMessageBatchCommand = function (output, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return serdePlugin.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_querySendMessageBatchCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_querySendMessageBatchResult(data.SendMessageBatchResult, context);
                response = serdePlugin.__assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_querySendMessageBatchCommandError = function (output, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, _e, _f, _g, _h, parsedBody, message;
    var _j;
    return serdePlugin.__generator(this, function (_k) {
        switch (_k.label) {
            case 0:
                _a = [serdePlugin.__assign({}, output)];
                _j = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = serdePlugin.__assign.apply(void 0, _a.concat([(_j.body = _k.sent(), _j)]));
                errorCode = "UnknownError";
                errorCode = loadQueryErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "BatchEntryIdsNotDistinct": return [3 /*break*/, 2];
                    case "com.amazonaws.sqs#BatchEntryIdsNotDistinct": return [3 /*break*/, 2];
                    case "BatchRequestTooLong": return [3 /*break*/, 4];
                    case "com.amazonaws.sqs#BatchRequestTooLong": return [3 /*break*/, 4];
                    case "EmptyBatchRequest": return [3 /*break*/, 6];
                    case "com.amazonaws.sqs#EmptyBatchRequest": return [3 /*break*/, 6];
                    case "InvalidBatchEntryId": return [3 /*break*/, 8];
                    case "com.amazonaws.sqs#InvalidBatchEntryId": return [3 /*break*/, 8];
                    case "TooManyEntriesInBatchRequest": return [3 /*break*/, 10];
                    case "com.amazonaws.sqs#TooManyEntriesInBatchRequest": return [3 /*break*/, 10];
                    case "UnsupportedOperation": return [3 /*break*/, 12];
                    case "com.amazonaws.sqs#UnsupportedOperation": return [3 /*break*/, 12];
                }
                return [3 /*break*/, 14];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_queryBatchEntryIdsNotDistinctResponse(parsedOutput, context)];
            case 3:
                response = serdePlugin.__assign.apply(void 0, [serdePlugin.__assign.apply(void 0, _c.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_queryBatchRequestTooLongResponse(parsedOutput, context)];
            case 5:
                response = serdePlugin.__assign.apply(void 0, [serdePlugin.__assign.apply(void 0, _d.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_queryEmptyBatchRequestResponse(parsedOutput, context)];
            case 7:
                response = serdePlugin.__assign.apply(void 0, [serdePlugin.__assign.apply(void 0, _e.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_queryInvalidBatchEntryIdResponse(parsedOutput, context)];
            case 9:
                response = serdePlugin.__assign.apply(void 0, [serdePlugin.__assign.apply(void 0, _f.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_queryTooManyEntriesInBatchRequestResponse(parsedOutput, context)];
            case 11:
                response = serdePlugin.__assign.apply(void 0, [serdePlugin.__assign.apply(void 0, _g.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_queryUnsupportedOperationResponse(parsedOutput, context)];
            case 13:
                response = serdePlugin.__assign.apply(void 0, [serdePlugin.__assign.apply(void 0, _h.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 14:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.Error.code || parsedBody.Error.Code || errorCode;
                response = serdePlugin.__assign(serdePlugin.__assign({}, parsedBody.Error), { name: "" + errorCode, message: parsedBody.Error.message || parsedBody.Error.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _k.label = 15;
            case 15:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
var deserializeAws_querySetQueueAttributesCommand = function (output, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var response;
    return serdePlugin.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_querySetQueueAttributesCommandError(output, context)];
                }
                return [4 /*yield*/, collectBody(output.body, context)];
            case 1:
                _a.sent();
                response = {
                    $metadata: deserializeMetadata(output),
                };
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_querySetQueueAttributesCommandError = function (output, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, parsedBody, message;
    var _d;
    return serdePlugin.__generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _a = [serdePlugin.__assign({}, output)];
                _d = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = serdePlugin.__assign.apply(void 0, _a.concat([(_d.body = _e.sent(), _d)]));
                errorCode = "UnknownError";
                errorCode = loadQueryErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "InvalidAttributeName": return [3 /*break*/, 2];
                    case "com.amazonaws.sqs#InvalidAttributeName": return [3 /*break*/, 2];
                }
                return [3 /*break*/, 4];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_queryInvalidAttributeNameResponse(parsedOutput, context)];
            case 3:
                response = serdePlugin.__assign.apply(void 0, [serdePlugin.__assign.apply(void 0, _c.concat([(_e.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 5];
            case 4:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.Error.code || parsedBody.Error.Code || errorCode;
                response = serdePlugin.__assign(serdePlugin.__assign({}, parsedBody.Error), { name: "" + errorCode, message: parsedBody.Error.message || parsedBody.Error.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _e.label = 5;
            case 5:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
var deserializeAws_queryTagQueueCommand = function (output, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var response;
    return serdePlugin.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_queryTagQueueCommandError(output, context)];
                }
                return [4 /*yield*/, collectBody(output.body, context)];
            case 1:
                _a.sent();
                response = {
                    $metadata: deserializeMetadata(output),
                };
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_queryTagQueueCommandError = function (output, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, parsedBody, message;
    var _b;
    return serdePlugin.__generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = [serdePlugin.__assign({}, output)];
                _b = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = serdePlugin.__assign.apply(void 0, _a.concat([(_b.body = _c.sent(), _b)]));
                errorCode = "UnknownError";
                errorCode = loadQueryErrorCode(output, parsedOutput.body);
                switch (errorCode) {
                    default:
                        parsedBody = parsedOutput.body;
                        errorCode = parsedBody.Error.code || parsedBody.Error.Code || errorCode;
                        response = serdePlugin.__assign(serdePlugin.__assign({}, parsedBody.Error), { name: "" + errorCode, message: parsedBody.Error.message || parsedBody.Error.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                }
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
var deserializeAws_queryUntagQueueCommand = function (output, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var response;
    return serdePlugin.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_queryUntagQueueCommandError(output, context)];
                }
                return [4 /*yield*/, collectBody(output.body, context)];
            case 1:
                _a.sent();
                response = {
                    $metadata: deserializeMetadata(output),
                };
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_queryUntagQueueCommandError = function (output, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, parsedBody, message;
    var _b;
    return serdePlugin.__generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = [serdePlugin.__assign({}, output)];
                _b = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = serdePlugin.__assign.apply(void 0, _a.concat([(_b.body = _c.sent(), _b)]));
                errorCode = "UnknownError";
                errorCode = loadQueryErrorCode(output, parsedOutput.body);
                switch (errorCode) {
                    default:
                        parsedBody = parsedOutput.body;
                        errorCode = parsedBody.Error.code || parsedBody.Error.Code || errorCode;
                        response = serdePlugin.__assign(serdePlugin.__assign({}, parsedBody.Error), { name: "" + errorCode, message: parsedBody.Error.message || parsedBody.Error.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                }
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
var deserializeAws_queryBatchEntryIdsNotDistinctResponse = function (parsedOutput, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return serdePlugin.__generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_queryBatchEntryIdsNotDistinct(body.Error, context);
        contents = serdePlugin.__assign({ name: "BatchEntryIdsNotDistinct", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_queryBatchRequestTooLongResponse = function (parsedOutput, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return serdePlugin.__generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_queryBatchRequestTooLong(body.Error, context);
        contents = serdePlugin.__assign({ name: "BatchRequestTooLong", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_queryEmptyBatchRequestResponse = function (parsedOutput, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return serdePlugin.__generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_queryEmptyBatchRequest(body.Error, context);
        contents = serdePlugin.__assign({ name: "EmptyBatchRequest", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_queryInvalidAttributeNameResponse = function (parsedOutput, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return serdePlugin.__generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_queryInvalidAttributeName(body.Error, context);
        contents = serdePlugin.__assign({ name: "InvalidAttributeName", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_queryInvalidBatchEntryIdResponse = function (parsedOutput, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return serdePlugin.__generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_queryInvalidBatchEntryId(body.Error, context);
        contents = serdePlugin.__assign({ name: "InvalidBatchEntryId", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_queryInvalidIdFormatResponse = function (parsedOutput, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return serdePlugin.__generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_queryInvalidIdFormat(body.Error, context);
        contents = serdePlugin.__assign({ name: "InvalidIdFormat", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_queryInvalidMessageContentsResponse = function (parsedOutput, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return serdePlugin.__generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_queryInvalidMessageContents(body.Error, context);
        contents = serdePlugin.__assign({ name: "InvalidMessageContents", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_queryMessageNotInflightResponse = function (parsedOutput, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return serdePlugin.__generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_queryMessageNotInflight(body.Error, context);
        contents = serdePlugin.__assign({ name: "MessageNotInflight", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_queryOverLimitResponse = function (parsedOutput, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return serdePlugin.__generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_queryOverLimit(body.Error, context);
        contents = serdePlugin.__assign({ name: "OverLimit", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_queryPurgeQueueInProgressResponse = function (parsedOutput, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return serdePlugin.__generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_queryPurgeQueueInProgress(body.Error, context);
        contents = serdePlugin.__assign({ name: "PurgeQueueInProgress", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_queryQueueDeletedRecentlyResponse = function (parsedOutput, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return serdePlugin.__generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_queryQueueDeletedRecently(body.Error, context);
        contents = serdePlugin.__assign({ name: "QueueDeletedRecently", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_queryQueueDoesNotExistResponse = function (parsedOutput, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return serdePlugin.__generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_queryQueueDoesNotExist(body.Error, context);
        contents = serdePlugin.__assign({ name: "QueueDoesNotExist", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_queryQueueNameExistsResponse = function (parsedOutput, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return serdePlugin.__generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_queryQueueNameExists(body.Error, context);
        contents = serdePlugin.__assign({ name: "QueueNameExists", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_queryReceiptHandleIsInvalidResponse = function (parsedOutput, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return serdePlugin.__generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_queryReceiptHandleIsInvalid(body.Error, context);
        contents = serdePlugin.__assign({ name: "ReceiptHandleIsInvalid", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_queryTooManyEntriesInBatchRequestResponse = function (parsedOutput, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return serdePlugin.__generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_queryTooManyEntriesInBatchRequest(body.Error, context);
        contents = serdePlugin.__assign({ name: "TooManyEntriesInBatchRequest", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_queryUnsupportedOperationResponse = function (parsedOutput, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return serdePlugin.__generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_queryUnsupportedOperation(body.Error, context);
        contents = serdePlugin.__assign({ name: "UnsupportedOperation", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var serializeAws_queryActionNameList = function (input, context) {
    var e_1, _a;
    var entries = {};
    var counter = 1;
    try {
        for (var input_1 = serdePlugin.__values(input), input_1_1 = input_1.next(); !input_1_1.done; input_1_1 = input_1.next()) {
            var entry = input_1_1.value;
            if (entry === null) {
                continue;
            }
            entries["member." + counter] = entry;
            counter++;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (input_1_1 && !input_1_1.done && (_a = input_1.return)) _a.call(input_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return entries;
};
var serializeAws_queryAddPermissionRequest = function (input, context) {
    var entries = {};
    if (input.QueueUrl !== undefined && input.QueueUrl !== null) {
        entries["QueueUrl"] = input.QueueUrl;
    }
    if (input.Label !== undefined && input.Label !== null) {
        entries["Label"] = input.Label;
    }
    if (input.AWSAccountIds !== undefined && input.AWSAccountIds !== null) {
        var memberEntries = serializeAws_queryAWSAccountIdList(input.AWSAccountIds, context);
        Object.entries(memberEntries).forEach(function (_a) {
            var _b = serdePlugin.__read(_a, 2), key = _b[0], value = _b[1];
            var loc = "AWSAccountId." + key.substring(key.indexOf(".") + 1);
            entries[loc] = value;
        });
    }
    if (input.Actions !== undefined && input.Actions !== null) {
        var memberEntries = serializeAws_queryActionNameList(input.Actions);
        Object.entries(memberEntries).forEach(function (_a) {
            var _b = serdePlugin.__read(_a, 2), key = _b[0], value = _b[1];
            var loc = "ActionName." + key.substring(key.indexOf(".") + 1);
            entries[loc] = value;
        });
    }
    return entries;
};
var serializeAws_queryAttributeNameList = function (input, context) {
    var e_2, _a;
    var entries = {};
    var counter = 1;
    try {
        for (var input_2 = serdePlugin.__values(input), input_2_1 = input_2.next(); !input_2_1.done; input_2_1 = input_2.next()) {
            var entry = input_2_1.value;
            if (entry === null) {
                continue;
            }
            entries["member." + counter] = entry;
            counter++;
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (input_2_1 && !input_2_1.done && (_a = input_2.return)) _a.call(input_2);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return entries;
};
var serializeAws_queryAWSAccountIdList = function (input, context) {
    var e_3, _a;
    var entries = {};
    var counter = 1;
    try {
        for (var input_3 = serdePlugin.__values(input), input_3_1 = input_3.next(); !input_3_1.done; input_3_1 = input_3.next()) {
            var entry = input_3_1.value;
            if (entry === null) {
                continue;
            }
            entries["member." + counter] = entry;
            counter++;
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (input_3_1 && !input_3_1.done && (_a = input_3.return)) _a.call(input_3);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return entries;
};
var serializeAws_queryBinaryList = function (input, context) {
    var e_4, _a;
    var entries = {};
    var counter = 1;
    try {
        for (var input_4 = serdePlugin.__values(input), input_4_1 = input_4.next(); !input_4_1.done; input_4_1 = input_4.next()) {
            var entry = input_4_1.value;
            if (entry === null) {
                continue;
            }
            entries["BinaryListValue." + counter] = context.base64Encoder(entry);
            counter++;
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (input_4_1 && !input_4_1.done && (_a = input_4.return)) _a.call(input_4);
        }
        finally { if (e_4) throw e_4.error; }
    }
    return entries;
};
var serializeAws_queryChangeMessageVisibilityBatchRequest = function (input, context) {
    var entries = {};
    if (input.QueueUrl !== undefined && input.QueueUrl !== null) {
        entries["QueueUrl"] = input.QueueUrl;
    }
    if (input.Entries !== undefined && input.Entries !== null) {
        var memberEntries = serializeAws_queryChangeMessageVisibilityBatchRequestEntryList(input.Entries, context);
        Object.entries(memberEntries).forEach(function (_a) {
            var _b = serdePlugin.__read(_a, 2), key = _b[0], value = _b[1];
            var loc = "ChangeMessageVisibilityBatchRequestEntry." + key.substring(key.indexOf(".") + 1);
            entries[loc] = value;
        });
    }
    return entries;
};
var serializeAws_queryChangeMessageVisibilityBatchRequestEntry = function (input, context) {
    var entries = {};
    if (input.Id !== undefined && input.Id !== null) {
        entries["Id"] = input.Id;
    }
    if (input.ReceiptHandle !== undefined && input.ReceiptHandle !== null) {
        entries["ReceiptHandle"] = input.ReceiptHandle;
    }
    if (input.VisibilityTimeout !== undefined && input.VisibilityTimeout !== null) {
        entries["VisibilityTimeout"] = input.VisibilityTimeout;
    }
    return entries;
};
var serializeAws_queryChangeMessageVisibilityBatchRequestEntryList = function (input, context) {
    var e_5, _a;
    var entries = {};
    var counter = 1;
    try {
        for (var input_5 = serdePlugin.__values(input), input_5_1 = input_5.next(); !input_5_1.done; input_5_1 = input_5.next()) {
            var entry = input_5_1.value;
            if (entry === null) {
                continue;
            }
            var memberEntries = serializeAws_queryChangeMessageVisibilityBatchRequestEntry(entry, context);
            Object.entries(memberEntries).forEach(function (_a) {
                var _b = serdePlugin.__read(_a, 2), key = _b[0], value = _b[1];
                entries["member." + counter + "." + key] = value;
            });
            counter++;
        }
    }
    catch (e_5_1) { e_5 = { error: e_5_1 }; }
    finally {
        try {
            if (input_5_1 && !input_5_1.done && (_a = input_5.return)) _a.call(input_5);
        }
        finally { if (e_5) throw e_5.error; }
    }
    return entries;
};
var serializeAws_queryChangeMessageVisibilityRequest = function (input, context) {
    var entries = {};
    if (input.QueueUrl !== undefined && input.QueueUrl !== null) {
        entries["QueueUrl"] = input.QueueUrl;
    }
    if (input.ReceiptHandle !== undefined && input.ReceiptHandle !== null) {
        entries["ReceiptHandle"] = input.ReceiptHandle;
    }
    if (input.VisibilityTimeout !== undefined && input.VisibilityTimeout !== null) {
        entries["VisibilityTimeout"] = input.VisibilityTimeout;
    }
    return entries;
};
var serializeAws_queryCreateQueueRequest = function (input, context) {
    var entries = {};
    if (input.QueueName !== undefined && input.QueueName !== null) {
        entries["QueueName"] = input.QueueName;
    }
    if (input.tags !== undefined && input.tags !== null) {
        var memberEntries = serializeAws_queryTagMap(input.tags, context);
        Object.entries(memberEntries).forEach(function (_a) {
            var _b = serdePlugin.__read(_a, 2), key = _b[0], value = _b[1];
            var loc = "Tag." + key.substring(key.indexOf(".") + 1);
            entries[loc] = value;
        });
    }
    if (input.Attributes !== undefined && input.Attributes !== null) {
        var memberEntries = serializeAws_queryQueueAttributeMap(input.Attributes, context);
        Object.entries(memberEntries).forEach(function (_a) {
            var _b = serdePlugin.__read(_a, 2), key = _b[0], value = _b[1];
            var loc = "Attribute." + key.substring(key.indexOf(".") + 1);
            entries[loc] = value;
        });
    }
    return entries;
};
var serializeAws_queryDeleteMessageBatchRequest = function (input, context) {
    var entries = {};
    if (input.QueueUrl !== undefined && input.QueueUrl !== null) {
        entries["QueueUrl"] = input.QueueUrl;
    }
    if (input.Entries !== undefined && input.Entries !== null) {
        var memberEntries = serializeAws_queryDeleteMessageBatchRequestEntryList(input.Entries, context);
        Object.entries(memberEntries).forEach(function (_a) {
            var _b = serdePlugin.__read(_a, 2), key = _b[0], value = _b[1];
            var loc = "DeleteMessageBatchRequestEntry." + key.substring(key.indexOf(".") + 1);
            entries[loc] = value;
        });
    }
    return entries;
};
var serializeAws_queryDeleteMessageBatchRequestEntry = function (input, context) {
    var entries = {};
    if (input.Id !== undefined && input.Id !== null) {
        entries["Id"] = input.Id;
    }
    if (input.ReceiptHandle !== undefined && input.ReceiptHandle !== null) {
        entries["ReceiptHandle"] = input.ReceiptHandle;
    }
    return entries;
};
var serializeAws_queryDeleteMessageBatchRequestEntryList = function (input, context) {
    var e_6, _a;
    var entries = {};
    var counter = 1;
    try {
        for (var input_6 = serdePlugin.__values(input), input_6_1 = input_6.next(); !input_6_1.done; input_6_1 = input_6.next()) {
            var entry = input_6_1.value;
            if (entry === null) {
                continue;
            }
            var memberEntries = serializeAws_queryDeleteMessageBatchRequestEntry(entry, context);
            Object.entries(memberEntries).forEach(function (_a) {
                var _b = serdePlugin.__read(_a, 2), key = _b[0], value = _b[1];
                entries["member." + counter + "." + key] = value;
            });
            counter++;
        }
    }
    catch (e_6_1) { e_6 = { error: e_6_1 }; }
    finally {
        try {
            if (input_6_1 && !input_6_1.done && (_a = input_6.return)) _a.call(input_6);
        }
        finally { if (e_6) throw e_6.error; }
    }
    return entries;
};
var serializeAws_queryDeleteMessageRequest = function (input, context) {
    var entries = {};
    if (input.QueueUrl !== undefined && input.QueueUrl !== null) {
        entries["QueueUrl"] = input.QueueUrl;
    }
    if (input.ReceiptHandle !== undefined && input.ReceiptHandle !== null) {
        entries["ReceiptHandle"] = input.ReceiptHandle;
    }
    return entries;
};
var serializeAws_queryDeleteQueueRequest = function (input, context) {
    var entries = {};
    if (input.QueueUrl !== undefined && input.QueueUrl !== null) {
        entries["QueueUrl"] = input.QueueUrl;
    }
    return entries;
};
var serializeAws_queryGetQueueAttributesRequest = function (input, context) {
    var entries = {};
    if (input.QueueUrl !== undefined && input.QueueUrl !== null) {
        entries["QueueUrl"] = input.QueueUrl;
    }
    if (input.AttributeNames !== undefined && input.AttributeNames !== null) {
        var memberEntries = serializeAws_queryAttributeNameList(input.AttributeNames);
        Object.entries(memberEntries).forEach(function (_a) {
            var _b = serdePlugin.__read(_a, 2), key = _b[0], value = _b[1];
            var loc = "AttributeName." + key.substring(key.indexOf(".") + 1);
            entries[loc] = value;
        });
    }
    return entries;
};
var serializeAws_queryGetQueueUrlRequest = function (input, context) {
    var entries = {};
    if (input.QueueName !== undefined && input.QueueName !== null) {
        entries["QueueName"] = input.QueueName;
    }
    if (input.QueueOwnerAWSAccountId !== undefined && input.QueueOwnerAWSAccountId !== null) {
        entries["QueueOwnerAWSAccountId"] = input.QueueOwnerAWSAccountId;
    }
    return entries;
};
var serializeAws_queryListDeadLetterSourceQueuesRequest = function (input, context) {
    var entries = {};
    if (input.QueueUrl !== undefined && input.QueueUrl !== null) {
        entries["QueueUrl"] = input.QueueUrl;
    }
    if (input.NextToken !== undefined && input.NextToken !== null) {
        entries["NextToken"] = input.NextToken;
    }
    if (input.MaxResults !== undefined && input.MaxResults !== null) {
        entries["MaxResults"] = input.MaxResults;
    }
    return entries;
};
var serializeAws_queryListQueuesRequest = function (input, context) {
    var entries = {};
    if (input.QueueNamePrefix !== undefined && input.QueueNamePrefix !== null) {
        entries["QueueNamePrefix"] = input.QueueNamePrefix;
    }
    if (input.NextToken !== undefined && input.NextToken !== null) {
        entries["NextToken"] = input.NextToken;
    }
    if (input.MaxResults !== undefined && input.MaxResults !== null) {
        entries["MaxResults"] = input.MaxResults;
    }
    return entries;
};
var serializeAws_queryListQueueTagsRequest = function (input, context) {
    var entries = {};
    if (input.QueueUrl !== undefined && input.QueueUrl !== null) {
        entries["QueueUrl"] = input.QueueUrl;
    }
    return entries;
};
var serializeAws_queryMessageAttributeNameList = function (input, context) {
    var e_7, _a;
    var entries = {};
    var counter = 1;
    try {
        for (var input_7 = serdePlugin.__values(input), input_7_1 = input_7.next(); !input_7_1.done; input_7_1 = input_7.next()) {
            var entry = input_7_1.value;
            if (entry === null) {
                continue;
            }
            entries["member." + counter] = entry;
            counter++;
        }
    }
    catch (e_7_1) { e_7 = { error: e_7_1 }; }
    finally {
        try {
            if (input_7_1 && !input_7_1.done && (_a = input_7.return)) _a.call(input_7);
        }
        finally { if (e_7) throw e_7.error; }
    }
    return entries;
};
var serializeAws_queryMessageAttributeValue = function (input, context) {
    var entries = {};
    if (input.StringValue !== undefined && input.StringValue !== null) {
        entries["StringValue"] = input.StringValue;
    }
    if (input.BinaryValue !== undefined && input.BinaryValue !== null) {
        entries["BinaryValue"] = context.base64Encoder(input.BinaryValue);
    }
    if (input.StringListValues !== undefined && input.StringListValues !== null) {
        var memberEntries = serializeAws_queryStringList(input.StringListValues);
        Object.entries(memberEntries).forEach(function (_a) {
            var _b = serdePlugin.__read(_a, 2), key = _b[0], value = _b[1];
            var loc = "StringListValue." + key.substring(key.indexOf(".") + 1);
            entries[loc] = value;
        });
    }
    if (input.BinaryListValues !== undefined && input.BinaryListValues !== null) {
        var memberEntries = serializeAws_queryBinaryList(input.BinaryListValues, context);
        Object.entries(memberEntries).forEach(function (_a) {
            var _b = serdePlugin.__read(_a, 2), key = _b[0], value = _b[1];
            var loc = "BinaryListValue." + key.substring(key.indexOf(".") + 1);
            entries[loc] = value;
        });
    }
    if (input.DataType !== undefined && input.DataType !== null) {
        entries["DataType"] = input.DataType;
    }
    return entries;
};
var serializeAws_queryMessageBodyAttributeMap = function (input, context) {
    var entries = {};
    var counter = 1;
    Object.keys(input)
        .filter(function (key) { return input[key] != null; })
        .forEach(function (key) {
        entries["entry." + counter + ".Name"] = key;
        var memberEntries = serializeAws_queryMessageAttributeValue(input[key], context);
        Object.entries(memberEntries).forEach(function (_a) {
            var _b = serdePlugin.__read(_a, 2), key = _b[0], value = _b[1];
            entries["entry." + counter + ".Value." + key] = value;
        });
        counter++;
    });
    return entries;
};
var serializeAws_queryMessageBodySystemAttributeMap = function (input, context) {
    var entries = {};
    var counter = 1;
    Object.keys(input)
        .filter(function (key) { return input[key] != null; })
        .forEach(function (key) {
        entries["entry." + counter + ".Name"] = key;
        var memberEntries = serializeAws_queryMessageSystemAttributeValue(input[key], context);
        Object.entries(memberEntries).forEach(function (_a) {
            var _b = serdePlugin.__read(_a, 2), key = _b[0], value = _b[1];
            entries["entry." + counter + ".Value." + key] = value;
        });
        counter++;
    });
    return entries;
};
var serializeAws_queryMessageSystemAttributeValue = function (input, context) {
    var entries = {};
    if (input.StringValue !== undefined && input.StringValue !== null) {
        entries["StringValue"] = input.StringValue;
    }
    if (input.BinaryValue !== undefined && input.BinaryValue !== null) {
        entries["BinaryValue"] = context.base64Encoder(input.BinaryValue);
    }
    if (input.StringListValues !== undefined && input.StringListValues !== null) {
        var memberEntries = serializeAws_queryStringList(input.StringListValues);
        Object.entries(memberEntries).forEach(function (_a) {
            var _b = serdePlugin.__read(_a, 2), key = _b[0], value = _b[1];
            var loc = "StringListValue." + key.substring(key.indexOf(".") + 1);
            entries[loc] = value;
        });
    }
    if (input.BinaryListValues !== undefined && input.BinaryListValues !== null) {
        var memberEntries = serializeAws_queryBinaryList(input.BinaryListValues, context);
        Object.entries(memberEntries).forEach(function (_a) {
            var _b = serdePlugin.__read(_a, 2), key = _b[0], value = _b[1];
            var loc = "BinaryListValue." + key.substring(key.indexOf(".") + 1);
            entries[loc] = value;
        });
    }
    if (input.DataType !== undefined && input.DataType !== null) {
        entries["DataType"] = input.DataType;
    }
    return entries;
};
var serializeAws_queryPurgeQueueRequest = function (input, context) {
    var entries = {};
    if (input.QueueUrl !== undefined && input.QueueUrl !== null) {
        entries["QueueUrl"] = input.QueueUrl;
    }
    return entries;
};
var serializeAws_queryQueueAttributeMap = function (input, context) {
    var entries = {};
    var counter = 1;
    Object.keys(input)
        .filter(function (key) { return input[key] != null; })
        .forEach(function (key) {
        entries["entry." + counter + ".Name"] = key;
        entries["entry." + counter + ".Value"] = input[key];
        counter++;
    });
    return entries;
};
var serializeAws_queryReceiveMessageRequest = function (input, context) {
    var entries = {};
    if (input.QueueUrl !== undefined && input.QueueUrl !== null) {
        entries["QueueUrl"] = input.QueueUrl;
    }
    if (input.AttributeNames !== undefined && input.AttributeNames !== null) {
        var memberEntries = serializeAws_queryAttributeNameList(input.AttributeNames);
        Object.entries(memberEntries).forEach(function (_a) {
            var _b = serdePlugin.__read(_a, 2), key = _b[0], value = _b[1];
            var loc = "AttributeName." + key.substring(key.indexOf(".") + 1);
            entries[loc] = value;
        });
    }
    if (input.MessageAttributeNames !== undefined && input.MessageAttributeNames !== null) {
        var memberEntries = serializeAws_queryMessageAttributeNameList(input.MessageAttributeNames);
        Object.entries(memberEntries).forEach(function (_a) {
            var _b = serdePlugin.__read(_a, 2), key = _b[0], value = _b[1];
            var loc = "MessageAttributeName." + key.substring(key.indexOf(".") + 1);
            entries[loc] = value;
        });
    }
    if (input.MaxNumberOfMessages !== undefined && input.MaxNumberOfMessages !== null) {
        entries["MaxNumberOfMessages"] = input.MaxNumberOfMessages;
    }
    if (input.VisibilityTimeout !== undefined && input.VisibilityTimeout !== null) {
        entries["VisibilityTimeout"] = input.VisibilityTimeout;
    }
    if (input.WaitTimeSeconds !== undefined && input.WaitTimeSeconds !== null) {
        entries["WaitTimeSeconds"] = input.WaitTimeSeconds;
    }
    if (input.ReceiveRequestAttemptId !== undefined && input.ReceiveRequestAttemptId !== null) {
        entries["ReceiveRequestAttemptId"] = input.ReceiveRequestAttemptId;
    }
    return entries;
};
var serializeAws_queryRemovePermissionRequest = function (input, context) {
    var entries = {};
    if (input.QueueUrl !== undefined && input.QueueUrl !== null) {
        entries["QueueUrl"] = input.QueueUrl;
    }
    if (input.Label !== undefined && input.Label !== null) {
        entries["Label"] = input.Label;
    }
    return entries;
};
var serializeAws_querySendMessageBatchRequest = function (input, context) {
    var entries = {};
    if (input.QueueUrl !== undefined && input.QueueUrl !== null) {
        entries["QueueUrl"] = input.QueueUrl;
    }
    if (input.Entries !== undefined && input.Entries !== null) {
        var memberEntries = serializeAws_querySendMessageBatchRequestEntryList(input.Entries, context);
        Object.entries(memberEntries).forEach(function (_a) {
            var _b = serdePlugin.__read(_a, 2), key = _b[0], value = _b[1];
            var loc = "SendMessageBatchRequestEntry." + key.substring(key.indexOf(".") + 1);
            entries[loc] = value;
        });
    }
    return entries;
};
var serializeAws_querySendMessageBatchRequestEntry = function (input, context) {
    var entries = {};
    if (input.Id !== undefined && input.Id !== null) {
        entries["Id"] = input.Id;
    }
    if (input.MessageBody !== undefined && input.MessageBody !== null) {
        entries["MessageBody"] = input.MessageBody;
    }
    if (input.DelaySeconds !== undefined && input.DelaySeconds !== null) {
        entries["DelaySeconds"] = input.DelaySeconds;
    }
    if (input.MessageAttributes !== undefined && input.MessageAttributes !== null) {
        var memberEntries = serializeAws_queryMessageBodyAttributeMap(input.MessageAttributes, context);
        Object.entries(memberEntries).forEach(function (_a) {
            var _b = serdePlugin.__read(_a, 2), key = _b[0], value = _b[1];
            var loc = "MessageAttribute." + key.substring(key.indexOf(".") + 1);
            entries[loc] = value;
        });
    }
    if (input.MessageSystemAttributes !== undefined && input.MessageSystemAttributes !== null) {
        var memberEntries = serializeAws_queryMessageBodySystemAttributeMap(input.MessageSystemAttributes, context);
        Object.entries(memberEntries).forEach(function (_a) {
            var _b = serdePlugin.__read(_a, 2), key = _b[0], value = _b[1];
            var loc = "MessageSystemAttribute." + key.substring(key.indexOf(".") + 1);
            entries[loc] = value;
        });
    }
    if (input.MessageDeduplicationId !== undefined && input.MessageDeduplicationId !== null) {
        entries["MessageDeduplicationId"] = input.MessageDeduplicationId;
    }
    if (input.MessageGroupId !== undefined && input.MessageGroupId !== null) {
        entries["MessageGroupId"] = input.MessageGroupId;
    }
    return entries;
};
var serializeAws_querySendMessageBatchRequestEntryList = function (input, context) {
    var e_8, _a;
    var entries = {};
    var counter = 1;
    try {
        for (var input_8 = serdePlugin.__values(input), input_8_1 = input_8.next(); !input_8_1.done; input_8_1 = input_8.next()) {
            var entry = input_8_1.value;
            if (entry === null) {
                continue;
            }
            var memberEntries = serializeAws_querySendMessageBatchRequestEntry(entry, context);
            Object.entries(memberEntries).forEach(function (_a) {
                var _b = serdePlugin.__read(_a, 2), key = _b[0], value = _b[1];
                entries["member." + counter + "." + key] = value;
            });
            counter++;
        }
    }
    catch (e_8_1) { e_8 = { error: e_8_1 }; }
    finally {
        try {
            if (input_8_1 && !input_8_1.done && (_a = input_8.return)) _a.call(input_8);
        }
        finally { if (e_8) throw e_8.error; }
    }
    return entries;
};
var serializeAws_querySendMessageRequest = function (input, context) {
    var entries = {};
    if (input.QueueUrl !== undefined && input.QueueUrl !== null) {
        entries["QueueUrl"] = input.QueueUrl;
    }
    if (input.MessageBody !== undefined && input.MessageBody !== null) {
        entries["MessageBody"] = input.MessageBody;
    }
    if (input.DelaySeconds !== undefined && input.DelaySeconds !== null) {
        entries["DelaySeconds"] = input.DelaySeconds;
    }
    if (input.MessageAttributes !== undefined && input.MessageAttributes !== null) {
        var memberEntries = serializeAws_queryMessageBodyAttributeMap(input.MessageAttributes, context);
        Object.entries(memberEntries).forEach(function (_a) {
            var _b = serdePlugin.__read(_a, 2), key = _b[0], value = _b[1];
            var loc = "MessageAttribute." + key.substring(key.indexOf(".") + 1);
            entries[loc] = value;
        });
    }
    if (input.MessageSystemAttributes !== undefined && input.MessageSystemAttributes !== null) {
        var memberEntries = serializeAws_queryMessageBodySystemAttributeMap(input.MessageSystemAttributes, context);
        Object.entries(memberEntries).forEach(function (_a) {
            var _b = serdePlugin.__read(_a, 2), key = _b[0], value = _b[1];
            var loc = "MessageSystemAttribute." + key.substring(key.indexOf(".") + 1);
            entries[loc] = value;
        });
    }
    if (input.MessageDeduplicationId !== undefined && input.MessageDeduplicationId !== null) {
        entries["MessageDeduplicationId"] = input.MessageDeduplicationId;
    }
    if (input.MessageGroupId !== undefined && input.MessageGroupId !== null) {
        entries["MessageGroupId"] = input.MessageGroupId;
    }
    return entries;
};
var serializeAws_querySetQueueAttributesRequest = function (input, context) {
    var entries = {};
    if (input.QueueUrl !== undefined && input.QueueUrl !== null) {
        entries["QueueUrl"] = input.QueueUrl;
    }
    if (input.Attributes !== undefined && input.Attributes !== null) {
        var memberEntries = serializeAws_queryQueueAttributeMap(input.Attributes);
        Object.entries(memberEntries).forEach(function (_a) {
            var _b = serdePlugin.__read(_a, 2), key = _b[0], value = _b[1];
            var loc = "Attribute." + key.substring(key.indexOf(".") + 1);
            entries[loc] = value;
        });
    }
    return entries;
};
var serializeAws_queryStringList = function (input, context) {
    var e_9, _a;
    var entries = {};
    var counter = 1;
    try {
        for (var input_9 = serdePlugin.__values(input), input_9_1 = input_9.next(); !input_9_1.done; input_9_1 = input_9.next()) {
            var entry = input_9_1.value;
            if (entry === null) {
                continue;
            }
            entries["StringListValue." + counter] = entry;
            counter++;
        }
    }
    catch (e_9_1) { e_9 = { error: e_9_1 }; }
    finally {
        try {
            if (input_9_1 && !input_9_1.done && (_a = input_9.return)) _a.call(input_9);
        }
        finally { if (e_9) throw e_9.error; }
    }
    return entries;
};
var serializeAws_queryTagKeyList = function (input, context) {
    var e_10, _a;
    var entries = {};
    var counter = 1;
    try {
        for (var input_10 = serdePlugin.__values(input), input_10_1 = input_10.next(); !input_10_1.done; input_10_1 = input_10.next()) {
            var entry = input_10_1.value;
            if (entry === null) {
                continue;
            }
            entries["member." + counter] = entry;
            counter++;
        }
    }
    catch (e_10_1) { e_10 = { error: e_10_1 }; }
    finally {
        try {
            if (input_10_1 && !input_10_1.done && (_a = input_10.return)) _a.call(input_10);
        }
        finally { if (e_10) throw e_10.error; }
    }
    return entries;
};
var serializeAws_queryTagMap = function (input, context) {
    var entries = {};
    var counter = 1;
    Object.keys(input)
        .filter(function (key) { return input[key] != null; })
        .forEach(function (key) {
        entries["entry." + counter + ".Key"] = key;
        entries["entry." + counter + ".Value"] = input[key];
        counter++;
    });
    return entries;
};
var serializeAws_queryTagQueueRequest = function (input, context) {
    var entries = {};
    if (input.QueueUrl !== undefined && input.QueueUrl !== null) {
        entries["QueueUrl"] = input.QueueUrl;
    }
    if (input.Tags !== undefined && input.Tags !== null) {
        var memberEntries = serializeAws_queryTagMap(input.Tags);
        Object.entries(memberEntries).forEach(function (_a) {
            var _b = serdePlugin.__read(_a, 2), key = _b[0], value = _b[1];
            var loc = "Tag." + key.substring(key.indexOf(".") + 1);
            entries[loc] = value;
        });
    }
    return entries;
};
var serializeAws_queryUntagQueueRequest = function (input, context) {
    var entries = {};
    if (input.QueueUrl !== undefined && input.QueueUrl !== null) {
        entries["QueueUrl"] = input.QueueUrl;
    }
    if (input.TagKeys !== undefined && input.TagKeys !== null) {
        var memberEntries = serializeAws_queryTagKeyList(input.TagKeys);
        Object.entries(memberEntries).forEach(function (_a) {
            var _b = serdePlugin.__read(_a, 2), key = _b[0], value = _b[1];
            var loc = "TagKey." + key.substring(key.indexOf(".") + 1);
            entries[loc] = value;
        });
    }
    return entries;
};
var deserializeAws_queryBatchEntryIdsNotDistinct = function (output, context) {
    var contents = {};
    return contents;
};
var deserializeAws_queryBatchRequestTooLong = function (output, context) {
    var contents = {};
    return contents;
};
var deserializeAws_queryBatchResultErrorEntry = function (output, context) {
    var contents = {
        Id: undefined,
        SenderFault: undefined,
        Code: undefined,
        Message: undefined,
    };
    if (output["Id"] !== undefined) {
        contents.Id = serdePlugin.expectString(output["Id"]);
    }
    if (output["SenderFault"] !== undefined) {
        contents.SenderFault = serdePlugin.parseBoolean(output["SenderFault"]);
    }
    if (output["Code"] !== undefined) {
        contents.Code = serdePlugin.expectString(output["Code"]);
    }
    if (output["Message"] !== undefined) {
        contents.Message = serdePlugin.expectString(output["Message"]);
    }
    return contents;
};
var deserializeAws_queryBatchResultErrorEntryList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_queryBatchResultErrorEntry(entry);
    });
};
var deserializeAws_queryBinaryList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return context.base64Decoder(entry);
    });
};
var deserializeAws_queryChangeMessageVisibilityBatchResult = function (output, context) {
    var contents = {
        Successful: undefined,
        Failed: undefined,
    };
    if (output.ChangeMessageVisibilityBatchResultEntry === "") {
        contents.Successful = [];
    }
    if (output["ChangeMessageVisibilityBatchResultEntry"] !== undefined) {
        contents.Successful = deserializeAws_queryChangeMessageVisibilityBatchResultEntryList(getArrayIfSingleItem(output["ChangeMessageVisibilityBatchResultEntry"]), context);
    }
    if (output.BatchResultErrorEntry === "") {
        contents.Failed = [];
    }
    if (output["BatchResultErrorEntry"] !== undefined) {
        contents.Failed = deserializeAws_queryBatchResultErrorEntryList(getArrayIfSingleItem(output["BatchResultErrorEntry"]));
    }
    return contents;
};
var deserializeAws_queryChangeMessageVisibilityBatchResultEntry = function (output, context) {
    var contents = {
        Id: undefined,
    };
    if (output["Id"] !== undefined) {
        contents.Id = serdePlugin.expectString(output["Id"]);
    }
    return contents;
};
var deserializeAws_queryChangeMessageVisibilityBatchResultEntryList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_queryChangeMessageVisibilityBatchResultEntry(entry);
    });
};
var deserializeAws_queryCreateQueueResult = function (output, context) {
    var contents = {
        QueueUrl: undefined,
    };
    if (output["QueueUrl"] !== undefined) {
        contents.QueueUrl = serdePlugin.expectString(output["QueueUrl"]);
    }
    return contents;
};
var deserializeAws_queryDeleteMessageBatchResult = function (output, context) {
    var contents = {
        Successful: undefined,
        Failed: undefined,
    };
    if (output.DeleteMessageBatchResultEntry === "") {
        contents.Successful = [];
    }
    if (output["DeleteMessageBatchResultEntry"] !== undefined) {
        contents.Successful = deserializeAws_queryDeleteMessageBatchResultEntryList(getArrayIfSingleItem(output["DeleteMessageBatchResultEntry"]), context);
    }
    if (output.BatchResultErrorEntry === "") {
        contents.Failed = [];
    }
    if (output["BatchResultErrorEntry"] !== undefined) {
        contents.Failed = deserializeAws_queryBatchResultErrorEntryList(getArrayIfSingleItem(output["BatchResultErrorEntry"]));
    }
    return contents;
};
var deserializeAws_queryDeleteMessageBatchResultEntry = function (output, context) {
    var contents = {
        Id: undefined,
    };
    if (output["Id"] !== undefined) {
        contents.Id = serdePlugin.expectString(output["Id"]);
    }
    return contents;
};
var deserializeAws_queryDeleteMessageBatchResultEntryList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_queryDeleteMessageBatchResultEntry(entry);
    });
};
var deserializeAws_queryEmptyBatchRequest = function (output, context) {
    var contents = {};
    return contents;
};
var deserializeAws_queryGetQueueAttributesResult = function (output, context) {
    var contents = {
        Attributes: undefined,
    };
    if (output.Attribute === "") {
        contents.Attributes = {};
    }
    if (output["Attribute"] !== undefined) {
        contents.Attributes = deserializeAws_queryQueueAttributeMap(getArrayIfSingleItem(output["Attribute"]), context);
    }
    return contents;
};
var deserializeAws_queryGetQueueUrlResult = function (output, context) {
    var contents = {
        QueueUrl: undefined,
    };
    if (output["QueueUrl"] !== undefined) {
        contents.QueueUrl = serdePlugin.expectString(output["QueueUrl"]);
    }
    return contents;
};
var deserializeAws_queryInvalidAttributeName = function (output, context) {
    var contents = {};
    return contents;
};
var deserializeAws_queryInvalidBatchEntryId = function (output, context) {
    var contents = {};
    return contents;
};
var deserializeAws_queryInvalidIdFormat = function (output, context) {
    var contents = {};
    return contents;
};
var deserializeAws_queryInvalidMessageContents = function (output, context) {
    var contents = {};
    return contents;
};
var deserializeAws_queryListDeadLetterSourceQueuesResult = function (output, context) {
    var contents = {
        queueUrls: undefined,
        NextToken: undefined,
    };
    if (output.QueueUrl === "") {
        contents.queueUrls = [];
    }
    if (output["QueueUrl"] !== undefined) {
        contents.queueUrls = deserializeAws_queryQueueUrlList(getArrayIfSingleItem(output["QueueUrl"]), context);
    }
    if (output["NextToken"] !== undefined) {
        contents.NextToken = serdePlugin.expectString(output["NextToken"]);
    }
    return contents;
};
var deserializeAws_queryListQueuesResult = function (output, context) {
    var contents = {
        NextToken: undefined,
        QueueUrls: undefined,
    };
    if (output["NextToken"] !== undefined) {
        contents.NextToken = serdePlugin.expectString(output["NextToken"]);
    }
    if (output.QueueUrl === "") {
        contents.QueueUrls = [];
    }
    if (output["QueueUrl"] !== undefined) {
        contents.QueueUrls = deserializeAws_queryQueueUrlList(getArrayIfSingleItem(output["QueueUrl"]), context);
    }
    return contents;
};
var deserializeAws_queryListQueueTagsResult = function (output, context) {
    var contents = {
        Tags: undefined,
    };
    if (output.Tag === "") {
        contents.Tags = {};
    }
    if (output["Tag"] !== undefined) {
        contents.Tags = deserializeAws_queryTagMap(getArrayIfSingleItem(output["Tag"]), context);
    }
    return contents;
};
var deserializeAws_queryMessage = function (output, context) {
    var contents = {
        MessageId: undefined,
        ReceiptHandle: undefined,
        MD5OfBody: undefined,
        Body: undefined,
        Attributes: undefined,
        MD5OfMessageAttributes: undefined,
        MessageAttributes: undefined,
    };
    if (output["MessageId"] !== undefined) {
        contents.MessageId = serdePlugin.expectString(output["MessageId"]);
    }
    if (output["ReceiptHandle"] !== undefined) {
        contents.ReceiptHandle = serdePlugin.expectString(output["ReceiptHandle"]);
    }
    if (output["MD5OfBody"] !== undefined) {
        contents.MD5OfBody = serdePlugin.expectString(output["MD5OfBody"]);
    }
    if (output["Body"] !== undefined) {
        contents.Body = serdePlugin.expectString(output["Body"]);
    }
    if (output.Attribute === "") {
        contents.Attributes = {};
    }
    if (output["Attribute"] !== undefined) {
        contents.Attributes = deserializeAws_queryMessageSystemAttributeMap(getArrayIfSingleItem(output["Attribute"]));
    }
    if (output["MD5OfMessageAttributes"] !== undefined) {
        contents.MD5OfMessageAttributes = serdePlugin.expectString(output["MD5OfMessageAttributes"]);
    }
    if (output.MessageAttribute === "") {
        contents.MessageAttributes = {};
    }
    if (output["MessageAttribute"] !== undefined) {
        contents.MessageAttributes = deserializeAws_queryMessageBodyAttributeMap(getArrayIfSingleItem(output["MessageAttribute"]), context);
    }
    return contents;
};
var deserializeAws_queryMessageAttributeValue = function (output, context) {
    var contents = {
        StringValue: undefined,
        BinaryValue: undefined,
        StringListValues: undefined,
        BinaryListValues: undefined,
        DataType: undefined,
    };
    if (output["StringValue"] !== undefined) {
        contents.StringValue = serdePlugin.expectString(output["StringValue"]);
    }
    if (output["BinaryValue"] !== undefined) {
        contents.BinaryValue = context.base64Decoder(output["BinaryValue"]);
    }
    if (output.StringListValue === "") {
        contents.StringListValues = [];
    }
    if (output["StringListValue"] !== undefined) {
        contents.StringListValues = deserializeAws_queryStringList(getArrayIfSingleItem(output["StringListValue"]));
    }
    if (output.BinaryListValue === "") {
        contents.BinaryListValues = [];
    }
    if (output["BinaryListValue"] !== undefined) {
        contents.BinaryListValues = deserializeAws_queryBinaryList(getArrayIfSingleItem(output["BinaryListValue"]), context);
    }
    if (output["DataType"] !== undefined) {
        contents.DataType = serdePlugin.expectString(output["DataType"]);
    }
    return contents;
};
var deserializeAws_queryMessageBodyAttributeMap = function (output, context) {
    return output.reduce(function (acc, pair) {
        var _a;
        if (pair["Value"] === null) {
            return acc;
        }
        return serdePlugin.__assign(serdePlugin.__assign({}, acc), (_a = {}, _a[pair["Name"]] = deserializeAws_queryMessageAttributeValue(pair["Value"], context), _a));
    }, {});
};
var deserializeAws_queryMessageList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_queryMessage(entry, context);
    });
};
var deserializeAws_queryMessageNotInflight = function (output, context) {
    var contents = {};
    return contents;
};
var deserializeAws_queryMessageSystemAttributeMap = function (output, context) {
    return output.reduce(function (acc, pair) {
        var _a;
        if (pair["Value"] === null) {
            return acc;
        }
        return serdePlugin.__assign(serdePlugin.__assign({}, acc), (_a = {}, _a[pair["Name"]] = serdePlugin.expectString(pair["Value"]), _a));
    }, {});
};
var deserializeAws_queryOverLimit = function (output, context) {
    var contents = {};
    return contents;
};
var deserializeAws_queryPurgeQueueInProgress = function (output, context) {
    var contents = {};
    return contents;
};
var deserializeAws_queryQueueAttributeMap = function (output, context) {
    return output.reduce(function (acc, pair) {
        var _a;
        if (pair["Value"] === null) {
            return acc;
        }
        return serdePlugin.__assign(serdePlugin.__assign({}, acc), (_a = {}, _a[pair["Name"]] = serdePlugin.expectString(pair["Value"]), _a));
    }, {});
};
var deserializeAws_queryQueueDeletedRecently = function (output, context) {
    var contents = {};
    return contents;
};
var deserializeAws_queryQueueDoesNotExist = function (output, context) {
    var contents = {};
    return contents;
};
var deserializeAws_queryQueueNameExists = function (output, context) {
    var contents = {};
    return contents;
};
var deserializeAws_queryQueueUrlList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return serdePlugin.expectString(entry);
    });
};
var deserializeAws_queryReceiptHandleIsInvalid = function (output, context) {
    var contents = {};
    return contents;
};
var deserializeAws_queryReceiveMessageResult = function (output, context) {
    var contents = {
        Messages: undefined,
    };
    if (output.Message === "") {
        contents.Messages = [];
    }
    if (output["Message"] !== undefined) {
        contents.Messages = deserializeAws_queryMessageList(getArrayIfSingleItem(output["Message"]), context);
    }
    return contents;
};
var deserializeAws_querySendMessageBatchResult = function (output, context) {
    var contents = {
        Successful: undefined,
        Failed: undefined,
    };
    if (output.SendMessageBatchResultEntry === "") {
        contents.Successful = [];
    }
    if (output["SendMessageBatchResultEntry"] !== undefined) {
        contents.Successful = deserializeAws_querySendMessageBatchResultEntryList(getArrayIfSingleItem(output["SendMessageBatchResultEntry"]), context);
    }
    if (output.BatchResultErrorEntry === "") {
        contents.Failed = [];
    }
    if (output["BatchResultErrorEntry"] !== undefined) {
        contents.Failed = deserializeAws_queryBatchResultErrorEntryList(getArrayIfSingleItem(output["BatchResultErrorEntry"]));
    }
    return contents;
};
var deserializeAws_querySendMessageBatchResultEntry = function (output, context) {
    var contents = {
        Id: undefined,
        MessageId: undefined,
        MD5OfMessageBody: undefined,
        MD5OfMessageAttributes: undefined,
        MD5OfMessageSystemAttributes: undefined,
        SequenceNumber: undefined,
    };
    if (output["Id"] !== undefined) {
        contents.Id = serdePlugin.expectString(output["Id"]);
    }
    if (output["MessageId"] !== undefined) {
        contents.MessageId = serdePlugin.expectString(output["MessageId"]);
    }
    if (output["MD5OfMessageBody"] !== undefined) {
        contents.MD5OfMessageBody = serdePlugin.expectString(output["MD5OfMessageBody"]);
    }
    if (output["MD5OfMessageAttributes"] !== undefined) {
        contents.MD5OfMessageAttributes = serdePlugin.expectString(output["MD5OfMessageAttributes"]);
    }
    if (output["MD5OfMessageSystemAttributes"] !== undefined) {
        contents.MD5OfMessageSystemAttributes = serdePlugin.expectString(output["MD5OfMessageSystemAttributes"]);
    }
    if (output["SequenceNumber"] !== undefined) {
        contents.SequenceNumber = serdePlugin.expectString(output["SequenceNumber"]);
    }
    return contents;
};
var deserializeAws_querySendMessageBatchResultEntryList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_querySendMessageBatchResultEntry(entry);
    });
};
var deserializeAws_querySendMessageResult = function (output, context) {
    var contents = {
        MD5OfMessageBody: undefined,
        MD5OfMessageAttributes: undefined,
        MD5OfMessageSystemAttributes: undefined,
        MessageId: undefined,
        SequenceNumber: undefined,
    };
    if (output["MD5OfMessageBody"] !== undefined) {
        contents.MD5OfMessageBody = serdePlugin.expectString(output["MD5OfMessageBody"]);
    }
    if (output["MD5OfMessageAttributes"] !== undefined) {
        contents.MD5OfMessageAttributes = serdePlugin.expectString(output["MD5OfMessageAttributes"]);
    }
    if (output["MD5OfMessageSystemAttributes"] !== undefined) {
        contents.MD5OfMessageSystemAttributes = serdePlugin.expectString(output["MD5OfMessageSystemAttributes"]);
    }
    if (output["MessageId"] !== undefined) {
        contents.MessageId = serdePlugin.expectString(output["MessageId"]);
    }
    if (output["SequenceNumber"] !== undefined) {
        contents.SequenceNumber = serdePlugin.expectString(output["SequenceNumber"]);
    }
    return contents;
};
var deserializeAws_queryStringList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return serdePlugin.expectString(entry);
    });
};
var deserializeAws_queryTagMap = function (output, context) {
    return output.reduce(function (acc, pair) {
        var _a;
        if (pair["Value"] === null) {
            return acc;
        }
        return serdePlugin.__assign(serdePlugin.__assign({}, acc), (_a = {}, _a[pair["Key"]] = serdePlugin.expectString(pair["Value"]), _a));
    }, {});
};
var deserializeAws_queryTooManyEntriesInBatchRequest = function (output, context) {
    var contents = {};
    return contents;
};
var deserializeAws_queryUnsupportedOperation = function (output, context) {
    var contents = {};
    return contents;
};
var deserializeMetadata = function (output) {
    var _a;
    return ({
        httpStatusCode: output.statusCode,
        requestId: (_a = output.headers["x-amzn-requestid"]) !== null && _a !== void 0 ? _a : output.headers["x-amzn-request-id"],
        extendedRequestId: output.headers["x-amz-id-2"],
        cfId: output.headers["x-amz-cf-id"],
    });
};
// Collect low-level response body stream to Uint8Array.
var collectBody = function (streamBody, context) {
    if (streamBody === void 0) { streamBody = new Uint8Array(); }
    if (streamBody instanceof Uint8Array) {
        return Promise.resolve(streamBody);
    }
    return context.streamCollector(streamBody) || Promise.resolve(new Uint8Array());
};
// Encode Uint8Array data into string with utf-8.
var collectBodyString = function (streamBody, context) {
    return collectBody(streamBody, context).then(function (body) { return context.utf8Encoder(body); });
};
var buildHttpRpcRequest = function (context, headers, path, resolvedHostname, body) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, contents;
    return serdePlugin.__generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port;
                contents = {
                    protocol: protocol,
                    hostname: hostname,
                    port: port,
                    method: "POST",
                    path: path,
                    headers: headers,
                };
                if (resolvedHostname !== undefined) {
                    contents.hostname = resolvedHostname;
                }
                if (body !== undefined) {
                    contents.body = body;
                }
                return [2 /*return*/, new serdePlugin.HttpRequest(contents)];
        }
    });
}); };
var parseBody = function (streamBody, context) {
    return collectBodyString(streamBody, context).then(function (encoded) {
        if (encoded.length) {
            var parsedObj = serdePlugin.parser.parse(encoded, {
                attributeNamePrefix: "",
                ignoreAttributes: false,
                parseNodeValue: false,
                trimValues: false,
                tagValueProcessor: function (val) { return (val.trim() === "" && val.includes("\n") ? "" : serdePlugin.lib.decodeHTML(val)); },
            });
            var textNodeName = "#text";
            var key = Object.keys(parsedObj)[0];
            var parsedObjToReturn = parsedObj[key];
            if (parsedObjToReturn[textNodeName]) {
                parsedObjToReturn[key] = parsedObjToReturn[textNodeName];
                delete parsedObjToReturn[textNodeName];
            }
            return serdePlugin.getValueFromTextNode(parsedObjToReturn);
        }
        return {};
    });
};
var buildFormUrlencodedString = function (formEntries) {
    return Object.entries(formEntries)
        .map(function (_a) {
        var _b = serdePlugin.__read(_a, 2), key = _b[0], value = _b[1];
        return serdePlugin.extendedEncodeURIComponent(key) + "=" + serdePlugin.extendedEncodeURIComponent(value);
    })
        .join("&");
};
var loadQueryErrorCode = function (output, data) {
    if (data.Error.Code !== undefined) {
        return data.Error.Code;
    }
    if (output.statusCode == 404) {
        return "NotFound";
    }
    return "";
};

/**
 * <p>Adds a permission to a queue for a specific
 *       <a href="https://docs.aws.amazon.com/general/latest/gr/glos-chap.html#P">principal</a>.
 *       This allows sharing access to the queue.</p>
 *          <p>When you create a queue, you have full control access rights for the queue.
 *       Only you, the owner of the queue, can grant or deny permissions to the queue.
 *       For more information about these permissions, see
 *       <a href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-writing-an-sqs-policy.html#write-messages-to-shared-queue">Allow
 *           Developers to Write Messages to a Shared Queue</a> in the <i>Amazon SQS Developer Guide</i>.</p>
 *          <note>
 *             <ul>
 *                <li>
 *                  <p>
 *                      <code>AddPermission</code> generates a policy for you. You can use
 *                      <code>
 *                         <a>SetQueueAttributes</a>
 *                      </code> to
 *                         upload your policy. For more information, see
 *                             <a href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-creating-custom-policies.html">Using Custom Policies with the Amazon SQS Access Policy Language</a> in
 *                      the <i>Amazon SQS Developer Guide</i>.</p>
 *                </li>
 *                <li>
 *                  <p>An Amazon SQS policy can have a maximum of 7 actions.</p>
 *                </li>
 *                <li>
 *                     <p>To remove the ability to change queue permissions, you must deny permission to the <code>AddPermission</code>, <code>RemovePermission</code>, and <code>SetQueueAttributes</code> actions in your IAM policy.</p>
 *                 </li>
 *             </ul>
 *          </note>
 *          <p>Some actions take lists of parameters. These lists are specified using the <code>param.n</code> notation. Values of <code>n</code> are integers starting from 1. For example, a parameter list with two elements looks like this:</p>
 *          <p>
 *             <code>&AttributeName.1=first</code>
 *          </p>
 *          <p>
 *             <code>&AttributeName.2=second</code>
 *          </p>
 *          <note>
 *             <p>Cross-account permissions don't apply to this action. For more information,
 * see <a href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-customer-managed-policy-examples.html#grant-cross-account-permissions-to-role-and-user-name">Grant
 * cross-account permissions to a role and a user name</a> in the <i>Amazon SQS Developer Guide</i>.</p>
 *          </note>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SQSClient, AddPermissionCommand } from "@aws-sdk/client-sqs"; // ES Modules import
 * // const { SQSClient, AddPermissionCommand } = require("@aws-sdk/client-sqs"); // CommonJS import
 * const client = new SQSClient(config);
 * const command = new AddPermissionCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link AddPermissionCommandInput} for command's `input` shape.
 * @see {@link AddPermissionCommandOutput} for command's `response` shape.
 * @see {@link SQSClientResolvedConfig | config} for command's `input` shape.
 *
 */
var AddPermissionCommand = /** @class */ (function (_super) {
    serdePlugin.__extends(AddPermissionCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function AddPermissionCommand(input) {
        var _this = 
        // Start section: command_constructor
        _super.call(this) || this;
        _this.input = input;
        return _this;
        // End section: command_constructor
    }
    /**
     * @internal
     */
    AddPermissionCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(serdePlugin.getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SQSClient";
        var commandName = "AddPermissionCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: exports.AddPermissionRequest.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    AddPermissionCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryAddPermissionCommand(input, context);
    };
    AddPermissionCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryAddPermissionCommand(output, context);
    };
    return AddPermissionCommand;
}(serdePlugin.Command));

/**
 * <p>Changes the visibility timeout of multiple messages. This is a batch version of <code>
 *                <a>ChangeMessageVisibility</a>.</code> The result of the action on each message is reported individually in the response.
 *           You can send up to 10 <code>
 *                <a>ChangeMessageVisibility</a>
 *             </code> requests with each <code>ChangeMessageVisibilityBatch</code> action.</p>
 *          <important>
 *             <p>Because the batch request can result in a combination of successful and unsuccessful actions, you should check for batch errors even when the call returns an HTTP status code of <code>200</code>.</p>
 *          </important>
 *          <p>Some actions take lists of parameters. These lists are specified using the <code>param.n</code> notation. Values of <code>n</code> are integers starting from 1. For example, a parameter list with two elements looks like this:</p>
 *          <p>
 *             <code>&AttributeName.1=first</code>
 *          </p>
 *          <p>
 *             <code>&AttributeName.2=second</code>
 *          </p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SQSClient, ChangeMessageVisibilityBatchCommand } from "@aws-sdk/client-sqs"; // ES Modules import
 * // const { SQSClient, ChangeMessageVisibilityBatchCommand } = require("@aws-sdk/client-sqs"); // CommonJS import
 * const client = new SQSClient(config);
 * const command = new ChangeMessageVisibilityBatchCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ChangeMessageVisibilityBatchCommandInput} for command's `input` shape.
 * @see {@link ChangeMessageVisibilityBatchCommandOutput} for command's `response` shape.
 * @see {@link SQSClientResolvedConfig | config} for command's `input` shape.
 *
 */
var ChangeMessageVisibilityBatchCommand = /** @class */ (function (_super) {
    serdePlugin.__extends(ChangeMessageVisibilityBatchCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ChangeMessageVisibilityBatchCommand(input) {
        var _this = 
        // Start section: command_constructor
        _super.call(this) || this;
        _this.input = input;
        return _this;
        // End section: command_constructor
    }
    /**
     * @internal
     */
    ChangeMessageVisibilityBatchCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(serdePlugin.getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SQSClient";
        var commandName = "ChangeMessageVisibilityBatchCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: exports.ChangeMessageVisibilityBatchRequest.filterSensitiveLog,
            outputFilterSensitiveLog: exports.ChangeMessageVisibilityBatchResult.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ChangeMessageVisibilityBatchCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryChangeMessageVisibilityBatchCommand(input, context);
    };
    ChangeMessageVisibilityBatchCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryChangeMessageVisibilityBatchCommand(output, context);
    };
    return ChangeMessageVisibilityBatchCommand;
}(serdePlugin.Command));

/**
 * <p>Changes the visibility timeout of a specified message in a queue to a new value. The
 *             default visibility timeout for a message is 30 seconds. The minimum is 0 seconds. The
 *             maximum is 12 hours. For more information, see <a href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html">Visibility Timeout</a> in the <i>Amazon SQS Developer Guide</i>.</p>
 *          <p>For example, you have a message with a visibility timeout of 5 minutes. After 3
 *             minutes, you call <code>ChangeMessageVisibility</code> with a timeout of 10 minutes. You
 *             can continue to call <code>ChangeMessageVisibility</code> to extend the visibility
 *             timeout to the maximum allowed time. If you try to extend the visibility timeout beyond
 *             the maximum, your request is rejected.</p>
 *         <p>An Amazon SQS message has three basic states:</p>
 *          <ol>
 *             <li>
 *                <p>Sent to a queue by a producer.</p>
 *             </li>
 *             <li>
 *                <p>Received from the queue by a consumer.</p>
 *             </li>
 *             <li>
 *                <p>Deleted from the queue.</p>
 *             </li>
 *          </ol>
 *          <p>A message is considered to be <i>stored</i> after it is sent to a queue by a producer, but not yet received from the queue by a consumer (that is, between states 1 and 2). There is no limit to the number of stored messages.
 *     A message is considered to be <i>in flight</i> after it is received from a queue by a consumer, but not yet deleted from the queue (that is, between states 2 and 3). There is a limit to the number of inflight messages.</p>
 *          <p>Limits that apply to inflight messages are unrelated to the <i>unlimited</i> number of stored messages.</p>
 *          <p>For most standard queues (depending on queue traffic and message backlog), there can be a maximum of approximately 120,000 inflight messages (received from a queue by a consumer, but not yet deleted from the queue).
 *     If you reach this limit, Amazon SQS returns the <code>OverLimit</code> error message.
 *     To avoid reaching the limit, you should delete messages from the queue after they're processed. You can also increase the number of queues you use to process your messages.
 *     To request a limit increase, <a href="https://console.aws.amazon.com/support/home#/case/create?issueType=service-limit-increase&limitType=service-code-sqs">file a support request</a>.</p>
 *          <p>For FIFO queues, there can be a maximum of 20,000 inflight messages (received from a queue by a consumer, but not yet deleted from the queue). If you reach this limit, Amazon SQS returns no error messages.</p>
 *
 *          <important>
 *             <p>If you attempt to set the <code>VisibilityTimeout</code> to a value greater than the maximum time left, Amazon SQS returns an error. Amazon SQS doesn't automatically recalculate and increase the timeout to the maximum remaining time.</p>
 *             <p>Unlike with a queue, when you change the visibility timeout for a specific message the timeout value is applied immediately but isn't saved in memory for that message. If you don't delete a message after it is received, the visibility timeout
 *               for the message reverts to the original timeout value (not to the value you set using the <code>ChangeMessageVisibility</code> action) the next time the message is received.</p>
 *          </important>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SQSClient, ChangeMessageVisibilityCommand } from "@aws-sdk/client-sqs"; // ES Modules import
 * // const { SQSClient, ChangeMessageVisibilityCommand } = require("@aws-sdk/client-sqs"); // CommonJS import
 * const client = new SQSClient(config);
 * const command = new ChangeMessageVisibilityCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ChangeMessageVisibilityCommandInput} for command's `input` shape.
 * @see {@link ChangeMessageVisibilityCommandOutput} for command's `response` shape.
 * @see {@link SQSClientResolvedConfig | config} for command's `input` shape.
 *
 */
var ChangeMessageVisibilityCommand = /** @class */ (function (_super) {
    serdePlugin.__extends(ChangeMessageVisibilityCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ChangeMessageVisibilityCommand(input) {
        var _this = 
        // Start section: command_constructor
        _super.call(this) || this;
        _this.input = input;
        return _this;
        // End section: command_constructor
    }
    /**
     * @internal
     */
    ChangeMessageVisibilityCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(serdePlugin.getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SQSClient";
        var commandName = "ChangeMessageVisibilityCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: exports.ChangeMessageVisibilityRequest.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ChangeMessageVisibilityCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryChangeMessageVisibilityCommand(input, context);
    };
    ChangeMessageVisibilityCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryChangeMessageVisibilityCommand(output, context);
    };
    return ChangeMessageVisibilityCommand;
}(serdePlugin.Command));

/**
 * <p>Creates a new standard or FIFO queue. You can pass one or more attributes in
 *             the request. Keep the following in mind:</p>
 *          <ul>
 *             <li>
 *               <p>If you don't specify the <code>FifoQueue</code> attribute, Amazon SQS creates a standard queue.</p>
 *               <note>
 *                   <p>You can't change the queue type after you create it and you can't convert
 *                         an existing standard queue into a FIFO queue. You must either create a new
 *                         FIFO queue for your application or delete your existing standard queue and
 *                         recreate it as a FIFO queue. For more information, see <a href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/FIFO-queues.html#FIFO-queues-moving">Moving From a Standard Queue to a FIFO Queue</a> in the
 *                             <i>Amazon SQS Developer Guide</i>. </p>
 *               </note>
 *             </li>
 *             <li>
 *               <p>If you don't provide a value for an attribute, the queue is created with the default value for the attribute.</p>
 *             </li>
 *             <li>
 *               <p>If you delete a queue, you must wait at least 60 seconds before creating a queue with the same name.</p>
 *             </li>
 *          </ul>
 *
 *          <p>To successfully create a new queue, you must provide a queue name that adheres to the <a href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/limits-queues.html">limits related to queues</a> and is unique within the scope of your queues.</p>
 *         <note>
 *             <p>After you create a queue, you must wait at least one second after the queue is
 *                 created to be able to use the queue.</p>
 *         </note>
 *          <p>To get the queue URL, use the <code>
 *                <a>GetQueueUrl</a>
 *             </code> action. <code>
 *                <a>GetQueueUrl</a>
 *             </code> requires only the <code>QueueName</code> parameter.
 *           be aware of existing queue names:</p>
 *          <ul>
 *             <li>
 *                <p>If you provide the name of an existing queue along with the exact names and values of all the queue's attributes, <code>CreateQueue</code> returns the queue URL for the existing queue.</p>
 *             </li>
 *             <li>
 *                <p>If the queue name, attribute names, or attribute values don't match an existing queue, <code>CreateQueue</code> returns an error.</p>
 *             </li>
 *          </ul>
 *          <p>Some actions take lists of parameters. These lists are specified using the <code>param.n</code> notation. Values of <code>n</code> are integers starting from 1. For example, a parameter list with two elements looks like this:</p>
 *          <p>
 *             <code>&AttributeName.1=first</code>
 *          </p>
 *          <p>
 *             <code>&AttributeName.2=second</code>
 *          </p>
 *          <note>
 *             <p>Cross-account permissions don't apply to this action. For more information,
 * see <a href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-customer-managed-policy-examples.html#grant-cross-account-permissions-to-role-and-user-name">Grant
 * cross-account permissions to a role and a user name</a> in the <i>Amazon SQS Developer Guide</i>.</p>
 *          </note>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SQSClient, CreateQueueCommand } from "@aws-sdk/client-sqs"; // ES Modules import
 * // const { SQSClient, CreateQueueCommand } = require("@aws-sdk/client-sqs"); // CommonJS import
 * const client = new SQSClient(config);
 * const command = new CreateQueueCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link CreateQueueCommandInput} for command's `input` shape.
 * @see {@link CreateQueueCommandOutput} for command's `response` shape.
 * @see {@link SQSClientResolvedConfig | config} for command's `input` shape.
 *
 */
var CreateQueueCommand = /** @class */ (function (_super) {
    serdePlugin.__extends(CreateQueueCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function CreateQueueCommand(input) {
        var _this = 
        // Start section: command_constructor
        _super.call(this) || this;
        _this.input = input;
        return _this;
        // End section: command_constructor
    }
    /**
     * @internal
     */
    CreateQueueCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(serdePlugin.getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SQSClient";
        var commandName = "CreateQueueCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: exports.CreateQueueRequest.filterSensitiveLog,
            outputFilterSensitiveLog: exports.CreateQueueResult.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    CreateQueueCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryCreateQueueCommand(input, context);
    };
    CreateQueueCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryCreateQueueCommand(output, context);
    };
    return CreateQueueCommand;
}(serdePlugin.Command));

/**
 * <p>Deletes up to ten messages from the specified queue. This is a batch version of <code>
 *                <a>DeleteMessage</a>.</code> The result of the action on each message is reported individually in the response.</p>
 *          <important>
 *             <p>Because the batch request can result in a combination of successful and unsuccessful actions, you should check for batch errors even when the call returns an HTTP status code of <code>200</code>.</p>
 *          </important>
 *          <p>Some actions take lists of parameters. These lists are specified using the <code>param.n</code> notation. Values of <code>n</code> are integers starting from 1. For example, a parameter list with two elements looks like this:</p>
 *          <p>
 *             <code>&AttributeName.1=first</code>
 *          </p>
 *          <p>
 *             <code>&AttributeName.2=second</code>
 *          </p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SQSClient, DeleteMessageBatchCommand } from "@aws-sdk/client-sqs"; // ES Modules import
 * // const { SQSClient, DeleteMessageBatchCommand } = require("@aws-sdk/client-sqs"); // CommonJS import
 * const client = new SQSClient(config);
 * const command = new DeleteMessageBatchCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link DeleteMessageBatchCommandInput} for command's `input` shape.
 * @see {@link DeleteMessageBatchCommandOutput} for command's `response` shape.
 * @see {@link SQSClientResolvedConfig | config} for command's `input` shape.
 *
 */
var DeleteMessageBatchCommand = /** @class */ (function (_super) {
    serdePlugin.__extends(DeleteMessageBatchCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DeleteMessageBatchCommand(input) {
        var _this = 
        // Start section: command_constructor
        _super.call(this) || this;
        _this.input = input;
        return _this;
        // End section: command_constructor
    }
    /**
     * @internal
     */
    DeleteMessageBatchCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(serdePlugin.getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SQSClient";
        var commandName = "DeleteMessageBatchCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: exports.DeleteMessageBatchRequest.filterSensitiveLog,
            outputFilterSensitiveLog: exports.DeleteMessageBatchResult.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DeleteMessageBatchCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryDeleteMessageBatchCommand(input, context);
    };
    DeleteMessageBatchCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryDeleteMessageBatchCommand(output, context);
    };
    return DeleteMessageBatchCommand;
}(serdePlugin.Command));

/**
 * <p>Deletes the specified message from the specified queue. To select the message to
 *             delete, use the <code>ReceiptHandle</code> of the message (<i>not</i> the
 *                 <code>MessageId</code> which you receive when you send the message). Amazon SQS can
 *             delete a message from a queue even if a visibility timeout setting causes the message to
 *             be locked by another consumer. Amazon SQS automatically deletes messages left in a queue
 *             longer than the retention period configured for the queue. </p>
 *          <note>
 *             <p>The <code>ReceiptHandle</code> is associated with a <i>specific
 *                     instance</i> of receiving a message. If you receive a message more than
 *                 once, the <code>ReceiptHandle</code> is different each time you receive a message.
 *                 When you use the <code>DeleteMessage</code> action, you must provide the most
 *                 recently received <code>ReceiptHandle</code> for the message (otherwise, the request
 *                 succeeds, but the message might not be deleted).</p>
 *             <p>For standard queues, it is possible to receive a message even after you
 *                 delete it. This might happen on rare occasions if one of the servers which stores a
 *                 copy of the message is unavailable when you send the request to delete the message.
 *                 The copy remains on the server and might be returned to you during a subsequent
 *                 receive request. You should ensure that your application is idempotent, so that
 *                 receiving a message more than once does not cause issues.</p>
 *          </note>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SQSClient, DeleteMessageCommand } from "@aws-sdk/client-sqs"; // ES Modules import
 * // const { SQSClient, DeleteMessageCommand } = require("@aws-sdk/client-sqs"); // CommonJS import
 * const client = new SQSClient(config);
 * const command = new DeleteMessageCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link DeleteMessageCommandInput} for command's `input` shape.
 * @see {@link DeleteMessageCommandOutput} for command's `response` shape.
 * @see {@link SQSClientResolvedConfig | config} for command's `input` shape.
 *
 */
var DeleteMessageCommand = /** @class */ (function (_super) {
    serdePlugin.__extends(DeleteMessageCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DeleteMessageCommand(input) {
        var _this = 
        // Start section: command_constructor
        _super.call(this) || this;
        _this.input = input;
        return _this;
        // End section: command_constructor
    }
    /**
     * @internal
     */
    DeleteMessageCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(serdePlugin.getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SQSClient";
        var commandName = "DeleteMessageCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: exports.DeleteMessageRequest.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DeleteMessageCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryDeleteMessageCommand(input, context);
    };
    DeleteMessageCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryDeleteMessageCommand(output, context);
    };
    return DeleteMessageCommand;
}(serdePlugin.Command));

/**
 * <p>Deletes the queue specified by the <code>QueueUrl</code>, regardless of the queue's contents.</p>
 *          <important>
 *             <p>Be careful with the <code>DeleteQueue</code> action: When you delete a queue, any messages in the queue are no longer available.
 *       </p>
 *          </important>
 *          <p>When you delete a queue, the deletion process takes up to 60 seconds. Requests you send involving that queue during the 60 seconds might succeed. For example, a
 *           <code>
 *                <a>SendMessage</a>
 *             </code> request might succeed, but after 60 seconds the queue and the message you sent no longer exist.</p>
 *          <p>When you delete a queue, you must wait at least 60 seconds before creating a queue with the same name.</p>
 *          <note>
 *             <p>Cross-account permissions don't apply to this action. For more information,
 * see <a href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-customer-managed-policy-examples.html#grant-cross-account-permissions-to-role-and-user-name">Grant
 * cross-account permissions to a role and a user name</a> in the <i>Amazon SQS Developer Guide</i>.</p>
 *          </note>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SQSClient, DeleteQueueCommand } from "@aws-sdk/client-sqs"; // ES Modules import
 * // const { SQSClient, DeleteQueueCommand } = require("@aws-sdk/client-sqs"); // CommonJS import
 * const client = new SQSClient(config);
 * const command = new DeleteQueueCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link DeleteQueueCommandInput} for command's `input` shape.
 * @see {@link DeleteQueueCommandOutput} for command's `response` shape.
 * @see {@link SQSClientResolvedConfig | config} for command's `input` shape.
 *
 */
var DeleteQueueCommand = /** @class */ (function (_super) {
    serdePlugin.__extends(DeleteQueueCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DeleteQueueCommand(input) {
        var _this = 
        // Start section: command_constructor
        _super.call(this) || this;
        _this.input = input;
        return _this;
        // End section: command_constructor
    }
    /**
     * @internal
     */
    DeleteQueueCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(serdePlugin.getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SQSClient";
        var commandName = "DeleteQueueCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: exports.DeleteQueueRequest.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DeleteQueueCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryDeleteQueueCommand(input, context);
    };
    DeleteQueueCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryDeleteQueueCommand(output, context);
    };
    return DeleteQueueCommand;
}(serdePlugin.Command));

/**
 * <p>Gets attributes for the specified queue.</p>
 *          <note>
 *             <p>To determine whether a queue is <a href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/FIFO-queues.html">FIFO</a>, you can check whether <code>QueueName</code> ends with the <code>.fifo</code> suffix.</p>
 *          </note>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SQSClient, GetQueueAttributesCommand } from "@aws-sdk/client-sqs"; // ES Modules import
 * // const { SQSClient, GetQueueAttributesCommand } = require("@aws-sdk/client-sqs"); // CommonJS import
 * const client = new SQSClient(config);
 * const command = new GetQueueAttributesCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetQueueAttributesCommandInput} for command's `input` shape.
 * @see {@link GetQueueAttributesCommandOutput} for command's `response` shape.
 * @see {@link SQSClientResolvedConfig | config} for command's `input` shape.
 *
 */
var GetQueueAttributesCommand = /** @class */ (function (_super) {
    serdePlugin.__extends(GetQueueAttributesCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function GetQueueAttributesCommand(input) {
        var _this = 
        // Start section: command_constructor
        _super.call(this) || this;
        _this.input = input;
        return _this;
        // End section: command_constructor
    }
    /**
     * @internal
     */
    GetQueueAttributesCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(serdePlugin.getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SQSClient";
        var commandName = "GetQueueAttributesCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: exports.GetQueueAttributesRequest.filterSensitiveLog,
            outputFilterSensitiveLog: exports.GetQueueAttributesResult.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetQueueAttributesCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryGetQueueAttributesCommand(input, context);
    };
    GetQueueAttributesCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryGetQueueAttributesCommand(output, context);
    };
    return GetQueueAttributesCommand;
}(serdePlugin.Command));

/**
 * <p>Returns the URL of an existing Amazon SQS queue.</p>
 *          <p>To access a queue that belongs to another AWS account, use the <code>QueueOwnerAWSAccountId</code> parameter to specify the account ID of the queue's owner. The queue's owner must grant you permission to access the queue.
 *           For more information about shared queue access, see <code>
 *                <a>AddPermission</a>
 *             </code> or see <a href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-writing-an-sqs-policy.html#write-messages-to-shared-queue">Allow Developers to Write Messages to a Shared Queue</a> in the <i>Amazon SQS Developer Guide</i>.
 *     </p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SQSClient, GetQueueUrlCommand } from "@aws-sdk/client-sqs"; // ES Modules import
 * // const { SQSClient, GetQueueUrlCommand } = require("@aws-sdk/client-sqs"); // CommonJS import
 * const client = new SQSClient(config);
 * const command = new GetQueueUrlCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetQueueUrlCommandInput} for command's `input` shape.
 * @see {@link GetQueueUrlCommandOutput} for command's `response` shape.
 * @see {@link SQSClientResolvedConfig | config} for command's `input` shape.
 *
 */
var GetQueueUrlCommand = /** @class */ (function (_super) {
    serdePlugin.__extends(GetQueueUrlCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function GetQueueUrlCommand(input) {
        var _this = 
        // Start section: command_constructor
        _super.call(this) || this;
        _this.input = input;
        return _this;
        // End section: command_constructor
    }
    /**
     * @internal
     */
    GetQueueUrlCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(serdePlugin.getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SQSClient";
        var commandName = "GetQueueUrlCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: exports.GetQueueUrlRequest.filterSensitiveLog,
            outputFilterSensitiveLog: exports.GetQueueUrlResult.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetQueueUrlCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryGetQueueUrlCommand(input, context);
    };
    GetQueueUrlCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryGetQueueUrlCommand(output, context);
    };
    return GetQueueUrlCommand;
}(serdePlugin.Command));

/**
 * <p>Returns a list of your queues that have the <code>RedrivePolicy</code> queue attribute configured with a dead-letter queue.</p>
 *          <p> The <code>ListDeadLetterSourceQueues</code> methods supports
 *           pagination. Set parameter <code>MaxResults</code> in the request to specify the maximum number of
 *           results to be returned in the response. If you do not set <code>MaxResults</code>,
 *           the response includes a maximum of 1,000 results. If you set <code>MaxResults</code> and there are additional results to
 *           display, the response includes a value for <code>NextToken</code>. Use
 *           <code>NextToken</code> as a parameter in your next request to
 *           <code>ListDeadLetterSourceQueues</code> to receive the next page of results.   </p>
 *
 *          <p>For more information about using dead-letter queues, see <a href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html">Using Amazon SQS Dead-Letter Queues</a>
 *           in the <i>Amazon SQS Developer Guide</i>.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SQSClient, ListDeadLetterSourceQueuesCommand } from "@aws-sdk/client-sqs"; // ES Modules import
 * // const { SQSClient, ListDeadLetterSourceQueuesCommand } = require("@aws-sdk/client-sqs"); // CommonJS import
 * const client = new SQSClient(config);
 * const command = new ListDeadLetterSourceQueuesCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ListDeadLetterSourceQueuesCommandInput} for command's `input` shape.
 * @see {@link ListDeadLetterSourceQueuesCommandOutput} for command's `response` shape.
 * @see {@link SQSClientResolvedConfig | config} for command's `input` shape.
 *
 */
var ListDeadLetterSourceQueuesCommand = /** @class */ (function (_super) {
    serdePlugin.__extends(ListDeadLetterSourceQueuesCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ListDeadLetterSourceQueuesCommand(input) {
        var _this = 
        // Start section: command_constructor
        _super.call(this) || this;
        _this.input = input;
        return _this;
        // End section: command_constructor
    }
    /**
     * @internal
     */
    ListDeadLetterSourceQueuesCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(serdePlugin.getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SQSClient";
        var commandName = "ListDeadLetterSourceQueuesCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: exports.ListDeadLetterSourceQueuesRequest.filterSensitiveLog,
            outputFilterSensitiveLog: exports.ListDeadLetterSourceQueuesResult.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListDeadLetterSourceQueuesCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryListDeadLetterSourceQueuesCommand(input, context);
    };
    ListDeadLetterSourceQueuesCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryListDeadLetterSourceQueuesCommand(output, context);
    };
    return ListDeadLetterSourceQueuesCommand;
}(serdePlugin.Command));

/**
 * <p>List all cost allocation tags added to the specified Amazon SQS queue. For an overview, see <a href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-queue-tags.html">Tagging
 * Your Amazon SQS Queues</a> in the <i>Amazon SQS Developer Guide</i>.</p>
 *         <note>
 *             <p>Cross-account permissions don't apply to this action. For more information,
 * see <a href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-customer-managed-policy-examples.html#grant-cross-account-permissions-to-role-and-user-name">Grant
 * cross-account permissions to a role and a user name</a> in the <i>Amazon SQS Developer Guide</i>.</p>
 *         </note>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SQSClient, ListQueueTagsCommand } from "@aws-sdk/client-sqs"; // ES Modules import
 * // const { SQSClient, ListQueueTagsCommand } = require("@aws-sdk/client-sqs"); // CommonJS import
 * const client = new SQSClient(config);
 * const command = new ListQueueTagsCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ListQueueTagsCommandInput} for command's `input` shape.
 * @see {@link ListQueueTagsCommandOutput} for command's `response` shape.
 * @see {@link SQSClientResolvedConfig | config} for command's `input` shape.
 *
 */
var ListQueueTagsCommand = /** @class */ (function (_super) {
    serdePlugin.__extends(ListQueueTagsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ListQueueTagsCommand(input) {
        var _this = 
        // Start section: command_constructor
        _super.call(this) || this;
        _this.input = input;
        return _this;
        // End section: command_constructor
    }
    /**
     * @internal
     */
    ListQueueTagsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(serdePlugin.getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SQSClient";
        var commandName = "ListQueueTagsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: exports.ListQueueTagsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: exports.ListQueueTagsResult.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListQueueTagsCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryListQueueTagsCommand(input, context);
    };
    ListQueueTagsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryListQueueTagsCommand(output, context);
    };
    return ListQueueTagsCommand;
}(serdePlugin.Command));

/**
 * <p>Returns a list of your queues in the current region. The response includes a maximum of 1,000 results. If you specify a value for the optional
 *           <code>QueueNamePrefix</code> parameter, only queues with a name that begins with the specified value are returned.</p>
 *          <p> The <code>listQueues</code> methods supports
 *           pagination. Set parameter <code>MaxResults</code> in the request to specify the maximum number of
 *           results to be returned in the response. If you do not set <code>MaxResults</code>,
 *           the response includes a maximum of 1,000 results. If you set <code>MaxResults</code> and there are additional results to
 *           display, the response includes a value for <code>NextToken</code>. Use
 *           <code>NextToken</code> as a parameter in your next request to
 *           <code>listQueues</code> to receive the next page of results.  </p>
 *          <note>
 *             <p>Cross-account permissions don't apply to this action. For more information,
 * see <a href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-customer-managed-policy-examples.html#grant-cross-account-permissions-to-role-and-user-name">Grant
 * cross-account permissions to a role and a user name</a> in the <i>Amazon SQS Developer Guide</i>.</p>
 *          </note>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SQSClient, ListQueuesCommand } from "@aws-sdk/client-sqs"; // ES Modules import
 * // const { SQSClient, ListQueuesCommand } = require("@aws-sdk/client-sqs"); // CommonJS import
 * const client = new SQSClient(config);
 * const command = new ListQueuesCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ListQueuesCommandInput} for command's `input` shape.
 * @see {@link ListQueuesCommandOutput} for command's `response` shape.
 * @see {@link SQSClientResolvedConfig | config} for command's `input` shape.
 *
 */
var ListQueuesCommand = /** @class */ (function (_super) {
    serdePlugin.__extends(ListQueuesCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ListQueuesCommand(input) {
        var _this = 
        // Start section: command_constructor
        _super.call(this) || this;
        _this.input = input;
        return _this;
        // End section: command_constructor
    }
    /**
     * @internal
     */
    ListQueuesCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(serdePlugin.getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SQSClient";
        var commandName = "ListQueuesCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: exports.ListQueuesRequest.filterSensitiveLog,
            outputFilterSensitiveLog: exports.ListQueuesResult.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListQueuesCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryListQueuesCommand(input, context);
    };
    ListQueuesCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryListQueuesCommand(output, context);
    };
    return ListQueuesCommand;
}(serdePlugin.Command));

/**
 * <p>Deletes the messages in a queue specified by the <code>QueueURL</code>
 *             parameter.</p>
 *
 *          <important>
 *             <p>When you use the <code>PurgeQueue</code> action, you can't retrieve any messages
 *                 deleted from a queue.</p>
 *             <p>The message deletion process takes up to 60 seconds. We recommend waiting for
 *                 60 seconds regardless of your queue's size. </p>
 *          </important>
 *         <p>Messages sent to the queue <i>before</i> you call
 *                 <code>PurgeQueue</code> might be received but are deleted within the next
 *             minute.</p>
 *         <p>Messages sent to the queue <i>after</i> you call
 *                 <code>PurgeQueue</code> might be deleted while the queue is being purged.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SQSClient, PurgeQueueCommand } from "@aws-sdk/client-sqs"; // ES Modules import
 * // const { SQSClient, PurgeQueueCommand } = require("@aws-sdk/client-sqs"); // CommonJS import
 * const client = new SQSClient(config);
 * const command = new PurgeQueueCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link PurgeQueueCommandInput} for command's `input` shape.
 * @see {@link PurgeQueueCommandOutput} for command's `response` shape.
 * @see {@link SQSClientResolvedConfig | config} for command's `input` shape.
 *
 */
var PurgeQueueCommand = /** @class */ (function (_super) {
    serdePlugin.__extends(PurgeQueueCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function PurgeQueueCommand(input) {
        var _this = 
        // Start section: command_constructor
        _super.call(this) || this;
        _this.input = input;
        return _this;
        // End section: command_constructor
    }
    /**
     * @internal
     */
    PurgeQueueCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(serdePlugin.getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SQSClient";
        var commandName = "PurgeQueueCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: exports.PurgeQueueRequest.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    PurgeQueueCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryPurgeQueueCommand(input, context);
    };
    PurgeQueueCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryPurgeQueueCommand(output, context);
    };
    return PurgeQueueCommand;
}(serdePlugin.Command));

function receiveMessageMiddleware(options) {
    var _this = this;
    return function (next) {
        return function (args) { return serdePlugin.__awaiter(_this, void 0, void 0, function () {
            var resp, output, messageIds, _a, _b, message, md5, hash, _c, _d, e_1_1;
            var e_1, _e;
            return serdePlugin.__generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, next(serdePlugin.__assign({}, args))];
                    case 1:
                        resp = _f.sent();
                        output = resp.output;
                        messageIds = [];
                        if (!(output.Messages !== undefined)) return [3 /*break*/, 9];
                        _f.label = 2;
                    case 2:
                        _f.trys.push([2, 7, 8, 9]);
                        _a = serdePlugin.__values(output.Messages), _b = _a.next();
                        _f.label = 3;
                    case 3:
                        if (!!_b.done) return [3 /*break*/, 6];
                        message = _b.value;
                        md5 = message.MD5OfBody;
                        hash = new options.md5();
                        hash.update(message.Body || "");
                        _c = md5;
                        _d = defaultRoleAssumers.toHex;
                        return [4 /*yield*/, hash.digest()];
                    case 4:
                        if (_c !== _d.apply(void 0, [_f.sent()])) {
                            messageIds.push(message.MessageId);
                        }
                        _f.label = 5;
                    case 5:
                        _b = _a.next();
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_1_1 = _f.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (_b && !_b.done && (_e = _a.return)) _e.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 9:
                        if (messageIds.length > 0) {
                            throw new Error("Invalid MD5 checksum on messages: " + messageIds.join(", "));
                        }
                        return [2 /*return*/, resp];
                }
            });
        }); };
    };
}
var receiveMessageMiddlewareOptions = {
    step: "initialize",
    tags: ["VALIDATE_BODY_MD5"],
    name: "receiveMessageMiddleware",
    override: true,
};
var getReceiveMessagePlugin = function (config) { return ({
    applyToStack: function (clientStack) {
        clientStack.add(receiveMessageMiddleware(config), receiveMessageMiddlewareOptions);
    },
}); };

var sendMessageMiddleware = function (options) {
    return function (next) {
        return function (args) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
            var resp, output, hash, _a, _b;
            return serdePlugin.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, next(serdePlugin.__assign({}, args))];
                    case 1:
                        resp = _c.sent();
                        output = resp.output;
                        hash = new options.md5();
                        hash.update(args.input.MessageBody || "");
                        _a = output.MD5OfMessageBody;
                        _b = defaultRoleAssumers.toHex;
                        return [4 /*yield*/, hash.digest()];
                    case 2:
                        if (_a !== _b.apply(void 0, [_c.sent()])) {
                            throw new Error("InvalidChecksumError");
                        }
                        return [2 /*return*/, resp];
                }
            });
        }); };
    };
};
var sendMessageMiddlewareOptions = {
    step: "initialize",
    tags: ["VALIDATE_BODY_MD5"],
    name: "sendMessageMiddleware",
    override: true,
};
var getSendMessagePlugin = function (config) { return ({
    applyToStack: function (clientStack) {
        clientStack.add(sendMessageMiddleware(config), sendMessageMiddlewareOptions);
    },
}); };

var sendMessageBatchMiddleware = function (options) {
    return function (next) {
        return function (args) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
            var resp, output, messageIds, entries, _a, _b, entry, _c, _d, entry, md5, hash, _e, _f, e_1_1;
            var e_2, _g, e_1, _h;
            return serdePlugin.__generator(this, function (_j) {
                switch (_j.label) {
                    case 0: return [4 /*yield*/, next(serdePlugin.__assign({}, args))];
                    case 1:
                        resp = _j.sent();
                        output = resp.output;
                        messageIds = [];
                        entries = {};
                        if (output.Successful !== undefined) {
                            try {
                                for (_a = serdePlugin.__values(output.Successful), _b = _a.next(); !_b.done; _b = _a.next()) {
                                    entry = _b.value;
                                    if (entry.Id !== undefined) {
                                        entries[entry.Id] = entry;
                                    }
                                }
                            }
                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                            finally {
                                try {
                                    if (_b && !_b.done && (_g = _a.return)) _g.call(_a);
                                }
                                finally { if (e_2) throw e_2.error; }
                            }
                        }
                        _j.label = 2;
                    case 2:
                        _j.trys.push([2, 7, 8, 9]);
                        _c = serdePlugin.__values(args.input.Entries), _d = _c.next();
                        _j.label = 3;
                    case 3:
                        if (!!_d.done) return [3 /*break*/, 6];
                        entry = _d.value;
                        if (!entries[entry.Id]) return [3 /*break*/, 5];
                        md5 = entries[entry.Id].MD5OfMessageBody;
                        hash = new options.md5();
                        hash.update(entry.MessageBody || "");
                        _e = md5;
                        _f = defaultRoleAssumers.toHex;
                        return [4 /*yield*/, hash.digest()];
                    case 4:
                        if (_e !== _f.apply(void 0, [_j.sent()])) {
                            messageIds.push(entries[entry.Id].MessageId);
                        }
                        _j.label = 5;
                    case 5:
                        _d = _c.next();
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_1_1 = _j.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (_d && !_d.done && (_h = _c.return)) _h.call(_c);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 9:
                        if (messageIds.length > 0) {
                            throw new Error("Invalid MD5 checksum on messages: " + messageIds.join(", "));
                        }
                        return [2 /*return*/, resp];
                }
            });
        }); };
    };
};
var sendMessageBatchMiddlewareOptions = {
    step: "initialize",
    tags: ["VALIDATE_BODY_MD5"],
    name: "sendMessageBatchMiddleware",
    override: true,
};
var getSendMessageBatchPlugin = function (config) { return ({
    applyToStack: function (clientStack) {
        clientStack.add(sendMessageBatchMiddleware(config), sendMessageBatchMiddlewareOptions);
    },
}); };

/**
 * <p>Retrieves one or more messages (up to 10), from the specified queue. Using the <code>WaitTimeSeconds</code> parameter enables long-poll support.
 *          For more information, see <a href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-long-polling.html">Amazon SQS Long Polling</a> in the <i>Amazon SQS Developer Guide</i>.
 *     </p>
 *          <p>Short poll is the default behavior where a weighted random set of machines is sampled on a <code>ReceiveMessage</code> call. Thus, only the messages on the sampled machines are returned.
 *           If the number of messages in the queue is small (fewer than 1,000), you most likely get fewer messages than you requested per <code>ReceiveMessage</code> call. If the number of messages in the queue is extremely small,
 *           you might not receive any messages in a particular <code>ReceiveMessage</code> response. If this happens, repeat the request.
 *     </p>
 *          <p>For each message returned, the response includes the following:</p>
 *          <ul>
 *             <li>
 *                <p>The message body.</p>
 *             </li>
 *             <li>
 *                <p>An MD5 digest of the message body. For information about MD5, see <a href="https://www.ietf.org/rfc/rfc1321.txt">RFC1321</a>.</p>
 *             </li>
 *             <li>
 *                <p>The <code>MessageId</code> you received when you sent the message to the queue.</p>
 *             </li>
 *             <li>
 *                <p>The receipt handle.</p>
 *             </li>
 *             <li>
 *                <p>The message attributes.</p>
 *             </li>
 *             <li>
 *                <p>An MD5 digest of the message attributes.</p>
 *             </li>
 *          </ul>
 *          <p>The receipt handle is the identifier you must provide when deleting the message. For more information, see <a href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-queue-message-identifiers.html">Queue
 *           and Message Identifiers</a> in the <i>Amazon SQS Developer Guide</i>.</p>
 *          <p>You can provide the <code>VisibilityTimeout</code> parameter in your request. The parameter is applied to the messages that Amazon SQS returns in the response. If you don't include the parameter, the overall visibility timeout for the queue
 *           is used for the returned messages. For more information, see <a href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html">Visibility Timeout</a> in the <i>Amazon SQS Developer Guide</i>.</p>
 *          <p>A message that isn't deleted or a message whose visibility isn't extended before the visibility timeout expires counts as a failed receive. Depending on the configuration of the queue, the message might be sent to the dead-letter queue.</p>
 *          <note>
 *             <p>In the future, new attributes might be added. If you write code that calls this action, we recommend that you structure your code so that it can handle new attributes gracefully.</p>
 *          </note>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SQSClient, ReceiveMessageCommand } from "@aws-sdk/client-sqs"; // ES Modules import
 * // const { SQSClient, ReceiveMessageCommand } = require("@aws-sdk/client-sqs"); // CommonJS import
 * const client = new SQSClient(config);
 * const command = new ReceiveMessageCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ReceiveMessageCommandInput} for command's `input` shape.
 * @see {@link ReceiveMessageCommandOutput} for command's `response` shape.
 * @see {@link SQSClientResolvedConfig | config} for command's `input` shape.
 *
 */
var ReceiveMessageCommand = /** @class */ (function (_super) {
    serdePlugin.__extends(ReceiveMessageCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ReceiveMessageCommand(input) {
        var _this = 
        // Start section: command_constructor
        _super.call(this) || this;
        _this.input = input;
        return _this;
        // End section: command_constructor
    }
    /**
     * @internal
     */
    ReceiveMessageCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(serdePlugin.getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getReceiveMessagePlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SQSClient";
        var commandName = "ReceiveMessageCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: exports.ReceiveMessageRequest.filterSensitiveLog,
            outputFilterSensitiveLog: exports.ReceiveMessageResult.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ReceiveMessageCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryReceiveMessageCommand(input, context);
    };
    ReceiveMessageCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryReceiveMessageCommand(output, context);
    };
    return ReceiveMessageCommand;
}(serdePlugin.Command));

/**
 * <p>Revokes any permissions in the queue policy that matches the specified <code>Label</code> parameter.</p>
 *          <note>
 *             <ul>
 *                <li>
 *                   <p>Only the owner of a queue can remove permissions from it.</p>
 *               </li>
 *                <li>
 *                   <p>Cross-account permissions don't apply to this action. For more information,
 * see <a href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-customer-managed-policy-examples.html#grant-cross-account-permissions-to-role-and-user-name">Grant
 * cross-account permissions to a role and a user name</a> in the <i>Amazon SQS Developer Guide</i>.</p>
 *               </li>
 *                <li>
 *                   <p>To remove the ability to change queue permissions, you must deny permission to the <code>AddPermission</code>, <code>RemovePermission</code>, and <code>SetQueueAttributes</code> actions in your IAM policy.</p>
 *               </li>
 *             </ul>
 *          </note>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SQSClient, RemovePermissionCommand } from "@aws-sdk/client-sqs"; // ES Modules import
 * // const { SQSClient, RemovePermissionCommand } = require("@aws-sdk/client-sqs"); // CommonJS import
 * const client = new SQSClient(config);
 * const command = new RemovePermissionCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link RemovePermissionCommandInput} for command's `input` shape.
 * @see {@link RemovePermissionCommandOutput} for command's `response` shape.
 * @see {@link SQSClientResolvedConfig | config} for command's `input` shape.
 *
 */
var RemovePermissionCommand = /** @class */ (function (_super) {
    serdePlugin.__extends(RemovePermissionCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function RemovePermissionCommand(input) {
        var _this = 
        // Start section: command_constructor
        _super.call(this) || this;
        _this.input = input;
        return _this;
        // End section: command_constructor
    }
    /**
     * @internal
     */
    RemovePermissionCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(serdePlugin.getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SQSClient";
        var commandName = "RemovePermissionCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: exports.RemovePermissionRequest.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    RemovePermissionCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryRemovePermissionCommand(input, context);
    };
    RemovePermissionCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryRemovePermissionCommand(output, context);
    };
    return RemovePermissionCommand;
}(serdePlugin.Command));

/**
 * <p>Delivers up to ten messages to the specified queue. This is a batch version of <code>
 *                <a>SendMessage</a>.</code> For a FIFO queue, multiple messages within a single batch are enqueued in the order they are sent.</p>
 *          <p>The result of sending each message is reported individually in the response. Because the batch request can result in a combination of successful and unsuccessful actions, you should check for batch errors even when the call returns an HTTP status code of <code>200</code>.</p>
 *          <p>The maximum allowed individual message size and the maximum total payload size (the sum of the individual lengths of all of the batched messages) are both 256 KB (262,144 bytes).</p>
 *          <important>
 *            <p>A message can include only XML, JSON, and unformatted text. The following Unicode characters are allowed:</p>
 *            <p>
 *                <code>#x9</code> | <code>#xA</code> | <code>#xD</code> | <code>#x20</code> to <code>#xD7FF</code> | <code>#xE000</code> to <code>#xFFFD</code> | <code>#x10000</code> to <code>#x10FFFF</code>
 *             </p>
 * 	           <p>Any characters not included in this list will be rejected. For more information, see the <a href="http://www.w3.org/TR/REC-xml/#charsets">W3C specification for characters</a>.</p>
 *          </important>
 *          <p>If you don't specify the <code>DelaySeconds</code> parameter for an entry, Amazon SQS uses the default value for the queue.</p>
 *          <p>Some actions take lists of parameters. These lists are specified using the <code>param.n</code> notation. Values of <code>n</code> are integers starting from 1. For example, a parameter list with two elements looks like this:</p>
 *          <p>
 *             <code>&AttributeName.1=first</code>
 *          </p>
 *          <p>
 *             <code>&AttributeName.2=second</code>
 *          </p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SQSClient, SendMessageBatchCommand } from "@aws-sdk/client-sqs"; // ES Modules import
 * // const { SQSClient, SendMessageBatchCommand } = require("@aws-sdk/client-sqs"); // CommonJS import
 * const client = new SQSClient(config);
 * const command = new SendMessageBatchCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link SendMessageBatchCommandInput} for command's `input` shape.
 * @see {@link SendMessageBatchCommandOutput} for command's `response` shape.
 * @see {@link SQSClientResolvedConfig | config} for command's `input` shape.
 *
 */
var SendMessageBatchCommand = /** @class */ (function (_super) {
    serdePlugin.__extends(SendMessageBatchCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function SendMessageBatchCommand(input) {
        var _this = 
        // Start section: command_constructor
        _super.call(this) || this;
        _this.input = input;
        return _this;
        // End section: command_constructor
    }
    /**
     * @internal
     */
    SendMessageBatchCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(serdePlugin.getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getSendMessageBatchPlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SQSClient";
        var commandName = "SendMessageBatchCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: exports.SendMessageBatchRequest.filterSensitiveLog,
            outputFilterSensitiveLog: exports.SendMessageBatchResult.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    SendMessageBatchCommand.prototype.serialize = function (input, context) {
        return serializeAws_querySendMessageBatchCommand(input, context);
    };
    SendMessageBatchCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_querySendMessageBatchCommand(output, context);
    };
    return SendMessageBatchCommand;
}(serdePlugin.Command));

/**
 * <p>Delivers a message to the specified queue.</p>
 *          <important>
 *            <p>A message can include only XML, JSON, and unformatted text. The following Unicode characters are allowed:</p>
 *            <p>
 *                <code>#x9</code> | <code>#xA</code> | <code>#xD</code> | <code>#x20</code> to <code>#xD7FF</code> | <code>#xE000</code> to <code>#xFFFD</code> | <code>#x10000</code> to <code>#x10FFFF</code>
 *             </p>
 * 	           <p>Any characters not included in this list will be rejected. For more information, see the <a href="http://www.w3.org/TR/REC-xml/#charsets">W3C specification for characters</a>.</p>
 *          </important>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs"; // ES Modules import
 * // const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs"); // CommonJS import
 * const client = new SQSClient(config);
 * const command = new SendMessageCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link SendMessageCommandInput} for command's `input` shape.
 * @see {@link SendMessageCommandOutput} for command's `response` shape.
 * @see {@link SQSClientResolvedConfig | config} for command's `input` shape.
 *
 */
var SendMessageCommand = /** @class */ (function (_super) {
    serdePlugin.__extends(SendMessageCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function SendMessageCommand(input) {
        var _this = 
        // Start section: command_constructor
        _super.call(this) || this;
        _this.input = input;
        return _this;
        // End section: command_constructor
    }
    /**
     * @internal
     */
    SendMessageCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(serdePlugin.getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getSendMessagePlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SQSClient";
        var commandName = "SendMessageCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: exports.SendMessageRequest.filterSensitiveLog,
            outputFilterSensitiveLog: exports.SendMessageResult.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    SendMessageCommand.prototype.serialize = function (input, context) {
        return serializeAws_querySendMessageCommand(input, context);
    };
    SendMessageCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_querySendMessageCommand(output, context);
    };
    return SendMessageCommand;
}(serdePlugin.Command));

/**
 * <p>Sets the value of one or more queue attributes. When you change a queue's attributes, the change can take up to 60 seconds for most of the attributes to propagate throughout the Amazon SQS system.
 *       Changes made to the <code>MessageRetentionPeriod</code> attribute can take up to 15 minutes.</p>
 *          <note>
 *             <ul>
 *                <li>
 *                   <p>In the future, new attributes might be added. If you write code that calls this action, we recommend that you structure your code so that it can handle new attributes gracefully.</p>
 *               </li>
 *                <li>
 *                   <p>Cross-account permissions don't apply to this action. For more information,
 * see <a href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-customer-managed-policy-examples.html#grant-cross-account-permissions-to-role-and-user-name">Grant
 * cross-account permissions to a role and a user name</a> in the <i>Amazon SQS Developer Guide</i>.</p>
 *               </li>
 *                <li>
 *                   <p>To remove the ability to change queue permissions, you must deny permission to the <code>AddPermission</code>, <code>RemovePermission</code>, and <code>SetQueueAttributes</code> actions in your IAM policy.</p>
 *               </li>
 *             </ul>
 *          </note>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SQSClient, SetQueueAttributesCommand } from "@aws-sdk/client-sqs"; // ES Modules import
 * // const { SQSClient, SetQueueAttributesCommand } = require("@aws-sdk/client-sqs"); // CommonJS import
 * const client = new SQSClient(config);
 * const command = new SetQueueAttributesCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link SetQueueAttributesCommandInput} for command's `input` shape.
 * @see {@link SetQueueAttributesCommandOutput} for command's `response` shape.
 * @see {@link SQSClientResolvedConfig | config} for command's `input` shape.
 *
 */
var SetQueueAttributesCommand = /** @class */ (function (_super) {
    serdePlugin.__extends(SetQueueAttributesCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function SetQueueAttributesCommand(input) {
        var _this = 
        // Start section: command_constructor
        _super.call(this) || this;
        _this.input = input;
        return _this;
        // End section: command_constructor
    }
    /**
     * @internal
     */
    SetQueueAttributesCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(serdePlugin.getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SQSClient";
        var commandName = "SetQueueAttributesCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: exports.SetQueueAttributesRequest.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    SetQueueAttributesCommand.prototype.serialize = function (input, context) {
        return serializeAws_querySetQueueAttributesCommand(input, context);
    };
    SetQueueAttributesCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_querySetQueueAttributesCommand(output, context);
    };
    return SetQueueAttributesCommand;
}(serdePlugin.Command));

/**
 * <p>Add cost allocation tags to the specified Amazon SQS queue. For an overview, see <a href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-queue-tags.html">Tagging
 * Your Amazon SQS Queues</a> in the <i>Amazon SQS Developer Guide</i>.</p>
 *
 *          <p>When you use queue tags, keep the following guidelines in mind:</p>
 *          <ul>
 *             <li>
 *                <p>Adding more than 50 tags to a queue isn't recommended.</p>
 *             </li>
 *             <li>
 *                <p>Tags don't have any semantic meaning. Amazon SQS interprets tags as character strings.</p>
 *             </li>
 *             <li>
 *                <p>Tags are case-sensitive.</p>
 *             </li>
 *             <li>
 *                <p>A new tag with a key identical to that of an existing tag overwrites the existing tag.</p>
 *             </li>
 *          </ul>
 *          <p>For a full list of tag restrictions, see
 * <a href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-limits.html#limits-queues">Quotas related to queues</a>
 * in the <i>Amazon SQS Developer Guide</i>.</p>
 *         <note>
 *             <p>Cross-account permissions don't apply to this action. For more information,
 * see <a href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-customer-managed-policy-examples.html#grant-cross-account-permissions-to-role-and-user-name">Grant
 * cross-account permissions to a role and a user name</a> in the <i>Amazon SQS Developer Guide</i>.</p>
 *         </note>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SQSClient, TagQueueCommand } from "@aws-sdk/client-sqs"; // ES Modules import
 * // const { SQSClient, TagQueueCommand } = require("@aws-sdk/client-sqs"); // CommonJS import
 * const client = new SQSClient(config);
 * const command = new TagQueueCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link TagQueueCommandInput} for command's `input` shape.
 * @see {@link TagQueueCommandOutput} for command's `response` shape.
 * @see {@link SQSClientResolvedConfig | config} for command's `input` shape.
 *
 */
var TagQueueCommand = /** @class */ (function (_super) {
    serdePlugin.__extends(TagQueueCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function TagQueueCommand(input) {
        var _this = 
        // Start section: command_constructor
        _super.call(this) || this;
        _this.input = input;
        return _this;
        // End section: command_constructor
    }
    /**
     * @internal
     */
    TagQueueCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(serdePlugin.getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SQSClient";
        var commandName = "TagQueueCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: exports.TagQueueRequest.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    TagQueueCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryTagQueueCommand(input, context);
    };
    TagQueueCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryTagQueueCommand(output, context);
    };
    return TagQueueCommand;
}(serdePlugin.Command));

/**
 * <p>Remove cost allocation tags from the specified Amazon SQS queue. For an overview, see <a href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-queue-tags.html">Tagging
 * Your Amazon SQS Queues</a> in the <i>Amazon SQS Developer Guide</i>.</p>
 *         <note>
 *             <p>Cross-account permissions don't apply to this action. For more information,
 * see <a href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-customer-managed-policy-examples.html#grant-cross-account-permissions-to-role-and-user-name">Grant
 * cross-account permissions to a role and a user name</a> in the <i>Amazon SQS Developer Guide</i>.</p>
 *         </note>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SQSClient, UntagQueueCommand } from "@aws-sdk/client-sqs"; // ES Modules import
 * // const { SQSClient, UntagQueueCommand } = require("@aws-sdk/client-sqs"); // CommonJS import
 * const client = new SQSClient(config);
 * const command = new UntagQueueCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link UntagQueueCommandInput} for command's `input` shape.
 * @see {@link UntagQueueCommandOutput} for command's `response` shape.
 * @see {@link SQSClientResolvedConfig | config} for command's `input` shape.
 *
 */
var UntagQueueCommand = /** @class */ (function (_super) {
    serdePlugin.__extends(UntagQueueCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function UntagQueueCommand(input) {
        var _this = 
        // Start section: command_constructor
        _super.call(this) || this;
        _this.input = input;
        return _this;
        // End section: command_constructor
    }
    /**
     * @internal
     */
    UntagQueueCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(serdePlugin.getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SQSClient";
        var commandName = "UntagQueueCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: exports.UntagQueueRequest.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    UntagQueueCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryUntagQueueCommand(input, context);
    };
    UntagQueueCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryUntagQueueCommand(output, context);
    };
    return UntagQueueCommand;
}(serdePlugin.Command));

/**
 * <p>Welcome to the <i>Amazon SQS API Reference</i>.</p>
 *         <p>Amazon SQS is a reliable, highly-scalable hosted queue for storing messages as they travel between applications or microservices. Amazon SQS moves data between distributed application components and helps you decouple these components.</p>
 *         <p>For information on the permissions you need to use this API, see
 *             <a href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-authentication-and-access-control.html">Identity and
 *             access management</a> in the <i>Amazon SQS Developer Guide.</i>
 *          </p>
 *         <p>You can use <a href="http://aws.amazon.com/tools/#sdk">Amazon Web Services SDKs</a> to access Amazon SQS using your favorite programming language. The SDKs perform tasks such as the following automatically:</p>
 *         <ul>
 *             <li>
 *                 <p>Cryptographically sign your service requests</p>
 *             </li>
 *             <li>
 *                 <p>Retry requests</p>
 *             </li>
 *             <li>
 *                 <p>Handle error responses</p>
 *             </li>
 *          </ul>
 *
 *         <p>
 *             <b>Additional information</b>
 *          </p>
 *         <ul>
 *             <li>
 *                 <p>
 *                     <a href="http://aws.amazon.com/sqs/">Amazon SQS Product Page</a>
 *                 </p>
 *             </li>
 *             <li>
 *                 <p>
 *                   <i>Amazon SQS Developer Guide</i>
 *                </p>
 *                 <ul>
 *                   <li>
 *                      <p>
 *                         <a href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-making-api-requests.html">Making API Requests</a>
 *                      </p>
 *                   </li>
 *                   <li>
 *                      <p>
 *                         <a href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-metadata.html#sqs-message-attributes">Amazon SQS Message Attributes</a>
 *                      </p>
 *                   </li>
 *                   <li>
 *                      <p>
 *                         <a href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html">Amazon SQS Dead-Letter Queues</a>
 *                      </p>
 *                   </li>
 *                </ul>
 *             </li>
 *             <li>
 *                 <p>
 *                   <a href="http://docs.aws.amazon.com/cli/latest/reference/sqs/index.html">Amazon SQS in the <i>Command Line Interface</i>
 *                   </a>
 *                </p>
 *             </li>
 *             <li>
 *                 <p>
 *                   <i>Amazon Web Services General Reference</i>
 *                </p>
 *                 <ul>
 *                   <li>
 *                      <p>
 *                         <a href="https://docs.aws.amazon.com/general/latest/gr/rande.html#sqs_region">Regions and Endpoints</a>
 *                      </p>
 *                   </li>
 *                </ul>
 *             </li>
 *          </ul>
 */
var SQS = /** @class */ (function (_super) {
    serdePlugin.__extends(SQS, _super);
    function SQS() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SQS.prototype.addPermission = function (args, optionsOrCb, cb) {
        var command = new AddPermissionCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    SQS.prototype.changeMessageVisibility = function (args, optionsOrCb, cb) {
        var command = new ChangeMessageVisibilityCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    SQS.prototype.changeMessageVisibilityBatch = function (args, optionsOrCb, cb) {
        var command = new ChangeMessageVisibilityBatchCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    SQS.prototype.createQueue = function (args, optionsOrCb, cb) {
        var command = new CreateQueueCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    SQS.prototype.deleteMessage = function (args, optionsOrCb, cb) {
        var command = new DeleteMessageCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    SQS.prototype.deleteMessageBatch = function (args, optionsOrCb, cb) {
        var command = new DeleteMessageBatchCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    SQS.prototype.deleteQueue = function (args, optionsOrCb, cb) {
        var command = new DeleteQueueCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    SQS.prototype.getQueueAttributes = function (args, optionsOrCb, cb) {
        var command = new GetQueueAttributesCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    SQS.prototype.getQueueUrl = function (args, optionsOrCb, cb) {
        var command = new GetQueueUrlCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    SQS.prototype.listDeadLetterSourceQueues = function (args, optionsOrCb, cb) {
        var command = new ListDeadLetterSourceQueuesCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    SQS.prototype.listQueues = function (args, optionsOrCb, cb) {
        var command = new ListQueuesCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    SQS.prototype.listQueueTags = function (args, optionsOrCb, cb) {
        var command = new ListQueueTagsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    SQS.prototype.purgeQueue = function (args, optionsOrCb, cb) {
        var command = new PurgeQueueCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    SQS.prototype.receiveMessage = function (args, optionsOrCb, cb) {
        var command = new ReceiveMessageCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    SQS.prototype.removePermission = function (args, optionsOrCb, cb) {
        var command = new RemovePermissionCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    SQS.prototype.sendMessage = function (args, optionsOrCb, cb) {
        var command = new SendMessageCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    SQS.prototype.sendMessageBatch = function (args, optionsOrCb, cb) {
        var command = new SendMessageBatchCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    SQS.prototype.setQueueAttributes = function (args, optionsOrCb, cb) {
        var command = new SetQueueAttributesCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    SQS.prototype.tagQueue = function (args, optionsOrCb, cb) {
        var command = new TagQueueCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    SQS.prototype.untagQueue = function (args, optionsOrCb, cb) {
        var command = new UntagQueueCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    return SQS;
}(SQSClient));

/**
 * @private
 */
var makePagedClientRequest$1 = function (client, input) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
        return serdePlugin.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.send.apply(client, serdePlugin.__spreadArray([new ListDeadLetterSourceQueuesCommand(input)], serdePlugin.__read(args)))];
                case 1: 
                // @ts-ignore
                return [2 /*return*/, _a.sent()];
            }
        });
    });
};
/**
 * @private
 */
var makePagedRequest$1 = function (client, input) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
        return serdePlugin.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.listDeadLetterSourceQueues.apply(client, serdePlugin.__spreadArray([input], serdePlugin.__read(args)))];
                case 1: 
                // @ts-ignore
                return [2 /*return*/, _a.sent()];
            }
        });
    });
};
function paginateListDeadLetterSourceQueues(config, input) {
    var additionalArguments = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        additionalArguments[_i - 2] = arguments[_i];
    }
    return serdePlugin.__asyncGenerator(this, arguments, function paginateListDeadLetterSourceQueues_1() {
        var token, hasNext, page;
        return serdePlugin.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = config.startingToken || undefined;
                    hasNext = true;
                    _a.label = 1;
                case 1:
                    if (!hasNext) return [3 /*break*/, 9];
                    input.NextToken = token;
                    input["MaxResults"] = config.pageSize;
                    if (!(config.client instanceof SQS)) return [3 /*break*/, 3];
                    return [4 /*yield*/, serdePlugin.__await(makePagedRequest$1.apply(void 0, serdePlugin.__spreadArray([config.client, input], serdePlugin.__read(additionalArguments))))];
                case 2:
                    page = _a.sent();
                    return [3 /*break*/, 6];
                case 3:
                    if (!(config.client instanceof SQSClient)) return [3 /*break*/, 5];
                    return [4 /*yield*/, serdePlugin.__await(makePagedClientRequest$1.apply(void 0, serdePlugin.__spreadArray([config.client, input], serdePlugin.__read(additionalArguments))))];
                case 4:
                    page = _a.sent();
                    return [3 /*break*/, 6];
                case 5: throw new Error("Invalid client, expected SQS | SQSClient");
                case 6: return [4 /*yield*/, serdePlugin.__await(page)];
                case 7: return [4 /*yield*/, _a.sent()];
                case 8:
                    _a.sent();
                    token = page.NextToken;
                    hasNext = !!token;
                    return [3 /*break*/, 1];
                case 9: return [4 /*yield*/, serdePlugin.__await(undefined)];
                case 10: 
                // @ts-ignore
                return [2 /*return*/, _a.sent()];
            }
        });
    });
}

/**
 * @private
 */
var makePagedClientRequest = function (client, input) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
        return serdePlugin.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.send.apply(client, serdePlugin.__spreadArray([new ListQueuesCommand(input)], serdePlugin.__read(args)))];
                case 1: 
                // @ts-ignore
                return [2 /*return*/, _a.sent()];
            }
        });
    });
};
/**
 * @private
 */
var makePagedRequest = function (client, input) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
        return serdePlugin.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.listQueues.apply(client, serdePlugin.__spreadArray([input], serdePlugin.__read(args)))];
                case 1: 
                // @ts-ignore
                return [2 /*return*/, _a.sent()];
            }
        });
    });
};
function paginateListQueues(config, input) {
    var additionalArguments = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        additionalArguments[_i - 2] = arguments[_i];
    }
    return serdePlugin.__asyncGenerator(this, arguments, function paginateListQueues_1() {
        var token, hasNext, page;
        return serdePlugin.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = config.startingToken || undefined;
                    hasNext = true;
                    _a.label = 1;
                case 1:
                    if (!hasNext) return [3 /*break*/, 9];
                    input.NextToken = token;
                    input["MaxResults"] = config.pageSize;
                    if (!(config.client instanceof SQS)) return [3 /*break*/, 3];
                    return [4 /*yield*/, serdePlugin.__await(makePagedRequest.apply(void 0, serdePlugin.__spreadArray([config.client, input], serdePlugin.__read(additionalArguments))))];
                case 2:
                    page = _a.sent();
                    return [3 /*break*/, 6];
                case 3:
                    if (!(config.client instanceof SQSClient)) return [3 /*break*/, 5];
                    return [4 /*yield*/, serdePlugin.__await(makePagedClientRequest.apply(void 0, serdePlugin.__spreadArray([config.client, input], serdePlugin.__read(additionalArguments))))];
                case 4:
                    page = _a.sent();
                    return [3 /*break*/, 6];
                case 5: throw new Error("Invalid client, expected SQS | SQSClient");
                case 6: return [4 /*yield*/, serdePlugin.__await(page)];
                case 7: return [4 /*yield*/, _a.sent()];
                case 8:
                    _a.sent();
                    token = page.NextToken;
                    hasNext = !!token;
                    return [3 /*break*/, 1];
                case 9: return [4 /*yield*/, serdePlugin.__await(undefined)];
                case 10: 
                // @ts-ignore
                return [2 /*return*/, _a.sent()];
            }
        });
    });
}

exports.AddPermissionCommand = AddPermissionCommand;
exports.ChangeMessageVisibilityBatchCommand = ChangeMessageVisibilityBatchCommand;
exports.ChangeMessageVisibilityCommand = ChangeMessageVisibilityCommand;
exports.CreateQueueCommand = CreateQueueCommand;
exports.DeleteMessageBatchCommand = DeleteMessageBatchCommand;
exports.DeleteMessageCommand = DeleteMessageCommand;
exports.DeleteQueueCommand = DeleteQueueCommand;
exports.GetQueueAttributesCommand = GetQueueAttributesCommand;
exports.GetQueueUrlCommand = GetQueueUrlCommand;
exports.ListDeadLetterSourceQueuesCommand = ListDeadLetterSourceQueuesCommand;
exports.ListQueueTagsCommand = ListQueueTagsCommand;
exports.ListQueuesCommand = ListQueuesCommand;
exports.PurgeQueueCommand = PurgeQueueCommand;
exports.ReceiveMessageCommand = ReceiveMessageCommand;
exports.RemovePermissionCommand = RemovePermissionCommand;
exports.SQS = SQS;
exports.SQSClient = SQSClient;
exports.SendMessageBatchCommand = SendMessageBatchCommand;
exports.SendMessageCommand = SendMessageCommand;
exports.SetQueueAttributesCommand = SetQueueAttributesCommand;
exports.TagQueueCommand = TagQueueCommand;
exports.UntagQueueCommand = UntagQueueCommand;
exports.paginateListDeadLetterSourceQueues = paginateListDeadLetterSourceQueues;
exports.paginateListQueues = paginateListQueues;
