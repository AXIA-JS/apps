// Copyright 2017-2021 @axia-js/app-js authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AddressMini, InputAddress, Labelled, TxButton } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function SetKey({
  allAccounts,
  className = '',
  isMine,
  sudoKey
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    sudoKey && !selected && setSelected(sudoKey);
  }, [selected, sudoKey]);
  const willLose = isMine && !!selected && selected !== sudoKey && allAccounts.some(s => s === selected);
  return /*#__PURE__*/_jsxs("section", {
    children: [/*#__PURE__*/_jsx("section", {
      className: `${className} ui--row`,
      children: isMine ? /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(InputAddress, {
          className: "sudoInputAddress",
          isInput: true,
          label: t('sudo key'),
          onChange: setSelected,
          type: "all",
          value: selected
        }), /*#__PURE__*/_jsx(TxButton, {
          accountId: sudoKey,
          icon: "sign-in-alt",
          isDisabled: !isMine || sudoKey === selected,
          label: t('Reassign'),
          params: [selected],
          tx: api.tx.sudo.setKey
        })]
      }) : /*#__PURE__*/_jsx(Labelled, {
        className: "ui--Dropdown sudoLabelled",
        label: t('sudo key'),
        withLabel: true,
        children: /*#__PURE__*/_jsx(AddressMini, {
          value: sudoKey
        })
      })
    }), willLose && /*#__PURE__*/_jsx("article", {
      className: "warning padded",
      children: /*#__PURE__*/_jsx("div", {
        children: t('You will no longer have sudo access')
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(SetKey).withConfig({
  displayName: "SetKey",
  componentId: "sc-q69nmt-0"
})(["align-items:flex-end;justify-content:center;.summary{text-align:center;}.sudoInputAddress{margin:-0.25rem 0.5rem -0.25rem 0;}.sudoLabelled{align-items:center;}"]));