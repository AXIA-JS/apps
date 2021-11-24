"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Icon = _interopRequireDefault(require("../Icon.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Head(_ref) {
  let {
    className = '',
    filter,
    header,
    isEmpty
  } = _ref;

  if (!(header !== null && header !== void 0 && header.length)) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("thead", {
    className: className,
    children: [filter && /*#__PURE__*/(0, _jsxRuntime.jsx)("tr", {
      className: "filter",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("th", {
        colSpan: 100,
        children: filter
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("tr", {
      children: header.filter(h => !!h).map((_ref2, index) => {
        let [label, className = 'default', colSpan = 1, onClick] = _ref2;
        return /*#__PURE__*/(0, _jsxRuntime.jsx)("th", {
          className: className,
          colSpan: colSpan,
          onClick: onClick,
          children: index === 0 ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("h1", {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Icon.default, {
              className: "highlight--color",
              icon: "dot-circle"
            }), label]
          }) : isEmpty ? '' : label
        }, index);
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Head).withConfig({
  displayName: "Head",
  componentId: "sc-mp8hf4-0"
})(["position:relative;z-index:1;th{font:var(--font-sans);font-weight:var(--font-weight-normal);padding:0.375rem 1rem;text-align:right;vertical-align:middle;white-space:nowrap;h1,h2{font-size:1.75rem;}h1{display:table-cell;vertical-align:middle;.ui--Icon{font-size:1rem;margin-right:0.5rem;vertical-align:middle;}}&:first-child{border-left:1px solid var(--border-table);}&:last-child{border-right:1px solid var(--border-table);}&.address{padding-left:3rem;text-align:left;}&.badge{padding:0;}&.expand{text-align:right;}&.isClickable{border-bottom:2px solid transparent;cursor:pointer;}&.mini{padding:0 !important;}&.no-pad-left{padding-left:0.125rem;}&.no-pad-right{padding-right:0.125rem;}&.start{text-align:left;}&.balances{text-align:right;padding-right:2.25rem;}}tr{background:var(--bg-table);text-transform:lowercase;&:first-child{th{border-top:1px solid var(--border-table);}}&.filter{.ui.input,.ui.selection.dropdown{background:transparent;&:first-child{margin-top:-1px;}}th{padding:0;}}&:not(.filter){th{color:var(--color-table-head);}}}"]));

exports.default = _default;