'use strict';

var Stream = require('stream');
var zlib = require('zlib');
var http = require('http');
var Manifest = require('./manifest.json');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Stream__default = /*#__PURE__*/_interopDefaultLegacy(Stream);
var zlib__default = /*#__PURE__*/_interopDefaultLegacy(zlib);
var http__default = /*#__PURE__*/_interopDefaultLegacy(http);
var Manifest__default = /*#__PURE__*/_interopDefaultLegacy(Manifest);

const specialNodeHeaders = [
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
];

const readOnlyCloudFrontHeaders = {
  "accept-encoding": true,
  "content-length": true,
  "if-modified-since": true,
  "if-none-match": true,
  "if-range": true,
  "if-unmodified-since": true,
  "transfer-encoding": true,
  via: true
};

const HttpStatusCodes = {
  202: "Accepted",
  502: "Bad Gateway",
  400: "Bad Request",
  409: "Conflict",
  100: "Continue",
  201: "Created",
  417: "Expectation Failed",
  424: "Failed Dependency",
  403: "Forbidden",
  504: "Gateway Timeout",
  410: "Gone",
  505: "HTTP Version Not Supported",
  418: "I'm a teapot",
  419: "Insufficient Space on Resource",
  507: "Insufficient Storage",
  500: "Server Error",
  411: "Length Required",
  423: "Locked",
  420: "Method Failure",
  405: "Method Not Allowed",
  301: "Moved Permanently",
  302: "Moved Temporarily",
  207: "Multi-Status",
  300: "Multiple Choices",
  511: "Network Authentication Required",
  204: "No Content",
  203: "Non Authoritative Information",
  406: "Not Acceptable",
  404: "Not Found",
  501: "Not Implemented",
  304: "Not Modified",
  200: "OK",
  206: "Partial Content",
  402: "Payment Required",
  308: "Permanent Redirect",
  412: "Precondition Failed",
  428: "Precondition Required",
  102: "Processing",
  407: "Proxy Authentication Required",
  431: "Request Header Fields Too Large",
  408: "Request Timeout",
  413: "Request Entity Too Large",
  414: "Request-URI Too Long",
  416: "Requested Range Not Satisfiable",
  205: "Reset Content",
  303: "See Other",
  503: "Service Unavailable",
  101: "Switching Protocols",
  307: "Temporary Redirect",
  429: "Too Many Requests",
  401: "Unauthorized",
  422: "Unprocessable Entity",
  415: "Unsupported Media Type",
  305: "Use Proxy"
};

const toCloudFrontHeaders = (headers, headerNames, originalHeaders) => {
  const result = {};

  Object.entries(originalHeaders).forEach(([headerName, headerValue]) => {
    result[headerName.toLowerCase()] = headerValue;
  });

  Object.entries(headers).forEach(([headerName, headerValue]) => {
    const headerKey = headerName.toLowerCase();
    headerName = headerNames[headerKey] || headerName;

    if (readOnlyCloudFrontHeaders[headerKey]) {
      return;
    }

    result[headerKey] = [];

    if (headerValue instanceof Array) {
      headerValue.forEach((val) => {
        result[headerKey].push({
          key: headerName,
          value: val.toString()
        });
      });
    } else {
      result[headerKey].push({
        key: headerName,
        value: headerValue.toString()
      });
    }
  });

  return result;
};

const isGzipSupported = (headers) => {
  let gz = false;
  const ae = headers["accept-encoding"];
  if (ae) {
    for (let i = 0; i < ae.length; i++) {
      const { value } = ae[i];
      const bits = value.split(",").map((x) => x.split(";")[0].trim());
      if (bits.indexOf("gzip") !== -1) {
        gz = true;
      }
    }
  }
  return gz;
};

const defaultOptions = {
  enableHTTPCompression: false
};

