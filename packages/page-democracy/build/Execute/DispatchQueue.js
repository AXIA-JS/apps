// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo, useRef } from 'react';
import { Table } from '@axia-js/react-components';
import { useApi, useBestNumber, useCall } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import DispatchEntry from "./DispatchEntry.js";
import { jsx as _jsx } from "react/jsx-runtime";

function DispatchQueue({
  className
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const bestNumber = useBestNumber();
  const queued = useCall(api.derive.democracy.dispatchQueue);
  const filtered = useMemo(() => bestNumber && queued && queued.filter(({
    at
  }) => at.gte(bestNumber)), [bestNumber, queued]);
  const headerRef = useRef([[t('dispatch queue'), 'start', 2], [t('enact')], [], [undefined, 'media--1000']]);
  return /*#__PURE__*/_jsx(Table, {
    className: className,
    empty: filtered && t('Nothing queued for execution'),
    header: headerRef.current,
    children: filtered === null || filtered === void 0 ? void 0 : filtered.map(entry => /*#__PURE__*/_jsx(DispatchEntry, {
      value: entry
    }, entry.index.toString()))
  });
}

export default /*#__PURE__*/React.memo(DispatchQueue);