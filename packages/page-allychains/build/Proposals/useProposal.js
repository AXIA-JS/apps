// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useMemo } from 'react';
import { useApi, useCall } from '@axia-js/react-hooks';
export default function useProposal(id, approvedIds, scheduled) {
  const {
    api
  } = useApi();
  const opt = useCall(api.query.proposeAllychain.proposals, [id]);
  return useMemo(() => ({
    id,
    isApproved: approvedIds.some(a => a.eq(id)),
    isScheduled: scheduled.some(({
      scheduledIds
    }) => scheduledIds.some(s => s.eq(id))),
    proposal: opt && opt.isSome ? opt.unwrap() : undefined
  }), [approvedIds, id, opt, scheduled]);
}