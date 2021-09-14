'use strict';

var serdePlugin = require('./serdePlugin-281f3123.js');
var Url = require('url');
var buffer = require('buffer');
var http = require('http');
var fs = require('fs');
var os = require('os');
var path = require('path');
var crypto = require('crypto');
var https = require('https');
var Stream = require('stream');
require('http2');
var process$1 = require('process');
var child_process = require('child_process');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var crypto__default = /*#__PURE__*/_interopDefaultLegacy(crypto);

var name$1 = "@aws-sdk/client-sts";
var description$1 = "AWS SDK for JavaScript Sts Client for Node.js, Browser and React Native";
var version$1 = "3.27.0";
var scripts$1 = {
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
var main$1 = "./dist/cjs/index.js";
var types$1 = "./dist/types/index.d.ts";
var module$2 = "./dist/es/index.js";
var browser$1 = {
	"./runtimeConfig": "./runtimeConfig.browser"
};
var sideEffects$1 = false;
var dependencies$1 = {
	"@aws-crypto/sha256-browser": "^1.0.0",
	"@aws-crypto/sha256-js": "^1.0.0",
	"@aws-sdk/config-resolver": "3.27.0",
	"@aws-sdk/credential-provider-node": "3.27.0",
	"@aws-sdk/fetch-http-handler": "3.25.0",
	"@aws-sdk/hash-node": "3.25.0",
	"@aws-sdk/invalid-dependency": "3.25.0",
	"@aws-sdk/middleware-content-length": "3.25.0",
	"@aws-sdk/middleware-host-header": "3.25.0",
	"@aws-sdk/middleware-logger": "3.25.0",
	"@aws-sdk/middleware-retry": "3.27.0",
	"@aws-sdk/middleware-sdk-sts": "3.27.0",
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
var devDependencies$1 = {
	"@aws-sdk/client-documentation-generator": "3.23.0",
	"@types/node": "^12.7.5",
	"downlevel-dts": "0.7.0",
	jest: "^26.1.0",
	rimraf: "^3.0.0",
	"ts-jest": "^26.4.1",
	typedoc: "^0.19.2",
	typescript: "~4.3.2"
};
var engines$1 = {
	node: ">=10.0.0"
};
var typesVersions$1 = {
	"<4.0": {
		"dist/types/*": [
			"dist/types/ts3.4/*"
		]
	}
};
var author$1 = {
	name: "AWS SDK for JavaScript Team",
	url: "https://aws.amazon.com/javascript/"
};
var license$1 = "Apache-2.0";
var homepage$1 = "https://github.com/aws/aws-sdk-js-v3/tree/main/clients/client-sts";
var repository$1 = {
	type: "git",
	url: "https://github.com/aws/aws-sdk-js-v3.git",
	directory: "clients/client-sts"
};
var packageInfo$1 = {
	name: name$1,
	description: description$1,
	version: version$1,
	scripts: scripts$1,
	main: main$1,
	types: types$1,
	module: module$2,
	browser: browser$1,
	"react-native": {
	"./runtimeConfig": "./runtimeConfig.native"
},
	sideEffects: sideEffects$1,
	dependencies: dependencies$1,
	devDependencies: devDependencies$1,
	engines: engines$1,
	typesVersions: typesVersions$1,
	author: author$1,
	license: license$1,
	homepage: homepage$1,
	repository: repository$1
};

var AssumedRoleUser;
(function (AssumedRoleUser) {
    /**
     * @internal
     */
    AssumedRoleUser.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(AssumedRoleUser || (AssumedRoleUser = {}));
var PolicyDescriptorType;
(function (PolicyDescriptorType) {
    /**
     * @internal
     */
    PolicyDescriptorType.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(PolicyDescriptorType || (PolicyDescriptorType = {}));
var Tag;
(function (Tag) {
    /**
     * @internal
     */
    Tag.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(Tag || (Tag = {}));
var AssumeRoleRequest;
(function (AssumeRoleRequest) {
    /**
     * @internal
     */
    AssumeRoleRequest.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(AssumeRoleRequest || (AssumeRoleRequest = {}));
var Credentials;
(function (Credentials) {
    /**
     * @internal
     */
    Credentials.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(Credentials || (Credentials = {}));
var AssumeRoleResponse;
(function (AssumeRoleResponse) {
    /**
     * @internal
     */
    AssumeRoleResponse.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(AssumeRoleResponse || (AssumeRoleResponse = {}));
var ExpiredTokenException;
(function (ExpiredTokenException) {
    /**
     * @internal
     */
    ExpiredTokenException.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(ExpiredTokenException || (ExpiredTokenException = {}));
var MalformedPolicyDocumentException;
(function (MalformedPolicyDocumentException) {
    /**
     * @internal
     */
    MalformedPolicyDocumentException.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(MalformedPolicyDocumentException || (MalformedPolicyDocumentException = {}));
var PackedPolicyTooLargeException;
(function (PackedPolicyTooLargeException) {
    /**
     * @internal
     */
    PackedPolicyTooLargeException.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(PackedPolicyTooLargeException || (PackedPolicyTooLargeException = {}));
var RegionDisabledException;
(function (RegionDisabledException) {
    /**
     * @internal
     */
    RegionDisabledException.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(RegionDisabledException || (RegionDisabledException = {}));
var AssumeRoleWithSAMLRequest;
(function (AssumeRoleWithSAMLRequest) {
    /**
     * @internal
     */
    AssumeRoleWithSAMLRequest.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(AssumeRoleWithSAMLRequest || (AssumeRoleWithSAMLRequest = {}));
var AssumeRoleWithSAMLResponse;
(function (AssumeRoleWithSAMLResponse) {
    /**
     * @internal
     */
    AssumeRoleWithSAMLResponse.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(AssumeRoleWithSAMLResponse || (AssumeRoleWithSAMLResponse = {}));
var IDPRejectedClaimException;
(function (IDPRejectedClaimException) {
    /**
     * @internal
     */
    IDPRejectedClaimException.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(IDPRejectedClaimException || (IDPRejectedClaimException = {}));
var InvalidIdentityTokenException;
(function (InvalidIdentityTokenException) {
    /**
     * @internal
     */
    InvalidIdentityTokenException.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(InvalidIdentityTokenException || (InvalidIdentityTokenException = {}));
var AssumeRoleWithWebIdentityRequest;
(function (AssumeRoleWithWebIdentityRequest) {
    /**
     * @internal
     */
    AssumeRoleWithWebIdentityRequest.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(AssumeRoleWithWebIdentityRequest || (AssumeRoleWithWebIdentityRequest = {}));
var AssumeRoleWithWebIdentityResponse;
(function (AssumeRoleWithWebIdentityResponse) {
    /**
     * @internal
     */
    AssumeRoleWithWebIdentityResponse.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(AssumeRoleWithWebIdentityResponse || (AssumeRoleWithWebIdentityResponse = {}));
var IDPCommunicationErrorException;
(function (IDPCommunicationErrorException) {
    /**
     * @internal
     */
    IDPCommunicationErrorException.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(IDPCommunicationErrorException || (IDPCommunicationErrorException = {}));
var DecodeAuthorizationMessageRequest;
(function (DecodeAuthorizationMessageRequest) {
    /**
     * @internal
     */
    DecodeAuthorizationMessageRequest.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(DecodeAuthorizationMessageRequest || (DecodeAuthorizationMessageRequest = {}));
var DecodeAuthorizationMessageResponse;
(function (DecodeAuthorizationMessageResponse) {
    /**
     * @internal
     */
    DecodeAuthorizationMessageResponse.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(DecodeAuthorizationMessageResponse || (DecodeAuthorizationMessageResponse = {}));
var InvalidAuthorizationMessageException;
(function (InvalidAuthorizationMessageException) {
    /**
     * @internal
     */
    InvalidAuthorizationMessageException.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(InvalidAuthorizationMessageException || (InvalidAuthorizationMessageException = {}));
var GetAccessKeyInfoRequest;
(function (GetAccessKeyInfoRequest) {
    /**
     * @internal
     */
    GetAccessKeyInfoRequest.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(GetAccessKeyInfoRequest || (GetAccessKeyInfoRequest = {}));
var GetAccessKeyInfoResponse;
(function (GetAccessKeyInfoResponse) {
    /**
     * @internal
     */
    GetAccessKeyInfoResponse.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(GetAccessKeyInfoResponse || (GetAccessKeyInfoResponse = {}));
var GetCallerIdentityRequest;
(function (GetCallerIdentityRequest) {
    /**
     * @internal
     */
    GetCallerIdentityRequest.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(GetCallerIdentityRequest || (GetCallerIdentityRequest = {}));
var GetCallerIdentityResponse;
(function (GetCallerIdentityResponse) {
    /**
     * @internal
     */
    GetCallerIdentityResponse.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(GetCallerIdentityResponse || (GetCallerIdentityResponse = {}));
var GetFederationTokenRequest;
(function (GetFederationTokenRequest) {
    /**
     * @internal
     */
    GetFederationTokenRequest.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(GetFederationTokenRequest || (GetFederationTokenRequest = {}));
var FederatedUser;
(function (FederatedUser) {
    /**
     * @internal
     */
    FederatedUser.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(FederatedUser || (FederatedUser = {}));
var GetFederationTokenResponse;
(function (GetFederationTokenResponse) {
    /**
     * @internal
     */
    GetFederationTokenResponse.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(GetFederationTokenResponse || (GetFederationTokenResponse = {}));
var GetSessionTokenRequest;
(function (GetSessionTokenRequest) {
    /**
     * @internal
     */
    GetSessionTokenRequest.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(GetSessionTokenRequest || (GetSessionTokenRequest = {}));
var GetSessionTokenResponse;
(function (GetSessionTokenResponse) {
    /**
     * @internal
     */
    GetSessionTokenResponse.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(GetSessionTokenResponse || (GetSessionTokenResponse = {}));

// Stores whether the warning was already emitted.
var warningEmitted = false;
/**
 * Emits warning if the provided Node.js version string is pending deprecation.
 *
 * @param {string} version - The Node.js version string.
 */
var emitWarningIfUnsupportedVersion = function (version) {
    if (version && !warningEmitted && parseInt(version.substring(1, version.indexOf("."))) < 12) {
        warningEmitted = true;
        process.emitWarning("The AWS SDK for JavaScript (v3) will\n" +
            ("no longer support Node.js " + version + " as of January 1, 2022.\n") +
            "To continue receiving updates to AWS services, bug fixes, and security\n" +
            "updates please upgrade to Node.js 12.x or later.\n\n" +
            "More information can be found at: https://a.co/1l6FLnu", "NodeDeprecationWarning");
    }
};

var serializeAws_queryAssumeRoleCommand = function (input, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return serdePlugin.__generator(this, function (_a) {
        headers = {
            "content-type": "application/x-www-form-urlencoded",
        };
        body = buildFormUrlencodedString(serdePlugin.__assign(serdePlugin.__assign({}, serializeAws_queryAssumeRoleRequest(input, context)), { Action: "AssumeRole", Version: "2011-06-15" }));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
var serializeAws_queryAssumeRoleWithWebIdentityCommand = function (input, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return serdePlugin.__generator(this, function (_a) {
        headers = {
            "content-type": "application/x-www-form-urlencoded",
        };
        body = buildFormUrlencodedString(serdePlugin.__assign(serdePlugin.__assign({}, serializeAws_queryAssumeRoleWithWebIdentityRequest(input, context)), { Action: "AssumeRoleWithWebIdentity", Version: "2011-06-15" }));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
var deserializeAws_queryAssumeRoleCommand = function (output, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return serdePlugin.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_queryAssumeRoleCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody$1(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_queryAssumeRoleResponse(data.AssumeRoleResult, context);
                response = serdePlugin.__assign({ $metadata: deserializeMetadata$1(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_queryAssumeRoleCommandError = function (output, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, _e, _f, parsedBody, message;
    var _g;
    return serdePlugin.__generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                _a = [serdePlugin.__assign({}, output)];
                _g = {};
                return [4 /*yield*/, parseBody$1(output.body, context)];
            case 1:
                parsedOutput = serdePlugin.__assign.apply(void 0, _a.concat([(_g.body = _h.sent(), _g)]));
                errorCode = "UnknownError";
                errorCode = loadQueryErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "ExpiredTokenException": return [3 /*break*/, 2];
                    case "com.amazonaws.sts#ExpiredTokenException": return [3 /*break*/, 2];
                    case "MalformedPolicyDocumentException": return [3 /*break*/, 4];
                    case "com.amazonaws.sts#MalformedPolicyDocumentException": return [3 /*break*/, 4];
                    case "PackedPolicyTooLargeException": return [3 /*break*/, 6];
                    case "com.amazonaws.sts#PackedPolicyTooLargeException": return [3 /*break*/, 6];
                    case "RegionDisabledException": return [3 /*break*/, 8];
                    case "com.amazonaws.sts#RegionDisabledException": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_queryExpiredTokenExceptionResponse(parsedOutput, context)];
            case 3:
                response = serdePlugin.__assign.apply(void 0, [serdePlugin.__assign.apply(void 0, _c.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata$1(output) }]);
                return [3 /*break*/, 11];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_queryMalformedPolicyDocumentExceptionResponse(parsedOutput, context)];
            case 5:
                response = serdePlugin.__assign.apply(void 0, [serdePlugin.__assign.apply(void 0, _d.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata$1(output) }]);
                return [3 /*break*/, 11];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_queryPackedPolicyTooLargeExceptionResponse(parsedOutput, context)];
            case 7:
                response = serdePlugin.__assign.apply(void 0, [serdePlugin.__assign.apply(void 0, _e.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata$1(output) }]);
                return [3 /*break*/, 11];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_queryRegionDisabledExceptionResponse(parsedOutput, context)];
            case 9:
                response = serdePlugin.__assign.apply(void 0, [serdePlugin.__assign.apply(void 0, _f.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata$1(output) }]);
                return [3 /*break*/, 11];
            case 10:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.Error.code || parsedBody.Error.Code || errorCode;
                response = serdePlugin.__assign(serdePlugin.__assign({}, parsedBody.Error), { name: "" + errorCode, message: parsedBody.Error.message || parsedBody.Error.Message || errorCode, $fault: "client", $metadata: deserializeMetadata$1(output) });
                _h.label = 11;
            case 11:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
var deserializeAws_queryAssumeRoleWithWebIdentityCommand = function (output, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return serdePlugin.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_queryAssumeRoleWithWebIdentityCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody$1(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_queryAssumeRoleWithWebIdentityResponse(data.AssumeRoleWithWebIdentityResult, context);
                response = serdePlugin.__assign({ $metadata: deserializeMetadata$1(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_queryAssumeRoleWithWebIdentityCommandError = function (output, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, _e, _f, _g, _h, _j, parsedBody, message;
    var _k;
    return serdePlugin.__generator(this, function (_l) {
        switch (_l.label) {
            case 0:
                _a = [serdePlugin.__assign({}, output)];
                _k = {};
                return [4 /*yield*/, parseBody$1(output.body, context)];
            case 1:
                parsedOutput = serdePlugin.__assign.apply(void 0, _a.concat([(_k.body = _l.sent(), _k)]));
                errorCode = "UnknownError";
                errorCode = loadQueryErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "ExpiredTokenException": return [3 /*break*/, 2];
                    case "com.amazonaws.sts#ExpiredTokenException": return [3 /*break*/, 2];
                    case "IDPCommunicationErrorException": return [3 /*break*/, 4];
                    case "com.amazonaws.sts#IDPCommunicationErrorException": return [3 /*break*/, 4];
                    case "IDPRejectedClaimException": return [3 /*break*/, 6];
                    case "com.amazonaws.sts#IDPRejectedClaimException": return [3 /*break*/, 6];
                    case "InvalidIdentityTokenException": return [3 /*break*/, 8];
                    case "com.amazonaws.sts#InvalidIdentityTokenException": return [3 /*break*/, 8];
                    case "MalformedPolicyDocumentException": return [3 /*break*/, 10];
                    case "com.amazonaws.sts#MalformedPolicyDocumentException": return [3 /*break*/, 10];
                    case "PackedPolicyTooLargeException": return [3 /*break*/, 12];
                    case "com.amazonaws.sts#PackedPolicyTooLargeException": return [3 /*break*/, 12];
                    case "RegionDisabledException": return [3 /*break*/, 14];
                    case "com.amazonaws.sts#RegionDisabledException": return [3 /*break*/, 14];
                }
                return [3 /*break*/, 16];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_queryExpiredTokenExceptionResponse(parsedOutput, context)];
            case 3:
                response = serdePlugin.__assign.apply(void 0, [serdePlugin.__assign.apply(void 0, _c.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata$1(output) }]);
                return [3 /*break*/, 17];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_queryIDPCommunicationErrorExceptionResponse(parsedOutput, context)];
            case 5:
                response = serdePlugin.__assign.apply(void 0, [serdePlugin.__assign.apply(void 0, _d.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata$1(output) }]);
                return [3 /*break*/, 17];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_queryIDPRejectedClaimExceptionResponse(parsedOutput, context)];
            case 7:
                response = serdePlugin.__assign.apply(void 0, [serdePlugin.__assign.apply(void 0, _e.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata$1(output) }]);
                return [3 /*break*/, 17];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_queryInvalidIdentityTokenExceptionResponse(parsedOutput, context)];
            case 9:
                response = serdePlugin.__assign.apply(void 0, [serdePlugin.__assign.apply(void 0, _f.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata$1(output) }]);
                return [3 /*break*/, 17];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_queryMalformedPolicyDocumentExceptionResponse(parsedOutput, context)];
            case 11:
                response = serdePlugin.__assign.apply(void 0, [serdePlugin.__assign.apply(void 0, _g.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata$1(output) }]);
                return [3 /*break*/, 17];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_queryPackedPolicyTooLargeExceptionResponse(parsedOutput, context)];
            case 13:
                response = serdePlugin.__assign.apply(void 0, [serdePlugin.__assign.apply(void 0, _h.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata$1(output) }]);
                return [3 /*break*/, 17];
            case 14:
                _j = [{}];
                return [4 /*yield*/, deserializeAws_queryRegionDisabledExceptionResponse(parsedOutput, context)];
            case 15:
                response = serdePlugin.__assign.apply(void 0, [serdePlugin.__assign.apply(void 0, _j.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata$1(output) }]);
                return [3 /*break*/, 17];
            case 16:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.Error.code || parsedBody.Error.Code || errorCode;
                response = serdePlugin.__assign(serdePlugin.__assign({}, parsedBody.Error), { name: "" + errorCode, message: parsedBody.Error.message || parsedBody.Error.Message || errorCode, $fault: "client", $metadata: deserializeMetadata$1(output) });
                _l.label = 17;
            case 17:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
var deserializeAws_queryExpiredTokenExceptionResponse = function (parsedOutput, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return serdePlugin.__generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_queryExpiredTokenException(body.Error, context);
        contents = serdePlugin.__assign({ name: "ExpiredTokenException", $fault: "client", $metadata: deserializeMetadata$1(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_queryIDPCommunicationErrorExceptionResponse = function (parsedOutput, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return serdePlugin.__generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_queryIDPCommunicationErrorException(body.Error, context);
        contents = serdePlugin.__assign({ name: "IDPCommunicationErrorException", $fault: "client", $metadata: deserializeMetadata$1(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_queryIDPRejectedClaimExceptionResponse = function (parsedOutput, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return serdePlugin.__generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_queryIDPRejectedClaimException(body.Error, context);
        contents = serdePlugin.__assign({ name: "IDPRejectedClaimException", $fault: "client", $metadata: deserializeMetadata$1(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_queryInvalidIdentityTokenExceptionResponse = function (parsedOutput, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return serdePlugin.__generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_queryInvalidIdentityTokenException(body.Error, context);
        contents = serdePlugin.__assign({ name: "InvalidIdentityTokenException", $fault: "client", $metadata: deserializeMetadata$1(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_queryMalformedPolicyDocumentExceptionResponse = function (parsedOutput, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return serdePlugin.__generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_queryMalformedPolicyDocumentException(body.Error, context);
        contents = serdePlugin.__assign({ name: "MalformedPolicyDocumentException", $fault: "client", $metadata: deserializeMetadata$1(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_queryPackedPolicyTooLargeExceptionResponse = function (parsedOutput, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return serdePlugin.__generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_queryPackedPolicyTooLargeException(body.Error, context);
        contents = serdePlugin.__assign({ name: "PackedPolicyTooLargeException", $fault: "client", $metadata: deserializeMetadata$1(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_queryRegionDisabledExceptionResponse = function (parsedOutput, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return serdePlugin.__generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_queryRegionDisabledException(body.Error, context);
        contents = serdePlugin.__assign({ name: "RegionDisabledException", $fault: "client", $metadata: deserializeMetadata$1(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var serializeAws_queryAssumeRoleRequest = function (input, context) {
    var entries = {};
    if (input.RoleArn !== undefined && input.RoleArn !== null) {
        entries["RoleArn"] = input.RoleArn;
    }
    if (input.RoleSessionName !== undefined && input.RoleSessionName !== null) {
        entries["RoleSessionName"] = input.RoleSessionName;
    }
    if (input.PolicyArns !== undefined && input.PolicyArns !== null) {
        var memberEntries = serializeAws_querypolicyDescriptorListType(input.PolicyArns, context);
        Object.entries(memberEntries).forEach(function (_a) {
            var _b = serdePlugin.__read(_a, 2), key = _b[0], value = _b[1];
            var loc = "PolicyArns." + key;
            entries[loc] = value;
        });
    }
    if (input.Policy !== undefined && input.Policy !== null) {
        entries["Policy"] = input.Policy;
    }
    if (input.DurationSeconds !== undefined && input.DurationSeconds !== null) {
        entries["DurationSeconds"] = input.DurationSeconds;
    }
    if (input.Tags !== undefined && input.Tags !== null) {
        var memberEntries = serializeAws_querytagListType(input.Tags, context);
        Object.entries(memberEntries).forEach(function (_a) {
            var _b = serdePlugin.__read(_a, 2), key = _b[0], value = _b[1];
            var loc = "Tags." + key;
            entries[loc] = value;
        });
    }
    if (input.TransitiveTagKeys !== undefined && input.TransitiveTagKeys !== null) {
        var memberEntries = serializeAws_querytagKeyListType(input.TransitiveTagKeys, context);
        Object.entries(memberEntries).forEach(function (_a) {
            var _b = serdePlugin.__read(_a, 2), key = _b[0], value = _b[1];
            var loc = "TransitiveTagKeys." + key;
            entries[loc] = value;
        });
    }
    if (input.ExternalId !== undefined && input.ExternalId !== null) {
        entries["ExternalId"] = input.ExternalId;
    }
    if (input.SerialNumber !== undefined && input.SerialNumber !== null) {
        entries["SerialNumber"] = input.SerialNumber;
    }
    if (input.TokenCode !== undefined && input.TokenCode !== null) {
        entries["TokenCode"] = input.TokenCode;
    }
    if (input.SourceIdentity !== undefined && input.SourceIdentity !== null) {
        entries["SourceIdentity"] = input.SourceIdentity;
    }
    return entries;
};
var serializeAws_queryAssumeRoleWithWebIdentityRequest = function (input, context) {
    var entries = {};
    if (input.RoleArn !== undefined && input.RoleArn !== null) {
        entries["RoleArn"] = input.RoleArn;
    }
    if (input.RoleSessionName !== undefined && input.RoleSessionName !== null) {
        entries["RoleSessionName"] = input.RoleSessionName;
    }
    if (input.WebIdentityToken !== undefined && input.WebIdentityToken !== null) {
        entries["WebIdentityToken"] = input.WebIdentityToken;
    }
    if (input.ProviderId !== undefined && input.ProviderId !== null) {
        entries["ProviderId"] = input.ProviderId;
    }
    if (input.PolicyArns !== undefined && input.PolicyArns !== null) {
        var memberEntries = serializeAws_querypolicyDescriptorListType(input.PolicyArns, context);
        Object.entries(memberEntries).forEach(function (_a) {
            var _b = serdePlugin.__read(_a, 2), key = _b[0], value = _b[1];
            var loc = "PolicyArns." + key;
            entries[loc] = value;
        });
    }
    if (input.Policy !== undefined && input.Policy !== null) {
        entries["Policy"] = input.Policy;
    }
    if (input.DurationSeconds !== undefined && input.DurationSeconds !== null) {
        entries["DurationSeconds"] = input.DurationSeconds;
    }
    return entries;
};
var serializeAws_querypolicyDescriptorListType = function (input, context) {
    var e_1, _a;
    var entries = {};
    var counter = 1;
    try {
        for (var input_1 = serdePlugin.__values(input), input_1_1 = input_1.next(); !input_1_1.done; input_1_1 = input_1.next()) {
            var entry = input_1_1.value;
            if (entry === null) {
                continue;
            }
            var memberEntries = serializeAws_queryPolicyDescriptorType(entry, context);
            Object.entries(memberEntries).forEach(function (_a) {
                var _b = serdePlugin.__read(_a, 2), key = _b[0], value = _b[1];
                entries["member." + counter + "." + key] = value;
            });
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
var serializeAws_queryPolicyDescriptorType = function (input, context) {
    var entries = {};
    if (input.arn !== undefined && input.arn !== null) {
        entries["arn"] = input.arn;
    }
    return entries;
};
var serializeAws_queryTag = function (input, context) {
    var entries = {};
    if (input.Key !== undefined && input.Key !== null) {
        entries["Key"] = input.Key;
    }
    if (input.Value !== undefined && input.Value !== null) {
        entries["Value"] = input.Value;
    }
    return entries;
};
var serializeAws_querytagKeyListType = function (input, context) {
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
var serializeAws_querytagListType = function (input, context) {
    var e_3, _a;
    var entries = {};
    var counter = 1;
    try {
        for (var input_3 = serdePlugin.__values(input), input_3_1 = input_3.next(); !input_3_1.done; input_3_1 = input_3.next()) {
            var entry = input_3_1.value;
            if (entry === null) {
                continue;
            }
            var memberEntries = serializeAws_queryTag(entry, context);
            Object.entries(memberEntries).forEach(function (_a) {
                var _b = serdePlugin.__read(_a, 2), key = _b[0], value = _b[1];
                entries["member." + counter + "." + key] = value;
            });
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
var deserializeAws_queryAssumedRoleUser = function (output, context) {
    var contents = {
        AssumedRoleId: undefined,
        Arn: undefined,
    };
    if (output["AssumedRoleId"] !== undefined) {
        contents.AssumedRoleId = serdePlugin.expectString(output["AssumedRoleId"]);
    }
    if (output["Arn"] !== undefined) {
        contents.Arn = serdePlugin.expectString(output["Arn"]);
    }
    return contents;
};
var deserializeAws_queryAssumeRoleResponse = function (output, context) {
    var contents = {
        Credentials: undefined,
        AssumedRoleUser: undefined,
        PackedPolicySize: undefined,
        SourceIdentity: undefined,
    };
    if (output["Credentials"] !== undefined) {
        contents.Credentials = deserializeAws_queryCredentials(output["Credentials"], context);
    }
    if (output["AssumedRoleUser"] !== undefined) {
        contents.AssumedRoleUser = deserializeAws_queryAssumedRoleUser(output["AssumedRoleUser"]);
    }
    if (output["PackedPolicySize"] !== undefined) {
        contents.PackedPolicySize = serdePlugin.strictParseInt(output["PackedPolicySize"]);
    }
    if (output["SourceIdentity"] !== undefined) {
        contents.SourceIdentity = serdePlugin.expectString(output["SourceIdentity"]);
    }
    return contents;
};
var deserializeAws_queryAssumeRoleWithWebIdentityResponse = function (output, context) {
    var contents = {
        Credentials: undefined,
        SubjectFromWebIdentityToken: undefined,
        AssumedRoleUser: undefined,
        PackedPolicySize: undefined,
        Provider: undefined,
        Audience: undefined,
        SourceIdentity: undefined,
    };
    if (output["Credentials"] !== undefined) {
        contents.Credentials = deserializeAws_queryCredentials(output["Credentials"], context);
    }
    if (output["SubjectFromWebIdentityToken"] !== undefined) {
        contents.SubjectFromWebIdentityToken = serdePlugin.expectString(output["SubjectFromWebIdentityToken"]);
    }
    if (output["AssumedRoleUser"] !== undefined) {
        contents.AssumedRoleUser = deserializeAws_queryAssumedRoleUser(output["AssumedRoleUser"]);
    }
    if (output["PackedPolicySize"] !== undefined) {
        contents.PackedPolicySize = serdePlugin.strictParseInt(output["PackedPolicySize"]);
    }
    if (output["Provider"] !== undefined) {
        contents.Provider = serdePlugin.expectString(output["Provider"]);
    }
    if (output["Audience"] !== undefined) {
        contents.Audience = serdePlugin.expectString(output["Audience"]);
    }
    if (output["SourceIdentity"] !== undefined) {
        contents.SourceIdentity = serdePlugin.expectString(output["SourceIdentity"]);
    }
    return contents;
};
var deserializeAws_queryCredentials = function (output, context) {
    var contents = {
        AccessKeyId: undefined,
        SecretAccessKey: undefined,
        SessionToken: undefined,
        Expiration: undefined,
    };
    if (output["AccessKeyId"] !== undefined) {
        contents.AccessKeyId = serdePlugin.expectString(output["AccessKeyId"]);
    }
    if (output["SecretAccessKey"] !== undefined) {
        contents.SecretAccessKey = serdePlugin.expectString(output["SecretAccessKey"]);
    }
    if (output["SessionToken"] !== undefined) {
        contents.SessionToken = serdePlugin.expectString(output["SessionToken"]);
    }
    if (output["Expiration"] !== undefined) {
        contents.Expiration = new Date(output["Expiration"]);
    }
    return contents;
};
var deserializeAws_queryExpiredTokenException = function (output, context) {
    var contents = {
        message: undefined,
    };
    if (output["message"] !== undefined) {
        contents.message = serdePlugin.expectString(output["message"]);
    }
    return contents;
};
var deserializeAws_queryIDPCommunicationErrorException = function (output, context) {
    var contents = {
        message: undefined,
    };
    if (output["message"] !== undefined) {
        contents.message = serdePlugin.expectString(output["message"]);
    }
    return contents;
};
var deserializeAws_queryIDPRejectedClaimException = function (output, context) {
    var contents = {
        message: undefined,
    };
    if (output["message"] !== undefined) {
        contents.message = serdePlugin.expectString(output["message"]);
    }
    return contents;
};
var deserializeAws_queryInvalidIdentityTokenException = function (output, context) {
    var contents = {
        message: undefined,
    };
    if (output["message"] !== undefined) {
        contents.message = serdePlugin.expectString(output["message"]);
    }
    return contents;
};
var deserializeAws_queryMalformedPolicyDocumentException = function (output, context) {
    var contents = {
        message: undefined,
    };
    if (output["message"] !== undefined) {
        contents.message = serdePlugin.expectString(output["message"]);
    }
    return contents;
};
var deserializeAws_queryPackedPolicyTooLargeException = function (output, context) {
    var contents = {
        message: undefined,
    };
    if (output["message"] !== undefined) {
        contents.message = serdePlugin.expectString(output["message"]);
    }
    return contents;
};
var deserializeAws_queryRegionDisabledException = function (output, context) {
    var contents = {
        message: undefined,
    };
    if (output["message"] !== undefined) {
        contents.message = serdePlugin.expectString(output["message"]);
    }
    return contents;
};
var deserializeMetadata$1 = function (output) {
    var _a;
    return ({
        httpStatusCode: output.statusCode,
        requestId: (_a = output.headers["x-amzn-requestid"]) !== null && _a !== void 0 ? _a : output.headers["x-amzn-request-id"],
        extendedRequestId: output.headers["x-amz-id-2"],
        cfId: output.headers["x-amz-cf-id"],
    });
};
// Collect low-level response body stream to Uint8Array.
var collectBody$1 = function (streamBody, context) {
    if (streamBody === void 0) { streamBody = new Uint8Array(); }
    if (streamBody instanceof Uint8Array) {
        return Promise.resolve(streamBody);
    }
    return context.streamCollector(streamBody) || Promise.resolve(new Uint8Array());
};
// Encode Uint8Array data into string with utf-8.
var collectBodyString$1 = function (streamBody, context) {
    return collectBody$1(streamBody, context).then(function (body) { return context.utf8Encoder(body); });
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
var parseBody$1 = function (streamBody, context) {
    return collectBodyString$1(streamBody, context).then(function (encoded) {
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
 * An error representing a failure of an individual credential provider.
 *
 * This error class has special meaning to the {@link chain} method. If a
 * provider in the chain is rejected with an error, the chain will only proceed
 * to the next provider if the value of the `tryNextLink` property on the error
 * is truthy. This allows individual providers to halt the chain and also
 * ensures the chain will stop if an entirely unexpected error is encountered.
 *
 * @deprecated
 */
var ProviderError = /** @class */ (function (_super) {
    serdePlugin.__extends(ProviderError, _super);
    function ProviderError(message, tryNextLink) {
        if (tryNextLink === void 0) { tryNextLink = true; }
        var _this = _super.call(this, message) || this;
        _this.tryNextLink = tryNextLink;
        return _this;
    }
    ProviderError.from = function (error, tryNextLink) {
        if (tryNextLink === void 0) { tryNextLink = true; }
        Object.defineProperty(error, "tryNextLink", {
            value: tryNextLink,
            configurable: false,
            enumerable: false,
            writable: false,
        });
        return error;
    };
    return ProviderError;
}(Error));
/**
 * An error representing a failure of an individual credential provider.
 *
 * This error class has special meaning to the {@link chain} method. If a
 * provider in the chain is rejected with an error, the chain will only proceed
 * to the next provider if the value of the `tryNextLink` property on the error
 * is truthy. This allows individual providers to halt the chain and also
 * ensures the chain will stop if an entirely unexpected error is encountered.
 */
var CredentialsProviderError = /** @class */ (function (_super) {
    serdePlugin.__extends(CredentialsProviderError, _super);
    function CredentialsProviderError(message, tryNextLink) {
        if (tryNextLink === void 0) { tryNextLink = true; }
        var _this = _super.call(this, message) || this;
        _this.tryNextLink = tryNextLink;
        _this.name = "CredentialsProviderError";
        return _this;
    }
    CredentialsProviderError.from = function (error, tryNextLink) {
        if (tryNextLink === void 0) { tryNextLink = true; }
        Object.defineProperty(error, "tryNextLink", {
            value: tryNextLink,
            configurable: false,
            enumerable: false,
            writable: false,
        });
        return error;
    };
    return CredentialsProviderError;
}(Error));

/**
 * Compose a single credential provider function from multiple credential
 * providers. The first provider in the argument list will always be invoked;
 * subsequent providers in the list will be invoked in the order in which the
 * were received if the preceding provider did not successfully resolve.
 *
 * If no providers were received or no provider resolves successfully, the
 * returned promise will be rejected.
 */
function chain() {
    var providers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        providers[_i] = arguments[_i];
    }
    return function () {
        var e_1, _a;
        var promise = Promise.reject(new ProviderError("No providers in chain"));
        var _loop_1 = function (provider) {
            promise = promise.catch(function (err) {
                if (err === null || err === void 0 ? void 0 : err.tryNextLink) {
                    return provider();
                }
                throw err;
            });
        };
        try {
            for (var providers_1 = serdePlugin.__values(providers), providers_1_1 = providers_1.next(); !providers_1_1.done; providers_1_1 = providers_1.next()) {
                var provider = providers_1_1.value;
                _loop_1(provider);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (providers_1_1 && !providers_1_1.done && (_a = providers_1.return)) _a.call(providers_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return promise;
    };
}

var fromStatic$1 = function (staticValue) {
    return function () {
        return Promise.resolve(staticValue);
    };
};

var memoize = function (provider, isExpired, requiresRefresh) {
    var resolved;
    var hasResult;
    if (isExpired === undefined) {
        // This is a static memoization; no need to incorporate refreshing
        return function () { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
            return serdePlugin.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!hasResult) return [3 /*break*/, 2];
                        return [4 /*yield*/, provider()];
                    case 1:
                        resolved = _a.sent();
                        hasResult = true;
                        _a.label = 2;
                    case 2: return [2 /*return*/, resolved];
                }
            });
        }); };
    }
    var isConstant = false;
    return function () { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
        return serdePlugin.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!hasResult) return [3 /*break*/, 2];
                    return [4 /*yield*/, provider()];
                case 1:
                    resolved = _a.sent();
                    hasResult = true;
                    _a.label = 2;
                case 2:
                    if (isConstant) {
                        return [2 /*return*/, resolved];
                    }
                    if (requiresRefresh && !requiresRefresh(resolved)) {
                        isConstant = true;
                        return [2 /*return*/, resolved];
                    }
                    if (!isExpired(resolved)) return [3 /*break*/, 4];
                    return [4 /*yield*/, provider()];
                case 3: return [2 /*return*/, (resolved = _a.sent())];
                case 4: return [2 /*return*/, resolved];
            }
        });
    }); };
};

var SHORT_TO_HEX = {};
var HEX_TO_SHORT = {};
for (var i = 0; i < 256; i++) {
    var encodedByte = i.toString(16).toLowerCase();
    if (encodedByte.length === 1) {
        encodedByte = "0" + encodedByte;
    }
    SHORT_TO_HEX[i] = encodedByte;
    HEX_TO_SHORT[encodedByte] = i;
}
/**
 * Converts a hexadecimal encoded string to a Uint8Array of bytes.
 *
 * @param encoded The hexadecimal encoded string
 */
function fromHex(encoded) {
    if (encoded.length % 2 !== 0) {
        throw new Error("Hex encoded strings must have an even number length");
    }
    var out = new Uint8Array(encoded.length / 2);
    for (var i = 0; i < encoded.length; i += 2) {
        var encodedByte = encoded.substr(i, 2).toLowerCase();
        if (encodedByte in HEX_TO_SHORT) {
            out[i / 2] = HEX_TO_SHORT[encodedByte];
        }
        else {
            throw new Error("Cannot decode unrecognized sequence " + encodedByte + " as hexadecimal");
        }
    }
    return out;
}
/**
 * Converts a Uint8Array of binary data to a hexadecimal encoded string.
 *
 * @param bytes The binary data to encode
 */
function toHex(bytes) {
    var out = "";
    for (var i = 0; i < bytes.byteLength; i++) {
        out += SHORT_TO_HEX[bytes[i]];
    }
    return out;
}

var ALGORITHM_QUERY_PARAM = "X-Amz-Algorithm";
var CREDENTIAL_QUERY_PARAM = "X-Amz-Credential";
var AMZ_DATE_QUERY_PARAM = "X-Amz-Date";
var SIGNED_HEADERS_QUERY_PARAM = "X-Amz-SignedHeaders";
var EXPIRES_QUERY_PARAM = "X-Amz-Expires";
var SIGNATURE_QUERY_PARAM = "X-Amz-Signature";
var TOKEN_QUERY_PARAM = "X-Amz-Security-Token";
var AUTH_HEADER = "authorization";
var AMZ_DATE_HEADER = AMZ_DATE_QUERY_PARAM.toLowerCase();
var DATE_HEADER = "date";
var GENERATED_HEADERS = [AUTH_HEADER, AMZ_DATE_HEADER, DATE_HEADER];
var SIGNATURE_HEADER = SIGNATURE_QUERY_PARAM.toLowerCase();
var SHA256_HEADER = "x-amz-content-sha256";
var TOKEN_HEADER = TOKEN_QUERY_PARAM.toLowerCase();
var ALWAYS_UNSIGNABLE_HEADERS = {
    authorization: true,
    "cache-control": true,
    connection: true,
    expect: true,
    from: true,
    "keep-alive": true,
    "max-forwards": true,
    pragma: true,
    referer: true,
    te: true,
    trailer: true,
    "transfer-encoding": true,
    upgrade: true,
    "user-agent": true,
    "x-amzn-trace-id": true,
};
var PROXY_HEADER_PATTERN = /^proxy-/;
var SEC_HEADER_PATTERN = /^sec-/;
var ALGORITHM_IDENTIFIER = "AWS4-HMAC-SHA256";
var EVENT_ALGORITHM_IDENTIFIER = "AWS4-HMAC-SHA256-PAYLOAD";
var UNSIGNED_PAYLOAD = "UNSIGNED-PAYLOAD";
var MAX_CACHE_SIZE = 50;
var KEY_TYPE_IDENTIFIER = "aws4_request";
var MAX_PRESIGNED_TTL = 60 * 60 * 24 * 7;

var signingKeyCache = {};
var cacheQueue = [];
/**
 * Create a string describing the scope of credentials used to sign a request.
 *
 * @param shortDate The current calendar date in the form YYYYMMDD.
 * @param region    The AWS region in which the service resides.
 * @param service   The service to which the signed request is being sent.
 */
function createScope(shortDate, region, service) {
    return shortDate + "/" + region + "/" + service + "/" + KEY_TYPE_IDENTIFIER;
}
/**
 * Derive a signing key from its composite parts
 *
 * @param sha256Constructor A constructor function that can instantiate SHA-256
 *                          hash objects.
 * @param credentials       The credentials with which the request will be
 *                          signed.
 * @param shortDate         The current calendar date in the form YYYYMMDD.
 * @param region            The AWS region in which the service resides.
 * @param service           The service to which the signed request is being
 *                          sent.
 */
var getSigningKey = function (sha256Constructor, credentials, shortDate, region, service) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var credsHash, cacheKey, key, _a, _b, signable, e_1_1;
    var e_1, _c;
    return serdePlugin.__generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, hmac(sha256Constructor, credentials.secretAccessKey, credentials.accessKeyId)];
            case 1:
                credsHash = _d.sent();
                cacheKey = shortDate + ":" + region + ":" + service + ":" + toHex(credsHash) + ":" + credentials.sessionToken;
                if (cacheKey in signingKeyCache) {
                    return [2 /*return*/, signingKeyCache[cacheKey]];
                }
                cacheQueue.push(cacheKey);
                while (cacheQueue.length > MAX_CACHE_SIZE) {
                    delete signingKeyCache[cacheQueue.shift()];
                }
                key = "AWS4" + credentials.secretAccessKey;
                _d.label = 2;
            case 2:
                _d.trys.push([2, 7, 8, 9]);
                _a = serdePlugin.__values([shortDate, region, service, KEY_TYPE_IDENTIFIER]), _b = _a.next();
                _d.label = 3;
            case 3:
                if (!!_b.done) return [3 /*break*/, 6];
                signable = _b.value;
                return [4 /*yield*/, hmac(sha256Constructor, key, signable)];
            case 4:
                key = _d.sent();
                _d.label = 5;
            case 5:
                _b = _a.next();
                return [3 /*break*/, 3];
            case 6: return [3 /*break*/, 9];
            case 7:
                e_1_1 = _d.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 9];
            case 8:
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 9: return [2 /*return*/, (signingKeyCache[cacheKey] = key)];
        }
    });
}); };
function hmac(ctor, secret, data) {
    var hash = new ctor(secret);
    hash.update(data);
    return hash.digest();
}

/**
 * @internal
 */
function getCanonicalHeaders(_a, unsignableHeaders, signableHeaders) {
    var e_1, _b;
    var headers = _a.headers;
    var canonical = {};
    try {
        for (var _c = serdePlugin.__values(Object.keys(headers).sort()), _d = _c.next(); !_d.done; _d = _c.next()) {
            var headerName = _d.value;
            var canonicalHeaderName = headerName.toLowerCase();
            if (canonicalHeaderName in ALWAYS_UNSIGNABLE_HEADERS ||
                (unsignableHeaders === null || unsignableHeaders === void 0 ? void 0 : unsignableHeaders.has(canonicalHeaderName)) ||
                PROXY_HEADER_PATTERN.test(canonicalHeaderName) ||
                SEC_HEADER_PATTERN.test(canonicalHeaderName)) {
                if (!signableHeaders || (signableHeaders && !signableHeaders.has(canonicalHeaderName))) {
                    continue;
                }
            }
            canonical[canonicalHeaderName] = headers[headerName].trim().replace(/\s+/g, " ");
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return canonical;
}

var escapeUri = function (uri) {
    // AWS percent-encodes some extra non-standard characters in a URI
    return encodeURIComponent(uri).replace(/[!'()*]/g, hexEncode);
};
var hexEncode = function (c) { return "%" + c.charCodeAt(0).toString(16).toUpperCase(); };

/**
 * @internal
 */
function getCanonicalQuery(_a) {
    var e_1, _b;
    var _c = _a.query, query = _c === void 0 ? {} : _c;
    var keys = [];
    var serialized = {};
    var _loop_1 = function (key) {
        if (key.toLowerCase() === SIGNATURE_HEADER) {
            return "continue";
        }
        keys.push(key);
        var value = query[key];
        if (typeof value === "string") {
            serialized[key] = escapeUri(key) + "=" + escapeUri(value);
        }
        else if (Array.isArray(value)) {
            serialized[key] = value
                .slice(0)
                .sort()
                .reduce(function (encoded, value) { return encoded.concat([escapeUri(key) + "=" + escapeUri(value)]); }, [])
                .join("&");
        }
    };
    try {
        for (var _d = serdePlugin.__values(Object.keys(query).sort()), _e = _d.next(); !_e.done; _e = _d.next()) {
            var key = _e.value;
            _loop_1(key);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_e && !_e.done && (_b = _d.return)) _b.call(_d);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return keys
        .map(function (key) { return serialized[key]; })
        .filter(function (serialized) { return serialized; }) // omit any falsy values
        .join("&");
}

var isArrayBuffer = function (arg) {
    return (typeof ArrayBuffer === "function" && arg instanceof ArrayBuffer) ||
        Object.prototype.toString.call(arg) === "[object ArrayBuffer]";
};

/**
 * @internal
 */
function getPayloadHash(_a, hashConstructor) {
    var headers = _a.headers, body = _a.body;
    return serdePlugin.__awaiter(this, void 0, void 0, function () {
        var _b, _c, headerName, hashCtor, _d;
        var e_1, _e;
        return serdePlugin.__generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    try {
                        for (_b = serdePlugin.__values(Object.keys(headers)), _c = _b.next(); !_c.done; _c = _b.next()) {
                            headerName = _c.value;
                            if (headerName.toLowerCase() === SHA256_HEADER) {
                                return [2 /*return*/, headers[headerName]];
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_e = _b.return)) _e.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    if (!(body == undefined)) return [3 /*break*/, 1];
                    return [2 /*return*/, "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"];
                case 1:
                    if (!(typeof body === "string" || ArrayBuffer.isView(body) || isArrayBuffer(body))) return [3 /*break*/, 3];
                    hashCtor = new hashConstructor();
                    hashCtor.update(body);
                    _d = toHex;
                    return [4 /*yield*/, hashCtor.digest()];
                case 2: return [2 /*return*/, _d.apply(void 0, [_f.sent()])];
                case 3: 
                // As any defined body that is not a string or binary data is a stream, this
                // body is unsignable. Attempt to send the request with an unsigned payload,
                // which may or may not be accepted by the service.
                return [2 /*return*/, UNSIGNED_PAYLOAD];
            }
        });
    });
}

function hasHeader(soughtHeader, headers) {
    var e_1, _a;
    soughtHeader = soughtHeader.toLowerCase();
    try {
        for (var _b = serdePlugin.__values(Object.keys(headers)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var headerName = _c.value;
            if (soughtHeader === headerName.toLowerCase()) {
                return true;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return false;
}

/**
 * @internal
 */
function cloneRequest(_a) {
    var headers = _a.headers, query = _a.query, rest = serdePlugin.__rest(_a, ["headers", "query"]);
    return serdePlugin.__assign(serdePlugin.__assign({}, rest), { headers: serdePlugin.__assign({}, headers), query: query ? cloneQuery(query) : undefined });
}
function cloneQuery(query) {
    return Object.keys(query).reduce(function (carry, paramName) {
        var _a;
        var param = query[paramName];
        return serdePlugin.__assign(serdePlugin.__assign({}, carry), (_a = {}, _a[paramName] = Array.isArray(param) ? serdePlugin.__spreadArray([], serdePlugin.__read(param)) : param, _a));
    }, {});
}

/**
 * @internal
 */
function moveHeadersToQuery(request, options) {
    var e_1, _a;
    var _b;
    if (options === void 0) { options = {}; }
    var _c = typeof request.clone === "function" ? request.clone() : cloneRequest(request), headers = _c.headers, _d = _c.query, query = _d === void 0 ? {} : _d;
    try {
        for (var _e = serdePlugin.__values(Object.keys(headers)), _f = _e.next(); !_f.done; _f = _e.next()) {
            var name = _f.value;
            var lname = name.toLowerCase();
            if (lname.substr(0, 6) === "x-amz-" && !((_b = options.unhoistableHeaders) === null || _b === void 0 ? void 0 : _b.has(lname))) {
                query[name] = headers[name];
                delete headers[name];
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return serdePlugin.__assign(serdePlugin.__assign({}, request), { headers: headers,
        query: query });
}

/**
 * @internal
 */
function prepareRequest(request) {
    var e_1, _a;
    // Create a clone of the request object that does not clone the body
    request = typeof request.clone === "function" ? request.clone() : cloneRequest(request);
    try {
        for (var _b = serdePlugin.__values(Object.keys(request.headers)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var headerName = _c.value;
            if (GENERATED_HEADERS.indexOf(headerName.toLowerCase()) > -1) {
                delete request.headers[headerName];
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return request;
}

function iso8601(time) {
    return toDate(time)
        .toISOString()
        .replace(/\.\d{3}Z$/, "Z");
}
function toDate(time) {
    if (typeof time === "number") {
        return new Date(time * 1000);
    }
    if (typeof time === "string") {
        if (Number(time)) {
            return new Date(Number(time) * 1000);
        }
        return new Date(time);
    }
    return time;
}

var SignatureV4 = /** @class */ (function () {
    function SignatureV4(_a) {
        var applyChecksum = _a.applyChecksum, credentials = _a.credentials, region = _a.region, service = _a.service, sha256 = _a.sha256, _b = _a.uriEscapePath, uriEscapePath = _b === void 0 ? true : _b;
        this.service = service;
        this.sha256 = sha256;
        this.uriEscapePath = uriEscapePath;
        // default to true if applyChecksum isn't set
        this.applyChecksum = typeof applyChecksum === "boolean" ? applyChecksum : true;
        this.regionProvider = normalizeRegionProvider(region);
        this.credentialProvider = normalizeCredentialsProvider(credentials);
    }
    SignatureV4.prototype.presign = function (originalRequest, options) {
        if (options === void 0) { options = {}; }
        return serdePlugin.__awaiter(this, void 0, void 0, function () {
            var _a, signingDate, _b, expiresIn, unsignableHeaders, unhoistableHeaders, signableHeaders, signingRegion, signingService, credentials, region, _c, _d, longDate, shortDate, scope, request, canonicalHeaders, _e, _f, _g, _h, _j, _k;
            return serdePlugin.__generator(this, function (_l) {
                switch (_l.label) {
                    case 0:
                        _a = options.signingDate, signingDate = _a === void 0 ? new Date() : _a, _b = options.expiresIn, expiresIn = _b === void 0 ? 3600 : _b, unsignableHeaders = options.unsignableHeaders, unhoistableHeaders = options.unhoistableHeaders, signableHeaders = options.signableHeaders, signingRegion = options.signingRegion, signingService = options.signingService;
                        return [4 /*yield*/, this.credentialProvider()];
                    case 1:
                        credentials = _l.sent();
                        if (!(signingRegion !== null && signingRegion !== void 0)) return [3 /*break*/, 2];
                        _c = signingRegion;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.regionProvider()];
                    case 3:
                        _c = (_l.sent());
                        _l.label = 4;
                    case 4:
                        region = _c;
                        _d = formatDate(signingDate), longDate = _d.longDate, shortDate = _d.shortDate;
                        if (expiresIn > MAX_PRESIGNED_TTL) {
                            return [2 /*return*/, Promise.reject("Signature version 4 presigned URLs" + " must have an expiration date less than one week in" + " the future")];
                        }
                        scope = createScope(shortDate, region, signingService !== null && signingService !== void 0 ? signingService : this.service);
                        request = moveHeadersToQuery(prepareRequest(originalRequest), { unhoistableHeaders: unhoistableHeaders });
                        if (credentials.sessionToken) {
                            request.query[TOKEN_QUERY_PARAM] = credentials.sessionToken;
                        }
                        request.query[ALGORITHM_QUERY_PARAM] = ALGORITHM_IDENTIFIER;
                        request.query[CREDENTIAL_QUERY_PARAM] = credentials.accessKeyId + "/" + scope;
                        request.query[AMZ_DATE_QUERY_PARAM] = longDate;
                        request.query[EXPIRES_QUERY_PARAM] = expiresIn.toString(10);
                        canonicalHeaders = getCanonicalHeaders(request, unsignableHeaders, signableHeaders);
                        request.query[SIGNED_HEADERS_QUERY_PARAM] = getCanonicalHeaderList(canonicalHeaders);
                        _e = request.query;
                        _f = SIGNATURE_QUERY_PARAM;
                        _g = this.getSignature;
                        _h = [longDate,
                            scope,
                            this.getSigningKey(credentials, region, shortDate, signingService)];
                        _j = this.createCanonicalRequest;
                        _k = [request, canonicalHeaders];
                        return [4 /*yield*/, getPayloadHash(originalRequest, this.sha256)];
                    case 5: return [4 /*yield*/, _g.apply(this, _h.concat([_j.apply(this, _k.concat([_l.sent()]))]))];
                    case 6:
                        _e[_f] = _l.sent();
                        return [2 /*return*/, request];
                }
            });
        });
    };
    SignatureV4.prototype.sign = function (toSign, options) {
        return serdePlugin.__awaiter(this, void 0, void 0, function () {
            return serdePlugin.__generator(this, function (_a) {
                if (typeof toSign === "string") {
                    return [2 /*return*/, this.signString(toSign, options)];
                }
                else if (toSign.headers && toSign.payload) {
                    return [2 /*return*/, this.signEvent(toSign, options)];
                }
                else {
                    return [2 /*return*/, this.signRequest(toSign, options)];
                }
            });
        });
    };
    SignatureV4.prototype.signEvent = function (_a, _b) {
        var headers = _a.headers, payload = _a.payload;
        var _c = _b.signingDate, signingDate = _c === void 0 ? new Date() : _c, priorSignature = _b.priorSignature, signingRegion = _b.signingRegion, signingService = _b.signingService;
        return serdePlugin.__awaiter(this, void 0, void 0, function () {
            var region, _d, _e, shortDate, longDate, scope, hashedPayload, hash, hashedHeaders, _f, stringToSign;
            return serdePlugin.__generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        if (!(signingRegion !== null && signingRegion !== void 0)) return [3 /*break*/, 1];
                        _d = signingRegion;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.regionProvider()];
                    case 2:
                        _d = (_g.sent());
                        _g.label = 3;
                    case 3:
                        region = _d;
                        _e = formatDate(signingDate), shortDate = _e.shortDate, longDate = _e.longDate;
                        scope = createScope(shortDate, region, signingService !== null && signingService !== void 0 ? signingService : this.service);
                        return [4 /*yield*/, getPayloadHash({ headers: {}, body: payload }, this.sha256)];
                    case 4:
                        hashedPayload = _g.sent();
                        hash = new this.sha256();
                        hash.update(headers);
                        _f = toHex;
                        return [4 /*yield*/, hash.digest()];
                    case 5:
                        hashedHeaders = _f.apply(void 0, [_g.sent()]);
                        stringToSign = [
                            EVENT_ALGORITHM_IDENTIFIER,
                            longDate,
                            scope,
                            priorSignature,
                            hashedHeaders,
                            hashedPayload,
                        ].join("\n");
                        return [2 /*return*/, this.signString(stringToSign, { signingDate: signingDate, signingRegion: region, signingService: signingService })];
                }
            });
        });
    };
    SignatureV4.prototype.signString = function (stringToSign, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.signingDate, signingDate = _c === void 0 ? new Date() : _c, signingRegion = _b.signingRegion, signingService = _b.signingService;
        return serdePlugin.__awaiter(this, void 0, void 0, function () {
            var credentials, region, _d, shortDate, hash, _e, _f, _g;
            return serdePlugin.__generator(this, function (_h) {
                switch (_h.label) {
                    case 0: return [4 /*yield*/, this.credentialProvider()];
                    case 1:
                        credentials = _h.sent();
                        if (!(signingRegion !== null && signingRegion !== void 0)) return [3 /*break*/, 2];
                        _d = signingRegion;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.regionProvider()];
                    case 3:
                        _d = (_h.sent());
                        _h.label = 4;
                    case 4:
                        region = _d;
                        shortDate = formatDate(signingDate).shortDate;
                        _f = (_e = this.sha256).bind;
                        return [4 /*yield*/, this.getSigningKey(credentials, region, shortDate, signingService)];
                    case 5:
                        hash = new (_f.apply(_e, [void 0, _h.sent()]))();
                        hash.update(stringToSign);
                        _g = toHex;
                        return [4 /*yield*/, hash.digest()];
                    case 6: return [2 /*return*/, _g.apply(void 0, [_h.sent()])];
                }
            });
        });
    };
    SignatureV4.prototype.signRequest = function (requestToSign, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.signingDate, signingDate = _c === void 0 ? new Date() : _c, signableHeaders = _b.signableHeaders, unsignableHeaders = _b.unsignableHeaders, signingRegion = _b.signingRegion, signingService = _b.signingService;
        return serdePlugin.__awaiter(this, void 0, void 0, function () {
            var credentials, region, _d, request, _e, longDate, shortDate, scope, payloadHash, canonicalHeaders, signature;
            return serdePlugin.__generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, this.credentialProvider()];
                    case 1:
                        credentials = _f.sent();
                        if (!(signingRegion !== null && signingRegion !== void 0)) return [3 /*break*/, 2];
                        _d = signingRegion;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.regionProvider()];
                    case 3:
                        _d = (_f.sent());
                        _f.label = 4;
                    case 4:
                        region = _d;
                        request = prepareRequest(requestToSign);
                        _e = formatDate(signingDate), longDate = _e.longDate, shortDate = _e.shortDate;
                        scope = createScope(shortDate, region, signingService !== null && signingService !== void 0 ? signingService : this.service);
                        request.headers[AMZ_DATE_HEADER] = longDate;
                        if (credentials.sessionToken) {
                            request.headers[TOKEN_HEADER] = credentials.sessionToken;
                        }
                        return [4 /*yield*/, getPayloadHash(request, this.sha256)];
                    case 5:
                        payloadHash = _f.sent();
                        if (!hasHeader(SHA256_HEADER, request.headers) && this.applyChecksum) {
                            request.headers[SHA256_HEADER] = payloadHash;
                        }
                        canonicalHeaders = getCanonicalHeaders(request, unsignableHeaders, signableHeaders);
                        return [4 /*yield*/, this.getSignature(longDate, scope, this.getSigningKey(credentials, region, shortDate, signingService), this.createCanonicalRequest(request, canonicalHeaders, payloadHash))];
                    case 6:
                        signature = _f.sent();
                        request.headers[AUTH_HEADER] =
                            ALGORITHM_IDENTIFIER + " " +
                                ("Credential=" + credentials.accessKeyId + "/" + scope + ", ") +
                                ("SignedHeaders=" + getCanonicalHeaderList(canonicalHeaders) + ", ") +
                                ("Signature=" + signature);
                        return [2 /*return*/, request];
                }
            });
        });
    };
    SignatureV4.prototype.createCanonicalRequest = function (request, canonicalHeaders, payloadHash) {
        var sortedHeaders = Object.keys(canonicalHeaders).sort();
        return request.method + "\n" + this.getCanonicalPath(request) + "\n" + getCanonicalQuery(request) + "\n" + sortedHeaders.map(function (name) { return name + ":" + canonicalHeaders[name]; }).join("\n") + "\n\n" + sortedHeaders.join(";") + "\n" + payloadHash;
    };
    SignatureV4.prototype.createStringToSign = function (longDate, credentialScope, canonicalRequest) {
        return serdePlugin.__awaiter(this, void 0, void 0, function () {
            var hash, hashedRequest;
            return serdePlugin.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hash = new this.sha256();
                        hash.update(canonicalRequest);
                        return [4 /*yield*/, hash.digest()];
                    case 1:
                        hashedRequest = _a.sent();
                        return [2 /*return*/, ALGORITHM_IDENTIFIER + "\n" + longDate + "\n" + credentialScope + "\n" + toHex(hashedRequest)];
                }
            });
        });
    };
    SignatureV4.prototype.getCanonicalPath = function (_a) {
        var path = _a.path;
        if (this.uriEscapePath) {
            var doubleEncoded = encodeURIComponent(path.replace(/^\//, ""));
            return "/" + doubleEncoded.replace(/%2F/g, "/");
        }
        return path;
    };
    SignatureV4.prototype.getSignature = function (longDate, credentialScope, keyPromise, canonicalRequest) {
        return serdePlugin.__awaiter(this, void 0, void 0, function () {
            var stringToSign, hash, _a, _b, _c;
            return serdePlugin.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.createStringToSign(longDate, credentialScope, canonicalRequest)];
                    case 1:
                        stringToSign = _d.sent();
                        _b = (_a = this.sha256).bind;
                        return [4 /*yield*/, keyPromise];
                    case 2:
                        hash = new (_b.apply(_a, [void 0, _d.sent()]))();
                        hash.update(stringToSign);
                        _c = toHex;
                        return [4 /*yield*/, hash.digest()];
                    case 3: return [2 /*return*/, _c.apply(void 0, [_d.sent()])];
                }
            });
        });
    };
    SignatureV4.prototype.getSigningKey = function (credentials, region, shortDate, service) {
        return getSigningKey(this.sha256, credentials, shortDate, region, service || this.service);
    };
    return SignatureV4;
}());
var formatDate = function (now) {
    var longDate = iso8601(now).replace(/[\-:]/g, "");
    return {
        longDate: longDate,
        shortDate: longDate.substr(0, 8),
    };
};
var getCanonicalHeaderList = function (headers) { return Object.keys(headers).sort().join(";"); };
var normalizeRegionProvider = function (region) {
    if (typeof region === "string") {
        var promisified_1 = Promise.resolve(region);
        return function () { return promisified_1; };
    }
    else {
        return region;
    }
};
var normalizeCredentialsProvider = function (credentials) {
    if (typeof credentials === "object") {
        var promisified_2 = Promise.resolve(credentials);
        return function () { return promisified_2; };
    }
    else {
        return credentials;
    }
};

// 5 minutes buffer time the refresh the credential before it really expires
var CREDENTIAL_EXPIRE_WINDOW = 300000;
var resolveAwsAuthConfig = function (input) {
    var normalizedCreds = input.credentials
        ? normalizeCredentialProvider(input.credentials)
        : input.credentialDefaultProvider(input);
    var _a = input.signingEscapePath, signingEscapePath = _a === void 0 ? true : _a, _b = input.systemClockOffset, systemClockOffset = _b === void 0 ? input.systemClockOffset || 0 : _b, sha256 = input.sha256;
    var signer;
    if (input.signer) {
        //if signer is supplied by user, normalize it to a function returning a promise for signer.
        signer = normalizeProvider(input.signer);
    }
    else {
        //construct a provider inferring signing from region.
        signer = function () {
            return normalizeProvider(input.region)()
                .then(function (region) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () { return serdePlugin.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, input.regionInfoProvider(region)];
                    case 1: return [2 /*return*/, [(_a.sent()) || {}, region]];
                }
            }); }); })
                .then(function (_a) {
                var _b = serdePlugin.__read(_a, 2), regionInfo = _b[0], region = _b[1];
                var signingRegion = regionInfo.signingRegion, signingService = regionInfo.signingService;
                //update client's singing region and signing service config if they are resolved.
                //signing region resolving order: user supplied signingRegion -> endpoints.json inferred region -> client region
                input.signingRegion = input.signingRegion || signingRegion || region;
                //signing name resolving order:
                //user supplied signingName -> endpoints.json inferred (credential scope -> model arnNamespace) -> model service id
                input.signingName = input.signingName || signingService || input.serviceId;
                return new SignatureV4({
                    credentials: normalizedCreds,
                    region: input.signingRegion,
                    service: input.signingName,
                    sha256: sha256,
                    uriEscapePath: signingEscapePath,
                });
            });
        };
    }
    return serdePlugin.__assign(serdePlugin.__assign({}, input), { systemClockOffset: systemClockOffset,
        signingEscapePath: signingEscapePath, credentials: normalizedCreds, signer: signer });
};
var normalizeProvider = function (input) {
    if (typeof input === "object") {
        var promisified_1 = Promise.resolve(input);
        return function () { return promisified_1; };
    }
    return input;
};
var normalizeCredentialProvider = function (credentials) {
    if (typeof credentials === "function") {
        return memoize(credentials, function (credentials) {
            return credentials.expiration !== undefined &&
                credentials.expiration.getTime() - Date.now() < CREDENTIAL_EXPIRE_WINDOW;
        }, function (credentials) { return credentials.expiration !== undefined; });
    }
    return normalizeProvider(credentials);
};

/**
 * Returns a date that is corrected for clock skew.
 *
 * @param systemClockOffset The offset of the system clock in milliseconds.
 */
var getSkewCorrectedDate = function (systemClockOffset) { return new Date(Date.now() + systemClockOffset); };

/**
 * Checks if the provided date is within the skew window of 300000ms.
 *
 * @param clockTime - The time to check for skew in milliseconds.
 * @param systemClockOffset - The offset of the system clock in milliseconds.
 */
var isClockSkewed = function (clockTime, systemClockOffset) {
    return Math.abs(getSkewCorrectedDate(systemClockOffset).getTime() - clockTime) >= 300000;
};

/**
 * If clock is skewed, it returns the difference between serverTime and current time.
 * If clock is not skewed, it returns currentSystemClockOffset.
 *
 * @param clockTime The string value of the server time.
 * @param currentSystemClockOffset The current system clock offset.
 */
var getUpdatedSystemClockOffset = function (clockTime, currentSystemClockOffset) {
    var clockTimeInMs = Date.parse(clockTime);
    if (isClockSkewed(clockTimeInMs, currentSystemClockOffset)) {
        return clockTimeInMs - Date.now();
    }
    return currentSystemClockOffset;
};

var awsAuthMiddleware = function (options) {
    return function (next, context) {
        return function (args) {
            return serdePlugin.__awaiter(this, void 0, void 0, function () {
                var signer, output, _a, _b, headers, dateHeader;
                var _c;
                return serdePlugin.__generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            if (!serdePlugin.HttpRequest.isInstance(args.request))
                                return [2 /*return*/, next(args)];
                            return [4 /*yield*/, options.signer()];
                        case 1:
                            signer = _d.sent();
                            _a = next;
                            _b = [serdePlugin.__assign({}, args)];
                            _c = {};
                            return [4 /*yield*/, signer.sign(args.request, {
                                    signingDate: getSkewCorrectedDate(options.systemClockOffset),
                                    signingRegion: context["signing_region"],
                                    signingService: context["signing_service"],
                                })];
                        case 2: return [4 /*yield*/, _a.apply(void 0, [serdePlugin.__assign.apply(void 0, _b.concat([(_c.request = _d.sent(), _c)]))]).catch(function (error) {
                                if (error.ServerTime) {
                                    options.systemClockOffset = getUpdatedSystemClockOffset(error.ServerTime, options.systemClockOffset);
                                }
                                throw error;
                            })];
                        case 3:
                            output = _d.sent();
                            headers = output.response.headers;
                            dateHeader = headers && (headers.date || headers.Date);
                            if (dateHeader) {
                                options.systemClockOffset = getUpdatedSystemClockOffset(dateHeader, options.systemClockOffset);
                            }
                            return [2 /*return*/, output];
                    }
                });
            });
        };
    };
};
var awsAuthMiddlewareOptions = {
    name: "awsAuthMiddleware",
    tags: ["SIGNATURE", "AWSAUTH"],
    relation: "after",
    toMiddleware: "retryMiddleware",
    override: true,
};
var getAwsAuthPlugin = function (options) { return ({
    applyToStack: function (clientStack) {
        clientStack.addRelativeTo(awsAuthMiddleware(options), awsAuthMiddlewareOptions);
    },
}); };

/**
 * <p>Returns a set of temporary security credentials that you can use to access Amazon Web Services
 *             resources that you might not normally have access to. These temporary credentials
 *             consist of an access key ID, a secret access key, and a security token. Typically, you
 *             use <code>AssumeRole</code> within your account or for cross-account access. For a
 *             comparison of <code>AssumeRole</code> with other API operations that produce temporary
 *             credentials, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp_request.html">Requesting Temporary Security
 *                 Credentials</a> and <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp_request.html#stsapi_comparison">Comparing
 *                 the STS API operations</a> in the
 *             <i>IAM User Guide</i>.</p>
 *          <p>
 *             <b>Permissions</b>
 *          </p>
 *          <p>The temporary security credentials created by <code>AssumeRole</code> can be used to
 *          make API calls to any Amazon Web Services service with the following exception: You cannot call the
 *          STS <code>GetFederationToken</code> or <code>GetSessionToken</code> API
 *          operations.</p>
 *          <p>(Optional) You can pass inline or managed <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html#policies_session">session policies</a> to
 *          this operation. You can pass a single JSON policy document to use as an inline session
 *          policy. You can also specify up to 10 managed policies to use as managed session policies.
 *          The plaintext that you use for both inline and managed session policies can't exceed 2,048
 *          characters. Passing policies to this operation returns new
 *          temporary credentials. The resulting session's permissions are the intersection of the
 *          role's identity-based policy and the session policies. You can use the role's temporary
 *          credentials in subsequent Amazon Web Services API calls to access resources in the account that owns
 *          the role. You cannot use session policies to grant more permissions than those allowed
 *          by the identity-based policy of the role that is being assumed. For more information, see
 *             <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html#policies_session">Session
 *             Policies</a> in the <i>IAM User Guide</i>.</p>
 *          <p>To assume a role from a different account, your account must be trusted by the
 *          role. The trust relationship is defined in the role's trust policy when the role is
 *          created. That trust policy states which accounts are allowed to delegate that access to
 *          users in the account. </p>
 *          <p>A user who wants to access a role in a different account must also have permissions that
 *          are delegated from the user account administrator. The administrator must attach a policy
 *          that allows the user to call <code>AssumeRole</code> for the ARN of the role in the other
 *          account. If the user is in the same account as the role, then you can do either of the
 *          following:</p>
 *          <ul>
 *             <li>
 *                <p>Attach a policy to the user (identical to the previous user in a different
 *                account).</p>
 *             </li>
 *             <li>
 *                <p>Add the user as a principal directly in the role's trust policy.</p>
 *             </li>
 *          </ul>
 *          <p>In this case, the trust policy acts as an IAM resource-based policy. Users in the same
 *          account as the role do not need explicit permission to assume the role. For more
 *          information about trust policies and resource-based policies, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html">IAM Policies</a> in
 *          the <i>IAM User Guide</i>.</p>
 *          <p>
 *             <b>Tags</b>
 *          </p>
 *          <p>(Optional) You can pass tag key-value pairs to your session. These tags are called
 *          session tags. For more information about session tags, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_session-tags.html">Passing Session Tags in STS</a> in the
 *             <i>IAM User Guide</i>.</p>
 *          <p>An administrator must grant you the permissions necessary to pass session tags. The
 *          administrator can also create granular permissions to allow you to pass only specific
 *          session tags. For more information, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/tutorial_attribute-based-access-control.html">Tutorial: Using Tags
 *             for Attribute-Based Access Control</a> in the
 *          <i>IAM User Guide</i>.</p>
 *          <p>You can set the session tags as transitive. Transitive tags persist during role
 *          chaining. For more information, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_session-tags.html#id_session-tags_role-chaining">Chaining Roles
 *             with Session Tags</a> in the <i>IAM User Guide</i>.</p>
 *          <p>
 *             <b>Using MFA with AssumeRole</b>
 *          </p>
 *          <p>(Optional) You can include multi-factor authentication (MFA) information when you call
 *             <code>AssumeRole</code>. This is useful for cross-account scenarios to ensure that the
 *          user that assumes the role has been authenticated with an Amazon Web Services MFA device. In that
 *          scenario, the trust policy of the role being assumed includes a condition that tests for
 *          MFA authentication. If the caller does not include valid MFA information, the request to
 *          assume the role is denied. The condition in a trust policy that tests for MFA
 *          authentication might look like the following example.</p>
 *          <p>
 *             <code>"Condition": {"Bool": {"aws:MultiFactorAuthPresent": true}}</code>
 *          </p>
 *          <p>For more information, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/MFAProtectedAPI.html">Configuring MFA-Protected API Access</a>
 *          in the <i>IAM User Guide</i> guide.</p>
 *          <p>To use MFA with <code>AssumeRole</code>, you pass values for the
 *             <code>SerialNumber</code> and <code>TokenCode</code> parameters. The
 *             <code>SerialNumber</code> value identifies the user's hardware or virtual MFA device.
 *          The <code>TokenCode</code> is the time-based one-time password (TOTP) that the MFA device
 *          produces. </p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { STSClient, AssumeRoleCommand } from "@aws-sdk/client-sts"; // ES Modules import
 * // const { STSClient, AssumeRoleCommand } = require("@aws-sdk/client-sts"); // CommonJS import
 * const client = new STSClient(config);
 * const command = new AssumeRoleCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link AssumeRoleCommandInput} for command's `input` shape.
 * @see {@link AssumeRoleCommandOutput} for command's `response` shape.
 * @see {@link STSClientResolvedConfig | config} for command's `input` shape.
 *
 */
var AssumeRoleCommand = /** @class */ (function (_super) {
    serdePlugin.__extends(AssumeRoleCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function AssumeRoleCommand(input) {
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
    AssumeRoleCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(serdePlugin.getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getAwsAuthPlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "STSClient";
        var commandName = "AssumeRoleCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: AssumeRoleRequest.filterSensitiveLog,
            outputFilterSensitiveLog: AssumeRoleResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    AssumeRoleCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryAssumeRoleCommand(input, context);
    };
    AssumeRoleCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryAssumeRoleCommand(output, context);
    };
    return AssumeRoleCommand;
}(serdePlugin.Command));

/**
 * <p>Returns a set of temporary security credentials for users who have been authenticated in
 *          a mobile or web application with a web identity provider. Example providers include Amazon Cognito,
 *          Login with Amazon, Facebook, Google, or any OpenID Connect-compatible identity
 *          provider.</p>
 *          <note>
 *             <p>For mobile applications, we recommend that you use Amazon Cognito. You can use Amazon Cognito with the
 *                <a href="http://aws.amazon.com/sdkforios/">Amazon Web Services SDK for iOS Developer Guide</a> and the <a href="http://aws.amazon.com/sdkforandroid/">Amazon Web Services SDK for Android Developer Guide</a> to uniquely
 *             identify a user. You can also supply the user with a consistent identity throughout the
 *             lifetime of an application.</p>
 *             <p>To learn more about Amazon Cognito, see <a href="https://docs.aws.amazon.com/mobile/sdkforandroid/developerguide/cognito-auth.html#d0e840">Amazon Cognito Overview</a> in
 *                <i>Amazon Web Services SDK for Android Developer Guide</i> and <a href="https://docs.aws.amazon.com/mobile/sdkforios/developerguide/cognito-auth.html#d0e664">Amazon Cognito Overview</a> in the
 *                <i>Amazon Web Services SDK for iOS Developer Guide</i>.</p>
 *          </note>
 *          <p>Calling <code>AssumeRoleWithWebIdentity</code> does not require the use of Amazon Web Services
 *          security credentials. Therefore, you can distribute an application (for example, on mobile
 *          devices) that requests temporary security credentials without including long-term Amazon Web Services
 *          credentials in the application. You also don't need to deploy server-based proxy services
 *          that use long-term Amazon Web Services credentials. Instead, the identity of the caller is validated by
 *          using a token from the web identity provider. For a comparison of
 *             <code>AssumeRoleWithWebIdentity</code> with the other API operations that produce
 *          temporary credentials, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp_request.html">Requesting Temporary Security
 *             Credentials</a> and <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp_request.html#stsapi_comparison">Comparing the
 *             STS API operations</a> in the <i>IAM User Guide</i>.</p>
 *          <p>The temporary security credentials returned by this API consist of an access key ID, a
 *          secret access key, and a security token. Applications can use these temporary security
 *          credentials to sign calls to Amazon Web Services service API operations.</p>
 *          <p>
 *             <b>Session Duration</b>
 *          </p>
 *          <p>By default, the temporary security credentials created by
 *             <code>AssumeRoleWithWebIdentity</code> last for one hour. However, you can use the
 *          optional <code>DurationSeconds</code> parameter to specify the duration of your session.
 *          You can provide a value from 900 seconds (15 minutes) up to the maximum session duration
 *          setting for the role. This setting can have a value from 1 hour to 12 hours. To learn how
 *          to view the maximum value for your role, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use.html#id_roles_use_view-role-max-session">View the
 *             Maximum Session Duration Setting for a Role</a> in the
 *             <i>IAM User Guide</i>. The maximum session duration limit applies when
 *          you use the <code>AssumeRole*</code> API operations or the <code>assume-role*</code> CLI
 *          commands. However the limit does not apply when you use those operations to create a
 *          console URL. For more information, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use.html">Using IAM Roles</a> in the
 *             <i>IAM User Guide</i>. </p>
 *          <p>
 *             <b>Permissions</b>
 *          </p>
 *          <p>The temporary security credentials created by <code>AssumeRoleWithWebIdentity</code> can
 *          be used to make API calls to any Amazon Web Services service with the following exception: you cannot
 *          call the STS <code>GetFederationToken</code> or <code>GetSessionToken</code> API
 *          operations.</p>
 *          <p>(Optional) You can pass inline or managed <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html#policies_session">session policies</a> to
 *          this operation. You can pass a single JSON policy document to use as an inline session
 *          policy. You can also specify up to 10 managed policies to use as managed session policies.
 *          The plaintext that you use for both inline and managed session policies can't exceed 2,048
 *          characters. Passing policies to this operation returns new
 *          temporary credentials. The resulting session's permissions are the intersection of the
 *          role's identity-based policy and the session policies. You can use the role's temporary
 *          credentials in subsequent Amazon Web Services API calls to access resources in the account that owns
 *          the role. You cannot use session policies to grant more permissions than those allowed
 *          by the identity-based policy of the role that is being assumed. For more information, see
 *             <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html#policies_session">Session
 *             Policies</a> in the <i>IAM User Guide</i>.</p>
 *          <p>
 *             <b>Tags</b>
 *          </p>
 *          <p>(Optional) You can configure your IdP to pass attributes into your web identity token as
 *          session tags. Each session tag consists of a key name and an associated value. For more
 *          information about session tags, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_session-tags.html">Passing Session Tags in STS</a> in the
 *             <i>IAM User Guide</i>.</p>
 *          <p>You can pass up to 50 session tags. The plaintext session tag keys can’t exceed 128
 *          characters and the values can’t exceed 256 characters. For these and additional limits, see
 *             <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_iam-limits.html#reference_iam-limits-entity-length">IAM
 *             and STS Character Limits</a> in the <i>IAM User Guide</i>.</p>
 *
 *          <note>
 *             <p>An Amazon Web Services conversion compresses the passed session policies and session tags into a
 *             packed binary format that has a separate limit. Your request can fail for this limit
 *             even if your plaintext meets the other requirements. The <code>PackedPolicySize</code>
 *             response element indicates by percentage how close the policies and tags for your
 *             request are to the upper size limit.
 *             </p>
 *          </note>
 *          <p>You can pass a session tag with the same key as a tag that is
 *          attached to the role. When you do, the session tag overrides the role tag with the same
 *          key.</p>
 *          <p>An administrator must grant you the permissions necessary to pass session tags. The
 *          administrator can also create granular permissions to allow you to pass only specific
 *          session tags. For more information, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/tutorial_attribute-based-access-control.html">Tutorial: Using Tags
 *             for Attribute-Based Access Control</a> in the
 *          <i>IAM User Guide</i>.</p>
 *          <p>You can set the session tags as transitive. Transitive tags persist during role
 *          chaining. For more information, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_session-tags.html#id_session-tags_role-chaining">Chaining Roles
 *             with Session Tags</a> in the <i>IAM User Guide</i>.</p>
 *          <p>
 *             <b>Identities</b>
 *          </p>
 *          <p>Before your application can call <code>AssumeRoleWithWebIdentity</code>, you must have
 *          an identity token from a supported identity provider and create a role that the application
 *          can assume. The role that your application assumes must trust the identity provider that is
 *          associated with the identity token. In other words, the identity provider must be specified
 *          in the role's trust policy. </p>
 *          <important>
 *             <p>Calling <code>AssumeRoleWithWebIdentity</code> can result in an entry in your
 *             CloudTrail logs. The entry includes the <a href="http://openid.net/specs/openid-connect-core-1_0.html#Claims">Subject</a> of
 *             the provided web identity token. We recommend that you avoid using any personally
 *             identifiable information (PII) in this field. For example, you could instead use a GUID
 *             or a pairwise identifier, as <a href="http://openid.net/specs/openid-connect-core-1_0.html#SubjectIDTypes">suggested
 *                in the OIDC specification</a>.</p>
 *          </important>
 *          <p>For more information about how to use web identity federation and the
 *             <code>AssumeRoleWithWebIdentity</code> API, see the following resources: </p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_oidc_manual.html">Using Web Identity Federation API Operations for Mobile Apps</a> and <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp_request.html#api_assumerolewithwebidentity">Federation Through a Web-based Identity Provider</a>. </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://aws.amazon.com/blogs/aws/the-aws-web-identity-federation-playground/"> Web Identity Federation Playground</a>. Walk through the process of
 *                authenticating through Login with Amazon, Facebook, or Google, getting temporary
 *                security credentials, and then using those credentials to make a request to Amazon Web Services.
 *             </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="http://aws.amazon.com/sdkforios/">Amazon Web Services SDK for iOS Developer Guide</a> and <a href="http://aws.amazon.com/sdkforandroid/">Amazon Web Services SDK for Android Developer Guide</a>. These toolkits
 *                contain sample apps that show how to invoke the identity providers. The toolkits then
 *                show how to use the information from these providers to get and use temporary
 *                security credentials. </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="http://aws.amazon.com/articles/web-identity-federation-with-mobile-applications">Web Identity
 *                   Federation with Mobile Applications</a>. This article discusses web identity
 *                federation and shows an example of how to use web identity federation to get access
 *                to content in Amazon S3. </p>
 *             </li>
 *          </ul>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { STSClient, AssumeRoleWithWebIdentityCommand } from "@aws-sdk/client-sts"; // ES Modules import
 * // const { STSClient, AssumeRoleWithWebIdentityCommand } = require("@aws-sdk/client-sts"); // CommonJS import
 * const client = new STSClient(config);
 * const command = new AssumeRoleWithWebIdentityCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link AssumeRoleWithWebIdentityCommandInput} for command's `input` shape.
 * @see {@link AssumeRoleWithWebIdentityCommandOutput} for command's `response` shape.
 * @see {@link STSClientResolvedConfig | config} for command's `input` shape.
 *
 */
var AssumeRoleWithWebIdentityCommand = /** @class */ (function (_super) {
    serdePlugin.__extends(AssumeRoleWithWebIdentityCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function AssumeRoleWithWebIdentityCommand(input) {
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
    AssumeRoleWithWebIdentityCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(serdePlugin.getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "STSClient";
        var commandName = "AssumeRoleWithWebIdentityCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: AssumeRoleWithWebIdentityRequest.filterSensitiveLog,
            outputFilterSensitiveLog: AssumeRoleWithWebIdentityResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    AssumeRoleWithWebIdentityCommand.prototype.serialize = function (input, context) {
        return serializeAws_queryAssumeRoleWithWebIdentityCommand(input, context);
    };
    AssumeRoleWithWebIdentityCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_queryAssumeRoleWithWebIdentityCommand(output, context);
    };
    return AssumeRoleWithWebIdentityCommand;
}(serdePlugin.Command));

var ASSUME_ROLE_DEFAULT_REGION = "us-east-1";
/**
 * Inject the fallback STS region of us-east-1.
 */
var decorateDefaultRegion = function (region) {
    if (typeof region !== "function") {
        return region === undefined ? ASSUME_ROLE_DEFAULT_REGION : region;
    }
    return function () { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
        return serdePlugin.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, region()];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    _a.sent();
                    return [2 /*return*/, ASSUME_ROLE_DEFAULT_REGION];
                case 3: return [2 /*return*/];
            }
        });
    }); };
};
/**
 * The default role assumer that used by credential providers when sts:AssumeRole API is needed.
 * @internal
 */
var getDefaultRoleAssumer$1 = function (stsOptions, stsClientCtor) {
    var stsClient;
    var closureSourceCreds;
    return function (sourceCreds, params) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
        var logger, region, requestHandler, Credentials;
        return serdePlugin.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    closureSourceCreds = sourceCreds;
                    if (!stsClient) {
                        logger = stsOptions.logger, region = stsOptions.region, requestHandler = stsOptions.requestHandler;
                        stsClient = new stsClientCtor(serdePlugin.__assign({ logger: logger, 
                            // A hack to make sts client uses the credential in current closure.
                            credentialDefaultProvider: function () { return function () { return serdePlugin.__awaiter(void 0, void 0, void 0, function () { return serdePlugin.__generator(this, function (_a) {
                                return [2 /*return*/, closureSourceCreds];
                            }); }); }; }, region: decorateDefaultRegion(region || stsOptions.region) }, (requestHandler ? { requestHandler: requestHandler } : {})));
                    }
                    return [4 /*yield*/, stsClient.send(new AssumeRoleCommand(params))];
                case 1:
                    Credentials = (_a.sent()).Credentials;
                    if (!Credentials || !Credentials.AccessKeyId || !Credentials.SecretAccessKey) {
                        throw new Error("Invalid response from STS.assumeRole call with role " + params.RoleArn);
                    }
                    return [2 /*return*/, {
                            accessKeyId: Credentials.AccessKeyId,
                            secretAccessKey: Credentials.SecretAccessKey,
                            sessionToken: Credentials.SessionToken,
                            expiration: Credentials.Expiration,
                        }];
            }
        });
    }); };
};
/**
 * The default role assumer that used by credential providers when sts:AssumeRoleWithWebIdentity API is needed.
 * @internal
 */
var getDefaultRoleAssumerWithWebIdentity$1 = function (stsOptions, stsClientCtor) {
    var stsClient;
    return function (params) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
        var logger, region, requestHandler, Credentials;
        return serdePlugin.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!stsClient) {
                        logger = stsOptions.logger, region = stsOptions.region, requestHandler = stsOptions.requestHandler;
                        stsClient = new stsClientCtor(serdePlugin.__assign({ logger: logger, region: decorateDefaultRegion(region || stsOptions.region) }, (requestHandler ? { requestHandler: requestHandler } : {})));
                    }
                    return [4 /*yield*/, stsClient.send(new AssumeRoleWithWebIdentityCommand(params))];
                case 1:
                    Credentials = (_a.sent()).Credentials;
                    if (!Credentials || !Credentials.AccessKeyId || !Credentials.SecretAccessKey) {
                        throw new Error("Invalid response from STS.assumeRoleWithWebIdentity call with role " + params.RoleArn);
                    }
                    return [2 /*return*/, {
                            accessKeyId: Credentials.AccessKeyId,
                            secretAccessKey: Credentials.SecretAccessKey,
                            sessionToken: Credentials.SessionToken,
                            expiration: Credentials.Expiration,
                        }];
            }
        });
    }); };
};
/**
 * The default credential providers depend STS client to assume role with desired API: sts:assumeRole,
 * sts:assumeRoleWithWebIdentity, etc. This function decorates the default credential provider with role assumers which
 * encapsulates the process of calling STS commands. This can only be imported by AWS client packages to avoid circular
 * dependencies.
 *
 * @internal
 */
var decorateDefaultCredentialProvider$1 = function (provider) {
    return function (input) {
        return provider(serdePlugin.__assign({ roleAssumer: getDefaultRoleAssumer$1(input, input.stsClientCtor), roleAssumerWithWebIdentity: getDefaultRoleAssumerWithWebIdentity$1(input, input.stsClientCtor) }, input));
    };
};

var resolveEndpointsConfig = function (input) {
    var _a;
    return (serdePlugin.__assign(serdePlugin.__assign({}, input), { tls: (_a = input.tls) !== null && _a !== void 0 ? _a : true, endpoint: input.endpoint ? normalizeEndpoint(input) : function () { return getEndPointFromRegion(input); }, isCustomEndpoint: input.endpoint ? true : false }));
};
var normalizeEndpoint = function (input) {
    var endpoint = input.endpoint, urlParser = input.urlParser;
    if (typeof endpoint === "string") {
        var promisified_1 = Promise.resolve(urlParser(endpoint));
        return function () { return promisified_1; };
    }
    else if (typeof endpoint === "object") {
        var promisified_2 = Promise.resolve(endpoint);
        return function () { return promisified_2; };
    }
    return endpoint;
};
var getEndPointFromRegion = function (input) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var _a, tls, region, dnsHostRegex, hostname;
    var _b;
    return serdePlugin.__generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = input.tls, tls = _a === void 0 ? true : _a;
                return [4 /*yield*/, input.region()];
            case 1:
                region = _c.sent();
                dnsHostRegex = new RegExp(/^([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])$/);
                if (!dnsHostRegex.test(region)) {
                    throw new Error("Invalid region in client config");
                }
                return [4 /*yield*/, input.regionInfoProvider(region)];
            case 2:
                hostname = ((_b = (_c.sent())) !== null && _b !== void 0 ? _b : {}).hostname;
                if (!hostname) {
                    throw new Error("Cannot resolve hostname from client config");
                }
                return [2 /*return*/, input.urlParser((tls ? "https:" : "http:") + "//" + hostname)];
        }
    });
}); };

var REGION_ENV_NAME = "AWS_REGION";
var REGION_INI_NAME = "region";
var NODE_REGION_CONFIG_OPTIONS = {
    environmentVariableSelector: function (env) { return env[REGION_ENV_NAME]; },
    configFileSelector: function (profile) { return profile[REGION_INI_NAME]; },
    default: function () {
        throw new Error("Region is missing");
    },
};
var NODE_REGION_CONFIG_FILE_OPTIONS = {
    preferredFile: "credentials",
};
var resolveRegionConfig = function (input) {
    if (!input.region) {
        throw new Error("Region is missing");
    }
    return serdePlugin.__assign(serdePlugin.__assign({}, input), { region: normalizeRegion(input.region) });
};
var normalizeRegion = function (region) {
    if (typeof region === "string") {
        var promisified_1 = Promise.resolve(region);
        return function () { return promisified_1; };
    }
    return region;
};

var ENV_KEY = "AWS_ACCESS_KEY_ID";
var ENV_SECRET = "AWS_SECRET_ACCESS_KEY";
var ENV_SESSION = "AWS_SESSION_TOKEN";
var ENV_EXPIRATION = "AWS_CREDENTIAL_EXPIRATION";
/**
 * Source AWS credentials from known environment variables. If either the
 * `AWS_ACCESS_KEY_ID` or `AWS_SECRET_ACCESS_KEY` environment variable is not
 * set in this process, the provider will return a rejected promise.
 */
function fromEnv$1() {
    return function () {
        var accessKeyId = process.env[ENV_KEY];
        var secretAccessKey = process.env[ENV_SECRET];
        var expiry = process.env[ENV_EXPIRATION];
        if (accessKeyId && secretAccessKey) {
            return Promise.resolve({
                accessKeyId: accessKeyId,
                secretAccessKey: secretAccessKey,
                sessionToken: process.env[ENV_SESSION],
                expiration: expiry ? new Date(expiry) : undefined,
            });
        }
        return Promise.reject(new CredentialsProviderError("Unable to find environment variable credentials."));
    };
}

/**
 * @internal
 */
function httpRequest(options) {
    return new Promise(function (resolve, reject) {
        var _a;
        var req = http.request(serdePlugin.__assign(serdePlugin.__assign({ method: "GET" }, options), { 
            // Node.js http module doesn't accept hostname with square brackets
            // Refs: https://github.com/nodejs/node/issues/39738
            hostname: (_a = options.hostname) === null || _a === void 0 ? void 0 : _a.replace(/^\[(.+)\]$/, "$1") }));
        req.on("error", function (err) {
            reject(Object.assign(new ProviderError("Unable to connect to instance metadata service"), err));
            req.destroy();
        });
        req.on("timeout", function () {
            reject(new ProviderError("TimeoutError from instance metadata service"));
            req.destroy();
        });
        req.on("response", function (res) {
            var _a = res.statusCode, statusCode = _a === void 0 ? 400 : _a;
            if (statusCode < 200 || 300 <= statusCode) {
                reject(Object.assign(new ProviderError("Error response received from instance metadata service"), { statusCode: statusCode }));
                req.destroy();
            }
            var chunks = [];
            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
            res.on("end", function () {
                resolve(buffer.Buffer.concat(chunks));
                req.destroy();
            });
        });
        req.end();
    });
}

var isImdsCredentials = function (arg) {
    return Boolean(arg) &&
        typeof arg === "object" &&
        typeof arg.AccessKeyId === "string" &&
        typeof arg.SecretAccessKey === "string" &&
        typeof arg.Token === "string" &&
        typeof arg.Expiration === "string";
};
var fromImdsCredentials = function (creds) { return ({
    accessKeyId: creds.AccessKeyId,
    secretAccessKey: creds.SecretAccessKey,
    sessionToken: creds.Token,
    expiration: new Date(creds.Expiration),
}); };

var DEFAULT_TIMEOUT = 1000;
// The default in AWS SDK for Python and CLI (botocore) is no retry or one attempt
// https://github.com/boto/botocore/blob/646c61a7065933e75bab545b785e6098bc94c081/botocore/utils.py#L273
var DEFAULT_MAX_RETRIES = 0;
var providerConfigFromInit = function (_a) {
    var _b = _a.maxRetries, maxRetries = _b === void 0 ? DEFAULT_MAX_RETRIES : _b, _c = _a.timeout, timeout = _c === void 0 ? DEFAULT_TIMEOUT : _c;
    return ({ maxRetries: maxRetries, timeout: timeout });
};

/**
 * @internal
 */
var retry = function (toRetry, maxRetries) {
    var promise = toRetry();
    for (var i = 0; i < maxRetries; i++) {
        promise = promise.catch(toRetry);
    }
    return promise;
};

var ENV_CMDS_FULL_URI = "AWS_CONTAINER_CREDENTIALS_FULL_URI";
var ENV_CMDS_RELATIVE_URI = "AWS_CONTAINER_CREDENTIALS_RELATIVE_URI";
var ENV_CMDS_AUTH_TOKEN = "AWS_CONTAINER_AUTHORIZATION_TOKEN";
/**
 * Creates a credential provider that will source credentials from the ECS
 * Container Metadata Service
 */
var fromContainerMetadata = function (init) {
    if (init === void 0) { init = {}; }
    var _a = providerConfigFromInit(init), timeout = _a.timeout, maxRetries = _a.maxRetries;
    return function () {
        return retry(function () { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
            var requestOptions, credsResponse, _a, _b;
            return serdePlugin.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, getCmdsUri()];
                    case 1:
                        requestOptions = _c.sent();
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, requestFromEcsImds(timeout, requestOptions)];
                    case 2:
                        credsResponse = _b.apply(_a, [_c.sent()]);
                        if (!isImdsCredentials(credsResponse)) {
                            throw new CredentialsProviderError("Invalid response received from instance metadata service.");
                        }
                        return [2 /*return*/, fromImdsCredentials(credsResponse)];
                }
            });
        }); }, maxRetries);
    };
};
var requestFromEcsImds = function (timeout, options) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var buffer;
    return serdePlugin.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (process.env[ENV_CMDS_AUTH_TOKEN]) {
                    options.headers = serdePlugin.__assign(serdePlugin.__assign({}, options.headers), { Authorization: process.env[ENV_CMDS_AUTH_TOKEN] });
                }
                return [4 /*yield*/, httpRequest(serdePlugin.__assign(serdePlugin.__assign({}, options), { timeout: timeout }))];
            case 1:
                buffer = _a.sent();
                return [2 /*return*/, buffer.toString()];
        }
    });
}); };
var CMDS_IP = "169.254.170.2";
var GREENGRASS_HOSTS = {
    localhost: true,
    "127.0.0.1": true,
};
var GREENGRASS_PROTOCOLS = {
    "http:": true,
    "https:": true,
};
var getCmdsUri = function () { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var parsed;
    return serdePlugin.__generator(this, function (_a) {
        if (process.env[ENV_CMDS_RELATIVE_URI]) {
            return [2 /*return*/, {
                    hostname: CMDS_IP,
                    path: process.env[ENV_CMDS_RELATIVE_URI],
                }];
        }
        if (process.env[ENV_CMDS_FULL_URI]) {
            parsed = Url.parse(process.env[ENV_CMDS_FULL_URI]);
            if (!parsed.hostname || !(parsed.hostname in GREENGRASS_HOSTS)) {
                throw new CredentialsProviderError(parsed.hostname + " is not a valid container metadata service hostname", false);
            }
            if (!parsed.protocol || !(parsed.protocol in GREENGRASS_PROTOCOLS)) {
                throw new CredentialsProviderError(parsed.protocol + " is not a valid container metadata service protocol", false);
            }
            return [2 /*return*/, serdePlugin.__assign(serdePlugin.__assign({}, parsed), { port: parsed.port ? parseInt(parsed.port, 10) : undefined })];
        }
        throw new CredentialsProviderError("The container metadata credential provider cannot be used unless" +
            (" the " + ENV_CMDS_RELATIVE_URI + " or " + ENV_CMDS_FULL_URI + " environment") +
            " variable is set", false);
    });
}); };

/**
 * Get config value given the environment variable name or getter from
 * environment variable.
 */
var fromEnv = function (envVarSelector) {
    return function () { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
        var config;
        return serdePlugin.__generator(this, function (_a) {
            try {
                config = envVarSelector(process.env);
                if (config === undefined) {
                    throw new Error();
                }
                return [2 /*return*/, config];
            }
            catch (e) {
                throw new CredentialsProviderError(e.message || "Cannot load config from environment variables with getter: " + envVarSelector);
            }
            return [2 /*return*/];
        });
    }); };
};

var ENV_CREDENTIALS_PATH = "AWS_SHARED_CREDENTIALS_FILE";
var ENV_CONFIG_PATH = "AWS_CONFIG_FILE";
var swallowError = function () { return ({}); };
var loadSharedConfigFiles = function (init) {
    if (init === void 0) { init = {}; }
    var _a = init.filepath, filepath = _a === void 0 ? process.env[ENV_CREDENTIALS_PATH] || path.join(getHomeDir(), ".aws", "credentials") : _a, _b = init.configFilepath, configFilepath = _b === void 0 ? process.env[ENV_CONFIG_PATH] || path.join(getHomeDir(), ".aws", "config") : _b;
    return Promise.all([
        slurpFile(configFilepath).then(parseIni).then(normalizeConfigFile).catch(swallowError),
        slurpFile(filepath).then(parseIni).catch(swallowError),
    ]).then(function (parsedFiles) {
        var _a = serdePlugin.__read(parsedFiles, 2), configFile = _a[0], credentialsFile = _a[1];
        return {
            configFile: configFile,
            credentialsFile: credentialsFile,
        };
    });
};
var profileKeyRegex = /^profile\s(["'])?([^\1]+)\1$/;
var normalizeConfigFile = function (data) {
    var e_1, _a;
    var map = {};
    try {
        for (var _b = serdePlugin.__values(Object.keys(data)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            var matches = void 0;
            if (key === "default") {
                map.default = data.default;
            }
            else if ((matches = profileKeyRegex.exec(key))) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                var _d = serdePlugin.__read(matches, 3), _1 = _d[0], _2 = _d[1], normalizedKey = _d[2];
                if (normalizedKey) {
                    map[normalizedKey] = data[key];
                }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return map;
};
var profileNameBlockList = ["__proto__", "profile __proto__"];
var parseIni = function (iniData) {
    var e_2, _a;
    var map = {};
    var currentSection;
    try {
        for (var _b = serdePlugin.__values(iniData.split(/\r?\n/)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var line = _c.value;
            line = line.split(/(^|\s)[;#]/)[0]; // remove comments
            var section = line.match(/^\s*\[([^\[\]]+)]\s*$/);
            if (section) {
                currentSection = section[1];
                if (profileNameBlockList.includes(currentSection)) {
                    throw new Error("Found invalid profile name \"" + currentSection + "\"");
                }
            }
            else if (currentSection) {
                var item = line.match(/^\s*(.+?)\s*=\s*(.+?)\s*$/);
                if (item) {
                    map[currentSection] = map[currentSection] || {};
                    map[currentSection][item[1]] = item[2];
                }
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return map;
};
var slurpFile = function (path) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, "utf8", function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
};
/**
 * Get the HOME directory for the current runtime.
 *
 * @internal
 */
var getHomeDir = function () {
    var _a = process.env, HOME = _a.HOME, USERPROFILE = _a.USERPROFILE, HOMEPATH = _a.HOMEPATH, _b = _a.HOMEDRIVE, HOMEDRIVE = _b === void 0 ? "C:" + path.sep : _b;
    if (HOME)
        return HOME;
    if (USERPROFILE)
        return USERPROFILE;
    if (HOMEPATH)
        return "" + HOMEDRIVE + HOMEPATH;
    return os.homedir();
};

var DEFAULT_PROFILE$1 = "default";
var ENV_PROFILE$1 = "AWS_PROFILE";
/**
 * Get config value from the shared config files with inferred profile name.
 */
var fromSharedConfigFiles = function (configSelector, _a) {
    if (_a === void 0) { _a = {}; }
    var _b = _a.preferredFile, preferredFile = _b === void 0 ? "config" : _b, init = serdePlugin.__rest(_a, ["preferredFile"]);
    return function () { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
        var _a, loadedConfig, _b, profile, _c, configFile, credentialsFile, profileFromCredentials, profileFromConfig, mergedProfile, configValue;
        return serdePlugin.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = init.loadedConfig, loadedConfig = _a === void 0 ? loadSharedConfigFiles(init) : _a, _b = init.profile, profile = _b === void 0 ? process.env[ENV_PROFILE$1] || DEFAULT_PROFILE$1 : _b;
                    return [4 /*yield*/, loadedConfig];
                case 1:
                    _c = _d.sent(), configFile = _c.configFile, credentialsFile = _c.credentialsFile;
                    profileFromCredentials = credentialsFile[profile] || {};
                    profileFromConfig = configFile[profile] || {};
                    mergedProfile = preferredFile === "config"
                        ? serdePlugin.__assign(serdePlugin.__assign({}, profileFromCredentials), profileFromConfig) : serdePlugin.__assign(serdePlugin.__assign({}, profileFromConfig), profileFromCredentials);
                    try {
                        configValue = configSelector(mergedProfile);
                        if (configValue === undefined) {
                            throw new Error();
                        }
                        return [2 /*return*/, configValue];
                    }
                    catch (e) {
                        throw new CredentialsProviderError(e.message ||
                            "Cannot load config for profile " + profile + " in SDK configuration files with getter: " + configSelector);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
};

var isFunction = function (func) { return typeof func === "function"; };
var fromStatic = function (defaultValue) {
    return isFunction(defaultValue) ? function () { return serdePlugin.__awaiter(void 0, void 0, void 0, function () { return serdePlugin.__generator(this, function (_a) {
        return [2 /*return*/, defaultValue()];
    }); }); } : fromStatic$1(defaultValue);
};

var loadConfig = function (_a, configuration) {
    var environmentVariableSelector = _a.environmentVariableSelector, configFileSelector = _a.configFileSelector, defaultValue = _a.default;
    if (configuration === void 0) { configuration = {}; }
    return memoize(chain(fromEnv(environmentVariableSelector), fromSharedConfigFiles(configFileSelector, configuration), fromStatic(defaultValue)));
};

function parseQueryString(querystring) {
    var e_1, _a;
    var query = {};
    querystring = querystring.replace(/^\?/, "");
    if (querystring) {
        try {
            for (var _b = serdePlugin.__values(querystring.split("&")), _c = _b.next(); !_c.done; _c = _b.next()) {
                var pair = _c.value;
                var _d = serdePlugin.__read(pair.split("="), 2), key = _d[0], _e = _d[1], value = _e === void 0 ? null : _e;
                key = decodeURIComponent(key);
                if (value) {
                    value = decodeURIComponent(value);
                }
                if (!(key in query)) {
                    query[key] = value;
                }
                else if (Array.isArray(query[key])) {
                    query[key].push(value);
                }
                else {
                    query[key] = [query[key], value];
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    return query;
}

var parseUrl = function (url) {
    var _a = new URL(url), hostname = _a.hostname, pathname = _a.pathname, port = _a.port, protocol = _a.protocol, search = _a.search;
    var query;
    if (search) {
        query = parseQueryString(search);
    }
    return {
        hostname: hostname,
        port: port ? parseInt(port) : undefined,
        protocol: protocol,
        path: pathname,
        query: query,
    };
};

var Endpoint;
(function (Endpoint) {
    Endpoint["IPv4"] = "http://169.254.169.254";
    Endpoint["IPv6"] = "http://[fd00:ec2::254]";
})(Endpoint || (Endpoint = {}));

var ENV_ENDPOINT_NAME = "AWS_EC2_METADATA_SERVICE_ENDPOINT";
var CONFIG_ENDPOINT_NAME = "ec2_metadata_service_endpoint";
var ENDPOINT_CONFIG_OPTIONS = {
    environmentVariableSelector: function (env) { return env[ENV_ENDPOINT_NAME]; },
    configFileSelector: function (profile) { return profile[CONFIG_ENDPOINT_NAME]; },
    default: undefined,
};

var EndpointMode;
(function (EndpointMode) {
    EndpointMode["IPv4"] = "IPv4";
    EndpointMode["IPv6"] = "IPv6";
})(EndpointMode || (EndpointMode = {}));

var ENV_ENDPOINT_MODE_NAME = "AWS_EC2_METADATA_SERVICE_ENDPOINT_MODE";
var CONFIG_ENDPOINT_MODE_NAME = "ec2_metadata_service_endpoint_mode";
var ENDPOINT_MODE_CONFIG_OPTIONS = {
    environmentVariableSelector: function (env) { return env[ENV_ENDPOINT_MODE_NAME]; },
    configFileSelector: function (profile) { return profile[CONFIG_ENDPOINT_MODE_NAME]; },
    default: EndpointMode.IPv4,
};

/**
 * Returns the host to use for instance metadata service call.
 *
 * The host is read from endpoint which can be set either in
 * {@link ENV_ENDPOINT_NAME} environment variable or {@link CONFIG_ENDPOINT_NAME}
 * configuration property.
 *
 * If endpoint is not set, then endpoint mode is read either from
 * {@link ENV_ENDPOINT_MODE_NAME} environment variable or {@link CONFIG_ENDPOINT_MODE_NAME}
 * configuration property. If endpoint mode is not set, then default endpoint mode
 * {@link EndpointMode.IPv4} is used.
 *
 * If endpoint mode is set to {@link EndpointMode.IPv4}, then the host is {@link Endpoint.IPv4}.
 * If endpoint mode is set to {@link EndpointMode.IPv6}, then the host is {@link Endpoint.IPv6}.
 *
 * @returns Host to use for instance metadata service call.
 */
var getInstanceMetadataEndpoint = function () { return serdePlugin.__awaiter(void 0, void 0, void 0, function () { var _a, _b; return serdePlugin.__generator(this, function (_c) {
    switch (_c.label) {
        case 0:
            _a = parseUrl;
            return [4 /*yield*/, getFromEndpointConfig()];
        case 1:
            _b = (_c.sent());
            if (_b) return [3 /*break*/, 3];
            return [4 /*yield*/, getFromEndpointModeConfig()];
        case 2:
            _b = (_c.sent());
            _c.label = 3;
        case 3: return [2 /*return*/, _a.apply(void 0, [_b])];
    }
}); }); };
var getFromEndpointConfig = function () { return serdePlugin.__awaiter(void 0, void 0, void 0, function () { return serdePlugin.__generator(this, function (_a) {
    return [2 /*return*/, loadConfig(ENDPOINT_CONFIG_OPTIONS)()];
}); }); };
var getFromEndpointModeConfig = function () { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var endpointMode;
    return serdePlugin.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, loadConfig(ENDPOINT_MODE_CONFIG_OPTIONS)()];
            case 1:
                endpointMode = _a.sent();
                switch (endpointMode) {
                    case EndpointMode.IPv4:
                        return [2 /*return*/, Endpoint.IPv4];
                    case EndpointMode.IPv6:
                        return [2 /*return*/, Endpoint.IPv6];
                    default:
                        throw new Error("Unsupported endpoint mode: " + endpointMode + "." + (" Select from " + Object.values(EndpointMode)));
                }
        }
    });
}); };

var IMDS_PATH = "/latest/meta-data/iam/security-credentials/";
var IMDS_TOKEN_PATH = "/latest/api/token";
/**
 * Creates a credential provider that will source credentials from the EC2
 * Instance Metadata Service
 */
var fromInstanceMetadata = function (init) {
    if (init === void 0) { init = {}; }
    // when set to true, metadata service will not fetch token
    var disableFetchToken = false;
    var _a = providerConfigFromInit(init), timeout = _a.timeout, maxRetries = _a.maxRetries;
    var getCredentials = function (maxRetries, options) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
        var profile;
        return serdePlugin.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, retry(function () { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
                        var profile, err_1;
                        return serdePlugin.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, getProfile(options)];
                                case 1:
                                    profile = _a.sent();
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_1 = _a.sent();
                                    if (err_1.statusCode === 401) {
                                        disableFetchToken = false;
                                    }
                                    throw err_1;
                                case 3: return [2 /*return*/, profile];
                            }
                        });
                    }); }, maxRetries)];
                case 1:
                    profile = (_a.sent()).trim();
                    return [2 /*return*/, retry(function () { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
                            var creds, err_2;
                            return serdePlugin.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, getCredentialsFromProfile(profile, options)];
                                    case 1:
                                        creds = _a.sent();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        err_2 = _a.sent();
                                        if (err_2.statusCode === 401) {
                                            disableFetchToken = false;
                                        }
                                        throw err_2;
                                    case 3: return [2 /*return*/, creds];
                                }
                            });
                        }); }, maxRetries)];
            }
        });
    }); };
    return function () { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
        var endpoint, token, error_1;
        return serdePlugin.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getInstanceMetadataEndpoint()];
                case 1:
                    endpoint = _a.sent();
                    if (!disableFetchToken) return [3 /*break*/, 2];
                    return [2 /*return*/, getCredentials(maxRetries, serdePlugin.__assign(serdePlugin.__assign({}, endpoint), { timeout: timeout }))];
                case 2:
                    token = void 0;
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, getMetadataToken(serdePlugin.__assign(serdePlugin.__assign({}, endpoint), { timeout: timeout }))];
                case 4:
                    token = (_a.sent()).toString();
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    if ((error_1 === null || error_1 === void 0 ? void 0 : error_1.statusCode) === 400) {
                        throw Object.assign(error_1, {
                            message: "EC2 Metadata token request returned error",
                        });
                    }
                    else if (error_1.message === "TimeoutError" || [403, 404, 405].includes(error_1.statusCode)) {
                        disableFetchToken = true;
                    }
                    return [2 /*return*/, getCredentials(maxRetries, serdePlugin.__assign(serdePlugin.__assign({}, endpoint), { timeout: timeout }))];
                case 6: return [2 /*return*/, getCredentials(maxRetries, serdePlugin.__assign(serdePlugin.__assign({}, endpoint), { headers: {
                            "x-aws-ec2-metadata-token": token,
                        }, timeout: timeout }))];
            }
        });
    }); };
};
var getMetadataToken = function (options) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    return serdePlugin.__generator(this, function (_a) {
        return [2 /*return*/, httpRequest(serdePlugin.__assign(serdePlugin.__assign({}, options), { path: IMDS_TOKEN_PATH, method: "PUT", headers: {
                    "x-aws-ec2-metadata-token-ttl-seconds": "21600",
                } }))];
    });
}); };
var getProfile = function (options) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () { return serdePlugin.__generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, httpRequest(serdePlugin.__assign(serdePlugin.__assign({}, options), { path: IMDS_PATH }))];
        case 1: return [2 /*return*/, (_a.sent()).toString()];
    }
}); }); };
var getCredentialsFromProfile = function (profile, options) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var credsResponse, _a, _b;
    return serdePlugin.__generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = (_a = JSON).parse;
                return [4 /*yield*/, httpRequest(serdePlugin.__assign(serdePlugin.__assign({}, options), { path: IMDS_PATH + profile }))];
            case 1:
                credsResponse = _b.apply(_a, [(_c.sent()).toString()]);
                if (!isImdsCredentials(credsResponse)) {
                    throw new CredentialsProviderError("Invalid response received from instance metadata service.");
                }
                return [2 /*return*/, fromImdsCredentials(credsResponse)];
        }
    });
}); };

var name = "@aws-sdk/client-sso";
var description = "AWS SDK for JavaScript Sso Client for Node.js, Browser and React Native";
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
	"@aws-sdk/config-resolver": "3.27.0",
	"@aws-sdk/fetch-http-handler": "3.25.0",
	"@aws-sdk/hash-node": "3.25.0",
	"@aws-sdk/invalid-dependency": "3.25.0",
	"@aws-sdk/middleware-content-length": "3.25.0",
	"@aws-sdk/middleware-host-header": "3.25.0",
	"@aws-sdk/middleware-logger": "3.25.0",
	"@aws-sdk/middleware-retry": "3.27.0",
	"@aws-sdk/middleware-serde": "3.25.0",
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
var homepage = "https://github.com/aws/aws-sdk-js-v3/tree/main/clients/client-sso";
var repository = {
	type: "git",
	url: "https://github.com/aws/aws-sdk-js-v3.git",
	directory: "clients/client-sso"
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

var fromArrayBuffer = function (input, offset, length) {
    if (offset === void 0) { offset = 0; }
    if (length === void 0) { length = input.byteLength - offset; }
    if (!isArrayBuffer(input)) {
        throw new TypeError("The \"input\" argument must be ArrayBuffer. Received type " + typeof input + " (" + input + ")");
    }
    return buffer.Buffer.from(input, offset, length);
};
var fromString = function (input, encoding) {
    if (typeof input !== "string") {
        throw new TypeError("The \"input\" argument must be of type string. Received type " + typeof input + " (" + input + ")");
    }
    return encoding ? buffer.Buffer.from(input, encoding) : buffer.Buffer.from(input);
};

var Hash = /** @class */ (function () {
    function Hash(algorithmIdentifier, secret) {
        this.hash = secret ? crypto.createHmac(algorithmIdentifier, castSourceData(secret)) : crypto.createHash(algorithmIdentifier);
    }
    Hash.prototype.update = function (toHash, encoding) {
        this.hash.update(castSourceData(toHash, encoding));
    };
    Hash.prototype.digest = function () {
        return Promise.resolve(this.hash.digest());
    };
    return Hash;
}());
function castSourceData(toCast, encoding) {
    if (buffer.Buffer.isBuffer(toCast)) {
        return toCast;
    }
    if (typeof toCast === "string") {
        return fromString(toCast, encoding);
    }
    if (ArrayBuffer.isView(toCast)) {
        return fromArrayBuffer(toCast.buffer, toCast.byteOffset, toCast.byteLength);
    }
    return fromArrayBuffer(toCast);
}

var retryMiddleware = function (options) {
    return function (next, context) {
        return function (args) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
            var retryStrategy;
            return serdePlugin.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, options.retryStrategy()];
                    case 1:
                        retryStrategy = _a.sent();
                        if (retryStrategy === null || retryStrategy === void 0 ? void 0 : retryStrategy.mode)
                            context.userAgent = serdePlugin.__spreadArray(serdePlugin.__spreadArray([], serdePlugin.__read((context.userAgent || []))), [["cfg/retry-mode", retryStrategy.mode]]);
                        return [2 /*return*/, retryStrategy.retry(next, args)];
                }
            });
        }); };
    };
};
var retryMiddlewareOptions = {
    name: "retryMiddleware",
    tags: ["RETRY"],
    step: "finalizeRequest",
    priority: "high",
    override: true,
};
var getRetryPlugin = function (options) { return ({
    applyToStack: function (clientStack) {
        clientStack.add(retryMiddleware(options), retryMiddlewareOptions);
    },
}); };

/**
 * The base number of milliseconds to use in calculating a suitable cool-down
 * time when a retryable error is encountered.
 */
var DEFAULT_RETRY_DELAY_BASE = 100;
/**
 * The maximum amount of time (in milliseconds) that will be used as a delay
 * between retry attempts.
 */
var MAXIMUM_RETRY_DELAY = 20 * 1000;
/**
 * The retry delay base (in milliseconds) to use when a throttling error is
 * encountered.
 */
var THROTTLING_RETRY_DELAY_BASE = 500;
/**
 * Initial number of retry tokens in Retry Quota
 */
var INITIAL_RETRY_TOKENS = 500;
/**
 * The total amount of retry tokens to be decremented from retry token balance.
 */
var RETRY_COST = 5;
/**
 * The total amount of retry tokens to be decremented from retry token balance
 * when a throttling error is encountered.
 */
var TIMEOUT_RETRY_COST = 10;
/**
 * The total amount of retry token to be incremented from retry token balance
 * if an SDK operation invocation succeeds without requiring a retry request.
 */
var NO_RETRY_INCREMENT = 1;
/**
 * Header name for SDK invocation ID
 */
var INVOCATION_ID_HEADER = "amz-sdk-invocation-id";
/**
 * Header name for request retry information.
 */
var REQUEST_HEADER = "amz-sdk-request";

/**
 * Errors encountered when the client clock and server clock cannot agree on the
 * current time.
 *
 * These errors are retryable, assuming the SDK has enabled clock skew
 * correction.
 */
var CLOCK_SKEW_ERROR_CODES = [
    "AuthFailure",
    "InvalidSignatureException",
    "RequestExpired",
    "RequestInTheFuture",
    "RequestTimeTooSkewed",
    "SignatureDoesNotMatch",
];
/**
 * Errors that indicate the SDK is being throttled.
 *
 * These errors are always retryable.
 */
var THROTTLING_ERROR_CODES = [
    "BandwidthLimitExceeded",
    "EC2ThrottledException",
    "LimitExceededException",
    "PriorRequestNotComplete",
    "ProvisionedThroughputExceededException",
    "RequestLimitExceeded",
    "RequestThrottled",
    "RequestThrottledException",
    "SlowDown",
    "ThrottledException",
    "Throttling",
    "ThrottlingException",
    "TooManyRequestsException",
    "TransactionInProgressException", // DynamoDB
];
/**
 * Error codes that indicate transient issues
 */
var TRANSIENT_ERROR_CODES = ["AbortError", "TimeoutError", "RequestTimeout", "RequestTimeoutException"];
/**
 * Error codes that indicate transient issues
 */
var TRANSIENT_ERROR_STATUS_CODES = [500, 502, 503, 504];

var isRetryableByTrait = function (error) { return error.$retryable !== undefined; };
var isClockSkewError = function (error) { return CLOCK_SKEW_ERROR_CODES.includes(error.name); };
var isThrottlingError = function (error) {
    var _a, _b;
    return ((_a = error.$metadata) === null || _a === void 0 ? void 0 : _a.httpStatusCode) === 429 ||
        THROTTLING_ERROR_CODES.includes(error.name) ||
        ((_b = error.$retryable) === null || _b === void 0 ? void 0 : _b.throttling) == true;
};
var isTransientError = function (error) {
    var _a;
    return TRANSIENT_ERROR_CODES.includes(error.name) ||
        TRANSIENT_ERROR_STATUS_CODES.includes(((_a = error.$metadata) === null || _a === void 0 ? void 0 : _a.httpStatusCode) || 0);
};

const rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate

let poolPtr = rnds8Pool.length;
function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    crypto__default['default'].randomFillSync(rnds8Pool);
    poolPtr = 0;
  }

  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}

var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

function validate(uuid) {
  return typeof uuid === 'string' && REGEX.test(uuid);
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  const uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

function v4(options, buf, offset) {
  options = options || {};
  const rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return stringify(rnds);
}

var RETRY_MODES;
(function (RETRY_MODES) {
    RETRY_MODES["STANDARD"] = "standard";
    RETRY_MODES["ADAPTIVE"] = "adaptive";
})(RETRY_MODES || (RETRY_MODES = {}));
/**
 * The default value for how many HTTP requests an SDK should make for a
 * single SDK operation invocation before giving up
 */
var DEFAULT_MAX_ATTEMPTS = 3;
/**
 * The default retry algorithm to use.
 */
var DEFAULT_RETRY_MODE = RETRY_MODES.STANDARD;

var getDefaultRetryQuota = function (initialRetryTokens, options) {
    var _a, _b, _c;
    var MAX_CAPACITY = initialRetryTokens;
    var noRetryIncrement = (_a = options === null || options === void 0 ? void 0 : options.noRetryIncrement) !== null && _a !== void 0 ? _a : NO_RETRY_INCREMENT;
    var retryCost = (_b = options === null || options === void 0 ? void 0 : options.retryCost) !== null && _b !== void 0 ? _b : RETRY_COST;
    var timeoutRetryCost = (_c = options === null || options === void 0 ? void 0 : options.timeoutRetryCost) !== null && _c !== void 0 ? _c : TIMEOUT_RETRY_COST;
    var availableCapacity = initialRetryTokens;
    var getCapacityAmount = function (error) { return (error.name === "TimeoutError" ? timeoutRetryCost : retryCost); };
    var hasRetryTokens = function (error) { return getCapacityAmount(error) <= availableCapacity; };
    var retrieveRetryTokens = function (error) {
        if (!hasRetryTokens(error)) {
            // retryStrategy should stop retrying, and return last error
            throw new Error("No retry token available");
        }
        var capacityAmount = getCapacityAmount(error);
        availableCapacity -= capacityAmount;
        return capacityAmount;
    };
    var releaseRetryTokens = function (capacityReleaseAmount) {
        availableCapacity += capacityReleaseAmount !== null && capacityReleaseAmount !== void 0 ? capacityReleaseAmount : noRetryIncrement;
        availableCapacity = Math.min(availableCapacity, MAX_CAPACITY);
    };
    return Object.freeze({
        hasRetryTokens: hasRetryTokens,
        retrieveRetryTokens: retrieveRetryTokens,
        releaseRetryTokens: releaseRetryTokens,
    });
};

/**
 * Calculate a capped, fully-jittered exponential backoff time.
 */
var defaultDelayDecider = function (delayBase, attempts) {
    return Math.floor(Math.min(MAXIMUM_RETRY_DELAY, Math.random() * Math.pow(2, attempts) * delayBase));
};

var defaultRetryDecider = function (error) {
    if (!error) {
        return false;
    }
    return isRetryableByTrait(error) || isClockSkewError(error) || isThrottlingError(error) || isTransientError(error);
};

var StandardRetryStrategy = /** @class */ (function () {
    function StandardRetryStrategy(maxAttemptsProvider, options) {
        var _a, _b, _c;
        this.maxAttemptsProvider = maxAttemptsProvider;
        this.mode = RETRY_MODES.STANDARD;
        this.retryDecider = (_a = options === null || options === void 0 ? void 0 : options.retryDecider) !== null && _a !== void 0 ? _a : defaultRetryDecider;
        this.delayDecider = (_b = options === null || options === void 0 ? void 0 : options.delayDecider) !== null && _b !== void 0 ? _b : defaultDelayDecider;
        this.retryQuota = (_c = options === null || options === void 0 ? void 0 : options.retryQuota) !== null && _c !== void 0 ? _c : getDefaultRetryQuota(INITIAL_RETRY_TOKENS);
    }
    StandardRetryStrategy.prototype.shouldRetry = function (error, attempts, maxAttempts) {
        return attempts < maxAttempts && this.retryDecider(error) && this.retryQuota.hasRetryTokens(error);
    };
    StandardRetryStrategy.prototype.getMaxAttempts = function () {
        return serdePlugin.__awaiter(this, void 0, void 0, function () {
            var maxAttempts;
            return serdePlugin.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.maxAttemptsProvider()];
                    case 1:
                        maxAttempts = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a.sent();
                        maxAttempts = DEFAULT_MAX_ATTEMPTS;
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, maxAttempts];
                }
            });
        });
    };
    StandardRetryStrategy.prototype.retry = function (next, args, options) {
        return serdePlugin.__awaiter(this, void 0, void 0, function () {
            var retryTokenAmount, attempts, totalDelay, maxAttempts, request, _loop_1, this_1, state_1;
            return serdePlugin.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        attempts = 0;
                        totalDelay = 0;
                        return [4 /*yield*/, this.getMaxAttempts()];
                    case 1:
                        maxAttempts = _a.sent();
                        request = args.request;
                        if (serdePlugin.HttpRequest.isInstance(request)) {
                            request.headers[INVOCATION_ID_HEADER] = v4();
                        }
                        _loop_1 = function () {
                            var _b, response, output, e_1, err, delay_1;
                            return serdePlugin.__generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        _c.trys.push([0, 4, , 7]);
                                        if (serdePlugin.HttpRequest.isInstance(request)) {
                                            request.headers[REQUEST_HEADER] = "attempt=" + (attempts + 1) + "; max=" + maxAttempts;
                                        }
                                        if (!(options === null || options === void 0 ? void 0 : options.beforeRequest)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, options.beforeRequest()];
                                    case 1:
                                        _c.sent();
                                        _c.label = 2;
                                    case 2: return [4 /*yield*/, next(args)];
                                    case 3:
                                        _b = _c.sent(), response = _b.response, output = _b.output;
                                        if (options === null || options === void 0 ? void 0 : options.afterRequest) {
                                            options.afterRequest(response);
                                        }
                                        this_1.retryQuota.releaseRetryTokens(retryTokenAmount);
                                        output.$metadata.attempts = attempts + 1;
                                        output.$metadata.totalRetryDelay = totalDelay;
                                        return [2 /*return*/, { value: { response: response, output: output } }];
                                    case 4:
                                        e_1 = _c.sent();
                                        err = asSdkError(e_1);
                                        attempts++;
                                        if (!this_1.shouldRetry(err, attempts, maxAttempts)) return [3 /*break*/, 6];
                                        retryTokenAmount = this_1.retryQuota.retrieveRetryTokens(err);
                                        delay_1 = this_1.delayDecider(isThrottlingError(err) ? THROTTLING_RETRY_DELAY_BASE : DEFAULT_RETRY_DELAY_BASE, attempts);
                                        totalDelay += delay_1;
                                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, delay_1); })];
                                    case 5:
                                        _c.sent();
                                        return [2 /*return*/, "continue"];
                                    case 6:
                                        if (!err.$metadata) {
                                            err.$metadata = {};
                                        }
                                        err.$metadata.attempts = attempts;
                                        err.$metadata.totalRetryDelay = totalDelay;
                                        throw err;
                                    case 7: return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _a.label = 2;
                    case 2:
                        return [5 /*yield**/, _loop_1()];
                    case 3:
                        state_1 = _a.sent();
                        if (typeof state_1 === "object")
                            return [2 /*return*/, state_1.value];
                        return [3 /*break*/, 2];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return StandardRetryStrategy;
}());
var asSdkError = function (error) {
    if (error instanceof Error)
        return error;
    if (error instanceof Object)
        return Object.assign(new Error(), error);
    if (typeof error === "string")
        return new Error(error);
    return new Error("AWS SDK error wrapper for " + error);
};

