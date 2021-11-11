"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _Account = _interopRequireDefault(require("./Account.cjs"));

var _useBalances = _interopRequireDefault(require("./useBalances.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-assets authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Balances({
  className,
  infos = []
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const [infoIndex, setInfoIndex] = (0, _react.useState)(0);
  const [info, setInfo] = (0, _react.useState)(null);
  const balances = (0, _useBalances.default)(info === null || info === void 0 ? void 0 : info.id);
  const headerRef = (0, _react.useRef)([[t('accounts'), 'start'], [t('frozen'), 'start'], [t('sufficient'), 'start'], [], []]);
  const completeInfos = (0, _react.useMemo)(() => infos.filter(i => !!(i.details && i.metadata) && !i.details.supply.isZero()).sort((a, b) => a.id.cmp(b.id)), [infos]);
  const assetOptions = (0, _react.useMemo)(() => completeInfos.map(({
    id,
    metadata
  }, index) => ({
    text: `${metadata.name.toUtf8()} (${(0, _util.formatNumber)(id)})`,
    value: index
  })), [completeInfos]);
  const siFormat = (0, _react.useMemo)(() => info ? [info.metadata.decimals.toNumber(), info.metadata.symbol.toUtf8().toUpperCase()] : [0, 'NONE'], [info]);
  (0, _react.useEffect)(() => {
    setInfo(() => infoIndex >= 0 && infoIndex < completeInfos.length ? completeInfos[infoIndex] : null);
  }, [completeInfos, infoIndex]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: className,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Table, {
      empty: info && balances && t('No accounts with balances found for the asset'),
      filter: assetOptions.length ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Dropdown, {
        isFull: true,
        label: t('the asset to query for balances'),
        onChange: setInfoIndex,
        options: assetOptions,
        value: infoIndex
      }) : undefined,
      header: headerRef.current,
      children: info && (balances === null || balances === void 0 ? void 0 : balances.map(({
        accountId,
        balance
      }) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Account.default, {
        accountId: accountId,
        assetId: info.id,
        balance: balance,
        minBalance: info.details.minBalance,
        siFormat: siFormat
      }, accountId)))
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo(Balances);

exports.default = _default;