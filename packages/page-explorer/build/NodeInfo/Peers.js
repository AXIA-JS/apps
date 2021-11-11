// Copyright 2017-2021 @axia-js/app-nodeinfo authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useRef } from 'react';
import styled from 'styled-components';
import { Table } from '@axia-js/react-components';
import { formatNumber } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Peers({
  className = '',
  peers
}) {
  const {
    t
  } = useTranslation();
  const headerRef = useRef([[t('connected peers'), 'start'], [t('role'), 'start'], [t('best #'), 'number'], [t('best hash'), 'hash']]);
  return /*#__PURE__*/_jsx(Table, {
    className: className,
    empty: t('no peers connected'),
    header: headerRef.current,
    children: peers === null || peers === void 0 ? void 0 : peers.sort((a, b) => b.bestNumber.cmp(a.bestNumber)).map(peer => /*#__PURE__*/_jsxs("tr", {
      children: [/*#__PURE__*/_jsx("td", {
        className: "hash",
        children: peer.peerId.toString()
      }), /*#__PURE__*/_jsx("td", {
        children: peer.roles.toString().toLowerCase()
      }), /*#__PURE__*/_jsx("td", {
        className: "number all",
        children: formatNumber(peer.bestNumber)
      }), /*#__PURE__*/_jsx("td", {
        className: "hash",
        children: peer.bestHash.toHex()
      })]
    }, peer.peerId.toString()))
  });
}

export default /*#__PURE__*/React.memo(styled(Peers).withConfig({
  displayName: "Peers",
  componentId: "sc-13bhwwe-0"
})(["overflow-x:auto;"]));