var DefaultRateLimiter = /** @class */ (function () {
    function DefaultRateLimiter(options) {
        var _a, _b, _c, _d, _e;
        // Pre-set state variables
        this.currentCapacity = 0;
        this.enabled = false;
        this.lastMaxRate = 0;
        this.measuredTxRate = 0;
        this.requestCount = 0;
        this.lastTimestamp = 0;
        this.timeWindow = 0;
        this.beta = (_a = options === null || options === void 0 ? void 0 : options.beta) !== null && _a !== void 0 ? _a : 0.7;
        this.minCapacity = (_b = options === null || options === void 0 ? void 0 : options.minCapacity) !== null && _b !== void 0 ? _b : 1;
        this.minFillRate = (_c = options === null || options === void 0 ? void 0 : options.minFillRate) !== null && _c !== void 0 ? _c : 0.5;
        this.scaleConstant = (_d = options === null || options === void 0 ? void 0 : options.scaleConstant) !== null && _d !== void 0 ? _d : 0.4;
        this.smooth = (_e = options === null || options === void 0 ? void 0 : options.smooth) !== null && _e !== void 0 ? _e : 0.8;
        var currentTimeInSeconds = this.getCurrentTimeInSeconds();
        this.lastThrottleTime = currentTimeInSeconds;
        this.lastTxRateBucket = Math.floor(this.getCurrentTimeInSeconds());
        this.fillRate = this.minFillRate;
        this.maxCapacity = this.minCapacity;
    }
    DefaultRateLimiter.prototype.getCurrentTimeInSeconds = function () {
        return Date.now() / 1000;
    };
    DefaultRateLimiter.prototype.getSendToken = function () {
        return serdePlugin.__awaiter(this, void 0, void 0, function () {
            return serdePlugin.__generator(this, function (_a) {
                return [2 /*return*/, this.acquireTokenBucket(1)];
            });
        });
    };
    DefaultRateLimiter.prototype.acquireTokenBucket = function (amount) {
        return serdePlugin.__awaiter(this, void 0, void 0, function () {
            var delay_1;
            return serdePlugin.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Client side throttling is not enabled until we see a throttling error.
                        if (!this.enabled) {
                            return [2 /*return*/];
                        }
                        this.refillTokenBucket();
                        if (!(amount > this.currentCapacity)) return [3 /*break*/, 2];
                        delay_1 = ((amount - this.currentCapacity) / this.fillRate) * 1000;
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, delay_1); })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.currentCapacity = this.currentCapacity - amount;
                        return [2 /*return*/];
                }
            });
        });
    };
    DefaultRateLimiter.prototype.refillTokenBucket = function () {
        var timestamp = this.getCurrentTimeInSeconds();
        if (!this.lastTimestamp) {
            this.lastTimestamp = timestamp;
            return;
        }
        var fillAmount = (timestamp - this.lastTimestamp) * this.fillRate;
        this.currentCapacity = Math.min(this.maxCapacity, this.currentCapacity + fillAmount);
        this.lastTimestamp = timestamp;
    };
    DefaultRateLimiter.prototype.updateClientSendingRate = function (response) {
        var calculatedRate;
        this.updateMeasuredRate();
        if (isThrottlingError(response)) {
            var rateToUse = !this.enabled ? this.measuredTxRate : Math.min(this.measuredTxRate, this.fillRate);
            this.lastMaxRate = rateToUse;
            this.calculateTimeWindow();
            this.lastThrottleTime = this.getCurrentTimeInSeconds();
            calculatedRate = this.cubicThrottle(rateToUse);
            this.enableTokenBucket();
        }
        else {
            this.calculateTimeWindow();
            calculatedRate = this.cubicSuccess(this.getCurrentTimeInSeconds());
        }
        var newRate = Math.min(calculatedRate, 2 * this.measuredTxRate);
        this.updateTokenBucketRate(newRate);
    };
    DefaultRateLimiter.prototype.calculateTimeWindow = function () {
        this.timeWindow = this.getPrecise(Math.pow((this.lastMaxRate * (1 - this.beta)) / this.scaleConstant, 1 / 3));
    };
    DefaultRateLimiter.prototype.cubicThrottle = function (rateToUse) {
        return this.getPrecise(rateToUse * this.beta);
    };
    DefaultRateLimiter.prototype.cubicSuccess = function (timestamp) {
        return this.getPrecise(this.scaleConstant * Math.pow(timestamp - this.lastThrottleTime - this.timeWindow, 3) + this.lastMaxRate);
    };
    DefaultRateLimiter.prototype.enableTokenBucket = function () {
        this.enabled = true;
    };
    DefaultRateLimiter.prototype.updateTokenBucketRate = function (newRate) {
        // Refill based on our current rate before we update to the new fill rate.
        this.refillTokenBucket();
        this.fillRate = Math.max(newRate, this.minFillRate);
        this.maxCapacity = Math.max(newRate, this.minCapacity);
        // When we scale down we can't have a current capacity that exceeds our maxCapacity.
        this.currentCapacity = Math.min(this.currentCapacity, this.maxCapacity);
    };
    DefaultRateLimiter.prototype.updateMeasuredRate = function () {
        var t = this.getCurrentTimeInSeconds();
        var timeBucket = Math.floor(t * 2) / 2;
        this.requestCount++;
        if (timeBucket > this.lastTxRateBucket) {
            var currentRate = this.requestCount / (timeBucket - this.lastTxRateBucket);
            this.measuredTxRate = this.getPrecise(currentRate * this.smooth + this.measuredTxRate * (1 - this.smooth));
            this.requestCount = 0;
            this.lastTxRateBucket = timeBucket;
        }
    };
    DefaultRateLimiter.prototype.getPrecise = function (num) {
        return parseFloat(num.toFixed(8));
    };
    return DefaultRateLimiter;
}());

