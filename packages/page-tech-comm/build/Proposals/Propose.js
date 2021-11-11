// Copyright 2017-2021 @axia-js/app-tech-comm authors & contributors
// SPDX-License-Identifier: Apache-2.0
import BN from 'bn.js';
import React, { useCallback, useState } from 'react';
import { Button, Extrinsic, InputAddress, InputNumber, Modal, TxButton } from '@axia-js/react-components';
import { useApi, useCollectiveInstance, useModal } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function Propose({
  isMember,
  members,
  type
}) {
  const {
    t
  } = useTranslation();
  const {
    api,
    apiDefaultTxSudo
  } = useApi();
  const {
    isOpen,
    onClose,
    onOpen
  } = useModal();
  const [accountId, setAcountId] = useState(null);
  const [{
    proposal,
    proposalLength
  }, setProposal] = useState({
    proposalLength: 0
  });
  const [[threshold, hasThreshold], setThreshold] = useState([new BN(members.length / 2 + 1), true]);
  const modLocation = useCollectiveInstance(type);

  const _hasThreshold = useCallback(threshold => !!threshold && !threshold.isZero() && threshold.lten(members.length), [members]);

  const _onChangeExtrinsic = useCallback(proposal => setProposal({
    proposal,
    proposalLength: (proposal === null || proposal === void 0 ? void 0 : proposal.length) || 0
  }), []);

  const _onChangeThreshold = useCallback(threshold => setThreshold([threshold || null, _hasThreshold(threshold)]), [_hasThreshold]);

  if (!modLocation) {
    return null;
  }

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [isOpen && /*#__PURE__*/_jsxs(Modal, {
      header: t('Propose a committee motion'),
      onClose: onClose,
      children: [/*#__PURE__*/_jsxs(Modal.Content, {
        children: [/*#__PURE__*/_jsx(InputAddress, {
          filter: members,
          help: t('Select the account you wish to make the proposal with.'),
          label: t('propose from account'),
          onChange: setAcountId,
          type: "account",
          withLabel: true
        }), /*#__PURE__*/_jsx(InputNumber, {
          className: "medium",
          help: t('The minimum number of committee votes required to approve this motion'),
          isError: !hasThreshold,
          label: t('threshold'),
          onChange: _onChangeThreshold,
          placeholder: t('Positive number between 1 and {{count}}', {
            replace: {
              count: members.length
            }
          }),
          value: threshold || undefined
        }), /*#__PURE__*/_jsx(Extrinsic, {
          defaultValue: apiDefaultTxSudo,
          label: t('proposal'),
          onChange: _onChangeExtrinsic
        })]
      }), /*#__PURE__*/_jsx(Modal.Actions, {
        children: /*#__PURE__*/_jsx(TxButton, {
          accountId: accountId,
          isDisabled: !hasThreshold || !proposal,
          onStart: onClose,
          params: api.tx[modLocation].propose.meta.args.length === 3 ? [threshold, proposal, proposalLength] : [threshold, proposal],
          tx: api.tx[modLocation].propose
        })
      })]
    }), /*#__PURE__*/_jsx(Button, {
      icon: "plus",
      isDisabled: !isMember,
      label: t('Submit proposal'),
      onClick: onOpen
    })]
  });
}

export default /*#__PURE__*/React.memo(Propose);