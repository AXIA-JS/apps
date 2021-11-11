"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddressRow = AddressRow;
exports.default = exports.DEFAULT_ADDR = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactHooks = require("@axia-js/react-hooks");

var _reactIdenticon = _interopRequireDefault(require("@axia-js/react-identicon"));

var _index = _interopRequireDefault(require("./IdentityIcon/index.cjs"));

var _Row = _interopRequireDefault(require("./Row.cjs"));

var _index2 = require("./util/index.cjs");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
const DEFAULT_ADDR = '5'.padEnd(48, 'x');
exports.DEFAULT_ADDR = DEFAULT_ADDR;
const ICON_SIZE = 32;

function AddressRow({
  buttons,
  children,
  className,
  defaultName,
  fullLength = false,
  isContract = false,
  isDisabled,
  isEditableName,
  isInline,
  isValid: propsIsValid,
  overlay,
  value,
  withTags = false
}) {
  const {
    accountIndex,
    isNull,
    name,
    onSaveName,
    onSaveTags,
    setName,
    setTags,
    tags
  } = (0, _reactHooks.useAccountInfo)(value ? value.toString() : null, isContract);
  const isValid = !isNull && (propsIsValid || value || accountIndex);
  const Icon = value ? _index.default : _reactIdenticon.default;
  const address = value && isValid ? value : DEFAULT_ADDR;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Row.default, {
    address: fullLength ? address : (0, _index2.toShortAddress)(address),
    buttons: buttons,
    className: className,
    defaultName: defaultName,
    icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(Icon, {
      size: ICON_SIZE,
      value: value ? value.toString() : null
    }),
    isDisabled: isDisabled,
    isEditableName: isEditableName,
    isEditableTags: true,
    isInline: isInline,
    name: name,
    onChangeName: setName,
    onChangeTags: setTags,
    onSaveName: onSaveName,
    onSaveTags: onSaveTags,
    tags: withTags && tags,
    children: [children, overlay]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(AddressRow).withConfig({
  displayName: "AddressRow",
  componentId: "sc-1ywhrqx-0"
})(["button.u.ui--Icon.editButton{padding:0 .3em .3em .3em;color:#2e86ab;background:none;margin-left:-2em;position:relative;right:-2.3em;z-index:1;}.editSpan{white-space:nowrap;&:before{content:'';}}.ui--AddressRow-balances{display:flex;.column{display:block;label,.result{display:inline-block;vertical-align:middle;}}> span{text-align:left;}}.ui--AddressRow-placeholder{opacity:0.5;}"]));

exports.default = _default;