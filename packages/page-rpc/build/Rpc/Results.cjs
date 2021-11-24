"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _valueToText = _interopRequireDefault(require("@axia-js/react-params/valueToText"));

var _util = require("@axia-js/util");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-rpc authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Results(_ref) {
  let {
    queue = []
  } = _ref;
  const filtered = queue.filter(_ref2 => {
    let {
      error,
      result
    } = _ref2;
    return !(0, _util.isUndefined)(error) || !(0, _util.isUndefined)(result);
  }).reverse();

  if (!filtered.length) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("section", {
    className: "rpc--Results",
    children: filtered.map(_ref3 => {
      let {
        error,
        id,
        result,
        rpc: {
          method,
          section
        }
      } = _ref3;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Output, {
        isError: !!error,
        label: `${id}: ${section}.${method}`,
        value: error ? error.message : /*#__PURE__*/(0, _jsxRuntime.jsx)("pre", {
          children: (0, _valueToText.default)('', result, false)
        })
      }, id);
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo(Results);

exports.default = _default;