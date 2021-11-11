"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _reactQuery = require("@axia-js/react-query");

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _util2 = require("../util.cjs");

var _useProposal = _interopRequireDefault(require("./useProposal.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Proposal({
  approvedIds,
  id,
  scheduled
}) {
  var _proposal$proposal3, _proposal$proposal4, _proposal$proposal5, _proposal$proposal6;

  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const {
    allAccounts
  } = (0, _reactHooks.useAccounts)();
  const {
    hasSudoKey,
    sudoKey
  } = (0, _reactHooks.useSudo)();
  const proposal = (0, _useProposal.default)(id, approvedIds, scheduled);
  const cancelTx = (0, _react.useMemo)(() => api.tx.sudo && hasSudoKey ? api.tx.sudo.sudo(api.tx.proposeParachain.cancelProposal(id)) : allAccounts.some(a => {
    var _proposal$proposal;

    return (_proposal$proposal = proposal.proposal) === null || _proposal$proposal === void 0 ? void 0 : _proposal$proposal.proposer.eq(a);
  }) ? api.tx.proposeParachain.cancelProposal(id) : null, [api, allAccounts, hasSudoKey, id, proposal]);
  const approveTx = (0, _react.useMemo)(() => api.tx.sudo && api.tx.sudo.sudo(api.tx.proposeParachain.approveProposal(id)), [api, id]);
  const initialHex = (0, _react.useMemo)(() => (proposal === null || proposal === void 0 ? void 0 : proposal.proposal) && (0, _util2.sliceHex)(proposal.proposal.genesisHead), [proposal]);
  const renderVals = (0, _react.useCallback)(() => {
    var _proposal$proposal2;

    return (_proposal$proposal2 = proposal.proposal) === null || _proposal$proposal2 === void 0 ? void 0 : _proposal$proposal2.validators.map(validatorId => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressMini, {
      value: validatorId
    }, validatorId.toString()));
  }, [proposal.proposal]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number together",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("h1", {
        children: (0, _util.formatNumber)(id)
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "badge together",
      children: (proposal.isApproved || proposal.isScheduled) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Badge, {
        color: "green",
        icon: proposal.isScheduled ? 'clock' : 'check'
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "badge",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.ParaLink, {
        id: id
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "start together",
      children: (_proposal$proposal3 = proposal.proposal) === null || _proposal$proposal3 === void 0 ? void 0 : _proposal$proposal3.name.toUtf8()
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "address",
      children: ((_proposal$proposal4 = proposal.proposal) === null || _proposal$proposal4 === void 0 ? void 0 : _proposal$proposal4.validators) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Expander, {
        renderChildren: renderVals,
        summary: t('Validators ({{count}})', {
          replace: {
            count: (0, _util.formatNumber)((_proposal$proposal5 = proposal.proposal) === null || _proposal$proposal5 === void 0 ? void 0 : _proposal$proposal5.validators.length)
          }
        })
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "address",
      children: proposal.proposal && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressSmall, {
        value: proposal.proposal.proposer
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number media--1100",
      children: proposal.proposal && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
        value: proposal.proposal.balance
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "start hash together all",
      children: initialHex
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "button",
      children: !(proposal.isApproved || proposal.isScheduled) && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
          accountId: sudoKey,
          className: "media--800",
          extrinsic: approveTx,
          icon: "check",
          isDisabled: !hasSudoKey,
          label: t('Approve')
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
          accountId: hasSudoKey ? sudoKey : (_proposal$proposal6 = proposal.proposal) === null || _proposal$proposal6 === void 0 ? void 0 : _proposal$proposal6.proposer,
          className: "media--1100",
          extrinsic: cancelTx,
          icon: "ban",
          isDisabled: !hasSudoKey || !proposal.proposal,
          label: t('Cancel')
        })]
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Proposal);

exports.default = _default;