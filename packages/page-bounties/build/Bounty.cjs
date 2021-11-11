"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _reactQuery = require("@axia-js/react-query");

var _util = require("@axia-js/util");

var _BountyActionMessage = _interopRequireDefault(require("./BountyNextActionInfo/BountyActionMessage.cjs"));

var _extendedStatuses = require("./helpers/extendedStatuses.cjs");

var _index = require("./BountyActions/index.cjs");

var _index2 = _interopRequireDefault(require("./BountyExtraActions/index.cjs"));

var _index3 = _interopRequireDefault(require("./BountyInfos/index.cjs"));

var _BountyStatusView = _interopRequireDefault(require("./BountyStatusView.cjs"));

var _Curator = _interopRequireDefault(require("./Curator.cjs"));

var _DueBlocks = _interopRequireDefault(require("./DueBlocks.cjs"));

var _index4 = require("./hooks/index.cjs");

var _translate = require("./translate.cjs");

var _VotersColumn = _interopRequireDefault(require("./VotersColumn.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
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
  } = (0, _translate.useTranslation)();
  const [isExpanded, setIsExpanded] = (0, _react.useState)(false);
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
  } = (0, _index4.useBountyStatus)(status);
  const blocksUntilUpdate = (0, _react.useMemo)(() => updateDue === null || updateDue === void 0 ? void 0 : updateDue.sub(bestNumber), [bestNumber, updateDue]);
  const blocksUntilPayout = (0, _react.useMemo)(() => unlockAt === null || unlockAt === void 0 ? void 0 : unlockAt.sub(bestNumber), [bestNumber, unlockAt]);
  const curatorToRender = (0, _react.useMemo)(() => {
    if (curator) {
      return {
        curator,
        isFromProposal: false
      };
    }

    const proposalToDisplay = proposals && (0, _extendedStatuses.getProposalToDisplay)(proposals, status);
    return (proposalToDisplay === null || proposalToDisplay === void 0 ? void 0 : proposalToDisplay.proposal.method) === 'proposeCurator' ? {
      curator: proposalToDisplay.proposal.args[1],
      isFromProposal: true
    } : null;
  }, [curator, proposals, status]);
  const handleOnIconClick = (0, _react.useCallback)(() => setIsExpanded(isExpanded => !isExpanded), []);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
      className: `${className}${isExpanded ? ' noBorder' : ''}`,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "number",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("h1", {
          children: (0, _util.formatNumber)(index)
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "description-column",
        "data-testid": "description",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          title: description,
          children: description
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_BountyStatusView.default, {
          bountyStatus: bountyStatus
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
          value: value
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        children: curatorToRender && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Curator.default, {
          curator: curatorToRender.curator,
          isFromProposal: curatorToRender.isFromProposal
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("td", {
        children: [blocksUntilPayout && unlockAt && /*#__PURE__*/(0, _jsxRuntime.jsx)(_DueBlocks.default, {
          dueBlocks: blocksUntilPayout,
          endBlock: unlockAt,
          label: t('payout')
        }), blocksUntilUpdate && updateDue && /*#__PURE__*/(0, _jsxRuntime.jsx)(_DueBlocks.default, {
          dueBlocks: blocksUntilUpdate,
          endBlock: updateDue,
          label: t('update')
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_BountyActionMessage.default, {
          bestNumber: bestNumber,
          blocksUntilUpdate: blocksUntilUpdate,
          status: status
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "td-info-action-row",
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "td-row",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.default, {
            beneficiary: beneficiary,
            proposals: proposals,
            status: status
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "bounty-action-row",
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.BountyActions, {
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
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "fast-actions",
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "fast-actions-row",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.LinkExternal, {
            data: index,
            isLogo: true,
            type: "bounty"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.default, {
            bestNumber: bestNumber,
            description: description,
            index: index,
            proposals: proposals,
            status: status
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.ExpandButton, {
            expanded: isExpanded,
            onClick: handleOnIconClick
          })]
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
      className: `${className} ${isExpanded ? 'isExpanded' : 'isCollapsed'}`,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        colSpan: 2,
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "label-column-left",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "label",
            children: t('Proposer')
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressSmall, {
            value: proposer
          })]
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("td", {
        colSpan: 2,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "label-column-right",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "label",
            children: t('Bond')
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "inline-balance",
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
              value: bond
            })
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "label-column-right",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "label",
            children: t("Curator's fee")
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "inline-balance",
            children: curator ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
              value: fee
            }) : EMPTY_CELL
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "label-column-right",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "label",
            children: t("Curator's deposit")
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "inline-balance",
            children: curator ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
              value: curatorDeposit
            }) : EMPTY_CELL
          })]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {}), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {}), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        children: proposals && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "votes-table",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_VotersColumn.default, {
            option: 'ayes',
            proposals: proposals,
            status: status
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_VotersColumn.default, {
            option: 'nays',
            proposals: proposals,
            status: status
          })]
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {})]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Bounty).withConfig({
  displayName: "Bounty",
  componentId: "sc-1o2wxac-0"
})(["&.isCollapsed{visibility:collapse;}&.isExpanded{visibility:visible;}.description-column{max-width:200px;div{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}}& .links{display:inline-flex;}& td.fast-actions{padding-left:0.2rem;width:1%;.fast-actions-row{display:flex;align-items:center;justify-content:flex-end;& > * + *{margin-left:0.285rem;}}}& .inline-balance{width:50%;font-size:1rem;line-height:normal;}.label{text-align:right;padding:0 1.7rem 0 0;line-height:normal;color:var(--color-label);text-transform:lowercase;}.label-column-right,.label-column-left{display:flex;align-items:center;.label{width:50%;}}.label-column-right{padding:0 0 0.5rem;}.label-column-left{padding:0 0 0.5rem;}& .td-info-action-row{padding-right:0;}.td-row{display:flex;justify-content:space-between;align-items:center;&:only-child{margin-left:auto;}}.bounty-action-row{display:flex;justify-content:flex-end;align-items:center;& > * + *{margin-left:0.6rem;}}.block-to-time{font-size:0.7rem;line-height:1.5rem;color:var(--color-label);}& .votes-table{display:flex;justify-content:space-between;}"]));

exports.default = _default;