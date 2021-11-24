// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useMemo } from 'react';
import { AddressMini, AddressSmall, Badge, Expander, ParaLink, TxButton } from '@axia-js/react-components';
import { useAccounts, useApi, useSudo } from '@axia-js/react-hooks';
import { FormatBalance } from '@axia-js/react-query';
import { formatNumber } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import { sliceHex } from "../util.js";
import useProposal from "./useProposal.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Proposal({
  approvedIds,
  id,
  scheduled
}) {
  var _proposal$proposal3, _proposal$proposal4, _proposal$proposal5, _proposal$proposal6;

  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const {
    allAccounts
  } = useAccounts();
  const {
    hasSudoKey,
    sudoKey
  } = useSudo();
  const proposal = useProposal(id, approvedIds, scheduled);
  const cancelTx = useMemo(() => api.tx.sudo && hasSudoKey ? api.tx.sudo.sudo(api.tx.proposeAllychain.cancelProposal(id)) : allAccounts.some(a => {
    var _proposal$proposal;

    return (_proposal$proposal = proposal.proposal) === null || _proposal$proposal === void 0 ? void 0 : _proposal$proposal.proposer.eq(a);
  }) ? api.tx.proposeAllychain.cancelProposal(id) : null, [api, allAccounts, hasSudoKey, id, proposal]);
  const approveTx = useMemo(() => api.tx.sudo && api.tx.sudo.sudo(api.tx.proposeAllychain.approveProposal(id)), [api, id]);
  const initialHex = useMemo(() => (proposal === null || proposal === void 0 ? void 0 : proposal.proposal) && sliceHex(proposal.proposal.genesisHead), [proposal]);
  const renderVals = useCallback(() => {
    var _proposal$proposal2;

    return (_proposal$proposal2 = proposal.proposal) === null || _proposal$proposal2 === void 0 ? void 0 : _proposal$proposal2.validators.map(validatorId => /*#__PURE__*/_jsx(AddressMini, {
      value: validatorId
    }, validatorId.toString()));
  }, [proposal.proposal]);
  return /*#__PURE__*/_jsxs("tr", {
    children: [/*#__PURE__*/_jsx("td", {
      className: "number together",
      children: /*#__PURE__*/_jsx("h1", {
        children: formatNumber(id)
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "badge together",
      children: (proposal.isApproved || proposal.isScheduled) && /*#__PURE__*/_jsx(Badge, {
        color: "green",
        icon: proposal.isScheduled ? 'clock' : 'check'
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "badge",
      children: /*#__PURE__*/_jsx(ParaLink, {
        id: id
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "start together",
      children: (_proposal$proposal3 = proposal.proposal) === null || _proposal$proposal3 === void 0 ? void 0 : _proposal$proposal3.name.toUtf8()
    }), /*#__PURE__*/_jsx("td", {
      className: "address",
      children: ((_proposal$proposal4 = proposal.proposal) === null || _proposal$proposal4 === void 0 ? void 0 : _proposal$proposal4.validators) && /*#__PURE__*/_jsx(Expander, {
        renderChildren: renderVals,
        summary: t('Validators ({{count}})', {
          replace: {
            count: formatNumber((_proposal$proposal5 = proposal.proposal) === null || _proposal$proposal5 === void 0 ? void 0 : _proposal$proposal5.validators.length)
          }
        })
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "address",
      children: proposal.proposal && /*#__PURE__*/_jsx(AddressSmall, {
        value: proposal.proposal.proposer
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "number media--1100",
      children: proposal.proposal && /*#__PURE__*/_jsx(FormatBalance, {
        value: proposal.proposal.balance
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "start hash together all",
      children: initialHex
    }), /*#__PURE__*/_jsx("td", {
      className: "button",
      children: !(proposal.isApproved || proposal.isScheduled) && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(TxButton, {
          accountId: sudoKey,
          className: "media--800",
          extrinsic: approveTx,
          icon: "check",
          isDisabled: !hasSudoKey,
          label: t('Approve')
        }), /*#__PURE__*/_jsx(TxButton, {
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

export default /*#__PURE__*/React.memo(Proposal);