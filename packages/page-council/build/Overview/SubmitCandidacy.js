// Copyright 2017-2021 @axia-js/app-council authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import { Button, InputAddress, InputBalance, Modal, TxButton } from '@axia-js/react-components';
import { useApi, useModal } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import { useModuleElections } from "../useModuleElections.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function SubmitCandidacy({
  electionsInfo
}) {
  const {
    api
  } = useApi();
  const {
    t
  } = useTranslation();
  const [accountId, setAcountId] = useState(null);
  const {
    isOpen,
    onClose,
    onOpen
  } = useModal();
  const modLocation = useModuleElections();

  if (!modLocation) {
    return null;
  }

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [isOpen && /*#__PURE__*/_jsxs(Modal, {
      header: t('Submit your council candidacy'),
      onClose: onClose,
      size: "large",
      children: [/*#__PURE__*/_jsxs(Modal.Content, {
        children: [/*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('This account will appear in the list of candidates. With enough votes in an election, it will become either a runner-up or a council member.'),
          children: /*#__PURE__*/_jsx(InputAddress, {
            help: t('Select the account you wish to submit for candidacy.'),
            label: t('candidate account'),
            onChange: setAcountId,
            type: "account"
          })
        }), api.consts[modLocation] && /*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('The bond will be reserved for the duration of your candidacy and membership.'),
          children: /*#__PURE__*/_jsx(InputBalance, {
            defaultValue: api.consts[modLocation].candidacyBond,
            help: t('The bond that is reserved'),
            isDisabled: true,
            label: t('candidacy bond')
          })
        })]
      }), /*#__PURE__*/_jsx(Modal.Actions, {
        children: /*#__PURE__*/_jsx(TxButton, {
          accountId: accountId,
          isDisabled: !electionsInfo,
          onStart: onClose,
          params: api.tx[modLocation].submitCandidacy.meta.args.length === 1 ? [electionsInfo === null || electionsInfo === void 0 ? void 0 : electionsInfo.candidates.length] : [],
          tx: api.tx[modLocation].submitCandidacy
        })
      })]
    }), /*#__PURE__*/_jsx(Button, {
      icon: "plus",
      isDisabled: !electionsInfo,
      label: t('Submit candidacy'),
      onClick: onOpen
    })]
  });
}

export default /*#__PURE__*/React.memo(SubmitCandidacy);