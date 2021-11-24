// Copyright 2017-2021 @axia-js/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useEffect, useState } from 'react';
import { useAccounts, useApi, useCall } from '@axia-js/react-hooks';
const EMPTY_MEMBERS = {
  allMembers: [],
  isMember: false,
  ownMembers: []
};

function transform(allAccounts, members) {
  const allMembers = members.filter(({
    isSuspended
  }) => !isSuspended).map(({
    accountId
  }) => accountId.toString());
  const ownMembers = allMembers.filter(a => allAccounts.includes(a));
  return {
    allMembers,
    isMember: ownMembers.length !== 0,
    ownMembers
  };
}

export default function useMembers() {
  const {
    api
  } = useApi();
  const {
    allAccounts
  } = useAccounts();
  const [state, setState] = useState(EMPTY_MEMBERS);
  const members = useCall(api.derive.society.members);
  useEffect(() => {
    allAccounts && members && setState(transform(allAccounts, members));
  }, [allAccounts, members]);
  return state;
}