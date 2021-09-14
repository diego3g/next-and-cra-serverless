'use strict';

var defaultRoleAssumers = require('./defaultRoleAssumers-cd1582cc.js');
var serdePlugin = require('./serdePlugin-281f3123.js');
var defaultHandler = require('./default-handler-8e2cab56.js');
var Stream = require('stream');
var fs = require('fs');
require('http2');
var index = require('./index-b67069db.js');
require('url');
require('buffer');
require('http');
require('os');
require('path');
require('crypto');
require('https');
require('process');
require('child_process');
require('./prerender-manifest.json');
require('./manifest.json');
require('./routes-manifest.json');
require('zlib');
require('perf_hooks');

var name = "@aws-sdk/client-s3";
var description = "AWS SDK for JavaScript S3 Client for Node.js, Browser and React Native";
var version = "3.27.0";
var scripts = {
	clean: "yarn remove-definitions && yarn remove-dist && yarn remove-documentation",
	"build-documentation": "yarn remove-documentation && typedoc ./",
	"remove-definitions": "rimraf ./types",
	"remove-dist": "rimraf ./dist",
	"remove-documentation": "rimraf ./docs",
	"test:unit": "mocha **/cjs/**/*.spec.js",
	"test:e2e": "mocha **/cjs/**/*.ispec.js && karma start karma.conf.js",
	test: "yarn test:unit",
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
	"@aws-sdk/eventstream-serde-browser": "3.25.0",
	"@aws-sdk/eventstream-serde-config-resolver": "3.25.0",
	"@aws-sdk/eventstream-serde-node": "3.25.0",
	"@aws-sdk/fetch-http-handler": "3.25.0",
	"@aws-sdk/hash-blob-browser": "3.25.0",
	"@aws-sdk/hash-node": "3.25.0",
	"@aws-sdk/hash-stream-node": "3.25.0",
	"@aws-sdk/invalid-dependency": "3.25.0",
	"@aws-sdk/md5-js": "3.25.0",
	"@aws-sdk/middleware-apply-body-checksum": "3.25.0",
	"@aws-sdk/middleware-bucket-endpoint": "3.27.0",
	"@aws-sdk/middleware-content-length": "3.25.0",
	"@aws-sdk/middleware-expect-continue": "3.25.0",
	"@aws-sdk/middleware-host-header": "3.25.0",
	"@aws-sdk/middleware-location-constraint": "3.25.0",
	"@aws-sdk/middleware-logger": "3.25.0",
	"@aws-sdk/middleware-retry": "3.27.0",
	"@aws-sdk/middleware-sdk-s3": "3.25.0",
	"@aws-sdk/middleware-serde": "3.25.0",
	"@aws-sdk/middleware-signing": "3.27.0",
	"@aws-sdk/middleware-ssec": "3.25.0",
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
	"@aws-sdk/util-waiter": "3.25.0",
	"@aws-sdk/xml-builder": "3.23.0",
	entities: "2.2.0",
	"fast-xml-parser": "3.19.0",
	tslib: "^2.3.0"
};
var devDependencies = {
	"@aws-sdk/client-documentation-generator": "3.23.0",
	"@types/chai": "^4.2.11",
	"@types/mocha": "^8.0.4",
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
var homepage = "https://github.com/aws/aws-sdk-js-v3/tree/main/clients/client-s3";
var repository = {
	type: "git",
	url: "https://github.com/aws/aws-sdk-js-v3.git",
	directory: "clients/client-s3"
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

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}

function __exportStar(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}
function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}
function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}

var tslib_es6 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  __extends: __extends,
  get __assign () { return __assign; },
  __rest: __rest,
  __decorate: __decorate,
  __param: __param,
  __metadata: __metadata,
  __awaiter: __awaiter,
  __generator: __generator,
  __createBinding: __createBinding,
  __exportStar: __exportStar,
  __values: __values,
  __read: __read,
  __spread: __spread,
  __spreadArrays: __spreadArrays,
  __await: __await,
  __asyncGenerator: __asyncGenerator,
  __asyncDelegator: __asyncDelegator,
  __asyncValues: __asyncValues,
  __makeTemplateObject: __makeTemplateObject,
  __importStar: __importStar,
  __importDefault: __importDefault,
  __classPrivateFieldGet: __classPrivateFieldGet,
  __classPrivateFieldSet: __classPrivateFieldSet
});

var tslib_1 = /*@__PURE__*/defaultHandler.getAugmentedNamespace(tslib_es6);

var build = defaultHandler.createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crc32 = exports.crc32 = void 0;

