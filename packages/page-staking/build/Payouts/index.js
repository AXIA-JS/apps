// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import BN from 'bn.js';
import React, { useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, Table, ToggleGroup } from '@axia-js/react-components';
import { useApi, useCall, useOwnEraRewards } from '@axia-js/react-hooks';
import { FormatBalance } from '@axia-js/react-query';
import { BN_THREE } from '@axia-js/util';
import ElectionBanner from "../ElectionBanner.js";
import { useTranslation } from "../translate.js";
import PayButton from "./PayButton.js";
import Stash from "./Stash.js";
import Validator from "./Validator.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const DAY_SECS = new BN(1000 * 60 * 60 * 24);

function groupByValidator(allRewards) {
  return Object.entries(allRewards).reduce((grouped, [stashId, rewards]) => {
    rewards.forEach(reward => {
      Object.entries(reward.validators).forEach(([validatorId, {
        total,
        value
      }]) => {
        const entry = grouped.find(entry => entry.validatorId === validatorId);

        if (entry) {
          const eraEntry = entry.eras.find(entry => entry.era.eq(reward.era));

          if (eraEntry) {
            eraEntry.stashes[stashId] = value;
          } else {
            entry.eras.push({
              era: reward.era,
              stashes: {
                [stashId]: value
              }
            });
          }

          entry.available = entry.available.add(value);
          entry.total = entry.total.add(total);
        } else {
          grouped.push({
            available: value,
            eras: [{
              era: reward.era,
              stashes: {
                [stashId]: value
              }
            }],
            total,
            validatorId
          });
        }
      });
    });
    return grouped;
  }, []).sort((a, b) => b.available.cmp(a.available));
}

function extractStashes(allRewards) {
  return Object.entries(allRewards).map(([stashId, rewards]) => ({
    available: rewards.reduce((result, {
      validators
    }) => Object.values(validators).reduce((result, {
      value
    }) => result.iadd(value), result), new BN(0)),
    rewards,
    stashId
  })).filter(({
    available
  }) => !available.isZero()).sort((a, b) => b.available.cmp(a.available));
}

function getAvailable(allRewards) {
  if (allRewards) {
    const stashes = extractStashes(allRewards);
    const validators = groupByValidator(allRewards);
    const stashAvail = stashes.length ? stashes.reduce((a, {
      available
    }) => a.iadd(available), new BN(0)) : null;
    const [valAvail, valTotal] = validators.length ? validators.reduce(([a, t], {
      available,
      total
    }) => [a.iadd(available), t.iadd(total)], [new BN(0), new BN(0)]) : [null, null];
    return {
      stashAvail,
      stashes,
      valAvail,
      valTotal,
      validators
    };
  }

  return {};
}

function getOptions(api, eraLength, historyDepth, t) {
  var _api$consts$babe, _api$consts$timestamp;

  if (!eraLength || !historyDepth) {
    return [{
      text: '',
      value: 0
    }];
  }

  const blocksPerDay = DAY_SECS.div(((_api$consts$babe = api.consts.babe) === null || _api$consts$babe === void 0 ? void 0 : _api$consts$babe.expectedBlockTime) || ((_api$consts$timestamp = api.consts.timestamp) === null || _api$consts$timestamp === void 0 ? void 0 : _api$consts$timestamp.minimumPeriod.muln(2)) || new BN(6000));
  const maxBlocks = eraLength.mul(historyDepth);
  const eraSelection = [];
  const days = new BN(2);

  while (true) {
    const dayBlocks = blocksPerDay.mul(days);

    if (dayBlocks.gte(maxBlocks)) {
      break;
    }

    eraSelection.push({
      text: t('{{days}} days', {
        replace: {
          days: days.toString()
        }
      }),
      value: dayBlocks.div(eraLength).toNumber()
    });
    days.imul(BN_THREE);
  }

  eraSelection.push({
    text: t('Max, {{eras}} eras', {
      replace: {
        eras: historyDepth.toNumber()
      }
    }),
    value: historyDepth.toNumber()
  });
  return eraSelection;
}

