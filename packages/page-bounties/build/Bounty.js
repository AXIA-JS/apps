// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { AddressSmall, ExpandButton, LinkExternal } from '@axia-js/react-components';
import { FormatBalance } from '@axia-js/react-query';
import { formatNumber } from '@axia-js/util';
import BountyActionMessage from "./BountyNextActionInfo/BountyActionMessage.js";
import { getProposalToDisplay } from "./helpers/extendedStatuses.js";
import { BountyActions } from "./BountyActions/index.js";
import BountyExtraActions from "./BountyExtraActions/index.js";
import BountyInfos from "./BountyInfos/index.js";
import BountyStatusView from "./BountyStatusView.js";
import Curator from "./Curator.js";
import DueBlocks from "./DueBlocks.js";
import { useBountyStatus } from "./hooks/index.js";
import { useTranslation } from "./translate.js";
import VotersColumn from "./VotersColumn.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const EMPTY_CELL = '-';

function Bounty({
  bestNumber,
  bounty,
  className = '',
  description,
  index,
  proposals
}) {
  const {
    t
  } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    bond,
    curatorDeposit,
    fee,
    proposer,
    status,
    value
  } = bounty;
  const {
    beneficiary,
    bountyStatus,
    curator,
    unlockAt,
    updateDue
  } = useBountyStatus(status);
  const blocksUntilUpdate = useMemo(() => updateDue === null || updateDue === void 0 ? void 0 : updateDue.sub(bestNumber), [bestNumber, updateDue]);
  const blocksUntilPayout = useMemo(() => unlockAt === null || unlockAt === void 0 ? void 0 : unlockAt.sub(bestNumber), [bestNumber, unlockAt]);
  const curatorToRender = useMemo(() => {
    if (curator) {
      return {
        curator,
        isFromProposal: false
      };
    }

    const proposalToDisplay = proposals && getProposalToDisplay(proposals, status);
    return (proposalToDisplay === null || proposalToDisplay === void 0 ? void 0 : proposalToDisplay.proposal.method) === 'proposeCurator' ? {
      curator: proposalToDisplay.proposal.args[1],
      isFromProposal: true
    } : null;
  }, [curator, proposals, status]);
  const handleOnIconClick = useCallback(() => setIsExpanded(isExpanded => !isExpanded), []);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs("tr", {
      className: `${className}${isExpanded ? ' noBorder' : ''}`,
      children: [/*#__PURE__*/_jsx("td", {
        className: "number",
        children: /*#__PURE__*/_jsx("h1", {
          children: formatNumber(index)
        })
      }), /*#__PURE__*/_jsx("td", {
        className: "description-column",
        "data-testid": "description",
        children: /*#__PURE__*/_jsx("div", {
          title: description,
          children: description
        })
      }), /*#__PURE__*/_jsx("td", {
        children: /*#__PURE__*/_jsx(BountyStatusView, {
          bountyStatus: bountyStatus
        })
      }), /*#__PURE__*/_jsx("td", {
        children: /*#__PURE__*/_jsx(FormatBalance, {
          value: value
        })
      }), /*#__PURE__*/_jsx("td", {
        children: curatorToRender && /*#__PURE__*/_jsx(Curator, {
          curator: curatorToRender.curator,
          isFromProposal: curatorToRender.isFromProposal
        })
      }), /*#__PURE__*/_jsxs("td", {
        children: [blocksUntilPayout && unlockAt && /*#__PURE__*/_jsx(DueBlocks, {
          dueBlocks: blocksUntilPayout,
          endBlock: unlockAt,
          label: t('payout')
        }), blocksUntilUpdate && updateDue && /*#__PURE__*/_jsx(DueBlocks, {
          dueBlocks: blocksUntilUpdate,
          endBlock: updateDue,
          label: t('update')
        }), /*#__PURE__*/_jsx(BountyActionMessage, {
          bestNumber: bestNumber,
          blocksUntilUpdate: blocksUntilUpdate,
          status: status
        })]
      }), /*#__PURE__*/_jsx("td", {
        className: "td-info-action-row",
        children: /*#__PURE__*/_jsxs("div", {
          className: "td-row",
          children: [/*#__PURE__*/_jsx(BountyInfos, {
            beneficiary: beneficiary,
            proposals: proposals,
            status: status
          }), /*#__PURE__*/_jsx("div", {
            className: "bounty-action-row",
            children: /*#__PURE__*/_jsx(BountyActions, {
              bestNumber: bestNumber,
              description: description,
              fee: fee,
              index: index,
              proposals: proposals,
              status: status,
              value: value
            })
          })]
        })
      }), /*#__PURE__*/_jsx("td", {
        className: "fast-actions",
        children: /*#__PURE__*/_jsxs("div", {
          className: "fast-actions-row",
          children: [/*#__PURE__*/_jsx(LinkExternal, {
            data: index,
            isLogo: true,
            type: "bounty"
          }), /*#__PURE__*/_jsx(BountyExtraActions, {
            bestNumber: bestNumber,
            description: description,
            index: index,
            proposals: proposals,
            status: status
          }), /*#__PURE__*/_jsx(ExpandButton, {
            expanded: isExpanded,
            onClick: handleOnIconClick
          })]
        })
      })]
    }), /*#__PURE__*/_jsxs("tr", {
      className: `${className} ${isExpanded ? 'isExpanded' : 'isCollapsed'}`,
      children: [/*#__PURE__*/_jsx("td", {
        colSpan: 2,
        children: /*#__PURE__*/_jsxs("div", {
          className: "label-column-left",
          children: [/*#__PURE__*/_jsx("div", {
            className: "label",
            children: t('Proposer')
          }), /*#__PURE__*/_jsx(AddressSmall, {
            value: proposer
          })]
        })
      }), /*#__PURE__*/_jsxs("td", {
        colSpan: 2,
        children: [/*#__PURE__*/_jsxs("div", {
          className: "label-column-right",
          children: [/*#__PURE__*/_jsx("div", {
            className: "label",
            children: t('Bond')
          }), /*#__PURE__*/_jsx("div", {
            className: "inline-balance",
            children: /*#__PURE__*/_jsx(FormatBalance, {
              value: bond
            })
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "label-column-right",
          children: [/*#__PURE__*/_jsx("div", {
            className: "label",
            children: t("Curator's fee")
          }), /*#__PURE__*/_jsx("div", {
            className: "inline-balance",
            children: curator ? /*#__PURE__*/_jsx(FormatBalance, {
              value: fee
            }) : EMPTY_CELL
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "label-column-right",
          children: [/*#__PURE__*/_jsx("div", {
            className: "label",
            children: t("Curator's deposit")
          }), /*#__PURE__*/_jsx("div", {
            className: "inline-balance",
            children: curator ? /*#__PURE__*/_jsx(FormatBalance, {
              value: curatorDeposit
            }) : EMPTY_CELL
          })]
        })]
      }), /*#__PURE__*/_jsx("td", {}), /*#__PURE__*/_jsx("td", {}), /*#__PURE__*/_jsx("td", {
        children: proposals && /*#__PURE__*/_jsxs("div", {
          className: "votes-table",
          children: [/*#__PURE__*/_jsx(VotersColumn, {
            option: 'ayes',
            proposals: proposals,
            status: status
          }), /*#__PURE__*/_jsx(VotersColumn, {
            option: 'nays',
            proposals: proposals,
            status: status
          })]
        })
      }), /*#__PURE__*/_jsx("td", {})]
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Bounty).withConfig({
  displayName: "Bounty",
  componentId: "sc-5ng49n-0"
})(["&.isCollapsed{visibility:collapse;}&.isExpanded{visibility:visible;}.description-column{max-width:200px;div{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}}& .links{display:inline-flex;}& td.fast-actions{padding-left:0.2rem;width:1%;.fast-actions-row{display:flex;align-items:center;justify-content:flex-end;& > * + *{margin-left:0.285rem;}}}& .inline-balance{width:50%;font-size:1rem;line-height:normal;}.label{text-align:right;padding:0 1.7rem 0 0;line-height:normal;color:var(--color-label);text-transform:lowercase;}.label-column-right,.label-column-left{display:flex;align-items:center;.label{width:50%;}}.label-column-right{padding:0 0 0.5rem;}.label-column-left{padding:0 0 0.5rem;}& .td-info-action-row{padding-right:0;}.td-row{display:flex;justify-content:space-between;align-items:center;&:only-child{margin-left:auto;}}.bounty-action-row{display:flex;justify-content:flex-end;align-items:center;& > * + *{margin-left:0.6rem;}}.block-to-time{font-size:0.7rem;line-height:1.5rem;color:var(--color-label);}& .votes-table{display:flex;justify-content:space-between;}"]));