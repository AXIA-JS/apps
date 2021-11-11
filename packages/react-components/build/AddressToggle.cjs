"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactHooks = require("@axia-js/react-hooks");

var _AddressMini = _interopRequireDefault(require("./AddressMini.cjs"));

var _Toggle = _interopRequireDefault(require("./Toggle.cjs"));

var _index = require("./util/index.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function AddressToggle({
  address,
  className = '',
  filter,
  isHidden,
  noToggle,
  onChange,
  value
}) {
  const {
    api
  } = (0, _reactHooks.useApi)();
  const info = (0, _reactHooks.useCall)(api.derive.accounts.info, [address]);
  const isVisible = (0, _react.useMemo)(() => info ? (0, _index.checkVisibility)(api, address, info, filter, false) : true, [api, address, filter, info]);

  const _onClick = (0, _react.useCallback)(() => onChange && onChange(!value), [onChange, value]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `ui--AddressToggle ${className}${value || noToggle ? ' isAye' : ' isNay'}${isHidden || !isVisible ? ' isHidden' : ''}`,
    onClick: _onClick,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_AddressMini.default, {
      className: "ui--AddressToggle-address",
      value: address,
      withSidebar: false
    }), !noToggle && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "ui--AddressToggle-toggle",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Toggle.default, {
        label: "",
        value: value
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(AddressToggle).withConfig({
  displayName: "AddressToggle",
  componentId: "sc-11zmdob-0"
})(["align-items:flex-start;border:1px solid transparent;border-radius:0.25rem;cursor:pointer;display:flex;justify-content:space-between;margin:0.125rem;padding:0.125rem 0.25rem;text-align:left;vertical-align:middle;white-space:nowrap;.ui--AddressToggle-address{filter:grayscale(100%);opacity:0.5;}&:hover{border-color:#ccc;}&.isHidden{display:none;}&.isDragging{background:white;box-shadow:0px 3px 5px 0px rgba(0,0,0,0.15);}.ui--AddressToggle-address,.ui--AddressToggle-toggle{flex:1;padding:0;}.ui--AddressToggle-toggle{margin-top:0.1rem;text-align:right;}&.isAye{.ui--AddressToggle-address{filter:none;opacity:1;}}"]));

exports.default = _default;