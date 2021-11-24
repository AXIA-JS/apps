// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Available } from '@axia-js/react-query';
import { jsx as _jsx } from "react/jsx-runtime";

function AvailableDisplay({
  className = '',
  label,
  params
}) {
  if (!params) {
    return null;
  }

  return /*#__PURE__*/_jsx(Available, {
    className: `ui--Available ${className}`,
    label: label,
    params: params
  });
}

export default /*#__PURE__*/React.memo(AvailableDisplay);