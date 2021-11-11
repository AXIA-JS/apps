// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
import BN from 'bn.js';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Badge, Button, Icon, LinkExternal } from '@axia-js/react-components';
import { useAccounts, useApi, useBestNumber, useCall } from '@axia-js/react-hooks';
import { BlockToTime } from '@axia-js/react-query';
import { BN_ONE, formatNumber, isBoolean } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import useChangeCalc from "../useChangeCalc.js";
import PreImageButton from "./PreImageButton.js";
import ProposalCell from "./ProposalCell.js";
import ReferendumVotes from "./ReferendumVotes.js";
import Voting from "./Voting.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function Referendum({
  className = '',
  value: {
    allAye,
    allNay,
    image,
    imageHash,
    index,
    isPassing,
    status,
    voteCountAye,
    voteCountNay,
    votedAye,
    votedNay,
    votedTotal
  }
}) {
  var _api$query$balances;

  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const {
    allAccounts
  } = useAccounts();
  const bestNumber = useBestNumber();
  const totalIssuance = useCall((_api$query$balances = api.query.balances) === null || _api$query$balances === void 0 ? void 0 : _api$query$balances.totalIssuance);
  const {
    changeAye,
    changeNay
  } = useChangeCalc(status.threshold, votedAye, votedNay, votedTotal);
  const threshold = useMemo(() => status.threshold.type.toString().replace('majority', ' majority '), [status]);
  const [percentages, {
    hasVoted,
    hasVotedAye
  }] = useMemo(() => {
    if (totalIssuance) {
      const aye = allAye.reduce((total, {
        balance
      }) => total.add(balance), new BN(0));
      const nay = allNay.reduce((total, {
        balance
      }) => total.add(balance), new BN(0));
      const hasVotedAye = allAye.some(({
        accountId
      }) => allAccounts.includes(accountId.toString()));
      return [{
        aye: votedTotal.isZero() ? '' : `${(aye.muln(10000).div(votedTotal).toNumber() / 100).toFixed(2)}%`,
        nay: votedTotal.isZero() ? '' : `${(nay.muln(10000).div(votedTotal).toNumber() / 100).toFixed(2)}%`,
        turnout: `${(votedTotal.muln(10000).div(totalIssuance).toNumber() / 100).toFixed(2)}%`
      }, {
        hasVoted: hasVotedAye || allNay.some(({
          accountId
        }) => allAccounts.includes(accountId.toString())),
        hasVotedAye
      }];
    } else {
      return [null, {
        hasVoted: false,
        hasVotedAye: false
      }];
    }
  }, [allAccounts, allAye, allNay, totalIssuance, votedTotal]);

  if (!bestNumber || status.end.sub(bestNumber).lten(0)) {
    return null;
  }

  const enactBlock = status.end.add(status.delay);
  const remainBlock = status.end.sub(bestNumber).isub(BN_ONE);
  return /*#__PURE__*/_jsxs("tr", {
    className: className,
    children: [/*#__PURE__*/_jsx("td", {
      className: "number",
      children: /*#__PURE__*/_jsx("h1", {
        children: formatNumber(index)
      })
    }), /*#__PURE__*/_jsx(ProposalCell, {
      imageHash: imageHash,
      proposal: image === null || image === void 0 ? void 0 : image.proposal
    }), /*#__PURE__*/_jsxs("td", {
      className: "number together media--1200",
      children: [/*#__PURE__*/_jsx(BlockToTime, {
        value: remainBlock
      }), t('{{blocks}} blocks', {
        replace: {
          blocks: formatNumber(remainBlock)
        }
      })]
    }), /*#__PURE__*/_jsxs("td", {
      className: "number together media--1400",
      children: [/*#__PURE__*/_jsx(BlockToTime, {
        value: enactBlock.sub(bestNumber)
      }), "#", formatNumber(enactBlock)]
    }), /*#__PURE__*/_jsx("td", {
      className: "number together media--1400",
      children: percentages && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx("div", {
          children: percentages.turnout
        }), percentages.aye && /*#__PURE__*/_jsx("div", {
          children: t('{{percentage}} aye', {
            replace: {
              percentage: percentages.aye
            }
          })
        })]
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "badge",
      children: isBoolean(isPassing) && /*#__PURE__*/_jsx(Badge, {
        color: isPassing ? 'green' : 'red',
        hover: isPassing ? t('{{threshold}}, passing', {
          replace: {
            threshold
          }
        }) : t('{{threshold}}, not passing', {
          replace: {
            threshold
          }
        }),
        icon: isPassing ? 'check' : 'times'
      })
    }), /*#__PURE__*/_jsxs("td", {
      className: "expand",
      children: [/*#__PURE__*/_jsx(ReferendumVotes, {
        change: changeAye,
        count: voteCountAye,
        isAye: true,
        isWinning: isPassing,
        total: votedAye,
        votes: allAye
      }), /*#__PURE__*/_jsx(ReferendumVotes, {
        change: changeNay,
        count: voteCountNay,
        isAye: false,
        isWinning: !isPassing,
        total: votedNay,
        votes: allNay
      })]
    }), /*#__PURE__*/_jsx("td", {
      className: "button",
      children: /*#__PURE__*/_jsxs(Button.Group, {
        children: [!(image !== null && image !== void 0 && image.proposal) && /*#__PURE__*/_jsx(PreImageButton, {
          imageHash: imageHash
        }), /*#__PURE__*/_jsx(Voting, {
          proposal: image === null || image === void 0 ? void 0 : image.proposal,
          referendumId: index
        })]
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "badge",
      children: /*#__PURE__*/_jsx(Icon, {
        color: hasVoted ? hasVotedAye ? 'green' : 'red' : 'gray',
        icon: "asterisk"
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "links media--1000",
      children: /*#__PURE__*/_jsx(LinkExternal, {
        data: index,
        isLogo: true,
        type: "referendum"
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Referendum).withConfig({
  displayName: "Referendum",
  componentId: "sc-eg3al4-0"
})([".democracy--Referendum-results{margin-bottom:1em;&.chart{text-align:center;}}"]));