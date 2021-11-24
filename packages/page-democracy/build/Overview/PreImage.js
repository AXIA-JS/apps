// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
import BN from 'bn.js';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Extrinsic, Input, InputAddress, InputBalance, Modal, TxButton } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import { Available } from '@axia-js/react-query';
import { BN_ZERO } from '@axia-js/util';
import { blake2AsHex } from '@axia-js/util-crypto';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const ZERO_HASH = blake2AsHex('');

function PreImage({
  className = '',
  imageHash,
  isImminent = false,
  onClose
}) {
  const {
    t
  } = useTranslation();
  const {
    api,
    apiDefaultTxSudo
  } = useApi();
  const [accountId, setAccountId] = useState(null);
  const [{
    encodedHash,
    encodedProposal,
    storageFee
  }, setHash] = useState({
    encodedHash: ZERO_HASH,
    encodedProposal: '',
    storageFee: BN_ZERO
  });
  const [proposal, setProposal] = useState();
  useEffect(() => {
    const encodedProposal = (proposal === null || proposal === void 0 ? void 0 : proposal.method.toHex()) || '';
    const storageFee = api.consts.democracy.preimageByteDeposit.mul(encodedProposal ? new BN((encodedProposal.length - 2) / 2) : BN_ZERO);
    setHash({
      encodedHash: blake2AsHex(encodedProposal),
      encodedProposal,
      storageFee
    });
  }, [api, proposal]);
  const isMatched = imageHash ? imageHash.eq(encodedHash) : true;
  return /*#__PURE__*/_jsxs(Modal, {
    className: className,
    header: t('Submit preimage'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/_jsxs(Modal.Content, {
      children: [/*#__PURE__*/_jsx(Modal.Columns, {
        hint: t('This account will pay the fees for the preimage, based on the size thereof.'),
        children: /*#__PURE__*/_jsx(InputAddress, {
          help: t('The account you want to register the preimage from'),
          label: t('send from account'),
          labelExtra: /*#__PURE__*/_jsx(Available, {
            label: /*#__PURE__*/_jsx("span", {
              className: "label",
              children: t('transferrable')
            }),
            params: accountId
          }),
          onChange: setAccountId,
          type: "account"
        })
      }), /*#__PURE__*/_jsxs(Modal.Columns, {
        hint: /*#__PURE__*/_jsxs(_Fragment, {
          children: [/*#__PURE__*/_jsx("p", {
            children: t('The image (proposal) will be stored on-chain against the hash of the contents.')
          }), /*#__PURE__*/_jsx("p", {
            children: t('When submitting a proposal the hash needs to be known. Proposals can be submitted with hash-only, but upon dispatch the preimage needs to be available.')
          })]
        }),
        children: [/*#__PURE__*/_jsx(Extrinsic, {
          defaultValue: apiDefaultTxSudo,
          label: t('propose'),
          onChange: setProposal
        }), /*#__PURE__*/_jsx(Input, {
          className: "disabledLook",
          help: t('The hash of the selected proposal, use it for submitting the proposal'),
          isDisabledError: !isMatched,
          label: t('preimage hash'),
          value: encodedHash
        })]
      }), !isImminent && /*#__PURE__*/_jsx(Modal.Columns, {
        hint: t('The calculated storage costs based on the size and the per-bytes fee.'),
        children: /*#__PURE__*/_jsx(InputBalance, {
          defaultValue: storageFee,
          help: t('The amount reserved to store this image'),
          isDisabled: true,
          label: t('calculated storage fee')
        })
      })]
    }), /*#__PURE__*/_jsx(Modal.Actions, {
      children: /*#__PURE__*/_jsx(TxButton, {
        accountId: accountId,
        icon: "plus",
        isDisabled: !proposal || !accountId || !isMatched || !encodedProposal,
        label: t('Submit preimage'),
        onStart: onClose,
        params: [encodedProposal],
        tx: isImminent ? api.tx.democracy.noteImminentPreimage : api.tx.democracy.notePreimage
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(PreImage).withConfig({
  displayName: "PreImage",
  componentId: "sc-4m9o4k-0"
})([".toggleImminent{margin:0.5rem 0;text-align:right;}.disabledLook input{background:transparent;border-style:dashed;&:focus{background:transparent;border-color:#d9d8d7;}}"]));