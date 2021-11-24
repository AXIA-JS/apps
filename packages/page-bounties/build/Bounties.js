// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useRef } from 'react';
import styled from 'styled-components';
import Summary from '@axia-js/app-bounties/Summary';
import { Button, Table } from '@axia-js/react-components';
import Bounty from "./Bounty.js";
import BountyCreate from "./BountyCreate.js";
import { useBounties } from "./hooks/index.js";
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Bounties({
  className
}) {
  const {
    t
  } = useTranslation();
  const {
    bestNumber,
    bounties
  } = useBounties();
  const headerRef = useRef([[t('bounties'), 'start', 3], [t('value'), 'start'], [t('curator'), 'start'], [t('next action'), 'start', 3]]);
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsx(Summary, {
      activeBounties: bounties === null || bounties === void 0 ? void 0 : bounties.length
    }), /*#__PURE__*/_jsx(Button.Group, {
      children: /*#__PURE__*/_jsx(BountyCreate, {})
    }), /*#__PURE__*/_jsx(Table, {
      className: "bounties-table-wrapper",
      empty: bounties && t('No open bounties'),
      header: headerRef.current,
      withCollapsibleRows: true,
      children: bounties && bestNumber && bounties.sort((a, b) => b.index.cmp(a.index)).map(({
        bounty,
        description,
        index,
        proposals
      }) => /*#__PURE__*/_jsx(Bounty, {
        bestNumber: bestNumber,
        bounty: bounty,
        description: description,
        index: index,
        proposals: proposals
      }, index.toNumber()))
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Bounties).withConfig({
  displayName: "Bounties",
  componentId: "sc-1j8xtga-0"
})([".bounties-table-wrapper table{tr{td,&:not(.filter) th{&:last-child{padding-right:1.14rem;}}}}.ui--IdentityIcon{margin-right:0.42rem;}.via-identity .name{font-size:1rem;line-height:1.7rem;text-transform:initial;filter:initial;opacity:1;}"]));