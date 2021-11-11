"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _translate = require("@axia-js/react-components/translate");

var _PasswordInput = _interopRequireDefault(require("./PasswordInput.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
const CreateAccountInputs = ({
  name: {
    isNameValid,
    name
  },
  onCommit,
  setName,
  setPassword
}) => {
  const {
    t
  } = (0, _translate.useTranslation)();

  const _onChangeName = (0, _react.useCallback)(name => setName({
    isNameValid: !!name.trim(),
    name
  }), [setName]);

  const _onChangePass = (0, _react.useCallback)((password, isValid) => setPassword({
    isPasswordValid: isValid,
    password
  }), [setPassword]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
      hint: t('The name for this account and how it will appear under your addresses. With an on-chain identity, it can be made available to others.'),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
        className: "full",
        help: t('Name given to this account. You can edit it. To use the account to validate or nominate, it is a good practice to append the function of the account in the name, e.g "name_you_want - stash".'),
        isError: !isNameValid,
        label: t('name'),
        onChange: _onChangeName,
        onEnter: onCommit,
        placeholder: t('new account'),
        value: name
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_PasswordInput.default, {
      onChange: _onChangePass,
      onEnter: onCommit
    })]
  });
};

var _default = /*#__PURE__*/_react.default.memo(CreateAccountInputs);

exports.default = _default;