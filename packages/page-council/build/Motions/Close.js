// Copyright 2017-2021 @axia-js/app-council authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import { Button, InputAddress, Modal, ProposedAction, TxButton } from '@axia-js/react-components';
import { useApi, useCollectiveInstance, useToggle, useWeight } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function Close({
  hasFailed,
  hash,
  idNumber,
  proposal
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [isOpen, toggleOpen] = useToggle();
  const [accountId, setAccountId] = useState(null);
  const [proposalWeight, proposalLength] = useWeight(proposal);
  const modLocation = useCollectiveInstance('council'); // protect against older versions

  if (!modLocation) {
    return null;
  }

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [isOpen && /*#__PURE__*/_jsxs(Modal, {
      header: t('Close proposal'),
      onClose: toggleOpen,
      size: "large",
      children: [/*#__PURE__*/_jsxs(Modal.Content, {
        children: [/*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('The proposal that will be affected. Once closed for the current voting round, it would need to be re-submitted to council for a subsequent voting round.'),
          children: /*#__PURE__*/_jsx(ProposedAction, {
            idNumber: idNumber,
            proposal: proposal
          })
        }), /*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('The council account that will apply the close for the current round.'),
          children: /*#__PURE__*/_jsx(InputAddress, {
            help: t('Select the account you wish close the proposal with.'),
            label: t('close from account'),
            onChange: setAccountId,
            type: "account"
          })
        })]
      }), /*#__PURE__*/_jsx(Modal.Actions, {
        children: /*#__PURE__*/_jsx(TxButton, {
          accountId: accountId,
          onStart: toggleOpen,
          params: api.tx[modLocation].close.meta.args.length === 4 ? hasFailed ? [hash, idNumber, 0, 0] : [hash, idNumber, proposalWeight, proposalLength] : [hash, idNumber],
          tx: api.tx[modLocation].closeOperational || api.tx[modLocation].close
        })
      })]
    }), /*#__PURE__*/_jsx(Button, {
      icon: "times",
      label: t('Close'),
      onClick: toggleOpen
    })]
  });
}

export default /*#__PURE__*/React.memo(Close);