function crc32(data) {
    return new Crc32().update(data).digest();
}
exports.crc32 = crc32;
var Crc32 = /** @class */ (function () {
    function Crc32() {
        this.checksum = 0xffffffff;
    }
    Crc32.prototype.update = function (data) {
        var e_1, _a;
        try {
            for (var data_1 = tslib_1.__values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
                var byte = data_1_1.value;
                this.checksum =
                    (this.checksum >>> 8) ^ lookupTable[(this.checksum ^ byte) & 0xff];
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return this;
    };
    Crc32.prototype.digest = function () {
        return (this.checksum ^ 0xffffffff) >>> 0;
    };
    return Crc32;
}());
exports.Crc32 = Crc32;
// prettier-ignore
var lookupTable = Uint32Array.from([
    0x00000000, 0x77073096, 0xEE0E612C, 0x990951BA,
    0x076DC419, 0x706AF48F, 0xE963A535, 0x9E6495A3,
    0x0EDB8832, 0x79DCB8A4, 0xE0D5E91E, 0x97D2D988,
    0x09B64C2B, 0x7EB17CBD, 0xE7B82D07, 0x90BF1D91,
    0x1DB71064, 0x6AB020F2, 0xF3B97148, 0x84BE41DE,
    0x1ADAD47D, 0x6DDDE4EB, 0xF4D4B551, 0x83D385C7,
    0x136C9856, 0x646BA8C0, 0xFD62F97A, 0x8A65C9EC,
    0x14015C4F, 0x63066CD9, 0xFA0F3D63, 0x8D080DF5,
    0x3B6E20C8, 0x4C69105E, 0xD56041E4, 0xA2677172,
    0x3C03E4D1, 0x4B04D447, 0xD20D85FD, 0xA50AB56B,
    0x35B5A8FA, 0x42B2986C, 0xDBBBC9D6, 0xACBCF940,
    0x32D86CE3, 0x45DF5C75, 0xDCD60DCF, 0xABD13D59,
    0x26D930AC, 0x51DE003A, 0xC8D75180, 0xBFD06116,
    0x21B4F4B5, 0x56B3C423, 0xCFBA9599, 0xB8BDA50F,
    0x2802B89E, 0x5F058808, 0xC60CD9B2, 0xB10BE924,
    0x2F6F7C87, 0x58684C11, 0xC1611DAB, 0xB6662D3D,
    0x76DC4190, 0x01DB7106, 0x98D220BC, 0xEFD5102A,
    0x71B18589, 0x06B6B51F, 0x9FBFE4A5, 0xE8B8D433,
    0x7807C9A2, 0x0F00F934, 0x9609A88E, 0xE10E9818,
    0x7F6A0DBB, 0x086D3D2D, 0x91646C97, 0xE6635C01,
    0x6B6B51F4, 0x1C6C6162, 0x856530D8, 0xF262004E,
    0x6C0695ED, 0x1B01A57B, 0x8208F4C1, 0xF50FC457,
    0x65B0D9C6, 0x12B7E950, 0x8BBEB8EA, 0xFCB9887C,
    0x62DD1DDF, 0x15DA2D49, 0x8CD37CF3, 0xFBD44C65,
    0x4DB26158, 0x3AB551CE, 0xA3BC0074, 0xD4BB30E2,
    0x4ADFA541, 0x3DD895D7, 0xA4D1C46D, 0xD3D6F4FB,
    0x4369E96A, 0x346ED9FC, 0xAD678846, 0xDA60B8D0,
    0x44042D73, 0x33031DE5, 0xAA0A4C5F, 0xDD0D7CC9,
    0x5005713C, 0x270241AA, 0xBE0B1010, 0xC90C2086,
    0x5768B525, 0x206F85B3, 0xB966D409, 0xCE61E49F,
    0x5EDEF90E, 0x29D9C998, 0xB0D09822, 0xC7D7A8B4,
    0x59B33D17, 0x2EB40D81, 0xB7BD5C3B, 0xC0BA6CAD,
    0xEDB88320, 0x9ABFB3B6, 0x03B6E20C, 0x74B1D29A,
    0xEAD54739, 0x9DD277AF, 0x04DB2615, 0x73DC1683,
    0xE3630B12, 0x94643B84, 0x0D6D6A3E, 0x7A6A5AA8,
    0xE40ECF0B, 0x9309FF9D, 0x0A00AE27, 0x7D079EB1,
    0xF00F9344, 0x8708A3D2, 0x1E01F268, 0x6906C2FE,
    0xF762575D, 0x806567CB, 0x196C3671, 0x6E6B06E7,
    0xFED41B76, 0x89D32BE0, 0x10DA7A5A, 0x67DD4ACC,
    0xF9B9DF6F, 0x8EBEEFF9, 0x17B7BE43, 0x60B08ED5,
    0xD6D6A3E8, 0xA1D1937E, 0x38D8C2C4, 0x4FDFF252,
    0xD1BB67F1, 0xA6BC5767, 0x3FB506DD, 0x48B2364B,
    0xD80D2BDA, 0xAF0A1B4C, 0x36034AF6, 0x41047A60,
    0xDF60EFC3, 0xA867DF55, 0x316E8EEF, 0x4669BE79,
    0xCB61B38C, 0xBC66831A, 0x256FD2A0, 0x5268E236,
    0xCC0C7795, 0xBB0B4703, 0x220216B9, 0x5505262F,
    0xC5BA3BBE, 0xB2BD0B28, 0x2BB45A92, 0x5CB36A04,
    0xC2D7FFA7, 0xB5D0CF31, 0x2CD99E8B, 0x5BDEAE1D,
    0x9B64C2B0, 0xEC63F226, 0x756AA39C, 0x026D930A,
    0x9C0906A9, 0xEB0E363F, 0x72076785, 0x05005713,
    0x95BF4A82, 0xE2B87A14, 0x7BB12BAE, 0x0CB61B38,
    0x92D28E9B, 0xE5D5BE0D, 0x7CDCEFB7, 0x0BDBDF21,
    0x86D3D2D4, 0xF1D4E242, 0x68DDB3F8, 0x1FDA836E,
    0x81BE16CD, 0xF6B9265B, 0x6FB077E1, 0x18B74777,
    0x88085AE6, 0xFF0F6A70, 0x66063BCA, 0x11010B5C,
    0x8F659EFF, 0xF862AE69, 0x616BFFD3, 0x166CCF45,
    0xA00AE278, 0xD70DD2EE, 0x4E048354, 0x3903B3C2,
    0xA7672661, 0xD06016F7, 0x4969474D, 0x3E6E77DB,
    0xAED16A4A, 0xD9D65ADC, 0x40DF0B66, 0x37D83BF0,
    0xA9BCAE53, 0xDEBB9EC5, 0x47B2CF7F, 0x30B5FFE9,
    0xBDBDF21C, 0xCABAC28A, 0x53B39330, 0x24B4A3A6,
    0xBAD03605, 0xCDD70693, 0x54DE5729, 0x23D967BF,
    0xB3667A2E, 0xC4614AB8, 0x5D681B02, 0x2A6F2B94,
    0xB40BBE37, 0xC30C8EA1, 0x5A05DF1B, 0x2D02EF8D,
]);

});

/**
 * A lossless representation of a signed, 64-bit integer. Instances of this
 * class may be used in arithmetic expressions as if they were numeric
 * primitives, but the binary representation will be preserved unchanged as the
 * `bytes` property of the object. The bytes should be encoded as big-endian,
 * two's complement integers.
 */
var Int64 = /** @class */ (function () {
    function Int64(bytes) {
        this.bytes = bytes;
        if (bytes.byteLength !== 8) {
            throw new Error("Int64 buffers must be exactly 8 bytes");
        }
    }
    Int64.fromNumber = function (number) {
        if (number > 9223372036854775807 || number < -9223372036854775808) {
            throw new Error(number + " is too large (or, if negative, too small) to represent as an Int64");
        }
        var bytes = new Uint8Array(8);
        for (var i = 7, remaining = Math.abs(Math.round(number)); i > -1 && remaining > 0; i--, remaining /= 256) {
            bytes[i] = remaining;
        }
        if (number < 0) {
            negate(bytes);
        }
        return new Int64(bytes);
    };
    /**
     * Called implicitly by infix arithmetic operators.
     */
    Int64.prototype.valueOf = function () {
        var bytes = this.bytes.slice(0);
        var negative = bytes[0] & 128;
        if (negative) {
            negate(bytes);
        }
        return parseInt(defaultRoleAssumers.toHex(bytes), 16) * (negative ? -1 : 1);
    };
    Int64.prototype.toString = function () {
        return String(this.valueOf());
    };
    return Int64;
}());
function negate(bytes) {
    for (var i = 0; i < 8; i++) {
        bytes[i] ^= 0xff;
    }
    for (var i = 7; i > -1; i--) {
        bytes[i]++;
        if (bytes[i] !== 0)
            break;
    }
}

/**
 * @internal
 */
