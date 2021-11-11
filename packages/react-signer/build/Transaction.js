// Copyright 2017-2021 @axia-js/react-signer authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { Call, Expander, Modal } from '@axia-js/react-components';
import PaymentInfo from "./PaymentInfo.js";
import { useTranslation } from "./translate.js";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";

function Transaction({
  accountId,
  className,
  currentItem: {
    extrinsic,
    isUnsigned,
    payload
  },
  isSendable,
  onError,
  tip
}) {
  const {
    t
  } = useTranslation();

  if (!extrinsic) {
    return null;
  }

  const {
    meta,
    method,
    section
  } = extrinsic.registry.findMetaCall(extrinsic.callIndex);
  const args = (meta === null || meta === void 0 ? void 0 : meta.args.map(({
    name
  }) => name).join(', ')) || '';
  return /*#__PURE__*/_jsxs(Modal.Columns, {
    className: className,
    hint: t('The details of the transaction including the type, the description (as available from the chain metadata) as well as any parameters and fee estimations (as available) for the specific type of call.'),
    children: [/*#__PURE__*/_jsx(Expander, {
      className: "tx-details",
      summary: /*#__PURE__*/_jsxs(_Fragment, {
        children: [t('Sending transaction'), " ", /*#__PURE__*/_jsxs("span", {
          className: "highlight",
          children: [section, ".", method, "(", args, ")"]
        })]
      }),
      summaryMeta: meta,
      children: /*#__PURE__*/_jsx(Call, {
        onError: onError,
        value: extrinsic,
        withBorder: false
      })
    }), !isUnsigned && !payload && /*#__PURE__*/_jsx(PaymentInfo, {
      accountId: accountId,
      className: "tx-details",
      extrinsic: extrinsic,
      isSendable: isSendable,
      tip: tip
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Transaction).withConfig({
  displayName: "Transaction",
  componentId: "sc-1fcdp9p-0"
})([".tx-details{.ui--Expander-summary{font-size:1.1rem;margin:0 0 0.5rem;}.highlight{font-weight:var(--font-weight-normal);}.meta{margin-bottom:0.5rem;margin-left:2rem;}.meta,.mute{opacity:0.6;}}"]));