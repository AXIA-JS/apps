// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useState } from 'react';
import { Button, Input, InputAddressSimple, Modal } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import { keyring } from '@axia-js/ui-keyring';
import useProxies from "../Accounts/useProxies.js";
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function createProxy(address, {
  genesisHash,
  name,
  tags = []
}, success) {
  // we will fill in all the details below
  const status = {
    action: 'create'
  };

  try {
    keyring.addExternal(address, {
      genesisHash,
      isProxied: true,
      name,
      tags
    });
    status.account = address;
    status.status = 'success';
    status.message = success;
  } catch (error) {
    status.status = 'error';
    status.message = error.message;
  }

  return status;
}

function ProxyAdd({
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
  const [{
    isNameValid,
    name
  }, setName] = useState({
    isNameValid: false,
    name: ''
  });
  const [stashAddress, setStashAddress] = useState(null);
  const {
    hasOwned
  } = useProxies(stashAddress);

  const _createProxied = useCallback(() => {
    if (stashAddress) {
      const options = {
        genesisHash: isDevelopment ? undefined : api.genesisHash.toString(),
        name: name.trim()
      };
      const status = createProxy(stashAddress, options, t('added proxy'));
      onStatusChange(status);
      onClose();
    }
  }, [api.genesisHash, isDevelopment, name, onClose, onStatusChange, stashAddress, t]);

  const _onChangeName = useCallback(name => setName({
    isNameValid: name.trim().length >= 3,
    name
  }), []);

  const isValid = isNameValid && !!stashAddress && hasOwned;
  return /*#__PURE__*/_jsxs(Modal, {
    className: className,
    header: t('Add proxied account'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/_jsxs(Modal.Content, {
      children: [/*#__PURE__*/_jsx(Modal.Columns, {
        hint: t('The address that has previously setup a proxy to one of the accounts that you control.'),
        children: /*#__PURE__*/_jsx(InputAddressSimple, {
          autoFocus: true,
          help: t('The address that you have a valid proxy setup for.'),
          isError: !hasOwned,
          label: t('proxied account'),
          onChange: setStashAddress,
          placeholder: t('stash address')
        })
      }), /*#__PURE__*/_jsx(Modal.Columns, {
        hint: t('The name is for unique identification of the account in your owner lists.'),
        children: /*#__PURE__*/_jsx(Input, {
          className: "full",
          help: t('Name given to this proxied account. You can edit it at any later point in time.'),
          isError: !isNameValid,
          label: t('name'),
          onChange: _onChangeName,
          placeholder: t('proxied name')
        })
      })]
    }), /*#__PURE__*/_jsx(Modal.Actions, {
      children: /*#__PURE__*/_jsx(Button, {
        icon: "plus",
        isDisabled: !isValid,
        label: t('Add'),
        onClick: _createProxied
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(ProxyAdd);