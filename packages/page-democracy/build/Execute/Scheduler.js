// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo, useRef } from 'react';
import { Table } from '@axia-js/react-components';
import { useApi, useBestNumber, useCall } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import ScheduledView from "./Scheduled.js";
import { jsx as _jsx } from "react/jsx-runtime";
const transformEntries = {
  transform: entries => {
    return entries.filter(([, vecSchedOpt]) => vecSchedOpt.some(schedOpt => schedOpt.isSome)).reduce((items, [key, vecSchedOpt]) => {
      const blockNumber = key.args[0];
      return vecSchedOpt.filter(schedOpt => schedOpt.isSome).map(schedOpt => schedOpt.unwrap()).reduce((items, {
        call,
        maybeId,
        maybePeriodic,
        priority
      }, index) => {
        items.push({
          blockNumber,
          call,
          key: `${blockNumber.toString()}-${index}`,
          maybeId,
          maybePeriodic,
          priority
        });
        return items;
      }, items);
    }, []);
  }
};

function Schedule({
  className = ''
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const bestNumber = useBestNumber();
  const items = useCall(api.query.scheduler.agenda.entries, undefined, transformEntries);
  const filtered = useMemo(() => bestNumber && items && items.filter(({
    blockNumber
  }) => blockNumber.gte(bestNumber)), [bestNumber, items]);
  const headerRef = useRef([[t('scheduled'), 'start'], [t('id'), 'start'], [t('remaining')], [t('period')], [t('count')]]);
  return /*#__PURE__*/_jsx(Table, {
    className: className,
    empty: filtered && t('No active schedules'),
    header: headerRef.current,
    children: filtered === null || filtered === void 0 ? void 0 : filtered.map(value => /*#__PURE__*/_jsx(ScheduledView, {
      bestNumber: bestNumber,
      value: value
    }, value.key))
  });
}

export default /*#__PURE__*/React.memo(Schedule);