// Copyright 2017-2021 @axia-js/app-assets authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useMemo, useState } from 'react';
import { Input, InputAddress, InputBalance, InputNumber, Modal } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import { BN_ZERO } from '@axia-js/util';
import { useTranslation } from "../../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Info({
  assetIds,
  className = '',
  defaultValue,
  onChange,
  openId
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [initial] = useState(() => defaultValue);
  const [initialId] = useState(() => openId);
  const [accountId, setAccountId] = useState(null);
  const [assetId, setAssetId] = useState(null);
  const [assetDecimals, setAssetDecimals] = useState(null);
  const [assetName, setAssetName] = useState(() => defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.assetName);
  const [assetSymbol, setAssetSymbol] = useState(() => defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.assetSymbol);
  const [minBalance, setMinBalance] = useState(null);
  const [siDecimals, siSymbol] = useMemo(() => assetDecimals && assetSymbol ? [assetDecimals.toNumber(), assetSymbol.toUpperCase()] : [0, 'NONE'], [assetDecimals, assetSymbol]);
  const isValidDecimals = useMemo(() => !!assetDecimals && assetDecimals.lten(20), [assetDecimals]);
  const isValidName = useMemo(() => !!assetName && assetName.length >= 3 && assetName.length <= 32, [assetName]);
  const isValidSymbol = useMemo(() => !!assetSymbol && assetSymbol.length >= 3 && assetSymbol.length <= 7, [assetSymbol]);
  const isValidId = useMemo(() => !!assetId && assetId.gt(BN_ZERO) && !assetIds.some(a => a.eq(assetId)), [assetId, assetIds]);
  useEffect(() => {
    onChange(assetId && assetName && assetSymbol && assetDecimals && isValidId && isValidName && isValidSymbol && isValidDecimals && accountId && minBalance && !minBalance.isZero() ? {
      accountId,
      assetDecimals,
      assetId,
      assetName,
      assetSymbol,
      minBalance
    } : null);
  }, [api, accountId, assetDecimals, assetId, assetIds, assetName, assetSymbol, isValidId, isValidName, isValidSymbol, isValidDecimals, minBalance, onChange]);
  return /*#__PURE__*/_jsxs(Modal.Content, {
    className: className,
    children: [/*#__PURE__*/_jsx(Modal.Columns, {
      hint: t('The account that is to be used to create this asset and setup the initial metadata.'),
      children: /*#__PURE__*/_jsx(InputAddress, {
        defaultValue: initial === null || initial === void 0 ? void 0 : initial.accountId,
        label: t('creator account'),
        onChange: setAccountId,
        type: "account"
      })
    }), /*#__PURE__*/_jsx(Modal.Columns, {
      hint: t('The descriptive name for this asset.'),
      children: /*#__PURE__*/_jsx(Input, {
        autoFocus: true,
        defaultValue: initial === null || initial === void 0 ? void 0 : initial.assetName,
        isError: !isValidName,
        label: t('asset name'),
        onChange: setAssetName
      })
    }), /*#__PURE__*/_jsx(Modal.Columns, {
      hint: t('The symbol that will represent this asset.'),
      children: /*#__PURE__*/_jsx(Input, {
        defaultValue: initial === null || initial === void 0 ? void 0 : initial.assetSymbol,
        isError: !isValidSymbol,
        label: t('asset symbol'),
        onChange: setAssetSymbol
      })
    }), /*#__PURE__*/_jsx(Modal.Columns, {
      hint: t('The number of decimals for this token. Max allowed via the UI is set to 20.'),
      children: /*#__PURE__*/_jsx(InputNumber, {
        defaultValue: initial === null || initial === void 0 ? void 0 : initial.assetDecimals,
        isError: !isValidDecimals,
        label: t('asset decimals'),
        onChange: setAssetDecimals
      })
    }), /*#__PURE__*/_jsx(Modal.Columns, {
      hint: t('The minimum balance for the asset. This is specified in the units and decimals as requested.'),
      children: /*#__PURE__*/_jsx(InputBalance, {
        defaultValue: initial === null || initial === void 0 ? void 0 : initial.minBalance,
        isZeroable: false,
        label: t('minimum balance'),
        onChange: setMinBalance,
        siDecimals: siDecimals,
        siSymbol: siSymbol
      })
    }), /*#__PURE__*/_jsx(Modal.Columns, {
      hint: t('The selected id for the asset. This should not match an already-existing asset id.'),
      children: /*#__PURE__*/_jsx(InputNumber, {
        defaultValue: (initial === null || initial === void 0 ? void 0 : initial.assetId) || initialId,
        isError: !isValidId,
        isZeroable: false,
        label: t('asset id'),
        onChange: setAssetId
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(Info);