// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useMemo } from 'react';
import { useAccounts, useCollectiveMembers } from '@axia-js/react-hooks';
export function useUserRole(curatorId) {
  const {
    allAccounts,
    hasAccounts
  } = useAccounts();
  const {
    isMember
  } = useCollectiveMembers('council');
  const isCurator = useMemo(() => curatorId && allAccounts.includes(curatorId.toString()), [allAccounts, curatorId]);
  const roles = [];

  if (isCurator) {
    roles.push('Curator');
  }

  if (isMember) {
    roles.push('Member');
  }

  if (hasAccounts) {
    roles.push('User');
  }

  return {
    isCurator: !!isCurator,
    roles
  };
}