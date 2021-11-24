"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _translate = require("../translate.cjs");

var _BidNew = _interopRequireDefault(require("./BidNew.cjs"));

var _Bids = _interopRequireDefault(require("./Bids.cjs"));

var _Candidates = _interopRequireDefault(require("./Candidates.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Candidates(_ref) {
  let {
    allMembers,
    candidates,
    className,
    isMember,
    ownMembers
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const [isBidOpen, toggleBidOpen] = (0, _reactHooks.useToggle)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Button.Group, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "plus",
        label: t('Submit bid'),
        onClick: toggleBidOpen
      }), isBidOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_BidNew.default, {
        onClose: toggleBidOpen
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Candidates.default, {
      allMembers: allMembers,
      candidates: candidates,
      isMember: isMember,
      ownMembers: ownMembers
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Bids.default, {})]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Candidates);

exports.default = _default;