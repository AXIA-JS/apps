// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback } from 'react';
import { Input, Modal } from '@axia-js/react-components';
import { useTranslation } from '@axia-js/react-components/translate';
import PasswordInput from "./PasswordInput.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

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
  } = useTranslation();

  const _onChangeName = useCallback(name => setName({
    isNameValid: !!name.trim(),
    name
  }), [setName]);

  const _onChangePass = useCallback((password, isValid) => setPassword({
    isPasswordValid: isValid,
    password
  }), [setPassword]);

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Modal.Columns, {
      hint: t('The name for this account and how it will appear under your addresses. With an on-chain identity, it can be made available to others.'),
      children: /*#__PURE__*/_jsx(Input, {
        className: "full",
        help: t('Name given to this account. You can edit it. To use the account to validate or nominate, it is a good practice to append the function of the account in the name, e.g "name_you_want - stash".'),
        isError: !isNameValid,
        label: t('name'),
        onChange: _onChangeName,
        onEnter: onCommit,
        placeholder: t('new account'),
        value: name
      })
    }), /*#__PURE__*/_jsx(PasswordInput, {
      onChange: _onChangePass,
      onEnter: onCommit
    })]
  });
};

export default /*#__PURE__*/React.memo(CreateAccountInputs);