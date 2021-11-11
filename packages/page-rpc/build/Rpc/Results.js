// Copyright 2017-2021 @axia-js/app-rpc authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Output } from '@axia-js/react-components';
import valueToText from '@axia-js/react-params/valueToText';
import { isUndefined } from '@axia-js/util';
import { jsx as _jsx } from "react/jsx-runtime";

function Results({
  queue = []
}) {
  const filtered = queue.filter(({
    error,
    result
  }) => !isUndefined(error) || !isUndefined(result)).reverse();

  if (!filtered.length) {
    return null;
  }

  return /*#__PURE__*/_jsx("section", {
    className: "rpc--Results",
    children: filtered.map(({
      error,
      id,
      result,
      rpc: {
        method,
        section
      }
    }) => /*#__PURE__*/_jsx(Output, {
      isError: !!error,
      label: `${id}: ${section}.${method}`,
      value: error ? error.message : /*#__PURE__*/_jsx("pre", {
        children: valueToText('', result, false)
      })
    }, id))
  });
}

export default /*#__PURE__*/React.memo(Results);