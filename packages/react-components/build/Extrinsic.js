// Copyright 2017-2021 @axia-js/app-extrinsics authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect, useState } from 'react';
import Params from '@axia-js/react-params';
import { getTypeDef } from '@axia-js/types/create';
import { isUndefined } from '@axia-js/util';
import InputExtrinsic from "./InputExtrinsic/index.js";
import paramComponents from "./Params/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function getParams({
  meta
}) {
  return meta.args.map(arg => ({
    name: arg.name.toString(),
    type: getTypeDef(arg.type.toString())
  }));
}

function ExtrinsicDisplay({
  defaultValue,
  isDisabled,
  isError,
  isPrivate,
  label,
  onChange,
  onEnter,
  onError,
  onEscape,
  withLabel
}) {
  const [extrinsic, setCall] = useState({
    fn: defaultValue,
    params: getParams(defaultValue)
  });
  const [values, setValues] = useState([]);
  useEffect(() => {
    setValues([]);
  }, [extrinsic]);
  useEffect(() => {
    const isValid = values.reduce((isValid, value) => isValid && !isUndefined(value) && !isUndefined(value.value) && value.isValid, extrinsic.params.length === values.length);
    let method;

    if (isValid) {
      try {
        method = extrinsic.fn(...values.map(({
          value
        }) => value));
      } catch (error) {
        onError && onError(error);
      }
    } else {
      onError && onError(null);
    }

    onChange(method);
  }, [extrinsic, onChange, onError, values]);

  const _onChangeMethod = useCallback(fn => setCall({
    fn,
    params: getParams(fn)
  }), []);

  const {
    fn: {
      meta,
      method,
      section
    },
    params
  } = extrinsic;
  return /*#__PURE__*/_jsxs("div", {
    className: "extrinsics--Extrinsic",
    children: [/*#__PURE__*/_jsx(InputExtrinsic, {
      defaultValue: defaultValue,
      help: meta === null || meta === void 0 ? void 0 : meta.docs.join(' '),
      isDisabled: isDisabled,
      isError: isError,
      isPrivate: isPrivate,
      label: label,
      onChange: _onChangeMethod,
      withLabel: withLabel
    }), /*#__PURE__*/_jsx(Params, {
      onChange: setValues,
      onEnter: onEnter,
      onEscape: onEscape,
      overrides: paramComponents,
      params: params
    }, `${section}.${method}:params`
    /* force re-render on change */
    )]
  });
}

export default /*#__PURE__*/React.memo(ExtrinsicDisplay);