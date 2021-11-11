"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _util = require("@axia-js/util");

var _Bytes = _interopRequireDefault(require("./Bytes.cjs"));

var _File = _interopRequireDefault(require("./File.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Code({
  className = '',
  defaultValue,
  isDisabled,
  isError,
  label,
  onChange,
  onEnter,
  onEscape,
  type,
  withLabel
}) {
  const [isValid, setIsValid] = (0, _react.useState)(false);

  const _onChange = (0, _react.useCallback)(value => {
    const isValid = (0, _util.isWasm)(value);
    onChange && onChange({
      isValid,
      value
    });
    setIsValid(isValid);
  }, [onChange]);

  if (isDisabled) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Bytes.default, {
      className: className,
      defaultValue: defaultValue,
      isError: isError || !isValid,
      label: label,
      onEnter: onEnter,
      onEscape: onEscape,
      type: type,
      withLabel: withLabel
    });
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_File.default, {
    className: className,
    defaultValue: defaultValue,
    isError: isError || !isValid,
    label: label,
    onChange: _onChange,
    withLabel: withLabel
  });
}

var _default = /*#__PURE__*/_react.default.memo(Code);

exports.default = _default;