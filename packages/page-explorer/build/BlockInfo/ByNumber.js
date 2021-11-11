// Copyright 2017-2021 @axia-js/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useState } from 'react';
import { Spinner } from '@axia-js/react-components';
import { useApi, useIsMountedRef } from '@axia-js/react-hooks';
import BlockByHash from "./ByHash.js";
import { jsx as _jsx } from "react/jsx-runtime";

function BlockByNumber({
  value
}) {
  const {
    api
  } = useApi();
  const [getBlockHash, setState] = useState(null);
  const mountedRef = useIsMountedRef();
  const [error, setError] = useState(null);
  useEffect(() => {
    api.rpc.chain.getBlockHash(value).then(result => {
      mountedRef.current && setState(result);
    }).catch(error => {
      mountedRef.current && setError(error);
    });
  }, [api, mountedRef, value]);

  if (!getBlockHash && !error) {
    return /*#__PURE__*/_jsx(Spinner, {});
  }

  return /*#__PURE__*/_jsx(BlockByHash, {
    error: error,
    value: getBlockHash ? getBlockHash.toHex() : null
  });
}

export default /*#__PURE__*/React.memo(BlockByNumber);