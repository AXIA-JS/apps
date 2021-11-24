"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-signing authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Unlock(_ref) {
  let {
    onClose,
    onUnlock,
    pair
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const [isBusy, setIsBusy] = (0, _react.useState)(false);
  const [address, setAddress] = (0, _react.useState)('');
  const [password, setPassword] = (0, _react.useState)('');
  const [unlockError, setUnlockError] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    setAddress((pair === null || pair === void 0 ? void 0 : pair.address) || '');
  }, [pair]);
  (0, _react.useEffect)(() => {
    setUnlockError(null);
  }, [password]);

  const _onUnlock = (0, _react.useCallback)(() => {
    if (!pair || !pair.isLocked) {
      return;
    }

    setIsBusy(true);
    setTimeout(() => {
      try {
        pair.decodePkcs8(password);
      } catch (error) {
        setIsBusy(false);
        return setUnlockError(error.message);
      }

      setIsBusy(false);
      onUnlock();
    }, 0);
  }, [onUnlock, pair, password]);

  if (!pair) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
    className: "toolbox--Unlock",
    header: t('Unlock account'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
        hint: t('This account that will perform the message signing.'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
          help: t('The selected account to be unlocked.'),
          isDisabled: true,
          label: t('account'),
          value: address
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
        hint: t('Unlock the account for signing. Once active the signature will be generated based on the content provided.'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Password, {
          autoFocus: true,
          help: t('The account\'s password specified at the creation of this account.'),
          isError: !!unlockError,
          label: t('password'),
          onChange: setPassword,
          onEnter: _onUnlock,
          value: password
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "unlock",
        isBusy: isBusy,
        label: t('Unlock'),
        onClick: _onUnlock
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Unlock);

exports.default = _default;