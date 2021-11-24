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

var _PreImage = _interopRequireDefault(require("./PreImage.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
function PreImageButton(_ref) {
  let {
    imageHash,
    isImminent
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const [isPreimageOpen, togglePreimage] = (0, _reactHooks.useToggle)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
      icon: "plus",
      label: t('Image'),
      onClick: togglePreimage
    }), isPreimageOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_PreImage.default, {
      imageHash: imageHash,
      isImminent: isImminent,
      onClose: togglePreimage
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(PreImageButton);

exports.default = _default;