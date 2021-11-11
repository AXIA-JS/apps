// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useState } from 'react';
import { MarkWarning } from '@axia-js/react-components';
import { BN_TEN } from '@axia-js/util';
import { useTranslation } from "../../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";

function InputValidationUnstakeThreshold({
  onError,
  unstakeThreshold
}) {
  const {
    t
  } = useTranslation();
  const [error, setError] = useState(null);
  useEffect(() => {
    if (unstakeThreshold) {
      let newError = null;

      if (unstakeThreshold.ltn(0)) {
        newError = t('The Threshold must be a positive number');
      } else if (unstakeThreshold.gt(BN_TEN)) {
        newError = t('The Threshold must lower than 11');
      }

      onError(newError);
      setError(error => error !== newError ? newError : error);
    }
  }, [onError, t, unstakeThreshold]);

  if (!error) {
    return null;
  }

  return /*#__PURE__*/_jsx(MarkWarning, {
    content: error
  });
}

export default /*#__PURE__*/React.memo(InputValidationUnstakeThreshold);