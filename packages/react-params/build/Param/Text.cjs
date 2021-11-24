"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _Bare = _interopRequireDefault(require("./Bare.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Text(_ref) {
  let {
    className = '',
    defaultValue: {
      value
    },
    isDisabled,
    isError,
    label,
    onChange,
    onEnter,
    onEscape,
    withLabel
  } = _ref;
  const [isValid, setIsValid] = (0, _react.useState)(false);

  const _onChange = (0, _react.useCallback)(value => {
    const isValid = value.length !== 0;
    onChange && onChange({
      isValid,
      value
    });
    setIsValid(isValid);
  }, [onChange]);

  const defaultValue = (value || '').toString();
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Bare.default, {
    className: className,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
      className: "full",
      defaultValue: defaultValue,
      isDisabled: isDisabled,
      isError: isError || !isValid,
      label: label,
      onChange: _onChange,
      onEnter: onEnter,
      onEscape: onEscape,
      placeholder: "<any string>",
      type: "text",
      withLabel: withLabel
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo(Text);

exports.default = _default;