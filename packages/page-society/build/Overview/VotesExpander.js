// Copyright 2017-2021 @axia-js/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { AddressMini, Expander } from '@axia-js/react-components';
import { jsx as _jsx } from "react/jsx-runtime";

function VotesExpander({
  label,
  votes
}) {
  if (votes.length === 0) {
    return null;
  }

  return /*#__PURE__*/_jsx(Expander, {
    summary: `${label} (${votes.length})`,
    children: votes.map(([who]) => /*#__PURE__*/_jsx(AddressMini, {
      value: who
    }, who.toString()))
  });
}

export default /*#__PURE__*/React.memo(VotesExpander);