var AdaptiveRetryStrategy = /** @class */ (function (_super) {
    serdePlugin.__extends(AdaptiveRetryStrategy, _super);
    function AdaptiveRetryStrategy(maxAttemptsProvider, options) {
        var _this = this;
        var _a = options !== null && options !== void 0 ? options : {}, rateLimiter = _a.rateLimiter, superOptions = serdePlugin.__rest(_a, ["rateLimiter"]);
        _this = _super.call(this, maxAttemptsProvider, superOptions) || this;
        _this.rateLimiter = rateLimiter !== null && rateLimiter !== void 0 ? rateLimiter : new DefaultRateLimiter();
        _this.mode = RETRY_MODES.ADAPTIVE;
        return _this;
    }
    AdaptiveRetryStrategy.prototype.retry = function (next, args) {
        return serdePlugin.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return serdePlugin.__generator(this, function (_a) {
                return [2 /*return*/, _super.prototype.retry.call(this, next, args, {
                        beforeRequest: function () { return serdePlugin.__awaiter(_this, void 0, void 0, function () {
                            return serdePlugin.__generator(this, function (_a) {
                                return [2 /*return*/, this.rateLimiter.getSendToken()];
                            });
                        }); },
                        afterRequest: function (response) {
                            _this.rateLimiter.updateClientSendingRate(response);
                        },
                    })];
            });
        });
    };
    return AdaptiveRetryStrategy;
}(StandardRetryStrategy));

