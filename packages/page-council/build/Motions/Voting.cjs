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

// Copyright 2017-2021 @axia-js/app-council authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Voting({
  hash,
  idNumber,
  isDisabled,
  members,
  prime,
  proposal
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
  const [isVotingOpen, toggleVoting] = (0, _reactHooks.useToggle)();
  const [accountId, setAccountId] = (0, _react.useState)(null);
  const modLocation = (0, _reactHooks.useCollectiveInstance)('council');

  if (!hasAccounts || !modLocation) {
    return null;
  }

  const isPrime = (prime === null || prime === void 0 ? void 0 : prime.toString()) === accountId;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [isVotingOpen && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
      header: t('Vote on proposal'),
      onClose: toggleVoting,
      size: "large",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('The proposal that is being voted on. It will pass when the threshold is reached.'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.ProposedAction, {
            idNumber: idNumber,
            proposal: proposal
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
          hint: t('The council account for this vote. The selection is filtered by the current members.'),
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.VoteAccount, {
            filter: members,
            onChange: setAccountId
          }), isPrime && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkWarning, {
            content: t('You are voting with this collective\'s prime account. The vote will be the default outcome in case of any abstentions.')
          })]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Actions, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
          accountId: accountId,
          icon: "ban",
          isDisabled: isDisabled,
          label: t('Vote Nay'),
          onStart: toggleVoting,
          params: [hash, idNumber, false],
          tx: api.tx[modLocation].vote
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
          accountId: accountId,
          icon: "check",
          isDisabled: isDisabled,
          label: t('Vote Aye'),
          onStart: toggleVoting,
          params: [hash, idNumber, true],
          tx: api.tx[modLocation].vote
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
      icon: "check",
      isDisabled: isDisabled,
      label: t('Vote'),
      onClick: toggleVoting
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Voting);

exports.default = _default;