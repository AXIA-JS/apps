"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _appsConfig = require("@axia-js/apps-config");

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Council(_ref) {
  let {
    id,
    isDisabled,
    members
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [isOpen, toggleOpen] = (0, _reactHooks.useToggle)();
  const [accountId, setAccountId] = (0, _react.useState)(null);
  const [proposalType, setProposalType] = (0, _react.useState)('accept');
  const [{
    proposal,
    proposalLength
  }, setProposal] = (0, _react.useState)(() => ({
    proposalLength: 0
  }));
  const modCouncil = (0, _reactHooks.useCollectiveInstance)('council');
  const threshold = Math.ceil(((members === null || members === void 0 ? void 0 : members.length) || 0) * (0, _appsConfig.getTreasuryProposalThreshold)(api));
  const councilTypeOptRef = (0, _react.useRef)([{
    text: t('Acceptance proposal to council'),
    value: 'accept'
  }, {
    text: t('Rejection proposal to council'),
    value: 'reject'
  }]);
  (0, _react.useEffect)(() => {
    const proposal = proposalType === 'reject' ? api.tx.treasury.rejectProposal(id) : api.tx.treasury.approveProposal(id);
    setProposal({
      proposal,
      proposalLength: proposal.length
    });
  }, [api, id, proposalType]);

  if (!modCouncil) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [isOpen && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
      header: t('Send to council'),
      onClose: toggleOpen,
      size: "large",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('The council member that is proposing this, submission equates to an "aye" vote.'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
            filter: members,
            help: t('Select the council account you wish to use to make the proposal.'),
            label: t('submit with council account'),
            onChange: setAccountId,
            type: "account",
            withLabel: true
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('Proposal can either be to approve or reject this spend. Once approved, the change is applied by either removing the proposal or scheduling payout.'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Dropdown, {
            help: t('The type of council proposal to submit.'),
            label: t('council proposal type'),
            onChange: setProposalType,
            options: councilTypeOptRef.current,
            value: proposalType
          })
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
          accountId: accountId,
          icon: "check",
          isDisabled: !accountId || !threshold,
          label: t('Send to council'),
          onStart: toggleOpen,
          params: api.tx[modCouncil].propose.meta.args.length === 3 ? [threshold, proposal, proposalLength] : [threshold, proposal],
          tx: api.tx[modCouncil].propose
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
      icon: "step-forward",
      isDisabled: isDisabled,
      label: t('To council'),
      onClick: toggleOpen
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Council);

exports.default = _default;