"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bn = _interopRequireDefault(require("bn.js"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _reactQuery = require("@axia-js/react-query");

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _useChangeCalc = _interopRequireDefault(require("../useChangeCalc.cjs"));

var _PreImageButton = _interopRequireDefault(require("./PreImageButton.cjs"));

var _ProposalCell = _interopRequireDefault(require("./ProposalCell.cjs"));

var _ReferendumVotes = _interopRequireDefault(require("./ReferendumVotes.cjs"));

var _Voting = _interopRequireDefault(require("./Voting.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Referendum(_ref) {
  var _api$query$balances;

  let {
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
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const {
    allAccounts
  } = (0, _reactHooks.useAccounts)();
  const bestNumber = (0, _reactHooks.useBestNumber)();
  const totalIssuance = (0, _reactHooks.useCall)((_api$query$balances = api.query.balances) === null || _api$query$balances === void 0 ? void 0 : _api$query$balances.totalIssuance);
  const {
    changeAye,
    changeNay
  } = (0, _useChangeCalc.default)(status.threshold, votedAye, votedNay, votedTotal);
  const threshold = (0, _react.useMemo)(() => status.threshold.type.toString().replace('majority', ' majority '), [status]);
  const [percentages, {
    hasVoted,
    hasVotedAye
  }] = (0, _react.useMemo)(() => {
    if (totalIssuance) {
      const aye = allAye.reduce((total, _ref2) => {
        let {
          balance
        } = _ref2;
        return total.add(balance);
      }, new _bn.default(0));
      const nay = allNay.reduce((total, _ref3) => {
        let {
          balance
        } = _ref3;
        return total.add(balance);
      }, new _bn.default(0));
      const hasVotedAye = allAye.some(_ref4 => {
        let {
          accountId
        } = _ref4;
        return allAccounts.includes(accountId.toString());
      });
      return [{
        aye: votedTotal.isZero() ? '' : `${(aye.muln(10000).div(votedTotal).toNumber() / 100).toFixed(2)}%`,
        nay: votedTotal.isZero() ? '' : `${(nay.muln(10000).div(votedTotal).toNumber() / 100).toFixed(2)}%`,
        turnout: `${(votedTotal.muln(10000).div(totalIssuance).toNumber() / 100).toFixed(2)}%`
      }, {
        hasVoted: hasVotedAye || allNay.some(_ref5 => {
          let {
            accountId
          } = _ref5;
          return allAccounts.includes(accountId.toString());
        }),
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
  const remainBlock = status.end.sub(bestNumber).isub(_util.BN_ONE);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("h1", {
        children: (0, _util.formatNumber)(index)
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProposalCell.default, {
      imageHash: imageHash,
      proposal: image === null || image === void 0 ? void 0 : image.proposal
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("td", {
      className: "number together media--1200",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.BlockToTime, {
        value: remainBlock
      }), t('{{blocks}} blocks', {
        replace: {
          blocks: (0, _util.formatNumber)(remainBlock)
        }
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("td", {
      className: "number together media--1400",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.BlockToTime, {
        value: enactBlock.sub(bestNumber)
      }), "#", (0, _util.formatNumber)(enactBlock)]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number together media--1400",
      children: percentages && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          children: percentages.turnout
        }), percentages.aye && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          children: t('{{percentage}} aye', {
            replace: {
              percentage: percentages.aye
            }
          })
        })]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "badge",
      children: (0, _util.isBoolean)(isPassing) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Badge, {
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
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("td", {
      className: "expand",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ReferendumVotes.default, {
        change: changeAye,
        count: voteCountAye,
        isAye: true,
        isWinning: isPassing,
        total: votedAye,
        votes: allAye
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ReferendumVotes.default, {
        change: changeNay,
        count: voteCountNay,
        isAye: false,
        isWinning: !isPassing,
        total: votedNay,
        votes: allNay
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "button",
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Button.Group, {
        children: [!(image !== null && image !== void 0 && image.proposal) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_PreImageButton.default, {
          imageHash: imageHash
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Voting.default, {
          proposal: image === null || image === void 0 ? void 0 : image.proposal,
          referendumId: index
        })]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "badge",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Icon, {
        color: hasVoted ? hasVotedAye ? 'green' : 'red' : 'gray',
        icon: "asterisk"
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "links media--1000",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.LinkExternal, {
        data: index,
        isLogo: true,
        type: "referendum"
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Referendum).withConfig({
  displayName: "Referendum",
  componentId: "sc-2qoioe-0"
})([".democracy--Referendum-results{margin-bottom:1em;&.chart{text-align:center;}}"]));

exports.default = _default;