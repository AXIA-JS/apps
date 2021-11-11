"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _Description = _interopRequireDefault(require("./Description.cjs"));

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Curator({
  curator,
  isFromProposal
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressSmall, {
      value: curator.toString()
    }), isFromProposal && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Description.default, {
      description: t('Proposed Curator')
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Curator);

exports.default = _default;