var ENV_MAX_ATTEMPTS = "AWS_MAX_ATTEMPTS";
var CONFIG_MAX_ATTEMPTS = "max_attempts";
var NODE_MAX_ATTEMPT_CONFIG_OPTIONS = {
    environmentVariableSelector: function (env) {
        var value = env[ENV_MAX_ATTEMPTS];
        if (!value)
            return undefined;
        var maxAttempt = parseInt(value);
        if (Number.isNaN(maxAttempt)) {
            throw new Error("Environment variable " + ENV_MAX_ATTEMPTS + " mast be a number, got \"" + value + "\"");
        }
        return maxAttempt;
    },
    configFileSelector: function (profile) {
        var value = profile[CONFIG_MAX_ATTEMPTS];
        if (!value)
            return undefined;
        var maxAttempt = parseInt(value);
        if (Number.isNaN(maxAttempt)) {
            throw new Error("Shared config file entry " + CONFIG_MAX_ATTEMPTS + " mast be a number, got \"" + value + "\"");
        }
        return maxAttempt;
    },
    default: DEFAULT_MAX_ATTEMPTS,
};
var resolveRetryConfig = function (input) {
    var maxAttempts = normalizeMaxAttempts(input.maxAttempts);
    return serdePlugin.__assign(serdePlugin.__assign({}, input), { maxAttempts: maxAttempts, retryStrategy: function () { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
            var retryMode, _a;
            return serdePlugin.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (input.retryStrategy) {
                            return [2 /*return*/, input.retryStrategy];
                        }
                        _a = input.retryMode;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, input.retryModeProvider()];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        retryMode = _a;
                        if (retryMode === RETRY_MODES.ADAPTIVE) {
                            return [2 /*return*/, new AdaptiveRetryStrategy(maxAttempts)];
                        }
                        return [2 /*return*/, new StandardRetryStrategy(maxAttempts)];
                }
            });
        }); } });
};
var normalizeMaxAttempts = function (maxAttempts) {
    if (maxAttempts === void 0) { maxAttempts = DEFAULT_MAX_ATTEMPTS; }
    if (typeof maxAttempts === "number") {
        var promisified_1 = Promise.resolve(maxAttempts);
        return function () { return promisified_1; };
    }
    return maxAttempts;
};
var ENV_RETRY_MODE = "AWS_RETRY_MODE";
var CONFIG_RETRY_MODE = "retry_mode";
var NODE_RETRY_MODE_CONFIG_OPTIONS = {
    environmentVariableSelector: function (env) { return env[ENV_RETRY_MODE]; },
    configFileSelector: function (profile) { return profile[CONFIG_RETRY_MODE]; },
    default: DEFAULT_RETRY_MODE,
};

