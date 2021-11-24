"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _uiKeyring = require("@axia-js/ui-keyring");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-contracts authors & contributors
// SPDX-License-Identifier: Apache-2.0
function ValidateAddr(_ref) {
  let {
    address,
    onChange
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const contractInfo = (0, _reactHooks.useCall)(api.query.contracts.contractInfoOf, [address]);
  const [isAddress, setIsAddress] = (0, _react.useState)(false);
  const [isStored, setIsStored] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    try {
      _uiKeyring.keyring.decodeAddress(address || '');

      setIsAddress(true);
    } catch (error) {
      setIsAddress(false);
    }
  }, [address]);
  (0, _react.useEffect)(() => {
    setIsStored(!!(contractInfo !== null && contractInfo !== void 0 && contractInfo.isSome));
  }, [contractInfo]);
  (0, _react.useEffect)(() => {
    onChange(isAddress && isStored);
  }, [isAddress, isStored, onChange]);

  if (isStored || !isAddress) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InfoForInput, {
    type: "error",
    children: isAddress ? t('Unable to find deployed contract code at the specified address') : t('The value is not in a valid address format')
  });
}

var _default = /*#__PURE__*/_react.default.memo(ValidateAddr);

exports.default = _default;