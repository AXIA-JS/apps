// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Button, IdentityIcon } from '@axia-js/react-components';
import { u8aToHex } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Match({
  address,
  className = '',
  count,
  offset,
  onCreateToggle,
  onRemove,
  seed
}) {
  const {
    t
  } = useTranslation();
  const hexSeed = useMemo(() => u8aToHex(seed), [seed]);

  const _onCreate = useCallback(() => onCreateToggle(hexSeed), [hexSeed, onCreateToggle]);

  const _onRemove = useCallback(() => onRemove(address), [address, onRemove]);

  return /*#__PURE__*/_jsxs("tr", {
    className: className,
    children: [/*#__PURE__*/_jsx("td", {
      className: "number",
      colSpan: 2,
      children: /*#__PURE__*/_jsx(IdentityIcon, {
        className: "vanity--Match-icon",
        value: address
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "address all",
      children: /*#__PURE__*/_jsxs("div", {
        className: "vanity--Match-addr",
        children: [/*#__PURE__*/_jsx("span", {
          className: "no",
          children: address.slice(0, offset)
        }), /*#__PURE__*/_jsx("span", {
          className: "yes",
          children: address.slice(offset, count + offset)
        }), /*#__PURE__*/_jsx("span", {
          className: "no",
          children: address.slice(count + offset)
        })]
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "hash",
      children: hexSeed
    }), /*#__PURE__*/_jsxs("td", {
      className: "button",
      children: [/*#__PURE__*/_jsx(Button, {
        icon: "plus",
        label: t('Save'),
        onClick: _onCreate
      }), /*#__PURE__*/_jsx(Button, {
        icon: "times",
        onClick: _onRemove
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Match).withConfig({
  displayName: "Match",
  componentId: "sc-1su64a0-0"
})(["text-align:center;&:hover{background:#f9f8f7;}.vanity--Match-addr{font-size:1.1rem;.no{color:inherit;}.yes{color:red;}}.vanity--Match-buttons,.vanity--Match-data,.vanity--Match-icon{display:inline-block;vertical-align:middle;}.vanity--Match-item{display:inline-block;font:var(--font-mono);margin:0 auto;padding:0.5em;position:relative;}.vanity--Match-seed{opacity:0.45;padding:0 1rem;}"]));