// Copyright 2017-2021 @axia-js/app-tech-comm authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useRef } from 'react';
import { AddressSmall, Table, Tag } from '@axia-js/react-components';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Members({
  className = '',
  members,
  prime
}) {
  const {
    t
  } = useTranslation();
  const headerRef = useRef([[t('members'), 'start', 3]]);
  return /*#__PURE__*/_jsx(Table, {
    className: className,
    empty: members && t('No members found'),
    header: headerRef.current,
    children: members === null || members === void 0 ? void 0 : members.map(accountId => /*#__PURE__*/_jsxs("tr", {
      children: [/*#__PURE__*/_jsx("td", {
        className: "address",
        children: /*#__PURE__*/_jsx(AddressSmall, {
          value: accountId
        })
      }), /*#__PURE__*/_jsx("td", {
        children: (prime === null || prime === void 0 ? void 0 : prime.eq(accountId)) && /*#__PURE__*/_jsx(Tag, {
          color: "green",
          hover: t('Committee prime member, default voting'),
          label: t('prime member')
        })
      }), /*#__PURE__*/_jsx("td", {
        className: "all",
        children: "\xA0"
      })]
    }, accountId.toString()))
  });
}

export default /*#__PURE__*/React.memo(Members);