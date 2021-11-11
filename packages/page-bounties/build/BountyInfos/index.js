// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import { AddressSmall } from '@axia-js/react-components';
import Description from "../Description.js";
import { getProposalToDisplay } from "../helpers/extendedStatuses.js";
import { useTranslation } from "../translate.js";
import VotingSummary from "./VotingSummary.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function BountyInfos({
  beneficiary,
  proposals,
  status
}) {
  const {
    t
  } = useTranslation();
  const proposalToDisplay = useMemo(() => proposals && getProposalToDisplay(proposals, status), [proposals, status]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [proposalToDisplay && /*#__PURE__*/_jsx(VotingSummary, {
      proposal: proposalToDisplay,
      status: status
    }), beneficiary && /*#__PURE__*/_jsxs("div", {
      children: [/*#__PURE__*/_jsx(AddressSmall, {
        value: beneficiary
      }), /*#__PURE__*/_jsx(Description, {
        description: t('Beneficiary')
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(BountyInfos);