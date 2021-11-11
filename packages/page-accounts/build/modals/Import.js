import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useMemo, useState } from 'react';
import { AddressRow, Button, InputAddress, InputFile, MarkWarning, Modal, Password } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import { keyring } from '@axia-js/ui-keyring';
import { u8aToString } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import ExternalWarning from "./ExternalWarning.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const acceptedFormats = ['application/json', 'text/plain'].join(', ');

function parseFile(file, setWarning, isEthereum, genesisHash) {
  try {
    const pair = keyring.createFromJson(JSON.parse(u8aToString(file)), {
      genesisHash
    });

    if (isEthereum && pair.type !== 'ethereum') {
      throw new Error('JSON File does not contain an ethereum type key pair');
    }

    return pair;
  } catch (error) {
    console.error(error);
    setWarning(error.message ? error.message : error.toString());
  }

  return null;
}

function Import({
  className = '',
  onClose,
  onStatusChange
}) {
  const {
    t
  } = useTranslation();
  const {
    api,
    isDevelopment,
    isEthereum
  } = useApi();
  const [isBusy, setIsBusy] = useState(false);
  const [pair, setPair] = useState(null);
  const [warning, setWarning] = useState(null);
  const [{
    isPassValid,
    password
  }, setPass] = useState({
    isPassValid: false,
    password: ''
  });
  const apiGenesisHash = useMemo(() => isDevelopment ? null : api.genesisHash.toHex(), [api, isDevelopment]);
  const differentGenesis = useMemo(() => (pair === null || pair === void 0 ? void 0 : pair.meta.genesisHash) && pair.meta.genesisHash !== apiGenesisHash, [apiGenesisHash, pair]);

  const _onChangeFile = useCallback(file => setPair(parseFile(file, setWarning, isEthereum, apiGenesisHash)), [apiGenesisHash, isEthereum]);

  const _onChangePass = useCallback(password => setPass({
    isPassValid: keyring.isPassValid(password),
    password
  }), []);

  const _onSave = useCallback(() => {
    if (!pair) {
      return;
    }

    setIsBusy(true);
    setTimeout(() => {
      const status = {
        action: 'restore'
      };

      try {
        keyring.addPair(pair, password);
        status.status = 'success';
        status.account = pair.address;
        status.message = t('account restored');
        InputAddress.setLastValue('account', pair.address);
      } catch (error) {
        setPass(state => _objectSpread(_objectSpread({}, state), {}, {
          isPassValid: false
        }));
        status.status = 'error';
        status.message = error.message;
        console.error(error);
      }

      setIsBusy(false);
      onStatusChange(status);

      if (status.status !== 'error') {
        onClose();
      }
    }, 0);
  }, [onClose, onStatusChange, pair, password, t]);

  return /*#__PURE__*/_jsxs(Modal, {
    className: className,
    header: t('Add via backup file'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/_jsxs(Modal.Content, {
      children: [/*#__PURE__*/_jsx(Modal.Columns, {
        children: /*#__PURE__*/_jsx(AddressRow, {
          defaultName: (pair === null || pair === void 0 ? void 0 : pair.meta.name) || null,
          noDefaultNameOpacity: true,
          value: (pair === null || pair === void 0 ? void 0 : pair.address) || null
        })
      }), /*#__PURE__*/_jsxs(Modal.Columns, {
        hint: t('Supply a backed-up JSON file, encrypted with your account-specific password.'),
        children: [/*#__PURE__*/_jsx(InputFile, {
          accept: acceptedFormats,
          className: "full",
          help: t('Select the JSON key file that was downloaded when you created the account. This JSON file contains your private key encrypted with your password.'),
          isError: !pair,
          label: t('backup file'),
          onChange: _onChangeFile,
          withLabel: true
        }), differentGenesis && /*#__PURE__*/_jsx(MarkWarning, {
          content: t('The network from which this account was originally generated is different than the network you are currently connected to. Once imported ensure you toggle the "allow on any network" option for the account to keep it visible on the current network.')
        })]
      }), /*#__PURE__*/_jsx(Modal.Columns, {
        hint: t('The password previously used to encrypt this account.'),
        children: /*#__PURE__*/_jsx(Password, {
          autoFocus: true,
          className: "full",
          help: t('Type the password chosen at the account creation. It was used to encrypt your account\'s private key in the backup file.'),
          isError: !isPassValid,
          label: t('password'),
          onChange: _onChangePass,
          onEnter: _onSave,
          value: password
        })
      }), /*#__PURE__*/_jsxs(Modal.Columns, {
        children: [/*#__PURE__*/_jsx(ExternalWarning, {}), warning && /*#__PURE__*/_jsx(MarkWarning, {
          content: warning
        })]
      })]
    }), /*#__PURE__*/_jsx(Modal.Actions, {
      children: /*#__PURE__*/_jsx(Button, {
        icon: "sync",
        isBusy: isBusy,
        isDisabled: !pair || !isPassValid,
        label: t('Restore'),
        onClick: _onSave
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(Import);