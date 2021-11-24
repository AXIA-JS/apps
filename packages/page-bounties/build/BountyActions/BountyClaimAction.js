// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import { useBounties } from '@axia-js/app-bounties/hooks';
import { TxButton } from '@axia-js/react-components';
import { useAccounts } from '@axia-js/react-hooks';
import { isClaimable } from "../helpers/index.js";
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";

function BountyClaimAction({
  beneficiaryId,
  index,
  payoutDue
}) {
  const {
    t
  } = useTranslation();
  const {
    claimBounty
  } = useBounties();
  const {
    allAccounts
  } = useAccounts();
  const isBountyClaimable = useMemo(() => isClaimable(allAccounts, beneficiaryId, payoutDue), [allAccounts, beneficiaryId, payoutDue]);
  return isBountyClaimable ? /*#__PURE__*/_jsx(TxButton, {
    accountId: beneficiaryId,
    icon: "plus",
    label: t('Claim'),
    params: [index],
    tx: claimBounty
  }) : null;
}

export default /*#__PURE__*/React.memo(BountyClaimAction);