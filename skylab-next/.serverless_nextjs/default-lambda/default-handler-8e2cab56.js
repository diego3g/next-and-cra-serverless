'use strict';

var PrerenderManifest = require('./prerender-manifest.json');
var Manifest = require('./manifest.json');
var RoutesManifestJson = require('./routes-manifest.json');
var Stream = require('stream');
var zlib = require('zlib');
var http = require('http');
var perf_hooks = require('perf_hooks');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var PrerenderManifest__default = /*#__PURE__*/_interopDefaultLegacy(PrerenderManifest);
var Manifest__default = /*#__PURE__*/_interopDefaultLegacy(Manifest);
var RoutesManifestJson__default = /*#__PURE__*/_interopDefaultLegacy(RoutesManifestJson);
var Stream__default = /*#__PURE__*/_interopDefaultLegacy(Stream);
var zlib__default = /*#__PURE__*/_interopDefaultLegacy(zlib);
var http__default = /*#__PURE__*/_interopDefaultLegacy(http);

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
 * Tokenize input string.
 */
function lexer(str) {
    var tokens = [];
    var i = 0;
    while (i < str.length) {
        var char = str[i];
        if (char === "*" || char === "+" || char === "?") {
            tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
            continue;
        }
        if (char === "\\") {
            tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
            continue;
        }
        if (char === "{") {
            tokens.push({ type: "OPEN", index: i, value: str[i++] });
            continue;
        }
        if (char === "}") {
            tokens.push({ type: "CLOSE", index: i, value: str[i++] });
            continue;
        }
        if (char === ":") {
            var name = "";
            var j = i + 1;
            while (j < str.length) {
                var code = str.charCodeAt(j);
                if (
                // `0-9`
                (code >= 48 && code <= 57) ||
                    // `A-Z`
                    (code >= 65 && code <= 90) ||
                    // `a-z`
                    (code >= 97 && code <= 122) ||
                    // `_`
                    code === 95) {
                    name += str[j++];
                    continue;
                }
                break;
            }
            if (!name)
                throw new TypeError("Missing parameter name at " + i);
            tokens.push({ type: "NAME", index: i, value: name });
            i = j;
            continue;
        }
        if (char === "(") {
            var count = 1;
            var pattern = "";
            var j = i + 1;
            if (str[j] === "?") {
                throw new TypeError("Pattern cannot start with \"?\" at " + j);
            }
            while (j < str.length) {
                if (str[j] === "\\") {
                    pattern += str[j++] + str[j++];
                    continue;
                }
                if (str[j] === ")") {
                    count--;
                    if (count === 0) {
                        j++;
                        break;
                    }
                }
                else if (str[j] === "(") {
                    count++;
                    if (str[j + 1] !== "?") {
                        throw new TypeError("Capturing groups are not allowed at " + j);
                    }
                }
                pattern += str[j++];
            }
            if (count)
                throw new TypeError("Unbalanced pattern at " + i);
            if (!pattern)
                throw new TypeError("Missing pattern at " + i);
            tokens.push({ type: "PATTERN", index: i, value: pattern });
            i = j;
            continue;
        }
        tokens.push({ type: "CHAR", index: i, value: str[i++] });
    }
    tokens.push({ type: "END", index: i, value: "" });
    return tokens;
}
/**
 * Parse a string for the raw tokens.
 */
function parse$1(str, options) {
    if (options === void 0) { options = {}; }
    var tokens = lexer(str);
    var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a;
    var defaultPattern = "[^" + escapeString(options.delimiter || "/#?") + "]+?";
    var result = [];
    var key = 0;
    var i = 0;
    var path = "";
    var tryConsume = function (type) {
        if (i < tokens.length && tokens[i].type === type)
            return tokens[i++].value;
    };
    var mustConsume = function (type) {
        var value = tryConsume(type);
        if (value !== undefined)
            return value;
        var _a = tokens[i], nextType = _a.type, index = _a.index;
        throw new TypeError("Unexpected " + nextType + " at " + index + ", expected " + type);
    };
    var consumeText = function () {
        var result = "";
        var value;
        // tslint:disable-next-line
        while ((value = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR"))) {
            result += value;
        }
        return result;
    };
    while (i < tokens.length) {
        var char = tryConsume("CHAR");
        var name = tryConsume("NAME");
        var pattern = tryConsume("PATTERN");
        if (name || pattern) {
            var prefix = char || "";
            if (prefixes.indexOf(prefix) === -1) {
                path += prefix;
                prefix = "";
            }
            if (path) {
                result.push(path);
                path = "";
            }
            result.push({
                name: name || key++,
                prefix: prefix,
                suffix: "",
                pattern: pattern || defaultPattern,
                modifier: tryConsume("MODIFIER") || ""
            });
            continue;
        }
        var value = char || tryConsume("ESCAPED_CHAR");
        if (value) {
            path += value;
            continue;
        }
        if (path) {
            result.push(path);
            path = "";
        }
        var open = tryConsume("OPEN");
        if (open) {
            var prefix = consumeText();
            var name_1 = tryConsume("NAME") || "";
            var pattern_1 = tryConsume("PATTERN") || "";
            var suffix = consumeText();
            mustConsume("CLOSE");
            result.push({
                name: name_1 || (pattern_1 ? key++ : ""),
                pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
                prefix: prefix,
                suffix: suffix,
                modifier: tryConsume("MODIFIER") || ""
            });
            continue;
        }
        mustConsume("END");
    }
    return result;
}
/**
 * Compile a string to a template function for the path.
 */
function compile(str, options) {
    return tokensToFunction(parse$1(str, options), options);
}
/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction(tokens, options) {
    if (options === void 0) { options = {}; }
    var reFlags = flags(options);
    var _a = options.encode, encode = _a === void 0 ? function (x) { return x; } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
    // Compile all the tokens into regexps.
    var matches = tokens.map(function (token) {
        if (typeof token === "object") {
            return new RegExp("^(?:" + token.pattern + ")$", reFlags);
        }
    });
    return function (data) {
        var path = "";
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if (typeof token === "string") {
                path += token;
                continue;
            }
            var value = data ? data[token.name] : undefined;
            var optional = token.modifier === "?" || token.modifier === "*";
            var repeat = token.modifier === "*" || token.modifier === "+";
            if (Array.isArray(value)) {
                if (!repeat) {
                    throw new TypeError("Expected \"" + token.name + "\" to not repeat, but got an array");
                }
                if (value.length === 0) {
                    if (optional)
                        continue;
                    throw new TypeError("Expected \"" + token.name + "\" to not be empty");
                }
                for (var j = 0; j < value.length; j++) {
                    var segment = encode(value[j], token);
                    if (validate && !matches[i].test(segment)) {
                        throw new TypeError("Expected all \"" + token.name + "\" to match \"" + token.pattern + "\", but got \"" + segment + "\"");
                    }
                    path += token.prefix + segment + token.suffix;
                }
                continue;
            }
            if (typeof value === "string" || typeof value === "number") {
                var segment = encode(String(value), token);
                if (validate && !matches[i].test(segment)) {
                    throw new TypeError("Expected \"" + token.name + "\" to match \"" + token.pattern + "\", but got \"" + segment + "\"");
                }
                path += token.prefix + segment + token.suffix;
                continue;
            }
            if (optional)
                continue;
            var typeOfMessage = repeat ? "an array" : "a string";
            throw new TypeError("Expected \"" + token.name + "\" to be " + typeOfMessage);
        }
        return path;
    };
}
/**
 * Create path match function from `path-to-regexp` spec.
 */
function match(str, options) {
    var keys = [];
    var re = pathToRegexp(str, keys, options);
    return regexpToFunction(re, keys, options);
}
/**
 * Create a path match function from `path-to-regexp` output.
 */
function regexpToFunction(re, keys, options) {
    if (options === void 0) { options = {}; }
    var _a = options.decode, decode = _a === void 0 ? function (x) { return x; } : _a;
    return function (pathname) {
        var m = re.exec(pathname);
        if (!m)
            return false;
        var path = m[0], index = m.index;
        var params = Object.create(null);
        var _loop_1 = function (i) {
            // tslint:disable-next-line
            if (m[i] === undefined)
                return "continue";
            var key = keys[i - 1];
            if (key.modifier === "*" || key.modifier === "+") {
                params[key.name] = m[i].split(key.prefix + key.suffix).map(function (value) {
                    return decode(value, key);
                });
            }
            else {
                params[key.name] = decode(m[i], key);
            }
        };
        for (var i = 1; i < m.length; i++) {
            _loop_1(i);
        }
        return { path: path, index: index, params: params };
    };
}
/**
 * Escape a regular expression string.
 */
