"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactHooks = require("@axia-js/react-hooks");

var _chains = require("@axia-js/ui-settings/defaults/chains");

var _Toggle = _interopRequireDefault(require("./Toggle.cjs"));

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
function calcLock(apiGenesis, genesisHash) {
  if (!genesisHash) {
    return false;
  }

  return (Object.values(_chains.chains).find(hashes => hashes.includes(apiGenesis)) || [apiGenesis]).includes(genesisHash);
}

function ChainLock(_ref) {
  let {
    className = '',
    genesisHash,
    isDisabled,
    onChange
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api,
    isDevelopment
  } = (0, _reactHooks.useApi)();
  const isTiedToChain = (0, _react.useMemo)(() => calcLock(api.genesisHash.toHex(), genesisHash), [api, genesisHash]);

  const _onChange = (0, _react.useCallback)(isTiedToChain => onChange(isTiedToChain ? api.genesisHash.toHex() : null), [api, onChange]);

  if (isDevelopment) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Toggle.default, {
    className: className,
    isDisabled: isDisabled,
    label: t('only this network'),
    onChange: _onChange,
    preventDefault: true,
    value: isTiedToChain
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(ChainLock).withConfig({
  displayName: "ChainLock",
  componentId: "sc-7b6c2x-0"
})(["text-align:right;"]));

exports.default = _default;