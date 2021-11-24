"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-contracts authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable camelcase */
function ValidateCode(_ref) {
  let {
    codeHash,
    onChange
  } = _ref;
  const {
    api
  } = (0, _reactHooks.useApi)();
  const {
    t
  } = (0, _translate.useTranslation)();
  const codeStorage = (0, _reactHooks.useCall)((api.query.contracts || api.query.contract).codeStorage, [codeHash]);
  const [isValidHex, isValid] = (0, _react.useMemo)(() => {
    const isValidHex = !!codeHash && (0, _util.isHex)(codeHash) && codeHash.length === 66;
    const isStored = !!codeStorage && codeStorage.isSome;
    const isValid = isValidHex && isStored;
    onChange(isValid);
    return [isValidHex, isValid];
  }, [codeHash, codeStorage, onChange]);

  if (isValid || !isValidHex) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InfoForInput, {
    type: "error",
    children: isValidHex ? t('Unable to find on-chain WASM code for the supplied codeHash') : t('The codeHash is not a valid hex hash')
  });
}

var _default = /*#__PURE__*/_react.default.memo(ValidateCode);

exports.default = _default;