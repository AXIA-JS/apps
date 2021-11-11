"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Api", {
  enumerable: true,
  get: function () {
    return _Api.default;
  }
});
Object.defineProperty(exports, "api", {
  enumerable: true,
  get: function () {
    return _Api.api;
  }
});
Object.defineProperty(exports, "DEFAULT_DECIMALS", {
  enumerable: true,
  get: function () {
    return _Api.DEFAULT_DECIMALS;
  }
});
Object.defineProperty(exports, "DEFAULT_SS58", {
  enumerable: true,
  get: function () {
    return _Api.DEFAULT_SS58;
  }
});
Object.defineProperty(exports, "ApiContext", {
  enumerable: true,
  get: function () {
    return _ApiContext.default;
  }
});
Object.defineProperty(exports, "withApi", {
  enumerable: true,
  get: function () {
    return _index.withApi;
  }
});
Object.defineProperty(exports, "withCallDiv", {
  enumerable: true,
  get: function () {
    return _index.withCallDiv;
  }
});
Object.defineProperty(exports, "withCalls", {
  enumerable: true,
  get: function () {
    return _index.withCalls;
  }
});
Object.defineProperty(exports, "withMulti", {
  enumerable: true,
  get: function () {
    return _index.withMulti;
  }
});
Object.defineProperty(exports, "withObservable", {
  enumerable: true,
  get: function () {
    return _index.withObservable;
  }
});

var _Api = _interopRequireWildcard(require("./Api.cjs"));

var _ApiContext = _interopRequireDefault(require("./ApiContext.cjs"));

var _index = require("./hoc/index.cjs");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }