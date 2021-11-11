// Copyright 2017-2021 @axia-js/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Dropdown, InputAddress, MarkError, Modal } from '@axia-js/react-components';
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function InputOwner({
  noCodeCheck,
  onChange,
  ownedIds
}) {
  const {
    t
  } = useTranslation();
  const [accountId, setAccountId] = useState(null);
  const [paraId, setParaId] = useState(0);
  useEffect(() => {
    onChange(accountId && paraId ? {
      accountId,
      paraId
    } : {
      accountId: null,
      paraId: 0
    });
  }, [accountId, onChange, ownedIds, paraId]);
  const owners = useMemo(() => ownedIds.map(({
    manager
  }) => manager), [ownedIds]);
  const optIds = useMemo(() => ownedIds.filter(({
    manager
  }) => manager === accountId).map(({
    paraId
  }) => ({
    text: paraId.toString(),
    value: paraId.toNumber()
  })), [accountId, ownedIds]);

  const _setParaId = useCallback(id => setParaId(noCodeCheck || ownedIds.some(({
    hasCode,
    paraId
  }) => paraId.eq(id) && hasCode) ? id : 0), [noCodeCheck, ownedIds]);

  return /*#__PURE__*/_jsxs(Modal.Columns, {
    hint: /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx("p", {
        children: t('This account that has been used to register the parachain. This will pay all associated fees.')
      }), /*#__PURE__*/_jsx("p", {
        children: t('The parachain id is associated with the selected account via parathread registration.')
      })]
    }),
    children: [/*#__PURE__*/_jsx(InputAddress, {
      filter: owners,
      label: t('parachain owner'),
      onChange: setAccountId,
      type: "account",
      value: accountId
    }), accountId && /*#__PURE__*/_jsx(Dropdown, {
      defaultValue: optIds[0].value,
      label: t('parachain id'),
      onChange: _setParaId,
      options: optIds
    }, accountId), !noCodeCheck && !paraId && /*#__PURE__*/_jsx(MarkError, {
      content: t('Before using this registered paraId, you need to have a WASM validation function registered on-chain')
    })]
  });
}

export default /*#__PURE__*/React.memo(InputOwner);