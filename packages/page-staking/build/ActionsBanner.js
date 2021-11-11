// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { MarkWarning } from '@axia-js/react-components';
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";

function ActionsBanner() {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/_jsx(MarkWarning, {
    className: "warning centered",
    content: t('Use the account actions to create a new validator/nominator stash and bond it to participate in staking. Do not send funds directly via a transfer to a validator.')
  });
}

export default /*#__PURE__*/React.memo(ActionsBanner);