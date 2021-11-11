// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { CallExpander } from '@axia-js/react-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import { Holder } from '@axia-js/react-params';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";

function ExternalCell({
  className = '',
  value
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const preimage = useCall(api.derive.democracy.preimage, [value]);

  if (!(preimage !== null && preimage !== void 0 && preimage.proposal)) {
    return null;
  }

  return /*#__PURE__*/_jsx(Holder, {
    className: className,
    withBorder: true,
    withPadding: true,
    children: /*#__PURE__*/_jsx(CallExpander, {
      labelHash: t('proposal hash'),
      value: preimage.proposal,
      withHash: true
    })
  });
}

export default /*#__PURE__*/React.memo(ExternalCell);