var HeaderMarshaller = /** @class */ (function () {
    function HeaderMarshaller(toUtf8, fromUtf8) {
        this.toUtf8 = toUtf8;
        this.fromUtf8 = fromUtf8;
    }
    HeaderMarshaller.prototype.format = function (headers) {
        var e_1, _a, e_2, _b;
        var chunks = [];
        try {
            for (var _c = serdePlugin.__values(Object.keys(headers)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var headerName = _d.value;
                var bytes = this.fromUtf8(headerName);
                chunks.push(Uint8Array.from([bytes.byteLength]), bytes, this.formatHeaderValue(headers[headerName]));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var out = new Uint8Array(chunks.reduce(function (carry, bytes) { return carry + bytes.byteLength; }, 0));
        var position = 0;
        try {
            for (var chunks_1 = serdePlugin.__values(chunks), chunks_1_1 = chunks_1.next(); !chunks_1_1.done; chunks_1_1 = chunks_1.next()) {
                var chunk = chunks_1_1.value;
                out.set(chunk, position);
                position += chunk.byteLength;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (chunks_1_1 && !chunks_1_1.done && (_b = chunks_1.return)) _b.call(chunks_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return out;
    };
    HeaderMarshaller.prototype.formatHeaderValue = function (header) {
        switch (header.type) {
            case "boolean":
                return Uint8Array.from([header.value ? 0 /* boolTrue */ : 1 /* boolFalse */]);
            case "byte":
                return Uint8Array.from([2 /* byte */, header.value]);
            case "short":
                var shortView = new DataView(new ArrayBuffer(3));
                shortView.setUint8(0, 3 /* short */);
                shortView.setInt16(1, header.value, false);
                return new Uint8Array(shortView.buffer);
            case "integer":
                var intView = new DataView(new ArrayBuffer(5));
                intView.setUint8(0, 4 /* integer */);
                intView.setInt32(1, header.value, false);
                return new Uint8Array(intView.buffer);
            case "long":
                var longBytes = new Uint8Array(9);
                longBytes[0] = 5 /* long */;
                longBytes.set(header.value.bytes, 1);
                return longBytes;
            case "binary":
                var binView = new DataView(new ArrayBuffer(3 + header.value.byteLength));
                binView.setUint8(0, 6 /* byteArray */);
                binView.setUint16(1, header.value.byteLength, false);
                var binBytes = new Uint8Array(binView.buffer);
                binBytes.set(header.value, 3);
                return binBytes;
            case "string":
                var utf8Bytes = this.fromUtf8(header.value);
                var strView = new DataView(new ArrayBuffer(3 + utf8Bytes.byteLength));
                strView.setUint8(0, 7 /* string */);
                strView.setUint16(1, utf8Bytes.byteLength, false);
                var strBytes = new Uint8Array(strView.buffer);
                strBytes.set(utf8Bytes, 3);
                return strBytes;
            case "timestamp":
                var tsBytes = new Uint8Array(9);
                tsBytes[0] = 8 /* timestamp */;
                tsBytes.set(Int64.fromNumber(header.value.valueOf()).bytes, 1);
                return tsBytes;
            case "uuid":
                if (!UUID_PATTERN.test(header.value)) {
                    throw new Error("Invalid UUID received: " + header.value);
                }
                var uuidBytes = new Uint8Array(17);
                uuidBytes[0] = 9 /* uuid */;
                uuidBytes.set(defaultRoleAssumers.fromHex(header.value.replace(/\-/g, "")), 1);
                return uuidBytes;
        }
    };
    HeaderMarshaller.prototype.parse = function (headers) {
        var out = {};
        var position = 0;
        while (position < headers.byteLength) {
            var nameLength = headers.getUint8(position++);
            var name = this.toUtf8(new Uint8Array(headers.buffer, headers.byteOffset + position, nameLength));
            position += nameLength;
            switch (headers.getUint8(position++)) {
                case 0 /* boolTrue */:
                    out[name] = {
                        type: BOOLEAN_TAG,
                        value: true,
                    };
                    break;
                case 1 /* boolFalse */:
                    out[name] = {
                        type: BOOLEAN_TAG,
                        value: false,
                    };
                    break;
                case 2 /* byte */:
                    out[name] = {
                        type: BYTE_TAG,
                        value: headers.getInt8(position++),
                    };
                    break;
                case 3 /* short */:
                    out[name] = {
                        type: SHORT_TAG,
                        value: headers.getInt16(position, false),
                    };
                    position += 2;
                    break;
                case 4 /* integer */:
                    out[name] = {
                        type: INT_TAG,
                        value: headers.getInt32(position, false),
                    };
                    position += 4;
                    break;
                case 5 /* long */:
                    out[name] = {
                        type: LONG_TAG,
                        value: new Int64(new Uint8Array(headers.buffer, headers.byteOffset + position, 8)),
                    };
                    position += 8;
                    break;
                case 6 /* byteArray */:
                    var binaryLength = headers.getUint16(position, false);
                    position += 2;
                    out[name] = {
                        type: BINARY_TAG,
                        value: new Uint8Array(headers.buffer, headers.byteOffset + position, binaryLength),
                    };
                    position += binaryLength;
                    break;
                case 7 /* string */:
                    var stringLength = headers.getUint16(position, false);
                    position += 2;
                    out[name] = {
                        type: STRING_TAG,
                        value: this.toUtf8(new Uint8Array(headers.buffer, headers.byteOffset + position, stringLength)),
                    };
                    position += stringLength;
                    break;
                case 8 /* timestamp */:
                    out[name] = {
                        type: TIMESTAMP_TAG,
                        value: new Date(new Int64(new Uint8Array(headers.buffer, headers.byteOffset + position, 8)).valueOf()),
                    };
                    position += 8;
                    break;
                case 9 /* uuid */:
                    var uuidBytes = new Uint8Array(headers.buffer, headers.byteOffset + position, 16);
                    position += 16;
                    out[name] = {
                        type: UUID_TAG,
                        value: defaultRoleAssumers.toHex(uuidBytes.subarray(0, 4)) + "-" + defaultRoleAssumers.toHex(uuidBytes.subarray(4, 6)) + "-" + defaultRoleAssumers.toHex(uuidBytes.subarray(6, 8)) + "-" + defaultRoleAssumers.toHex(uuidBytes.subarray(8, 10)) + "-" + defaultRoleAssumers.toHex(uuidBytes.subarray(10)),
                    };
                    break;
                default:
                    throw new Error("Unrecognized header type tag");
            }
        }
        return out;
    };
    return HeaderMarshaller;
}());
var HEADER_VALUE_TYPE;
(function (HEADER_VALUE_TYPE) {
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["boolTrue"] = 0] = "boolTrue";
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["boolFalse"] = 1] = "boolFalse";
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["byte"] = 2] = "byte";
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["short"] = 3] = "short";
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["integer"] = 4] = "integer";
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["long"] = 5] = "long";
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["byteArray"] = 6] = "byteArray";
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["string"] = 7] = "string";
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["timestamp"] = 8] = "timestamp";
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["uuid"] = 9] = "uuid";
})(HEADER_VALUE_TYPE || (HEADER_VALUE_TYPE = {}));
var BOOLEAN_TAG = "boolean";
var BYTE_TAG = "byte";
var SHORT_TAG = "short";
var INT_TAG = "integer";
var LONG_TAG = "long";
var BINARY_TAG = "binary";
var STRING_TAG = "string";
var TIMESTAMP_TAG = "timestamp";
var UUID_TAG = "uuid";
var UUID_PATTERN = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;

// All prelude components are unsigned, 32-bit integers
var PRELUDE_MEMBER_LENGTH = 4;
// The prelude consists of two components
var PRELUDE_LENGTH = PRELUDE_MEMBER_LENGTH * 2;
// Checksums are always CRC32 hashes.
var CHECKSUM_LENGTH = 4;
// Messages must include a full prelude, a prelude checksum, and a message checksum
var MINIMUM_MESSAGE_LENGTH = PRELUDE_LENGTH + CHECKSUM_LENGTH * 2;
/**
 * @internal
 */
function splitMessage(_a) {
    var byteLength = _a.byteLength, byteOffset = _a.byteOffset, buffer = _a.buffer;
    if (byteLength < MINIMUM_MESSAGE_LENGTH) {
        throw new Error("Provided message too short to accommodate event stream message overhead");
    }
    var view = new DataView(buffer, byteOffset, byteLength);
    var messageLength = view.getUint32(0, false);
    if (byteLength !== messageLength) {
        throw new Error("Reported message length does not match received message length");
    }
    var headerLength = view.getUint32(PRELUDE_MEMBER_LENGTH, false);
    var expectedPreludeChecksum = view.getUint32(PRELUDE_LENGTH, false);
    var expectedMessageChecksum = view.getUint32(byteLength - CHECKSUM_LENGTH, false);
    var checksummer = new build.Crc32().update(new Uint8Array(buffer, byteOffset, PRELUDE_LENGTH));
    if (expectedPreludeChecksum !== checksummer.digest()) {
        throw new Error("The prelude checksum specified in the message (" + expectedPreludeChecksum + ") does not match the calculated CRC32 checksum (" + checksummer.digest() + ")");
    }
    checksummer.update(new Uint8Array(buffer, byteOffset + PRELUDE_LENGTH, byteLength - (PRELUDE_LENGTH + CHECKSUM_LENGTH)));
    if (expectedMessageChecksum !== checksummer.digest()) {
        throw new Error("The message checksum (" + checksummer.digest() + ") did not match the expected value of " + expectedMessageChecksum);
    }
    return {
        headers: new DataView(buffer, byteOffset + PRELUDE_LENGTH + CHECKSUM_LENGTH, headerLength),
        body: new Uint8Array(buffer, byteOffset + PRELUDE_LENGTH + CHECKSUM_LENGTH + headerLength, messageLength - headerLength - (PRELUDE_LENGTH + CHECKSUM_LENGTH + CHECKSUM_LENGTH)),
    };
}

/**
 * A marshaller that can convert binary-packed event stream messages into
 * JavaScript objects and back again into their binary format.
 */
