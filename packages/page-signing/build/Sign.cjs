"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _extensionDapp = require("@axia-js/extension-dapp");

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _uiKeyring = require("@axia-js/ui-keyring");

var _util = require("@axia-js/util");

var _translate = require("./translate.cjs");

var _Unlock = _interopRequireDefault(require("./Unlock.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-signing authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Sign(_ref) {
  let {
    className = ''
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const [currentPair, setCurrentPair] = (0, _react.useState)(() => _uiKeyring.keyring.getPairs()[0] || null);
  const [{
    data,
    isHexData
  }, setData] = (0, _react.useState)({
    data: '',
    isHexData: false
  });
  const [{
    isInjected
  }, setAccountState] = (0, _react.useState)({
    isExternal: false,
    isHardware: false,
    isInjected: false
  });
  const [isLocked, setIsLocked] = (0, _react.useState)(false);
  const [{
    isUsable,
    signer
  }, setSigner] = (0, _react.useState)({
    isUsable: true,
    signer: null
  });
  const [signature, setSignature] = (0, _react.useState)('');
  const [isUnlockVisible, toggleUnlock] = (0, _reactHooks.useToggle)();
  (0, _react.useEffect)(() => {
    const meta = currentPair && currentPair.meta || {};
    const isExternal = meta.isExternal || false;
    const isHardware = meta.isHardware || false;
    const isInjected = meta.isInjected || false;
    const isUsable = !(isExternal || isHardware || isInjected);
    setAccountState({
      isExternal,
      isHardware,
      isInjected
    });
    setIsLocked(isInjected ? false : currentPair && currentPair.isLocked || false);
    setSignature('');
    setSigner({
      isUsable,
      signer: null
    }); // for injected, retrieve the signer

    if (meta.source && isInjected) {
      (0, _extensionDapp.web3FromSource)(meta.source).catch(() => null).then(injected => {
        var _injected$signer;

        return setSigner({
          isUsable: (0, _util.isFunction)(injected === null || injected === void 0 ? void 0 : (_injected$signer = injected.signer) === null || _injected$signer === void 0 ? void 0 : _injected$signer.signRaw),
          signer: (injected === null || injected === void 0 ? void 0 : injected.signer) || null
        });
      }).catch(console.error);
    }
  }, [currentPair]);

  const _onChangeAccount = (0, _react.useCallback)(accountId => accountId && setCurrentPair(_uiKeyring.keyring.getPair(accountId)), []);

  const _onChangeData = (0, _react.useCallback)(data => setData({
    data,
    isHexData: (0, _util.isHex)(data)
  }), []);

  const _onSign = (0, _react.useCallback)(() => {
    if (isLocked || !isUsable || !currentPair) {
      return;
    }

    if (signer && (0, _util.isFunction)(signer.signRaw)) {
      setSignature('');
      signer.signRaw({
        address: currentPair.address,
        data: isHexData ? data : (0, _util.stringToHex)(data),
        type: 'bytes'
      }).then(_ref2 => {
        let {
          signature
        } = _ref2;
        return setSignature(signature);
      }).catch(console.error);
    } else {
      setSignature((0, _util.u8aToHex)(currentPair.sign(isHexData ? (0, _util.hexToU8a)(data) : (0, _util.stringToU8a)(data))));
    }
  }, [currentPair, data, isHexData, isLocked, isUsable, signer]);

  const _onUnlock = (0, _react.useCallback)(() => {
    setIsLocked(false);
    toggleUnlock();
  }, [toggleUnlock]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `toolbox--Sign ${className}`,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "ui--row",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
        className: "full",
        help: t('select the account you wish to sign data with'),
        isInput: false,
        label: t('account'),
        onChange: _onChangeAccount,
        type: "account"
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "toolbox--Sign-input",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "ui--row",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
          autoFocus: true,
          className: "full",
          help: t('The input data to sign. This can be either specified as a hex value (0x-prefix) or as a string.'),
          label: t('sign the following data'),
          onChange: _onChangeData,
          value: data
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "ui--row",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Static, {
          className: "medium",
          help: t('Detection on the input string to determine if it is hex or non-hex.'),
          label: t('hex input data'),
          value: isHexData ? t('Yes') : t('No')
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "ui--row",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Output, {
          className: "full",
          help: t('The resulting signature of the input data, as done with the crypto algorithm from the account. (This could be non-deterministic for some types such as sr25519).'),
          isHidden: signature.length === 0,
          isMonospace: true,
          label: t('signature of supplied data'),
          value: signature,
          withCopy: true
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "unlock-overlay",
        hidden: !isUsable || !isLocked || isInjected,
        children: isLocked && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "unlock-overlay-warning",
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: "unlock-overlay-content",
            children: [t('You need to unlock this account to be able to sign data.'), /*#__PURE__*/(0, _jsxRuntime.jsx)("br", {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button.Group, {
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
                icon: "unlock",
                label: t('Unlock account'),
                onClick: toggleUnlock
              })
            })]
          })
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "unlock-overlay",
        hidden: isUsable,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "unlock-overlay-warning",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "unlock-overlay-content",
            children: isInjected ? t('This injected account cannot be used to sign data since the extension does not support raw signing.') : t('This external account cannot be used to sign data. Only Limited support is currently available for signing from any non-internal accounts.')
          })
        })
      }), isUnlockVisible && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Unlock.default, {
        onClose: toggleUnlock,
        onUnlock: _onUnlock,
        pair: currentPair
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button.Group, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "key",
        isDisabled: !(isUsable && !isLocked),
        label: t('Sign message'),
        onClick: _onSign
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Sign).withConfig({
  displayName: "Sign",
  componentId: "sc-14ryozs-0"
})([".toolbox--Sign-input{position:relative;width:100%;height:100%;.unlock-overlay{position:absolute;width:100%;height:100%;top:0;left:0;background-color:#0f0e0e7a;}.unlock-overlay-warning{display:flex;align-items:center;justify-content:center;height:100%;}.unlock-overlay-content{color:#fff;padding:0 2.5rem;text-align:center;.ui--Button-Group{text-align:center;}}}"]));

exports.default = _default;