// Copyright 2017-2021 @axia-js/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useMemo, useState } from 'react';
import { Input, InputAddress, Modal, TxButton } from '@axia-js/react-components';
import { useBlockTime } from '@axia-js/react-hooks';
import { truncateTitle } from "../helpers/index.js";
import { increaseDateByBlocks } from "../helpers/increaseDateByBlocks.js";
import { useBounties } from "../hooks/index.js";
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function ExtendBountyExpiryAction({
  curatorId,
  description,
  index,
  toggleOpen
}) {
  const {
    t
  } = useTranslation();
  const {
    bountyUpdatePeriod,
    extendBountyExpiry
  } = useBounties();
  const [remark, setRemark] = useState('');
  const [blockTime, timeAsText] = useBlockTime(bountyUpdatePeriod);
  const onRemarkChange = useCallback(value => {
    setRemark(value);
  }, []);
  const expiryDate = useMemo(() => bountyUpdatePeriod && increaseDateByBlocks(bountyUpdatePeriod, blockTime), [bountyUpdatePeriod, blockTime]);
  return /*#__PURE__*/_jsx(_Fragment, {
    children: /*#__PURE__*/_jsxs(Modal, {
      header: `${t('extend expiry')} - "${truncateTitle(description, 30)}"`,
      onClose: toggleOpen,
      size: "large",
      children: [/*#__PURE__*/_jsxs(Modal.Content, {
        children: [/*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('Only curator can extend the bounty time.'),
          children: /*#__PURE__*/_jsx(InputAddress, {
            help: t('This account will be used to create an extend bounty expire transaction.'),
            isDisabled: true,
            label: t('curator account'),
            type: "account",
            value: curatorId.toString(),
            withLabel: true
          })
        }), expiryDate && /*#__PURE__*/_jsx(Modal.Columns, {
          hint: t(`Bounty expiry time will be set to ${timeAsText} from now.`),
          children: /*#__PURE__*/_jsx(Input, {
            help: t('The extended expiry date does not depend on the current expiry date.'),
            isDisabled: true,
            label: t('new expiry date and time'),
            value: `${expiryDate.toLocaleDateString()} ${expiryDate.toLocaleTimeString()}`
          })
        }), /*#__PURE__*/_jsx(Modal.Columns, {
          hint: t("The note that will be added to the transaction. It won't be stored on chain"),
          children: /*#__PURE__*/_jsx(Input, {
            autoFocus: true,
            defaultValue: '',
            help: t('The note linked to the extension call, explaining the reason behind it.'),
            label: t('bounty remark'),
            onChange: onRemarkChange,
            value: remark
          })
        })]
      }), /*#__PURE__*/_jsx(Modal.Actions, {
        children: /*#__PURE__*/_jsx(TxButton, {
          accountId: curatorId,
          icon: "check",
          label: t('Accept'),
          onStart: toggleOpen,
          params: [index, remark],
          tx: extendBountyExpiry
        })
      })]
    })
  });
}

export default /*#__PURE__*/React.memo(ExtendBountyExpiryAction);