var EventStreamMarshaller$2 = /** @class */ (function () {
    function EventStreamMarshaller(toUtf8, fromUtf8) {
        this.headerMarshaller = new HeaderMarshaller(toUtf8, fromUtf8);
    }
    /**
     * Convert a structured JavaScript object with tagged headers into a binary
     * event stream message.
     */
    EventStreamMarshaller.prototype.marshall = function (_a) {
        var rawHeaders = _a.headers, body = _a.body;
        var headers = this.headerMarshaller.format(rawHeaders);
        var length = headers.byteLength + body.byteLength + 16;
        var out = new Uint8Array(length);
        var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
        var checksum = new build.Crc32();
        // Format message
        view.setUint32(0, length, false);
        view.setUint32(4, headers.byteLength, false);
        view.setUint32(8, checksum.update(out.subarray(0, 8)).digest(), false);
        out.set(headers, 12);
        out.set(body, headers.byteLength + 12);
        // Write trailing message checksum
        view.setUint32(length - 4, checksum.update(out.subarray(8, length - 4)).digest(), false);
        return out;
    };
    /**
     * Convert a binary event stream message into a JavaScript object with an
     * opaque, binary body and tagged, parsed headers.
     */
    EventStreamMarshaller.prototype.unmarshall = function (message) {
        var _a = splitMessage(message), headers = _a.headers, body = _a.body;
        return { headers: this.headerMarshaller.parse(headers), body: body };
    };
    /**
     * Convert a structured JavaScript object with tagged headers into a binary
     * event stream message header.
     */
    EventStreamMarshaller.prototype.formatHeaders = function (rawHeaders) {
        return this.headerMarshaller.format(rawHeaders);
    };
    return EventStreamMarshaller;
}());

function getChunkedStream(source) {
    var _a;
    var currentMessageTotalLength = 0;
    var currentMessagePendingLength = 0;
    var currentMessage = null;
    var messageLengthBuffer = null;
    var allocateMessage = function (size) {
        if (typeof size !== "number") {
            throw new Error("Attempted to allocate an event message where size was not a number: " + size);
        }
        currentMessageTotalLength = size;
        currentMessagePendingLength = 4;
        currentMessage = new Uint8Array(size);
        var currentMessageView = new DataView(currentMessage.buffer);
        currentMessageView.setUint32(0, size, false); //set big-endian Uint32 to 0~3 bytes
    };
    var iterator = function () {
        return serdePlugin.__asyncGenerator(this, arguments, function () {
            var sourceIterator, _a, value, done, chunkLength, currentOffset, bytesRemaining, numBytesForTotal, numBytesToWrite;
            return serdePlugin.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        sourceIterator = source[Symbol.asyncIterator]();
                        _b.label = 1;
                    case 1:
                        return [4 /*yield*/, serdePlugin.__await(sourceIterator.next())];
                    case 2:
                        _a = _b.sent(), value = _a.value, done = _a.done;
                        if (!done) return [3 /*break*/, 10];
                        if (!!currentMessageTotalLength) return [3 /*break*/, 4];
                        return [4 /*yield*/, serdePlugin.__await(void 0)];
                    case 3: return [2 /*return*/, _b.sent()];
                    case 4:
                        if (!(currentMessageTotalLength === currentMessagePendingLength)) return [3 /*break*/, 7];
                        return [4 /*yield*/, serdePlugin.__await(currentMessage)];
                    case 5: return [4 /*yield*/, _b.sent()];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 8];
                    case 7: throw new Error("Truncated event message received.");
                    case 8: return [4 /*yield*/, serdePlugin.__await(void 0)];
                    case 9: return [2 /*return*/, _b.sent()];
                    case 10:
                        chunkLength = value.length;
                        currentOffset = 0;
                        _b.label = 11;
                    case 11:
                        if (!(currentOffset < chunkLength)) return [3 /*break*/, 15];
                        // create new message if necessary
                        if (!currentMessage) {
                            bytesRemaining = chunkLength - currentOffset;
                            // prevent edge case where total length spans 2 chunks
                            if (!messageLengthBuffer) {
                                messageLengthBuffer = new Uint8Array(4);
                            }
                            numBytesForTotal = Math.min(4 - currentMessagePendingLength, // remaining bytes to fill the messageLengthBuffer
                            bytesRemaining // bytes left in chunk
                            );
                            messageLengthBuffer.set(
                            // @ts-ignore error TS2532: Object is possibly 'undefined' for value
                            value.slice(currentOffset, currentOffset + numBytesForTotal), currentMessagePendingLength);
                            currentMessagePendingLength += numBytesForTotal;
                            currentOffset += numBytesForTotal;
                            if (currentMessagePendingLength < 4) {
                                // not enough information to create the current message
                                return [3 /*break*/, 15];
                            }
                            allocateMessage(new DataView(messageLengthBuffer.buffer).getUint32(0, false));
                            messageLengthBuffer = null;
                        }
                        numBytesToWrite = Math.min(currentMessageTotalLength - currentMessagePendingLength, // number of bytes left to complete message
                        chunkLength - currentOffset // number of bytes left in the original chunk
                        );
                        currentMessage.set(
                        // @ts-ignore error TS2532: Object is possibly 'undefined' for value
                        value.slice(currentOffset, currentOffset + numBytesToWrite), currentMessagePendingLength);
                        currentMessagePendingLength += numBytesToWrite;
                        currentOffset += numBytesToWrite;
                        if (!(currentMessageTotalLength && currentMessageTotalLength === currentMessagePendingLength)) return [3 /*break*/, 14];
                        return [4 /*yield*/, serdePlugin.__await(currentMessage)];
                    case 12: 
                    // push out the message
                    return [4 /*yield*/, _b.sent()];
                    case 13:
                        // push out the message
                        _b.sent();
                        // cleanup
                        currentMessage = null;
                        currentMessageTotalLength = 0;
                        currentMessagePendingLength = 0;
                        _b.label = 14;
                    case 14: return [3 /*break*/, 11];
                    case 15: return [3 /*break*/, 1];
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    return _a = {},
        _a[Symbol.asyncIterator] = iterator,
        _a;
}

function getUnmarshalledStream(source, options) {
    var _a;
    return _a = {},
        _a[Symbol.asyncIterator] = function () {
            return serdePlugin.__asyncGenerator(this, arguments, function () {
                var source_1, source_1_1, chunk, message, messageType, unmodeledError, code, exception, deserializedException, error, event, deserialized, e_1_1;
                var _a, _b;
                var e_1, _c;
                return serdePlugin.__generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _d.trys.push([0, 12, 13, 18]);
                            source_1 = serdePlugin.__asyncValues(source);
                            _d.label = 1;
                        case 1: return [4 /*yield*/, serdePlugin.__await(source_1.next())];
                        case 2:
                            if (!(source_1_1 = _d.sent(), !source_1_1.done)) return [3 /*break*/, 11];
                            chunk = source_1_1.value;
                            message = options.eventMarshaller.unmarshall(chunk);
                            messageType = message.headers[":message-type"].value;
                            if (!(messageType === "error")) return [3 /*break*/, 3];
                            unmodeledError = new Error(message.headers[":error-message"].value || "UnknownError");
                            unmodeledError.name = message.headers[":error-code"].value;
                            throw unmodeledError;
                        case 3:
                            if (!(messageType === "exception")) return [3 /*break*/, 5];
                            code = message.headers[":exception-type"].value;
                            exception = (_a = {}, _a[code] = message, _a);
                            return [4 /*yield*/, serdePlugin.__await(options.deserializer(exception))];
                        case 4:
                            deserializedException = _d.sent();
                            if (deserializedException.$unknown) {
                                error = new Error(options.toUtf8(message.body));
                                error.name = code;
                                throw error;
                            }
                            throw deserializedException[code];
                        case 5:
                            if (!(messageType === "event")) return [3 /*break*/, 9];
                            event = (_b = {},
                                _b[message.headers[":event-type"].value] = message,
                                _b);
                            return [4 /*yield*/, serdePlugin.__await(options.deserializer(event))];
                        case 6:
                            deserialized = _d.sent();
                            if (deserialized.$unknown)
                                return [3 /*break*/, 10];
                            return [4 /*yield*/, serdePlugin.__await(deserialized)];
                        case 7: return [4 /*yield*/, _d.sent()];
                        case 8:
                            _d.sent();
                            return [3 /*break*/, 10];
                        case 9: throw Error("Unrecognizable event type: " + message.headers[":event-type"].value);
                        case 10: return [3 /*break*/, 1];
                        case 11: return [3 /*break*/, 18];
                        case 12:
                            e_1_1 = _d.sent();
                            e_1 = { error: e_1_1 };
                            return [3 /*break*/, 18];
                        case 13:
                            _d.trys.push([13, , 16, 17]);
                            if (!(source_1_1 && !source_1_1.done && (_c = source_1.return))) return [3 /*break*/, 15];
                            return [4 /*yield*/, serdePlugin.__await(_c.call(source_1))];
                        case 14:
                            _d.sent();
                            _d.label = 15;
                        case 15: return [3 /*break*/, 17];
                        case 16:
                            if (e_1) throw e_1.error;
                            return [7 /*endfinally*/];
                        case 17: return [7 /*endfinally*/];
                        case 18: return [2 /*return*/];
                    }
                });
            });
        },
        _a;
}

