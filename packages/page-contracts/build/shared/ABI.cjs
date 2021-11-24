"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _translate = require("../translate.cjs");

var _Messages = _interopRequireDefault(require("./Messages.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-contracts authors & contributors
// SPDX-License-Identifier: Apache-2.0
const NOOP = () => undefined;

function ABI(_ref) {
  let {
    className,
    contractAbi,
    errorText,
    isDisabled,
    isError,
    isFull,
    isValid,
    label,
    onChange,
    onRemove = NOOP,
    onSelectConstructor,
    withConstructors = true,
    withLabel = true,
    withMessages = true,
    withWasm
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  return contractAbi && isValid ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Labelled, {
    className: className,
    help: t('This is the ABI as supplied. Any calls to the contract will use this information for encoding.'),
    label: label || t('contract ABI'),
    labelExtra: onRemove && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.IconLink, {
      icon: "trash",
      label: t('Remove ABI'),
      onClick: onRemove
    }),
    withLabel: withLabel,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Messages.default, {
      contractAbi: contractAbi,
      isLabelled: withLabel,
      onSelectConstructor: onSelectConstructor,
      withConstructors: withConstructors,
      withMessages: withMessages,
      withWasm: withWasm
    })
  }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: className,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputFile, {
      help: t('The ABI for the WASM code. The ABI is required and stored for future operations such as sending messages.'),
      isDisabled: isDisabled,
      isError: isError,
      isFull: isFull,
      label: label || t('contract ABI'),
      onChange: onChange,
      placeholder: errorText || t('click to select or drag and drop a JSON file')
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo(ABI);

exports.default = _default;