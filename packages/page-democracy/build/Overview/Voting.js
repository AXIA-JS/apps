// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo, useState } from 'react';
import { Button, ConvictionDropdown, Modal, ProposedAction, TxButton, VoteAccount, VoteValue } from '@axia-js/react-components';
import { useAccounts, useApi, useToggle } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Voting({
  proposal,
  referendumId
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const {
    hasAccounts
  } = useAccounts();
  const [accountId, setAccountId] = useState(null);
  const [balance, setBalance] = useState();
  const [conviction, setConviction] = useState(0);
  const [isVotingOpen, toggleVoting] = useToggle();
  const isCurrentVote = useMemo(() => !!api.query.democracy.votingOf, [api]);

  if (!hasAccounts) {
    return null;
  }

  const isDisabled = isCurrentVote ? !balance : false;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [isVotingOpen && /*#__PURE__*/_jsxs(Modal, {
      header: t('Vote on proposal'),
      onClose: toggleVoting,
      size: "large",
      children: [/*#__PURE__*/_jsxs(Modal.Content, {
        children: [/*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('If this proposal is passed, the changes will be applied via dispatch and the deposit returned.'),
          children: /*#__PURE__*/_jsx(ProposedAction, {
            idNumber: referendumId,
            proposal: proposal
          })
        }), /*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('The vote will be recorded for this account. If another account delegated to this one, the delegated votes will also be counted.'),
          children: /*#__PURE__*/_jsx(VoteAccount, {
            onChange: setAccountId
          })
        }), /*#__PURE__*/_jsxs(Modal.Columns, {
          hint: /*#__PURE__*/_jsxs(_Fragment, {
            children: [/*#__PURE__*/_jsx("p", {
              children: t('The balance associated with the vote will be locked as per the conviction specified and will not be available for transfer during this period.')
            }), /*#__PURE__*/_jsx("p", {
              children: t('Conviction locks do overlap and are not additive, meaning that funds locked during a previous vote can be locked again.')
            })]
          }),
          children: [isCurrentVote && /*#__PURE__*/_jsx(VoteValue, {
            accountId: accountId,
            autoFocus: true,
            onChange: setBalance
          }), /*#__PURE__*/_jsx(ConvictionDropdown, {
            help: t('The conviction to use for this vote, with an appropriate lock period.'),
            label: t('conviction'),
            onChange: setConviction,
            value: conviction
          })]
        })]
      }), /*#__PURE__*/_jsxs(Modal.Actions, {
        children: [/*#__PURE__*/_jsx(TxButton, {
          accountId: accountId,
          icon: "ban",
          isDisabled: isDisabled,
          label: t('Vote Nay'),
          onStart: toggleVoting,
          params: isCurrentVote ? [referendumId, {
            Standard: {
              balance,
              vote: {
                aye: false,
                conviction
              }
            }
          }] : [referendumId, {
            aye: false,
            conviction
          }],
          tx: api.tx.democracy.vote
        }), /*#__PURE__*/_jsx(TxButton, {
          accountId: accountId,
          icon: "check",
          isDisabled: isDisabled,
          label: t('Vote Aye'),
          onStart: toggleVoting,
          params: isCurrentVote ? [referendumId, {
            Standard: {
              balance,
              vote: {
                aye: true,
                conviction
              }
            }
          }] : [referendumId, {
            aye: true,
            conviction
          }],
          tx: api.tx.democracy.vote
        })]
      })]
    }), /*#__PURE__*/_jsx(Button, {
      icon: "check",
      label: t('Vote'),
      onClick: toggleVoting
    })]
  });
}

export default /*#__PURE__*/React.memo(Voting);