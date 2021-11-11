"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bn = _interopRequireDefault(require("bn.js"));

var _react = _interopRequireWildcard(require("react"));

var _appsConfig = require("@axia-js/apps-config");

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _index = require("../helpers/index.cjs");

var _index2 = require("../hooks/index.cjs");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
function SlashCurator({
  action,
  curatorId,
  description,
  index,
  toggleOpen
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const {
    members
  } = (0, _reactHooks.useCollectiveMembers)('council');
  const councilMod = (0, _reactHooks.useCollectiveInstance)('council');
  const {
    unassignCurator
  } = (0, _index2.useBounties)();
  const [accountId, setAccountId] = (0, _react.useState)(null);
  const [threshold, setThreshold] = (0, _react.useState)();
  const {
    allAccounts
  } = (0, _reactHooks.useAccounts)();
  (0, _react.useEffect)(() => {
    members && setThreshold(new _bn.default(Math.ceil(members.length * (0, _appsConfig.getTreasuryProposalThreshold)(api))));
  }, [api, members]);
  const unassignCuratorProposal = (0, _react.useMemo)(() => unassignCurator(index), [index, unassignCurator]);
  const actionProperties = (0, _react.useMemo)(() => ({
    SlashCuratorAction: {
      filter: allAccounts,
      header: t('This action will Slash the Curator.'),
      helpMessage: t('The Curator that will be slashed.'),
      params: [index],
      proposingAccountTip: t('The account that will create the transaction.'),
      tip: t("Curator's deposit will be slashed and curator will be unassigned. Bounty will return to the Funded state."),
      title: t('Slash curator'),
      tx: unassignCurator
    },
    SlashCuratorMotion: {
      filter: members,
      header: t('This action will create a Council motion to slash the Curator.'),
      helpMessage: t('The Curator that will be slashed.'),
      params: [threshold, unassignCuratorProposal, unassignCuratorProposal === null || unassignCuratorProposal === void 0 ? void 0 : unassignCuratorProposal.length],
      proposingAccountTip: t('The council member that will create the motion, submission equates to an "aye" vote.'),
      tip: t("If the motion is approved, Curator's deposit will be slashed and Curator will be unassigned. Bounty will return to the Funded state."),
      title: t('Slash curator'),
      tx: councilMod && api.tx[councilMod].propose
    },
    UnassignCurator: {
      filter: members,
      header: t('This action will create a Council motion to unassign the Curator.'),
      helpMessage: t('The Curator that will be unassigned'),
      params: [threshold, unassignCuratorProposal, unassignCuratorProposal === null || unassignCuratorProposal === void 0 ? void 0 : unassignCuratorProposal.length],
      proposingAccountTip: t('The council member that will create the motion, submission equates to an "aye" vote.'),
      tip: t('If the motion is approved, the current Curator will be unassigned and the Bounty will return to the Funded state.'),
      title: t('Unassign curator'),
      tx: councilMod && api.tx[councilMod].propose
    }
  }), [t, index, unassignCurator, api, allAccounts, councilMod, members, threshold, unassignCuratorProposal]);
  const {
    filter,
    helpMessage,
    params,
    proposingAccountTip,
    tip,
    title,
    tx
  } = actionProperties[action];

  if (!tx) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
    header: `${title} - "${(0, _index.truncateTitle)(description, 30)}"`,
    onClose: toggleOpen,
    size: "large",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
        hint: proposingAccountTip,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
          filter: filter,
          help: t('The account that will sign the transaction.'),
          label: t('proposing account'),
          onChange: setAccountId,
          type: "account",
          withLabel: true
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
        hint: tip,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
          defaultValue: curatorId,
          help: helpMessage,
          isDisabled: true,
          label: t('current curator'),
          withLabel: true
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
        accountId: accountId,
        icon: "check",
        label: "Approve",
        onStart: toggleOpen,
        params: params,
        tx: tx
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(SlashCurator);

exports.default = _default;