// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Nonce } from '@axia-js/react-query';
import { jsx as _jsx } from "react/jsx-runtime";

function NonceDisplay({
  className = '',
  label,
  params
}) {
  if (!params) {
    return null;
  }

  return /*#__PURE__*/_jsx(Nonce, {
    className: `ui--Nonce ${className}`,
    label: label,
    params: params.toString()
  });
}

export default /*#__PURE__*/React.memo(NonceDisplay);