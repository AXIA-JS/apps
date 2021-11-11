"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactTooltip = _interopRequireDefault(require("react-tooltip"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function rootElement() {
  return typeof document === 'undefined' ? null // This hack is required for server side rendering
  : document.getElementById('tooltips');
}

function Tooltip({
  className = '',
  effect = 'solid',
  offset,
  place = 'top',
  text,
  trigger
}) {
  const [tooltipContainer] = (0, _react.useState)(typeof document === 'undefined' ? {} // This hack is required for server side rendering
  : document.createElement('div'));
  (0, _react.useEffect)(() => {
    const root = rootElement();
    root && root.appendChild(tooltipContainer);
    return () => {
      root && root.removeChild(tooltipContainer);
    };
  }, [tooltipContainer]);
  return /*#__PURE__*/_reactDom.default.createPortal( /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactTooltip.default, {
    className: `ui--Tooltip ${className}`,
    effect: effect,
    id: trigger,
    offset: offset,
    place: place,
    children: className !== null && className !== void 0 && className.includes('address') ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      children: text
    }) : text
  }), tooltipContainer);
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Tooltip).withConfig({
  displayName: "Tooltip",
  componentId: "sc-dqyx3h-0"
})(["> div{overflow:hidden;}&.ui--Tooltip{z-index:1002;}&.address div{overflow:hidden;text-overflow:ellipsis;}table{border:0;overflow:hidden;width:100%;td{text-align:left;}td:first-child{opacity:0.75;padding-right:0.25rem;text-align:right;white-space:nowrap;}}div+table,table+div{margin-top:0.75rem;}> div+div{margin-top:0.5rem;}.faded{margin-top:0;opacity:0.75 !important;font-size:0.85em !important;.faded{font-size:1em !important;}}.faded+.faded{margin-top:0;}.row+.row{margin-top:0.5rem;}"]));

exports.default = _default;