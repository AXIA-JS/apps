// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useRef, useState } from 'react';
import { Button, Dropdown, Input, MarkError, Modal } from '@axia-js/react-components';
import { useApi, useLedger } from '@axia-js/react-hooks';
import { keyring } from '@axia-js/ui-keyring';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
// new Array(20).fill(0).map((_, index) => index)
export const AVAIL_INDEXES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]; // query the ledger for the address, adding it to the keyring

async function queryLedger(api, getLedger, name, accountOffset, addressOffset) {
  const {
    address
  } = await getLedger().getAddress(false, accountOffset, addressOffset);
  keyring.addHardware(address, 'ledger', {
    accountOffset,
    addressOffset,
    genesisHash: api.genesisHash.toHex(),
    name: name || `ledger ${accountOffset}/${addressOffset}`
  });
}

function LedgerModal({
  className,
  onClose
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const {
    getLedger
  } = useLedger();
  const [accIndex, setAccIndex] = useState(0);
  const [addIndex, setAddIndex] = useState(0);
  const [error, setError] = useState(null);
  const [{
    isNameValid,
    name
  }, setName] = useState({
    isNameValid: false,
    name: ''
  });
  const [isBusy, setIsBusy] = useState(false);
  const accOps = useRef(AVAIL_INDEXES.map(value => ({
    text: t('Account type {{index}}', {
      replace: {
        index: value
      }
    }),
    value
  })));
  const addOps = useRef(AVAIL_INDEXES.map(value => ({
    text: t('Address index {{index}}', {
      replace: {
        index: value
      }
    }),
    value
  })));

  const _onChangeName = useCallback(name => setName({
    isNameValid: !!name.trim(),
    name
  }), []);

  const _onSave = useCallback(() => {
    setError(null);
    setIsBusy(true);
    queryLedger(api, getLedger, name, accIndex, addIndex).then(() => onClose()).catch(error => {
      console.error(error);
      setIsBusy(false);
      setError(error);
    });
  }, [accIndex, addIndex, api, getLedger, name, onClose]);

  return /*#__PURE__*/_jsxs(Modal, {
    className: className,
    header: t('Add account via Ledger'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/_jsxs(Modal.Content, {
      children: [/*#__PURE__*/_jsx(Modal.Columns, {
        hint: t('The name for this account as it will appear under your accounts.'),
        children: /*#__PURE__*/_jsx(Input, {
          autoFocus: true,
          className: "full",
          help: t('Name given to this account to uniquely identity the account to yourself.'),
          isError: !isNameValid,
          label: t('name'),
          onChange: _onChangeName,
          placeholder: t('account name'),
          value: name
        })
      }), /*#__PURE__*/_jsx(Modal.Columns, {
        hint: t('The account type that you wish to create. This is the top-level derivation.'),
        children: /*#__PURE__*/_jsx(Dropdown, {
          help: t('The account type (derivation) to use'),
          label: t('account type'),
          onChange: setAccIndex,
          options: accOps.current,
          value: accIndex
        })
      }), /*#__PURE__*/_jsxs(Modal.Columns, {
        hint: t('The address index on the account that you wish to add. This is the second-level derivation.'),
        children: [/*#__PURE__*/_jsx(Dropdown, {
          help: t('The address index (derivation on account) to use'),
          label: t('address index'),
          onChange: setAddIndex,
          options: addOps.current,
          value: addIndex
        }), error && /*#__PURE__*/_jsx(MarkError, {
          content: error.message
        })]
      })]
    }), /*#__PURE__*/_jsx(Modal.Actions, {
      children: /*#__PURE__*/_jsx(Button, {
        icon: "plus",
        isBusy: isBusy,
        isDisabled: !isNameValid,
        label: t('Save'),
        onClick: _onSave
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(LedgerModal);