// Copyright 2017-2021 @axia-js/app-contracts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useState } from 'react';
import { InfoForInput } from '@axia-js/react-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import { keyring } from '@axia-js/ui-keyring';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";

function ValidateAddr({
  address,
  onChange
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const contractInfo = useCall(api.query.contracts.contractInfoOf, [address]);
  const [isAddress, setIsAddress] = useState(false);
  const [isStored, setIsStored] = useState(false);
  useEffect(() => {
    try {
      keyring.decodeAddress(address || '');
      setIsAddress(true);
    } catch (error) {
      setIsAddress(false);
    }
  }, [address]);
  useEffect(() => {
    setIsStored(!!(contractInfo !== null && contractInfo !== void 0 && contractInfo.isSome));
  }, [contractInfo]);
  useEffect(() => {
    onChange(isAddress && isStored);
  }, [isAddress, isStored, onChange]);

  if (isStored || !isAddress) {
    return null;
  }

  return /*#__PURE__*/_jsx(InfoForInput, {
    type: "error",
    children: isAddress ? t('Unable to find deployed contract code at the specified address') : t('The value is not in a valid address format')
  });
}

export default /*#__PURE__*/React.memo(ValidateAddr);