function buildQueryString(query) {
    var e_1, _a;
    var parts = [];
    try {
        for (var _b = serdePlugin.__values(Object.keys(query).sort()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            var value = query[key];
            key = escapeUri(key);
            if (Array.isArray(value)) {
                for (var i = 0, iLen = value.length; i < iLen; i++) {
                    parts.push(key + "=" + escapeUri(value[i]));
                }
            }
            else {
                var qsEntry = key;
                if (value || typeof value === "string") {
                    qsEntry += "=" + escapeUri(value);
                }
                parts.push(qsEntry);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return parts.join("&");
}

/**
 * Node.js system error codes that indicate timeout.
 */
var NODEJS_TIMEOUT_ERROR_CODES = ["ECONNRESET", "EPIPE", "ETIMEDOUT"];

var getTransformedHeaders = function (headers) {
    var e_1, _a;
    var transformedHeaders = {};
    try {
        for (var _b = serdePlugin.__values(Object.keys(headers)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var name = _c.value;
            var headerValues = headers[name];
            transformedHeaders[name] = Array.isArray(headerValues) ? headerValues.join(",") : headerValues;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return transformedHeaders;
};

var setConnectionTimeout = function (request, reject, timeoutInMs) {
    if (timeoutInMs === void 0) { timeoutInMs = 0; }
    if (!timeoutInMs) {
        return;
    }
    request.on("socket", function (socket) {
        if (socket.connecting) {
            // Throw a connecting timeout error unless a connection is made within x time.
            var timeoutId_1 = setTimeout(function () {
                // destroy the request.
                request.destroy();
                reject(Object.assign(new Error("Socket timed out without establishing a connection within " + timeoutInMs + " ms"), {
                    name: "TimeoutError",
                }));
            }, timeoutInMs);
            // if the connection was established, cancel the timeout.
            socket.on("connect", function () {
                clearTimeout(timeoutId_1);
            });
        }
    });
};

var setSocketTimeout = function (request, reject, timeoutInMs) {
    if (timeoutInMs === void 0) { timeoutInMs = 0; }
    request.setTimeout(timeoutInMs, function () {
        // destroy the request
        request.destroy();
        reject(Object.assign(new Error("Connection timed out after " + timeoutInMs + " ms"), { name: "TimeoutError" }));
    });
};

function writeRequestBody(httpRequest, request) {
    var expect = request.headers["Expect"] || request.headers["expect"];
    if (expect === "100-continue") {
        httpRequest.on("continue", function () {
            writeBody(httpRequest, request.body);
        });
    }
    else {
        writeBody(httpRequest, request.body);
    }
}
function writeBody(httpRequest, body) {
    if (body instanceof Stream.Readable) {
        // pipe automatically handles end
        body.pipe(httpRequest);
    }
    else if (body) {
        httpRequest.end(Buffer.from(body));
    }
    else {
        httpRequest.end();
    }
}

var NodeHttpHandler = /** @class */ (function () {
    function NodeHttpHandler(_a) {
        var _b = _a === void 0 ? {} : _a, connectionTimeout = _b.connectionTimeout, socketTimeout = _b.socketTimeout, httpAgent = _b.httpAgent, httpsAgent = _b.httpsAgent;
        // Node http handler is hard-coded to http/1.1: https://github.com/nodejs/node/blob/ff5664b83b89c55e4ab5d5f60068fb457f1f5872/lib/_http_server.js#L286
        this.metadata = { handlerProtocol: "http/1.1" };
        this.connectionTimeout = connectionTimeout;
        this.socketTimeout = socketTimeout;
        var keepAlive = true;
        var maxSockets = 50;
        this.httpAgent = httpAgent || new http.Agent({ keepAlive: keepAlive, maxSockets: maxSockets });
        this.httpsAgent = httpsAgent || new https.Agent({ keepAlive: keepAlive, maxSockets: maxSockets });
    }
    NodeHttpHandler.prototype.destroy = function () {
        this.httpAgent.destroy();
        this.httpsAgent.destroy();
    };
    NodeHttpHandler.prototype.handle = function (request, _a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, abortSignal = _b.abortSignal;
        return new Promise(function (resolve, reject) {
            // if the request was already aborted, prevent doing extra work
            if (abortSignal === null || abortSignal === void 0 ? void 0 : abortSignal.aborted) {
                var abortError = new Error("Request aborted");
                abortError.name = "AbortError";
                reject(abortError);
                return;
            }
            // determine which http(s) client to use
            var isSSL = request.protocol === "https:";
            var queryString = buildQueryString(request.query || {});
            var nodeHttpsOptions = {
                headers: request.headers,
                host: request.hostname,
                method: request.method,
                path: queryString ? request.path + "?" + queryString : request.path,
                port: request.port,
                agent: isSSL ? _this.httpsAgent : _this.httpAgent,
            };
            // create the http request
            var requestFunc = isSSL ? https.request : http.request;
            var req = requestFunc(nodeHttpsOptions, function (res) {
                var httpResponse = new serdePlugin.HttpResponse({
                    statusCode: res.statusCode || -1,
                    headers: getTransformedHeaders(res.headers),
                    body: res,
                });
                resolve({ response: httpResponse });
            });
            req.on("error", function (err) {
                if (NODEJS_TIMEOUT_ERROR_CODES.includes(err.code)) {
                    reject(Object.assign(err, { name: "TimeoutError" }));
                }
                else {
                    reject(err);
                }
            });
            // wire-up any timeout logic
            setConnectionTimeout(req, reject, _this.connectionTimeout);
            setSocketTimeout(req, reject, _this.socketTimeout);
            // wire-up abort logic
            if (abortSignal) {
                abortSignal.onabort = function () {
                    // ensure request is destroyed
                    req.abort();
                    var abortError = new Error("Request aborted");
                    abortError.name = "AbortError";
                    reject(abortError);
                };
            }
            writeRequestBody(req, request);
        });
    };
    return NodeHttpHandler;
}());

var Collector = /** @class */ (function (_super) {
    serdePlugin.__extends(Collector, _super);
    function Collector() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bufferedBytes = [];
        return _this;
    }
    Collector.prototype._write = function (chunk, encoding, callback) {
        this.bufferedBytes.push(chunk);
        callback();
    };
    return Collector;
}(Stream.Writable));

var streamCollector = function (stream) {
    return new Promise(function (resolve, reject) {
        var collector = new Collector();
        stream.pipe(collector);
        stream.on("error", function (err) {
            // if the source errors, the destination stream needs to manually end
            collector.end();
            reject(err);
        });
        collector.on("error", reject);
        collector.on("finish", function () {
            var bytes = new Uint8Array(Buffer.concat(this.bufferedBytes));
            resolve(bytes);
        });
    });
};

/**
 * Converts a base-64 encoded string to a Uint8Array of bytes using Node.JS's
 * `buffer` module.
 *
 * @param input The base-64 encoded string
 */
function fromBase64(input) {
    var buffer = fromString(input, "base64");
    return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
}
/**
 * Converts a Uint8Array of binary data to a base-64 encoded string using
 * Node.JS's `buffer` module.
 *
 * @param input The binary data to encode
 */
function toBase64(input) {
    return fromArrayBuffer(input.buffer, input.byteOffset, input.byteLength).toString("base64");
}

function calculateBodyLength(body) {
    if (!body) {
        return 0;
    }
    if (typeof body === "string") {
        return Buffer.from(body).length;
    }
    else if (typeof body.byteLength === "number") {
        // handles Uint8Array, ArrayBuffer, Buffer, and ArrayBufferView
        return body.byteLength;
    }
    else if (typeof body.size === "number") {
        return body.size;
    }
    else if (typeof body.path === "string") {
        // handles fs readable streams
        return fs.lstatSync(body.path).size;
    }
}

var UA_APP_ID_ENV_NAME = "AWS_SDK_UA_APP_ID";
var UA_APP_ID_INI_NAME = "sdk-ua-app-id";
/**
 * Collect metrics from runtime to put into user agent.
 */
var defaultUserAgent = function (_a) {
    var serviceId = _a.serviceId, clientVersion = _a.clientVersion;
    var sections = [
        // sdk-metadata
        ["aws-sdk-js", clientVersion],
        // os-metadata
        ["os/" + os.platform(), os.release()],
        // language-metadata
        // ECMAScript edition doesn't matter in JS, so no version needed.
        ["lang/js"],
        ["md/nodejs", "" + process$1.versions.node],
    ];
    if (serviceId) {
        // api-metadata
        // service Id may not appear in non-AWS clients
        sections.push(["api/" + serviceId, clientVersion]);
    }
    if (process$1.env.AWS_EXECUTION_ENV) {
        // env-metadata
        sections.push(["exec-env/" + process$1.env.AWS_EXECUTION_ENV]);
    }
    var appIdPromise = loadConfig({
        environmentVariableSelector: function (env) { return env[UA_APP_ID_ENV_NAME]; },
        configFileSelector: function (profile) { return profile[UA_APP_ID_INI_NAME]; },
        default: undefined,
    })();
    var resolvedUserAgent = undefined;
    return function () { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
        var appId;
        return serdePlugin.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!resolvedUserAgent) return [3 /*break*/, 2];
                    return [4 /*yield*/, appIdPromise];
                case 1:
                    appId = _a.sent();
                    resolvedUserAgent = appId ? serdePlugin.__spreadArray(serdePlugin.__spreadArray([], serdePlugin.__read(sections)), [["app/" + appId]]) : serdePlugin.__spreadArray([], serdePlugin.__read(sections));
                    _a.label = 2;
                case 2: return [2 /*return*/, resolvedUserAgent];
            }
        });
    }); };
};

