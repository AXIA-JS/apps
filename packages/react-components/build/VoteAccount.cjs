"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _index = _interopRequireDefault(require("./InputAddress/index.cjs"));

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function VoteAccount(_ref) {
  let {
    className = '',
    filter,
    onChange
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {
    className: className,
    filter: filter,
    help: t('Select the account you wish to vote with. You can approve "aye" or deny "nay" the proposal.'),
    label: t('vote with account'),
    onChange: onChange,
    type: "account",
    withLabel: true
  });
}

var _default = /*#__PURE__*/_react.default.memo(VoteAccount);

exports.default = _default;