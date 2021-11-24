"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
function ElectionBanner(_ref) {
  let {
    isInElection
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();

  if (!isInElection) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkWarning, {
    className: "warning centered",
    content: t('There is currently an ongoing election for new validator candidates. As such staking operations are not permitted.')
  });
}

var _default = /*#__PURE__*/_react.default.memo(ElectionBanner);

exports.default = _default;