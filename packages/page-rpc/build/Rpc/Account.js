// Copyright 2017-2021 @axia-js/app-rpc authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { InputAddress, Labelled } from '@axia-js/react-components';
import { Nonce } from '@axia-js/react-query';
import { BN_ZERO } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Account({
  className = '',
  defaultValue,
  isError,
  onChange
}) {
  const {
    t
  } = useTranslation();
  const [accountId, setAccountId] = useState(defaultValue);
  const [accountNonce, setAccountNonce] = useState(BN_ZERO);
  useEffect(() => {
    onChange(accountId, accountNonce);
  }, [accountId, accountNonce, onChange]);
  return /*#__PURE__*/_jsxs("div", {
    className: `ui--row ${className}`,
    children: [/*#__PURE__*/_jsx("div", {
      className: "large",
      children: /*#__PURE__*/_jsx(InputAddress, {
        defaultValue: defaultValue,
        isError: isError,
        label: t('sign data from account'),
        onChange: setAccountId,
        placeholder: "0x...",
        type: "account"
      })
    }), accountId && /*#__PURE__*/_jsx(Labelled, {
      className: "small",
      label: t('with an index of'),
      children: /*#__PURE__*/_jsx(Nonce, {
        callOnResult: setAccountNonce,
        className: "ui disabled dropdown selection",
        params: accountId
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Account).withConfig({
  displayName: "Account",
  componentId: "sc-1qn5gop-0"
})(["box-sizing:border-box;padding-left:2em;"]));