// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { AddressRow, Modal, Static } from '@axia-js/react-components';
import { isHex } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function CreateConfirmation({
  address,
  derivePath,
  name,
  pairType,
  seed
}) {
  const {
    t
  } = useTranslation();
  const splitSeed = seed && seed.split(' ');
  const shortSeed = isHex(seed) ? `${seed.substr(10)} … ${seed.substr(-8)}` : splitSeed && splitSeed.map((value, index) => index % 3 ? '…' : value).join(' ');
  return /*#__PURE__*/_jsx(Modal.Content, {
    children: /*#__PURE__*/_jsxs(Modal.Columns, {
      hint: /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx("p", {
          children: t('We will provide you with a generated backup file after your account is created. As long as you have access to your account you can always download this file later by clicking on "Backup" button from the Accounts section.')
        }), /*#__PURE__*/_jsx("p", {
          children: t('Please make sure to save this file in a secure location as it is required, together with your password, to restore your account.')
        })]
      }),
      children: [address && name && /*#__PURE__*/_jsx(AddressRow, {
        defaultName: name,
        isInline: true,
        noDefaultNameOpacity: true,
        value: address
      }), shortSeed && /*#__PURE__*/_jsx(Static, {
        label: t('partial seed'),
        value: shortSeed
      }), /*#__PURE__*/_jsx(Static, {
        label: t('keypair type'),
        value: pairType
      }), /*#__PURE__*/_jsx(Static, {
        label: t('derivation path'),
        value: derivePath || t('<none provided>')
      })]
    })
  });
}

export default /*#__PURE__*/React.memo(CreateConfirmation);