var fromUtf8 = function (input) {
    var buf = fromString(input, "utf8");
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength / Uint8Array.BYTES_PER_ELEMENT);
};
var toUtf8 = function (input) {
    return fromArrayBuffer(input.buffer, input.byteOffset, input.byteLength).toString("utf8");
};

// Partition default templates
var AWS_TEMPLATE$1 = "portal.sso.{region}.amazonaws.com";
var AWS_CN_TEMPLATE$1 = "portal.sso.{region}.amazonaws.com.cn";
var AWS_ISO_TEMPLATE$1 = "portal.sso.{region}.c2s.ic.gov";
var AWS_ISO_B_TEMPLATE$1 = "portal.sso.{region}.sc2s.sgov.gov";
var AWS_US_GOV_TEMPLATE$1 = "portal.sso.{region}.amazonaws.com";
// Partition regions
var AWS_REGIONS$1 = new Set([
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
var AWS_CN_REGIONS$1 = new Set(["cn-north-1", "cn-northwest-1"]);
var AWS_ISO_REGIONS$1 = new Set(["us-iso-east-1"]);
var AWS_ISO_B_REGIONS$1 = new Set(["us-isob-east-1"]);
var AWS_US_GOV_REGIONS$1 = new Set(["us-gov-east-1", "us-gov-west-1"]);
var defaultRegionInfoProvider$1 = function (region, options) {
    var regionInfo = undefined;
    switch (region) {
        // First, try to match exact region names.
        case "ap-southeast-1":
            regionInfo = {
                hostname: "portal.sso.ap-southeast-1.amazonaws.com",
                partition: "aws",
                signingRegion: "ap-southeast-1",
            };
            break;
        case "ap-southeast-2":
            regionInfo = {
                hostname: "portal.sso.ap-southeast-2.amazonaws.com",
                partition: "aws",
                signingRegion: "ap-southeast-2",
            };
            break;
        case "ca-central-1":
            regionInfo = {
                hostname: "portal.sso.ca-central-1.amazonaws.com",
                partition: "aws",
                signingRegion: "ca-central-1",
            };
            break;
        case "eu-central-1":
            regionInfo = {
                hostname: "portal.sso.eu-central-1.amazonaws.com",
                partition: "aws",
                signingRegion: "eu-central-1",
            };
            break;
        case "eu-west-1":
            regionInfo = {
                hostname: "portal.sso.eu-west-1.amazonaws.com",
                partition: "aws",
                signingRegion: "eu-west-1",
            };
            break;
        case "eu-west-2":
            regionInfo = {
                hostname: "portal.sso.eu-west-2.amazonaws.com",
                partition: "aws",
                signingRegion: "eu-west-2",
            };
            break;
        case "us-east-1":
            regionInfo = {
                hostname: "portal.sso.us-east-1.amazonaws.com",
                partition: "aws",
                signingRegion: "us-east-1",
            };
            break;
        case "us-east-2":
            regionInfo = {
                hostname: "portal.sso.us-east-2.amazonaws.com",
                partition: "aws",
                signingRegion: "us-east-2",
            };
            break;
        case "us-west-2":
            regionInfo = {
                hostname: "portal.sso.us-west-2.amazonaws.com",
                partition: "aws",
                signingRegion: "us-west-2",
            };
            break;
        // Next, try to match partition endpoints.
        default:
            if (AWS_REGIONS$1.has(region)) {
                regionInfo = {
                    hostname: AWS_TEMPLATE$1.replace("{region}", region),
                    partition: "aws",
                };
            }
            if (AWS_CN_REGIONS$1.has(region)) {
                regionInfo = {
                    hostname: AWS_CN_TEMPLATE$1.replace("{region}", region),
                    partition: "aws-cn",
                };
            }
            if (AWS_ISO_REGIONS$1.has(region)) {
                regionInfo = {
                    hostname: AWS_ISO_TEMPLATE$1.replace("{region}", region),
                    partition: "aws-iso",
                };
            }
            if (AWS_ISO_B_REGIONS$1.has(region)) {
                regionInfo = {
                    hostname: AWS_ISO_B_TEMPLATE$1.replace("{region}", region),
                    partition: "aws-iso-b",
                };
            }
            if (AWS_US_GOV_REGIONS$1.has(region)) {
                regionInfo = {
                    hostname: AWS_US_GOV_TEMPLATE$1.replace("{region}", region),
                    partition: "aws-us-gov",
                };
            }
            // Finally, assume it's an AWS partition endpoint.
            if (regionInfo === undefined) {
                regionInfo = {
                    hostname: AWS_TEMPLATE$1.replace("{region}", region),
                    partition: "aws",
                };
            }
    }
    return Promise.resolve(serdePlugin.__assign({ signingService: "awsssoportal" }, regionInfo));
};

/**
 * @internal
 */
var getRuntimeConfig$3 = function (config) {
    var _a, _b, _c, _d, _e;
    if (config === void 0) { config = {}; }
    return ({
        apiVersion: "2019-06-10",
        disableHostPrefix: (_a = config.disableHostPrefix) !== null && _a !== void 0 ? _a : false,
        logger: (_b = config.logger) !== null && _b !== void 0 ? _b : {},
        regionInfoProvider: (_c = config.regionInfoProvider) !== null && _c !== void 0 ? _c : defaultRegionInfoProvider$1,
        serviceId: (_d = config.serviceId) !== null && _d !== void 0 ? _d : "SSO",
        urlParser: (_e = config.urlParser) !== null && _e !== void 0 ? _e : parseUrl,
    });
};

/**
 * @internal
 */
var getRuntimeConfig$2 = function (config) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    if (config === void 0) { config = {}; }
    emitWarningIfUnsupportedVersion(process.version);
    var clientSharedValues = getRuntimeConfig$3(config);
    return serdePlugin.__assign(serdePlugin.__assign(serdePlugin.__assign({}, clientSharedValues), config), { runtime: "node", base64Decoder: (_a = config.base64Decoder) !== null && _a !== void 0 ? _a : fromBase64, base64Encoder: (_b = config.base64Encoder) !== null && _b !== void 0 ? _b : toBase64, bodyLengthChecker: (_c = config.bodyLengthChecker) !== null && _c !== void 0 ? _c : calculateBodyLength, defaultUserAgentProvider: (_d = config.defaultUserAgentProvider) !== null && _d !== void 0 ? _d : defaultUserAgent({ serviceId: clientSharedValues.serviceId, clientVersion: packageInfo.version }), maxAttempts: (_e = config.maxAttempts) !== null && _e !== void 0 ? _e : loadConfig(NODE_MAX_ATTEMPT_CONFIG_OPTIONS), region: (_f = config.region) !== null && _f !== void 0 ? _f : loadConfig(NODE_REGION_CONFIG_OPTIONS, NODE_REGION_CONFIG_FILE_OPTIONS), requestHandler: (_g = config.requestHandler) !== null && _g !== void 0 ? _g : new NodeHttpHandler(), retryModeProvider: (_h = config.retryModeProvider) !== null && _h !== void 0 ? _h : loadConfig(NODE_RETRY_MODE_CONFIG_OPTIONS), sha256: (_j = config.sha256) !== null && _j !== void 0 ? _j : Hash.bind(null, "sha256"), streamCollector: (_k = config.streamCollector) !== null && _k !== void 0 ? _k : streamCollector, utf8Decoder: (_l = config.utf8Decoder) !== null && _l !== void 0 ? _l : fromUtf8, utf8Encoder: (_m = config.utf8Encoder) !== null && _m !== void 0 ? _m : toUtf8 });
};

var CONTENT_LENGTH_HEADER = "content-length";
function contentLengthMiddleware(bodyLengthChecker) {
    var _this = this;
    return function (next) {
        return function (args) { return serdePlugin.__awaiter(_this, void 0, void 0, function () {
            var request, body, headers, length;
            var _a;
            return serdePlugin.__generator(this, function (_b) {
                request = args.request;
                if (serdePlugin.HttpRequest.isInstance(request)) {
                    body = request.body, headers = request.headers;
                    if (body &&
                        Object.keys(headers)
                            .map(function (str) { return str.toLowerCase(); })
                            .indexOf(CONTENT_LENGTH_HEADER) === -1) {
                        length = bodyLengthChecker(body);
                        if (length !== undefined) {
                            request.headers = serdePlugin.__assign(serdePlugin.__assign({}, request.headers), (_a = {}, _a[CONTENT_LENGTH_HEADER] = String(length), _a));
                        }
                    }
                }
                return [2 /*return*/, next(serdePlugin.__assign(serdePlugin.__assign({}, args), { request: request }))];
            });
        }); };
    };
}
var contentLengthMiddlewareOptions = {
    step: "build",
    tags: ["SET_CONTENT_LENGTH", "CONTENT_LENGTH"],
    name: "contentLengthMiddleware",
    override: true,
};
var getContentLengthPlugin = function (options) { return ({
    applyToStack: function (clientStack) {
        clientStack.add(contentLengthMiddleware(options.bodyLengthChecker), contentLengthMiddlewareOptions);
    },
}); };

function resolveHostHeaderConfig(input) {
    return input;
}
var hostHeaderMiddleware = function (options) {
    return function (next) {
        return function (args) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
            var request, _a, handlerProtocol;
            return serdePlugin.__generator(this, function (_b) {
                if (!serdePlugin.HttpRequest.isInstance(args.request))
                    return [2 /*return*/, next(args)];
                request = args.request;
                _a = (options.requestHandler.metadata || {}).handlerProtocol, handlerProtocol = _a === void 0 ? "" : _a;
                //For H2 request, remove 'host' header and use ':authority' header instead
                //reference: https://nodejs.org/dist/latest-v13.x/docs/api/errors.html#ERR_HTTP2_INVALID_CONNECTION_HEADERS
                if (handlerProtocol.indexOf("h2") >= 0 && !request.headers[":authority"]) {
                    delete request.headers["host"];
                    request.headers[":authority"] = "";
                    //non-H2 request and 'host' header is not set, set the 'host' header to request's hostname.
                }
                else if (!request.headers["host"]) {
                    request.headers["host"] = request.hostname;
                }
                return [2 /*return*/, next(args)];
            });
        }); };
    };
};
var hostHeaderMiddlewareOptions = {
    name: "hostHeaderMiddleware",
    step: "build",
    priority: "low",
    tags: ["HOST"],
    override: true,
};
var getHostHeaderPlugin = function (options) { return ({
    applyToStack: function (clientStack) {
        clientStack.add(hostHeaderMiddleware(options), hostHeaderMiddlewareOptions);
    },
}); };

var loggerMiddleware = function () {
    return function (next, context) {
        return function (args) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
            var clientName, commandName, inputFilterSensitiveLog, logger, outputFilterSensitiveLog, response, _a, $metadata, outputWithoutMetadata;
            return serdePlugin.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        clientName = context.clientName, commandName = context.commandName, inputFilterSensitiveLog = context.inputFilterSensitiveLog, logger = context.logger, outputFilterSensitiveLog = context.outputFilterSensitiveLog;
                        return [4 /*yield*/, next(args)];
                    case 1:
                        response = _b.sent();
                        if (!logger) {
                            return [2 /*return*/, response];
                        }
                        if (typeof logger.info === "function") {
                            _a = response.output, $metadata = _a.$metadata, outputWithoutMetadata = serdePlugin.__rest(_a, ["$metadata"]);
                            logger.info({
                                clientName: clientName,
                                commandName: commandName,
                                input: inputFilterSensitiveLog(args.input),
                                output: outputFilterSensitiveLog(outputWithoutMetadata),
                                metadata: $metadata,
                            });
                        }
                        return [2 /*return*/, response];
                }
            });
        }); };
    };
};
var loggerMiddlewareOptions = {
    name: "loggerMiddleware",
    tags: ["LOGGER"],
    step: "initialize",
    override: true,
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getLoggerPlugin = function (options) { return ({
    applyToStack: function (clientStack) {
        clientStack.add(loggerMiddleware(), loggerMiddlewareOptions);
    },
}); };

function resolveUserAgentConfig(input) {
    return serdePlugin.__assign(serdePlugin.__assign({}, input), { customUserAgent: typeof input.customUserAgent === "string" ? [[input.customUserAgent]] : input.customUserAgent });
}

var USER_AGENT = "user-agent";
var X_AMZ_USER_AGENT = "x-amz-user-agent";
var SPACE = " ";
var UA_ESCAPE_REGEX = /[^\!\#\$\%\&\'\*\+\-\.\^\_\`\|\~\d\w]/g;

/**
 * Build user agent header sections from:
 * 1. runtime-specific default user agent provider;
 * 2. custom user agent from `customUserAgent` client config;
 * 3. handler execution context set by internal SDK components;
 * The built user agent will be set to `x-amz-user-agent` header for ALL the
 * runtimes.
 * Please note that any override to the `user-agent` or `x-amz-user-agent` header
 * in the HTTP request is discouraged. Please use `customUserAgent` client
 * config or middleware setting the `userAgent` context to generate desired user
 * agent.
 */
var userAgentMiddleware = function (options) {
    return function (next, context) {
        return function (args) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
            var request, headers, userAgent, defaultUserAgent, customUserAgent, sdkUserAgentValue, normalUAValue;
            var _a, _b;
            return serdePlugin.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        request = args.request;
                        if (!serdePlugin.HttpRequest.isInstance(request))
                            return [2 /*return*/, next(args)];
                        headers = request.headers;
                        userAgent = ((_a = context === null || context === void 0 ? void 0 : context.userAgent) === null || _a === void 0 ? void 0 : _a.map(escapeUserAgent)) || [];
                        return [4 /*yield*/, options.defaultUserAgentProvider()];
                    case 1:
                        defaultUserAgent = (_c.sent()).map(escapeUserAgent);
                        customUserAgent = ((_b = options === null || options === void 0 ? void 0 : options.customUserAgent) === null || _b === void 0 ? void 0 : _b.map(escapeUserAgent)) || [];
                        sdkUserAgentValue = serdePlugin.__spreadArray(serdePlugin.__spreadArray(serdePlugin.__spreadArray([], serdePlugin.__read(defaultUserAgent)), serdePlugin.__read(userAgent)), serdePlugin.__read(customUserAgent)).join(SPACE);
                        normalUAValue = serdePlugin.__spreadArray(serdePlugin.__spreadArray([], serdePlugin.__read(defaultUserAgent.filter(function (section) { return section.startsWith("aws-sdk-"); }))), serdePlugin.__read(customUserAgent)).join(SPACE);
                        if (options.runtime !== "browser") {
                            if (normalUAValue) {
                                headers[X_AMZ_USER_AGENT] = headers[X_AMZ_USER_AGENT]
                                    ? headers[USER_AGENT] + " " + normalUAValue
                                    : normalUAValue;
                            }
                            headers[USER_AGENT] = sdkUserAgentValue;
                        }
                        else {
                            headers[X_AMZ_USER_AGENT] = sdkUserAgentValue;
                        }
                        return [2 /*return*/, next(serdePlugin.__assign(serdePlugin.__assign({}, args), { request: request }))];
                }
            });
        }); };
    };
};
/**
 * Escape the each pair according to https://tools.ietf.org/html/rfc5234 and join the pair with pattern `name/version`.
 * User agent name may include prefix like `md/`, `api/`, `os/` etc., we should not escape the `/` after the prefix.
 * @private
 */
