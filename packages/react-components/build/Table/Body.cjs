"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _util = require("@axia-js/util");

var _Spinner = _interopRequireDefault(require("../Spinner.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Body({
  children,
  className = '',
  empty,
  emptySpinner,
  noBodyTag
}) {
  return children ? noBodyTag ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: children
  }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("tbody", {
    className: className,
    children: children
  }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("tbody", {
    className: className,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("tr", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        colSpan: 100,
        children: (0, _util.isString)(empty) ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "empty",
          children: empty
        }) : empty || /*#__PURE__*/(0, _jsxRuntime.jsx)(_Spinner.default, {
          label: emptySpinner
        })
      })
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo(Body);

exports.default = _default;