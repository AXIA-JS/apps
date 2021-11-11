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

var _constants = require("./constants.cjs");

var _RegisterId = _interopRequireDefault(require("./RegisterId.cjs"));

var _RegisterThread = _interopRequireDefault(require("./RegisterThread.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0
const transformId = {
  transform: nextId => nextId.isZero() ? _constants.LOWEST_PUBLIC_ID : nextId
};

function Actions({
  className,
  ownedIds
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [isRegisterOpen, toggleRegisterOpen] = (0, _reactHooks.useToggle)();
  const [isReserveOpen, toggleReserveOpen] = (0, _reactHooks.useToggle)();
  const nextParaId = (0, _reactHooks.useCall)(api.query.registrar.nextFreeParaId, [], transformId);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Button.Group, {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
      icon: "plus",
      isDisabled: !api.tx.registrar.reserve,
      label: t('ParaId'),
      onClick: toggleReserveOpen
    }), isReserveOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_RegisterId.default, {
      nextParaId: nextParaId,
      onClose: toggleReserveOpen
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
      icon: "plus",
      isDisabled: api.tx.registrar.reserve ? !ownedIds.length : false,
      label: t('ParaThread'),
      onClick: toggleRegisterOpen
    }), isRegisterOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_RegisterThread.default, {
      nextParaId: nextParaId,
      onClose: toggleRegisterOpen,
      ownedIds: ownedIds
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Actions);

exports.default = _default;