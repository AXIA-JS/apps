// Copyright 2017-2021 @axia-js/app-council authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useMemo, useState } from 'react';
import { Button, InputAddress, InputAddressMulti, InputBalance, Modal, TxButton, VoteValue } from '@axia-js/react-components';
import { useApi, useToggle } from '@axia-js/react-hooks';
import { BN_ZERO } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import { useModuleElections } from "../useModuleElections.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const MAX_VOTES = 16;

function Vote({
  electionsInfo
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [isVisible, toggleVisible] = useToggle();
  const [accountId, setAccountId] = useState(null);
  const [available, setAvailable] = useState([]);
  const [defaultVotes, setDefaultVotes] = useState([]);
  const [votes, setVotes] = useState([]);
  const [voteValue, setVoteValue] = useState(BN_ZERO);
  const modLocation = useModuleElections();
  useEffect(() => {
    if (electionsInfo) {
      const {
        candidates,
        members,
        runnersUp
      } = electionsInfo;
      setAvailable(members.map(([accountId]) => accountId.toString()).concat(runnersUp.map(([accountId]) => accountId.toString())).concat(candidates.map(accountId => accountId.toString())));
    }
  }, [electionsInfo]);
  useEffect(() => {
    accountId && api.derive.council.votesOf(accountId).then(({
      votes
    }) => {
      setDefaultVotes(votes.map(a => a.toString()).filter(a => available.includes(a)));
    });
  }, [api, accountId, available]);
  const bondValue = useMemo(() => {
    const location = api.consts.elections || api.consts.phragmenElection || api.consts.electionsPhragmen;
    return location && location.votingBondBase && location.votingBondBase.add(location.votingBondFactor.muln(votes.length));
  }, [api, votes]);

  if (!modLocation) {
    return null;
  }

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Button, {
      icon: "check",
      isDisabled: available.length === 0,
      label: t('Vote'),
      onClick: toggleVisible
    }), isVisible && /*#__PURE__*/_jsxs(Modal, {
      header: t('Vote for current candidates'),
      onClose: toggleVisible,
      size: "large",
      children: [/*#__PURE__*/_jsxs(Modal.Content, {
        children: [/*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('The vote will be recorded for the selected account.'),
          children: /*#__PURE__*/_jsx(InputAddress, {
            help: t('This account will be use to approve each candidate.'),
            label: t('voting account'),
            onChange: setAccountId,
            type: "account"
          })
        }), /*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('The value associated with this vote. The amount will be locked (not available for transfer) and used in all subsequent elections.'),
          children: /*#__PURE__*/_jsx(VoteValue, {
            accountId: accountId,
            isCouncil: true,
            onChange: setVoteValue
          })
        }), /*#__PURE__*/_jsx(Modal.Columns, {
          hint: /*#__PURE__*/_jsxs(_Fragment, {
            children: [/*#__PURE__*/_jsx("p", {
              children: t('The votes for the members, runner-ups and candidates. These should be ordered based on your priority.')
            }), /*#__PURE__*/_jsx("p", {
              children: t('In calculating the election outcome, this prioritized vote ordering will be used to determine the final score for the candidates.')
            })]
          }),
          children: /*#__PURE__*/_jsx(InputAddressMulti, {
            available: available,
            availableLabel: t('council candidates'),
            defaultValue: defaultVotes,
            help: t('Select and order council candidates you wish to vote for.'),
            maxCount: MAX_VOTES,
            onChange: setVotes,
            valueLabel: t('my ordered votes')
          })
        }), bondValue && /*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('The amount will be reserved for the duration of your vote'),
          children: /*#__PURE__*/_jsx(InputBalance, {
            defaultValue: bondValue,
            help: t('The amount that is reserved'),
            isDisabled: true,
            label: t('voting bond')
          })
        })]
      }), /*#__PURE__*/_jsxs(Modal.Actions, {
        children: [/*#__PURE__*/_jsx(TxButton, {
          accountId: accountId,
          icon: "trash-alt",
          isDisabled: !defaultVotes.length,
          label: t('Unvote all'),
          onStart: toggleVisible,
          tx: api.tx[modLocation].removeVoter
        }), /*#__PURE__*/_jsx(TxButton, {
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

export default /*#__PURE__*/React.memo(Vote);