function escapeString(str) {
    return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
/**
 * Get the flags for a regexp from the options.
 */
function flags(options) {
    return options && options.sensitive ? "" : "i";
}
/**
 * Pull out keys from a regexp.
 */
function regexpToRegexp(path, keys) {
    if (!keys)
        return path;
    var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
    var index = 0;
    var execResult = groupsRegex.exec(path.source);
    while (execResult) {
        keys.push({
            // Use parenthesized substring match if available, index otherwise
            name: execResult[1] || index++,
            prefix: "",
            suffix: "",
            modifier: "",
            pattern: ""
        });
        execResult = groupsRegex.exec(path.source);
    }
    return path;
}
/**
 * Transform an array into a regexp.
 */
function arrayToRegexp(paths, keys, options) {
    var parts = paths.map(function (path) { return pathToRegexp(path, keys, options).source; });
    return new RegExp("(?:" + parts.join("|") + ")", flags(options));
}
/**
 * Create a path regexp from string input.
 */
function stringToRegexp(path, keys, options) {
    return tokensToRegexp(parse$1(path, options), keys, options);
}
/**
 * Expose a function for taking tokens and returning a RegExp.
 */
function tokensToRegexp(tokens, keys, options) {
    if (options === void 0) { options = {}; }
    var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function (x) { return x; } : _d;
    var endsWith = "[" + escapeString(options.endsWith || "") + "]|$";
    var delimiter = "[" + escapeString(options.delimiter || "/#?") + "]";
    var route = start ? "^" : "";
    // Iterate over the tokens and create our regexp string.
    for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
        var token = tokens_1[_i];
        if (typeof token === "string") {
            route += escapeString(encode(token));
        }
        else {
            var prefix = escapeString(encode(token.prefix));
            var suffix = escapeString(encode(token.suffix));
            if (token.pattern) {
                if (keys)
                    keys.push(token);
                if (prefix || suffix) {
                    if (token.modifier === "+" || token.modifier === "*") {
                        var mod = token.modifier === "*" ? "?" : "";
                        route += "(?:" + prefix + "((?:" + token.pattern + ")(?:" + suffix + prefix + "(?:" + token.pattern + "))*)" + suffix + ")" + mod;
                    }
                    else {
                        route += "(?:" + prefix + "(" + token.pattern + ")" + suffix + ")" + token.modifier;
                    }
                }
                else {
                    route += "(" + token.pattern + ")" + token.modifier;
                }
            }
            else {
                route += "(?:" + prefix + suffix + ")" + token.modifier;
            }
        }
    }
    if (end) {
        if (!strict)
            route += delimiter + "?";
        route += !options.endsWith ? "$" : "(?=" + endsWith + ")";
    }
    else {
        var endToken = tokens[tokens.length - 1];
        var isEndDelimited = typeof endToken === "string"
            ? delimiter.indexOf(endToken[endToken.length - 1]) > -1
            : // tslint:disable-next-line
                endToken === undefined;
        if (!strict) {
            route += "(?:" + delimiter + "(?=" + endsWith + "))?";
        }
        if (!isEndDelimited) {
            route += "(?=" + delimiter + "|" + endsWith + ")";
        }
    }
    return new RegExp(route, flags(options));
}
/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 */
function pathToRegexp(path, keys, options) {
    if (path instanceof RegExp)
        return regexpToRegexp(path, keys);
    if (Array.isArray(path))
        return arrayToRegexp(path, keys, options);
    return stringToRegexp(path, keys, options);
}

/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module exports.
 * @public
 */

var parse_1 = parse;

/**
 * Module variables.
 * @private
 */

var decode = decodeURIComponent;
var pairSplitRegExp = /; */;

/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {object} [options]
 * @return {object}
 * @public
 */

function parse(str, options) {
  if (typeof str !== 'string') {
    throw new TypeError('argument str must be a string');
  }

  var obj = {};
  var opt = options || {};
  var pairs = str.split(pairSplitRegExp);
  var dec = opt.decode || decode;

  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    var eq_idx = pair.indexOf('=');

    // skip things that don't look like key=value
    if (eq_idx < 0) {
      continue;
    }

    var key = pair.substr(0, eq_idx).trim();
    var val = pair.substr(++eq_idx, pair.length).trim();

    // quoted values
    if ('"' == val[0]) {
      val = val.slice(1, -1);
    }

    // only assign once
    if (undefined == obj[key]) {
      obj[key] = tryDecode(val, dec);
    }
  }

  return obj;
}

/**
 * Try decoding a string using a decoding function.
 *
 * @param {string} str
 * @param {function} decode
 * @private
 */

function tryDecode(str, decode) {
  try {
    return decode(str);
  } catch (e) {
    return str;
  }
}

const findDomainLocale = (req, manifest) => {
    var _a, _b;
    const domains = (_a = manifest.i18n) === null || _a === void 0 ? void 0 : _a.domains;
    if (domains) {
        const hostHeaders = (_b = req.headers.host) === null || _b === void 0 ? void 0 : _b.split(",");
        if (hostHeaders && hostHeaders.length > 0) {
            const host = hostHeaders[0];
            const matchedDomain = domains.find((d) => d.domain === host);
            if (matchedDomain) {
                return matchedDomain.defaultLocale;
            }
        }
    }
    return null;
};
function addDefaultLocaleToPath(path, routesManifest, forceLocale = null) {
    if (routesManifest.i18n) {
        const defaultLocale = forceLocale !== null && forceLocale !== void 0 ? forceLocale : routesManifest.i18n.defaultLocale;
        const locales = routesManifest.i18n.locales;
        const basePath = path.startsWith(routesManifest.basePath)
            ? routesManifest.basePath
            : "";
        // If prefixed with a locale, return that path with normalized locale
        const pathLowerCase = path.toLowerCase();
        for (const locale of locales) {
            if (pathLowerCase === `${basePath}/${locale}`.toLowerCase() ||
                pathLowerCase.startsWith(`${basePath}/${locale}/`.toLowerCase())) {
                return path.replace(new RegExp(`${basePath}/${locale}`, "i"), `${basePath}/${forceLocale !== null && forceLocale !== void 0 ? forceLocale : locale}`);
            }
        }
        // Otherwise, prefix with default locale
        if (path === "/" || path === `${basePath}`) {
            return `${basePath}/${defaultLocale}`;
        }
        else {
            return path.replace(`${basePath}/`, `${basePath}/${defaultLocale}/`);
        }
    }
    return path;
}
function dropLocaleFromPath(path, routesManifest) {
    if (routesManifest.i18n) {
        const pathLowerCase = path.toLowerCase();
        const locales = routesManifest.i18n.locales;
        // If prefixed with a locale, return path without
        for (const locale of locales) {
            const prefixLowerCase = `/${locale.toLowerCase()}`;
            if (pathLowerCase === prefixLowerCase) {
                return "/";
            }
            if (pathLowerCase.startsWith(`${prefixLowerCase}/`)) {
                return `${pathLowerCase.slice(prefixLowerCase.length)}`;
            }
        }
    }
    return path;
}
const getAcceptLanguageLocale = async (acceptLanguage, manifest, routesManifest) => {
    var _a;
    if (routesManifest.i18n) {
        const defaultLocaleLowerCase = (_a = routesManifest.i18n.defaultLocale) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        const localeMap = {};
        for (const locale of routesManifest.i18n.locales) {
            localeMap[locale.toLowerCase()] = locale;
        }
        // Accept.language(header, locales) prefers the locales order,
        // so we ask for all to find the order preferred by user.
        const Accept = await Promise.resolve().then(function () { return require('./index-d737b0e1.js'); }).then(function (n) { return n.index; });
        for (const language of Accept.languages(acceptLanguage)) {
            const localeLowerCase = language.toLowerCase();
            if (localeLowerCase === defaultLocaleLowerCase) {
                break;
            }
            if (localeMap[localeLowerCase]) {
                return `${routesManifest.basePath}/${localeMap[localeLowerCase]}${manifest.trailingSlash ? "/" : ""}`;
            }
        }
    }
};
function getLocalePrefixFromUri(uri, routesManifest) {
    if (routesManifest.basePath && uri.startsWith(routesManifest.basePath)) {
        uri = uri.slice(routesManifest.basePath.length);
    }
    if (routesManifest.i18n) {
        const uriLowerCase = uri.toLowerCase();
        for (const locale of routesManifest.i18n.locales) {
            const localeLowerCase = locale.toLowerCase();
            if (uriLowerCase === `/${localeLowerCase}` ||
                uriLowerCase.startsWith(`/${localeLowerCase}/`)) {
                return `/${locale}`;
            }
        }
        return `/${routesManifest.i18n.defaultLocale}`;
    }
    return "";
}
/**
 * Get a redirect to the locale-specific domain. Returns undefined if no redirect found.
 * @param req
 * @param routesManifest
 */
