// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
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
  const [allyId, setAllyId] = useState(0);
  useEffect(() => {
    onChange(accountId && allyId ? {
      accountId,
      allyId
    } : {
      accountId: null,
      allyId: 0
    });
  }, [accountId, onChange, ownedIds, allyId]);
  const owners = useMemo(() => ownedIds.map(({
    manager
  }) => manager), [ownedIds]);
  const optIds = useMemo(() => ownedIds.filter(({
    manager
  }) => manager === accountId).map(({
    allyId
  }) => ({
    text: allyId.toString(),
    value: allyId.toNumber()
  })), [accountId, ownedIds]);

  const _setAllyId = useCallback(id => setAllyId(noCodeCheck || ownedIds.some(({
    hasCode,
    allyId
  }) => allyId.eq(id) && hasCode) ? id : 0), [noCodeCheck, ownedIds]);

  return /*#__PURE__*/_jsxs(Modal.Columns, {
    hint: /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx("p", {
        children: t('This account that has been used to register the allychain. This will pay all associated fees.')
      }), /*#__PURE__*/_jsx("p", {
        children: t('The allychain id is associated with the selected account via allythread registration.')
      })]
    }),
    children: [/*#__PURE__*/_jsx(InputAddress, {
      filter: owners,
      label: t('allychain owner'),
      onChange: setAccountId,
      type: "account",
      value: accountId
    }), accountId && /*#__PURE__*/_jsx(Dropdown, {
      defaultValue: optIds[0].value,
      label: t('allychain id'),
      onChange: _setAllyId,
      options: optIds
    }, accountId), !noCodeCheck && !allyId && /*#__PURE__*/_jsx(MarkError, {
      content: t('Before using this registered allyId, you need to have a WASM validation function registered on-chain')
    })]
  });
}

export default /*#__PURE__*/React.memo(InputOwner);