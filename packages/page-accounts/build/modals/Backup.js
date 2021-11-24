// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import FileSaver from 'file-saver';
import React, { useCallback, useState } from 'react';
import { AddressRow, Button, Modal, Password } from '@axia-js/react-components';
import { keyring } from '@axia-js/ui-keyring';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Backup({
  address,
  onClose
}) {
  const {
    t
  } = useTranslation();
  const [isBusy, setIsBusy] = useState(false);
  const [{
    isPassTouched,
    password
  }, setPassword] = useState({
    isPassTouched: false,
    password: ''
  });
  const [backupFailed, setBackupFailed] = useState(false);
  const isPassValid = !backupFailed && keyring.isPassValid(password);

  const _onChangePass = useCallback(password => {
    setBackupFailed(false);
    setPassword({
      isPassTouched: true,
      password
    });
  }, []);

  const _doBackup = useCallback(() => {
    setIsBusy(true);
    setTimeout(() => {
      try {
        const addressKeyring = address && keyring.getPair(address);
        const json = addressKeyring && keyring.backupAccount(addressKeyring, password);
        const blob = new Blob([JSON.stringify(json)], {
          type: 'application/json; charset=utf-8'
        });
        FileSaver.saveAs(blob, `${address}.json`);
      } catch (error) {
        setBackupFailed(true);
        setIsBusy(false);
        console.error(error);
        return;
      }

      setIsBusy(false);
      onClose();
    }, 0);
  }, [address, onClose, password]);

  return /*#__PURE__*/_jsxs(Modal, {
    className: "app--accounts-Modal",
    header: t('Backup account'),
    onClose: onClose,
    children: [/*#__PURE__*/_jsx(Modal.Content, {
      children: /*#__PURE__*/_jsxs(AddressRow, {
        isInline: true,
        value: address,
        children: [/*#__PURE__*/_jsx("p", {
          children: t('An encrypted backup file will be created once you have pressed the "Download" button. This can be used to re-import your account on any other machine.')
        }), /*#__PURE__*/_jsx("p", {
          children: t('Save this backup file in a secure location. Additionally, the password associated with this account is needed together with this backup file in order to restore your account.')
        }), /*#__PURE__*/_jsx("div", {
          children: /*#__PURE__*/_jsx(Password, {
            autoFocus: true,
            help: t('The account password as specified when creating the account. This is used to encrypt the backup file and subsequently decrypt it when restoring the account.'),
            isError: isPassTouched && !isPassValid,
            label: t('password'),
            onChange: _onChangePass,
            onEnter: _doBackup,
            tabIndex: 0,
            value: password
          })
        })]
      })
    }), /*#__PURE__*/_jsx(Modal.Actions, {
      children: /*#__PURE__*/_jsx(Button, {
        icon: "download",
        isBusy: isBusy,
        isDisabled: !isPassValid,
        label: t('Download'),
        onClick: _doBackup
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(Backup);