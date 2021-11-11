// Copyright 2017-2021 @axia-js/app-addresses authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useState } from 'react';
import { AddressRow, Button, Input, InputAddress, Modal } from '@axia-js/react-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import { keyring } from '@axia-js/ui-keyring';
import { hexToU8a } from '@axia-js/util';
import { ethereumEncode } from '@axia-js/util-crypto';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Create({
  onClose,
  onStatusChange
}) {
  var _info$accountId;

  const {
    t
  } = useTranslation();
  const {
    api,
    isEthereum
  } = useApi();
  const [{
    isNameValid,
    name
  }, setName] = useState({
    isNameValid: false,
    name: ''
  });
  const [{
    address,
    addressInput,
    isAddressExisting,
    isAddressValid
  }, setAddress] = useState({
    address: '',
    addressInput: '',
    isAddressExisting: false,
    isAddressValid: false,
    isPublicKey: false
  });
  const info = useCall(!!address && isAddressValid && api.derive.accounts.info, [address]);
  const isValid = isAddressValid && isNameValid && !!(info !== null && info !== void 0 && info.accountId);

  const _onChangeAddress = useCallback(addressInput => {
    let address = '';
    let isAddressValid = true;
    let isAddressExisting = false;
    let isPublicKey = false;

    try {
      if (isEthereum) {
        const rawAddress = hexToU8a(addressInput);
        address = ethereumEncode(rawAddress);
        isPublicKey = rawAddress.length === 20;
      } else {
        const publicKey = keyring.decodeAddress(addressInput);
        address = keyring.encodeAddress(publicKey);
        isPublicKey = publicKey.length === 32;
      }

      if (!isAddressValid) {
        const old = keyring.getAddress(address);

        if (old) {
          const newName = old.meta.name || name;
          isAddressExisting = true;
          isAddressValid = true;
          setName({
            isNameValid: !!(newName || '').trim(),
            name: newName
          });
        }
      }
    } catch (error) {
      isAddressValid = false;
    }

    setAddress({
      address: isAddressValid ? address : '',
      addressInput,
      isAddressExisting,
      isAddressValid,
      isPublicKey
    });
  }, [isEthereum, name]);

  const _onChangeName = useCallback(name => setName({
    isNameValid: !!name.trim(),
    name
  }), []);

  const _onCommit = useCallback(() => {
    const status = {
      action: 'create'
    };

    if (!isValid || !(info !== null && info !== void 0 && info.accountId)) {
      return;
    }

    try {
      const address = info.accountId.toString();
      keyring.saveAddress(address, {
        genesisHash: keyring.genesisHash,
        name: name.trim(),
        tags: []
      });
      status.account = address;
      status.status = address ? 'success' : 'error';
      status.message = isAddressExisting ? t('address edited') : t('address created');
      InputAddress.setLastValue('address', address);
    } catch (error) {
      status.status = 'error';
      status.message = error.message;
    }

    onStatusChange(status);
    onClose();
  }, [info, isAddressExisting, isValid, name, onClose, onStatusChange, t]);

  return /*#__PURE__*/_jsxs(Modal, {
    header: t('Add an address'),
    onClose: onClose,
    children: [/*#__PURE__*/_jsx(Modal.Content, {
      children: /*#__PURE__*/_jsxs(AddressRow, {
        defaultName: name,
        noDefaultNameOpacity: true,
        value: isAddressValid ? info === null || info === void 0 ? void 0 : (_info$accountId = info.accountId) === null || _info$accountId === void 0 ? void 0 : _info$accountId.toString() : undefined,
        children: [/*#__PURE__*/_jsx(Input, {
          autoFocus: true,
          className: "full",
          help: t('Paste here the address of the contact you want to add to your address book.'),
          isError: !isAddressValid,
          label: t('address'),
          onChange: _onChangeAddress,
          onEnter: _onCommit,
          placeholder: t('new address'),
          value: addressInput
        }), /*#__PURE__*/_jsx(Input, {
          className: "full",
          help: t('Type the name of your contact. This name will be used across all the apps. It can be edited later on.'),
          isError: !isNameValid,
          label: t('name'),
          onChange: _onChangeName,
          onEnter: _onCommit,
          value: name
        })]
      })
    }), /*#__PURE__*/_jsx(Modal.Actions, {
      children: /*#__PURE__*/_jsx(Button, {
        icon: "save",
        isDisabled: !isValid,
        label: t('Save'),
        onClick: _onCommit
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(Create);