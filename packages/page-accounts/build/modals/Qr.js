// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { AddressRow, Button, Input, InputAddress, MarkWarning, Modal, QrScanAddress } from '@axia-js/react-components';
import { useApi, useIpfs } from '@axia-js/react-hooks';
import { keyring } from '@axia-js/ui-keyring';
import { useTranslation } from "../translate.js";
import PasswordInput from "./PasswordInput.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function QrModal({
  className = '',
  onClose,
  onStatusChange
}) {
  const {
    t
  } = useTranslation();
  const {
    api,
    isEthereum
  } = useApi();
  const {
    isIpfs
  } = useIpfs();
  const [{
    isNameValid,
    name
  }, setName] = useState({
    isNameValid: false,
    name: ''
  });
  const [{
    address,
    isAddress,
    scanned,
    warning
  }, setAddress] = useState({
    address: '',
    isAddress: false,
    scanned: null
  });
  const [{
    isPasswordValid,
    password
  }, setPassword] = useState({
    isPasswordValid: false,
    password: ''
  });
  const isValid = !!address && isNameValid && (isAddress || isPasswordValid);

  const _onNameChange = useCallback(name => setName({
    isNameValid: !!name.trim(),
    name
  }), []);

  const _onPasswordChange = useCallback((password, isPasswordValid) => setPassword({
    isPasswordValid,
    password
  }), []);

  const _onScan = useCallback(scanned => {
    setAddress({
      address: scanned.isAddress ? scanned.content : keyring.createFromUri(scanned.content, {}, 'sr25519').address,
      isAddress: scanned.isAddress,
      scanned
    });

    if (scanned.name) {
      _onNameChange(scanned.name);
    }
  }, [_onNameChange]);

  const _onError = useCallback(err => {
    setAddress({
      address: '',
      isAddress: false,
      scanned: null,
      warning: err.message
    });
  }, []);

  const _onSave = useCallback(() => {
    if (!scanned || !isValid) {
      return;
    }

    const {
      content,
      isAddress
    } = scanned;
    const meta = {
      genesisHash: scanned.genesisHash || api.genesisHash.toHex(),
      name: name.trim()
    };
    const account = isAddress ? isEthereum ? keyring.addExternal(content).pair.address : keyring.addExternal(content, meta).pair.address : keyring.addUri(content, password, meta, 'sr25519').pair.address;
    InputAddress.setLastValue('account', account);
    onStatusChange({
      account,
      action: 'create',
      message: t('created account'),
      status: 'success'
    });
    onClose();
  }, [api, isValid, name, onClose, onStatusChange, password, scanned, isEthereum, t]);

  return /*#__PURE__*/_jsxs(Modal, {
    className: className,
    header: t('Add account via Qr'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/_jsx(Modal.Content, {
      children: scanned ? /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(Modal.Columns, {
          children: /*#__PURE__*/_jsx(AddressRow, {
            defaultName: name,
            noDefaultNameOpacity: true,
            value: scanned.content
          })
        }), /*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('The local name for this account. Changing this does not affect your on-line identity, so this is only used to indicate the name of the account locally.'),
          children: /*#__PURE__*/_jsx(Input, {
            autoFocus: true,
            className: "full",
            help: t('Name given to this account. You can change it at any point in the future.'),
            isError: !isNameValid,
            label: t('name'),
            onChange: _onNameChange,
            onEnter: _onSave,
            value: name
          })
        }), !isAddress && /*#__PURE__*/_jsx(PasswordInput, {
          onChange: _onPasswordChange,
          onEnter: _onSave
        })]
      }) : /*#__PURE__*/_jsxs(Modal.Columns, {
        hint: t('Provide the account QR from the module/external application for scanning. Once detected as valid, you will be taken to the next step to add the account to your list.'),
        children: [/*#__PURE__*/_jsx("div", {
          className: "qr-wrapper",
          children: /*#__PURE__*/_jsx(QrScanAddress, {
            isEthereum: isEthereum,
            onError: _onError,
            onScan: _onScan
          })
        }), warning && /*#__PURE__*/_jsx(MarkWarning, {
          content: warning
        })]
      })
    }), /*#__PURE__*/_jsx(Modal.Actions, {
      children: /*#__PURE__*/_jsx(Button, {
        icon: "plus",
        isDisabled: !scanned || !isValid || !isAddress && isIpfs,
        label: t('Save'),
        onClick: _onSave
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(QrModal).withConfig({
  displayName: "Qr",
  componentId: "sc-be1qc8-0"
})([".qr-wrapper{margin:0 auto;max-width:30rem;}"]));