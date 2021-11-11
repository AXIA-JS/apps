// Copyright 2017-2021 @axia-js/app-extrinsics authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useMemo, useState } from 'react';
import { Button, Extrinsic, InputAddress, MarkError, Output, TxButton } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import { BalanceFree } from '@axia-js/react-query';
import { u8aToHex } from '@axia-js/util';
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Selection({
  className
}) {
  const {
    t
  } = useTranslation();
  const {
    apiDefaultTxSudo
  } = useApi();
  const [accountId, setAccountId] = useState(null);
  const [error, setError] = useState(null);
  const [extrinsic, setExtrinsic] = useState(null);

  const _onExtrinsicChange = useCallback(method => setExtrinsic(() => method || null), []);

  const _onExtrinsicError = useCallback(error => setError(error ? error.message : null), []);

  const [extrinsicHex, extrinsicHash] = useMemo(() => {
    if (!extrinsic) {
      return ['0x', '0x'];
    }

    const u8a = extrinsic.method.toU8a(); // don't use the built-in hash, we only want to convert once

    return [u8aToHex(u8a), extrinsic.registry.hash(u8a).toHex()];
  }, [extrinsic]);
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsx(InputAddress, {
      label: t('using the selected account'),
      labelExtra: /*#__PURE__*/_jsx(BalanceFree, {
        label: /*#__PURE__*/_jsx("label", {
          children: t('free balance')
        }),
        params: accountId
      }),
      onChange: setAccountId,
      type: "account"
    }), /*#__PURE__*/_jsx(Extrinsic, {
      defaultValue: apiDefaultTxSudo,
      label: t('submit the following extrinsic'),
      onChange: _onExtrinsicChange,
      onError: _onExtrinsicError
    }), /*#__PURE__*/_jsx(Output, {
      isDisabled: true,
      isTrimmed: true,
      label: "encoded call data",
      value: extrinsicHex,
      withCopy: true
    }), /*#__PURE__*/_jsx(Output, {
      isDisabled: true,
      label: "encoded call hash",
      value: extrinsicHash,
      withCopy: true
    }), error && !extrinsic && /*#__PURE__*/_jsx(MarkError, {
      content: error
    }), /*#__PURE__*/_jsxs(Button.Group, {
      children: [/*#__PURE__*/_jsx(TxButton, {
        extrinsic: extrinsic,
        icon: "sign-in-alt",
        isUnsigned: true,
        label: t('Submit Unsigned'),
        withSpinner: true
      }), /*#__PURE__*/_jsx(TxButton, {
        accountId: accountId,
        extrinsic: extrinsic,
        icon: "sign-in-alt",
        label: t('Submit Transaction')
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(Selection);