const handler$1 = (
  event,
  { enableHTTPCompression, rewrittenUri } = defaultOptions
) => {
  const { request: cfRequest, response: cfResponse = { headers: {} } } = event;

  const response = {
    headers: {}
  };

  const newStream = new Stream__default['default'].Readable();

  const req = Object.assign(newStream, http__default['default'].IncomingMessage.prototype);
  req.url = rewrittenUri || cfRequest.uri;
  req.method = cfRequest.method;
  req.rawHeaders = [];
  req.headers = {};
  req.connection = {};

  if (cfRequest.querystring) {
    req.url = req.url + `?` + cfRequest.querystring;
  }

  const headers = cfRequest.headers || {};

  for (const lowercaseKey of Object.keys(headers)) {
    const headerKeyValPairs = headers[lowercaseKey];

    headerKeyValPairs.forEach((keyVal) => {
      req.rawHeaders.push(keyVal.key);
      req.rawHeaders.push(keyVal.value);
    });

    req.headers[lowercaseKey] = headerKeyValPairs[0].value;
  }

  req.getHeader = (name) => {
    return req.headers[name.toLowerCase()];
  };

  req.getHeaders = () => {
    return req.headers;
  };

  if (cfRequest.body && cfRequest.body.data) {
    req.push(
      cfRequest.body.data,
      cfRequest.body.encoding ? "base64" : undefined
    );
  }

  req.push(null);

  const res = new Stream__default['default']();
  res.finished = false;

  Object.defineProperty(res, "statusCode", {
    get() {
      return response.status;
    },
    set(statusCode) {
      response.status = statusCode;
      response.statusDescription = HttpStatusCodes[statusCode];
    }
  });

  res.headers = {};
  const headerNames = {};
  res.writeHead = (status, headers) => {
    response.status = status;
    response.statusDescription = HttpStatusCodes[status];

    if (headers) {
      res.headers = Object.assign(res.headers, headers);
    }
    return res;
  };
  res.write = (chunk) => {
    if (!response.body) {
      response.body = Buffer.from("");
    }

    response.body = Buffer.concat([
      response.body,
      Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
    ]);
  };

  let shouldGzip = enableHTTPCompression && isGzipSupported(headers);

  const responsePromise = new Promise((resolve) => {
    res.end = (text) => {
      if (res.finished === true) {
        return;
      }

      res.finished = true;

      if (text) res.write(text);

      if (!res.statusCode) {
        res.statusCode = 200;
      }

      if (response.body) {
        response.bodyEncoding = "base64";
        response.body = shouldGzip
          ? zlib__default['default'].gzipSync(response.body).toString("base64")
          : Buffer.from(response.body).toString("base64");
      }

      response.headers = toCloudFrontHeaders(
        res.headers,
        headerNames,
        cfResponse.headers
      );

      if (shouldGzip) {
        response.headers["content-encoding"] = [
          { key: "Content-Encoding", value: "gzip" }
        ];
      }
      resolve(response);
    };
  });

  res.setHeader = (name, value) => {
    res.headers[name.toLowerCase()] = value;
    headerNames[name.toLowerCase()] = name;
  };
  res.removeHeader = (name) => {
    delete res.headers[name.toLowerCase()];
  };
  res.getHeader = (name) => {
    return res.headers[name.toLowerCase()];
  };
  res.getHeaders = () => {
    return res.headers;
  };
  res.hasHeader = (name) => {
    return !!res.getHeader(name);
  };

  return {
    req,
    res,
    responsePromise
  };
};

handler$1.SPECIAL_NODE_HEADERS = specialNodeHeaders;

var nextAwsCloudfront = handler$1;

/**
 * There are multiple occasions where a static/SSG page will be generated after
 * the initial build. This function accepts a generated page, stores it and
 * applies the appropriate headers (e.g. setting an 'Expires' header for
 * regeneration).
 */
const s3StorePage = async (options) => {
    const { S3Client } = await Promise.resolve().then(function () { return require('./S3Client-614b8774.js'); });
    const s3 = new S3Client({
        region: options.region,
        maxAttempts: 3
    });
    const s3BasePath = options.basePath
        ? `${options.basePath.replace(/^\//, "")}/`
        : "";
    const baseKey = options.uri
        .replace(/^\/$/, "index")
        .replace(/^\//, "")
        .replace(/\.(json|html)$/, "")
        .replace(/^_next\/data\/[^\/]*\//, "");
    const jsonKey = `_next/data/${options.buildId}/${baseKey}.json`;
    const htmlKey = `static-pages/${options.buildId}/${baseKey}.html`;
    const cacheControl = options.revalidate
        ? undefined
        : "public, max-age=0, s-maxage=2678400, must-revalidate";
    const expires = options.revalidate
        ? new Date(new Date().getTime() + 1000 * options.revalidate)
        : undefined;
    const s3JsonParams = {
        Bucket: options.bucketName,
        Key: `${s3BasePath}${jsonKey}`,
        Body: JSON.stringify(options.pageData),
        ContentType: "application/json",
        CacheControl: cacheControl,
        Expires: expires
    };
    const s3HtmlParams = {
        Bucket: options.bucketName,
        Key: `${s3BasePath}${htmlKey}`,
        Body: options.html,
        ContentType: "text/html",
        CacheControl: cacheControl,
        Expires: expires
    };
    const { PutObjectCommand } = await Promise.resolve().then(function () { return require('./PutObjectCommand-8d960fe2.js'); });
    await Promise.all([
        s3.send(new PutObjectCommand(s3JsonParams)),
        s3.send(new PutObjectCommand(s3HtmlParams))
    ]);
    return {
        cacheControl,
        expires
    };
};

var esm=(()=>{var e={343:(e,t,r)=>{r.r(t);r.d(t,{Observable:()=>Observable,combineLatest:()=>combineLatest,default:()=>l,merge:()=>merge,zip:()=>zip});const n=()=>typeof Symbol==="function";const o=e=>n()&&Boolean(Symbol[e]);const i=e=>o(e)?Symbol[e]:"@@"+e;if(n()&&!o("observable")){Symbol.observable=Symbol("observable");}const s=i("iterator");const u=i("observable");const c=i("species");function getMethod(e,t){let r=e[t];if(r==null)return undefined;if(typeof r!=="function")throw new TypeError(r+" is not a function");return r}function getSpecies(e){let t=e.constructor;if(t!==undefined){t=t[c];if(t===null){t=undefined;}}return t!==undefined?t:Observable}function isObservable(e){return e instanceof Observable}function hostReportError(e){if(hostReportError.log){hostReportError.log(e);}else {setTimeout(()=>{throw e});}}function enqueue(e){Promise.resolve().then(()=>{try{e();}catch(e){hostReportError(e);}});}function cleanupSubscription(e){let t=e._cleanup;if(t===undefined)return;e._cleanup=undefined;if(!t){return}try{if(typeof t==="function"){t();}else {let e=getMethod(t,"unsubscribe");if(e){e.call(t);}}}catch(e){hostReportError(e);}}function closeSubscription(e){e._observer=undefined;e._queue=undefined;e._state="closed";}function flushSubscription(e){let t=e._queue;if(!t){return}e._queue=undefined;e._state="ready";for(let r=0;r<t.length;++r){notifySubscription(e,t[r].type,t[r].value);if(e._state==="closed")break}}function notifySubscription(e,t,r){e._state="running";let n=e._observer;try{let o=getMethod(n,t);switch(t){case"next":if(o)o.call(n,r);break;case"error":closeSubscription(e);if(o)o.call(n,r);else throw r;break;case"complete":closeSubscription(e);if(o)o.call(n);break}}catch(e){hostReportError(e);}if(e._state==="closed")cleanupSubscription(e);else if(e._state==="running")e._state="ready";}function onNotify(e,t,r){if(e._state==="closed")return;if(e._state==="buffering"){e._queue.push({type:t,value:r});return}if(e._state!=="ready"){e._state="buffering";e._queue=[{type:t,value:r}];enqueue(()=>flushSubscription(e));return}notifySubscription(e,t,r);}class Subscription{constructor(e,t){this._cleanup=undefined;this._observer=e;this._queue=undefined;this._state="initializing";let r=new SubscriptionObserver(this);try{this._cleanup=t.call(undefined,r);}catch(e){r.error(e);}if(this._state==="initializing")this._state="ready";}get closed(){return this._state==="closed"}unsubscribe(){if(this._state!=="closed"){closeSubscription(this);cleanupSubscription(this);}}}class SubscriptionObserver{constructor(e){this._subscription=e;}get closed(){return this._subscription._state==="closed"}next(e){onNotify(this._subscription,"next",e);}error(e){onNotify(this._subscription,"error",e);}complete(){onNotify(this._subscription,"complete");}}class Observable{constructor(e){if(!(this instanceof Observable))throw new TypeError("Observable cannot be called as a function");if(typeof e!=="function")throw new TypeError("Observable initializer must be a function");this._subscriber=e;}subscribe(e){if(typeof e!=="object"||e===null){e={next:e,error:arguments[1],complete:arguments[2]};}return new Subscription(e,this._subscriber)}forEach(e){return new Promise((t,r)=>{if(typeof e!=="function"){r(new TypeError(e+" is not a function"));return}function done(){n.unsubscribe();t();}let n=this.subscribe({next(t){try{e(t,done);}catch(e){r(e);n.unsubscribe();}},error:r,complete:t});})}map(e){if(typeof e!=="function")throw new TypeError(e+" is not a function");let t=getSpecies(this);return new t(t=>this.subscribe({next(r){try{r=e(r);}catch(e){return t.error(e)}t.next(r);},error(e){t.error(e);},complete(){t.complete();}}))}filter(e){if(typeof e!=="function")throw new TypeError(e+" is not a function");let t=getSpecies(this);return new t(t=>this.subscribe({next(r){try{if(!e(r))return}catch(e){return t.error(e)}t.next(r);},error(e){t.error(e);},complete(){t.complete();}}))}reduce(e){if(typeof e!=="function")throw new TypeError(e+" is not a function");let t=getSpecies(this);let r=arguments.length>1;let n=false;let o=arguments[1];let i=o;return new t(t=>this.subscribe({next(o){let s=!n;n=true;if(!s||r){try{i=e(i,o);}catch(e){return t.error(e)}}else {i=o;}},error(e){t.error(e);},complete(){if(!n&&!r)return t.error(new TypeError("Cannot reduce an empty sequence"));t.next(i);t.complete();}}))}concat(...e){let t=getSpecies(this);return new t(r=>{let n;let o=0;function startNext(i){n=i.subscribe({next(e){r.next(e);},error(e){r.error(e);},complete(){if(o===e.length){n=undefined;r.complete();}else {startNext(t.from(e[o++]));}}});}startNext(this);return ()=>{if(n){n.unsubscribe();n=undefined;}}})}flatMap(e){if(typeof e!=="function")throw new TypeError(e+" is not a function");let t=getSpecies(this);return new t(r=>{let n=[];let o=this.subscribe({next(o){if(e){try{o=e(o);}catch(e){return r.error(e)}}let i=t.from(o).subscribe({next(e){r.next(e);},error(e){r.error(e);},complete(){let e=n.indexOf(i);if(e>=0)n.splice(e,1);completeIfDone();}});n.push(i);},error(e){r.error(e);},complete(){completeIfDone();}});function completeIfDone(){if(o.closed&&n.length===0)r.complete();}return ()=>{n.forEach(e=>e.unsubscribe());o.unsubscribe();}})}[u](){return this}static from(e){let t=typeof this==="function"?this:Observable;if(e==null)throw new TypeError(e+" is not an object");let r=getMethod(e,u);if(r){let n=r.call(e);if(Object(n)!==n)throw new TypeError(n+" is not an object");if(isObservable(n)&&n.constructor===t)return n;return new t(e=>n.subscribe(e))}if(o("iterator")){r=getMethod(e,s);if(r){return new t(t=>{enqueue(()=>{if(t.closed)return;for(let n of r.call(e)){t.next(n);if(t.closed)return}t.complete();});})}}if(Array.isArray(e)){return new t(t=>{enqueue(()=>{if(t.closed)return;for(let r=0;r<e.length;++r){t.next(e[r]);if(t.closed)return}t.complete();});})}throw new TypeError(e+" is not observable")}static of(...e){let t=typeof this==="function"?this:Observable;return new t(t=>{enqueue(()=>{if(t.closed)return;for(let r=0;r<e.length;++r){t.next(e[r]);if(t.closed)return}t.complete();});})}static get[c](){return this}}if(n()){Object.defineProperty(Observable,Symbol("extensions"),{value:{symbol:u,hostReportError:hostReportError},configurable:true});}function merge(...e){return new Observable(t=>{if(e.length===0)return Observable.from([]);let r=e.length;let n=e.map(e=>Observable.from(e).subscribe({next(e){t.next(e);},error(e){t.error(e);},complete(){if(--r===0)t.complete();}}));return ()=>n.forEach(e=>e.unsubscribe())})}function combineLatest(...e){return new Observable(t=>{if(e.length===0)return Observable.from([]);let r=e.length;let n=new Set;let o=false;let i=e.map(()=>undefined);let s=e.map((s,u)=>Observable.from(s).subscribe({next(r){i[u]=r;if(!o){n.add(u);if(n.size!==e.length)return;n=null;o=true;}t.next(Array.from(i));},error(e){t.error(e);},complete(){if(--r===0)t.complete();}}));return ()=>s.forEach(e=>e.unsubscribe())})}function zip(...e){return new Observable(t=>{if(e.length===0)return Observable.from([]);let r=e.map(()=>[]);function done(){return r.some((e,t)=>e.length===0&&n[t].closed)}let n=e.map((e,n)=>Observable.from(e).subscribe({next(e){r[n].push(e);if(r.every(e=>e.length>0)){t.next(r.map(e=>e.shift()));if(done())t.complete();}},error(e){t.error(e);},complete(){if(done())t.complete();}}));return ()=>n.forEach(e=>e.unsubscribe())})}const l=Observable;}};var t={};function __nccwpck_require__(r){if(t[r]){return t[r].exports}var n=t[r]={exports:{}};var o=true;try{e[r](n,n.exports,__nccwpck_require__);o=false;}finally{if(o)delete t[r];}return n.exports}(()=>{__nccwpck_require__.d=((e,t)=>{for(var r in t){if(__nccwpck_require__.o(t,r)&&!__nccwpck_require__.o(e,r)){Object.defineProperty(e,r,{enumerable:true,get:t[r]});}}});})();(()=>{__nccwpck_require__.o=((e,t)=>Object.prototype.hasOwnProperty.call(e,t));})();(()=>{__nccwpck_require__.r=(e=>{if(typeof Symbol!=="undefined"&&Symbol.toStringTag){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});}Object.defineProperty(e,"__esModule",{value:true});});})();__nccwpck_require__.ab=__dirname+"/";return __nccwpck_require__(343)})();

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getAugmentedNamespace(n) {
	if (n.__esModule) return n;
	var a = Object.defineProperty({}, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SERVER_DIRECTORY = exports.PAGES_MANIFEST = exports.SERVER_PROPS_ID = exports.CLIENT_STATIC_FILES_RUNTIME_WEBPACK = exports.PERMANENT_REDIRECT_STATUS = exports.SERVER_FILES_MANIFEST = exports.STATIC_PROPS_ID = exports.BUILD_MANIFEST = exports.BLOCKED_PAGES = exports.STATIC_STATUS_PAGES = exports.PRERENDER_MANIFEST = exports.DEV_CLIENT_PAGES_MANIFEST = exports.OPTIMIZED_FONT_PROVIDERS = exports.TEMPORARY_REDIRECT_STATUS = exports.SERVERLESS_DIRECTORY = exports.EXPORT_MARKER = exports.GOOGLE_FONT_PROVIDER = exports.PHASE_PRODUCTION_BUILD = exports.CLIENT_STATIC_FILES_RUNTIME_MAIN = exports.BUILD_ID_FILE = exports.CONFIG_FILE = exports.CLIENT_STATIC_FILES_RUNTIME = exports.PHASE_PRODUCTION_SERVER = exports.EXPORT_DETAIL = exports.IMAGES_MANIFEST = exports.CLIENT_STATIC_FILES_RUNTIME_AMP = exports.CLIENT_PUBLIC_FILES_PATH = exports.CLIENT_STATIC_FILES_RUNTIME_POLYFILLS_SYMBOL = exports.STRING_LITERAL_DROP_BUNDLE = exports.TRACE_OUTPUT_VERSION = exports.CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH = exports.FONT_MANIFEST = exports.REACT_LOADABLE_MANIFEST = exports.ROUTES_MANIFEST = exports.CLIENT_STATIC_FILES_PATH = exports.BODY_RENDER_TARGET = exports.PHASE_EXPORT = exports.PHASE_DEVELOPMENT_SERVER = void 0;
const PHASE_EXPORT = 'phase-export';
exports.PHASE_EXPORT = PHASE_EXPORT;
const PHASE_PRODUCTION_BUILD = 'phase-production-build';
exports.PHASE_PRODUCTION_BUILD = PHASE_PRODUCTION_BUILD;
const PHASE_PRODUCTION_SERVER = 'phase-production-server';
exports.PHASE_PRODUCTION_SERVER = PHASE_PRODUCTION_SERVER;
const PHASE_DEVELOPMENT_SERVER = 'phase-development-server';
exports.PHASE_DEVELOPMENT_SERVER = PHASE_DEVELOPMENT_SERVER;
const PAGES_MANIFEST = 'pages-manifest.json';
exports.PAGES_MANIFEST = PAGES_MANIFEST;
const BUILD_MANIFEST = 'build-manifest.json';
exports.BUILD_MANIFEST = BUILD_MANIFEST;
const EXPORT_MARKER = 'export-marker.json';
exports.EXPORT_MARKER = EXPORT_MARKER;
const EXPORT_DETAIL = 'export-detail.json';
exports.EXPORT_DETAIL = EXPORT_DETAIL;
const PRERENDER_MANIFEST = 'prerender-manifest.json';
exports.PRERENDER_MANIFEST = PRERENDER_MANIFEST;
const ROUTES_MANIFEST = 'routes-manifest.json';
exports.ROUTES_MANIFEST = ROUTES_MANIFEST;
const IMAGES_MANIFEST = 'images-manifest.json';
exports.IMAGES_MANIFEST = IMAGES_MANIFEST;
const SERVER_FILES_MANIFEST = 'required-server-files.json';
exports.SERVER_FILES_MANIFEST = SERVER_FILES_MANIFEST;
const DEV_CLIENT_PAGES_MANIFEST = '_devPagesManifest.json';
exports.DEV_CLIENT_PAGES_MANIFEST = DEV_CLIENT_PAGES_MANIFEST;
const REACT_LOADABLE_MANIFEST = 'react-loadable-manifest.json';
exports.REACT_LOADABLE_MANIFEST = REACT_LOADABLE_MANIFEST;
const FONT_MANIFEST = 'font-manifest.json';
exports.FONT_MANIFEST = FONT_MANIFEST;
const SERVER_DIRECTORY = 'server';
exports.SERVER_DIRECTORY = SERVER_DIRECTORY;
const SERVERLESS_DIRECTORY = 'serverless';
exports.SERVERLESS_DIRECTORY = SERVERLESS_DIRECTORY;
const CONFIG_FILE = 'next.config.js';
exports.CONFIG_FILE = CONFIG_FILE;
const BUILD_ID_FILE = 'BUILD_ID';
exports.BUILD_ID_FILE = BUILD_ID_FILE;
const BLOCKED_PAGES = [
    '/_document',
    '/_app',
    '/_error'
];
exports.BLOCKED_PAGES = BLOCKED_PAGES;
const CLIENT_PUBLIC_FILES_PATH = 'public';
exports.CLIENT_PUBLIC_FILES_PATH = CLIENT_PUBLIC_FILES_PATH;
const CLIENT_STATIC_FILES_PATH = 'static';
exports.CLIENT_STATIC_FILES_PATH = CLIENT_STATIC_FILES_PATH;
const CLIENT_STATIC_FILES_RUNTIME = 'runtime';
exports.CLIENT_STATIC_FILES_RUNTIME = CLIENT_STATIC_FILES_RUNTIME;
const BODY_RENDER_TARGET = '__NEXT_BODY_RENDER_TARGET__';
exports.BODY_RENDER_TARGET = BODY_RENDER_TARGET;
const STRING_LITERAL_DROP_BUNDLE = '__NEXT_DROP_CLIENT_FILE__';
exports.STRING_LITERAL_DROP_BUNDLE = STRING_LITERAL_DROP_BUNDLE;
const CLIENT_STATIC_FILES_RUNTIME_MAIN = `main`;
exports.CLIENT_STATIC_FILES_RUNTIME_MAIN = CLIENT_STATIC_FILES_RUNTIME_MAIN;
const CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH = `react-refresh`;
exports.CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH = CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH;
const CLIENT_STATIC_FILES_RUNTIME_AMP = `amp`;
exports.CLIENT_STATIC_FILES_RUNTIME_AMP = CLIENT_STATIC_FILES_RUNTIME_AMP;
const CLIENT_STATIC_FILES_RUNTIME_WEBPACK = `webpack`;
exports.CLIENT_STATIC_FILES_RUNTIME_WEBPACK = CLIENT_STATIC_FILES_RUNTIME_WEBPACK;
const CLIENT_STATIC_FILES_RUNTIME_POLYFILLS_SYMBOL = Symbol(`polyfills`);
exports.CLIENT_STATIC_FILES_RUNTIME_POLYFILLS_SYMBOL = CLIENT_STATIC_FILES_RUNTIME_POLYFILLS_SYMBOL;
const TEMPORARY_REDIRECT_STATUS = 307;
exports.TEMPORARY_REDIRECT_STATUS = TEMPORARY_REDIRECT_STATUS;
const PERMANENT_REDIRECT_STATUS = 308;
exports.PERMANENT_REDIRECT_STATUS = PERMANENT_REDIRECT_STATUS;
const STATIC_PROPS_ID = '__N_SSG';
exports.STATIC_PROPS_ID = STATIC_PROPS_ID;
const SERVER_PROPS_ID = '__N_SSP';
exports.SERVER_PROPS_ID = SERVER_PROPS_ID;
const GOOGLE_FONT_PROVIDER = 'https://fonts.googleapis.com/css';
exports.GOOGLE_FONT_PROVIDER = GOOGLE_FONT_PROVIDER;
const OPTIMIZED_FONT_PROVIDERS = [
    {
        url: GOOGLE_FONT_PROVIDER,
        preconnect: 'https://fonts.gstatic.com'
    },
    {
        url: 'https://use.typekit.net',
        preconnect: 'https://use.typekit.net'
    }, 
];
exports.OPTIMIZED_FONT_PROVIDERS = OPTIMIZED_FONT_PROVIDERS;
const STATIC_STATUS_PAGES = [
    '/500'
];
exports.STATIC_STATUS_PAGES = STATIC_STATUS_PAGES;
const TRACE_OUTPUT_VERSION = 1;
exports.TRACE_OUTPUT_VERSION = TRACE_OUTPUT_VERSION;


});