function Payouts({
  className = '',
  isInElection,
  ownValidators
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [hasOwnValidators] = useState(() => ownValidators.length !== 0);
  const [myStashesIndex, setMyStashesIndex] = useState(() => hasOwnValidators ? 0 : 1);
  const [eraSelectionIndex, setEraSelectionIndex] = useState(0);
  const eraLength = useCall(api.derive.session.eraLength);
  const historyDepth = useCall(api.query.staking.historyDepth);
  const eraSelection = useMemo(() => getOptions(api, eraLength, historyDepth, t), [api, eraLength, historyDepth, t]);
  const {
    allRewards,
    isLoadingRewards
  } = useOwnEraRewards(eraSelection[eraSelectionIndex].value, myStashesIndex ? undefined : ownValidators);
  const {
    stashAvail,
    stashes,
    valAvail,
    validators
  } = useMemo(() => getAvailable(allRewards), [allRewards]);
  const headerStashes = useMemo(() => [[myStashesIndex ? t('payout/stash') : t('overall/validator'), 'start', 2], [t('eras'), 'start'], [myStashesIndex ? t('own') : t('total')], ['remaining'], [undefined, undefined, 3]], [myStashesIndex, t]);
  const headerValidatorsRef = useRef([[t('payout/validator'), 'start', 2], [t('eras'), 'start'], [t('own')], ['remaining'], [undefined, undefined, 3]]);
  const valOptions = useMemo(() => [{
    isDisabled: !hasOwnValidators,
    text: t('Own validators'),
    value: 'val'
  }, {
    text: t('Own stashes'),
    value: 'all'
  }], [hasOwnValidators, t]);
  const footerStash = useMemo(() => /*#__PURE__*/_jsxs("tr", {
    children: [/*#__PURE__*/_jsx("td", {
      colSpan: 3
    }), /*#__PURE__*/_jsx("td", {
      className: "number",
      children: stashAvail && /*#__PURE__*/_jsx(FormatBalance, {
        value: stashAvail
      })
    }), /*#__PURE__*/_jsx("td", {
      colSpan: 4
    })]
  }), [stashAvail]);
  const footerVal = useMemo(() => /*#__PURE__*/_jsxs("tr", {
    children: [/*#__PURE__*/_jsx("td", {
      colSpan: 3
    }), /*#__PURE__*/_jsx("td", {
      className: "number",
      children: valAvail && /*#__PURE__*/_jsx(FormatBalance, {
        value: valAvail
      })
    }), /*#__PURE__*/_jsx("td", {
      colSpan: 4
    })]
  }), [valAvail]);
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsxs(Button.Group, {
      children: [/*#__PURE__*/_jsx(ToggleGroup, {
        onChange: setEraSelectionIndex,
        options: eraSelection,
        value: eraSelectionIndex
      }), /*#__PURE__*/_jsx(ToggleGroup, {
        onChange: setMyStashesIndex,
        options: valOptions,
        value: myStashesIndex
      }), /*#__PURE__*/_jsx(PayButton, {
        isAll: true,
        isDisabled: isInElection,
        payout: validators
      })]
    }), /*#__PURE__*/_jsx(ElectionBanner, {
      isInElection: isInElection
    }), !isLoadingRewards && !(stashes !== null && stashes !== void 0 && stashes.length) && /*#__PURE__*/_jsxs("article", {
      className: "warning centered",
      children: [/*#__PURE__*/_jsx("p", {
        children: t('Payouts of rewards for a validator can be initiated by any account. This means that as soon as a validator or nominator requests a payout for an era, all the nominators for that validator will be rewarded. Each user does not need to claim individually and the suggestion is that validators should claim rewards for everybody as soon as an era ends.')
      }), /*#__PURE__*/_jsx("p", {
        children: t('If you have not claimed rewards straight after the end of the era, the validator is in the active set and you are seeing no rewards, this would mean that the reward payout transaction was made by another account on your behalf. Always check your favorite explorer to see any historic payouts made to your accounts.')
      })]
    }), /*#__PURE__*/_jsx(Table, {
      empty: !isLoadingRewards && stashes && (myStashesIndex ? t('No pending payouts for your stashes') : t('No pending payouts for your validators')),
      emptySpinner: t('Retrieving info for the selected eras, this will take some time'),
      footer: footerStash,
      header: headerStashes,
      isFixed: true,
      children: !isLoadingRewards && (stashes === null || stashes === void 0 ? void 0 : stashes.map(payout => /*#__PURE__*/_jsx(Stash, {
        payout: payout
      }, payout.stashId)))
    }), myStashesIndex === 1 && !isLoadingRewards && validators && validators.length !== 0 && /*#__PURE__*/_jsx(Table, {
      footer: footerVal,
      header: headerValidatorsRef.current,
      isFixed: true,
      children: !isLoadingRewards && validators.filter(({
        available
      }) => !available.isZero()).map(payout => /*#__PURE__*/_jsx(Validator, {
        isDisabled: isInElection,
        payout: payout
      }, payout.validatorId))
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Payouts).withConfig({
  displayName: "Payouts",
  componentId: "sc-15uy4cc-0"
})([".payout-eras{padding-left:0.25rem;vertical-align:middle;span{white-space:nowrap;}}"]));