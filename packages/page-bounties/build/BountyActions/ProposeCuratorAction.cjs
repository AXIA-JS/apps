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

var _util = require("@axia-js/util");

var _index = require("../helpers/index.cjs");

var _index2 = require("../hooks/index.cjs");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0
const BOUNTY_METHODS = ['proposeCurator'];

function ProposeCuratorAction(_ref) {
  let {
    description,
    index,
    proposals,
    value
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const {
    isMember,
    members
  } = (0, _reactHooks.useCollectiveMembers)('council');
  const councilMod = (0, _reactHooks.useCollectiveInstance)('council');
  const {
    proposeCurator
  } = (0, _index2.useBounties)();
  const [isOpen, toggleOpen] = (0, _reactHooks.useToggle)();
  const [accountId, setAccountId] = (0, _react.useState)(null);
  const [curatorId, setCuratorId] = (0, _react.useState)(null);
  const [threshold, setThreshold] = (0, _react.useState)();
  const [fee, setFee] = (0, _react.useState)(_util.BN_ZERO);
  const [isFeeValid, setIsFeeValid] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    members && setThreshold(new _bn.default(Math.ceil(members.length * (0, _appsConfig.getTreasuryProposalThreshold)(api))));
  }, [api, members]);
  const proposeCuratorProposal = (0, _react.useMemo)(() => curatorId && proposeCurator(index, curatorId, fee), [curatorId, fee, index, proposeCurator]);
  const isVotingInitiated = (0, _react.useMemo)(() => (proposals === null || proposals === void 0 ? void 0 : proposals.filter(_ref2 => {
    let {
      proposal
    } = _ref2;
    return BOUNTY_METHODS.includes(proposal.method);
  }).length) !== 0, [proposals]);
  (0, _react.useEffect)(() => {
    setIsFeeValid(!!(value !== null && value !== void 0 && value.gt(fee)));
  }, [value, fee]);
  return isMember && !isVotingInitiated && councilMod ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
      icon: "step-forward",
      isDisabled: false,
      label: t('Propose curator'),
      onClick: toggleOpen
    }), isOpen && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
      header: `${t('Propose curator')} - "${(0, _index.truncateTitle)(description, 30)}"`,
      onClose: toggleOpen,
      size: "large",
      testId: "propose-curator-modal",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('The council member that will create the motion.'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
            filter: members,
            help: t('Select the council member account you wish to use to create a motion for the Bounty.'),
            label: t('proposing account'),
            onChange: setAccountId,
            type: "account",
            withLabel: true
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('Choose a curator whose background and expertise is such that they are capable of determining when the task is complete.'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
            help: t('Select an account which (after a successful vote) will act as a curator.'),
            label: t('select curator'),
            onChange: setCuratorId,
            withLabel: true
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
          hint: t('Part of the bounty value that will go to the Curator as a reward for their work'),
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputBalance, {
            help: t('A reward for a curator, this amount is included in the total value of the bounty.'),
            isError: !isFeeValid,
            isZeroable: true,
            label: t("curator's fee"),
            onChange: setFee,
            value: fee
          }), !isFeeValid && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkError, {
            content: t("Curator's fee can't be higher than bounty value.")
          })]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
          accountId: accountId,
          icon: "check",
          isDisabled: !isFeeValid,
          label: t('Propose curator'),
          onStart: toggleOpen,
          params: [threshold, proposeCuratorProposal, proposeCuratorProposal === null || proposeCuratorProposal === void 0 ? void 0 : proposeCuratorProposal.length],
          tx: api.tx[councilMod].propose
        })
      })]
    })]
  }) : null;
}

var _default = /*#__PURE__*/_react.default.memo(ProposeCuratorAction);

exports.default = _default;