// Copyright 2017-2021 @axia-js/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useMemo, useState } from 'react';
import { Button, TxButton } from '@axia-js/react-components';
import { useAccounts, useApi, useTxBatch } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import TipCreate from "./TipCreate.js";
import Tips from "./Tips.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const DEFAULT_TIPS = {
  quickTips: {},
  quickTxs: []
};

function TipsEntry({
  className,
  hashes,
  isMember,
  members
}) {
  const {
    t
  } = useTranslation();
  const {
    allAccounts
  } = useAccounts();
  const {
    api
  } = useApi();
  const [{
    quickTxs
  }, setQuickTips] = useState(DEFAULT_TIPS);
  const batchTxs = useTxBatch(quickTxs);
  const defaultId = useMemo(() => members.find(memberId => allAccounts.includes(memberId)) || null, [allAccounts, members]);

  const _selectTip = useCallback((hash, isSelected, value) => setQuickTips(({
    quickTips
  }) => {
    quickTips[hash] = isSelected ? value : null;
    return {
      quickTips,
      quickTxs: Object.entries(quickTips).map(([hash, value]) => value && (api.tx.tips || api.tx.treasury).tip(hash, value)).filter(value => !!value)
    };
  }), [api]);

  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsxs(Button.Group, {
      children: [/*#__PURE__*/_jsx(TipCreate, {
        members: members
      }), /*#__PURE__*/_jsx(TxButton, {
        accountId: defaultId,
        extrinsic: batchTxs,
        icon: "fighter-jet",
        isDisabled: !isMember || !batchTxs,
        label: t('Median tip selected')
      })]
    }), /*#__PURE__*/_jsx(Tips, {
      defaultId: defaultId,
      hashes: hashes,
      isMember: isMember,
      members: members,
      onSelectTip: _selectTip
    })]
  });
}

export default /*#__PURE__*/React.memo(TipsEntry);