// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { Flag } from '@axia-js/react-components';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Flags({
  className = '',
  flags: {
    isCouncil,
    isDevelopment,
    isExternal,
    isInjected,
    isMultisig,
    isNominator,
    isProxied,
    isSociety,
    isSudo,
    isTechCommittee,
    isValidator
  }
}) {
  const {
    t
  } = useTranslation();
  const hasFlags = isCouncil || isDevelopment || isExternal || isInjected || isMultisig || isProxied || isSociety || isSudo || isTechCommittee || isValidator || isNominator;

  if (!hasFlags) {
    return null;
  }

  return /*#__PURE__*/_jsxs("div", {
    className: `${className} ui--AddressMenu-flags`,
    children: [hasFlags && /*#__PURE__*/_jsx("h5", {
      children: t('Flags')
    }), /*#__PURE__*/_jsxs("div", {
      children: [isValidator && /*#__PURE__*/_jsx(Flag, {
        color: "theme",
        label: t('Validator')
      }), isNominator && /*#__PURE__*/_jsx(Flag, {
        color: "theme",
        label: t('Nominator')
      }), isExternal && (isMultisig ? /*#__PURE__*/_jsx(Flag, {
        color: "green",
        label: t('Multisig')
      }) : isProxied ? /*#__PURE__*/_jsx(Flag, {
        color: "grey",
        label: t('Proxied')
      }) : /*#__PURE__*/_jsx(Flag, {
        color: "grey",
        label: t('External')
      })), isInjected && /*#__PURE__*/_jsx(Flag, {
        color: "grey",
        label: t('Injected')
      }), isDevelopment && /*#__PURE__*/_jsx(Flag, {
        color: "grey",
        label: t('Test account')
      }), isCouncil && /*#__PURE__*/_jsx(Flag, {
        color: "blue",
        label: t('Council')
      }), isSociety && /*#__PURE__*/_jsx(Flag, {
        color: "green",
        label: t('Society')
      }), isTechCommittee && /*#__PURE__*/_jsx(Flag, {
        color: "orange",
        label: t('Technical committee')
      }), isSudo && /*#__PURE__*/_jsx(Flag, {
        color: "pink",
        label: t('Sudo key')
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Flags).withConfig({
  displayName: "Flags",
  componentId: "sc-hxdu5s-0"
})(["h5{text-align:left;font-style:normal;font-weight:var(--font-weight-bold);font-size:0.714rem;line-height:1rem;text-transform:uppercase;margin-bottom:0.5rem;}.ui--Tag{margin:0.2rem 1rem 0.2rem 0.571rem;}"]));