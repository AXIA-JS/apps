// Copyright 2017-2021 @axia-js/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { Table, Toggle } from '@axia-js/react-components';
import { useApi, useBestNumber, useCall } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import Tip from "./Tip.js";
import { jsx as _jsx } from "react/jsx-runtime";
const TIP_OPTS = {
  withParams: true
};

function extractTips(tipsWithHashes, inHashes) {
  if (!tipsWithHashes || !inHashes) {
    return undefined;
  }

  const [[hashes], optTips] = tipsWithHashes;
  return optTips.map((opt, index) => [hashes[index], opt.unwrapOr(null)]).filter(val => inHashes.includes(val[0]) && !!val[1]).sort((a, b) => a[1].closes.isNone ? b[1].closes.isNone ? 0 : -1 : b[1].closes.isSome ? b[1].closes.unwrap().cmp(a[1].closes.unwrap()) : 1);
}

function Tips({
  className = '',
  defaultId,
  hashes,
  isMember,
  members,
  onSelectTip
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [onlyUntipped, setOnlyUntipped] = useState(false);
  const bestNumber = useBestNumber();
  const tipsWithHashes = useCall(hashes && (api.query.tips || api.query.treasury).tips.multi, [hashes], TIP_OPTS);
  const tips = useMemo(() => extractTips(tipsWithHashes, hashes), [hashes, tipsWithHashes]);
  const headerRef = useRef([[t('tips'), 'start'], [t('finder'), 'address media--1400'], [t('reason'), 'start'], [undefined, 'media--1100'], [], [undefined, 'badge media--1700'], [], [undefined, 'media--1700']]);
  return /*#__PURE__*/_jsx(Table, {
    className: className,
    empty: tips && t('No open tips'),
    filter: isMember && /*#__PURE__*/_jsx("div", {
      className: "tipsFilter",
      children: /*#__PURE__*/_jsx(Toggle, {
        label: t('show only untipped/closing'),
        onChange: setOnlyUntipped,
        value: onlyUntipped
      })
    }),
    header: headerRef.current,
    children: tips && tips.map(([hash, tip]) => /*#__PURE__*/_jsx(Tip, {
      bestNumber: bestNumber,
      defaultId: defaultId,
      hash: hash,
      isMember: isMember,
      members: members,
      onSelect: onSelectTip,
      onlyUntipped: onlyUntipped,
      tip: tip
    }, hash))
  });
}

export default /*#__PURE__*/React.memo(styled(Tips).withConfig({
  displayName: "Tips",
  componentId: "sc-yxafy2-0"
})([".tipsFilter{text-align:right;.ui--Toggle{margin-right:1rem;margin-top:0.75rem;}}"]));