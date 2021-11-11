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

var _Externals = _interopRequireDefault(require("./Externals.cjs"));

var _PreImage = _interopRequireDefault(require("./PreImage.cjs"));

var _Proposals = _interopRequireDefault(require("./Proposals.cjs"));

var _Propose = _interopRequireDefault(require("./Propose.cjs"));

var _Referendums = _interopRequireDefault(require("./Referendums.cjs"));

var _Summary = _interopRequireDefault(require("./Summary.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Overview({
  className
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [isPreimageOpen, togglePreimage] = (0, _reactHooks.useToggle)();
  const [isProposeOpen, togglePropose] = (0, _reactHooks.useToggle)();
  const referendums = (0, _reactHooks.useCall)(api.derive.democracy.referendums);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Summary.default, {
      referendumCount: referendums === null || referendums === void 0 ? void 0 : referendums.length
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Button.Group, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "plus",
        label: t('Submit preimage'),
        onClick: togglePreimage
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "plus",
        label: t('Submit proposal'),
        onClick: togglePropose
      })]
    }), isPreimageOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_PreImage.default, {
      onClose: togglePreimage
    }), isProposeOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Propose.default, {
      onClose: togglePropose
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Referendums.default, {
      referendums: referendums
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Proposals.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Externals.default, {})]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Overview);

exports.default = _default;