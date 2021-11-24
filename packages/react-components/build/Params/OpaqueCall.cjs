"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactHooks = require("@axia-js/react-hooks");

var _Extrinsic = _interopRequireDefault(require("./Extrinsic.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-extrinsics authors & contributors
// SPDX-License-Identifier: Apache-2.0
function OpaqueCall(_ref) {
  let {
    className = '',
    isDisabled,
    isError,
    label,
    onChange,
    onEnter,
    onEscape,
    withLabel
  } = _ref;
  const {
    apiDefaultTxSudo
  } = (0, _reactHooks.useApi)();

  const _onChange = (0, _react.useCallback)(_ref2 => {
    let {
      isValid,
      value
    } = _ref2;
    let callData = null;

    if (isValid && value) {
      callData = value.method.toHex();
    }

    onChange && onChange({
      isValid,
      value: callData
    });
  }, [onChange]);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Extrinsic.default, {
    className: className,
    defaultValue: apiDefaultTxSudo,
    isDisabled: isDisabled,
    isError: isError,
    isPrivate: true,
    label: label,
    onChange: _onChange,
    onEnter: onEnter,
    onEscape: onEscape,
    withLabel: withLabel
  });
}

var _default = /*#__PURE__*/_react.default.memo(OpaqueCall);

exports.default = _default;