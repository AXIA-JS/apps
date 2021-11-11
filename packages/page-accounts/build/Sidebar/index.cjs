"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.AccountSidebarToggle = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Sidebar = _interopRequireDefault(require("./Sidebar.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
const AccountSidebarToggle = /*#__PURE__*/_react.default.createContext(undefined);

exports.AccountSidebarToggle = AccountSidebarToggle;

function AccountSidebar({
  children
}) {
  const [[address, onUpdateName], setAddress] = (0, _react.useState)([null, null]);
  const onClose = (0, _react.useCallback)(() => setAddress([null, null]), []);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(AccountSidebarToggle.Provider, {
    value: setAddress,
    children: [children, address && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Sidebar.default, {
      address: address,
      dataTestId: "account-sidebar",
      onClose: onClose,
      onUpdateName: onUpdateName
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(AccountSidebar);

exports.default = _default;