// Copyright 2017-2021 @axia-js/react-signer authors & contributors
// SPDX-License-Identifier: Apache-2.0
import BN from 'bn.js';
import React, { useCallback, useEffect, useState } from 'react';
import { InputNumber, Modal, Output } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import { BN_ZERO } from '@axia-js/util';
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function SignFields({
  address,
  onChange,
  signedTx
}) {
  const {
    api
  } = useApi();
  const [blocks, setBlocks] = useState(() => new BN(64));
  const [nonce, setNonce] = useState(BN_ZERO);
  const {
    t
  } = useTranslation();
  useEffect(() => {
    address && api.derive.balances.account(address).then(({
      accountNonce
    }) => setNonce(accountNonce)).catch(console.error);
  }, [address, api]);
  useEffect(() => {
    onChange({
      era: blocks.toNumber(),
      nonce
    });
  }, [blocks, nonce, onChange]);

  const _setBlocks = useCallback((blocks = BN_ZERO) => setBlocks(blocks), []);

  const _setNonce = useCallback((nonce = BN_ZERO) => setNonce(nonce), []);

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs(Modal.Columns, {
      hint: t('Override any applicable values for the specific signed output. These will be used to construct and display the signed transaction.'),
      children: [/*#__PURE__*/_jsx(InputNumber, {
        isDisabled: !!signedTx,
        isZeroable: true,
        label: t('Nonce'),
        labelExtra: t('Current account nonce: {{accountNonce}}', {
          replace: {
            accountNonce: nonce
          }
        }),
        onChange: _setNonce,
        value: nonce
      }), /*#__PURE__*/_jsx(InputNumber, {
        isDisabled: !!signedTx,
        isZeroable: true,
        label: t('Lifetime (# of blocks)'),
        labelExtra: t('Set to 0 to make transaction immortal'),
        onChange: _setBlocks,
        value: blocks
      })]
    }), !!signedTx && /*#__PURE__*/_jsx(Modal.Columns, {
      hint: t('The actual fully constructed signed output. This can be used for submission via other channels.'),
      children: /*#__PURE__*/_jsx(Output, {
        isFull: true,
        isTrimmed: true,
        label: t('Signed transaction'),
        value: signedTx,
        withCopy: true
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(SignFields);