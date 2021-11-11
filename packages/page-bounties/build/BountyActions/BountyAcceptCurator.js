// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import { Button, InputAddress, InputBalance, Modal, TxButton } from '@axia-js/react-components';
import { useToggle } from '@axia-js/react-hooks';
import { permillOf, truncateTitle } from "../helpers/index.js";
import { useBounties, useUserRole } from "../hooks/index.js";
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function BountyAcceptCurator({
  curatorId,
  description,
  fee,
  index
}) {
  const {
    t
  } = useTranslation();
  const {
    acceptCurator
  } = useBounties();
  const {
    isCurator
  } = useUserRole(curatorId);
  const {
    bountyCuratorDeposit
  } = useBounties();
  const [isOpen, toggleOpen] = useToggle();
  const deposit = useMemo(() => permillOf(fee, bountyCuratorDeposit), [fee, bountyCuratorDeposit]);
  return isCurator ? /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Button, {
      icon: "check",
      isDisabled: false,
      label: t('Accept'),
      onClick: toggleOpen
    }), isOpen && /*#__PURE__*/_jsxs(Modal, {
      header: `${t('accept curator role')} - "${truncateTitle(description, 30)}"`,
      onClose: toggleOpen,
      size: "large",
      children: [/*#__PURE__*/_jsxs(Modal.Content, {
        children: [/*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('Only the account proposed as curator by the council can create the assign curator transaction'),
          children: /*#__PURE__*/_jsx(InputAddress, {
            help: t('This account will accept the curator role.'),
            isDisabled: true,
            label: t('curator account'),
            type: "account",
            value: curatorId.toString(),
            withLabel: true
          })
        }), /*#__PURE__*/_jsx(Modal.Columns, {
          hint: t("This amount will be sent to your account after bounty is rewarded and you claim curator's fee."),
          children: /*#__PURE__*/_jsx(InputBalance, {
            defaultValue: fee.toString(),
            isDisabled: true,
            label: t("curator's fee")
          })
        }), /*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('This amount will be reserved from your account and returned after bounty claim is confirmed or if you give up, unless you are slashed earlier.'),
          children: /*#__PURE__*/_jsx(InputBalance, {
            defaultValue: deposit.toString(),
            help: t("Curator's deposit is calculated based on the accepted curator's fee for this bounty."),
            isDisabled: true,
            label: t("curator's deposit")
          })
        })]
      }), /*#__PURE__*/_jsx(Modal.Actions, {
        children: /*#__PURE__*/_jsx(TxButton, {
          accountId: curatorId,
          icon: "check",
          label: t('Accept Curator Role'),
          onStart: toggleOpen,
          params: [index],
          tx: acceptCurator
        })
      })]
    })]
  }) : null;
}

export default /*#__PURE__*/React.memo(BountyAcceptCurator);