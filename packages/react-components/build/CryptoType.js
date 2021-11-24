// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useState } from 'react';
import { getAccountCryptoType } from "./util/index.js";
import { jsxs as _jsxs } from "react/jsx-runtime";

function CryptoType({
  accountId,
  className = '',
  label = ''
}) {
  const [type, setType] = useState('unknown');
  useEffect(() => {
    const result = getAccountCryptoType(accountId);

    if (result !== 'unknown') {
      setType(result);
    }
  }, [accountId]);
  return /*#__PURE__*/_jsxs("div", {
    className: `ui--CryptoType ${className}`,
    children: [label, type]
  });
}

export default /*#__PURE__*/React.memo(CryptoType);