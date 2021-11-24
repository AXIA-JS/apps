// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import { AddressMini, Expander, MarkWarning } from '@axia-js/react-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import { isFunction } from '@axia-js/util';
import { useTranslation } from "../../translate.js";
import useInactives from "../useInactives.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const EMPTY_MAP = {};

function mapExposure(stashId, all, eraExposure) {
  if (!(eraExposure !== null && eraExposure !== void 0 && eraExposure.validators)) {
    return EMPTY_MAP;
  }

  const nomBalanceMap = {}; // for every active nominee

  all.forEach(nom => {
    var _eraExposure$validato;

    // cycle through its nominator to find our current stash
    (_eraExposure$validato = eraExposure.validators[nom]) === null || _eraExposure$validato === void 0 ? void 0 : _eraExposure$validato.others.some(o => {
      if (o.who.eq(stashId)) {
        nomBalanceMap[nom] = o.value.toBn();
        return true;
      }

      return false;
    });
  });
  return nomBalanceMap;
}

function renderNominators(stashId, all = [], eraExposure) {
  return all.length ? [all.length, () => {
    const nomBalanceMap = mapExposure(stashId, all, eraExposure);
    return all.map((nomineeId, index) => /*#__PURE__*/_jsx(AddressMini, {
      balance: nomBalanceMap[nomineeId],
      value: nomineeId,
      withBalance: !!eraExposure
    }, index));
  }] : null;
}

function ListNominees({
  nominating,
  stashId
}) {
  var _api$derive$session, _api$consts$staking, _api$consts$staking$m;

  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const {
    nomsActive,
    nomsChilled,
    nomsInactive,
    nomsOver,
    nomsWaiting
  } = useInactives(stashId, nominating);
  const sessionInfo = useCall(api.query.staking && ((_api$derive$session = api.derive.session) === null || _api$derive$session === void 0 ? void 0 : _api$derive$session.indexes));
  const eraExposure = useCall(isFunction(api.query.staking.erasStakers) && api.derive.staking.eraExposure, [sessionInfo === null || sessionInfo === void 0 ? void 0 : sessionInfo.activeEra]);
  const [renActive, renChilled, renInactive, renOver, renWaiting] = useMemo(() => [renderNominators(stashId, nomsActive, eraExposure), renderNominators(stashId, nomsChilled), renderNominators(stashId, nomsInactive), renderNominators(stashId, nomsOver), renderNominators(stashId, nomsWaiting)], [eraExposure, nomsActive, nomsChilled, nomsInactive, nomsOver, nomsWaiting, stashId]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [renOver && /*#__PURE__*/_jsx(Expander, {
      className: "stakeOver",
      help: t('These validators are active but only the top {{max}} nominators by backing stake will be receiving rewards. The nominating stash is not one of those to be rewarded in the current era.', {
        replace: (_api$consts$staking = api.consts.staking) === null || _api$consts$staking === void 0 ? void 0 : (_api$consts$staking$m = _api$consts$staking.maxNominatorRewardedPerValidator) === null || _api$consts$staking$m === void 0 ? void 0 : _api$consts$staking$m.toString()
      }),
      renderChildren: renOver[1],
      summary: t('Oversubscribed nominations ({{count}})', {
        replace: {
          count: renOver[0]
        }
      })
    }), renActive && /*#__PURE__*/_jsx(Expander, {
      help: t('The validators selected by the Phragmen algorithm to nominate for this era.'),
      renderChildren: renActive[1],
      summary: t('Active nominations ({{count}})', {
        replace: {
          count: renActive[0]
        }
      })
    }), renInactive && /*#__PURE__*/_jsx(Expander, {
      help: t('The elected validator list that did not get selected by the Phragmen algorithm for this era. However they may be selected in the future.'),
      renderChildren: renInactive[1],
      summary: t('Inactive nominations ({{count}})', {
        replace: {
          count: renInactive[0]
        }
      })
    }), renChilled && /*#__PURE__*/_jsx(Expander, {
      help: t('The validators that got slashed and for which your nomination got auto-chilled. Re-nominating these will make them available to the Phragmen algorithm.'),
      renderChildren: renChilled[1],
      summary: t('Renomination required ({{count}})', {
        replace: {
          count: renChilled[0]
        }
      })
    }), renWaiting && /*#__PURE__*/_jsx(Expander, {
      help: t('The validators that are not in the validator set because they need more nominations or because they have willingly stop validating. Any nominations made before the next election will also appear here.'),
      renderChildren: renWaiting[1],
      summary: t('Waiting nominations ({{count}})', {
        replace: {
          count: renWaiting[0]
        }
      })
    }), nomsActive && nomsInactive && nomsActive.length === 0 && nomsInactive.length !== 0 && /*#__PURE__*/_jsx(MarkWarning, {
      content: t('Your nomination has not been applied to any validator in the active set by the election algorithm. This could mean that all your validators are over-subscribed or that you have less bonded than the lowest nominator elected for each of the validators.')
    })]
  });
}

export default /*#__PURE__*/React.memo(ListNominees);