var escapeUserAgent = function (_a) {
    var _b = serdePlugin.__read(_a, 2), name = _b[0], version = _b[1];
    var prefixSeparatorIndex = name.indexOf("/");
    var prefix = name.substring(0, prefixSeparatorIndex); // If no prefix, prefix is just ""
    var uaName = name.substring(prefixSeparatorIndex + 1);
    if (prefix === "api") {
        uaName = uaName.toLowerCase();
    }
    return [prefix, uaName, version]
        .filter(function (item) { return item && item.length > 0; })
        .map(function (item) { return item === null || item === void 0 ? void 0 : item.replace(UA_ESCAPE_REGEX, "_"); })
        .join("/");
};
var getUserAgentMiddlewareOptions = {
    name: "getUserAgentMiddleware",
    step: "build",
    priority: "low",
    tags: ["SET_USER_AGENT", "USER_AGENT"],
    override: true,
};
var getUserAgentPlugin = function (config) { return ({
    applyToStack: function (clientStack) {
        clientStack.add(userAgentMiddleware(config), getUserAgentMiddlewareOptions);
    },
}); };

/**
 * <p>AWS Single Sign-On Portal is a web service that makes it easy for you to assign user
 *       access to AWS SSO resources such as the user portal. Users can get AWS account applications
 *       and roles assigned to them and get federated into the application.</p>
 *
 *          <p>For general information about AWS SSO, see <a href="https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html">What is AWS
 *         Single Sign-On?</a> in the <i>AWS SSO User Guide</i>.</p>
 *
 *          <p>This API reference guide describes the AWS SSO Portal operations that you can call
 *       programatically and includes detailed information on data types and errors.</p>
 *
 *          <note>
 *             <p>AWS provides SDKs that consist of libraries and sample code for various programming
 *         languages and platforms, such as Java, Ruby, .Net, iOS, or Android. The SDKs provide a
 *         convenient way to create programmatic access to AWS SSO and other AWS services. For more
 *         information about the AWS SDKs, including how to download and install them, see <a href="http://aws.amazon.com/tools/">Tools for Amazon Web Services</a>.</p>
 *          </note>
 */
var SSOClient = /** @class */ (function (_super) {
    serdePlugin.__extends(SSOClient, _super);
    function SSOClient(configuration) {
        var _this = this;
        var _config_0 = getRuntimeConfig$2(configuration);
        var _config_1 = resolveRegionConfig(_config_0);
        var _config_2 = resolveEndpointsConfig(_config_1);
        var _config_3 = resolveRetryConfig(_config_2);
        var _config_4 = resolveHostHeaderConfig(_config_3);
        var _config_5 = resolveUserAgentConfig(_config_4);
        _this = _super.call(this, _config_5) || this;
        _this.config = _config_5;
        _this.middlewareStack.use(getRetryPlugin(_this.config));
        _this.middlewareStack.use(getContentLengthPlugin(_this.config));
        _this.middlewareStack.use(getHostHeaderPlugin(_this.config));
        _this.middlewareStack.use(getLoggerPlugin(_this.config));
        _this.middlewareStack.use(getUserAgentPlugin(_this.config));
        return _this;
    }
    /**
     * Destroy underlying resources, like sockets. It's usually not necessary to do this.
     * However in Node.js, it's best to explicitly shut down the client's agent when it is no longer needed.
     * Otherwise, sockets might stay open for quite a long time before the server terminates them.
     */
    SSOClient.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
    };
    return SSOClient;
}(serdePlugin.Client));

var AccountInfo;
(function (AccountInfo) {
    /**
     * @internal
     */
    AccountInfo.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(AccountInfo || (AccountInfo = {}));
var GetRoleCredentialsRequest;
(function (GetRoleCredentialsRequest) {
    /**
     * @internal
     */
    GetRoleCredentialsRequest.filterSensitiveLog = function (obj) { return (serdePlugin.__assign(serdePlugin.__assign({}, obj), (obj.accessToken && { accessToken: serdePlugin.SENSITIVE_STRING }))); };
})(GetRoleCredentialsRequest || (GetRoleCredentialsRequest = {}));
var RoleCredentials;
(function (RoleCredentials) {
    /**
     * @internal
     */
    RoleCredentials.filterSensitiveLog = function (obj) { return (serdePlugin.__assign(serdePlugin.__assign(serdePlugin.__assign({}, obj), (obj.secretAccessKey && { secretAccessKey: serdePlugin.SENSITIVE_STRING })), (obj.sessionToken && { sessionToken: serdePlugin.SENSITIVE_STRING }))); };
})(RoleCredentials || (RoleCredentials = {}));
var GetRoleCredentialsResponse;
(function (GetRoleCredentialsResponse) {
    /**
     * @internal
     */
    GetRoleCredentialsResponse.filterSensitiveLog = function (obj) { return (serdePlugin.__assign(serdePlugin.__assign({}, obj), (obj.roleCredentials && { roleCredentials: RoleCredentials.filterSensitiveLog(obj.roleCredentials) }))); };
})(GetRoleCredentialsResponse || (GetRoleCredentialsResponse = {}));
var InvalidRequestException;
(function (InvalidRequestException) {
    /**
     * @internal
     */
    InvalidRequestException.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(InvalidRequestException || (InvalidRequestException = {}));
var ResourceNotFoundException;
(function (ResourceNotFoundException) {
    /**
     * @internal
     */
    ResourceNotFoundException.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(ResourceNotFoundException || (ResourceNotFoundException = {}));
var TooManyRequestsException;
(function (TooManyRequestsException) {
    /**
     * @internal
     */
    TooManyRequestsException.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(TooManyRequestsException || (TooManyRequestsException = {}));
var UnauthorizedException;
(function (UnauthorizedException) {
    /**
     * @internal
     */
    UnauthorizedException.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(UnauthorizedException || (UnauthorizedException = {}));
var ListAccountRolesRequest;
(function (ListAccountRolesRequest) {
    /**
     * @internal
     */
    ListAccountRolesRequest.filterSensitiveLog = function (obj) { return (serdePlugin.__assign(serdePlugin.__assign({}, obj), (obj.accessToken && { accessToken: serdePlugin.SENSITIVE_STRING }))); };
})(ListAccountRolesRequest || (ListAccountRolesRequest = {}));
var RoleInfo;
(function (RoleInfo) {
    /**
     * @internal
     */
    RoleInfo.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(RoleInfo || (RoleInfo = {}));
var ListAccountRolesResponse;
(function (ListAccountRolesResponse) {
    /**
     * @internal
     */
    ListAccountRolesResponse.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(ListAccountRolesResponse || (ListAccountRolesResponse = {}));
var ListAccountsRequest;
(function (ListAccountsRequest) {
    /**
     * @internal
     */
    ListAccountsRequest.filterSensitiveLog = function (obj) { return (serdePlugin.__assign(serdePlugin.__assign({}, obj), (obj.accessToken && { accessToken: serdePlugin.SENSITIVE_STRING }))); };
})(ListAccountsRequest || (ListAccountsRequest = {}));
var ListAccountsResponse;
(function (ListAccountsResponse) {
    /**
     * @internal
     */
    ListAccountsResponse.filterSensitiveLog = function (obj) { return (serdePlugin.__assign({}, obj)); };
})(ListAccountsResponse || (ListAccountsResponse = {}));
var LogoutRequest;
(function (LogoutRequest) {
    /**
     * @internal
     */
    LogoutRequest.filterSensitiveLog = function (obj) { return (serdePlugin.__assign(serdePlugin.__assign({}, obj), (obj.accessToken && { accessToken: serdePlugin.SENSITIVE_STRING }))); };
})(LogoutRequest || (LogoutRequest = {}));

var serializeAws_restJson1GetRoleCredentialsCommand = function (input, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, query, body;
    return serdePlugin.__generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = serdePlugin.__assign({}, (isSerializableHeaderValue(input.accessToken) && { "x-amz-sso_bearer_token": input.accessToken }));
                resolvedPath = "" + ((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith("/")) ? basePath.slice(0, -1) : basePath || "") + "/federation/credentials";
                query = serdePlugin.__assign(serdePlugin.__assign({}, (input.roleName !== undefined && { role_name: input.roleName })), (input.accountId !== undefined && { account_id: input.accountId }));
                return [2 /*return*/, new serdePlugin.HttpRequest({
                        protocol: protocol,
                        hostname: hostname,
                        port: port,
                        method: "GET",
                        headers: headers,
                        path: resolvedPath,
                        query: query,
                        body: body,
                    })];
        }
    });
}); };
var deserializeAws_restJson1GetRoleCredentialsCommand = function (output, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var contents, data;
    return serdePlugin.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_restJson1GetRoleCredentialsCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    roleCredentials: undefined,
                };
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                if (data.roleCredentials !== undefined && data.roleCredentials !== null) {
                    contents.roleCredentials = deserializeAws_restJson1RoleCredentials(data.roleCredentials, context);
                }
                return [2 /*return*/, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1GetRoleCredentialsCommandError = function (output, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
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
                errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "InvalidRequestException": return [3 /*break*/, 2];
                    case "com.amazonaws.sso#InvalidRequestException": return [3 /*break*/, 2];
                    case "ResourceNotFoundException": return [3 /*break*/, 4];
                    case "com.amazonaws.sso#ResourceNotFoundException": return [3 /*break*/, 4];
                    case "TooManyRequestsException": return [3 /*break*/, 6];
                    case "com.amazonaws.sso#TooManyRequestsException": return [3 /*break*/, 6];
                    case "UnauthorizedException": return [3 /*break*/, 8];
                    case "com.amazonaws.sso#UnauthorizedException": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_restJson1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 3:
                response = serdePlugin.__assign.apply(void 0, [serdePlugin.__assign.apply(void 0, _c.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_restJson1ResourceNotFoundExceptionResponse(parsedOutput, context)];
            case 5:
                response = serdePlugin.__assign.apply(void 0, [serdePlugin.__assign.apply(void 0, _d.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_restJson1TooManyRequestsExceptionResponse(parsedOutput, context)];
            case 7:
                response = serdePlugin.__assign.apply(void 0, [serdePlugin.__assign.apply(void 0, _e.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_restJson1UnauthorizedExceptionResponse(parsedOutput, context)];
            case 9:
                response = serdePlugin.__assign.apply(void 0, [serdePlugin.__assign.apply(void 0, _f.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 10:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.code || parsedBody.Code || errorCode;
                response = serdePlugin.__assign(serdePlugin.__assign({}, parsedBody), { name: "" + errorCode, message: parsedBody.message || parsedBody.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _h.label = 11;
            case 11:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
var deserializeAws_restJson1InvalidRequestExceptionResponse = function (parsedOutput, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var contents, data;
    return serdePlugin.__generator(this, function (_a) {
        contents = {
            name: "InvalidRequestException",
            $fault: "client",
            $metadata: deserializeMetadata(parsedOutput),
            message: undefined,
        };
        data = parsedOutput.body;
        if (data.message !== undefined && data.message !== null) {
            contents.message = serdePlugin.expectString(data.message);
        }
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_restJson1ResourceNotFoundExceptionResponse = function (parsedOutput, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var contents, data;
    return serdePlugin.__generator(this, function (_a) {
        contents = {
            name: "ResourceNotFoundException",
            $fault: "client",
            $metadata: deserializeMetadata(parsedOutput),
            message: undefined,
        };
        data = parsedOutput.body;
        if (data.message !== undefined && data.message !== null) {
            contents.message = serdePlugin.expectString(data.message);
        }
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_restJson1TooManyRequestsExceptionResponse = function (parsedOutput, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var contents, data;
    return serdePlugin.__generator(this, function (_a) {
        contents = {
            name: "TooManyRequestsException",
            $fault: "client",
            $metadata: deserializeMetadata(parsedOutput),
            message: undefined,
        };
        data = parsedOutput.body;
        if (data.message !== undefined && data.message !== null) {
            contents.message = serdePlugin.expectString(data.message);
        }
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_restJson1UnauthorizedExceptionResponse = function (parsedOutput, context) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var contents, data;
    return serdePlugin.__generator(this, function (_a) {
        contents = {
            name: "UnauthorizedException",
            $fault: "client",
            $metadata: deserializeMetadata(parsedOutput),
            message: undefined,
        };
        data = parsedOutput.body;
        if (data.message !== undefined && data.message !== null) {
            contents.message = serdePlugin.expectString(data.message);
        }
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_restJson1RoleCredentials = function (output, context) {
    return {
        accessKeyId: serdePlugin.expectString(output.accessKeyId),
        expiration: serdePlugin.expectInt(output.expiration),
        secretAccessKey: serdePlugin.expectString(output.secretAccessKey),
        sessionToken: serdePlugin.expectString(output.sessionToken),
    };
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
var isSerializableHeaderValue = function (value) {
    return value !== undefined &&
        value !== null &&
        value !== "" &&
        (!Object.getOwnPropertyNames(value).includes("length") || value.length != 0) &&
        (!Object.getOwnPropertyNames(value).includes("size") || value.size != 0);
};
var parseBody = function (streamBody, context) {
    return collectBodyString(streamBody, context).then(function (encoded) {
        if (encoded.length) {
            return JSON.parse(encoded);
        }
        return {};
    });
};
/**
 * Load an error code for the aws.rest-json-1.1 protocol.
 */
var loadRestJsonErrorCode = function (output, data) {
    var findKey = function (object, key) { return Object.keys(object).find(function (k) { return k.toLowerCase() === key.toLowerCase(); }); };
    var sanitizeErrorCode = function (rawValue) {
        var cleanValue = rawValue;
        if (cleanValue.indexOf(":") >= 0) {
            cleanValue = cleanValue.split(":")[0];
        }
        if (cleanValue.indexOf("#") >= 0) {
            cleanValue = cleanValue.split("#")[1];
        }
        return cleanValue;
    };
    var headerKey = findKey(output.headers, "x-amzn-errortype");
    if (headerKey !== undefined) {
        return sanitizeErrorCode(output.headers[headerKey]);
    }
    if (data.code !== undefined) {
        return sanitizeErrorCode(data.code);
    }
    if (data["__type"] !== undefined) {
        return sanitizeErrorCode(data["__type"]);
    }
    return "";
};

/**
 * <p>Returns the STS short-term credentials for a given role name that is assigned to the
 *       user.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SSOClient, GetRoleCredentialsCommand } from "@aws-sdk/client-sso"; // ES Modules import
 * // const { SSOClient, GetRoleCredentialsCommand } = require("@aws-sdk/client-sso"); // CommonJS import
 * const client = new SSOClient(config);
 * const command = new GetRoleCredentialsCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetRoleCredentialsCommandInput} for command's `input` shape.
 * @see {@link GetRoleCredentialsCommandOutput} for command's `response` shape.
 * @see {@link SSOClientResolvedConfig | config} for command's `input` shape.
 *
 */
var GetRoleCredentialsCommand = /** @class */ (function (_super) {
    serdePlugin.__extends(GetRoleCredentialsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function GetRoleCredentialsCommand(input) {
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
    GetRoleCredentialsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(serdePlugin.getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "SSOClient";
        var commandName = "GetRoleCredentialsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetRoleCredentialsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: GetRoleCredentialsResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetRoleCredentialsCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GetRoleCredentialsCommand(input, context);
    };
    GetRoleCredentialsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GetRoleCredentialsCommand(output, context);
    };
    return GetRoleCredentialsCommand;
}(serdePlugin.Command));

var ENV_PROFILE = "AWS_PROFILE";
var DEFAULT_PROFILE = "default";
/**
 * Load profiles from credentials and config INI files and normalize them into a
 * single profile list.
 *
 * @internal
 */
var parseKnownFiles = function (init) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var _a, loadedConfig, parsedFiles;
    return serdePlugin.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = init.loadedConfig, loadedConfig = _a === void 0 ? loadSharedConfigFiles(init) : _a;
                return [4 /*yield*/, loadedConfig];
            case 1:
                parsedFiles = _b.sent();
                return [2 /*return*/, serdePlugin.__assign(serdePlugin.__assign({}, parsedFiles.configFile), parsedFiles.credentialsFile)];
        }
    });
}); };
/**
 * @internal
 */
var getMasterProfileName = function (init) {
    return init.profile || process.env[ENV_PROFILE] || DEFAULT_PROFILE;
};

/**
 * The time window (15 mins) that SDK will treat the SSO token expires in before the defined expiration date in token.
 * This is needed because server side may have invalidated the token before the defined expiration date.
 *
 * @internal
 */
var EXPIRE_WINDOW_MS = 15 * 60 * 1000;
var SHOULD_FAIL_CREDENTIAL_CHAIN = false;
/**
 * Creates a credential provider that will read from a credential_process specified
 * in ini files.
 */
var fromSSO = function (init) {
    if (init === void 0) { init = {}; }
    return function () { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
        var ssoStartUrl, ssoAccountId, ssoRegion, ssoRoleName, ssoClient, profiles, profileName, profile, _a, sso_start_url, sso_account_id, sso_region, sso_role_name;
        return serdePlugin.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    ssoStartUrl = init.ssoStartUrl, ssoAccountId = init.ssoAccountId, ssoRegion = init.ssoRegion, ssoRoleName = init.ssoRoleName, ssoClient = init.ssoClient;
                    if (!(!ssoStartUrl && !ssoAccountId && !ssoRegion && !ssoRoleName)) return [3 /*break*/, 2];
                    return [4 /*yield*/, parseKnownFiles(init)];
                case 1:
                    profiles = _b.sent();
                    profileName = getMasterProfileName(init);
                    profile = profiles[profileName];
                    if (!isSsoProfile(profile)) {
                        throw new CredentialsProviderError("Profile " + profileName + " is not configured with SSO credentials.");
                    }
                    _a = validateSsoProfile(profile), sso_start_url = _a.sso_start_url, sso_account_id = _a.sso_account_id, sso_region = _a.sso_region, sso_role_name = _a.sso_role_name;
                    return [2 /*return*/, resolveSSOCredentials({
                            ssoStartUrl: sso_start_url,
                            ssoAccountId: sso_account_id,
                            ssoRegion: sso_region,
                            ssoRoleName: sso_role_name,
                            ssoClient: ssoClient,
                        })];
                case 2:
                    if (!ssoStartUrl || !ssoAccountId || !ssoRegion || !ssoRoleName) {
                        throw new CredentialsProviderError('Incomplete configuration. The fromSSO() argument hash must include "ssoStartUrl",' +
                            ' "ssoAccountId", "ssoRegion", "ssoRoleName"');
                    }
                    else {
                        return [2 /*return*/, resolveSSOCredentials({ ssoStartUrl: ssoStartUrl, ssoAccountId: ssoAccountId, ssoRegion: ssoRegion, ssoRoleName: ssoRoleName, ssoClient: ssoClient })];
                    }
                case 3: return [2 /*return*/];
            }
        });
    }); };
};
var resolveSSOCredentials = function (_a) {
    var ssoStartUrl = _a.ssoStartUrl, ssoAccountId = _a.ssoAccountId, ssoRegion = _a.ssoRegion, ssoRoleName = _a.ssoRoleName, ssoClient = _a.ssoClient;
    return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
        var hasher, cacheName, tokenFile, token, accessToken, sso, ssoResp, e_1, _b, _c, accessKeyId, secretAccessKey, sessionToken, expiration;
        return serdePlugin.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    hasher = crypto.createHash("sha1");
                    cacheName = hasher.update(ssoStartUrl).digest("hex");
                    tokenFile = path.join(getHomeDir(), ".aws", "sso", "cache", cacheName + ".json");
                    try {
                        token = JSON.parse(fs.readFileSync(tokenFile, { encoding: "utf-8" }));
                        if (new Date(token.expiresAt).getTime() - Date.now() <= EXPIRE_WINDOW_MS) {
                            throw new Error("SSO token is expired.");
                        }
                    }
                    catch (e) {
                        throw new CredentialsProviderError("The SSO session associated with this profile has expired or is otherwise invalid. To refresh this SSO session " +
                            "run aws sso login with the corresponding profile.", SHOULD_FAIL_CREDENTIAL_CHAIN);
                    }
                    accessToken = token.accessToken;
                    sso = ssoClient || new SSOClient({ region: ssoRegion });
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, sso.send(new GetRoleCredentialsCommand({
                            accountId: ssoAccountId,
                            roleName: ssoRoleName,
                            accessToken: accessToken,
                        }))];
                case 2:
                    ssoResp = _d.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _d.sent();
                    throw CredentialsProviderError.from(e_1, SHOULD_FAIL_CREDENTIAL_CHAIN);
                case 4:
                    _b = ssoResp.roleCredentials, _c = _b === void 0 ? {} : _b, accessKeyId = _c.accessKeyId, secretAccessKey = _c.secretAccessKey, sessionToken = _c.sessionToken, expiration = _c.expiration;
                    if (!accessKeyId || !secretAccessKey || !sessionToken || !expiration) {
                        throw new CredentialsProviderError("SSO returns an invalid temporary credential.", SHOULD_FAIL_CREDENTIAL_CHAIN);
                    }
                    return [2 /*return*/, { accessKeyId: accessKeyId, secretAccessKey: secretAccessKey, sessionToken: sessionToken, expiration: new Date(expiration) }];
            }
        });
    });
};
/**
 * @internal
 */
var validateSsoProfile = function (profile) {
    var sso_start_url = profile.sso_start_url, sso_account_id = profile.sso_account_id, sso_region = profile.sso_region, sso_role_name = profile.sso_role_name;
    if (!sso_start_url || !sso_account_id || !sso_region || !sso_role_name) {
        throw new CredentialsProviderError("Profile is configured with invalid SSO credentials. Required parameters \"sso_account_id\", \"sso_region\", " +
            ("\"sso_role_name\", \"sso_start_url\". Got " + Object.keys(profile).join(", ") + "\nReference: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html"), SHOULD_FAIL_CREDENTIAL_CHAIN);
    }
    return profile;
};
/**
 * @internal
 */
var isSsoProfile = function (arg) {
    return arg &&
        (typeof arg.sso_start_url === "string" ||
            typeof arg.sso_account_id === "string" ||
            typeof arg.sso_region === "string" ||
            typeof arg.sso_role_name === "string");
};

var fromWebToken = function (init) {
    return function () {
        var roleArn = init.roleArn, roleSessionName = init.roleSessionName, webIdentityToken = init.webIdentityToken, providerId = init.providerId, policyArns = init.policyArns, policy = init.policy, durationSeconds = init.durationSeconds, roleAssumerWithWebIdentity = init.roleAssumerWithWebIdentity;
        if (!roleAssumerWithWebIdentity) {
            throw new CredentialsProviderError("Role Arn '" + roleArn + "' needs to be assumed with web identity," +
                " but no role assumption callback was provided.", false);
        }
        return roleAssumerWithWebIdentity({
            RoleArn: roleArn,
            RoleSessionName: roleSessionName !== null && roleSessionName !== void 0 ? roleSessionName : "aws-sdk-js-session-" + Date.now(),
            WebIdentityToken: webIdentityToken,
            ProviderId: providerId,
            PolicyArns: policyArns,
            Policy: policy,
            DurationSeconds: durationSeconds,
        });
    };
};

var ENV_TOKEN_FILE = "AWS_WEB_IDENTITY_TOKEN_FILE";
var ENV_ROLE_ARN = "AWS_ROLE_ARN";
var ENV_ROLE_SESSION_NAME = "AWS_ROLE_SESSION_NAME";
/**
 * Represents OIDC credentials from a file on disk.
 */
var fromTokenFile = function (init) {
    if (init === void 0) { init = {}; }
    return function () { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
        return serdePlugin.__generator(this, function (_a) {
            return [2 /*return*/, resolveTokenFile(init)];
        });
    }); };
};
var resolveTokenFile = function (init) {
    var _a, _b, _c;
    var webIdentityTokenFile = (_a = init === null || init === void 0 ? void 0 : init.webIdentityTokenFile) !== null && _a !== void 0 ? _a : process.env[ENV_TOKEN_FILE];
    var roleArn = (_b = init === null || init === void 0 ? void 0 : init.roleArn) !== null && _b !== void 0 ? _b : process.env[ENV_ROLE_ARN];
    var roleSessionName = (_c = init === null || init === void 0 ? void 0 : init.roleSessionName) !== null && _c !== void 0 ? _c : process.env[ENV_ROLE_SESSION_NAME];
    if (!webIdentityTokenFile || !roleArn) {
        throw new CredentialsProviderError("Web identity configuration not specified");
    }
    return fromWebToken(serdePlugin.__assign(serdePlugin.__assign({}, init), { webIdentityToken: fs.readFileSync(webIdentityTokenFile, { encoding: "ascii" }), roleArn: roleArn,
        roleSessionName: roleSessionName }))();
};

var isStaticCredsProfile = function (arg) {
    return Boolean(arg) &&
        typeof arg === "object" &&
        typeof arg.aws_access_key_id === "string" &&
        typeof arg.aws_secret_access_key === "string" &&
        ["undefined", "string"].indexOf(typeof arg.aws_session_token) > -1;
};
var isWebIdentityProfile = function (arg) {
    return Boolean(arg) &&
        typeof arg === "object" &&
        typeof arg.web_identity_token_file === "string" &&
        typeof arg.role_arn === "string" &&
        ["undefined", "string"].indexOf(typeof arg.role_session_name) > -1;
};
var isAssumeRoleProfile = function (arg) {
    return Boolean(arg) &&
        typeof arg === "object" &&
        typeof arg.role_arn === "string" &&
        ["undefined", "string"].indexOf(typeof arg.role_session_name) > -1 &&
        ["undefined", "string"].indexOf(typeof arg.external_id) > -1 &&
        ["undefined", "string"].indexOf(typeof arg.mfa_serial) > -1;
};
var isAssumeRoleWithSourceProfile = function (arg) {
    return isAssumeRoleProfile(arg) && typeof arg.source_profile === "string" && typeof arg.credential_source === "undefined";
};
var isAssumeRoleWithProviderProfile = function (arg) {
    return isAssumeRoleProfile(arg) && typeof arg.credential_source === "string" && typeof arg.source_profile === "undefined";
};
/**
 * Creates a credential provider that will read from ini files and supports
 * role assumption and multi-factor authentication.
 */
var fromIni = function (init) {
    if (init === void 0) { init = {}; }
    return function () { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
        var profiles;
        return serdePlugin.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, parseKnownFiles(init)];
                case 1:
                    profiles = _a.sent();
                    return [2 /*return*/, resolveProfileData(getMasterProfileName(init), profiles, init)];
            }
        });
    }); };
};
var resolveProfileData = function (profileName, profiles, options, visitedProfiles) {
    if (visitedProfiles === void 0) { visitedProfiles = {}; }
    return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
        var data, ExternalId, mfa_serial, RoleArn, _a, RoleSessionName, source_profile, credential_source, sourceCreds, params, _b, _c, _d, _e, sso_start_url, sso_account_id, sso_region, sso_role_name;
        var _f;
        return serdePlugin.__generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    data = profiles[profileName];
                    // If this is not the first profile visited, static credentials should be
                    // preferred over role assumption metadata. This special treatment of
                    // second and subsequent hops is to ensure compatibility with the AWS CLI.
                    if (Object.keys(visitedProfiles).length > 0 && isStaticCredsProfile(data)) {
                        return [2 /*return*/, resolveStaticCredentials(data)];
                    }
                    if (!(isAssumeRoleWithSourceProfile(data) || isAssumeRoleWithProviderProfile(data))) return [3 /*break*/, 4];
                    ExternalId = data.external_id, mfa_serial = data.mfa_serial, RoleArn = data.role_arn, _a = data.role_session_name, RoleSessionName = _a === void 0 ? "aws-sdk-js-" + Date.now() : _a, source_profile = data.source_profile, credential_source = data.credential_source;
                    if (!options.roleAssumer) {
                        throw new CredentialsProviderError("Profile " + profileName + " requires a role to be assumed, but no" + " role assumption callback was provided.", false);
                    }
                    if (source_profile && source_profile in visitedProfiles) {
                        throw new CredentialsProviderError("Detected a cycle attempting to resolve credentials for profile" +
                            (" " + getMasterProfileName(options) + ". Profiles visited: ") +
                            Object.keys(visitedProfiles).join(", "), false);
                    }
                    sourceCreds = source_profile
                        ? resolveProfileData(source_profile, profiles, options, serdePlugin.__assign(serdePlugin.__assign({}, visitedProfiles), (_f = {}, _f[source_profile] = true, _f)))
                        : resolveCredentialSource(credential_source, profileName)();
                    params = { RoleArn: RoleArn, RoleSessionName: RoleSessionName, ExternalId: ExternalId };
                    if (!mfa_serial) return [3 /*break*/, 2];
                    if (!options.mfaCodeProvider) {
                        throw new CredentialsProviderError("Profile " + profileName + " requires multi-factor authentication," + " but no MFA code callback was provided.", false);
                    }
                    params.SerialNumber = mfa_serial;
                    _b = params;
                    return [4 /*yield*/, options.mfaCodeProvider(mfa_serial)];
                case 1:
                    _b.TokenCode = _g.sent();
                    _g.label = 2;
                case 2:
                    _d = (_c = options).roleAssumer;
                    return [4 /*yield*/, sourceCreds];
                case 3: return [2 /*return*/, _d.apply(_c, [_g.sent(), params])];
                case 4:
                    // If no role assumption metadata is present, attempt to load static
                    // credentials from the selected profile.
                    if (isStaticCredsProfile(data)) {
                        return [2 /*return*/, resolveStaticCredentials(data)];
                    }
                    // If no static credentials are present, attempt to assume role with
                    // web identity if web_identity_token_file and role_arn is available
                    if (isWebIdentityProfile(data)) {
                        return [2 /*return*/, resolveWebIdentityCredentials(data, options)];
                    }
                    if (isSsoProfile(data)) {
                        _e = validateSsoProfile(data), sso_start_url = _e.sso_start_url, sso_account_id = _e.sso_account_id, sso_region = _e.sso_region, sso_role_name = _e.sso_role_name;
                        return [2 /*return*/, fromSSO({
                                ssoStartUrl: sso_start_url,
                                ssoAccountId: sso_account_id,
                                ssoRegion: sso_region,
                                ssoRoleName: sso_role_name,
                            })()];
                    }
                    // If the profile cannot be parsed or contains neither static credentials
                    // nor role assumption metadata, throw an error. This should be considered a
                    // terminal resolution error if a profile has been specified by the user
                    // (whether via a parameter, an environment variable, or another profile's
                    // `source_profile` key).
                    throw new CredentialsProviderError("Profile " + profileName + " could not be found or parsed in shared" + " credentials file.");
            }
        });
    });
};
/**
 * Resolve the `credential_source` entry from the profile, and return the
 * credential providers respectively. No memoization is needed for the
 * credential source providers because memoization should be added outside the
 * fromIni() provider. The source credential needs to be refreshed every time
 * fromIni() is called.
 */
var resolveCredentialSource = function (credentialSource, profileName) {
    var sourceProvidersMap = {
        EcsContainer: fromContainerMetadata,
        Ec2InstanceMetadata: fromInstanceMetadata,
        Environment: fromEnv$1,
    };
    if (credentialSource in sourceProvidersMap) {
        return sourceProvidersMap[credentialSource]();
    }
    else {
        throw new CredentialsProviderError("Unsupported credential source in profile " + profileName + ". Got " + credentialSource + ", " +
            "expected EcsContainer or Ec2InstanceMetadata or Environment.");
    }
};
var resolveStaticCredentials = function (profile) {
    return Promise.resolve({
        accessKeyId: profile.aws_access_key_id,
        secretAccessKey: profile.aws_secret_access_key,
        sessionToken: profile.aws_session_token,
    });
};
var resolveWebIdentityCredentials = function (profile, options) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    return serdePlugin.__generator(this, function (_a) {
        return [2 /*return*/, fromTokenFile({
                webIdentityTokenFile: profile.web_identity_token_file,
                roleArn: profile.role_arn,
                roleSessionName: profile.role_session_name,
                roleAssumerWithWebIdentity: options.roleAssumerWithWebIdentity,
            })()];
    });
}); };

/**
 * Creates a credential provider that will read from a credential_process specified
 * in ini files.
 */
var fromProcess = function (init) {
    if (init === void 0) { init = {}; }
    return function () { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
        var profiles;
        return serdePlugin.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, parseKnownFiles(init)];
                case 1:
                    profiles = _a.sent();
                    return [2 /*return*/, resolveProcessCredentials(getMasterProfileName(init), profiles)];
            }
        });
    }); };
};
var resolveProcessCredentials = function (profileName, profiles) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
    var profile, credentialProcess;
    return serdePlugin.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                profile = profiles[profileName];
                if (!profiles[profileName]) return [3 /*break*/, 4];
                credentialProcess = profile["credential_process"];
                if (!(credentialProcess !== undefined)) return [3 /*break*/, 2];
                return [4 /*yield*/, execPromise(credentialProcess)
                        .then(function (processResult) {
                        var data;
                        try {
                            data = JSON.parse(processResult);
                        }
                        catch (_a) {
                            throw Error("Profile " + profileName + " credential_process returned invalid JSON.");
                        }
                        var version = data.Version, accessKeyId = data.AccessKeyId, secretAccessKey = data.SecretAccessKey, sessionToken = data.SessionToken, expiration = data.Expiration;
                        if (version !== 1) {
                            throw Error("Profile " + profileName + " credential_process did not return Version 1.");
                        }
                        if (accessKeyId === undefined || secretAccessKey === undefined) {
                            throw Error("Profile " + profileName + " credential_process returned invalid credentials.");
                        }
                        var expirationUnix;
                        if (expiration) {
                            var currentTime = new Date();
                            var expireTime = new Date(expiration);
                            if (expireTime < currentTime) {
                                throw Error("Profile " + profileName + " credential_process returned expired credentials.");
                            }
                            expirationUnix = Math.floor(new Date(expiration).valueOf() / 1000);
                        }
                        return {
                            accessKeyId: accessKeyId,
                            secretAccessKey: secretAccessKey,
                            sessionToken: sessionToken,
                            expirationUnix: expirationUnix,
                        };
                    })
                        .catch(function (error) {
                        throw new CredentialsProviderError(error.message);
                    })];
            case 1: return [2 /*return*/, _a.sent()];
            case 2: throw new CredentialsProviderError("Profile " + profileName + " did not contain credential_process.");
            case 3: return [3 /*break*/, 5];
            case 4: 
            // If the profile cannot be parsed or does not contain the default or
            // specified profile throw an error. This should be considered a terminal
            // resolution error if a profile has been specified by the user (whether via
            // a parameter, anenvironment variable, or another profile's `source_profile` key).
            throw new CredentialsProviderError("Profile " + profileName + " could not be found in shared credentials file.");
            case 5: return [2 /*return*/];
        }
    });
}); };
var execPromise = function (command) {
    return new Promise(function (resolve, reject) {
        child_process.exec(command, function (error, stdout) {
            if (error) {
                reject(error);
                return;
            }
            resolve(stdout.trim());
        });
    });
};

