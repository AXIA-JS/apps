import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useState } from 'react';
import { AddressRow, Button, Modal, Password, PasswordStrength } from '@axia-js/react-components';
import { keyring } from '@axia-js/ui-keyring';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function ChangePass({
  address,
  className = '',
  onClose
}) {
  const {
    t
  } = useTranslation();
  const [isBusy, setIsBusy] = useState(false);
  const [newPass1, setNewPass1] = useState({
    isValid: false,
    password: ''
  });
  const [newPass2, setNewPass2] = useState({
    isValid: false,
    password: ''
  });
  const [{
    isOldValid,
    oldPass
  }, setOldPass] = useState({
    isOldValid: false,
    oldPass: ''
  });

  const _onChangeNew1 = useCallback(password => setNewPass1({
    isValid: keyring.isPassValid(password),
    password
  }), []);

  const _onChangeNew2 = useCallback(password => setNewPass2({
    isValid: keyring.isPassValid(password) && newPass1.password === password,
    password
  }), [newPass1]);

  const _onChangeOld = useCallback(oldPass => setOldPass({
    isOldValid: keyring.isPassValid(oldPass),
    oldPass
  }), []);

  const _doChange = useCallback(() => {
    const account = address && keyring.getPair(address);

    if (!account) {
      return;
    }

    setIsBusy(true);
    setTimeout(() => {
      try {
        if (!account.isLocked) {
          account.lock();
        }

        account.decodePkcs8(oldPass);
      } catch (error) {
        setOldPass(state => _objectSpread(_objectSpread({}, state), {}, {
          isOldValid: false
        }));
        setIsBusy(false);
        return;
      }

      try {
        keyring.encryptAccount(account, newPass1.password);
      } catch (error) {
        setNewPass2(state => _objectSpread(_objectSpread({}, state), {}, {
          isValid: false
        }));
        setIsBusy(false);
        return;
      }

      setIsBusy(false);
      onClose();
    }, 0);
  }, [address, newPass1, oldPass, onClose]);

  return /*#__PURE__*/_jsxs(Modal, {
    className: `${className} app--accounts-Modal`,
    header: t('Change account password'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/_jsxs(Modal.Content, {
      children: [/*#__PURE__*/_jsx(AddressRow, {
        isInline: true,
        value: address
      }), /*#__PURE__*/_jsx(Modal.Columns, {
        hint: t('The existing account password as specified when this account was created or when it was last changed.'),
        children: /*#__PURE__*/_jsx(Password, {
          autoFocus: true,
          help: t('The existing account password as specified when this account was created or when it was last changed.'),
          isError: !isOldValid,
          label: t('your current password'),
          onChange: _onChangeOld,
          tabIndex: 1,
          value: oldPass
        })
      }), /*#__PURE__*/_jsxs(Modal.Columns, {
        hint: t('This will apply to any future use of this account as stored on this browser. Ensure that you securely store this new password and that it is strong and unique to the account.'),
        children: [/*#__PURE__*/_jsx(Password, {
          help: t('The new account password. Once set, all future account unlocks will be performed with this new password.'),
          isError: !newPass1.isValid,
          label: t('your new password'),
          onChange: _onChangeNew1,
          onEnter: _doChange,
          tabIndex: 2,
          value: newPass1.password
        }), /*#__PURE__*/_jsx(Password, {
          help: t('Verify the password entered above.'),
          isError: !newPass2.isValid,
          label: t('password (repeat)'),
          onChange: _onChangeNew2,
          onEnter: _doChange,
          tabIndex: 2,
          value: newPass2.password
        }), /*#__PURE__*/_jsx(PasswordStrength, {
          value: newPass1.password
        })]
      })]
    }), /*#__PURE__*/_jsx(Modal.Actions, {
      children: /*#__PURE__*/_jsx(Button, {
        icon: "sign-in-alt",
        isBusy: isBusy,
        isDisabled: !newPass1.isValid || !newPass2.isValid || !isOldValid,
        label: t('Change'),
        onClick: _doChange
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(ChangePass);