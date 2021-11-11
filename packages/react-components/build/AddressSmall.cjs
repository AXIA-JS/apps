"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _AccountName = _interopRequireDefault(require("./AccountName.cjs"));

var _index = _interopRequireDefault(require("./IdentityIcon/index.cjs"));

var _ParentAccount = _interopRequireDefault(require("./ParentAccount.cjs"));

var _index2 = require("./util/index.cjs");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function AddressSmall({
  children,
  className = '',
  defaultName,
  onClickName,
  overrideName,
  parentAddress,
  toggle,
  value,
  withShortAddress = false,
  withSidebar = true
}) {
  const displayAsGrid = parentAddress || withShortAddress;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `ui--AddressSmall ${className}`,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {
        value: value
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: displayAsGrid ? 'addressGrid' : '',
      children: [parentAddress && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "parentAccountName",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ParentAccount.default, {
          address: parentAddress
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_AccountName.default, {
        className: `accountName ${withSidebar ? 'withSidebar' : ''}`,
        defaultName: defaultName,
        onClick: onClickName,
        override: overrideName,
        toggle: toggle,
        value: value,
        withSidebar: withSidebar,
        children: children
      }), withShortAddress && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "shortAddress",
        "data-testid": "short-address",
        children: (0, _index2.toShortAddress)(value)
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(AddressSmall).withConfig({
  displayName: "AddressSmall",
  componentId: "sc-q7tpnt-0"
})(["white-space:nowrap;display:flex;align-items:center;.ui--IdentityIcon{margin-right:0.75rem;vertical-align:middle;}.parentAccountName,.shortAddress{display:flex;flex-direction:column;align-self:center;}.parentAccountName{grid-area:parentAccountName;}.accountName{grid-area:accountName;}.shortAddress{grid-area:shortAddress;color:#8B8B8B;font-size:0.75rem;}.addressGrid{border:0.031rem;height:3.438rem;display:grid;grid-template-columns:max-content;grid-template-rows:30% 40% 30%;grid-template-areas:\"parentAccountName\" \"accountName\" \"shortAddress\";}.ui--AccountName{max-width:26rem;overflow:hidden;&.withSidebar{cursor:help;}@media only screen and (max-width:1700px){max-width:24rem;}@media only screen and (max-width:1600px){max-width:22rem;}@media only screen and (max-width:1500px){max-width:20rem;}@media only screen and (max-width:1400px){max-width:18rem;}@media only screen and (max-width:1300px){max-width:16rem;}@media only screen and (max-width:1200px){max-width:14rem;}@media only screen and (max-width:1200px){max-width:12rem;}}"]));

exports.default = _default;