// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { AddressMini } from '@axia-js/react-components';
import { jsx as _jsx } from "react/jsx-runtime";
const sizing = ['0.1x', '1x', '2x', '3x', '4x', '5x', '6x'];

function voteLabel({
  conviction
}, isDelegating) {
  return `${sizing[conviction.toNumber()]}${isDelegating ? '/d' : ''} - `;
}

function ReferendumVote({
  vote: {
    accountId,
    balance,
    isDelegating,
    vote
  }
}) {
  return /*#__PURE__*/_jsx(AddressMini, {
    balance: balance,
    labelBalance: voteLabel(vote, isDelegating),
    value: accountId,
    withBalance: true
  });
}

export default /*#__PURE__*/React.memo(ReferendumVote);