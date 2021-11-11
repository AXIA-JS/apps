// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { InputAddress, Modal, TxButton } from '@axia-js/react-components';
import { truncateTitle } from "../helpers/index.js";
import { useBounties } from "../hooks/index.js";
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function BountyGiveUpCurator({
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
    header: `${t("give up curator's role")} - "${truncateTitle(description, 30)}"`,
    onClose: toggleOpen,
    size: "large",
    children: [/*#__PURE__*/_jsx(Modal.Content, {
      children: /*#__PURE__*/_jsx(Modal.Columns, {
        hint: t('You are giving up your curator role, the bounty will return to the Funded state. You will get your deposit back.'),
        children: /*#__PURE__*/_jsx(InputAddress, {
          help: t('The Curator account that will give up on it\'s role.'),
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
        icon: "check",
        label: t('Give up'),
        onStart: toggleOpen,
        params: [index],
        tx: unassignCurator
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(BountyGiveUpCurator);