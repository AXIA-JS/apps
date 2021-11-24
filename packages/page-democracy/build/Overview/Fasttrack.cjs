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

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
// default, assuming 6s blocks
const ONE_HOUR = 60 * 60 / 6;
const DEF_DELAY = new _bn.default(ONE_HOUR);
const DEF_VOTING = new _bn.default(3 * ONE_HOUR);

function Fasttrack(_ref) {
  let {
    imageHash,
    members,
    threshold
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [isFasttrackOpen, toggleFasttrack] = (0, _reactHooks.useToggle)();
  const [accountId, setAcountId] = (0, _react.useState)(null);
  const [delayBlocks, setDelayBlocks] = (0, _react.useState)(DEF_DELAY);
  const [votingBlocks, setVotingBlocks] = (0, _react.useState)(api.consts.democracy.fastTrackVotingPeriod || DEF_VOTING);
  const [{
    proposal,
    proposalLength
  }, setProposal] = (0, _react.useState)(() => ({
    proposalLength: 0
  }));
  const [withVote, toggleVote] = (0, _reactHooks.useToggle)(true);
  const modLocation = (0, _reactHooks.useCollectiveInstance)('technicalCommittee');
  const proposalCount = (0, _reactHooks.useCall)(modLocation && api.query[modLocation].proposalCount);
  const memberThreshold = (0, _react.useMemo)(() => new _bn.default(Math.ceil(members.length * (0, _appsConfig.getFastTrackThreshold)(api, !votingBlocks || api.consts.democracy.fastTrackVotingPeriod.lte(votingBlocks)))), [api, members, votingBlocks]);
  const extrinsic = (0, _react.useMemo)(() => {
    if (!modLocation || !proposal || !proposalCount) {
      return null;
    }

    const proposeTx = api.tx[modLocation].propose.meta.args.length === 3 ? api.tx[modLocation].propose(memberThreshold, proposal, proposalLength) // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore Old-type
    : api.tx[modLocation].propose(memberThreshold, proposal);
    return withVote ? api.tx.utility.batch([proposeTx, api.tx[modLocation].vote(proposal.method.hash, proposalCount, true)]) : proposeTx;
  }, [api, memberThreshold, modLocation, proposal, proposalCount, proposalLength, withVote]);
  (0, _react.useEffect)(() => {
    const proposal = delayBlocks && !delayBlocks.isZero() && votingBlocks && !votingBlocks.isZero() ? api.tx.democracy.fastTrack(imageHash, votingBlocks, delayBlocks) : null;
    setProposal({
      proposal,
      proposalLength: (proposal === null || proposal === void 0 ? void 0 : proposal.length) || 0
    });
  }, [api, delayBlocks, imageHash, members, votingBlocks]);

  if (!modLocation) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [isFasttrackOpen && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
      header: t('Fast track proposal'),
      onClose: toggleFasttrack,
      size: "large",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('Select the committee account you wish to make the proposal with.'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
            filter: members,
            label: t('propose from account'),
            onChange: setAcountId,
            type: "account",
            withLabel: true
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('The external proposal to send to the technical committee'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
            isDisabled: true,
            label: t('preimage hash'),
            value: imageHash.toHex()
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
          hint: t('The voting period and delay to apply to this proposal. The threshold is calculated from these values.'),
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputNumber, {
            autoFocus: true,
            help: t('The voting period to apply in blocks'),
            isZeroable: false,
            label: t('voting period'),
            onChange: setVotingBlocks,
            value: votingBlocks
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputNumber, {
            help: t('The delay period to apply in blocks'),
            isZeroable: false,
            label: t('delay'),
            onChange: setDelayBlocks,
            value: delayBlocks
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputNumber, {
            defaultValue: memberThreshold,
            isDisabled: true,
            label: t('threshold')
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('Submit an Aye vote alongside the proposal as part of a batch'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Toggle, {
            label: t('Submit Aye vote with proposal'),
            onChange: toggleVote,
            value: withVote
          })
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
          accountId: accountId,
          extrinsic: extrinsic,
          icon: "fast-forward",
          isDisabled: !accountId,
          label: t('Fast track'),
          onStart: toggleFasttrack
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
      icon: "fast-forward",
      isDisabled: !threshold.isSimplemajority,
      label: t('Fast track'),
      onClick: toggleFasttrack
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Fasttrack);

exports.default = _default;