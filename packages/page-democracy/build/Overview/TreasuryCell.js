// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useState } from 'react';
import { InputAddress, InputBalance } from '@axia-js/react-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import Params from '@axia-js/react-params';
import { getTypeDef } from '@axia-js/types/create';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const DEFAULT_PARAMS = {
  params: [],
  values: []
};
const transformProposal = {
  transform: optProp => optProp.unwrapOr(null)
};

function TreasuryCell({
  className = '',
  value
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [proposalId] = useState(() => value.unwrap());
  const proposal = useCall(api.query.treasury.proposals, [proposalId], transformProposal);
  const [{
    params,
    values
  }, setExtracted] = useState(DEFAULT_PARAMS);
  useEffect(() => {
    proposal && setExtracted({
      params: [{
        name: 'proposal',
        type: getTypeDef('TreasuryProposal')
      }],
      values: [{
        isValid: true,
        value: proposal
      }]
    });
  }, [proposal]);

  if (!proposal) {
    return null;
  }

  return /*#__PURE__*/_jsx("div", {
    className: className,
    children: /*#__PURE__*/_jsxs(Params, {
      isDisabled: true,
      params: params,
      values: values,
      children: [/*#__PURE__*/_jsx(InputAddress, {
        defaultValue: proposal.beneficiary,
        isDisabled: true,
        label: t('beneficiary')
      }), /*#__PURE__*/_jsx(InputBalance, {
        defaultValue: proposal.value,
        isDisabled: true,
        label: t('payout')
      })]
    })
  });
}

export default /*#__PURE__*/React.memo(TreasuryCell);