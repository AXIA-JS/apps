// Copyright 2017-2021 @axia-js/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo, useState } from 'react';
import { Button, InputAddress, Modal, TxButton } from '@axia-js/react-components';
import { useAccounts, useToggle } from '@axia-js/react-hooks';
import { truncateTitle } from "../helpers/index.js";
import { useBounties } from "../hooks/index.js";
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function AwardBounty({
  curatorId,
  description,
  index
}) {
  const {
    t
  } = useTranslation();
  const {
    awardBounty
  } = useBounties();
  const {
    allAccounts
  } = useAccounts();
  const [isOpen, toggleOpen] = useToggle();
  const [beneficiaryId, setBeneficiaryId] = useState(null);
  const isCurator = useMemo(() => allAccounts.includes(curatorId.toString()), [allAccounts, curatorId]);
  return isCurator ? /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Button, {
      icon: "award",
      isDisabled: false,
      label: t('Reward implementer'),
      onClick: toggleOpen
    }), isOpen && /*#__PURE__*/_jsxs(Modal, {
      header: `${t('award bounty')} - "${truncateTitle(description, 30)}"`,
      onClose: toggleOpen,
      size: "large",
      children: [/*#__PURE__*/_jsxs(Modal.Content, {
        children: [/*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('The Curator account that will be used to send this transaction. Any applicable fees will be paid by this account.'),
          children: /*#__PURE__*/_jsx(InputAddress, {
            defaultValue: curatorId,
            help: t("Curator's account that will reward the bounty to the implementer."),
            isDisabled: true,
            label: t('award with account'),
            type: "account",
            withLabel: true
          })
        }), /*#__PURE__*/_jsx(Modal.Columns, {
          hint: t("Reward the bounty to an implementer's account. The implementer will be able to claim the funds after a delay period."),
          children: /*#__PURE__*/_jsx(InputAddress, {
            help: t('Choose the Beneficiary for this bounty.'),
            label: t('implementer account'),
            onChange: setBeneficiaryId,
            withLabel: true
          })
        })]
      }), /*#__PURE__*/_jsx(Modal.Actions, {
        children: /*#__PURE__*/_jsx(TxButton, {
          accountId: curatorId,
          icon: "check",
          label: t('Approve'),
          onStart: toggleOpen,
          params: [index, beneficiaryId],
          tx: awardBounty
        })
      })]
    })]
  }) : null;
}

export default /*#__PURE__*/React.memo(AwardBounty);