// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import BN from 'bn.js';
import { useEffect, useState } from 'react';
import { useApi, useBestNumber, useCall, useEventTrigger, useIsMountedRef, useMapKeys } from '@axia-js/react-hooks';
import { BN_ZERO, u8aConcat } from '@axia-js/util';
import { encodeAddress } from '@axia-js/util-crypto';
import { CROWD_PREFIX } from "./constants.js";
const EMPTY = {
  activeCap: BN_ZERO,
  activeRaised: BN_ZERO,
  funds: null,
  totalCap: BN_ZERO,
  totalRaised: BN_ZERO
};
const EMPTY_U8A = new Uint8Array(32);

function createAddress(paraId) {
  return u8aConcat(CROWD_PREFIX, paraId.toU8a(), EMPTY_U8A).subarray(0, 32);
}

function isCrowdloadAccount(paraId, accountId) {
  return accountId.eq(createAddress(paraId));
}

function hasLease(paraId, leased) {
  return leased.some(l => l.eq(paraId));
} // map into a campaign


function updateFund(bestNumber, minContribution, data, leased) {
  data.isCapped = data.info.cap.sub(data.info.raised).lt(minContribution);
  data.isEnded = bestNumber.gt(data.info.end);
  data.isWinner = hasLease(data.paraId, leased);
  return data;
}

function isFundUpdated(bestNumber, minContribution, {
  info: {
    cap,
    end,
    raised
  },
  paraId
}, leased, allPrev) {
  var _allPrev$funds;

  const prev = (_allPrev$funds = allPrev.funds) === null || _allPrev$funds === void 0 ? void 0 : _allPrev$funds.find(p => p.paraId.eq(paraId));
  return !prev || !prev.isEnded && bestNumber.gt(end) || !prev.isCapped && cap.sub(raised).lt(minContribution) || !prev.isWinner && hasLease(paraId, leased);
}

function sortCampaigns(a, b) {
  return a.isWinner !== b.isWinner ? a.isWinner ? -1 : 1 : a.isCapped !== b.isCapped ? a.isCapped ? -1 : 1 : a.isEnded !== b.isEnded ? a.isEnded ? 1 : -1 : 0;
} // compare the current campaigns against the previous, manually adding ending and calculating the new totals


function createResult(bestNumber, minContribution, funds, leased, prev) {
  const [activeRaised, activeCap, totalRaised, totalCap] = funds.reduce(([ar, ac, tr, tc], {
    info: {
      cap,
      end,
      raised
    },
    isWinner
  }) => [bestNumber.gt(end) || isWinner ? ar : ar.iadd(raised), bestNumber.gt(end) || isWinner ? ac : ac.iadd(cap), tr.iadd(raised), tc.iadd(cap)], [new BN(0), new BN(0), new BN(0), new BN(0)]);
  const hasNewActiveCap = !prev.activeCap.eq(activeCap);
  const hasNewActiveRaised = !prev.activeRaised.eq(activeRaised);
  const hasNewTotalCap = !prev.totalCap.eq(totalCap);
  const hasNewTotalRaised = !prev.totalRaised.eq(totalRaised);
  const hasChanged = !prev.funds || prev.funds.length !== funds.length || hasNewActiveCap || hasNewActiveRaised || hasNewTotalCap || hasNewTotalRaised || funds.some(c => isFundUpdated(bestNumber, minContribution, c, leased, prev));

  if (!hasChanged) {
    return prev;
  }

  return {
    activeCap: hasNewActiveCap ? activeCap : prev.activeCap,
    activeRaised: hasNewActiveRaised ? activeRaised : prev.activeRaised,
    funds: funds.map(c => updateFund(bestNumber, minContribution, c, leased)).sort(sortCampaigns),
    totalCap: hasNewTotalCap ? totalCap : prev.totalCap,
    totalRaised: hasNewTotalRaised ? totalRaised : prev.totalRaised
  };
}

const optFundMulti = {
  transform: ([[paraIds], optFunds]) => paraIds.map((paraId, i) => [paraId, optFunds[i].unwrapOr(null)]).filter(v => !!v[1]).map(([paraId, info]) => ({
    accountId: encodeAddress(createAddress(paraId)),
    firstSlot: info.firstPeriod,
    info,
    isCrowdloan: true,
    key: paraId.toString(),
    lastSlot: info.lastPeriod,
    paraId,
    value: info.raised
  })).sort((a, b) => a.info.end.cmp(b.info.end) || a.info.firstPeriod.cmp(b.info.firstPeriod) || a.info.lastPeriod.cmp(b.info.lastPeriod) || a.paraId.cmp(b.paraId)),
  withParamsTransform: true
};
const optLeaseMulti = {
  transform: ([[paraIds], leases]) => paraIds.filter((paraId, i) => leases[i].map(o => o.unwrapOr(null)).filter(v => !!v).filter(([accountId]) => isCrowdloadAccount(paraId, accountId)).length !== 0),
  withParamsTransform: true
};

function extractFundIds(keys) {
  return keys.map(({
    args: [paraId]
  }) => paraId);
}

export default function useFunds() {
  var _api$events$crowdloan, _api$query$crowdloan, _api$query$crowdloan2;

  const {
    api
  } = useApi();
  const bestNumber = useBestNumber();
  const mountedRef = useIsMountedRef();
  const trigger = useEventTrigger([(_api$events$crowdloan = api.events.crowdloan) === null || _api$events$crowdloan === void 0 ? void 0 : _api$events$crowdloan.Created]);
  const paraIds = useMapKeys((_api$query$crowdloan = api.query.crowdloan) === null || _api$query$crowdloan === void 0 ? void 0 : _api$query$crowdloan.funds, {
    at: trigger.blockHash,
    transform: extractFundIds
  });
  const campaigns = useCall((_api$query$crowdloan2 = api.query.crowdloan) === null || _api$query$crowdloan2 === void 0 ? void 0 : _api$query$crowdloan2.funds.multi, [paraIds], optFundMulti);
  const leases = useCall(api.query.slots.leases.multi, [paraIds], optLeaseMulti);
  const [result, setResult] = useState(EMPTY); // here we manually add the actual ending status and calculate the totals

  useEffect(() => {
    mountedRef.current && bestNumber && campaigns && leases && setResult(prev => createResult(bestNumber, api.consts.crowdloan.minContribution, campaigns, leases, prev));
  }, [api, bestNumber, campaigns, leases, mountedRef]);
  return result;
}