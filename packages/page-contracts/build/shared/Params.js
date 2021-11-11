// Copyright 2017-2021 @axia-js/app-contracts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect, useState } from 'react';
import UIParams from '@axia-js/react-params';
import { jsx as _jsx } from "react/jsx-runtime";

function Params({
  isDisabled,
  onChange,
  onEnter,
  params: propParams,
  registry
}) {
  const [params, setParams] = useState([]);
  useEffect(() => {
    propParams && setParams(propParams);
  }, [propParams]);

  const _onChange = useCallback(values => onChange(values.map(({
    value
  }) => value)), [onChange]);

  if (!params.length) {
    return null;
  }

  return /*#__PURE__*/_jsx(UIParams, {
    isDisabled: isDisabled,
    onChange: _onChange,
    onEnter: onEnter,
    params: params,
    registry: registry
  });
}

export default /*#__PURE__*/React.memo(Params);