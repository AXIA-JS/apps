// Copyright 2017-2021 @axia-js/react-signer authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Columar, MarkError, QrDisplayPayload, QrScanSignature, Spinner } from '@axia-js/react-components';
import { isHex } from '@axia-js/util';
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const CMD_HASH = 1;
const CMD_MORTAL = 2;

function Qr({
  address,
  className,
  genesisHash,
  isHashed,
  onSignature,
  payload
}) {
  const {
    t
  } = useTranslation();
  const [sigError, setSigError] = useState(null);

  const _onSignature = useCallback(data => {
    if (isHex(data.signature)) {
      onSignature(data);
    } else {
      const signature = data.signature;
      setSigError(t('Non-signature, non-hex data received from QR. Data contains "{{sample}}" instead of a hex-only signature. Please present the correct signature generated from the QR presented for submission.', {
        replace: {
          sample: signature.length > 47 ? `${signature.substr(0, 24)}…${signature.substr(-22)}` : signature
        }
      }));
    }
  }, [onSignature, t]);

  if (!address) {
    return /*#__PURE__*/_jsx(Spinner, {
      label: t('Preparing QR for signing')
    });
  }

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs(Columar, {
      className: className,
      children: [/*#__PURE__*/_jsx(Columar.Column, {
        children: /*#__PURE__*/_jsx("div", {
          className: "qrDisplay",
          children: /*#__PURE__*/_jsx(QrDisplayPayload, {
            address: address,
            cmd: isHashed ? CMD_HASH : CMD_MORTAL,
            genesisHash: genesisHash,
            payload: payload
          })
        })
      }), /*#__PURE__*/_jsx(Columar.Column, {
        children: /*#__PURE__*/_jsx("div", {
          className: "qrDisplay",
          children: /*#__PURE__*/_jsx(QrScanSignature, {
            onScan: _onSignature
          })
        })
      })]
    }), sigError && /*#__PURE__*/_jsx(MarkError, {
      className: "nomargin",
      content: sigError
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Qr).withConfig({
  displayName: "Qr",
  componentId: "sc-1ouy5cm-0"
})([".qrDisplay{margin:0 auto;max-width:30rem;img{border:1px solid white;}}"]));