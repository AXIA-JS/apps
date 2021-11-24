"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _index = _interopRequireDefault(require("./IdentityIcon/index.cjs"));

var _Input = _interopRequireDefault(require("./Input.cjs"));

var _index2 = require("./util/index.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function InputAddressSimple(_ref) {
  let {
    autoFocus,
    children,
    className = '',
    defaultValue,
    help,
    isError,
    isFull,
    label,
    onChange,
    onEnter,
    onEscape
  } = _ref;
  const [address, setAddress] = (0, _react.useState)(defaultValue || null);

  const _onChange = (0, _react.useCallback)(_address => {
    const address = (0, _index2.toAddress)(_address) || null;
    setAddress(address);
    onChange && onChange(address);
  }, [onChange]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Input.default, {
      autoFocus: autoFocus,
      defaultValue: defaultValue,
      help: help,
      isError: isError || !address,
      isFull: isFull,
      label: label,
      onChange: _onChange,
      onEnter: onEnter,
      onEscape: onEscape,
      children: children
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {
      className: "ui--InputAddressSimpleIcon",
      size: 32,
      value: address
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(InputAddressSimple).withConfig({
  displayName: "InputAddressSimple",
  componentId: "sc-y87j31-0"
})(["position:relative;.ui--InputAddressSimpleIcon{background:#eee;border:1px solid #888;border-radius:50%;left:0.75rem;position:absolute;top:1rem;}"]));

exports.default = _default;