var EventStreamMarshaller$1 = /** @class */ (function () {
    function EventStreamMarshaller(_a) {
        var utf8Encoder = _a.utf8Encoder, utf8Decoder = _a.utf8Decoder;
        this.eventMarshaller = new EventStreamMarshaller$2(utf8Encoder, utf8Decoder);
        this.utfEncoder = utf8Encoder;
    }
    EventStreamMarshaller.prototype.deserialize = function (body, deserializer) {
        var chunkedStream = getChunkedStream(body);
        var unmarshalledStream = getUnmarshalledStream(chunkedStream, {
            eventMarshaller: this.eventMarshaller,
            deserializer: deserializer,
            toUtf8: this.utfEncoder,
        });
        return unmarshalledStream;
    };
    EventStreamMarshaller.prototype.serialize = function (input, serializer) {
        var _a;
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var self = this;
        var serializedIterator = function () {
            return serdePlugin.__asyncGenerator(this, arguments, function () {
                var input_1, input_1_1, chunk, payloadBuf, e_1_1;
                var e_1, _a;
                return serdePlugin.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 7, 8, 13]);
                            input_1 = serdePlugin.__asyncValues(input);
                            _b.label = 1;
                        case 1: return [4 /*yield*/, serdePlugin.__await(input_1.next())];
                        case 2:
                            if (!(input_1_1 = _b.sent(), !input_1_1.done)) return [3 /*break*/, 6];
                            chunk = input_1_1.value;
                            payloadBuf = self.eventMarshaller.marshall(serializer(chunk));
                            return [4 /*yield*/, serdePlugin.__await(payloadBuf)];
                        case 3: return [4 /*yield*/, _b.sent()];
                        case 4:
                            _b.sent();
                            _b.label = 5;
                        case 5: return [3 /*break*/, 1];
                        case 6: return [3 /*break*/, 13];
                        case 7:
                            e_1_1 = _b.sent();
                            e_1 = { error: e_1_1 };
                            return [3 /*break*/, 13];
                        case 8:
                            _b.trys.push([8, , 11, 12]);
                            if (!(input_1_1 && !input_1_1.done && (_a = input_1.return))) return [3 /*break*/, 10];
                            return [4 /*yield*/, serdePlugin.__await(_a.call(input_1))];
                        case 9:
                            _b.sent();
                            _b.label = 10;
                        case 10: return [3 /*break*/, 12];
                        case 11:
                            if (e_1) throw e_1.error;
                            return [7 /*endfinally*/];
                        case 12: return [7 /*endfinally*/];
                        case 13: return [4 /*yield*/, serdePlugin.__await(new Uint8Array(0))];
                        case 14: 
                        // Ending frame
                        return [4 /*yield*/, _b.sent()];
                        case 15:
                            // Ending frame
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return _a = {},
            _a[Symbol.asyncIterator] = serializedIterator,
            _a;
    };
    return EventStreamMarshaller;
}());

/**
 * Convert object stream piped in into an async iterable. This
 * daptor should be deprecated when Node stream iterator is stable.
 * Caveat: this adaptor won't have backpressure to inwards stream
 *
 * Reference: https://nodejs.org/docs/latest-v11.x/api/stream.html#stream_readable_symbol_asynciterator
 */
function readabletoIterable(readStream) {
    return serdePlugin.__asyncGenerator(this, arguments, function readabletoIterable_1() {
        var streamEnded, generationEnded, records, value;
        return serdePlugin.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    streamEnded = false;
                    generationEnded = false;
                    records = new Array();
                    readStream.on("error", function (err) {
                        if (!streamEnded) {
                            streamEnded = true;
                        }
                        if (err) {
                            throw err;
                        }
                    });
                    readStream.on("data", function (data) {
                        records.push(data);
                    });
                    readStream.on("end", function () {
                        streamEnded = true;
                    });
                    _a.label = 1;
                case 1:
                    if (!!generationEnded) return [3 /*break*/, 6];
                    return [4 /*yield*/, serdePlugin.__await(new Promise(function (resolve) { return setTimeout(function () { return resolve(records.shift()); }, 0); }))];
                case 2:
                    value = _a.sent();
                    if (!value) return [3 /*break*/, 5];
                    return [4 /*yield*/, serdePlugin.__await(value)];
                case 3: return [4 /*yield*/, _a.sent()];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    generationEnded = streamEnded && records.length === 0;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/];
            }
        });
    });
}

var EventStreamMarshaller = /** @class */ (function () {
    function EventStreamMarshaller(_a) {
        var utf8Encoder = _a.utf8Encoder, utf8Decoder = _a.utf8Decoder;
        this.eventMarshaller = new EventStreamMarshaller$2(utf8Encoder, utf8Decoder);
        this.universalMarshaller = new EventStreamMarshaller$1({
            utf8Decoder: utf8Decoder,
            utf8Encoder: utf8Encoder,
        });
    }
    EventStreamMarshaller.prototype.deserialize = function (body, deserializer) {
        //should use stream[Symbol.asyncIterable] when the api is stable
        //reference: https://nodejs.org/docs/latest-v11.x/api/stream.html#stream_readable_symbol_asynciterator
        var bodyIterable = typeof body[Symbol.asyncIterator] === "function" ? body : readabletoIterable(body);
        return this.universalMarshaller.deserialize(bodyIterable, deserializer);
    };
    EventStreamMarshaller.prototype.serialize = function (input, serializer) {
        var serializedIterable = this.universalMarshaller.serialize(input, serializer);
        if (typeof Stream.Readable.from === "function") {
            //reference: https://nodejs.org/dist/latest-v13.x/docs/api/stream.html#stream_new_stream_readable_options
            return Stream.Readable.from(serializedIterable);
        }
        else {
            var iterator_1 = serializedIterable[Symbol.asyncIterator]();
            var serializedStream_1 = new Stream.Readable({
                autoDestroy: true,
                objectMode: true,
                read: function () {
                    return serdePlugin.__awaiter(this, void 0, void 0, function () {
                        var _this = this;
                        return serdePlugin.__generator(this, function (_a) {
                            iterator_1
                                .next()
                                .then(function (_a) {
                                var done = _a.done, value = _a.value;
                                if (done) {
                                    _this.push(null);
                                }
                                else {
                                    _this.push(value);
                                }
                            })
                                .catch(function (err) {
                                _this.destroy(err);
                            });
                            return [2 /*return*/];
                        });
                    });
                },
            });
            //TODO: use 'autoDestroy' when targeting Node 11
            serializedStream_1.on("error", function () {
                serializedStream_1.destroy();
            });
            serializedStream_1.on("end", function () {
                serializedStream_1.destroy();
            });
            return serializedStream_1;
        }
    };
    return EventStreamMarshaller;
}());

/** NodeJS event stream utils provider */
var eventStreamSerdeProvider = function (options) { return new EventStreamMarshaller(options); };

