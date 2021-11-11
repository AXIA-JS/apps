// Copyright 2017-2021 @axia-js/app-claims authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { AddressMini, Card } from '@axia-js/react-components';
import { useTranslation } from "./translate.js";
import useAXIAPreclaims from "./useAXIAPreclaims.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Warning({
  className
}) {
  const {
    t
  } = useTranslation();
  const needsAttest = useAXIAPreclaims();

  if (!needsAttest.length) {
    return null;
  }

  return /*#__PURE__*/_jsx(Card, {
    isError: true,
    children: /*#__PURE__*/_jsxs("div", {
      className: className,
      children: [needsAttest.length > 1 ? t('You need to sign an attestation for the following accounts:') : t('You need to sign an attestation for the following account:'), needsAttest.map(address => /*#__PURE__*/_jsx(AddressMini, {
        value: address
      }, address))]
    })
  });
}

export default /*#__PURE__*/React.memo(styled(Warning).withConfig({
  displayName: "Warning",
  componentId: "sc-9xp5zu-0"
})(["font-size:1.15rem;display:flex;flex-direction:column;justify-content:center;min-height:8rem;align-items:center;margin:0 1rem;.ui--AddressMini-address{max-width:20rem;}"]));