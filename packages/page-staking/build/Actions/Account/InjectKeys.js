// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Button, Dropdown, Input, MarkWarning, Modal, StatusContext } from '@axia-js/react-components';
import { keyring } from '@axia-js/ui-keyring';
import { assert, u8aToHex } from '@axia-js/util';
import { keyExtractSuri, mnemonicValidate } from '@axia-js/util-crypto';
import { useTranslation } from "../../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const CRYPTO_MAP = {
  aura: ['ed25519', 'sr25519'],
  babe: ['sr25519'],
  gran: ['ed25519'],
  imon: ['ed25519', 'sr25519'],
  para: ['sr25519']
};
const EMPTY_KEY = '0x';

function InjectKeys({
  onClose
}) {
  const {
    t
  } = useTranslation();
  const {
    queueRpc
  } = useContext(StatusContext); // this needs to align with what is set as the first value in `type`

  const [crypto, setCrypto] = useState('sr25519');
  const [publicKey, setPublicKey] = useState(EMPTY_KEY);
  const [suri, setSuri] = useState('');
  const [keyType, setKeyType] = useState('babe');
  const keyTypeOptRef = useRef([{
    text: t('Aura'),
    value: 'aura'
  }, {
    text: t('Babe'),
    value: 'babe'
  }, {
    text: t('Grandpa'),
    value: 'gran'
  }, {
    text: t('I\'m Online'),
    value: 'imon'
  }, {
    text: t('Parachains'),
    value: 'para'
  }]);
  useEffect(() => {
    setCrypto(CRYPTO_MAP[keyType][0]);
  }, [keyType]);
  useEffect(() => {
    try {
      const {
        phrase
      } = keyExtractSuri(suri);
      assert(mnemonicValidate(phrase), 'Invalid mnemonic phrase');
      setPublicKey(u8aToHex(keyring.createFromUri(suri, {}, crypto).publicKey));
    } catch (error) {
      setPublicKey(EMPTY_KEY);
    }
  }, [crypto, suri]);

  const _onSubmit = useCallback(() => queueRpc({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    rpc: {
      method: 'insertKey',
      section: 'author'
    },
    values: [keyType, suri, publicKey]
  }), [keyType, publicKey, queueRpc, suri]);

  const _cryptoOptions = useMemo(() => CRYPTO_MAP[keyType].map(value => ({
    text: value === 'ed25519' ? t('ed25519, Edwards') : t('sr15519, Schnorrkel'),
    value
  })), [keyType, t]);

  return /*#__PURE__*/_jsxs(Modal, {
    header: t('Inject Keys'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/_jsxs(Modal.Content, {
      children: [/*#__PURE__*/_jsxs(Modal.Columns, {
        hint: t('The seed and derivation path will be submitted to the validator node. this is an advanced operation, only to be performed when you are sure of the security and connection risks.'),
        children: [/*#__PURE__*/_jsx(Input, {
          autoFocus: true,
          isError: publicKey.length !== 66,
          label: t('suri (seed & derivation)'),
          onChange: setSuri,
          value: suri
        }), /*#__PURE__*/_jsx(MarkWarning, {
          content: t('This operation will submit the seed via an RPC call. Do not perform this operation on a public RPC node, but ensure that the node is local, connected to your validator and secure.')
        })]
      }), /*#__PURE__*/_jsxs(Modal.Columns, {
        hint: t('The key type and crypto type to use for this key. Be aware that different keys have different crypto requirements. You should be familiar with the type requirements for the different keys.'),
        children: [/*#__PURE__*/_jsx(Dropdown, {
          label: t('key type to set'),
          onChange: setKeyType,
          options: keyTypeOptRef.current,
          value: keyType
        }), /*#__PURE__*/_jsx(Dropdown, {
          isDisabled: _cryptoOptions.length === 1,
          label: t('crypto type to use'),
          onChange: setCrypto,
          options: _cryptoOptions,
          value: crypto
        })]
      }), /*#__PURE__*/_jsx(Modal.Columns, {
        hint: t('This pubic key is what will be visible in your queued keys list. It is generated based on the seed and the crypto used.'),
        children: /*#__PURE__*/_jsx(Input, {
          isDisabled: true,
          label: t('generated public key'),
          value: publicKey
        })
      })]
    }), /*#__PURE__*/_jsx(Modal.Actions, {
      children: /*#__PURE__*/_jsx(Button, {
        icon: "sign-in-alt",
        label: t('Submit key'),
        onClick: _onSubmit
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(InjectKeys);