async function getLocaleDomainRedirect(req, routesManifest) {
    var _a, _b, _c, _d, _e, _f;
    // Redirect to correct domain based on user's language
    const domains = (_a = routesManifest.i18n) === null || _a === void 0 ? void 0 : _a.domains;
    const hostHeaders = req.headers.host;
    if (domains && hostHeaders && hostHeaders.length > 0) {
        const host = hostHeaders[0].value.split(":")[0];
        const languageHeader = req.headers["accept-language"];
        const acceptLanguage = languageHeader && ((_b = languageHeader[0]) === null || _b === void 0 ? void 0 : _b.value);
        const headerCookies = req.headers.cookie
            ? (_c = req.headers.cookie[0]) === null || _c === void 0 ? void 0 : _c.value
            : undefined;
        // Use cookies first, otherwise use the accept-language header
        let acceptLanguages = [];
        let nextLocale;
        if (headerCookies) {
            const cookies = parse_1(headerCookies);
            nextLocale = cookies["NEXT_LOCALE"];
        }
        if (nextLocale) {
            acceptLanguages = [nextLocale.toLowerCase()];
        }
        else {
            const Accept = await Promise.resolve().then(function () { return require('./index-d737b0e1.js'); }).then(function (n) { return n.index; });
            acceptLanguages = Accept.languages(acceptLanguage).map((lang) => lang.toLowerCase());
        }
        // Try to find the right domain to redirect to if needed
        // First check current domain can support any preferred language, if so do not redirect
        const currentDomainData = domains.find((domainData) => domainData.domain === host);
        if (currentDomainData) {
            for (const language of acceptLanguages) {
                if (((_d = currentDomainData.defaultLocale) === null || _d === void 0 ? void 0 : _d.toLowerCase()) === language ||
                    ((_e = currentDomainData.locales) === null || _e === void 0 ? void 0 : _e.map((locale) => locale.toLowerCase()).includes(language))) {
                    return undefined;
                }
            }
        }
        // Try to find domain whose default locale matched preferred language in order
        for (const language of acceptLanguages) {
            for (const domainData of domains) {
                if (domainData.defaultLocale.toLowerCase() === language) {
                    return `${domainData.domain}${req.uri}`;
                }
            }
        }
        // Try to find domain whose supported locales matches preferred language in order
        for (const language of acceptLanguages) {
            for (const domainData of domains) {
                if ((_f = domainData.locales) === null || _f === void 0 ? void 0 : _f.map((locale) => locale.toLowerCase()).includes(language)) {
                    return `${domainData.domain}${req.uri}`;
                }
            }
        }
    }
    return undefined;
}

/**
 Provides matching capabilities to support custom redirects, rewrites, and headers.
 */
/**
 * Match the given path against a source path.
 * @param path
 * @param source
 */
function matchPath(path, source) {
    const matcher = match(source, { decode: decodeURIComponent });
    return matcher(path);
}
/**
 * Compile a destination for redirects or rewrites.
 * @param destination
 * @param params
 */
function compileDestination(destination, params) {
    try {
        const destinationLowerCase = destination.toLowerCase();
        if (destinationLowerCase.startsWith("https://") ||
            destinationLowerCase.startsWith("http://")) {
            // Handle external URLs
            const { origin, pathname } = new URL(destination);
            const toPath = compile(pathname, { encode: encodeURIComponent });
            const compiledDestination = `${origin}${toPath(params)}`;
            // Remove trailing slash if original destination didn't have it
            if (!destination.endsWith("/") && compiledDestination.endsWith("/")) {
                return compiledDestination.slice(0, -1);
            }
            else {
                return compiledDestination;
            }
        }
        else {
            // Handle all other paths. Escape all ? in case of query parameters
            const escapedDestination = destination.replace(/\?/g, "\\?");
            const toPath = compile(escapedDestination, {
                encode: encodeURIComponent
            });
            return toPath(params);
        }
    }
    catch (error) {
        console.error(`Could not compile destination ${destination}, returning null instead. Error: ${error}`);
        return null;
    }
}
const matchDynamicRoute = (uri, routes) => {
    for (const { route, regex } of routes) {
        const re = new RegExp(regex, "i");
        if (re.test(uri)) {
            return route;
        }
    }
};

const getCustomHeaders = (uri, routesManifest) => {
    const localized = addDefaultLocaleToPath(uri, routesManifest);
    const headers = {};
    for (const headerData of routesManifest.headers) {
        if (!matchPath(localized, headerData.source)) {
            continue;
        }
        for (const { key, value } of headerData.headers) {
            if (key) {
                // Header overriding behavior as per:
                // https://nextjs.org/docs/api-reference/next.config.js/headers
                headers[key.toLowerCase()] = [{ key, value }];
            }
        }
    }
    return headers;
};
const setCustomHeaders = (event, routesManifest) => {
    var _a;
    const [uri] = ((_a = event.req.url) !== null && _a !== void 0 ? _a : "").split("?");
    const headers = getCustomHeaders(uri, routesManifest);
    for (const [{ key, value }] of Object.values(headers)) {
        if (key) {
            event.res.setHeader(key, value);
        }
    }
};
const setHeadersFromRoute = (event, route) => {
    var _a;
    for (const [key, headers] of Object.entries(route.headers || [])) {
        const keys = headers.map(({ key }) => key);
        const values = headers.map(({ value }) => value).join(";");
        if (values) {
            event.res.setHeader((_a = keys[0]) !== null && _a !== void 0 ? _a : key, values);
        }
    }
};

const redirect = (event, route) => {
    setHeadersFromRoute(event, route);
    event.res.statusCode = route.status;
    event.res.statusMessage = route.statusDescription;
    event.res.end();
};

const toRequest = (event) => {
    var _a;
    const [uri, querystring] = ((_a = event.req.url) !== null && _a !== void 0 ? _a : "").split("?");
    const headers = {};
    for (const [key, value] of Object.entries(event.req.headers)) {
        if (value && Array.isArray(value)) {
            headers[key.toLowerCase()] = value.map((value) => ({ key, value }));
        }
        else if (value) {
            headers[key.toLowerCase()] = [{ key, value }];
        }
    }
    return {
        headers,
        querystring,
        uri
    };
};

const normalise = (uri, routesManifest) => {
    const { basePath, i18n } = routesManifest;
    if (basePath) {
        if (uri.startsWith(basePath)) {
            uri = uri.slice(basePath.length);
        }
        else {
            // basePath set but URI does not start with basePath, return 404
            if (i18n === null || i18n === void 0 ? void 0 : i18n.defaultLocale) {
                return `/${i18n.defaultLocale}/404`;
            }
            else {
                return "/404";
            }
        }
    }
    // Remove trailing slash for all paths
    if (uri.endsWith("/")) {
        uri = uri.slice(0, -1);
    }
    // Empty path should be normalised to "/" as there is no Next.js route for ""
    return uri === "" ? "/" : uri;
};

const staticNotFound = (uri, manifest, routesManifest) => {
    const localePrefix = getLocalePrefixFromUri(uri, routesManifest);
    const notFoundUri = `${localePrefix}/404`;
    const static404 = manifest.pages.html.nonDynamic[notFoundUri] ||
        manifest.pages.ssg.nonDynamic[notFoundUri];
    if (static404) {
        return {
            isData: false,
            isStatic: true,
            file: `pages${notFoundUri}.html`,
            statusCode: 404
        };
    }
};
const notFoundData = (uri, manifest, routesManifest) => {
    return (staticNotFound(uri, manifest, routesManifest) || {
        isData: true,
        isRender: true,
        page: "pages/_error.js",
        statusCode: 404
    });
};
const notFoundPage = (uri, manifest, routesManifest) => {
    return (staticNotFound(uri, manifest, routesManifest) || {
        isData: false,
        isRender: true,
        page: "pages/_error.js",
        statusCode: 404
    });
};

