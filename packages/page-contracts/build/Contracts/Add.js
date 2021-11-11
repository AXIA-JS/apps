// Copyright 2017-2021 @axia-js/app-contracts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useState } from 'react';
import { AddressRow, Button, Input, Modal } from '@axia-js/react-components';
import { useApi, useNonEmptyString } from '@axia-js/react-hooks';
import { keyring } from '@axia-js/ui-keyring';
import { ABI, InputName } from "../shared/index.js";
import { useTranslation } from "../translate.js";
import useAbi from "../useAbi.js";
import ValidateAddr from "./ValidateAddr.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Add({
  onClose
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [address, setAddress] = useState(null);
  const [isAddressValid, setIsAddressValid] = useState(false);
  const [name, isNameValid, setName] = useNonEmptyString('New Contract');
  const {
    abi,
    contractAbi,
    errorText,
    isAbiError,
    isAbiSupplied,
    isAbiValid,
    onChangeAbi,
    onRemoveAbi
  } = useAbi([null, null], null, true);

  const _onAdd = useCallback(() => {
    const status = {
      action: 'create'
    };

    if (!address || !abi || !name) {
      return;
    }

    try {
      const json = {
        contract: {
          abi,
          genesisHash: api.genesisHash.toHex()
        },
        name,
        tags: []
      };
      keyring.saveContract(address, json);
      status.account = address;
      status.status = address ? 'success' : 'error';
      status.message = 'contract added';
      onClose();
    } catch (error) {
      console.error(error);
      status.status = 'error';
      status.message = error.message;
    }
  }, [abi, address, api, name, onClose]);

  const isValid = isAddressValid && isNameValid && isAbiValid;
  return /*#__PURE__*/_jsxs(Modal, {
    header: t('Add an existing contract'),
    onClose: onClose,
    children: [/*#__PURE__*/_jsx(Modal.Content, {
      children: /*#__PURE__*/_jsxs(AddressRow, {
        defaultName: name,
        isValid: true,
        value: address || null,
        children: [/*#__PURE__*/_jsx(Input, {
          autoFocus: true,
          help: t('The address for the deployed contract instance.'),
          isError: !isAddressValid,
          label: t('contract address'),
          onChange: setAddress,
          value: address || ''
        }), /*#__PURE__*/_jsx(ValidateAddr, {
          address: address,
          onChange: setIsAddressValid
        }), /*#__PURE__*/_jsx(InputName, {
          isContract: true,
          isError: !isNameValid,
          onChange: setName,
          value: name || undefined
        }), /*#__PURE__*/_jsx(ABI, {
          contractAbi: contractAbi,
          errorText: errorText,
          isError: isAbiError || !isAbiValid,
          isSupplied: isAbiSupplied,
          isValid: isAbiValid,
          onChange: onChangeAbi,
          onRemove: onRemoveAbi
        })]
      })
    }), /*#__PURE__*/_jsx(Modal.Actions, {
      children: /*#__PURE__*/_jsx(Button, {
        icon: "save",
        isDisabled: !isValid,
        label: t('Save'),
        onClick: _onAdd
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(Add);