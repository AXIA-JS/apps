"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _LabelHelp = _interopRequireDefault(require("./LabelHelp.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
const defaultLabel = /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
  children: "\xA0"
});

function Labelled(_ref) {
  let {
    className = '',
    children,
    help,
    isFull,
    isHidden,
    isOuter,
    isSmall,
    label = defaultLabel,
    labelExtra,
    withEllipsis,
    withLabel = true
  } = _ref;

  if (isHidden) {
    return null;
  } else if (!withLabel) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: className,
      children: children
    });
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `ui--Labelled${isSmall ? ' isSmall' : ''}${isFull ? ' isFull' : ''}${isOuter ? ' isOuter' : ''} ${className}`,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("label", {
      children: [withEllipsis ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "withEllipsis",
        children: label
      }) : label, help && /*#__PURE__*/(0, _jsxRuntime.jsx)(_LabelHelp.default, {
        help: help
      })]
    }), labelExtra && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "labelExtra",
      children: labelExtra
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "ui--Labelled-content",
      children: children
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Labelled).withConfig({
  displayName: "Labelled",
  componentId: "sc-9pkr0b-0"
})(["&.ui--Labelled{display:block;position:relative;.ui--CopyButton{position:absolute;top:0.9rem;right:0.5rem;}.withEllipsis{display:inline;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}&.isSmall{display:block;> label{margin:0;min-width:0;padding-right:0;}}&:not(.isSmall){padding-left:2rem;&:not(.isOuter){> label,.labelExtra{position:absolute;text-align:left;top:0.5rem;z-index:1;}> label{left:3.55rem;text-align:left;}}&.isFull{padding-left:0;> label{left:1.55rem;}}.labelExtra{color:rgba(78,78,78,.85);font-weight:var(--font-weight-normal);right:1.75rem;text-align:right;}> .ui--Labelled-content{box-sizing:border-box;flex:1 1;min-width:0;.ui.selection.dropdown{&:not(.floating){padding-left:1.45rem;padding-top:1.75rem;}&.floating{> .dropdown.icon{top:1.25rem;}.text{line-height:1;padding:0.47rem 0}}&.search:not(.multiple) > input.search{padding-left:1.45rem;padding-top:1.75rem;}> .delete.icon,> .dropdown.icon,> .search.icon{top:1.75rem;}}.ui--InputFile,.ui.input > input,.ui--output{padding-left:1.45rem;padding-top:1.75rem;}.ui--Messages{padding-bottom:2rem;padding-left:1.45rem;padding-top:2rem;}}}}"]));

exports.default = _default;