var ENV_IMDS_DISABLED = "AWS_EC2_METADATA_DISABLED";
/**
 * Creates a credential provider that will attempt to find credentials from the
 * following sources (listed in order of precedence):
 *   * Environment variables exposed via `process.env`
 *   * SSO credentials from token cache
 *   * Web identity token credentials
 *   * Shared credentials and config ini files
 *   * The EC2/ECS Instance Metadata Service
 *
 * The default credential provider will invoke one provider at a time and only
 * continue to the next if no credentials have been located. For example, if
 * the process finds values defined via the `AWS_ACCESS_KEY_ID` and
 * `AWS_SECRET_ACCESS_KEY` environment variables, the files at
 * `~/.aws/credentials` and `~/.aws/config` will not be read, nor will any
 * messages be sent to the Instance Metadata Service.
 *
 * @param init                  Configuration that is passed to each individual
 *                              provider
 *
 * @see fromEnv                 The function used to source credentials from
 *                              environment variables
 * @see fromSSO                 The function used to source credentials from
 *                              resolved SSO token cache
 * @see fromTokenFile           The function used to source credentials from
 *                              token file
 * @see fromIni                 The function used to source credentials from INI
 *                              files
 * @see fromProcess             The function used to sources credentials from
 *                              credential_process in INI files
 * @see fromInstanceMetadata    The function used to source credentials from the
 *                              EC2 Instance Metadata Service
 * @see fromContainerMetadata   The function used to source credentials from the
 *                              ECS Container Metadata Service
 */
var defaultProvider = function (init) {
    if (init === void 0) { init = {}; }
    var options = serdePlugin.__assign({ profile: process.env[ENV_PROFILE] }, init);
    if (!options.loadedConfig)
        options.loadedConfig = loadSharedConfigFiles(init);
    var providers = [
        fromSSO(options),
        fromIni(options),
        fromProcess(options),
        fromTokenFile(options),
        remoteProvider(options),
        function () { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
            return serdePlugin.__generator(this, function (_a) {
                throw new CredentialsProviderError("Could not load credentials from any providers", false);
            });
        }); },
    ];
    if (!options.profile)
        providers.unshift(fromEnv$1());
    var providerChain = chain.apply(void 0, serdePlugin.__spreadArray([], serdePlugin.__read(providers)));
    return memoize(providerChain, function (credentials) { return credentials.expiration !== undefined && credentials.expiration.getTime() - Date.now() < 300000; }, function (credentials) { return credentials.expiration !== undefined; });
};
var remoteProvider = function (init) {
    if (process.env[ENV_CMDS_RELATIVE_URI] || process.env[ENV_CMDS_FULL_URI]) {
        return fromContainerMetadata(init);
    }
    if (process.env[ENV_IMDS_DISABLED]) {
        return function () { return Promise.reject(new CredentialsProviderError("EC2 Instance Metadata Service access disabled")); };
    }
    return fromInstanceMetadata(init);
};

// Partition default templates
var AWS_TEMPLATE = "sts.{region}.amazonaws.com";
var AWS_CN_TEMPLATE = "sts.{region}.amazonaws.com.cn";
var AWS_ISO_TEMPLATE = "sts.{region}.c2s.ic.gov";
var AWS_ISO_B_TEMPLATE = "sts.{region}.sc2s.sgov.gov";
var AWS_US_GOV_TEMPLATE = "sts.{region}.amazonaws.com";
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
                hostname: "sts.af-south-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "ap-east-1":
            regionInfo = {
                hostname: "sts.ap-east-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "ap-northeast-1":
            regionInfo = {
                hostname: "sts.ap-northeast-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "ap-northeast-2":
            regionInfo = {
                hostname: "sts.ap-northeast-2.amazonaws.com",
                partition: "aws",
            };
            break;
        case "ap-northeast-3":
            regionInfo = {
                hostname: "sts.ap-northeast-3.amazonaws.com",
                partition: "aws",
            };
            break;
        case "ap-south-1":
            regionInfo = {
                hostname: "sts.ap-south-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "ap-southeast-1":
            regionInfo = {
                hostname: "sts.ap-southeast-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "ap-southeast-2":
            regionInfo = {
                hostname: "sts.ap-southeast-2.amazonaws.com",
                partition: "aws",
            };
            break;
        case "aws-global":
            regionInfo = {
                hostname: "sts.amazonaws.com",
                partition: "aws",
                signingRegion: "us-east-1",
            };
            break;
        case "ca-central-1":
            regionInfo = {
                hostname: "sts.ca-central-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "cn-north-1":
            regionInfo = {
                hostname: "sts.cn-north-1.amazonaws.com.cn",
                partition: "aws-cn",
            };
            break;
        case "cn-northwest-1":
            regionInfo = {
                hostname: "sts.cn-northwest-1.amazonaws.com.cn",
                partition: "aws-cn",
            };
            break;
        case "eu-central-1":
            regionInfo = {
                hostname: "sts.eu-central-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "eu-north-1":
            regionInfo = {
                hostname: "sts.eu-north-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "eu-south-1":
            regionInfo = {
                hostname: "sts.eu-south-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "eu-west-1":
            regionInfo = {
                hostname: "sts.eu-west-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "eu-west-2":
            regionInfo = {
                hostname: "sts.eu-west-2.amazonaws.com",
                partition: "aws",
            };
            break;
        case "eu-west-3":
            regionInfo = {
                hostname: "sts.eu-west-3.amazonaws.com",
                partition: "aws",
            };
            break;
        case "me-south-1":
            regionInfo = {
                hostname: "sts.me-south-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "sa-east-1":
            regionInfo = {
                hostname: "sts.sa-east-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "us-east-1":
            regionInfo = {
                hostname: "sts.us-east-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "us-east-1-fips":
            regionInfo = {
                hostname: "sts-fips.us-east-1.amazonaws.com",
                partition: "aws",
                signingRegion: "us-east-1",
            };
            break;
        case "us-east-2":
            regionInfo = {
                hostname: "sts.us-east-2.amazonaws.com",
                partition: "aws",
            };
            break;
        case "us-east-2-fips":
            regionInfo = {
                hostname: "sts-fips.us-east-2.amazonaws.com",
                partition: "aws",
                signingRegion: "us-east-2",
            };
            break;
        case "us-gov-east-1":
            regionInfo = {
                hostname: "sts.us-gov-east-1.amazonaws.com",
                partition: "aws-us-gov",
            };
            break;
        case "us-gov-east-1-fips":
            regionInfo = {
                hostname: "sts.us-gov-east-1.amazonaws.com",
                partition: "aws-us-gov",
                signingRegion: "us-gov-east-1",
            };
            break;
        case "us-gov-west-1":
            regionInfo = {
                hostname: "sts.us-gov-west-1.amazonaws.com",
                partition: "aws-us-gov",
            };
            break;
        case "us-gov-west-1-fips":
            regionInfo = {
                hostname: "sts.us-gov-west-1.amazonaws.com",
                partition: "aws-us-gov",
                signingRegion: "us-gov-west-1",
            };
            break;
        case "us-iso-east-1":
            regionInfo = {
                hostname: "sts.us-iso-east-1.c2s.ic.gov",
                partition: "aws-iso",
            };
            break;
        case "us-isob-east-1":
            regionInfo = {
                hostname: "sts.us-isob-east-1.sc2s.sgov.gov",
                partition: "aws-iso-b",
            };
            break;
        case "us-west-1":
            regionInfo = {
                hostname: "sts.us-west-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "us-west-1-fips":
            regionInfo = {
                hostname: "sts-fips.us-west-1.amazonaws.com",
                partition: "aws",
                signingRegion: "us-west-1",
            };
            break;
        case "us-west-2":
            regionInfo = {
                hostname: "sts.us-west-2.amazonaws.com",
                partition: "aws",
            };
            break;
        case "us-west-2-fips":
            regionInfo = {
                hostname: "sts-fips.us-west-2.amazonaws.com",
                partition: "aws",
                signingRegion: "us-west-2",
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
    return Promise.resolve(serdePlugin.__assign({ signingService: "sts" }, regionInfo));
};

/**
 * @internal
 */
var getRuntimeConfig$1 = function (config) {
    var _a, _b, _c, _d, _e;
    if (config === void 0) { config = {}; }
    return ({
        apiVersion: "2011-06-15",
        disableHostPrefix: (_a = config.disableHostPrefix) !== null && _a !== void 0 ? _a : false,
        logger: (_b = config.logger) !== null && _b !== void 0 ? _b : {},
        regionInfoProvider: (_c = config.regionInfoProvider) !== null && _c !== void 0 ? _c : defaultRegionInfoProvider,
        serviceId: (_d = config.serviceId) !== null && _d !== void 0 ? _d : "STS",
        urlParser: (_e = config.urlParser) !== null && _e !== void 0 ? _e : parseUrl,
    });
};

/**
 * @internal
 */
var getRuntimeConfig = function (config) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    if (config === void 0) { config = {}; }
    emitWarningIfUnsupportedVersion(process.version);
    var clientSharedValues = getRuntimeConfig$1(config);
    return serdePlugin.__assign(serdePlugin.__assign(serdePlugin.__assign({}, clientSharedValues), config), { runtime: "node", base64Decoder: (_a = config.base64Decoder) !== null && _a !== void 0 ? _a : fromBase64, base64Encoder: (_b = config.base64Encoder) !== null && _b !== void 0 ? _b : toBase64, bodyLengthChecker: (_c = config.bodyLengthChecker) !== null && _c !== void 0 ? _c : calculateBodyLength, credentialDefaultProvider: (_d = config.credentialDefaultProvider) !== null && _d !== void 0 ? _d : decorateDefaultCredentialProvider$1(defaultProvider), defaultUserAgentProvider: (_e = config.defaultUserAgentProvider) !== null && _e !== void 0 ? _e : defaultUserAgent({ serviceId: clientSharedValues.serviceId, clientVersion: packageInfo$1.version }), maxAttempts: (_f = config.maxAttempts) !== null && _f !== void 0 ? _f : loadConfig(NODE_MAX_ATTEMPT_CONFIG_OPTIONS), region: (_g = config.region) !== null && _g !== void 0 ? _g : loadConfig(NODE_REGION_CONFIG_OPTIONS, NODE_REGION_CONFIG_FILE_OPTIONS), requestHandler: (_h = config.requestHandler) !== null && _h !== void 0 ? _h : new NodeHttpHandler(), retryModeProvider: (_j = config.retryModeProvider) !== null && _j !== void 0 ? _j : loadConfig(NODE_RETRY_MODE_CONFIG_OPTIONS), sha256: (_k = config.sha256) !== null && _k !== void 0 ? _k : Hash.bind(null, "sha256"), streamCollector: (_l = config.streamCollector) !== null && _l !== void 0 ? _l : streamCollector, utf8Decoder: (_m = config.utf8Decoder) !== null && _m !== void 0 ? _m : fromUtf8, utf8Encoder: (_o = config.utf8Encoder) !== null && _o !== void 0 ? _o : toUtf8 });
};

/**
 * Set STS client constructor to `stsClientCtor` config parameter. It is used
 * for role assumers for STS client internally. See `clients/client-sts/defaultStsRoleAssumers.ts`
 * and `clients/client-sts/STSClient.ts`.
 */
var resolveStsAuthConfig = function (input, _a) {
    var stsClientCtor = _a.stsClientCtor;
    return resolveAwsAuthConfig(serdePlugin.__assign(serdePlugin.__assign({}, input), { stsClientCtor: stsClientCtor }));
};

/**
 * <fullname>Security Token Service</fullname>
 *          <p>Security Token Service (STS) enables you to request temporary, limited-privilege
 *       credentials for Identity and Access Management (IAM) users or for users that you
 *       authenticate (federated users). This guide provides descriptions of the STS API. For
 *       more information about using this service, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp.html">Temporary Security Credentials</a>.</p>
 */
var STSClient = /** @class */ (function (_super) {
    serdePlugin.__extends(STSClient, _super);
    function STSClient(configuration) {
        var _this = this;
        var _config_0 = getRuntimeConfig(configuration);
        var _config_1 = resolveRegionConfig(_config_0);
        var _config_2 = resolveEndpointsConfig(_config_1);
        var _config_3 = resolveRetryConfig(_config_2);
        var _config_4 = resolveHostHeaderConfig(_config_3);
        var _config_5 = resolveStsAuthConfig(_config_4, { stsClientCtor: STSClient });
        var _config_6 = resolveUserAgentConfig(_config_5);
        _this = _super.call(this, _config_6) || this;
        _this.config = _config_6;
        _this.middlewareStack.use(getRetryPlugin(_this.config));
        _this.middlewareStack.use(getContentLengthPlugin(_this.config));
        _this.middlewareStack.use(getHostHeaderPlugin(_this.config));
        _this.middlewareStack.use(getLoggerPlugin(_this.config));
        _this.middlewareStack.use(getUserAgentPlugin(_this.config));
        return _this;
    }
    /**
     * Destroy underlying resources, like sockets. It's usually not necessary to do this.
     * However in Node.js, it's best to explicitly shut down the client's agent when it is no longer needed.
     * Otherwise, sockets might stay open for quite a long time before the server terminates them.
     */
    STSClient.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
    };
    return STSClient;
}(serdePlugin.Client));

/**
 * The default role assumer that used by credential providers when sts:AssumeRole API is needed.
 */
var getDefaultRoleAssumer = function (stsOptions) {
    if (stsOptions === void 0) { stsOptions = {}; }
    return getDefaultRoleAssumer$1(stsOptions, STSClient);
};
/**
 * The default role assumer that used by credential providers when sts:AssumeRoleWithWebIdentity API is needed.
 */
var getDefaultRoleAssumerWithWebIdentity = function (stsOptions) {
    if (stsOptions === void 0) { stsOptions = {}; }
    return getDefaultRoleAssumerWithWebIdentity$1(stsOptions, STSClient);
};
/**
 * The default credential providers depend STS client to assume role with desired API: sts:assumeRole,
 * sts:assumeRoleWithWebIdentity, etc. This function decorates the default credential provider with role assumers which
 * encapsulates the process of calling STS commands. This can only be imported by AWS client packages to avoid circular
 * dependencies.
 *
 * @internal
 */
var decorateDefaultCredentialProvider = function (provider) {
    return function (input) {
        return provider(serdePlugin.__assign({ roleAssumer: getDefaultRoleAssumer(input), roleAssumerWithWebIdentity: getDefaultRoleAssumerWithWebIdentity(input) }, input));
    };
};

exports.Hash = Hash;
exports.NODE_MAX_ATTEMPT_CONFIG_OPTIONS = NODE_MAX_ATTEMPT_CONFIG_OPTIONS;
exports.NODE_REGION_CONFIG_FILE_OPTIONS = NODE_REGION_CONFIG_FILE_OPTIONS;
exports.NODE_REGION_CONFIG_OPTIONS = NODE_REGION_CONFIG_OPTIONS;
exports.NODE_RETRY_MODE_CONFIG_OPTIONS = NODE_RETRY_MODE_CONFIG_OPTIONS;
exports.NodeHttpHandler = NodeHttpHandler;
exports.calculateBodyLength = calculateBodyLength;
exports.decorateDefaultCredentialProvider = decorateDefaultCredentialProvider;
exports.defaultProvider = defaultProvider;
exports.defaultUserAgent = defaultUserAgent;
exports.emitWarningIfUnsupportedVersion = emitWarningIfUnsupportedVersion;
exports.fromBase64 = fromBase64;
exports.fromHex = fromHex;
exports.fromUtf8 = fromUtf8;
exports.getAwsAuthPlugin = getAwsAuthPlugin;
exports.getContentLengthPlugin = getContentLengthPlugin;
exports.getHostHeaderPlugin = getHostHeaderPlugin;
exports.getLoggerPlugin = getLoggerPlugin;
exports.getRetryPlugin = getRetryPlugin;
exports.getUserAgentPlugin = getUserAgentPlugin;
exports.loadConfig = loadConfig;
exports.parseUrl = parseUrl;
exports.resolveAwsAuthConfig = resolveAwsAuthConfig;
exports.resolveEndpointsConfig = resolveEndpointsConfig;
exports.resolveHostHeaderConfig = resolveHostHeaderConfig;
exports.resolveRegionConfig = resolveRegionConfig;
exports.resolveRetryConfig = resolveRetryConfig;
exports.resolveUserAgentConfig = resolveUserAgentConfig;
exports.streamCollector = streamCollector;
exports.toBase64 = toBase64;
exports.toHex = toHex;
exports.toUtf8 = toUtf8;
