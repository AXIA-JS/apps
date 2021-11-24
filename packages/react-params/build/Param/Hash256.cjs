"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _BaseBytes = _interopRequireDefault(require("./BaseBytes.cjs"));

var _File = _interopRequireDefault(require("./File.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Hash256(_ref) {
  let {
    className = '',
    defaultValue,
    isDisabled,
    isError,
    isInOption,
    label,
    name,
    onChange,
    onEnter,
    onEscape,
    registry,
    type,
    withLabel
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const [isFileDrop, setFileInput] = (0, _react.useState)(false);
  const [placeholder, setPlaceholder] = (0, _react.useState)(null);

  const _onChangeFile = (0, _react.useCallback)(u8a => {
    const value = registry.hash(u8a);
    setPlaceholder((0, _util.u8aToHex)(value));
    onChange && onChange({
      isValid: true,
      value
    });
  }, [onChange, registry]);

  const _setFileInput = (0, _react.useCallback)(value => {
    setPlaceholder(null);
    setFileInput(value);
  }, [setFileInput, setPlaceholder]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [!isDisabled && isFileDrop ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_File.default, {
      isDisabled: isDisabled,
      isError: isError,
      label: label,
      onChange: _onChangeFile,
      placeholder: placeholder || undefined,
      withLabel: withLabel
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_BaseBytes.default, {
      asHex: true,
      defaultValue: defaultValue,
      isDisabled: isDisabled,
      isError: isError,
      label: label,
      length: 32,
      name: name,
      onChange: onChange,
      onEnter: onEnter,
      onEscape: onEscape,
      type: type,
      withCopy: isDisabled,
      withLabel: withLabel
    }), !isDisabled && !isInOption && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Toggle, {
      isOverlay: true,
      label: t('hash a file'),
      onChange: _setFileInput,
      value: isFileDrop
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Hash256);

exports.default = _default;