const pageHtml = (localeUri) => {
    if (localeUri == "/") {
        return "pages/index.html";
    }
    return `pages${localeUri}.html`;
};
const handlePageReq = (uri, manifest, routesManifest, isPreview, isRewrite) => {
    var _a, _b;
    const { pages } = manifest;
    const localeUri = normalise(addDefaultLocaleToPath(uri, routesManifest), routesManifest);
    if (pages.html.nonDynamic[localeUri]) {
        const nonLocaleUri = dropLocaleFromPath(localeUri, routesManifest);
        const statusCode = nonLocaleUri === "/404" ? 404 : nonLocaleUri === "/500" ? 500 : undefined;
        return {
            isData: false,
            isStatic: true,
            file: pages.html.nonDynamic[localeUri],
            statusCode
        };
    }
    if (pages.ssg.nonDynamic[localeUri] && !isPreview) {
        const ssg = pages.ssg.nonDynamic[localeUri];
        const route = (_a = ssg.srcRoute) !== null && _a !== void 0 ? _a : localeUri;
        const nonLocaleUri = dropLocaleFromPath(localeUri, routesManifest);
        const statusCode = nonLocaleUri === "/404" ? 404 : nonLocaleUri === "/500" ? 500 : undefined;
        return {
            isData: false,
            isStatic: true,
            file: pageHtml(localeUri),
            // page JS path is from SSR entries in manifest
            page: pages.ssr.nonDynamic[route] || pages.ssr.dynamic[route],
            revalidate: ssg.initialRevalidateSeconds,
            statusCode
        };
    }
    if (((_b = pages.ssg.notFound) !== null && _b !== void 0 ? _b : {})[localeUri] && !isPreview) {
        return notFoundPage(uri, manifest, routesManifest);
    }
    if (pages.ssr.nonDynamic[localeUri]) {
        return {
            isData: false,
            isRender: true,
            page: pages.ssr.nonDynamic[localeUri]
        };
    }
    const rewrite = !isRewrite && getRewritePath(uri, routesManifest, manifest);
    if (rewrite) {
        const [path, querystring] = rewrite.split("?");
        if (isExternalRewrite(path)) {
            return {
                isExternal: true,
                path,
                querystring
            };
        }
        const route = handlePageReq(path, manifest, routesManifest, isPreview, true);
        return {
            ...route,
            querystring
        };
    }
    const dynamic = matchDynamicRoute(localeUri, pages.dynamic);
    const dynamicSSG = dynamic && pages.ssg.dynamic[dynamic];
    if (dynamicSSG && !isPreview) {
        return {
            isData: false,
            isStatic: true,
            file: pageHtml(localeUri),
            page: dynamic ? pages.ssr.dynamic[dynamic] : undefined,
            fallback: dynamicSSG.fallback
        };
    }
    const dynamicSSR = dynamic && pages.ssr.dynamic[dynamic];
    if (dynamicSSR) {
        return {
            isData: false,
            isRender: true,
            page: dynamicSSR
        };
    }
    const dynamicHTML = dynamic && pages.html.dynamic[dynamic];
    if (dynamicHTML) {
        return {
            isData: false,
            isStatic: true,
            file: dynamicHTML
        };
    }
    return notFoundPage(uri, manifest, routesManifest);
};

/**
 * Get the rewrite of the given path, if it exists.
 * @param uri
 * @param pageManifest
 * @param routesManifest
 */
function getRewritePath(uri, routesManifest, pageManifest) {
    const path = addDefaultLocaleToPath(uri, routesManifest);
    const rewrites = routesManifest.rewrites;
    for (const rewrite of rewrites) {
        const match = matchPath(path, rewrite.source);
        if (!match) {
            continue;
        }
        const params = match.params;
        const destination = compileDestination(rewrite.destination, params);
        if (!destination) {
            return;
        }
        // No-op rewrite support for pages: skip to next rewrite if path does not map to existing non-dynamic and dynamic routes
        if (pageManifest && path === destination) {
            const url = handlePageReq(destination, pageManifest, routesManifest, false, true);
            if (url.statusCode === 404) {
                continue;
            }
        }
        // Pass unused params to destination
        // except nextInternalLocale param since it's already in path prefix
        const querystring = Object.keys(params)
            .filter((key) => key !== "nextInternalLocale")
            .filter((key) => !rewrite.destination.endsWith(`:${key}`) &&
            !rewrite.destination.includes(`:${key}/`))
            .map((key) => {
            const param = params[key];
            if (typeof param === "string") {
                return `${key}=${param}`;
            }
            else {
                return param.map((val) => `${key}=${val}`).join("&");
            }
        })
            .filter((key) => key)
            .join("&");
        if (querystring) {
            const separator = destination.includes("?") ? "&" : "?";
            return `${destination}${separator}${querystring}`;
        }
        return destination;
    }
}
function isExternalRewrite(customRewrite) {
    return (customRewrite.startsWith("http://") || customRewrite.startsWith("https://"));
}

function getUnauthenticatedResponse(authorizationHeaders, authentication) {
    var _a;
    if (authentication && authentication.username && authentication.password) {
        const validAuth = "Basic " +
            Buffer.from(authentication.username + ":" + authentication.password).toString("base64");
        if (!authorizationHeaders || ((_a = authorizationHeaders[0]) === null || _a === void 0 ? void 0 : _a.value) !== validAuth) {
            return {
                isUnauthorized: true,
                status: 401,
                statusDescription: "Unauthorized",
                body: "Unauthorized",
                headers: {
                    "www-authenticate": [{ key: "WWW-Authenticate", value: "Basic" }]
                }
            };
        }
    }
}

/*
 * Get page name from data route
 */
const normaliseDataUri = (uri, buildId) => {
    const prefix = `/_next/data/${buildId}`;
    if (!uri.startsWith(prefix)) {
        return uri;
    }
    return uri
        .slice(prefix.length)
        .replace(/\.json$/, "")
        .replace(/^(\/index)?$/, "/");
};
/*
 * Get full data route uri from page name
 */
const fullDataUri = (uri, buildId) => {
    const prefix = `/_next/data/${buildId}`;
    if (uri === "/") {
        return `${prefix}/index.json`;
    }
    return `${prefix}${uri}.json`;
};
/*
 * Handles a data route
 */
const handleDataReq = (uri, manifest, routesManifest, isPreview) => {
    var _a, _b;
    const { buildId, pages } = manifest;
    const localeUri = addDefaultLocaleToPath(normaliseDataUri(uri, buildId), routesManifest);
    if (pages.ssg.nonDynamic[localeUri] && !isPreview) {
        const ssg = pages.ssg.nonDynamic[localeUri];
        const route = (_a = ssg.srcRoute) !== null && _a !== void 0 ? _a : localeUri;
        return {
            isData: true,
            isStatic: true,
            file: fullDataUri(localeUri, buildId),
            page: pages.ssr.nonDynamic[route],
            revalidate: ssg.initialRevalidateSeconds
        };
    }
    if (((_b = pages.ssg.notFound) !== null && _b !== void 0 ? _b : {})[localeUri] && !isPreview) {
        return notFoundData(uri, manifest, routesManifest);
    }
    if (pages.ssr.nonDynamic[localeUri]) {
        return {
            isData: true,
            isRender: true,
            page: pages.ssr.nonDynamic[localeUri]
        };
    }
    const dynamic = matchDynamicRoute(localeUri, pages.dynamic);
    const dynamicSSG = dynamic && pages.ssg.dynamic[dynamic];
    if (dynamicSSG && !isPreview) {
        return {
            isData: true,
            isStatic: true,
            file: fullDataUri(localeUri, buildId),
            page: dynamic ? pages.ssr.dynamic[dynamic] : undefined,
            fallback: dynamicSSG.fallback
        };
    }
    const dynamicSSR = dynamic && pages.ssr.dynamic[dynamic];
    if (dynamicSSR) {
        return {
            isData: true,
            isRender: true,
            page: dynamicSSR
        };
    }
    return notFoundData(uri, manifest, routesManifest);
};

const NEXT_PREVIEW_DATA_COOKIE = "__next_preview_data";
const NEXT_PRERENDER_BYPASS_COOKIE = "__prerender_bypass";
const defaultPreviewCookies = {
    [NEXT_PRERENDER_BYPASS_COOKIE]: "",
    [NEXT_PREVIEW_DATA_COOKIE]: ""
};
/**
 * Determine if the request contains a valid signed JWT for preview mode
 *
 * @param cookies - Cookies header with cookies in RFC 6265 compliant format
 * @param previewModeSigningKey - Next build key generated in the preRenderManifest
 */
