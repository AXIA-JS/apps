// Copyright 2017-2021 @axia-js/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useRef } from 'react';
import { AddressSmall, Table } from '@axia-js/react-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import DefenderVoting from "./DefenderVoting.js";
import Votes from "./Votes.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const transformVotes = {
  transform: members => members.filter(({
    vote
  }) => !!vote).map(({
    accountId,
    vote
  }) => [accountId.toString(), vote])
};

function Defender({
  className = '',
  info,
  isMember,
  ownMembers
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const votes = useCall(api.derive.society.members, undefined, transformVotes);
  const headerRef = useRef([[t('defender'), 'start'], [undefined, 'expand'], []]);

  if (!info || !info.hasDefender || !info.defender) {
    return null;
  }

  return /*#__PURE__*/_jsx(Table, {
    className: className,
    header: headerRef.current,
    children: /*#__PURE__*/_jsxs("tr", {
      children: [/*#__PURE__*/_jsx("td", {
        className: "address all",
        children: /*#__PURE__*/_jsx(AddressSmall, {
          value: info.defender
        })
      }), /*#__PURE__*/_jsx(Votes, {
        votes: votes
      }), /*#__PURE__*/_jsx("td", {
        className: "button",
        children: /*#__PURE__*/_jsx(DefenderVoting, {
          isMember: isMember,
          ownMembers: ownMembers
        })
      })]
    })
  });
}

export default /*#__PURE__*/React.memo(Defender);