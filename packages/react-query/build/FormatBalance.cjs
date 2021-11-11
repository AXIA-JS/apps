"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0
// for million, 2 * 3-grouping + comma
const M_LENGTH = 6 + 1;
const K_LENGTH = 3 + 1;

function getFormat(registry, formatIndex = 0) {
  const decimals = registry.chainDecimals;
  const tokens = registry.chainTokens;
  return [formatIndex < decimals.length ? decimals[formatIndex] : decimals[0], formatIndex < tokens.length ? tokens[formatIndex] : tokens[1]];
}

function createElement(prefix, postfix, unit, label = '', isShort = false) {
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [`${prefix}${isShort ? '' : '.'}`, !isShort && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: "ui--FormatBalance-postfix",
      children: `0000${postfix || ''}`.slice(-4)
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
      className: "ui--FormatBalance-unit",
      children: [" ", unit]
    }), label]
  });
}

function splitFormat(value, label, isShort) {
  const [prefix, postfixFull] = value.split('.');
  const [postfix, unit] = postfixFull.split(' ');
  return createElement(prefix, postfix, unit, label, isShort);
}

function applyFormat(value, [decimals, token], withCurrency = true, withSi, _isShort, labelPost) {
  const [prefix, postfix] = (0, _util.formatBalance)(value, {
    decimals,
    forceUnit: '-',
    withSi: false
  }).split('.');
  const isShort = _isShort || withSi && prefix.length >= K_LENGTH;
  const unitPost = withCurrency ? token : '';

  if (prefix.length > M_LENGTH) {
    const [major, rest] = (0, _util.formatBalance)(value, {
      decimals,
      withUnit: false
    }).split('.');
    const minor = rest.substr(0, 4);
    const unit = rest.substr(4);
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [major, ".", /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: "ui--FormatBalance-postfix",
        children: minor
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
        className: "ui--FormatBalance-unit",
        children: [unit, unit ? unitPost : ` ${unitPost}`]
      }), labelPost || '']
    });
  }

  return createElement(prefix, postfix, unitPost, labelPost, isShort);
}

function FormatBalance({
  children,
  className = '',
  format,
  formatIndex,
  isShort,
  label,
  labelPost,
  value,
  valueFormatted,
  withCurrency,
  withSi
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const formatInfo = (0, _react.useMemo)(() => format || getFormat(api.registry, formatIndex), [api, format, formatIndex]); // labelPost here looks messy, however we ensure we have one less text node

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `ui--FormatBalance ${className}`,
    children: [label ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [label, "\xA0"]
    }) : '', /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: "ui--FormatBalance-value",
      "data-testid": "balance-summary",
      children: valueFormatted ? splitFormat(valueFormatted, labelPost, isShort) : value ? value === 'all' ? t('everything{{labelPost}}', {
        replace: {
          labelPost
        }
      }) : applyFormat(value, formatInfo, withCurrency, withSi, isShort, labelPost) : (0, _util.isString)(labelPost) ? `-${labelPost}` : labelPost
    }), children]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(FormatBalance).withConfig({
  displayName: "FormatBalance",
  componentId: "sc-qfcrib-0"
})(["display:inline-block;vertical-align:baseline;white-space:nowrap;*{vertical-align:baseline !important;}> label,> .label{display:inline-block;margin-right:0.25rem;vertical-align:baseline;}.ui--FormatBalance-unit{font-size:0.825em;text-transform:uppercase;}.ui--FormatBalance-value{text-align:right;> .ui--FormatBalance-postfix{font-weight:var(--font-weight-light);opacity:0.7;vertical-align:baseline;}}> .ui--Button{margin-left:0.25rem;}.ui--Icon{margin-bottom:-0.25rem;margin-top:0.25rem;}.ui--Icon+.ui--FormatBalance-value{margin-left:0.375rem;}"]));

exports.default = _default;