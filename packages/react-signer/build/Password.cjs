"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _uiKeyring = require("@axia-js/ui-keyring");

var _translate = require("./translate.cjs");

var _util = require("./util.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-signer authors & contributors
// SPDX-License-Identifier: Apache-2.0
function getPair(address) {
  try {
    return _uiKeyring.keyring.getPair(address);
  } catch (error) {
    return null;
  }
}

function Unlock({
  address,
  className,
  error,
  onChange,
  onEnter,
  tabIndex
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const [password, setPassword] = (0, _react.useState)('');
  const [isUnlockCached, setIsUnlockCached] = (0, _react.useState)(false);
  const pair = (0, _react.useMemo)(() => getPair(address), [address]);
  (0, _react.useEffect)(() => {
    onChange(password, isUnlockCached);
  }, [onChange, isUnlockCached, password]);

  if (!pair || !pair.isLocked || pair.meta.isInjected) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
    className: className,
    hint: t('Unlock the sending account to allow signing of this transaction.'),
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Password, {
      autoFocus: true,
      isError: !!error,
      label: t('unlock account with password'),
      onChange: setPassword,
      onEnter: onEnter,
      tabIndex: tabIndex,
      value: password,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Toggle, {
        isOverlay: true,
        label: t('unlock for {{expiry}} min', {
          replace: {
            expiry: _util.UNLOCK_MINS
          }
        }),
        onChange: setIsUnlockCached,
        value: isUnlockCached
      })
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Unlock).withConfig({
  displayName: "Password",
  componentId: "sc-z0k2qq-0"
})([".errorLabel{margin-right:1rem;color:#9f3a38 !important;}.ui--Toggle{bottom:1.1rem;}"]));

exports.default = _default;