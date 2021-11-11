// Copyright 2017-2021 @axia-js/app-contracts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useState } from 'react';
import { Button, Input, Modal } from '@axia-js/react-components';
import { isNull } from '@axia-js/util';
import { ABI, InputName } from "../shared/index.js";
import store from "../store.js";
import { useTranslation } from "../translate.js";
import useAbi from "../useAbi.js";
import ValidateCode from "./ValidateCode.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Add({
  onClose
}) {
  const {
    t
  } = useTranslation();
  const [codeHash, setCodeHash] = useState('');
  const [isCodeHashValid, setIsCodeHashValid] = useState(false);
  const [name, setName] = useState(null);
  const {
    abi,
    contractAbi,
    errorText,
    isAbiError,
    isAbiSupplied,
    isAbiValid,
    onChangeAbi,
    onRemoveAbi
  } = useAbi();

  const _onSave = useCallback(() => {
    if (!codeHash || !name) {
      return;
    }

    store.saveCode(codeHash, {
      abi,
      name,
      tags: []
    });
    onClose();
  }, [abi, codeHash, name, onClose]);

  const isNameValid = !isNull(name) && name.length > 0;
  const isValid = isCodeHashValid && isNameValid && isAbiSupplied && isAbiValid;
  return /*#__PURE__*/_jsxs(Modal, {
    header: t('Add an existing code hash'),
    onClose: onClose,
    children: [/*#__PURE__*/_jsxs(Modal.Content, {
      children: [/*#__PURE__*/_jsx(Input, {
        autoFocus: true,
        help: t('The code hash for the on-chain deployed code.'),
        isError: codeHash.length > 0 && !isCodeHashValid,
        label: t('code hash'),
        onChange: setCodeHash,
        value: codeHash
      }), /*#__PURE__*/_jsx(ValidateCode, {
        codeHash: codeHash,
        onChange: setIsCodeHashValid
      }), /*#__PURE__*/_jsx(InputName, {
        isError: !isNameValid,
        onChange: setName,
        value: name || undefined
      }), /*#__PURE__*/_jsx(ABI, {
        contractAbi: contractAbi,
        errorText: errorText,
        isError: isAbiError || !isAbiError,
        isSupplied: isAbiSupplied,
        isValid: isAbiValid,
        onChange: onChangeAbi,
        onRemove: onRemoveAbi
      })]
    }), /*#__PURE__*/_jsx(Modal.Actions, {
      children: /*#__PURE__*/_jsx(Button, {
        icon: "save",
        isDisabled: !isValid,
        label: t('Save'),
        onClick: _onSave
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(Add);