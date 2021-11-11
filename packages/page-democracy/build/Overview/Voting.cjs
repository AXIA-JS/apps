"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Voting({
  proposal,
  referendumId
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const {
    hasAccounts
  } = (0, _reactHooks.useAccounts)();
  const [accountId, setAccountId] = (0, _react.useState)(null);
  const [balance, setBalance] = (0, _react.useState)();
  const [conviction, setConviction] = (0, _react.useState)(0);
  const [isVotingOpen, toggleVoting] = (0, _reactHooks.useToggle)();
  const isCurrentVote = (0, _react.useMemo)(() => !!api.query.democracy.votingOf, [api]);

  if (!hasAccounts) {
    return null;
  }

  const isDisabled = isCurrentVote ? !balance : false;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [isVotingOpen && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
      header: t('Vote on proposal'),
      onClose: toggleVoting,
      size: "large",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('If this proposal is passed, the changes will be applied via dispatch and the deposit returned.'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.ProposedAction, {
            idNumber: referendumId,
            proposal: proposal
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('The vote will be recorded for this account. If another account delegated to this one, the delegated votes will also be counted.'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.VoteAccount, {
            onChange: setAccountId
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
          hint: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
              children: t('The balance associated with the vote will be locked as per the conviction specified and will not be available for transfer during this period.')
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
              children: t('Conviction locks do overlap and are not additive, meaning that funds locked during a previous vote can be locked again.')
            })]
          }),
          children: [isCurrentVote && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.VoteValue, {
            accountId: accountId,
            autoFocus: true,
            onChange: setBalance
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.ConvictionDropdown, {
            help: t('The conviction to use for this vote, with an appropriate lock period.'),
            label: t('conviction'),
            onChange: setConviction,
            value: conviction
          })]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Actions, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
          accountId: accountId,
          icon: "ban",
          isDisabled: isDisabled,
          label: t('Vote Nay'),
          onStart: toggleVoting,
          params: isCurrentVote ? [referendumId, {
            Standard: {
              balance,
              vote: {
                aye: false,
                conviction
              }
            }
          }] : [referendumId, {
            aye: false,
            conviction
          }],
          tx: api.tx.democracy.vote
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
          accountId: accountId,
          icon: "check",
          isDisabled: isDisabled,
          label: t('Vote Aye'),
          onStart: toggleVoting,
          params: isCurrentVote ? [referendumId, {
            Standard: {
              balance,
              vote: {
                aye: true,
                conviction
              }
            }
          }] : [referendumId, {
            aye: true,
            conviction
          }],
          tx: api.tx.democracy.vote
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
      icon: "check",
      label: t('Vote'),
      onClick: toggleVoting
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Voting);

exports.default = _default;