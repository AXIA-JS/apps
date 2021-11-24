// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useApi } from '@axia-js/react-hooks';
import { chains } from '@axia-js/ui-settings/defaults/chains';
import Toggle from "./Toggle.js";
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";

function calcLock(apiGenesis, genesisHash) {
  if (!genesisHash) {
    return false;
  }

  return (Object.values(chains).find(hashes => hashes.includes(apiGenesis)) || [apiGenesis]).includes(genesisHash);
}

function ChainLock({
  className = '',
  genesisHash,
  isDisabled,
  onChange
}) {
  const {
    t
  } = useTranslation();
  const {
    api,
    isDevelopment
  } = useApi();
  const isTiedToChain = useMemo(() => calcLock(api.genesisHash.toHex(), genesisHash), [api, genesisHash]);

  const _onChange = useCallback(isTiedToChain => onChange(isTiedToChain ? api.genesisHash.toHex() : null), [api, onChange]);

  if (isDevelopment) {
    return null;
  }

  return /*#__PURE__*/_jsx(Toggle, {
    className: className,
    isDisabled: isDisabled,
    label: t('only this network'),
    onChange: _onChange,
    preventDefault: true,
    value: isTiedToChain
  });
}

export default /*#__PURE__*/React.memo(styled(ChainLock).withConfig({
  displayName: "ChainLock",
  componentId: "sc-7b6c2x-0"
})(["text-align:right;"]));