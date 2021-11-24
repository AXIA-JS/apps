// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { useBounties } from '@axia-js/app-bounties/hooks';
import { InputAddress, Modal, TxButton } from '@axia-js/react-components';
import { truncateTitle } from "../helpers/index.js";
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function BountyRejectCurator({
  curatorId,
  description,
  index,
  toggleOpen
}) {
  const {
    t
  } = useTranslation();
  const {
    unassignCurator
  } = useBounties();
  return /*#__PURE__*/_jsxs(Modal, {
    header: `${t('reject curator')} - "${truncateTitle(description, 30)}"`,
    onClose: toggleOpen,
    size: "large",
    children: [/*#__PURE__*/_jsx(Modal.Content, {
      children: /*#__PURE__*/_jsx(Modal.Columns, {
        hint: t('Only the account proposed as curator by the council can create the unassign curator transaction '),
        children: /*#__PURE__*/_jsx(InputAddress, {
          help: t('This account will be used to create the unassign curator transaction.'),
          isDisabled: true,
          label: t('curator account'),
          type: "account",
          value: curatorId.toString(),
          withLabel: true
        })
      })
    }), /*#__PURE__*/_jsx(Modal.Actions, {
      children: /*#__PURE__*/_jsx(TxButton, {
        accountId: curatorId,
        icon: "times",
        label: t('Reject'),
        onStart: toggleOpen,
        params: [index],
        tx: unassignCurator
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(BountyRejectCurator);