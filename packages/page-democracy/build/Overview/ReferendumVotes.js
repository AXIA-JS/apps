// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import { Expander } from '@axia-js/react-components';
import { FormatBalance } from '@axia-js/react-query';
import { BN_TEN, formatNumber } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import ReferendumVote from "./ReferendumVote.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const LOCKS = [1, 10, 20, 30, 40, 50, 60];

function ReferendumVotes({
  change,
  className,
  count,
  isAye,
  isWinning,
  total,
  votes
}) {
  const {
    t
  } = useTranslation();
  const sorted = useMemo(() => votes.sort((a, b) => {
    const ta = a.balance.muln(LOCKS[a.vote.conviction.toNumber()]).div(BN_TEN);
    const tb = b.balance.muln(LOCKS[b.vote.conviction.toNumber()]).div(BN_TEN);
    return tb.cmp(ta);
  }), [votes]);
  return /*#__PURE__*/_jsx(Expander, {
    className: className,
    help: change.gtn(0) && /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(FormatBalance, {
        value: change
      }), /*#__PURE__*/_jsx("p", {
        children: isWinning ? t('The amount this total can be reduced by to change the referendum outcome. This assumes changes to the convictions of the existing votes, with no additional turnout.') : t('The amount this total should be increased by to change the referendum outcome. This assumes additional turnout with new votes at 1x conviction.')
      })]
    }),
    helpIcon: isWinning ? 'arrow-circle-down' : 'arrow-circle-up',
    summary: /*#__PURE__*/_jsxs(_Fragment, {
      children: [isAye ? t('Aye {{count}}', {
        replace: {
          count: count ? ` (${formatNumber(count)})` : ''
        }
      }) : t('Nay {{count}}', {
        replace: {
          count: count ? ` (${formatNumber(count)})` : ''
        }
      }), /*#__PURE__*/_jsx("div", {
        children: /*#__PURE__*/_jsx(FormatBalance, {
          value: total
        })
      })]
    }),
    children: sorted.map(vote => /*#__PURE__*/_jsx(ReferendumVote, {
      vote: vote
    }, vote.accountId.toString()))
  });
}

export default /*#__PURE__*/React.memo(ReferendumVotes);