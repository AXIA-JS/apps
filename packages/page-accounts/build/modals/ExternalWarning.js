// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { MarkWarning } from '@axia-js/react-components';
import { useTranslation } from "../translate.js";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
const isElectron = navigator.userAgent.toLowerCase().indexOf(' electron/') > -1;

function ExternalWarning() {
  const {
    t
  } = useTranslation();

  if (isElectron) {
    return null;
  }

  return /*#__PURE__*/_jsx(MarkWarning, {
    content: /*#__PURE__*/_jsxs(_Fragment, {
      children: [t('Consider storing your account in a signer such as a browser extension, hardware device, QR-capable phone wallet (non-connected) or desktop application for optimal account security.'), "\xA0", t('Future versions of the web-only interface will drop support for non-external accounts, much like the IPFS version.')]
    })
  });
}

export default /*#__PURE__*/React.memo(ExternalWarning);