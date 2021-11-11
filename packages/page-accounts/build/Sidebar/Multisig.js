// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { AddressMini } from '@axia-js/react-components';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Multisig({
  isMultisig,
  meta
}) {
  const {
    t
  } = useTranslation();

  if (!isMultisig || !meta) {
    return null;
  }

  const {
    threshold,
    who
  } = meta;
  return /*#__PURE__*/_jsxs("section", {
    className: "ui--AddressMenu-multisig withDivider",
    children: [/*#__PURE__*/_jsx("div", {
      className: "ui--AddressMenu-sectionHeader",
      children: t('multisig')
    }), /*#__PURE__*/_jsxs("div", {
      className: "ui--AddressMenu-multisigTable",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "tr",
        children: [/*#__PURE__*/_jsx("div", {
          className: "th",
          children: t('threshold')
        }), /*#__PURE__*/_jsxs("div", {
          className: "td",
          children: [threshold, "/", who.length]
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "tr",
        children: [/*#__PURE__*/_jsx("div", {
          className: "th signatories",
          children: t('signatories')
        }), /*#__PURE__*/_jsx("div", {
          className: "td",
          children: who === null || who === void 0 ? void 0 : who.map(address => /*#__PURE__*/_jsx(AddressMini, {
            value: address
          }, address))
        })]
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(Multisig);