const isValidPreviewRequest = async (cookies, previewModeSigningKey) => {
    const previewCookies = getPreviewCookies(cookies);
    if (hasPreviewCookies(previewCookies)) {
        try {
            const jsonwebtoken = await Promise.resolve().then(function () { return require('./index-ea404fc9.js'); }).then(function (n) { return n.index; });
            jsonwebtoken.verify(previewCookies[NEXT_PREVIEW_DATA_COOKIE], previewModeSigningKey);
            return true;
        }
        catch (e) {
            console.warn("Found preview headers without valid authentication token");
        }
    }
    return false;
};
// Private
const getPreviewCookies = (cookies) => {
    const targetCookie = cookies || [];
    return targetCookie.reduce((previewCookies, cookieObj) => {
        const parsedCookie = parse_1(cookieObj.value);
        if (hasPreviewCookies(parsedCookie)) {
            return parsedCookie;
        }
        return previewCookies;
    }, defaultPreviewCookies);
};
const hasPreviewCookies = (cookies) => !!(cookies[NEXT_PREVIEW_DATA_COOKIE] && cookies[NEXT_PRERENDER_BYPASS_COOKIE]);

/**
 * Create a redirect response with the given status code
 * @param uri
 * @param querystring
 * @param statusCode
 */
function createRedirectResponse(uri, querystring, statusCode) {
    let location;
    // Properly join query strings
    if (querystring) {
        const [uriPath, uriQuery] = uri.split("?");
        location = `${uriPath}?${querystring}${uriQuery ? `&${uriQuery}` : ""}`;
    }
    else {
        location = uri;
    }
    const status = statusCode;
    const statusDescription = http.STATUS_CODES[status];
    const refresh = statusCode === 308
        ? [
            // Required for IE11 compatibility
            {
                key: "Refresh",
                value: `0;url=${location}`
            }
        ]
        : [];
    const cacheControl = [
        {
            key: "Cache-Control",
            value: "s-maxage=0"
        }
    ];
    return {
        isRedirect: true,
        status: status,
        statusDescription: statusDescription || "",
        headers: {
            location: [
                {
                    key: "Location",
                    value: location
                }
            ],
            refresh: refresh,
            "cache-control": cacheControl
        }
    };
}
/**
 * Get a domain redirect such as redirecting www to non-www domain.
 * @param request
 * @param manifest
 */
function getDomainRedirectPath(request, manifest) {
    const hostHeaders = request.headers["host"];
    if (hostHeaders && hostHeaders.length > 0) {
        const host = hostHeaders[0].value;
        const domainRedirects = manifest.domainRedirects;
        if (domainRedirects && domainRedirects[host]) {
            return `${domainRedirects[host]}${request.uri}`;
        }
    }
}
/**
 * Redirect from root to locale.
 * @param req
 * @param routesManifest
 * @param manifest
 */
async function getLanguageRedirectPath(req, manifest, routesManifest) {
    var _a, _b, _c;
    // Check for disabled locale detection: https://nextjs.org/docs/advanced-features/i18n-routing#disabling-automatic-locale-detection
    if (((_a = routesManifest.i18n) === null || _a === void 0 ? void 0 : _a.localeDetection) === false) {
        return undefined;
    }
    // Try to get locale domain redirect
    const localeDomainRedirect = await getLocaleDomainRedirect(req, routesManifest);
    if (localeDomainRedirect) {
        return localeDomainRedirect;
    }
    const basePath = routesManifest.basePath;
    const trailingSlash = manifest.trailingSlash;
    const rootUri = basePath ? `${basePath}${trailingSlash ? "/" : ""}` : "/";
    // NEXT_LOCALE in cookie will override any accept-language header
    // per: https://nextjs.org/docs/advanced-features/i18n-routing#leveraging-the-next_locale-cookie
    const headerCookies = req.headers.cookie
        ? (_b = req.headers.cookie[0]) === null || _b === void 0 ? void 0 : _b.value
        : undefined;
    if (req.uri === rootUri && headerCookies) {
        const cookies = parse_1(headerCookies);
        const nextLocale = cookies["NEXT_LOCALE"];
        if (nextLocale) {
            return await getAcceptLanguageLocale(nextLocale, manifest, routesManifest);
        }
    }
    const languageHeader = req.headers["accept-language"];
    const acceptLanguage = languageHeader && ((_c = languageHeader[0]) === null || _c === void 0 ? void 0 : _c.value);
    if (req.uri === rootUri && acceptLanguage) {
        return await getAcceptLanguageLocale(acceptLanguage, manifest, routesManifest);
    }
}
/**
 * Get the redirect of the given path, if it exists.
 * @param path
 * @param manifest
 */
function getRedirectPath(request, routesManifest) {
    var _a;
    const path = addDefaultLocaleToPath(request.uri, routesManifest);
    const redirects = (_a = routesManifest.redirects) !== null && _a !== void 0 ? _a : [];
    for (const redirect of redirects) {
        const match = matchPath(path, redirect.source);
        if (match) {
            const compiledDestination = compileDestination(redirect.destination, match.params);
            if (!compiledDestination) {
                return null;
            }
            return {
                path: compiledDestination,
                statusCode: redirect.statusCode
            };
        }
    }
    return null;
}
/**
 * Get a domain redirect such as redirecting www to non-www domain.
 * @param request
 * @param manifest
 */
function getTrailingSlashPath(request, manifest, isFile) {
    const { uri } = request;
    if (isFile) {
        // Data requests and public files with trailing slash URL always get
        // redirected to non-trailing slash URL
        if (uri.endsWith("/")) {
            return uri.slice(0, -1);
        }
    }
    else if (/^\/[^/]/.test(request.uri)) {
        // HTML/SSR pages get redirected based on trailingSlash in next.config.js
        // We do not redirect:
        // Unnormalised URI is "/" or "" as this could cause a redirect loop
        const trailingSlash = manifest.trailingSlash;
        if (!trailingSlash && uri.endsWith("/")) {
            return uri.slice(0, -1);
        }
        if (trailingSlash && !uri.endsWith("/")) {
            return uri + "/";
        }
    }
}

const handleAuth = (req, manifest) => {
    const { headers } = req;
    return getUnauthenticatedResponse(headers.authorization, manifest.authentication);
};
const handleCustomRedirects = (req, routesManifest) => {
    const redirect = getRedirectPath(req, routesManifest);
    if (redirect) {
        const { path, statusCode } = redirect;
        return createRedirectResponse(path, req.querystring, statusCode);
    }
};
const handleDomainRedirects = (req, manifest) => {
    const path = getDomainRedirectPath(req, manifest);
    if (path) {
        return createRedirectResponse(path, req.querystring, 308);
    }
};
const handleLanguageRedirect = async (req, manifest, routesManifest) => {
    const languageRedirectUri = await getLanguageRedirectPath(req, manifest, routesManifest);
    if (languageRedirectUri) {
        return createRedirectResponse(languageRedirectUri, req.querystring, 307);
    }
};
const handlePublicFiles = (uri, manifest) => {
    const decodedUri = decodeURI(uri);
    const isPublicFile = manifest.publicFiles && manifest.publicFiles[decodedUri];
    if (isPublicFile) {
        return {
            isPublicFile: true,
            file: uri
        };
    }
};
const handleTrailingSlash = (req, manifest, isFile) => {
    const path = getTrailingSlashPath(req, manifest, isFile);
    if (path) {
        return createRedirectResponse(path, req.querystring, 308);
    }
};
/*
 * Routes:
 * - auth
 * - redirects
 * - public files
 * - data routes
 * - pages
 * - rewrites (external and page)
 */
const routeDefault = async (req, manifest, prerenderManifest, routesManifest) => {
    const auth = handleAuth(req, manifest);
    if (auth) {
        return auth;
    }
    const domainRedirect = handleDomainRedirects(req, manifest);
    if (domainRedirect) {
        return domainRedirect;
    }
    const uri = normalise(req.uri, routesManifest);
    const is404 = uri.endsWith("/404");
    const isDataReq = uri.startsWith("/_next/data");
    const publicFile = handlePublicFiles(uri, manifest);
    const isPublicFile = !!publicFile;
    const trailingSlash = !is404 && handleTrailingSlash(req, manifest, isDataReq || isPublicFile);
    if (trailingSlash) {
        return trailingSlash;
    }
    if (publicFile) {
        return publicFile;
    }
    const otherRedirect = handleCustomRedirects(req, routesManifest) ||
        (await handleLanguageRedirect(req, manifest, routesManifest));
    if (otherRedirect) {
        return otherRedirect;
    }
    const isPreview = await isValidPreviewRequest(req.headers.cookie, prerenderManifest.preview.previewModeSigningKey);
    if (isDataReq) {
        return handleDataReq(uri, manifest, routesManifest, isPreview);
    }
    else {
        return handlePageReq(req.uri, manifest, routesManifest, isPreview);
    }
};