var HashCalculator = /** @class */ (function (_super) {
    serdePlugin.__extends(HashCalculator, _super);
    function HashCalculator(hash, options) {
        var _this = _super.call(this, options) || this;
        _this.hash = hash;
        return _this;
    }
    HashCalculator.prototype._write = function (chunk, encoding, callback) {
        try {
            this.hash.update(chunk);
        }
        catch (err) {
            return callback(err);
        }
        callback();
    };
    return HashCalculator;
}(Stream.Writable));

var fileStreamHasher = function fileStreamHasher(hashCtor, fileStream) {
    return new Promise(function (resolve, reject) {
        if (!isReadStream(fileStream)) {
            reject(new Error("Unable to calculate hash for non-file streams."));
            return;
        }
        var fileStreamTee = fs.createReadStream(fileStream.path, {
            start: fileStream.start,
            end: fileStream.end,
        });
        var hash = new hashCtor();
        var hashCalculator = new HashCalculator(hash);
        fileStreamTee.pipe(hashCalculator);
        fileStreamTee.on("error", function (err) {
            // if the source errors, the destination stream needs to manually end
            hashCalculator.end();
            reject(err);
        });
        hashCalculator.on("error", reject);
        hashCalculator.on("finish", function () {
            hash.digest().then(resolve).catch(reject);
        });
    });
};
function isReadStream(stream) {
    return typeof stream.path === "string";
}

function resolveBucketEndpointConfig(input) {
    var _a = input.bucketEndpoint, bucketEndpoint = _a === void 0 ? false : _a, _b = input.forcePathStyle, forcePathStyle = _b === void 0 ? false : _b, _c = input.useAccelerateEndpoint, useAccelerateEndpoint = _c === void 0 ? false : _c, _d = input.useDualstackEndpoint, useDualstackEndpoint = _d === void 0 ? false : _d, _e = input.useArnRegion, useArnRegion = _e === void 0 ? false : _e;
    return serdePlugin.__assign(serdePlugin.__assign({}, input), { bucketEndpoint: bucketEndpoint,
        forcePathStyle: forcePathStyle,
        useAccelerateEndpoint: useAccelerateEndpoint,
        useDualstackEndpoint: useDualstackEndpoint, useArnRegion: typeof useArnRegion === "function" ? useArnRegion : function () { return Promise.resolve(useArnRegion); } });
}
var NODE_USE_ARN_REGION_ENV_NAME = "AWS_S3_USE_ARN_REGION";
var NODE_USE_ARN_REGION_INI_NAME = "s3_use_arn_region";
/**
 * Config to load useArnRegion from environment variables and shared INI files
 *
 * @api private
 */
var NODE_USE_ARN_REGION_CONFIG_OPTIONS = {
    environmentVariableSelector: function (env) {
        if (!Object.prototype.hasOwnProperty.call(env, NODE_USE_ARN_REGION_ENV_NAME))
            return undefined;
        if (env[NODE_USE_ARN_REGION_ENV_NAME] === "true")
            return true;
        if (env[NODE_USE_ARN_REGION_ENV_NAME] === "false")
            return false;
        throw new Error("Cannot load env " + NODE_USE_ARN_REGION_ENV_NAME + ". Expected \"true\" or \"false\", got " + env[NODE_USE_ARN_REGION_ENV_NAME] + ".");
    },
    configFileSelector: function (profile) {
        if (!Object.prototype.hasOwnProperty.call(profile, NODE_USE_ARN_REGION_INI_NAME))
            return undefined;
        if (profile[NODE_USE_ARN_REGION_INI_NAME] === "true")
            return true;
        if (profile[NODE_USE_ARN_REGION_INI_NAME] === "false")
            return false;
        throw new Error("Cannot load shared config entry " + NODE_USE_ARN_REGION_INI_NAME + ". Expected \"true\" or \"false\", got " + profile[NODE_USE_ARN_REGION_INI_NAME] + ".");
    },
    default: false,
};

