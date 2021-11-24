"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PasswordInput;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _uiKeyring = require("@axia-js/ui-keyring");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
function PasswordInput(_ref) {
  let {
    onChange,
    onEnter
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const [{
    isPass1Valid,
    password1
  }, setPassword1] = (0, _react.useState)({
    isPass1Valid: false,
    password1: ''
  });
  const [{
    isPass2Valid,
    password2
  }, setPassword2] = (0, _react.useState)({
    isPass2Valid: false,
    password2: ''
  });
  (0, _react.useEffect)(() => onChange(password1, isPass1Valid && isPass2Valid), [password1, onChange, isPass1Valid, isPass2Valid]);

  const _onPassword1Change = (0, _react.useCallback)(password1 => {
    setPassword1({
      isPass1Valid: _uiKeyring.keyring.isPassValid(password1),
      password1
    });
    setPassword2({
      isPass2Valid: _uiKeyring.keyring.isPassValid(password2) && password2 === password1,
      password2
    });
  }, [password2]);

  const onPassword2Change = (0, _react.useCallback)(password2 => setPassword2({
    isPass2Valid: _uiKeyring.keyring.isPassValid(password2) && password2 === password1,
    password2
  }), [password1]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
    hint: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        children: t('The password and password confirmation for this account. This is required to authenticate any transactions made and to encrypt the keypair.')
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        children: t('Ensure you are using a strong password for proper account protection.')
      })]
    }),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Password, {
      className: "full",
      help: t('This password is used to encrypt your private key. It must be strong and unique! You will need it to sign transactions with this account. You can recover this account using this password together with the backup file (generated in the next step).'),
      isError: !isPass1Valid,
      label: t('password'),
      onChange: _onPassword1Change,
      onEnter: onEnter,
      value: password1
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Password, {
      className: "full",
      help: t('Verify the password entered above.'),
      isError: !isPass2Valid,
      label: t('password (repeat)'),
      onChange: onPassword2Change,
      onEnter: onEnter,
      value: password2
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.PasswordStrength, {
      value: password1
    })]
  });
}