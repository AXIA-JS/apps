// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Params from '@axia-js/react-params';
import { FormatBalance } from '@axia-js/react-query';
import { Enum, getTypeDef } from '@axia-js/types';
import Static from "./Static.js";
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function isExtrinsic(value) {
  return !!value.signature;
} // This is no doubt NOT the way to do things - however there is no other option


function getRawSignature(value) {
  var _raw, _raw$signature;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return (_raw = value._raw) === null || _raw === void 0 ? void 0 : (_raw$signature = _raw.signature) === null || _raw$signature === void 0 ? void 0 : _raw$signature.multiSignature;
}

function extractState(value, withHash, withSignature) {
  const params = value.meta.args.map(({
    name,
    type
  }) => ({
    name: name.toString(),
    type: getTypeDef(type.toString())
  }));
  const values = value.args.map(value => ({
    isValid: true,
    value
  }));
  const hash = withHash ? value.hash.toHex() : null;
  let signature = null;
  let signatureType = null;

  if (withSignature && isExtrinsic(value) && value.isSigned) {
    const raw = getRawSignature(value);
    signature = value.signature.toHex();
    signatureType = raw instanceof Enum ? raw.type : null;
  }

  return {
    hash,
    params,
    signature,
    signatureType,
    values
  };
}

function Call({
  children,
  className = '',
  labelHash,
  labelSignature,
  mortality,
  onError,
  tip,
  value,
  withBorder,
  withHash,
  withSignature
}) {
  const {
    t
  } = useTranslation();
  const [{
    hash,
    params,
    signature,
    signatureType,
    values
  }, setExtracted] = useState({
    hash: null,
    params: [],
    signature: null,
    signatureType: null,
    values: []
  });
  useEffect(() => {
    setExtracted(extractState(value, withHash, withSignature));
  }, [value, withHash, withSignature]);
  return /*#__PURE__*/_jsxs("div", {
    className: `ui--Extrinsic ${className}`,
    children: [/*#__PURE__*/_jsx(Params, {
      isDisabled: true,
      onError: onError,
      params: params,
      registry: value.registry,
      values: values,
      withBorder: withBorder
    }), children, /*#__PURE__*/_jsxs("div", {
      className: "ui--Extrinsic--toplevel",
      children: [signature && /*#__PURE__*/_jsx(Static, {
        className: "hash",
        label: labelSignature || t('signature {{type}}', {
          replace: {
            type: signatureType ? `(${signatureType})` : ''
          }
        }),
        value: signature,
        withCopy: true
      }), hash && /*#__PURE__*/_jsx(Static, {
        className: "hash",
        label: labelHash || t('extrinsic hash'),
        value: hash,
        withCopy: true
      }), mortality && /*#__PURE__*/_jsx(Static, {
        className: "mortality",
        label: t('lifetime'),
        value: mortality
      }), (tip === null || tip === void 0 ? void 0 : tip.gtn(0)) && /*#__PURE__*/_jsx(Static, {
        className: "tip",
        label: t('tip'),
        value: /*#__PURE__*/_jsx(FormatBalance, {
          value: tip
        })
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Call).withConfig({
  displayName: "Call",
  componentId: "sc-14uolin-0"
})([".hash .ui--Static{overflow:hidden;text-overflow:ellipsis;word-break:unset;word-wrap:unset;}.ui--Extrinsic--toplevel{margin-top:0.75rem;.ui--Labelled{padding-left:0;> label{left:1.55rem !important;}}}"]));