// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Option, StorageKey } from '@axia-js/types';
import type { AccountId, BalanceOf, BlockNumber, FundInfo, AllyId } from '@axia-js/types/interfaces';
import type { ITuple } from '@axia-js/types/types';
import type { Campaign, Campaigns } from './types';

import BN from 'bn.js';
import { useEffect, useState } from 'react';

import { useApi, useBestNumber, useCall, useEventTrigger, useIsMountedRef, useMapKeys } from '@axia-js/react-hooks';
import { BN_ZERO, u8aConcat } from '@axia-js/util';
import { encodeAddress } from '@axia-js/util-crypto';

import { CROWD_PREFIX } from './constants';

const EMPTY: Campaigns = {
  activeCap: BN_ZERO,
  activeRaised: BN_ZERO,
  funds: null,
  totalCap: BN_ZERO,
  totalRaised: BN_ZERO
};

const EMPTY_U8A = new Uint8Array(32);

function createAddress (allyId: AllyId): Uint8Array {
  return u8aConcat(CROWD_PREFIX, allyId.toU8a(), EMPTY_U8A).subarray(0, 32);
}

function isCrowdloadAccount (allyId: AllyId, accountId: AccountId): boolean {
  return accountId.eq(createAddress(allyId));
}

function hasLease (allyId: AllyId, leased: AllyId[]): boolean {
  return leased.some((l) => l.eq(allyId));
}

// map into a campaign
function updateFund (bestNumber: BN, minContribution: BN, data: Campaign, leased: AllyId[]): Campaign {
  data.isCapped = data.info.cap.sub(data.info.raised).lt(minContribution);
  data.isEnded = bestNumber.gt(data.info.end);
  data.isWinner = hasLease(data.allyId, leased);

  return data;
}

function isFundUpdated (bestNumber: BlockNumber, minContribution: BN, { info: { cap, end, raised }, allyId }: Campaign, leased: AllyId[], allPrev: Campaigns): boolean {
  const prev = allPrev.funds?.find((p) => p.allyId.eq(allyId));

  return !prev ||
    (!prev.isEnded && bestNumber.gt(end)) ||
    (!prev.isCapped && cap.sub(raised).lt(minContribution)) ||
    (!prev.isWinner && hasLease(allyId, leased));
}

function sortCampaigns (a: Campaign, b: Campaign): number {
  return a.isWinner !== b.isWinner
    ? a.isWinner
      ? -1
      : 1
    : a.isCapped !== b.isCapped
      ? a.isCapped
        ? -1
        : 1
      : a.isEnded !== b.isEnded
        ? a.isEnded
          ? 1
          : -1
        : 0;
}

// compare the current campaigns against the previous, manually adding ending and calculating the new totals
function createResult (bestNumber: BlockNumber, minContribution: BN, funds: Campaign[], leased: AllyId[], prev: Campaigns): Campaigns {
  const [activeRaised, activeCap, totalRaised, totalCap] = funds.reduce(([ar, ac, tr, tc], { info: { cap, end, raised }, isWinner }) => [
    (bestNumber.gt(end) || isWinner) ? ar : ar.iadd(raised),
    (bestNumber.gt(end) || isWinner) ? ac : ac.iadd(cap),
    tr.iadd(raised),
    tc.iadd(cap)
  ], [new BN(0), new BN(0), new BN(0), new BN(0)]);
  const hasNewActiveCap = !prev.activeCap.eq(activeCap);
  const hasNewActiveRaised = !prev.activeRaised.eq(activeRaised);
  const hasNewTotalCap = !prev.totalCap.eq(totalCap);
  const hasNewTotalRaised = !prev.totalRaised.eq(totalRaised);
  const hasChanged =
    !prev.funds || prev.funds.length !== funds.length ||
    hasNewActiveCap || hasNewActiveRaised || hasNewTotalCap || hasNewTotalRaised ||
    funds.some((c) => isFundUpdated(bestNumber, minContribution, c, leased, prev));

  if (!hasChanged) {
    return prev;
  }

  return {
    activeCap: hasNewActiveCap
      ? activeCap
      : prev.activeCap,
    activeRaised: hasNewActiveRaised
      ? activeRaised
      : prev.activeRaised,
    funds: funds
      .map((c) => updateFund(bestNumber, minContribution, c, leased))
      .sort(sortCampaigns),
    totalCap: hasNewTotalCap
      ? totalCap
      : prev.totalCap,
    totalRaised: hasNewTotalRaised
      ? totalRaised
      : prev.totalRaised
  };
}

const optFundMulti = {
  transform: ([[allyIds], optFunds]: [[AllyId[]], Option<FundInfo>[]]): Campaign[] =>
    allyIds
      .map((allyId, i): [AllyId, FundInfo | null] => [allyId, optFunds[i].unwrapOr(null)])
      .filter((v): v is [AllyId, FundInfo] => !!v[1])
      .map(([allyId, info]): Campaign => ({
        accountId: encodeAddress(createAddress(allyId)),
        firstSlot: info.firstPeriod,
        info,
        isCrowdloan: true,
        key: allyId.toString(),
        lastSlot: info.lastPeriod,
        allyId,
        value: info.raised
      }))
      .sort((a, b) =>
        a.info.end.cmp(b.info.end) ||
        a.info.firstPeriod.cmp(b.info.firstPeriod) ||
        a.info.lastPeriod.cmp(b.info.lastPeriod) ||
        a.allyId.cmp(b.allyId)
      ),
  withParamsTransform: true
};

const optLeaseMulti = {
  transform: ([[allyIds], leases]: [[AllyId[]], Option<ITuple<[AccountId, BalanceOf]>>[][]]): AllyId[] =>
    allyIds.filter((allyId, i) =>
      leases[i]
        .map((o) => o.unwrapOr(null))
        .filter((v): v is ITuple<[AccountId, BalanceOf]> => !!v)
        .filter(([accountId]) => isCrowdloadAccount(allyId, accountId))
        .length !== 0
    ),
  withParamsTransform: true
};

function extractFundIds (keys: StorageKey<[AllyId]>[]): AllyId[] {
  return keys.map(({ args: [allyId] }) => allyId);
}

export default function useFunds (): Campaigns {
  const { api } = useApi();
  const bestNumber = useBestNumber();
  const mountedRef = useIsMountedRef();
  const trigger = useEventTrigger([api.events.crowdloan?.Created]);
  const allyIds = useMapKeys(api.query.crowdloan?.funds, { at: trigger.blockHash, transform: extractFundIds });
  const campaigns = useCall<Campaign[]>(api.query.crowdloan?.funds.multi, [allyIds], optFundMulti);
  const leases = useCall<AllyId[]>(api.query.slots.leases.multi, [allyIds], optLeaseMulti);
  const [result, setResult] = useState<Campaigns>(EMPTY);

  // here we manually add the actual ending status and calculate the totals
  useEffect((): void => {
    mountedRef.current && bestNumber && campaigns && leases && setResult((prev) =>
      createResult(bestNumber, api.consts.crowdloan.minContribution as BlockNumber, campaigns, leases, prev)
    );
  }, [api, bestNumber, campaigns, leases, mountedRef]);

  return result;
}
