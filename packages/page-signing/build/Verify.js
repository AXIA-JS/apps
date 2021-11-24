// Copyright 2017-2021 @axia-js/app-signing authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Badge, Dropdown, Input, InputAddress, Static } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import { keyring } from '@axia-js/ui-keyring';
import { settings } from '@axia-js/ui-settings';
import { isHex } from '@axia-js/util';
import { signatureVerify } from '@axia-js/util-crypto';
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Verify({
  className = ''
}) {
  const {
    t
  } = useTranslation();
  const {
    isEthereum
  } = useApi();
  const [{
    cryptoType,
    isValid
  }, setValidity] = useState({
    cryptoType: 'unknown',
    isValid: false
  });
  const [{
    data,
    isHexData
  }, setData] = useState({
    data: '',
    isHexData: false
  });
  const [{
    isValidPk,
    publicKey
  }, setPublicKey] = useState({
    isValidPk: false,
    publicKey: null
  });
  const [{
    isValidSignature,
    signature
  }, setSignature] = useState({
    isValidSignature: false,
    signature: ''
  });
  const [cryptoOptions] = useState([{
    text: t('Crypto not detected'),
    value: 'unknown'
  }].concat(settings.availableCryptos));
  useEffect(() => {
    let cryptoType = 'unknown';
    let isValid = isValidPk && isValidSignature; // We use signatureVerify to detect validity and crypto type

    if (isValid && publicKey) {
      const verification = signatureVerify(data, signature, publicKey);

      if (verification.crypto !== 'none') {
        isValid = verification.isValid;
        cryptoType = verification.crypto;
      }
    }

    setValidity({
      cryptoType,
      isValid
    });
  }, [data, isValidPk, isValidSignature, publicKey, signature]);

  const _onChangeAddress = useCallback(accountId => {
    let publicKey = null;

    try {
      publicKey = keyring.decodeAddress(accountId || '');
    } catch (err) {
      console.error(err);
    }

    setPublicKey({
      isValidPk: !!publicKey && (publicKey.length === 32 || isEthereum && publicKey.length === 20),
      publicKey
    });
  }, [isEthereum]);

  const _onChangeData = useCallback(data => setData({
    data,
    isHexData: isHex(data)
  }), []);

  const _onChangeSignature = useCallback(signature => setSignature({
    isValidSignature: isHex(signature) && (signature.length === 130 || isEthereum && signature.length === 132),
    signature
  }), [isEthereum]);

  return /*#__PURE__*/_jsxs("div", {
    className: `toolbox--Verify ${className}`,
    children: [/*#__PURE__*/_jsx("div", {
      className: "ui--row",
      children: /*#__PURE__*/_jsx(InputAddress, {
        className: "full",
        help: t('The account that signed the input'),
        isError: !isValidPk,
        isInput: true,
        label: t('verify using address'),
        onChange: _onChangeAddress
      })
    }), /*#__PURE__*/_jsx("div", {
      className: "ui--row",
      children: /*#__PURE__*/_jsx(Input, {
        autoFocus: true,
        className: "full",
        help: t('The data that was signed. This is used in combination with the signature for the verification. It can either be hex or a string.'),
        label: t('using the following data'),
        onChange: _onChangeData,
        value: data
      })
    }), /*#__PURE__*/_jsxs("div", {
      className: "ui--row",
      children: [/*#__PURE__*/_jsx("div", {
        className: "ui--AlignedIconContainer",
        children: /*#__PURE__*/_jsx(Badge, {
          className: "alignedBadge",
          color: isValid ? 'green' : isValidSignature ? 'red' : 'gray',
          icon: isValid ? 'check' : isValidSignature ? 'exclamation' : 'question'
        })
      }), /*#__PURE__*/_jsx(Input, {
        className: "full",
        help: t('The signature as by the account being checked, supplied as a hex-formatted string.'),
        isError: !isValidSignature,
        label: t('the supplied signature'),
        onChange: _onChangeSignature,
        value: signature
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "ui--row",
      children: [/*#__PURE__*/_jsx(Dropdown, {
        defaultValue: cryptoType,
        help: t('Cryptography used to create this signature. It is auto-detected on valid signatures.'),
        isDisabled: true,
        label: t('signature crypto type'),
        options: cryptoOptions
      }), /*#__PURE__*/_jsx(Static, {
        className: "medium",
        help: t('Detection on the input string to determine if it is hex or non-hex.'),
        label: t('hex input data'),
        value: isHexData ? t('Yes') : t('No')
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Verify).withConfig({
  displayName: "Verify",
  componentId: "sc-9jio7w-0"
})([".ui--AlignedIconContainer{position:absolute;z-index:1;}.alignedBadge{left:1.25rem;position:relative;top:1.25rem;}"]));