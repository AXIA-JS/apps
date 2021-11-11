// Copyright 2017-2021 @axia-js/app-contracts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useState } from 'react';
import { CardSummary, SummaryBox } from '@axia-js/react-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import { formatNumber } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Summary({
  trigger
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const accountCounter = useCall(api.query.contracts.accountCounter);
  const [numContracts, setNumContracts] = useState(0);
  const [numHashes, setNumHashes] = useState(0);
  useEffect(() => {
    accountCounter && api.query.contracts.contractInfoOf.keys().then(arr => setNumContracts(arr.length)).catch(console.error);
  }, [api, accountCounter]);
  useEffect(() => {
    api.query.contracts.codeStorage.keys().then(arr => setNumHashes(arr.length)).catch(console.error);
  }, [api, trigger]);
  return /*#__PURE__*/_jsxs(SummaryBox, {
    children: [/*#__PURE__*/_jsx("section", {
      children: /*#__PURE__*/_jsx(CardSummary, {
        label: t('addresses'),
        children: formatNumber(accountCounter)
      })
    }), /*#__PURE__*/_jsxs("section", {
      children: [/*#__PURE__*/_jsx(CardSummary, {
        label: t('code hashes'),
        children: formatNumber(numHashes)
      }), /*#__PURE__*/_jsx(CardSummary, {
        label: t('contracts'),
        children: formatNumber(numContracts)
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(Summary);