"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _ByHash = _interopRequireDefault(require("./ByHash.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0
function BlockByNumber(_ref) {
  let {
    value
  } = _ref;
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [getBlockHash, setState] = (0, _react.useState)(null);
  const mountedRef = (0, _reactHooks.useIsMountedRef)();
  const [error, setError] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    api.rpc.chain.getBlockHash(value).then(result => {
      mountedRef.current && setState(result);
    }).catch(error => {
      mountedRef.current && setError(error);
    });
  }, [api, mountedRef, value]);

  if (!getBlockHash && !error) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Spinner, {});
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ByHash.default, {
    error: error,
    value: getBlockHash ? getBlockHash.toHex() : null
  });
}

var _default = /*#__PURE__*/_react.default.memo(BlockByNumber);

exports.default = _default;