var resultsToString_1 = resultsToString;
var _zenObservable = _interopRequireDefault(esm);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function mergeResults(results) {
    // @ts-ignore
    return _zenObservable.default.prototype.concat.call(...results);
}
async function resultsToString(results) {
    const chunks = [];
    await mergeResults(results).forEach((chunk)=>{
        chunks.push(chunk);
    });
    return chunks.join('');
}

/**
 * Render to HTML helper. Starting in Next.js 11.1 a change was introduced so renderReqToHTML no longer returns a string.
 * See: https://github.com/vercel/next.js/pull/27319
 * This is a helper to properly render it in backwards compatible way.
 * @param page
 * @param req
 * @param res
 * @param renderMode
 */
const renderPageToHtml = async (page, req, res, renderMode) => {
    const { renderOpts, html: htmlResult } = await page.renderReqToHTML(req, res, renderMode);
    let html;
    try {
        if (typeof htmlResult === "string") {
            html = htmlResult; // Next.js < 11.1
        }
        else {
            html = htmlResult ? await resultsToString_1([htmlResult]) : ""; // Next >= 11.1.1
        }
    }
    catch (e) {
        // Fallback to using renderReqToHtml without renderMode specified,
        // which will render html based on the page's renderReqToHtml,
        // which should always work (but adds another *warm* render cost)
        console.log("Falling back to using page's rendering function for html");
        html = (await page.renderReqToHTML(req, res));
    }
    return { html, renderOpts };
};

const handler = async (event) => {
    await Promise.all(event.Records.map(async (record) => {
        const regenerationEvent = JSON.parse(record.body);
        const manifest = Manifest__default['default'];
        const { req, res } = nextAwsCloudfront({ request: regenerationEvent.cloudFrontEventRequest }, { enableHTTPCompression: manifest.enableHTTPCompression });
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const page = require(`./${regenerationEvent.pagePath}`);
        const { renderOpts, html } = await renderPageToHtml(page, req, res, "passthrough");
        await s3StorePage({
            html,
            uri: regenerationEvent.cloudFrontEventRequest.uri,
            basePath: regenerationEvent.basePath,
            bucketName: regenerationEvent.bucketName,
            buildId: manifest.buildId,
            pageData: renderOpts.pageData,
            region: regenerationEvent.region,
            revalidate: renderOpts.revalidate
        });
    }));
};

exports.commonjsGlobal = commonjsGlobal;
exports.createCommonjsModule = createCommonjsModule;
exports.getAugmentedNamespace = getAugmentedNamespace;
exports.handler = handler;
