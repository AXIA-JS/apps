// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import InputAddress from "./InputAddress/index.js";
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";

function VoteAccount({
  className = '',
  filter,
  onChange
}) {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/_jsx(InputAddress, {
    className: className,
    filter: filter,
    help: t('Select the account you wish to vote with. You can approve "aye" or deny "nay" the proposal.'),
    label: t('vote with account'),
    onChange: onChange,
    type: "account",
    withLabel: true
  });
}

export default /*#__PURE__*/React.memo(VoteAccount);