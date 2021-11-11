"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _useModuleElections = require("../useModuleElections.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-council authors & contributors
// SPDX-License-Identifier: Apache-2.0
const MAX_VOTES = 16;

function Vote({
  electionsInfo
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [isVisible, toggleVisible] = (0, _reactHooks.useToggle)();
  const [accountId, setAccountId] = (0, _react.useState)(null);
  const [available, setAvailable] = (0, _react.useState)([]);
  const [defaultVotes, setDefaultVotes] = (0, _react.useState)([]);
  const [votes, setVotes] = (0, _react.useState)([]);
  const [voteValue, setVoteValue] = (0, _react.useState)(_util.BN_ZERO);
  const modLocation = (0, _useModuleElections.useModuleElections)();
  (0, _react.useEffect)(() => {
    if (electionsInfo) {
      const {
        candidates,
        members,
        runnersUp
      } = electionsInfo;
      setAvailable(members.map(([accountId]) => accountId.toString()).concat(runnersUp.map(([accountId]) => accountId.toString())).concat(candidates.map(accountId => accountId.toString())));
    }
  }, [electionsInfo]);
  (0, _react.useEffect)(() => {
    accountId && api.derive.council.votesOf(accountId).then(({
      votes
    }) => {
      setDefaultVotes(votes.map(a => a.toString()).filter(a => available.includes(a)));
    });
  }, [api, accountId, available]);
  const bondValue = (0, _react.useMemo)(() => {
    const location = api.consts.elections || api.consts.phragmenElection || api.consts.electionsPhragmen;
    return location && location.votingBondBase && location.votingBondBase.add(location.votingBondFactor.muln(votes.length));
  }, [api, votes]);

  if (!modLocation) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
      icon: "check",
      isDisabled: available.length === 0,
      label: t('Vote'),
      onClick: toggleVisible
    }), isVisible && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
      header: t('Vote for current candidates'),
      onClose: toggleVisible,
      size: "large",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('The vote will be recorded for the selected account.'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
            help: t('This account will be use to approve each candidate.'),
            label: t('voting account'),
            onChange: setAccountId,
            type: "account"
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('The value associated with this vote. The amount will be locked (not available for transfer) and used in all subsequent elections.'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.VoteValue, {
            accountId: accountId,
            isCouncil: true,
            onChange: setVoteValue
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
              children: t('The votes for the members, runner-ups and candidates. These should be ordered based on your priority.')
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
              children: t('In calculating the election outcome, this prioritized vote ordering will be used to determine the final score for the candidates.')
            })]
          }),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddressMulti, {
            available: available,
            availableLabel: t('council candidates'),
            defaultValue: defaultVotes,
            help: t('Select and order council candidates you wish to vote for.'),
            maxCount: MAX_VOTES,
            onChange: setVotes,
            valueLabel: t('my ordered votes')
          })
        }), bondValue && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('The amount will be reserved for the duration of your vote'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputBalance, {
            defaultValue: bondValue,
            help: t('The amount that is reserved'),
            isDisabled: true,
            label: t('voting bond')
          })
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Actions, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
          accountId: accountId,
          icon: "trash-alt",
          isDisabled: !defaultVotes.length,
          label: t('Unvote all'),
          onStart: toggleVisible,
          tx: api.tx[modLocation].removeVoter
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
          accountId: accountId,
          isDisabled: !accountId || votes.length === 0 || voteValue.lten(0),
          label: t('Vote'),
          onStart: toggleVisible,
          params: [votes, voteValue],
          tx: api.tx[modLocation].vote
        })]
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Vote);

exports.default = _default;