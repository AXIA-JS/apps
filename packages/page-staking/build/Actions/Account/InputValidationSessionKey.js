// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useState } from 'react';
import { MarkWarning } from '@axia-js/react-components';
import { useTranslation } from "../../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";

function ValidateSessionEd25519({
  onError,
  sessionId,
  stashId
}) {
  const {
    t
  } = useTranslation();
  const [error, setError] = useState(null);
  useEffect(() => {
    let newError = null;

    if (sessionId === stashId) {
      newError = t('For fund security, your session key should not match your stash key.');
    }

    onError(newError);
    setError(error => error !== newError ? newError : error);
  }, [onError, sessionId, stashId, t]);

  if (!error) {
    return null;
  }

  return /*#__PURE__*/_jsx(MarkWarning, {
    content: error
  });
}

export default /*#__PURE__*/React.memo(ValidateSessionEd25519);