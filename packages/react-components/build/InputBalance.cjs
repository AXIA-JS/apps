"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _constants = require("@axia-js/react-components/constants");

var _util = require("@axia-js/util");

var _InputNumber = _interopRequireDefault(require("./InputNumber.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
const DEFAULT_BITLENGTH = _constants.BitLengthOption.CHAIN_SPEC;

function reformat(value, isDisabled, siDecimals) {
  if (!value) {
    return [];
  }

  const decimals = (0, _util.isUndefined)(siDecimals) ? _util.formatBalance.getDefaults().decimals : siDecimals;
  const si = isDisabled ? _util.formatBalance.calcSi(value.toString(), decimals) : _util.formatBalance.findSi('-');
  return [(0, _util.formatBalance)(value, {
    decimals,
    forceUnit: si.value,
    withSi: false
  }).replace(',', isDisabled ? ',' : ''), si];
}

function InputBalance(_ref) {
  let {
    autoFocus,
    children,
    className = '',
    defaultValue: inDefault,
    help,
    isDisabled,
    isError,
    isFull,
    isWarning,
    isZeroable,
    label,
    labelExtra,
    maxValue,
    onChange,
    onEnter,
    onEscape,
    placeholder,
    siDecimals,
    siSymbol,
    value,
    withEllipsis,
    withLabel,
    withMax
  } = _ref;
  const [defaultValue, siDefault] = (0, _react.useMemo)(() => reformat(inDefault, isDisabled, siDecimals), [inDefault, isDisabled, siDecimals]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputNumber.default, {
    autoFocus: autoFocus,
    bitLength: DEFAULT_BITLENGTH,
    className: `ui--InputBalance ${className}`,
    defaultValue: defaultValue,
    help: help,
    isDisabled: isDisabled,
    isError: isError,
    isFull: isFull,
    isSi: true,
    isWarning: isWarning,
    isZeroable: isZeroable,
    label: label,
    labelExtra: labelExtra,
    maxValue: maxValue,
    onChange: onChange,
    onEnter: onEnter,
    onEscape: onEscape,
    placeholder: placeholder,
    siDecimals: siDecimals,
    siDefault: siDefault,
    siSymbol: siSymbol,
    value: value,
    withEllipsis: withEllipsis,
    withLabel: withLabel,
    withMax: withMax,
    children: children
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(InputBalance).withConfig({
  displayName: "InputBalance",
  componentId: "sc-5qaz85-0"
})(["&&:not(.isSmall) .labelExtra{right:6.5rem;}.ui.action.input.ui--Input > .buttons{align-items:stretch;.ui--SiDropdown.ui.button.compact.floating.selection.dropdown{&.disabled{border-style:solid;opacity:1 !important;}> div.text:first-child{font-size:0.9em;position:absolute;top:50%;transform:translateY(-50%);left:0.5rem;width:3rem;}}}"]));

exports.default = _default;