const unauthorized = (event, route) => {
    setHeadersFromRoute(event, route);
    event.res.statusCode = route.status;
    event.res.statusMessage = route.statusDescription;
    event.res.end();
};

const renderErrorPage = async (error, event, route, manifest, routesManifest, getPage) => {
    var _a;
    console.error(`Error rendering page: ${route.page}. Error:\n${error}\nRendering Next.js error page.`);
    const { req, res } = event;
    const localePrefix = getLocalePrefixFromUri((_a = req.url) !== null && _a !== void 0 ? _a : "", routesManifest);
    // Render static error page if present by returning static route
    const errorRoute = `${localePrefix}/500`;
    const staticErrorPage = manifest.pages.html.nonDynamic[errorRoute] ||
        manifest.pages.ssg.nonDynamic[errorRoute];
    if (staticErrorPage) {
        return {
            isData: route.isData,
            isStatic: true,
            file: `pages${localePrefix}/500.html`,
            statusCode: 500
        };
    }
    else {
        // Set status to 500 so _error.js will render a 500 page
        res.statusCode = 500;
        const errorPage = getPage("./pages/_error.js");
        await Promise.race([errorPage.render(req, res), event.responsePromise]);
    }
};

const renderRoute = async (event, route, manifest, routesManifest, getPage) => {
    const { req, res } = event;
    setCustomHeaders(event, routesManifest);
    // For SSR rewrites to work the page needs to be passed a localized url
    if (req.url && routesManifest.i18n && !route.isData) {
        req.url = addDefaultLocaleToPath(req.url, routesManifest, findDomainLocale(req, routesManifest));
    }
    // Sets error page status code so _error renders the right page
    if (route.statusCode) {
        res.statusCode = route.statusCode;
    }
    const page = getPage(route.page);
    try {
        if (route.isData) {
            const { renderOpts } = await page.renderReqToHTML(req, res, "passthrough");
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(renderOpts.pageData));
        }
        else {
            await Promise.race([page.render(req, res), event.responsePromise]);
        }
    }
    catch (error) {
        return renderErrorPage(error, event, route, manifest, routesManifest, getPage);
    }
};
/*
 * Handles page and data routes.
 *
 * Returns one of: ExternalRoute, PublicFileRoute, StaticRoute
 * for handling in the caller.
 *
 * If return is void, the response has already been generated in
 * event.res/event.responsePromise which the caller should wait on.
 */
