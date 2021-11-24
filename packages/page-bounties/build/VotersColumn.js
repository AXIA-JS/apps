// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { AddressSmall, Icon } from '@axia-js/react-components';
import { getProposalToDisplay } from "./helpers/extendedStatuses.js";
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const icons = {
  ayes: 'check',
  nays: 'times'
};

function VotersColumn({
  className,
  option,
  proposals,
  status
}) {
  const {
    t
  } = useTranslation();
  const proposal = useMemo(() => getProposalToDisplay(proposals, status), [proposals, status]);
  const votes = useMemo(() => {
    var _proposal$votes, _proposal$votes2;

    return option === 'ayes' ? proposal === null || proposal === void 0 ? void 0 : (_proposal$votes = proposal.votes) === null || _proposal$votes === void 0 ? void 0 : _proposal$votes.ayes : proposal === null || proposal === void 0 ? void 0 : (_proposal$votes2 = proposal.votes) === null || _proposal$votes2 === void 0 ? void 0 : _proposal$votes2.nays;
  }, [proposal, option]);
  const voters = useMemo(() => votes === null || votes === void 0 ? void 0 : votes.map(accountId => /*#__PURE__*/_jsx("div", {
    className: "voter",
    "data-testid": `voters_${option}_${accountId.toString()}`,
    children: /*#__PURE__*/_jsx(AddressSmall, {
      value: accountId
    })
  }, accountId.toString())), [option, votes]);
  return /*#__PURE__*/_jsx(_Fragment, {
    children: proposal && /*#__PURE__*/_jsxs("div", {
      className: className,
      children: [/*#__PURE__*/_jsxs("div", {
        className: "vote-numbers",
        children: [/*#__PURE__*/_jsx("span", {
          className: "vote-numbers-icon",
          children: /*#__PURE__*/_jsx(Icon, {
            icon: icons[option]
          })
        }), /*#__PURE__*/_jsxs("span", {
          className: "vote-numbers-label",
          children: [option === 'ayes' && t('Aye: {{count}}', {
            replace: {
              count: votes ? votes.length : 0
            }
          }), option === 'nays' && t('Nay: {{count}}', {
            replace: {
              count: votes ? votes.length : 0
            }
          })]
        })]
      }), voters]
    })
  });
}

export default /*#__PURE__*/React.memo(styled(VotersColumn).withConfig({
  displayName: "VotersColumn",
  componentId: "sc-1j6g393-0"
})(["width:50%;.vote-numbers{display:flex;align-items:center;margin-bottom:0.85rem;}.vote-numbers-icon svg{max-width:10px;color:var(--color-label);}.vote-numbers-label{margin-left:0.75rem;font-weight:bold;font-size:0.7rem;line-height:0.85rem;text-transform:uppercase;color:var(--color-label);}"]));