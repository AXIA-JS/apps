"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _theme = require("@axia-js/react-components/styles/theme");

var _reactHooks = require("@axia-js/react-hooks");

var _Balances = _interopRequireDefault(require("./Balances.cjs"));

var _Identity = _interopRequireDefault(require("./Identity.cjs"));

var _Multisig = _interopRequireDefault(require("./Multisig.cjs"));

var _SidebarEditableSection = _interopRequireDefault(require("./SidebarEditableSection.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
function FullSidebar(_ref) {
  let {
    address,
    className = '',
    dataTestId,
    onClose,
    onUpdateName
  } = _ref;
  const [inEditMode, setInEditMode] = (0, _react.useState)(false);
  const {
    accountIndex,
    flags,
    identity,
    meta
  } = (0, _reactHooks.useAccountInfo)(address);
  const ref = (0, _react.useRef)(null);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Sidebar, {
    className: `${className}${inEditMode ? ' inEditMode' : ''}`,
    dataTestId: dataTestId,
    onClose: onClose,
    position: "right",
    sidebarRef: ref,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "ui--AddressMenu-header",
      "data-testid": "sidebar-address-menu",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SidebarEditableSection.default, {
        accountIndex: accountIndex,
        address: address,
        isBeingEdited: setInEditMode,
        onUpdateName: onUpdateName,
        sidebarRef: ref
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "ui--ScrollSection",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Balances.default, {
        address: address
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Identity.default, {
        address: address,
        identity: identity
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Multisig.default, {
        isMultisig: flags.isMultisig,
        meta: meta
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("section", {
      className: "ui--LinkSection",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.LinkExternal, {
        data: address,
        isLogo: true,
        isSidebar: true,
        type: "address"
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(FullSidebar).withConfig({
  displayName: "Sidebar",
  componentId: "sc-1uey8nx-0"
})(["display:flex;flex-direction:column;background-color:var(--bg-sidebar);max-width:30.42rem;min-width:30.42rem;overflow-y:hidden;padding:0 0 3.286rem;input{width:auto !important;}.ui--AddressMenu-header{align-items:center;background:var(--bg-tabs);border-bottom:1px solid var(--border-table);display:flex;flex-direction:column;justify-content:center;padding:1.35rem 1rem 1rem 1rem;}.ui--AddressSection{display:flex;flex-direction:row;flex-wrap:nowrap;align-items:center;width:100%;.ui--AddressSection__AddressColumn{margin-left:1rem;.ui--AccountName{max-width:21.5rem;overflow:hidden;}}}.ui--AddressMenu-addr,.ui--AddressMenu-index{font:var(--font-mono);text-align:left;font-size:0.857rem;}.ui--AddressMenu-addr{word-break:break-all;width:26ch;margin:0.571rem 0;color:var(--color-label);}.ui--AddressMenu-index{display:flex;flex-direction:row;label{font-size:0.857rem;margin-right:0.4rem;text-transform:capitalize;}}section{position:relative;&:not(:last-child){margin-bottom:1rem;}.ui--AddressMenu-sectionHeader{display:flex;justify-content:space-between;align-items:center;text-transform:capitalize;margin-bottom:0.57rem;width:100%;color:var(--color-text);font-size:1.143rem;}&.withDivider{padding-top:1rem;::before{position:absolute;top:0;left:0;content:'';width:100%;height:1px;background-color:var(--border-table);}}}.ui--AddressMenu-identity,.ui--AddressMenu-multisig{.ui--AddressMenu-identityTable,.ui--AddressMenu-multisigTable{font-size:0.93rem;margin-top:0.6rem;.tr{padding:0.25rem 0;display:inline-flex;align-items:center;width:100%;.th{text-transform:uppercase;color:var(--color-label);font-weight:var(--font-weight-normal);text-align:left;flex-basis:25%;font-size:0.714rem;&.top{align-self:flex-start;}}.td{flex:1;overflow:hidden;padding-left:0.6rem;text-overflow:ellipsis;}}.ui--AddressMini,.subs-number{margin-bottom:0.4rem;padding:0;}.subs-number{font-size:1rem;margin-bottom:0.714rem;}}.parent{padding:0 !important;}}&& .column{align-items:center;.ui--FormatBalance:first-of-type{margin-bottom:0.4rem;}label:first-of-type{margin-bottom:0.4rem;color:var(--color-text);}label{color:var(--color-label);text-transform:uppercase;font-size:0.714rem;}.ui--FormatBalance,label{line-height:1rem;}}.ui--AddressMenu-buttons{.ui--Button-Group{margin-bottom:0;}}.ui--AddressMenu-tags,.ui--AddressMenu-flags{margin:0.75rem 0 0;width:100%;}.ui--AddressMenu-identityIcon{background:", "66;}.ui--AddressMenu-actions{ul{list-style-type:none;margin-block-start:0;margin-block-end:0;padding-inline-start:1rem;li{margin:0.2rem 0;}}}.inline-icon{cursor:pointer;margin:0 0 0 0.5rem;color:", ";}.name--input{.ui.input{margin:0 !important;> input{}}}&.inEditMode{.ui--AddressMenu-flags{opacity:60%;}}.ui--AddressMenu-multisig .th.signatories{align-self:flex-start;}.ui--ScrollSection{padding:1rem;overflow:auto;}.ui--LinkSection{border-top:1px solid var(--border-table);padding:0.5rem 0 0.571rem;width:100%;position:absolute;bottom:0;span{margin:0 0.5rem;}}"], _theme.colorLink, _theme.colorLink));

exports.default = _default;