const handleDefault = async (event, manifest, prerenderManifest, routesManifest, getPage) => {
    const request = toRequest(event);
    const route = await routeDefault(request, manifest, prerenderManifest, routesManifest);
    if (route.querystring) {
        event.req.url = `${event.req.url}${request.querystring ? "&" : "?"}${route.querystring}`;
    }
    if (route.isRedirect) {
        return redirect(event, route);
    }
    if (route.isRender) {
        return renderRoute(event, route, manifest, routesManifest, getPage);
    }
    if (route.isUnauthorized) {
        return unauthorized(event, route);
    }
    // Let typescript check this is correct type to be returned
    return route;
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

const renderNotFound = async (event, manifest, routesManifest, getPage) => {
    var _a;
    const route = notFoundPage((_a = event.req.url) !== null && _a !== void 0 ? _a : "", manifest, routesManifest);
    if (route.isStatic) {
        return route;
    }
    return await renderRoute(event, route, manifest, routesManifest, getPage);
};
const renderFallback = async (event, route, manifest, routesManifest, getPage) => {
    const { req, res } = event;
    setCustomHeaders(event, routesManifest);
    const page = getPage(route.page);
    try {
        const { html, renderOpts } = await renderPageToHtml(page, req, res, "passthrough");
        if (renderOpts.isNotFound) {
            if (route.isData) {
                res.setHeader("Content-Type", "application/json");
                res.statusCode = 404;
                res.end(JSON.stringify({ notFound: true }));
                return;
            }
            return renderNotFound(event, manifest, routesManifest, getPage);
        }
        return { isStatic: false, route, html, renderOpts };
    }
    catch (error) {
        return renderErrorPage(error, event, route, manifest, routesManifest, getPage);
    }
};
/*
 * Handles fallback routes
 *
 * If route is a blocking fallback or a fallback data route,
 * a Fallback object is returned. It contains the rendered page.
 *
 * Otherwise either a page is rendered (like handleDefault) or
 * returns as StaticRoute for the caller to handle.
 */
const handleFallback = async (event, route, manifest, routesManifest, getPage) => {
    // This should not be needed if all SSR routes are handled correctly
    if (route.isRender) {
        return renderRoute(event, route, manifest, routesManifest, getPage);
    }
    if (route.isStatic) {
        const staticRoute = route;
        const shouldRender = (staticRoute.fallback && staticRoute.isData) ||
            staticRoute.fallback === null;
        if (shouldRender && staticRoute.page) {
            const fallback = staticRoute;
            return renderFallback(event, fallback, manifest, routesManifest, getPage);
        }
        if (staticRoute.fallback) {
            return { ...staticRoute, file: `pages${staticRoute.fallback}` };
        }
    }
    return await renderNotFound(event, manifest, routesManifest, getPage);
};

const firstRegenerateExpiryDate = (lastModifiedHeader, initialRevalidateSeconds) => {
    return new Date(new Date(lastModifiedHeader).getTime() + initialRevalidateSeconds * 1000);
};
/**
 * Function called within an origin response as part of the Incremental Static
 * Regeneration logic. Returns required headers for the response, or false if
 * this response is not compatible with ISR.
 */
const getStaticRegenerationResponse = (options) => {
    const { initialRevalidateSeconds } = options;
    // ISR pages that were either previously regenerated or generated
    // post-initial-build, will have an `Expires` header set. However ISR pages
    // that have not been regenerated but at build-time resolved a revalidate
    // property will not have an `Expires` header and therefore we check using the
    // manifest.
    if (!options.expiresHeader &&
        !(options.lastModifiedHeader && typeof initialRevalidateSeconds === "number")) {
        return false;
    }
    const expiresAt = options.expiresHeader
        ? new Date(options.expiresHeader)
        : firstRegenerateExpiryDate(options.lastModifiedHeader, initialRevalidateSeconds);
    const secondsRemainingUntilRevalidation = Math.ceil(Math.max(0, (expiresAt.getTime() - Date.now()) / 1000));
    return {
        secondsRemainingUntilRevalidation,
        cacheControl: `public, max-age=0, s-maxage=${secondsRemainingUntilRevalidation}, must-revalidate`
    };
};
const getThrottledStaticRegenerationCachePolicy = (expiresInSeconds) => {
    return {
        secondsRemainingUntilRevalidation: expiresInSeconds,
        cacheControl: `public, max-age=0, s-maxage=${expiresInSeconds}, must-revalidate`
    };
};

// Blacklisted or read-only headers in CloudFront
const ignoredHeaders = [
    "connection",
    "expect",
    "keep-alive",
    "proxy-authenticate",
    "proxy-authorization",
    "proxy-connection",
    "trailer",
    "upgrade",
    "x-accel-buffering",
    "x-accel-charset",
    "x-accel-limit-rate",
    "x-accel-redirect",
    "x-cache",
    "x-forwarded-proto",
    "x-real-ip",
    "content-length",
    "host",
    "transfer-encoding",
    "via"
];
const ignoredHeaderPrefixes = ["x-amz-cf-", "x-amzn-", "x-edge-"];
function isIgnoredHeader(name) {
    const lowerCaseName = name.toLowerCase();
    for (const prefix of ignoredHeaderPrefixes) {
        if (lowerCaseName.startsWith(prefix)) {
            return true;
        }
    }
    return ignoredHeaders.includes(lowerCaseName);
}
async function createExternalRewriteResponse(customRewrite, req, res, body) {
    const { default: fetch } = await Promise.resolve().then(function () { return require('./index-9e574644.js'); });
    // Set request headers
    const reqHeaders = {};
    Object.assign(reqHeaders, req.headers);
    // Delete host header otherwise request may fail due to host mismatch
    if (reqHeaders.hasOwnProperty("host")) {
        delete reqHeaders.host;
    }
    let fetchResponse;
    if (body) {
        const decodedBody = Buffer.from(body, "base64").toString("utf8");
        fetchResponse = await fetch(customRewrite, {
            headers: reqHeaders,
            method: req.method,
            body: decodedBody,
            compress: false,
            redirect: "manual"
        });
    }
    else {
        fetchResponse = await fetch(customRewrite, {
            headers: reqHeaders,
            method: req.method,
            compress: false,
            redirect: "manual"
        });
    }
    for (const [name, val] of fetchResponse.headers.entries()) {
        if (!isIgnoredHeader(name)) {
            res.setHeader(name, val);
        }
    }
    res.statusCode = fetchResponse.status;
    res.end(await fetchResponse.buffer());
}
const externalRewrite = async (event, enableHTTPCompression, rewrite) => {
    var _a;
    const request = event.Records[0].cf.request;
    const { req, res, responsePromise } = nextAwsCloudfront(event.Records[0].cf, {
        enableHTTPCompression
    });
    await createExternalRewriteResponse(rewrite + (request.querystring ? "?" : "") + request.querystring, req, res, (_a = request.body) === null || _a === void 0 ? void 0 : _a.data);
    return await responsePromise;
};

const blacklistedHeaders = [
    "connection",
    "expect",
    "keep-alive",
    "proxy-authenticate",
    "proxy-authorization",
    "proxy-connection",
    "trailer",
    "upgrade",
    "x-accel-buffering",
    "x-accel-charset",
    "x-accel-limit-rate",
    "x-accel-redirect",
    "x-cache",
    "x-forwarded-proto",
    "x-real-ip"
];
const blacklistedHeaderPrefixes = ["x-amz-cf-", "x-amzn-", "x-edge-"];
function isBlacklistedHeader(name) {
    const lowerCaseName = name.toLowerCase();
    for (const prefix of blacklistedHeaderPrefixes) {
        if (lowerCaseName.startsWith(prefix)) {
            return true;
        }
    }
    return blacklistedHeaders.includes(lowerCaseName);
}
function removeBlacklistedHeaders(headers) {
    for (const header in headers) {
        if (isBlacklistedHeader(header)) {
            delete headers[header];
        }
    }
}

const s3BucketNameFromEventRequest = (request) => {
    var _a;
    const { region, domainName } = ((_a = request.origin) === null || _a === void 0 ? void 0 : _a.s3) || {};
    return !!region && (domainName === null || domainName === void 0 ? void 0 : domainName.includes(region))
        ? domainName === null || domainName === void 0 ? void 0 : domainName.replace(`.s3.${region}.amazonaws.com`, "")
        : domainName === null || domainName === void 0 ? void 0 : domainName.replace(`.s3.amazonaws.com`, "");
};

const triggerStaticRegeneration = async (options) => {
    var _a, _b, _c;
    const { region } = ((_a = options.request.origin) === null || _a === void 0 ? void 0 : _a.s3) || {};
    const bucketName = s3BucketNameFromEventRequest(options.request);
    const queueName = options.queueName;
    if (!bucketName) {
        throw new Error("Expected bucket name to be defined");
    }
    if (!region) {
        throw new Error("Expected region to be defined");
    }
    const { SQSClient, SendMessageCommand } = await Promise.resolve().then(function () { return require('./index-2d300cb1.js'); });
    const sqs = new SQSClient({
        region,
        maxAttempts: 1
    });
    const regenerationEvent = {
        region,
        bucketName,
        cloudFrontEventRequest: options.request,
        basePath: options.basePath,
        pagePath: options.pagePath
    };
    try {
        await sqs.send(new SendMessageCommand({
            QueueUrl: `https://sqs.${region}.amazonaws.com/${queueName}`,
            MessageBody: JSON.stringify(regenerationEvent),
            // We only want to trigger the regeneration once for every previous
            // update. This will prevent the case where this page is being
            // requested again whilst its already started to regenerate.
            MessageDeduplicationId: ((_b = options.response.headers["etag"]) === null || _b === void 0 ? void 0 : _b[0].value) ||
                new Date((_c = options.response.headers["last-modified"]) === null || _c === void 0 ? void 0 : _c[0].value)
                    .getTime()
                    .toString(),
            // Only deduplicate based on the object, i.e. we can generate
            // different pages in parallel, just not the same one
            MessageGroupId: options.request.uri
        }));
        return { throttle: false };
    }
    catch (error) {
        if (error.code === "RequestThrottled") {
            return { throttle: true };
        }
        else {
            throw error;
        }
    }
};

/**
 * There are multiple occasions where a static/SSG page will be generated after
 * the initial build. This function accepts a generated page, stores it and
 * applies the appropriate headers (e.g. setting an 'Expires' header for
 * regeneration).
 */
const s3StorePage = async (options) => {
    const { S3Client } = await Promise.resolve().then(function () { return require('./S3Client-65267879.js'); });
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
    const { PutObjectCommand } = await Promise.resolve().then(function () { return require('./PutObjectCommand-56d49530.js'); });
    await Promise.all([
        s3.send(new PutObjectCommand(s3JsonParams)),
        s3.send(new PutObjectCommand(s3HtmlParams))
    ]);
    return {
        cacheControl,
        expires
    };
};

// @ts-ignore
const basePath = RoutesManifestJson__default['default'].basePath;
const perfLogger = (logLambdaExecutionTimes) => {
    if (logLambdaExecutionTimes) {
        return {
            now: () => perf_hooks.performance.now(),
            log: (metricDescription, t1, t2) => {
                if (!t1 || !t2)
                    return;
                console.log(`${metricDescription}: ${t2 - t1} (ms)`);
            }
        };
    }
    return {
        now: () => 0,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        log: () => { }
    };
};
const addS3HostHeader = (req, s3DomainName) => {
    req.headers["host"] = [{ key: "host", value: s3DomainName }];
};
const normaliseS3OriginDomain = (s3Origin) => {
    if (s3Origin.region === "us-east-1") {
        return s3Origin.domainName;
    }
    if (!s3Origin.domainName.includes(s3Origin.region)) {
        const regionalEndpoint = s3Origin.domainName.replace("s3.amazonaws.com", `s3.${s3Origin.region}.amazonaws.com`);
        return regionalEndpoint;
    }
    return s3Origin.domainName;
};
const handler = async (event) => {
    const manifest = Manifest__default['default'];
    let response;
    const prerenderManifest = PrerenderManifest__default['default'];
    const routesManifest = RoutesManifestJson__default['default'];
    const { now, log } = perfLogger(manifest.logLambdaExecutionTimes);
    const tHandlerBegin = now();
    if (isOriginResponse(event)) {
        response = await handleOriginResponse({
            event,
            manifest,
            prerenderManifest,
            routesManifest
        });
    }
    else {
        response = await handleOriginRequest({
            event,
            manifest,
            prerenderManifest,
            routesManifest
        });
    }
    // Remove blacklisted headers
    if (response.headers) {
        removeBlacklistedHeaders(response.headers);
    }
    const tHandlerEnd = now();
    log("handler execution time", tHandlerBegin, tHandlerEnd);
    return response;
};
const staticRequest = (request, file, path) => {
    var _a;
    const s3Origin = (_a = request.origin) === null || _a === void 0 ? void 0 : _a.s3;
    const s3Domain = normaliseS3OriginDomain(s3Origin);
    s3Origin.domainName = s3Domain;
    s3Origin.path = path;
    request.uri = file;
    addS3HostHeader(request, s3Domain);
    return request;
};
const reconstructOriginalRequestUri = (s3Uri, manifest) => {
    // For public files we do not replace .html as it can cause public HTML files to be classified with wrong status code
    const publicFile = handlePublicFiles(s3Uri, manifest);
    if (publicFile) {
        return `${basePath}${s3Uri}`;
    }
    let originalUri = `${basePath}${s3Uri.replace(/(\.html)?$/, manifest.trailingSlash ? "/" : "")}`;
    // For index.html page, it will become "/index", which is not a route so normalize it to "/"
    originalUri = originalUri.replace(/\/index$/, "/");
    return originalUri;
};
const handleOriginRequest = async ({ event, manifest, prerenderManifest, routesManifest }) => {
    const request = event.Records[0].cf.request;
    const { req, res, responsePromise } = nextAwsCloudfront(event.Records[0].cf, {
        enableHTTPCompression: manifest.enableHTTPCompression
    });
    const { now, log } = perfLogger(manifest.logLambdaExecutionTimes);
    let tBeforeSSR = null;
    const getPage = (pagePath) => {
        const tBeforePageRequire = now();
        const page = require(`./${pagePath}`); // eslint-disable-line
        const tAfterPageRequire = (tBeforeSSR = now());
        log("require JS execution time", tBeforePageRequire, tAfterPageRequire);
        return page;
    };
    const route = await handleDefault({ req, res, responsePromise }, manifest, prerenderManifest, routesManifest, getPage);
    if (tBeforeSSR) {
        const tAfterSSR = now();
        log("SSR execution time", tBeforeSSR, tAfterSSR);
    }
    if (!route) {
        return await responsePromise;
    }
    if (route.isPublicFile) {
        const { file } = route;
        return staticRequest(request, file, `${routesManifest.basePath}/public`);
    }
    if (route.isStatic) {
        const { file, isData } = route;
        const path = isData
            ? `${routesManifest.basePath}`
            : `${routesManifest.basePath}/static-pages/${manifest.buildId}`;
        const relativeFile = isData ? file : file.slice("pages".length);
        return staticRequest(request, relativeFile, path);
    }
    const external = route;
    const { path } = external;
    return externalRewrite(event, manifest.enableHTTPCompression, path);
};
const handleOriginResponse = async ({ event, manifest, prerenderManifest, routesManifest }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const response = event.Records[0].cf.response;
    const request = event.Records[0].cf.request;
    const bucketName = s3BucketNameFromEventRequest(request);
    // Reconstruct valid request uri for routing
    const s3Uri = request.uri;
    request.uri = reconstructOriginalRequestUri(s3Uri, manifest);
    const route = await routeDefault(request, manifest, prerenderManifest, routesManifest);
    const staticRoute = route.isStatic ? route : undefined;
    const statusCode = route === null || route === void 0 ? void 0 : route.statusCode;
    // These statuses are returned when S3 does not have access to the page.
    // 404 will also be returned if CloudFront has permissions to list objects.
    if (response.status !== "403" && response.status !== "404") {
        response.headers = {
            ...response.headers,
            ...getCustomHeaders(request.uri, routesManifest)
        };
        // Set 404 status code for static 404 page.
        if (statusCode === 404) {
            response.status = "404";
            response.statusDescription = "Not Found";
            return response;
        }
        // Set 500 status code for static 500 page.
        if (statusCode === 500) {
            response.status = "500";
            response.statusDescription = "Internal Server Error";
            response.headers["cache-control"] = [
                {
                    key: "Cache-Control",
                    value: "public, max-age=0, s-maxage=0, must-revalidate" // server error page should not be cached
                }
            ];
            return response;
        }
        const staticRegenerationResponse = getStaticRegenerationResponse({
            expiresHeader: ((_c = (_b = (_a = response.headers) === null || _a === void 0 ? void 0 : _a.expires) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.value) || "",
            lastModifiedHeader: ((_f = (_e = (_d = response.headers) === null || _d === void 0 ? void 0 : _d["last-modified"]) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.value) || "",
            initialRevalidateSeconds: staticRoute === null || staticRoute === void 0 ? void 0 : staticRoute.revalidate
        });
        if (staticRegenerationResponse) {
            response.headers["cache-control"] = [
                {
                    key: "Cache-Control",
                    value: staticRegenerationResponse.cacheControl
                }
            ];
            // We don't want the `expires` header to be sent to the client we manage
            // the cache at the edge using the s-maxage directive in the cache-control
            // header
            delete response.headers.expires;
            if ((staticRoute === null || staticRoute === void 0 ? void 0 : staticRoute.page) &&
                staticRegenerationResponse.secondsRemainingUntilRevalidation === 0) {
                const regenerationQueueName = (_g = manifest.regenerationQueueName) !== null && _g !== void 0 ? _g : `${bucketName}.fifo`; // if queue name not specified, we used [bucketName].fifo as used in deployment
                if (!regenerationQueueName) {
                    throw new Error("Regeneration queue name is undefined.");
                }
                const { throttle } = await triggerStaticRegeneration({
                    basePath,
                    request,
                    response,
                    pagePath: staticRoute.page,
                    queueName: regenerationQueueName
                });
                // Occasionally we will get rate-limited by the Queue (in the event we
                // send it too many messages) and so we we use the cache to reduce
                // requests to the queue for a short period.
                if (throttle) {
                    response.headers["cache-control"] = [
                        {
                            key: "Cache-Control",
                            value: getThrottledStaticRegenerationCachePolicy(1).cacheControl
                        }
                    ];
                }
            }
        }
        return response;
    }
    // For PUT or DELETE just return the response as these should be unsupported S3 methods
    if (request.method === "PUT" || request.method === "DELETE") {
        return response;
    }
    const { req, res, responsePromise } = nextAwsCloudfront(event.Records[0].cf, {
        enableHTTPCompression: manifest.enableHTTPCompression
    });
    const getPage = (pagePath) => {
        return require(`./${pagePath}`);
    };
    const fallbackRoute = await handleFallback({ req, res, responsePromise }, route, manifest, routesManifest, getPage);
    // Already handled dynamic error path
    if (!fallbackRoute) {
        return await responsePromise;
    }
    // Lazily import only S3Client to reduce init times until actually needed
    const { S3Client } = await Promise.resolve().then(function () { return require('./S3Client-65267879.js'); });
    const s3 = new S3Client({
        region: (_j = (_h = request.origin) === null || _h === void 0 ? void 0 : _h.s3) === null || _j === void 0 ? void 0 : _j.region,
        maxAttempts: 3
    });
    const s3BasePath = basePath ? `${basePath.replace(/^\//, "")}/` : "";
    // Either a fallback: true page or a static error page
    if (fallbackRoute.isStatic) {
        const file = fallbackRoute.file.slice("pages".length);
        const s3Key = `${s3BasePath}static-pages/${manifest.buildId}${file}`;
        const { GetObjectCommand } = await Promise.resolve().then(function () { return require('./GetObjectCommand-8bd9d76a.js'); });
        // S3 Body is stream per: https://github.com/aws/aws-sdk-js-v3/issues/1096
        const getStream = await Promise.resolve().then(function () { return require('./index-891c56ba.js'); }).then(function (n) { return n.index; });
        const s3Params = {
            Bucket: bucketName,
            Key: s3Key
        };
        const s3Response = await s3.send(new GetObjectCommand(s3Params));
        const bodyString = await getStream.default(s3Response.Body);
        const statusCode = fallbackRoute.statusCode || 200;
        const is500 = statusCode === 500;
        const cacheControl = is500
            ? "public, max-age=0, s-maxage=0, must-revalidate" // static 500 page should never be cached
            : (_k = s3Response.CacheControl) !== null && _k !== void 0 ? _k : (fallbackRoute.fallback // Use cache-control from S3 response if possible, otherwise use defaults
                ? "public, max-age=0, s-maxage=0, must-revalidate" // fallback should never be cached
                : "public, max-age=0, s-maxage=2678400, must-revalidate");
        res.writeHead(statusCode, {
            "Cache-Control": cacheControl,
            "Content-Type": "text/html"
        });
        res.end(bodyString);
        return await responsePromise;
    }
    // This is a fallback route that should be stored in S3 before returning it
    const { renderOpts, html } = fallbackRoute;
    const { expires } = await s3StorePage({
        html,
        uri: s3Uri,
        basePath,
        bucketName: bucketName || "",
        buildId: manifest.buildId,
        pageData: renderOpts.pageData,
        region: ((_m = (_l = request.origin) === null || _l === void 0 ? void 0 : _l.s3) === null || _m === void 0 ? void 0 : _m.region) || "",
        revalidate: renderOpts.revalidate
    });
    const isrResponse = expires
        ? getStaticRegenerationResponse({
            expiresHeader: expires.toJSON(),
            lastModifiedHeader: undefined,
            initialRevalidateSeconds: staticRoute === null || staticRoute === void 0 ? void 0 : staticRoute.revalidate
        })
        : null;
    const cacheControl = (isrResponse && isrResponse.cacheControl) ||
        "public, max-age=0, s-maxage=2678400, must-revalidate";
    res.setHeader("Cache-Control", cacheControl);
    if (fallbackRoute.route.isData) {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(renderOpts.pageData));
    }
    else {
        res.setHeader("Content-Type", "text/html");
        res.end(html);
    }
    return await responsePromise;
};
const isOriginResponse = (event) => {
    return event.Records[0].cf.config.eventType === "origin-response";
};

exports.commonjsGlobal = commonjsGlobal;
exports.createCommonjsModule = createCommonjsModule;
exports.getAugmentedNamespace = getAugmentedNamespace;
exports.handler = handler;
