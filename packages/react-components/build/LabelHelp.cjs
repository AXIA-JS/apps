"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Icon = _interopRequireDefault(require("./Icon.cjs"));

var _Tooltip = _interopRequireDefault(require("./Tooltip.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
let id = 0;

function LabelHelp({
  className = '',
  help,
  icon = 'question-circle'
}) {
  const [trigger] = (0, _react.useState)(() => `label-help-${++id}`);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `ui--LabelHelp ${className}`,
    tabIndex: -1,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Icon.default, {
      icon: icon,
      tooltip: trigger
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tooltip.default, {
      text: help,
      trigger: trigger
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(LabelHelp).withConfig({
  displayName: "LabelHelp",
  componentId: "sc-tdvzde-0"
})(["cursor:help;display:inline-block;line-height:1rem;margin:0 0 0 0.25rem;"]));

exports.default = _default;