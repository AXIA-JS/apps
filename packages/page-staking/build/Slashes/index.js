// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import BN from 'bn.js';
import React, { useMemo, useState } from 'react';
import { getSlashProposalThreshold } from '@axia-js/apps-config';
import { Table, ToggleGroup } from '@axia-js/react-components';
import { useAccounts, useApi, useCollectiveMembers } from '@axia-js/react-hooks';
import { formatNumber } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import Era from "./Era.js";
import { jsx as _jsx } from "react/jsx-runtime";

function calcSlashEras(slashes, ownStashes) {
  const slashEras = [];
  slashes.reduce((rows, [era, slashes]) => {
    return slashes.reduce((rows, slash) => {
      const totalOther = slash.others.reduce((total, [, value]) => {
        return total.add(value);
      }, new BN(0));
      const isMine = ownStashes.some(({
        stashId
      }) => {
        return slash.validator.eq(stashId) || slash.others.some(([nominatorId]) => nominatorId.eq(stashId));
      });
      rows.push({
        era,
        isMine,
        slash,
        total: slash.own.add(totalOther),
        totalOther
      });
      return rows;
    }, rows);
  }, []).forEach(slash => {
    let slashEra = slashEras.find(({
      era
    }) => era.eq(slash.era));

    if (!slashEra) {
      slashEra = {
        era: slash.era,
        nominators: [],
        payout: new BN(0),
        reporters: [],
        slashes: [],
        total: new BN(0),
        validators: []
      };
      slashEras.push(slashEra);
    }

    slashEra.payout.iadd(slash.slash.payout);
    slashEra.total.iadd(slash.total);
    slashEra.slashes.push(slash);
    const validatorId = slash.slash.validator.toString();

    if (!slashEra.validators.includes(validatorId)) {
      slashEra.validators.push(validatorId);
    }

    slash.slash.others.forEach(([accountId]) => {
      const nominatorId = accountId.toString();

      if (slashEra && !slashEra.nominators.includes(nominatorId)) {
        slashEra.nominators.push(nominatorId);
      }
    });
    slash.slash.reporters.forEach(accountId => {
      const reporterId = accountId.toString();

      if (slashEra && !slashEra.reporters.includes(reporterId)) {
        slashEra.reporters.push(reporterId);
      }
    });
  });
  return slashEras.sort((a, b) => b.era.cmp(a.era));
}

function Slashes({
  ownStashes = [],
  slashes
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const {
    allAccounts
  } = useAccounts();
  const {
    members
  } = useCollectiveMembers('council');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const rows = useMemo(() => calcSlashEras(slashes, ownStashes), [ownStashes, slashes]);
  const eraOpts = useMemo(() => rows.map(({
    era
  }) => ({
    text: t('era {{era}}', {
      replace: {
        era: formatNumber(era)
      }
    }),
    value: era.toString()
  })), [rows, t]);
  const councilId = useMemo(() => allAccounts.find(accountId => members.includes(accountId)) || null, [allAccounts, members]);

  if (!rows.length) {
    return /*#__PURE__*/_jsx(Table, {
      empty: t('There are no unapplied/pending slashes'),
      header: [[t('unapplied'), 'start']]
    });
  }

  const councilThreshold = Math.ceil((members.length || 0) * getSlashProposalThreshold(api));
  return /*#__PURE__*/_jsx(Era, {
    buttons: /*#__PURE__*/_jsx(ToggleGroup, {
      onChange: setSelectedIndex,
      options: eraOpts,
      value: selectedIndex
    }),
    councilId: councilId,
    councilThreshold: councilThreshold,
    slash: rows[selectedIndex]
  }, rows[selectedIndex].era.toString());
}

export default /*#__PURE__*/React.memo(Slashes);