// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect, useState } from 'react';
import { Modal, Password, PasswordStrength } from '@axia-js/react-components';
import { keyring } from '@axia-js/ui-keyring';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function PasswordInput({
  onChange,
  onEnter
}) {
  const {
    t
  } = useTranslation();
  const [{
    isPass1Valid,
    password1
  }, setPassword1] = useState({
    isPass1Valid: false,
    password1: ''
  });
  const [{
    isPass2Valid,
    password2
  }, setPassword2] = useState({
    isPass2Valid: false,
    password2: ''
  });
  useEffect(() => onChange(password1, isPass1Valid && isPass2Valid), [password1, onChange, isPass1Valid, isPass2Valid]);

  const _onPassword1Change = useCallback(password1 => {
    setPassword1({
      isPass1Valid: keyring.isPassValid(password1),
      password1
    });
    setPassword2({
      isPass2Valid: keyring.isPassValid(password2) && password2 === password1,
      password2
    });
  }, [password2]);

  const onPassword2Change = useCallback(password2 => setPassword2({
    isPass2Valid: keyring.isPassValid(password2) && password2 === password1,
    password2
  }), [password1]);
  return /*#__PURE__*/_jsxs(Modal.Columns, {
    hint: /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx("p", {
        children: t('The password and password confirmation for this account. This is required to authenticate any transactions made and to encrypt the keypair.')
      }), /*#__PURE__*/_jsx("p", {
        children: t('Ensure you are using a strong password for proper account protection.')
      })]
    }),
    children: [/*#__PURE__*/_jsx(Password, {
      className: "full",
      help: t('This password is used to encrypt your private key. It must be strong and unique! You will need it to sign transactions with this account. You can recover this account using this password together with the backup file (generated in the next step).'),
      isError: !isPass1Valid,
      label: t('password'),
      onChange: _onPassword1Change,
      onEnter: onEnter,
      value: password1
    }), /*#__PURE__*/_jsx(Password, {
      className: "full",
      help: t('Verify the password entered above.'),
      isError: !isPass2Valid,
      label: t('password (repeat)'),
      onChange: onPassword2Change,
      onEnter: onEnter,
      value: password2
    }), /*#__PURE__*/_jsx(PasswordStrength, {
      value: password1
    })]
  });
}