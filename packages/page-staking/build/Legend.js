// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { Badge, Icon } from '@axia-js/react-components';
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Legend({
  className,
  isRelay
}) {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsxs("span", {
      children: [/*#__PURE__*/_jsx(Badge, {
        color: "blue",
        icon: "chevron-right"
      }), t('Next session')]
    }), isRelay && /*#__PURE__*/_jsxs("span", {
      children: [/*#__PURE__*/_jsx(Badge, {
        color: "purple",
        icon: "vector-square"
      }), t('Para validator')]
    }), /*#__PURE__*/_jsxs("span", {
      children: [/*#__PURE__*/_jsx(Badge, {
        color: "green",
        info: "5"
      }), t('Produced blocks')]
    }), /*#__PURE__*/_jsxs("span", {
      children: [/*#__PURE__*/_jsx(Badge, {
        color: "green",
        info: /*#__PURE__*/_jsx(Icon, {
          icon: "envelope"
        })
      }), t('Online message')]
    }), /*#__PURE__*/_jsxs("span", {
      children: [/*#__PURE__*/_jsx(Badge, {
        color: "green",
        icon: "hand-paper"
      }), t('Nominating')]
    }), /*#__PURE__*/_jsxs("span", {
      children: [/*#__PURE__*/_jsx(Badge, {
        color: "red",
        icon: "balance-scale-right"
      }), t('Oversubscribed')]
    }), /*#__PURE__*/_jsxs("span", {
      children: [/*#__PURE__*/_jsx(Badge, {
        color: "red",
        icon: "skull-crossbones"
      }), t('Slashed')]
    }), /*#__PURE__*/_jsxs("span", {
      children: [/*#__PURE__*/_jsx(Badge, {
        color: "red",
        icon: "user-slash"
      }), t('Blocks nominations')]
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Legend).withConfig({
  displayName: "Legend",
  componentId: "sc-1acijyn-0"
})(["font-size:0.85rem;padding:1rem 0.5rem;text-align:center;.ui--Badge{margin-right:0.5rem;}span+span{margin-left:1rem;}"]));