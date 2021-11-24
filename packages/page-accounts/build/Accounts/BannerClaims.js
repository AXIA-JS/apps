// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import useClaimCounter from '@axia-js/app-claims/useCounter'; // exceptionally CRAP idea

import { useTranslation } from "../translate.js";
import Banner from "./Banner.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function BannerExtension() {
  const claimCount = useClaimCounter();
  const {
    t
  } = useTranslation();

  if (!claimCount) {
    return null;
  }

  return /*#__PURE__*/_jsx(Banner, {
    type: "error",
    children: /*#__PURE__*/_jsxs("p", {
      children: [t('You have {{claimCount}} accounts that need attestations. Use the Claim Tokens app on the navigation bar to complete the process. Until you do, your balances for those accounts will not be reflected.', {
        replace: {
          claimCount
        }
      }), "\xA0", /*#__PURE__*/_jsx("a", {
        href: "#/claims",
        children: t('Claim tokens...')
      })]
    })
  });
}

export default /*#__PURE__*/React.memo(BannerExtension);