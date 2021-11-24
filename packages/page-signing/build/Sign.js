// Copyright 2017-2021 @axia-js/app-signing authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { web3FromSource } from '@axia-js/extension-dapp';
import { Button, Input, InputAddress, Output, Static } from '@axia-js/react-components';
import { useToggle } from '@axia-js/react-hooks';
import { keyring } from '@axia-js/ui-keyring';
import { hexToU8a, isFunction, isHex, stringToHex, stringToU8a, u8aToHex } from '@axia-js/util';
import { useTranslation } from "./translate.js";
import Unlock from "./Unlock.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Sign({
  className = ''
}) {
  const {
    t
  } = useTranslation();
  const [currentPair, setCurrentPair] = useState(() => keyring.getPairs()[0] || null);
  const [{
    data,
    isHexData
  }, setData] = useState({
    data: '',
    isHexData: false
  });
  const [{
    isInjected
  }, setAccountState] = useState({
    isExternal: false,
    isHardware: false,
    isInjected: false
  });
  const [isLocked, setIsLocked] = useState(false);
  const [{
    isUsable,
    signer
  }, setSigner] = useState({
    isUsable: true,
    signer: null
  });
  const [signature, setSignature] = useState('');
  const [isUnlockVisible, toggleUnlock] = useToggle();
  useEffect(() => {
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
      web3FromSource(meta.source).catch(() => null).then(injected => {
        var _injected$signer;

        return setSigner({
          isUsable: isFunction(injected === null || injected === void 0 ? void 0 : (_injected$signer = injected.signer) === null || _injected$signer === void 0 ? void 0 : _injected$signer.signRaw),
          signer: (injected === null || injected === void 0 ? void 0 : injected.signer) || null
        });
      }).catch(console.error);
    }
  }, [currentPair]);

  const _onChangeAccount = useCallback(accountId => accountId && setCurrentPair(keyring.getPair(accountId)), []);

  const _onChangeData = useCallback(data => setData({
    data,
    isHexData: isHex(data)
  }), []);

  const _onSign = useCallback(() => {
    if (isLocked || !isUsable || !currentPair) {
      return;
    }

    if (signer && isFunction(signer.signRaw)) {
      setSignature('');
      signer.signRaw({
        address: currentPair.address,
        data: isHexData ? data : stringToHex(data),
        type: 'bytes'
      }).then(({
        signature
      }) => setSignature(signature)).catch(console.error);
    } else {
      setSignature(u8aToHex(currentPair.sign(isHexData ? hexToU8a(data) : stringToU8a(data))));
    }
  }, [currentPair, data, isHexData, isLocked, isUsable, signer]);

  const _onUnlock = useCallback(() => {
    setIsLocked(false);
    toggleUnlock();
  }, [toggleUnlock]);

  return /*#__PURE__*/_jsxs("div", {
    className: `toolbox--Sign ${className}`,
    children: [/*#__PURE__*/_jsx("div", {
      className: "ui--row",
      children: /*#__PURE__*/_jsx(InputAddress, {
        className: "full",
        help: t('select the account you wish to sign data with'),
        isInput: false,
        label: t('account'),
        onChange: _onChangeAccount,
        type: "account"
      })
    }), /*#__PURE__*/_jsxs("div", {
      className: "toolbox--Sign-input",
      children: [/*#__PURE__*/_jsx("div", {
        className: "ui--row",
        children: /*#__PURE__*/_jsx(Input, {
          autoFocus: true,
          className: "full",
          help: t('The input data to sign. This can be either specified as a hex value (0x-prefix) or as a string.'),
          label: t('sign the following data'),
          onChange: _onChangeData,
          value: data
        })
      }), /*#__PURE__*/_jsx("div", {
        className: "ui--row",
        children: /*#__PURE__*/_jsx(Static, {
          className: "medium",
          help: t('Detection on the input string to determine if it is hex or non-hex.'),
          label: t('hex input data'),
          value: isHexData ? t('Yes') : t('No')
        })
      }), /*#__PURE__*/_jsx("div", {
        className: "ui--row",
        children: /*#__PURE__*/_jsx(Output, {
          className: "full",
          help: t('The resulting signature of the input data, as done with the crypto algorithm from the account. (This could be non-deterministic for some types such as sr25519).'),
          isHidden: signature.length === 0,
          isMonospace: true,
          label: t('signature of supplied data'),
          value: signature,
          withCopy: true
        })
      }), /*#__PURE__*/_jsx("div", {
        className: "unlock-overlay",
        hidden: !isUsable || !isLocked || isInjected,
        children: isLocked && /*#__PURE__*/_jsx("div", {
          className: "unlock-overlay-warning",
          children: /*#__PURE__*/_jsxs("div", {
            className: "unlock-overlay-content",
            children: [t('You need to unlock this account to be able to sign data.'), /*#__PURE__*/_jsx("br", {}), /*#__PURE__*/_jsx(Button.Group, {
              children: /*#__PURE__*/_jsx(Button, {
                icon: "unlock",
                label: t('Unlock account'),
                onClick: toggleUnlock
              })
            })]
          })
        })
      }), /*#__PURE__*/_jsx("div", {
        className: "unlock-overlay",
        hidden: isUsable,
        children: /*#__PURE__*/_jsx("div", {
          className: "unlock-overlay-warning",
          children: /*#__PURE__*/_jsx("div", {
            className: "unlock-overlay-content",
            children: isInjected ? t('This injected account cannot be used to sign data since the extension does not support raw signing.') : t('This external account cannot be used to sign data. Only Limited support is currently available for signing from any non-internal accounts.')
          })
        })
      }), isUnlockVisible && /*#__PURE__*/_jsx(Unlock, {
        onClose: toggleUnlock,
        onUnlock: _onUnlock,
        pair: currentPair
      })]
    }), /*#__PURE__*/_jsx(Button.Group, {
      children: /*#__PURE__*/_jsx(Button, {
        icon: "key",
        isDisabled: !(isUsable && !isLocked),
        label: t('Sign message'),
        onClick: _onSign
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Sign).withConfig({
  displayName: "Sign",
  componentId: "sc-14ryozs-0"
})([".toolbox--Sign-input{position:relative;width:100%;height:100%;.unlock-overlay{position:absolute;width:100%;height:100%;top:0;left:0;background-color:#0f0e0e7a;}.unlock-overlay-warning{display:flex;align-items:center;justify-content:center;height:100%;}.unlock-overlay-content{color:#fff;padding:0 2.5rem;text-align:center;.ui--Button-Group{text-align:center;}}}"]));