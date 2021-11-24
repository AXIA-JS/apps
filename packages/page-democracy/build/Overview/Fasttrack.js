// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
import BN from 'bn.js';
import React, { useEffect, useMemo, useState } from 'react';
import { getFastTrackThreshold } from '@axia-js/apps-config';
import { Button, Input, InputAddress, InputNumber, Modal, Toggle, TxButton } from '@axia-js/react-components';
import { useApi, useCall, useCollectiveInstance, useToggle } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
// default, assuming 6s blocks
const ONE_HOUR = 60 * 60 / 6;
const DEF_DELAY = new BN(ONE_HOUR);
const DEF_VOTING = new BN(3 * ONE_HOUR);

function Fasttrack({
  imageHash,
  members,
  threshold
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [isFasttrackOpen, toggleFasttrack] = useToggle();
  const [accountId, setAcountId] = useState(null);
  const [delayBlocks, setDelayBlocks] = useState(DEF_DELAY);
  const [votingBlocks, setVotingBlocks] = useState(api.consts.democracy.fastTrackVotingPeriod || DEF_VOTING);
  const [{
    proposal,
    proposalLength
  }, setProposal] = useState(() => ({
    proposalLength: 0
  }));
  const [withVote, toggleVote] = useToggle(true);
  const modLocation = useCollectiveInstance('technicalCommittee');
  const proposalCount = useCall(modLocation && api.query[modLocation].proposalCount);
  const memberThreshold = useMemo(() => new BN(Math.ceil(members.length * getFastTrackThreshold(api, !votingBlocks || api.consts.democracy.fastTrackVotingPeriod.lte(votingBlocks)))), [api, members, votingBlocks]);
  const extrinsic = useMemo(() => {
    if (!modLocation || !proposal || !proposalCount) {
      return null;
    }

    const proposeTx = api.tx[modLocation].propose.meta.args.length === 3 ? api.tx[modLocation].propose(memberThreshold, proposal, proposalLength) // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore Old-type
    : api.tx[modLocation].propose(memberThreshold, proposal);
    return withVote ? api.tx.utility.batch([proposeTx, api.tx[modLocation].vote(proposal.method.hash, proposalCount, true)]) : proposeTx;
  }, [api, memberThreshold, modLocation, proposal, proposalCount, proposalLength, withVote]);
  useEffect(() => {
    const proposal = delayBlocks && !delayBlocks.isZero() && votingBlocks && !votingBlocks.isZero() ? api.tx.democracy.fastTrack(imageHash, votingBlocks, delayBlocks) : null;
    setProposal({
      proposal,
      proposalLength: (proposal === null || proposal === void 0 ? void 0 : proposal.length) || 0
    });
  }, [api, delayBlocks, imageHash, members, votingBlocks]);

  if (!modLocation) {
    return null;
  }

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [isFasttrackOpen && /*#__PURE__*/_jsxs(Modal, {
      header: t('Fast track proposal'),
      onClose: toggleFasttrack,
      size: "large",
      children: [/*#__PURE__*/_jsxs(Modal.Content, {
        children: [/*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('Select the committee account you wish to make the proposal with.'),
          children: /*#__PURE__*/_jsx(InputAddress, {
            filter: members,
            label: t('propose from account'),
            onChange: setAcountId,
            type: "account",
            withLabel: true
          })
        }), /*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('The external proposal to send to the technical committee'),
          children: /*#__PURE__*/_jsx(Input, {
            isDisabled: true,
            label: t('preimage hash'),
            value: imageHash.toHex()
          })
        }), /*#__PURE__*/_jsxs(Modal.Columns, {
          hint: t('The voting period and delay to apply to this proposal. The threshold is calculated from these values.'),
          children: [/*#__PURE__*/_jsx(InputNumber, {
            autoFocus: true,
            help: t('The voting period to apply in blocks'),
            isZeroable: false,
            label: t('voting period'),
            onChange: setVotingBlocks,
            value: votingBlocks
          }), /*#__PURE__*/_jsx(InputNumber, {
            help: t('The delay period to apply in blocks'),
            isZeroable: false,
            label: t('delay'),
            onChange: setDelayBlocks,
            value: delayBlocks
          }), /*#__PURE__*/_jsx(InputNumber, {
            defaultValue: memberThreshold,
            isDisabled: true,
            label: t('threshold')
          })]
        }), /*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('Submit an Aye vote alongside the proposal as part of a batch'),
          children: /*#__PURE__*/_jsx(Toggle, {
            label: t('Submit Aye vote with proposal'),
            onChange: toggleVote,
            value: withVote
          })
        })]
      }), /*#__PURE__*/_jsx(Modal.Actions, {
        children: /*#__PURE__*/_jsx(TxButton, {
          accountId: accountId,
          extrinsic: extrinsic,
          icon: "fast-forward",
          isDisabled: !accountId,
          label: t('Fast track'),
          onStart: toggleFasttrack
        })
      })]
    }), /*#__PURE__*/_jsx(Button, {
      icon: "fast-forward",
      isDisabled: !threshold.isSimplemajority,
      label: t('Fast track'),
      onClick: toggleFasttrack
    })]
  });
}

export default /*#__PURE__*/React.memo(Fasttrack);