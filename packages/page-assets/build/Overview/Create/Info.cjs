"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _translate = require("../../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-assets authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Info(_ref) {
  let {
    assetIds,
    className = '',
    defaultValue,
    onChange,
    openId
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [initial] = (0, _react.useState)(() => defaultValue);
  const [initialId] = (0, _react.useState)(() => openId);
  const [accountId, setAccountId] = (0, _react.useState)(null);
  const [assetId, setAssetId] = (0, _react.useState)(null);
  const [assetDecimals, setAssetDecimals] = (0, _react.useState)(null);
  const [assetName, setAssetName] = (0, _react.useState)(() => defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.assetName);
  const [assetSymbol, setAssetSymbol] = (0, _react.useState)(() => defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.assetSymbol);
  const [minBalance, setMinBalance] = (0, _react.useState)(null);
  const [siDecimals, siSymbol] = (0, _react.useMemo)(() => assetDecimals && assetSymbol ? [assetDecimals.toNumber(), assetSymbol.toUpperCase()] : [0, 'NONE'], [assetDecimals, assetSymbol]);
  const isValidDecimals = (0, _react.useMemo)(() => !!assetDecimals && assetDecimals.lten(20), [assetDecimals]);
  const isValidName = (0, _react.useMemo)(() => !!assetName && assetName.length >= 3 && assetName.length <= 32, [assetName]);
  const isValidSymbol = (0, _react.useMemo)(() => !!assetSymbol && assetSymbol.length >= 3 && assetSymbol.length <= 7, [assetSymbol]);
  const isValidId = (0, _react.useMemo)(() => !!assetId && assetId.gt(_util.BN_ZERO) && !assetIds.some(a => a.eq(assetId)), [assetId, assetIds]);
  (0, _react.useEffect)(() => {
    onChange(assetId && assetName && assetSymbol && assetDecimals && isValidId && isValidName && isValidSymbol && isValidDecimals && accountId && minBalance && !minBalance.isZero() ? {
      accountId,
      assetDecimals,
      assetId,
      assetName,
      assetSymbol,
      minBalance
    } : null);
  }, [api, accountId, assetDecimals, assetId, assetIds, assetName, assetSymbol, isValidId, isValidName, isValidSymbol, isValidDecimals, minBalance, onChange]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
      hint: t('The account that is to be used to create this asset and setup the initial metadata.'),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
        defaultValue: initial === null || initial === void 0 ? void 0 : initial.accountId,
        label: t('creator account'),
        onChange: setAccountId,
        type: "account"
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
      hint: t('The descriptive name for this asset.'),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
        autoFocus: true,
        defaultValue: initial === null || initial === void 0 ? void 0 : initial.assetName,
        isError: !isValidName,
        label: t('asset name'),
        onChange: setAssetName
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
      hint: t('The symbol that will represent this asset.'),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
        defaultValue: initial === null || initial === void 0 ? void 0 : initial.assetSymbol,
        isError: !isValidSymbol,
        label: t('asset symbol'),
        onChange: setAssetSymbol
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
      hint: t('The number of decimals for this token. Max allowed via the UI is set to 20.'),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputNumber, {
        defaultValue: initial === null || initial === void 0 ? void 0 : initial.assetDecimals,
        isError: !isValidDecimals,
        label: t('asset decimals'),
        onChange: setAssetDecimals
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
      hint: t('The minimum balance for the asset. This is specified in the units and decimals as requested.'),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputBalance, {
        defaultValue: initial === null || initial === void 0 ? void 0 : initial.minBalance,
        isZeroable: false,
        label: t('minimum balance'),
        onChange: setMinBalance,
        siDecimals: siDecimals,
        siSymbol: siSymbol
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
      hint: t('The selected id for the asset. This should not match an already-existing asset id.'),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputNumber, {
        defaultValue: (initial === null || initial === void 0 ? void 0 : initial.assetId) || initialId,
        isError: !isValidId,
        isZeroable: false,
        label: t('asset id'),
        onChange: setAssetId
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Info);

exports.default = _default;