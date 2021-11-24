// Copyright 2017-2021 @axia-js/app-contracts authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable camelcase */
import React, { useMemo } from 'react';
import { InfoForInput } from '@axia-js/react-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import { isHex } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";

function ValidateCode({
  codeHash,
  onChange
}) {
  const {
    api
  } = useApi();
  const {
    t
  } = useTranslation();
  const codeStorage = useCall((api.query.contracts || api.query.contract).codeStorage, [codeHash]);
  const [isValidHex, isValid] = useMemo(() => {
    const isValidHex = !!codeHash && isHex(codeHash) && codeHash.length === 66;
    const isStored = !!codeStorage && codeStorage.isSome;
    const isValid = isValidHex && isStored;
    onChange(isValid);
    return [isValidHex, isValid];
  }, [codeHash, codeStorage, onChange]);

  if (isValid || !isValidHex) {
    return null;
  }

  return /*#__PURE__*/_jsx(InfoForInput, {
    type: "error",
    children: isValidHex ? t('Unable to find on-chain WASM code for the supplied codeHash') : t('The codeHash is not a valid hex hash')
  });
}

export default /*#__PURE__*/React.memo(ValidateCode);