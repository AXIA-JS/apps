// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { InputAddress, Modal } from '@axia-js/react-components';
import { useTranslation } from "../../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function SenderInfo({
  className = '',
  controllerId,
  stashId
}) {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/_jsxs(Modal.Columns, {
    className: className,
    hint: t('The stash that is to be affected. The transaction will be sent from the associated controller account.'),
    children: [/*#__PURE__*/_jsx(InputAddress, {
      defaultValue: stashId,
      isDisabled: true,
      label: t('stash account')
    }), /*#__PURE__*/_jsx(InputAddress, {
      defaultValue: controllerId,
      isDisabled: true,
      label: t('controller account')
    })]
  });
}

export default /*#__PURE__*/React.memo(SenderInfo);