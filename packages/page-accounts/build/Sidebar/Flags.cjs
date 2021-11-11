"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Flags({
  className = '',
  flags: {
    isCouncil,
    isDevelopment,
    isExternal,
    isInjected,
    isMultisig,
    isNominator,
    isProxied,
    isSociety,
    isSudo,
    isTechCommittee,
    isValidator
  }
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const hasFlags = isCouncil || isDevelopment || isExternal || isInjected || isMultisig || isProxied || isSociety || isSudo || isTechCommittee || isValidator || isNominator;

  if (!hasFlags) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `${className} ui--AddressMenu-flags`,
    children: [hasFlags && /*#__PURE__*/(0, _jsxRuntime.jsx)("h5", {
      children: t('Flags')
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      children: [isValidator && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Flag, {
        color: "theme",
        label: t('Validator')
      }), isNominator && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Flag, {
        color: "theme",
        label: t('Nominator')
      }), isExternal && (isMultisig ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Flag, {
        color: "green",
        label: t('Multisig')
      }) : isProxied ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Flag, {
        color: "grey",
        label: t('Proxied')
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Flag, {
        color: "grey",
        label: t('External')
      })), isInjected && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Flag, {
        color: "grey",
        label: t('Injected')
      }), isDevelopment && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Flag, {
        color: "grey",
        label: t('Test account')
      }), isCouncil && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Flag, {
        color: "blue",
        label: t('Council')
      }), isSociety && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Flag, {
        color: "green",
        label: t('Society')
      }), isTechCommittee && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Flag, {
        color: "orange",
        label: t('Technical committee')
      }), isSudo && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Flag, {
        color: "pink",
        label: t('Sudo key')
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Flags).withConfig({
  displayName: "Flags",
  componentId: "sc-hxdu5s-0"
})(["h5{text-align:left;font-style:normal;font-weight:var(--font-weight-bold);font-size:0.714rem;line-height:1rem;text-transform:uppercase;margin-bottom:0.5rem;}.ui--Tag{margin:0.2rem 1rem 0.2rem 0.571rem;}"]));

exports.default = _default;