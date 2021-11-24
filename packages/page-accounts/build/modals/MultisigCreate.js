// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import BN from 'bn.js';
import React, { useCallback, useState } from 'react';
import { Button, Input, InputAddressMulti, InputNumber, Modal } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import { keyring } from '@axia-js/ui-keyring';
import useKnownAddresses from "../Accounts/useKnownAddresses.js";
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const MAX_SIGNATORIES = 16;
const BN_TWO = new BN(2);

function createMultisig(signatories, threshold, {
  genesisHash,
  name,
  tags = []
}, success) {
  // we will fill in all the details below
  const status = {
    action: 'create'
  };

  try {
    const result = keyring.addMultisig(signatories, threshold, {
      genesisHash,
      name,
      tags
    });
    const {
      address
    } = result.pair;
    status.account = address;
    status.status = 'success';
    status.message = success;
  } catch (error) {
    status.status = 'error';
    status.message = error.message;
  }

  return status;
}

function Multisig({
  className = '',
  onClose,
  onStatusChange
}) {
  const {
    api,
    isDevelopment
  } = useApi();
  const {
    t
  } = useTranslation();
  const availableSignatories = useKnownAddresses();
  const [{
    isNameValid,
    name
  }, setName] = useState({
    isNameValid: false,
    name: ''
  });
  const [signatories, setSignatories] = useState(['']);
  const [{
    isThresholdValid,
    threshold
  }, setThreshold] = useState({
    isThresholdValid: true,
    threshold: BN_TWO
  });

  const _createMultisig = useCallback(() => {
    const options = {
      genesisHash: isDevelopment ? undefined : api.genesisHash.toString(),
      name: name.trim()
    };
    const status = createMultisig(signatories, threshold, options, t('created multisig'));
    onStatusChange(status);
    onClose();
  }, [api.genesisHash, isDevelopment, name, onClose, onStatusChange, signatories, t, threshold]);

  const _onChangeName = useCallback(name => setName({
    isNameValid: name.trim().length >= 3,
    name
  }), []);

  const _onChangeThreshold = useCallback(threshold => threshold && setThreshold({
    isThresholdValid: threshold.gte(BN_TWO) && threshold.lten(signatories.length),
    threshold
  }), [signatories]);

  const isValid = isNameValid && isThresholdValid;
  return /*#__PURE__*/_jsxs(Modal, {
    className: className,
    header: t('Add multisig'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/_jsxs(Modal.Content, {
      children: [/*#__PURE__*/_jsx(Modal.Columns, {
        hint: /*#__PURE__*/_jsxs(_Fragment, {
          children: [/*#__PURE__*/_jsx("p", {
            children: t('The signatories has the ability to create transactions using the multisig and approve transactions sent by others.Once the threshold is reached with approvals, the multisig transaction is enacted on-chain.')
          }), /*#__PURE__*/_jsx("p", {
            children: t('Since the multisig function like any other account, once created it is available for selection anywhere accounts are used and needs to be funded before use.')
          })]
        }),
        children: /*#__PURE__*/_jsx(InputAddressMulti, {
          available: availableSignatories,
          availableLabel: t('available signatories'),
          help: t('The addresses that are able to approve multisig transactions. You can select up to {{maxHelpers}} trusted addresses.', {
            replace: {
              maxHelpers: MAX_SIGNATORIES
            }
          }),
          maxCount: MAX_SIGNATORIES,
          onChange: setSignatories,
          value: signatories,
          valueLabel: t('selected signatories')
        })
      }), /*#__PURE__*/_jsx(Modal.Columns, {
        hint: t('The threshold for approval should be less or equal to the number of signatories for this multisig.'),
        children: /*#__PURE__*/_jsx(InputNumber, {
          help: t('The threshold for this multisig'),
          isError: !isThresholdValid,
          label: t('threshold'),
          onChange: _onChangeThreshold,
          value: threshold
        })
      }), /*#__PURE__*/_jsx(Modal.Columns, {
        hint: t('The name is for unique identification of the account in your owner lists.'),
        children: /*#__PURE__*/_jsx(Input, {
          autoFocus: true,
          className: "full",
          help: t('Name given to this multisig. You can edit it at any later point in time.'),
          isError: !isNameValid,
          label: t('name'),
          onChange: _onChangeName,
          placeholder: t('multisig name')
        })
      })]
    }), /*#__PURE__*/_jsx(Modal.Actions, {
      children: /*#__PURE__*/_jsx(Button, {
        icon: "plus",
        isDisabled: !isValid,
        label: t('Create'),
        onClick: _createMultisig
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(Multisig);