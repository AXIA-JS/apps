// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect } from 'react';

function Null({
  onChange
}) {
  useEffect(() => {
    onChange && onChange({
      isValid: true,
      value: null
    });
  }, [onChange]);
  return null;
}

export default /*#__PURE__*/React.memo(Null);