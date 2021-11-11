"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createParam = createParam;
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _util = require("@axia-js/util");

var _Bare = _interopRequireDefault(require("./Bare.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
// eslint-disable-next-line @typescript-eslint/ban-types
function createParam(hex, length = -1) {
  let u8a;

  try {
    u8a = (0, _util.hexToU8a)(hex.toString());
  } catch (error) {
    u8a = new Uint8Array([]);
  }

  const isValid = length !== -1 ? u8a.length === length : u8a.length !== 0;
  return {
    isValid,
    u8a: (0, _util.compactAddLength)(u8a)
  };
}

function KeyValue({
  className = '',
  isDisabled,
  label,
  onChange,
  onEnter,
  withLabel
}) {
  const [, setIsValid] = (0, _react.useState)(false);
  const [key, setKey] = (0, _react.useState)({
    isValid: false,
    u8a: new Uint8Array([])
  });
  const [value, setValue] = (0, _react.useState)({
    isValid: false,
    u8a: new Uint8Array([])
  });
  (0, _react.useEffect)(() => {
    const isValid = key.isValid && value.isValid;
    onChange && onChange({
      isValid,
      value: (0, _util.u8aConcat)(key.u8a, value.u8a)
    });
    setIsValid(isValid);
  }, [key, onChange, value]);

  const _onChangeKey = (0, _react.useCallback)(key => setKey(createParam(key)), []);

  const _onChangeValue = (0, _react.useCallback)(value => setValue(createParam(value)), []);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Bare.default, {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
      className: "medium",
      isDisabled: isDisabled,
      isError: !key.isValid,
      label: label,
      onChange: _onChangeKey,
      placeholder: "0x...",
      type: "text",
      withLabel: withLabel
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
      className: "medium",
      isDisabled: isDisabled,
      isError: !value.isValid,
      onChange: _onChangeValue,
      onEnter: onEnter,
      placeholder: "0x...",
      type: "text",
      withLabel: withLabel
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(KeyValue);

exports.default = _default;