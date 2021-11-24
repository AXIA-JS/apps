"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createIdenticon = createIdenticon;
exports.createOption = createOption;
exports.save = save;
exports.saveAndReload = saveAndReload;

var _react = _interopRequireDefault(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _uiSettings = require("@axia-js/ui-settings");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0
function createOption(_ref) {
  let {
    info,
    isHeader,
    text,
    value
  } = _ref;
  let overrides = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  let override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'empty';
  let extra = arguments.length > 3 ? arguments[3] : undefined;

  if (isHeader) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Dropdown.Header, {
      content: text
    }, text);
  }

  return {
    text: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "ui--Dropdown-item",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.ChainImg, {
        className: "ui--Dropdown-icon",
        logo: info && overrides.includes(info) ? override : info
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "ui--Dropdown-name",
        children: [text, extra]
      })]
    }, value),
    value
  };
}

function createIdenticon(_ref2) {
  let {
    info,
    text,
    value
  } = _ref2;
  let overrides = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  let override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'empty';
  const theme = info && overrides.includes(info) ? override : info;
  return {
    text: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "ui--Dropdown-item",
      children: [theme === 'empty' ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.ChainImg, {
        className: "ui--Dropdown-icon",
        logo: "empty"
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.IdentityIcon, {
        className: "ui--Dropdown-icon",
        size: 32,
        theme: theme,
        value: "5F9999K9UgTUgSsbXZQcEmRMvQqwJoBUHMv9e1k2MdgghuRA"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "ui--Dropdown-name",
        children: text
      })]
    }, value),
    value
  };
}

function save(state) {
  _uiSettings.settings.set(state);
}

function saveAndReload(state) {
  save(state); // HACK This is terrible, but since the API needs to re-connect and
  // the API does not yet handle re-connections properly, it is what it is

  window.location.reload();
}