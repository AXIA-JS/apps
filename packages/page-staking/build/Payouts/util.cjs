"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createErasString = createErasString;

var _react = _interopRequireDefault(require("react"));

var _util = require("@axia-js/util");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
function isSingle(entry) {
  return !Array.isArray(entry);
}

function createErasString(eras) {
  if (!eras.length) {
    return '';
  }

  const parts = eras.sort((a, b) => a.cmp(b)).reduce((result, era) => {
    if (result.length === 0) {
      return [era];
    } else {
      const last = result[result.length - 1];

      if (isSingle(last)) {
        if (last.add(_util.BN_ONE).eq(era)) {
          result[result.length - 1] = [last, era];
        } else {
          result.push(era);
        }
      } else {
        if (last[1].add(_util.BN_ONE).eq(era)) {
          last[1] = era;
        } else {
          result.push(era);
        }
      }
    }

    return result;
  }, []).map(entry => isSingle(entry) ? (0, _util.formatNumber)(entry) : `${(0, _util.formatNumber)(entry[0])}-${(0, _util.formatNumber)(entry[1])}`);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: parts.map((section, index) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_react.default.Fragment, {
      children: [index !== 0 && ', ', /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        children: section
      })]
    }, section))
  });
}