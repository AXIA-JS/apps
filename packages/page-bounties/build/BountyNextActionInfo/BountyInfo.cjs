"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _theme = require("../theme.cjs");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
function BountyInfo(_ref) {
  let {
    className = '',
    description,
    type = 'info'
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [type === 'warning' && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "info-icon",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Icon, {
        icon: 'exclamation-triangle'
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "description",
      children: description
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(BountyInfo).withConfig({
  displayName: "BountyInfo",
  componentId: "sc-4zue1j-0"
})(_ref2 => {
  let {
    theme
  } = _ref2;
  return `
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 0.857rem;
  line-height: 1.5rem;

  .info-icon{
    margin-right: 0.2rem;
    svg {
      color: ${_theme.bountySvgColor[theme.theme]};
    }
  }

  .description {
    font-weight: 400;
    font-size: 0.714rem;
    line-height: 0.864rem;
    color: var(--color-label);
    word-wrap: break-word;
  }
`;
}));

exports.default = _default;