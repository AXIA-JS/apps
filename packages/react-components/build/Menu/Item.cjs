"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Icon = _interopRequireDefault(require("../Icon.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Item({
  children,
  className = '',
  disabled,
  icon,
  onClick
}) {
  const _onClick = (0, _react.useCallback)(() => !disabled && onClick && onClick(), [disabled, onClick]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `ui--Menu__Item ${className}${icon ? ' hasIcon' : ''}`,
    onClick: _onClick,
    children: [icon && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Icon.default, {
      color: "darkGray",
      icon: icon
    }), children]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Item).withConfig({
  displayName: "Item",
  componentId: "sc-16csldw-0"
})(["display:flex;flex-direction:row;align-items:center;position:relative;font-size:0.93rem;line-height:0.93rem;cursor:pointer;padding:0.5rem 1rem;&:last-child{margin-bottom:0;}&.hasIcon{padding-left:2.6rem;}.ui--Icon{position:absolute;left:1rem;}"]));

exports.default = _default;