// Partition default templates
const AWS_TEMPLATE = "s3.{region}.amazonaws.com";
const AWS_CN_TEMPLATE = "s3.{region}.amazonaws.com.cn";
const AWS_ISO_TEMPLATE = "s3.{region}.c2s.ic.gov";
const AWS_ISO_B_TEMPLATE = "s3.{region}.sc2s.sgov.gov";
const AWS_US_GOV_TEMPLATE = "s3.{region}.amazonaws.com";
// Partition regions
const AWS_REGIONS = new Set([
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
const AWS_CN_REGIONS = new Set(["cn-north-1", "cn-northwest-1"]);
const AWS_ISO_REGIONS = new Set(["us-iso-east-1"]);
const AWS_ISO_B_REGIONS = new Set(["us-isob-east-1"]);
const AWS_US_GOV_REGIONS = new Set(["us-gov-east-1", "us-gov-west-1"]);
const defaultRegionInfoProvider = (region, options) => {
    let regionInfo = undefined;
    switch (region) {
        // First, try to match exact region names.
        case "accesspoint-af-south-1":
            regionInfo = {
                hostname: "s3-accesspoint.af-south-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "accesspoint-ap-east-1":
            regionInfo = {
                hostname: "s3-accesspoint.ap-east-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "accesspoint-ap-northeast-1":
            regionInfo = {
                hostname: "s3-accesspoint.ap-northeast-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "accesspoint-ap-northeast-2":
            regionInfo = {
                hostname: "s3-accesspoint.ap-northeast-2.amazonaws.com",
                partition: "aws",
            };
            break;
        case "accesspoint-ap-northeast-3":
            regionInfo = {
                hostname: "s3-accesspoint.ap-northeast-3.amazonaws.com",
                partition: "aws",
            };
            break;
        case "accesspoint-ap-south-1":
            regionInfo = {
                hostname: "s3-accesspoint.ap-south-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "accesspoint-ap-southeast-1":
            regionInfo = {
                hostname: "s3-accesspoint.ap-southeast-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "accesspoint-ap-southeast-2":
            regionInfo = {
                hostname: "s3-accesspoint.ap-southeast-2.amazonaws.com",
                partition: "aws",
            };
            break;
        case "accesspoint-ca-central-1":
            regionInfo = {
                hostname: "s3-accesspoint.ca-central-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "accesspoint-cn-north-1":
            regionInfo = {
                hostname: "s3-accesspoint.cn-north-1.amazonaws.com.cn",
                partition: "aws-cn",
            };
            break;
        case "accesspoint-cn-northwest-1":
            regionInfo = {
                hostname: "s3-accesspoint.cn-northwest-1.amazonaws.com.cn",
                partition: "aws-cn",
            };
            break;
        case "accesspoint-eu-central-1":
            regionInfo = {
                hostname: "s3-accesspoint.eu-central-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "accesspoint-eu-north-1":
            regionInfo = {
                hostname: "s3-accesspoint.eu-north-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "accesspoint-eu-south-1":
            regionInfo = {
                hostname: "s3-accesspoint.eu-south-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "accesspoint-eu-west-1":
            regionInfo = {
                hostname: "s3-accesspoint.eu-west-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "accesspoint-eu-west-2":
            regionInfo = {
                hostname: "s3-accesspoint.eu-west-2.amazonaws.com",
                partition: "aws",
            };
            break;
        case "accesspoint-eu-west-3":
            regionInfo = {
                hostname: "s3-accesspoint.eu-west-3.amazonaws.com",
                partition: "aws",
            };
            break;
        case "accesspoint-me-south-1":
            regionInfo = {
                hostname: "s3-accesspoint.me-south-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "accesspoint-sa-east-1":
            regionInfo = {
                hostname: "s3-accesspoint.sa-east-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "accesspoint-us-east-1":
            regionInfo = {
                hostname: "s3-accesspoint.us-east-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "accesspoint-us-east-2":
            regionInfo = {
                hostname: "s3-accesspoint.us-east-2.amazonaws.com",
                partition: "aws",
            };
            break;
        case "accesspoint-us-gov-east-1":
            regionInfo = {
                hostname: "s3-accesspoint.us-gov-east-1.amazonaws.com",
                partition: "aws-us-gov",
            };
            break;
        case "accesspoint-us-gov-west-1":
            regionInfo = {
                hostname: "s3-accesspoint.us-gov-west-1.amazonaws.com",
                partition: "aws-us-gov",
            };
            break;
        case "accesspoint-us-west-1":
            regionInfo = {
                hostname: "s3-accesspoint.us-west-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "accesspoint-us-west-2":
            regionInfo = {
                hostname: "s3-accesspoint.us-west-2.amazonaws.com",
                partition: "aws",
            };
            break;
        case "af-south-1":
            regionInfo = {
                hostname: "s3.af-south-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "ap-east-1":
            regionInfo = {
                hostname: "s3.ap-east-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "ap-northeast-1":
            regionInfo = {
                hostname: "s3.ap-northeast-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "ap-northeast-2":
            regionInfo = {
                hostname: "s3.ap-northeast-2.amazonaws.com",
                partition: "aws",
            };
            break;
        case "ap-northeast-3":
            regionInfo = {
                hostname: "s3.ap-northeast-3.amazonaws.com",
                partition: "aws",
            };
            break;
        case "ap-south-1":
            regionInfo = {
                hostname: "s3.ap-south-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "ap-southeast-1":
            regionInfo = {
                hostname: "s3.ap-southeast-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "ap-southeast-2":
            regionInfo = {
                hostname: "s3.ap-southeast-2.amazonaws.com",
                partition: "aws",
            };
            break;
        case "aws-global":
            regionInfo = {
                hostname: "s3.amazonaws.com",
                partition: "aws",
                signingRegion: "us-east-1",
            };
            break;
        case "ca-central-1":
            regionInfo = {
                hostname: "s3.ca-central-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "cn-north-1":
            regionInfo = {
                hostname: "s3.cn-north-1.amazonaws.com.cn",
                partition: "aws-cn",
            };
            break;
        case "cn-northwest-1":
            regionInfo = {
                hostname: "s3.cn-northwest-1.amazonaws.com.cn",
                partition: "aws-cn",
            };
            break;
        case "eu-central-1":
            regionInfo = {
                hostname: "s3.eu-central-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "eu-north-1":
            regionInfo = {
                hostname: "s3.eu-north-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "eu-south-1":
            regionInfo = {
                hostname: "s3.eu-south-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "eu-west-1":
            regionInfo = {
                hostname: "s3.eu-west-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "eu-west-2":
            regionInfo = {
                hostname: "s3.eu-west-2.amazonaws.com",
                partition: "aws",
            };
            break;
        case "eu-west-3":
            regionInfo = {
                hostname: "s3.eu-west-3.amazonaws.com",
                partition: "aws",
            };
            break;
        case "fips-accesspoint-ca-central-1":
            regionInfo = {
                hostname: "s3-accesspoint-fips.ca-central-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "fips-accesspoint-us-east-1":
            regionInfo = {
                hostname: "s3-accesspoint-fips.us-east-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "fips-accesspoint-us-east-2":
            regionInfo = {
                hostname: "s3-accesspoint-fips.us-east-2.amazonaws.com",
                partition: "aws",
            };
            break;
        case "fips-accesspoint-us-gov-east-1":
            regionInfo = {
                hostname: "s3-accesspoint-fips.us-gov-east-1.amazonaws.com",
                partition: "aws-us-gov",
            };
            break;
        case "fips-accesspoint-us-gov-west-1":
            regionInfo = {
                hostname: "s3-accesspoint-fips.us-gov-west-1.amazonaws.com",
                partition: "aws-us-gov",
            };
            break;
        case "fips-accesspoint-us-west-1":
            regionInfo = {
                hostname: "s3-accesspoint-fips.us-west-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "fips-accesspoint-us-west-2":
            regionInfo = {
                hostname: "s3-accesspoint-fips.us-west-2.amazonaws.com",
                partition: "aws",
            };
            break;
        case "fips-us-gov-west-1":
            regionInfo = {
                hostname: "s3-fips.us-gov-west-1.amazonaws.com",
                partition: "aws-us-gov",
                signingRegion: "us-gov-west-1",
            };
            break;
        case "me-south-1":
            regionInfo = {
                hostname: "s3.me-south-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "s3-external-1":
            regionInfo = {
                hostname: "s3-external-1.amazonaws.com",
                partition: "aws",
                signingRegion: "us-east-1",
            };
            break;
        case "sa-east-1":
            regionInfo = {
                hostname: "s3.sa-east-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "us-east-1":
            regionInfo = {
                hostname: "s3.us-east-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "us-east-2":
            regionInfo = {
                hostname: "s3.us-east-2.amazonaws.com",
                partition: "aws",
            };
            break;
        case "us-gov-east-1":
            regionInfo = {
                hostname: "s3.us-gov-east-1.amazonaws.com",
                partition: "aws-us-gov",
            };
            break;
        case "us-gov-west-1":
            regionInfo = {
                hostname: "s3.us-gov-west-1.amazonaws.com",
                partition: "aws-us-gov",
            };
            break;
        case "us-iso-east-1":
            regionInfo = {
                hostname: "s3.us-iso-east-1.c2s.ic.gov",
                partition: "aws-iso",
            };
            break;
        case "us-isob-east-1":
            regionInfo = {
                hostname: "s3.us-isob-east-1.sc2s.sgov.gov",
                partition: "aws-iso-b",
            };
            break;
        case "us-west-1":
            regionInfo = {
                hostname: "s3.us-west-1.amazonaws.com",
                partition: "aws",
            };
            break;
        case "us-west-2":
            regionInfo = {
                hostname: "s3.us-west-2.amazonaws.com",
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
    return Promise.resolve({ signingService: "s3", ...regionInfo });
};

/**
 * @internal
 */
const getRuntimeConfig$1 = (config = {}) => {
    var _a, _b, _c, _d, _e, _f, _g;
    return ({
        apiVersion: "2006-03-01",
        disableHostPrefix: (_a = config.disableHostPrefix) !== null && _a !== void 0 ? _a : false,
        logger: (_b = config.logger) !== null && _b !== void 0 ? _b : {},
        regionInfoProvider: (_c = config.regionInfoProvider) !== null && _c !== void 0 ? _c : defaultRegionInfoProvider,
        serviceId: (_d = config.serviceId) !== null && _d !== void 0 ? _d : "S3",
        signingEscapePath: (_e = config.signingEscapePath) !== null && _e !== void 0 ? _e : false,
        urlParser: (_f = config.urlParser) !== null && _f !== void 0 ? _f : defaultRoleAssumers.parseUrl,
        useArnRegion: (_g = config.useArnRegion) !== null && _g !== void 0 ? _g : false,
    });
};

/**
 * @internal
 */
const getRuntimeConfig = (config = {}) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
    defaultRoleAssumers.emitWarningIfUnsupportedVersion(process.version);
    const clientSharedValues = getRuntimeConfig$1(config);
    return {
        ...clientSharedValues,
        ...config,
        runtime: "node",
        base64Decoder: (_a = config.base64Decoder) !== null && _a !== void 0 ? _a : defaultRoleAssumers.fromBase64,
        base64Encoder: (_b = config.base64Encoder) !== null && _b !== void 0 ? _b : defaultRoleAssumers.toBase64,
        bodyLengthChecker: (_c = config.bodyLengthChecker) !== null && _c !== void 0 ? _c : defaultRoleAssumers.calculateBodyLength,
        credentialDefaultProvider: (_d = config.credentialDefaultProvider) !== null && _d !== void 0 ? _d : defaultRoleAssumers.decorateDefaultCredentialProvider(defaultRoleAssumers.defaultProvider),
        defaultUserAgentProvider: (_e = config.defaultUserAgentProvider) !== null && _e !== void 0 ? _e : defaultRoleAssumers.defaultUserAgent({ serviceId: clientSharedValues.serviceId, clientVersion: packageInfo.version }),
        eventStreamSerdeProvider: (_f = config.eventStreamSerdeProvider) !== null && _f !== void 0 ? _f : eventStreamSerdeProvider,
        maxAttempts: (_g = config.maxAttempts) !== null && _g !== void 0 ? _g : defaultRoleAssumers.loadConfig(defaultRoleAssumers.NODE_MAX_ATTEMPT_CONFIG_OPTIONS),
        md5: (_h = config.md5) !== null && _h !== void 0 ? _h : defaultRoleAssumers.Hash.bind(null, "md5"),
        region: (_j = config.region) !== null && _j !== void 0 ? _j : defaultRoleAssumers.loadConfig(defaultRoleAssumers.NODE_REGION_CONFIG_OPTIONS, defaultRoleAssumers.NODE_REGION_CONFIG_FILE_OPTIONS),
        requestHandler: (_k = config.requestHandler) !== null && _k !== void 0 ? _k : new defaultRoleAssumers.NodeHttpHandler(),
        retryModeProvider: (_l = config.retryModeProvider) !== null && _l !== void 0 ? _l : defaultRoleAssumers.loadConfig(defaultRoleAssumers.NODE_RETRY_MODE_CONFIG_OPTIONS),
        sha256: (_m = config.sha256) !== null && _m !== void 0 ? _m : defaultRoleAssumers.Hash.bind(null, "sha256"),
        streamCollector: (_o = config.streamCollector) !== null && _o !== void 0 ? _o : defaultRoleAssumers.streamCollector,
        streamHasher: (_p = config.streamHasher) !== null && _p !== void 0 ? _p : fileStreamHasher,
        useArnRegion: (_q = config.useArnRegion) !== null && _q !== void 0 ? _q : defaultRoleAssumers.loadConfig(NODE_USE_ARN_REGION_CONFIG_OPTIONS),
        utf8Decoder: (_r = config.utf8Decoder) !== null && _r !== void 0 ? _r : defaultRoleAssumers.fromUtf8,
        utf8Encoder: (_s = config.utf8Encoder) !== null && _s !== void 0 ? _s : defaultRoleAssumers.toUtf8,
    };
};

var resolveEventStreamSerdeConfig = function (input) { return (serdePlugin.__assign(serdePlugin.__assign({}, input), { eventStreamMarshaller: input.eventStreamSerdeProvider(input) })); };

function addExpectContinueMiddleware(options) {
    var _this = this;
    return function (next) {
        return function (args) { return serdePlugin.__awaiter(_this, void 0, void 0, function () {
            var request;
            return serdePlugin.__generator(this, function (_a) {
                request = args.request;
                if (serdePlugin.HttpRequest.isInstance(request) && request.body && options.runtime === "node") {
                    request.headers = serdePlugin.__assign(serdePlugin.__assign({}, request.headers), { Expect: "100-continue" });
                }
                return [2 /*return*/, next(serdePlugin.__assign(serdePlugin.__assign({}, args), { request: request }))];
            });
        }); };
    };
}
var addExpectContinueMiddlewareOptions = {
    step: "build",
    tags: ["SET_EXPECT_HEADER", "EXPECT_HEADER"],
    name: "addExpectContinueMiddleware",
    override: true,
};
var getAddExpectContinuePlugin = function (options) { return ({
    applyToStack: function (clientStack) {
        clientStack.add(addExpectContinueMiddleware(options), addExpectContinueMiddlewareOptions);
    },
}); };

/**
 * @internal
 */
function validateBucketNameMiddleware() {
    var _this = this;
    return function (next) {
        return function (args) { return serdePlugin.__awaiter(_this, void 0, void 0, function () {
            var Bucket, err;
            return serdePlugin.__generator(this, function (_a) {
                Bucket = args.input.Bucket;
                if (typeof Bucket === "string" && !index.validate(Bucket) && Bucket.indexOf("/") >= 0) {
                    err = new Error("Bucket name shouldn't contain '/', received '" + Bucket + "'");
                    err.name = "InvalidBucketName";
                    throw err;
                }
                return [2 /*return*/, next(serdePlugin.__assign({}, args))];
            });
        }); };
    };
}
/**
 * @internal
 */
var validateBucketNameMiddlewareOptions = {
    step: "initialize",
    tags: ["VALIDATE_BUCKET_NAME"],
    name: "validateBucketNameMiddleware",
    override: true,
};
/**
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getValidateBucketNamePlugin = function (unused) { return ({
    applyToStack: function (clientStack) {
        clientStack.add(validateBucketNameMiddleware(), validateBucketNameMiddlewareOptions);
    },
}); };

/**
 * @internal
 */
var useRegionalEndpointMiddleware = function (config) {
    return function (next) {
        return function (args) { return serdePlugin.__awaiter(void 0, void 0, void 0, function () {
            var request, _a;
            return serdePlugin.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        request = args.request;
                        if (!serdePlugin.HttpRequest.isInstance(request) || config.isCustomEndpoint)
                            return [2 /*return*/, next(serdePlugin.__assign({}, args))];
                        if (!(request.hostname === "s3.amazonaws.com")) return [3 /*break*/, 1];
                        request.hostname = "s3.us-east-1.amazonaws.com";
                        return [3 /*break*/, 3];
                    case 1:
                        _a = "aws-global";
                        return [4 /*yield*/, config.region()];
                    case 2:
                        if (_a === (_b.sent())) {
                            request.hostname = "s3.amazonaws.com";
                        }
                        _b.label = 3;
                    case 3: return [2 /*return*/, next(serdePlugin.__assign({}, args))];
                }
            });
        }); };
    };
};
/**
 * @internal
 */
var useRegionalEndpointMiddlewareOptions = {
    step: "build",
    tags: ["USE_REGIONAL_ENDPOINT", "S3"],
    name: "useRegionalEndpointMiddleware",
    override: true,
};
/**
 * @internal
 */
var getUseRegionalEndpointPlugin = function (config) { return ({
    applyToStack: function (clientStack) {
        clientStack.add(useRegionalEndpointMiddleware(config), useRegionalEndpointMiddlewareOptions);
    },
}); };

/**
 * <p></p>
 */
class S3Client extends serdePlugin.Client {
    constructor(configuration) {
        let _config_0 = getRuntimeConfig(configuration);
        let _config_1 = defaultRoleAssumers.resolveRegionConfig(_config_0);
        let _config_2 = defaultRoleAssumers.resolveEndpointsConfig(_config_1);
        let _config_3 = defaultRoleAssumers.resolveRetryConfig(_config_2);
        let _config_4 = defaultRoleAssumers.resolveHostHeaderConfig(_config_3);
        let _config_5 = defaultRoleAssumers.resolveAwsAuthConfig(_config_4);
        let _config_6 = resolveBucketEndpointConfig(_config_5);
        let _config_7 = defaultRoleAssumers.resolveUserAgentConfig(_config_6);
        let _config_8 = resolveEventStreamSerdeConfig(_config_7);
        super(_config_8);
        this.config = _config_8;
        this.middlewareStack.use(defaultRoleAssumers.getRetryPlugin(this.config));
        this.middlewareStack.use(defaultRoleAssumers.getContentLengthPlugin(this.config));
        this.middlewareStack.use(defaultRoleAssumers.getHostHeaderPlugin(this.config));
        this.middlewareStack.use(defaultRoleAssumers.getLoggerPlugin(this.config));
        this.middlewareStack.use(defaultRoleAssumers.getAwsAuthPlugin(this.config));
        this.middlewareStack.use(getValidateBucketNamePlugin(this.config));
        this.middlewareStack.use(getUseRegionalEndpointPlugin(this.config));
        this.middlewareStack.use(getAddExpectContinuePlugin(this.config));
        this.middlewareStack.use(defaultRoleAssumers.getUserAgentPlugin(this.config));
    }
    /**
     * Destroy underlying resources, like sockets. It's usually not necessary to do this.
     * However in Node.js, it's best to explicitly shut down the client's agent when it is no longer needed.
     * Otherwise, sockets might stay open for quite a long time before the server terminates them.
     */
    destroy() {
        super.destroy();
    }
}

exports.S3Client = S3Client;
