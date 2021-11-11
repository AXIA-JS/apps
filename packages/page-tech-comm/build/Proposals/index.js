// Copyright 2017-2021 @axia-js/app-tech-comm authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useRef } from 'react';
import { Button, Table } from '@axia-js/react-components';
import { useTranslation } from "../translate.js";
import Proposal from "./Proposal.js";
import Propose from "./Propose.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Proposals({
  className = '',
  isMember,
  members,
  prime,
  proposalHashes,
  type
}) {
  const {
    t
  } = useTranslation();
  const headerRef = useRef([[t('proposals'), 'start', 2], [t('threshold')], [t('voting end')], [t('aye'), 'address'], [t('nay'), 'address'], []]);
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsx(Button.Group, {
      children: /*#__PURE__*/_jsx(Propose, {
        isMember: isMember,
        members: members,
        type: type
      })
    }), /*#__PURE__*/_jsx(Table, {
      empty: proposalHashes && t('No committee proposals'),
      header: headerRef.current,
      children: proposalHashes === null || proposalHashes === void 0 ? void 0 : proposalHashes.map(hash => /*#__PURE__*/_jsx(Proposal, {
        imageHash: hash,
        isMember: isMember,
        members: members,
        prime: prime,
        type: type
      }, hash.toHex()))
    })]
  });
}

export default /*#__PURE__*/React.memo(Proposals);