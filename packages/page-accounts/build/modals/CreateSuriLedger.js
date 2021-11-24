// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useRef, useState } from 'react';
import { selectableNetworks } from '@axia-js/networks';
import { Dropdown, MarkError, Modal } from '@axia-js/react-components';
import { useTranslation } from "../translate.js";
import { AVAIL_INDEXES } from "./Ledger.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const ledgerNets = selectableNetworks.filter(({
  hasLedgerSupport
}) => hasLedgerSupport);

function CreateSuriLedger({
  className,
  onChange,
  seedType
}) {
  const {
    t
  } = useTranslation();
  const [accIndex, setAccIndex] = useState(0);
  const [addIndex, setAddIndex] = useState(0);
  const [chainType, setChainType] = useState('axia');
  const netOpts = useRef(ledgerNets.map(({
    displayName,
    network
  }) => ({
    text: displayName,
    value: network
  })));
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
  useEffect(() => {
    const network = ledgerNets.find(({
      network
    }) => network === chainType);
    onChange(`m/44'/${network === null || network === void 0 ? void 0 : network.slip44}'/${accIndex}'/0'/${addIndex}'`);
  }, [accIndex, addIndex, chainType, onChange]);
  return /*#__PURE__*/_jsx(Modal.Columns, {
    className: className,
    hint: t('The derivation will be constructed from the values you specify.'),
    children: seedType === 'bip' ? /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(Dropdown, {
        help: t('The network to derive on'),
        label: t('Ledger app type (originated from)'),
        onChange: setChainType,
        options: netOpts.current,
        value: chainType
      }), /*#__PURE__*/_jsx(Dropdown, {
        help: t('The account type (derivation) to use'),
        label: t('account type'),
        onChange: setAccIndex,
        options: accOps.current,
        value: accIndex
      }), /*#__PURE__*/_jsx(Dropdown, {
        help: t('The address index (derivation on account) to use'),
        label: t('address index'),
        onChange: setAddIndex,
        options: addOps.current,
        value: addIndex
      })]
    }) : /*#__PURE__*/_jsx(MarkError, {
      content: t('Derivation for Ledger-type accounts are only available on mnemonic seeds.')
    })
  });
}

export default /*#__PURE__*/React.memo(CreateSuriLedger);