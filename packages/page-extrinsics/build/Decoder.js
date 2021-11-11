import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/app-extrinsics authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useState } from 'react';
import { Button, Call as CallDisplay, Input, InputAddress, InputExtrinsic, MarkError, Output, TxButton } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import { BalanceFree } from '@axia-js/react-query';
import { assert, isHex } from '@axia-js/util';
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const DEFAULT_INFO = {
  extrinsic: null,
  extrinsicCall: null,
  extrinsicError: null,
  extrinsicFn: null,
  extrinsicHash: null,
  extrinsicHex: null
};

function Decoder({
  className
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [{
    extrinsic,
    extrinsicCall,
    extrinsicError,
    extrinsicFn,
    extrinsicHash
  }, setExtrinsicInfo] = useState(DEFAULT_INFO);
  const [accountId, setAccountId] = useState(null);

  const _setExtrinsicHex = useCallback(extrinsicHex => {
    try {
      assert(isHex(extrinsicHex), 'Expected a hex-encoded call');
      let extrinsicCall;

      try {
        // cater for an extrinsic input...
        extrinsicCall = api.createType('Call', api.tx(extrinsicHex).method);
      } catch (e) {
        extrinsicCall = api.createType('Call', extrinsicHex);
      }

      const extrinsicHash = extrinsicCall.hash.toHex();
      const {
        method,
        section
      } = api.registry.findMetaCall(extrinsicCall.callIndex);
      const extrinsicFn = api.tx[section][method];
      const extrinsic = extrinsicFn(...extrinsicCall.args);
      setExtrinsicInfo(_objectSpread(_objectSpread({}, DEFAULT_INFO), {}, {
        extrinsic,
        extrinsicCall,
        extrinsicFn,
        extrinsicHash,
        extrinsicHex
      }));
    } catch (e) {
      setExtrinsicInfo(_objectSpread(_objectSpread({}, DEFAULT_INFO), {}, {
        extrinsicError: e.message
      }));
    }
  }, [api]);

  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsx(Input, {
      isError: !extrinsicFn,
      label: t('hex-encoded call'),
      onChange: _setExtrinsicHex,
      placeholder: t('0x...')
    }), extrinsicError && /*#__PURE__*/_jsx(MarkError, {
      content: extrinsicError
    }), extrinsicFn && extrinsicCall && /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(InputExtrinsic, {
        defaultValue: extrinsicFn,
        isDisabled: true,
        label: t('decoded call')
      }), /*#__PURE__*/_jsx(CallDisplay, {
        className: "details",
        value: extrinsicCall
      })]
    }), extrinsicHash && /*#__PURE__*/_jsx(Output, {
      isDisabled: true,
      label: "encoded call hash",
      value: extrinsicHash,
      withCopy: true
    }), /*#__PURE__*/_jsx(InputAddress, {
      label: t('using the selected account'),
      labelExtra: /*#__PURE__*/_jsx(BalanceFree, {
        label: /*#__PURE__*/_jsx("label", {
          children: t('free balance')
        }),
        params: accountId
      }),
      onChange: setAccountId,
      type: "account"
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

export default /*#__PURE__*/React.memo(Decoder);