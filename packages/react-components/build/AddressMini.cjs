"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _AccountName = _interopRequireDefault(require("./AccountName.cjs"));

var _Balance = _interopRequireDefault(require("./Balance.cjs"));

var _Bonded = _interopRequireDefault(require("./Bonded.cjs"));

var _index = _interopRequireDefault(require("./IdentityIcon/index.cjs"));

var _LockedVote = _interopRequireDefault(require("./LockedVote.cjs"));

var _index2 = require("./util/index.cjs");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
function AddressMini({
  balance,
  bonded,
  children,
  className = '',
  iconInfo,
  isHighlight,
  isPadded = true,
  label,
  labelBalance,
  nameExtra,
  onNameClick,
  summary,
  value,
  withAddress = true,
  withBalance = false,
  withBonded = false,
  withLockedVote = false,
  withName = true,
  withShrink = false,
  withSidebar = true
}) {
  if (!value) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `ui--AddressMini${isHighlight ? ' isHighlight' : ''}${isPadded ? ' padded' : ''}${withShrink ? ' withShrink' : ''} ${className}`,
    children: [label && /*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
      className: "ui--AddressMini-label",
      children: label
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "ui--AddressMini-icon",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {
        value: value
      }), iconInfo && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "ui--AddressMini-icon-info",
        children: iconInfo
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "ui--AddressMini-info",
      children: [withAddress && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "ui--AddressMini-address",
        onClick: onNameClick,
        children: withName ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_AccountName.default, {
          value: value,
          withSidebar: withSidebar,
          children: nameExtra
        }) : (0, _index2.toShortAddress)(value)
      }), children]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "ui--AddressMini-balances",
      children: [withBalance && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Balance.default, {
        balance: balance,
        label: labelBalance,
        params: value
      }), withBonded && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Bonded.default, {
        bonded: bonded,
        label: "",
        params: value
      }), withLockedVote && /*#__PURE__*/(0, _jsxRuntime.jsx)(_LockedVote.default, {
        params: value
      }), summary && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "ui--AddressMini-summary",
        children: summary
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(AddressMini).withConfig({
  displayName: "AddressMini",
  componentId: "sc-j3uw3g-0"
})(["display:inline-block;padding:0 0.25rem 0 1rem;text-align:left;white-space:nowrap;&.padded{display:inline-block;padding:0 1rem 0 0;}&.summary{position:relative;top:-0.2rem;}.ui--AddressMini-info{max-width:12rem;min-width:12rem;@media only screen and (max-width:1800px){max-width:11.5rem;min-width:11.5rem;}@media only screen and (max-width:1700px){max-width:11rem;min-width:11rem;}@media only screen and (max-width:1600px){max-width:10.5rem;min-width:10.5rem;}@media only screen and (max-width:1500px){max-width:10rem;min-width:10rem;}@media only screen and (max-width:1400px){max-width:9.5rem;min-width:9.5rem;}@media only screen and (max-width:1300px){max-width:9rem;min-width:9rem;}}.ui--AddressMini-address{overflow:hidden;text-align:left;text-overflow:ellipsis;width:fit-content;max-width:inherit;> div{overflow:hidden;text-overflow:ellipsis;}}&.withShrink{.ui--AddressMini-address{min-width:3rem;}}.ui--AddressMini-label{margin:0 0 -0.5rem 2.25rem;}.ui--AddressMini-balances{display:grid;.ui--Balance,.ui--Bonded,.ui--LockedVote{font-size:0.75rem;margin-left:2.25rem;margin-top:-0.5rem;text-align:left;}}.ui--AddressMini-icon{margin:0 0.5rem 0 0;.ui--AddressMini-icon-info{position:absolute;right:-0.5rem;top:-0.5rem;z-index:1;}.ui--IdentityIcon{margin:0;vertical-align:middle;}}.ui--AddressMini-icon,.ui--AddressMini-info{display:inline-block;position:relative;vertical-align:middle;}.ui--AddressMini-summary{font-size:0.75rem;line-height:1.2;margin-left:2.25rem;margin-top:-0.2rem;text-align:left;}"]));

exports.default = _default;