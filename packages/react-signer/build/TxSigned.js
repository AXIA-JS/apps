import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/react-signer authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { web3FromSource } from '@axia-js/extension-dapp';
import { Button, ErrorBoundary, Modal, Output, StatusContext, Toggle } from '@axia-js/react-components';
import { useApi, useLedger, useToggle } from '@axia-js/react-hooks';
import { keyring } from '@axia-js/ui-keyring';
import { assert, BN_ZERO } from '@axia-js/util';
import { addressEq } from '@axia-js/util-crypto';
import Address from "./Address.js";
import Qr from "./Qr.js";
import { AccountSigner, LedgerSigner, QrSigner } from "./signers/index.js";
import SignFields from "./SignFields.js";
import Tip from "./Tip.js";
import Transaction from "./Transaction.js";
import { useTranslation } from "./translate.js";
import { cacheUnlock, extractExternal, handleTxResults } from "./util.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const NOOP = () => undefined;

const EMPTY_INNER = {
  innerHash: null,
  innerTx: null
};
let qrId = 0;

function unlockAccount({
  isUnlockCached,
  signAddress,
  signPassword
}) {
  let publicKey;

  try {
    publicKey = keyring.decodeAddress(signAddress);
  } catch (error) {
    console.error(error);
    return 'unable to decode address';
  }

  const pair = keyring.getPair(publicKey);

  try {
    pair.decodePkcs8(signPassword);
    isUnlockCached && cacheUnlock(pair);
  } catch (error) {
    console.error(error);
    return error.message;
  }

  return null;
}

async function signAndSend(queueSetTxStatus, currentItem, tx, pairOrAddress, options) {
  currentItem.txStartCb && currentItem.txStartCb();

  try {
    await tx.signAsync(pairOrAddress, options);
    console.info('sending', tx.toHex());
    queueSetTxStatus(currentItem.id, 'sending');
    const unsubscribe = await tx.send(handleTxResults('signAndSend', queueSetTxStatus, currentItem, () => {
      unsubscribe();
    }));
  } catch (error) {
    console.error('signAndSend: error:', error);
    queueSetTxStatus(currentItem.id, 'error', {}, error);
    currentItem.txFailedCb && currentItem.txFailedCb(error);
  }
}

async function signAsync(queueSetTxStatus, {
  id,
  txFailedCb = NOOP,
  txStartCb = NOOP
}, tx, pairOrAddress, options) {
  txStartCb();

  try {
    await tx.signAsync(pairOrAddress, options);
    return tx.toJSON();
  } catch (error) {
    console.error('signAsync: error:', error);
    queueSetTxStatus(id, 'error', undefined, error);
    txFailedCb(error);
  }

  return null;
}

async function wrapTx(api, currentItem, {
  isMultiCall,
  multiRoot,
  proxyRoot,
  signAddress
}) {
  let tx = currentItem.extrinsic;

  if (proxyRoot) {
    tx = api.tx.proxy.proxy(proxyRoot, null, tx);
  }

  if (multiRoot) {
    const multiModule = api.tx.multisig ? 'multisig' : 'utility';
    const info = await api.query[multiModule].multisigs(multiRoot, tx.method.hash);
    const {
      weight
    } = await tx.paymentInfo(multiRoot);
    const {
      threshold,
      who
    } = extractExternal(multiRoot);
    const others = who.filter(w => w !== signAddress);
    let timepoint = null;

    if (info.isSome) {
      timepoint = info.unwrap().when;
    }

    tx = isMultiCall ? api.tx[multiModule].asMulti.meta.args.length === 6 // We are doing toHex here since we have a Vec<u8> input
    ? api.tx[multiModule].asMulti(threshold, others, timepoint, tx.method.toHex(), false, weight) // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    : api.tx[multiModule].asMulti(threshold, others, timepoint, tx.method) : api.tx[multiModule].approveAsMulti.meta.args.length === 5 ? api.tx[multiModule].approveAsMulti(threshold, others, timepoint, tx.method.hash, weight) // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    : api.tx[multiModule].approveAsMulti(threshold, others, timepoint, tx.method.hash);
  }

  return tx;
}

async function extractParams(api, address, options, getLedger, setQrState) {
  const pair = keyring.getPair(address);
  const {
    meta: {
      accountOffset,
      addressOffset,
      isExternal,
      isHardware,
      isInjected,
      isProxied,
      source
    }
  } = pair;

  if (isHardware) {
    return ['signing', address, _objectSpread(_objectSpread({}, options), {}, {
      signer: new LedgerSigner(api.registry, getLedger, accountOffset || 0, addressOffset || 0)
    })];
  } else if (isExternal && !isProxied) {
    return ['qr', address, _objectSpread(_objectSpread({}, options), {}, {
      signer: new QrSigner(api.registry, setQrState)
    })];
  } else if (isInjected) {
    const injected = await web3FromSource(source);
    assert(injected, `Unable to find a signer for ${address}`);
    return ['signing', address, _objectSpread(_objectSpread({}, options), {}, {
      signer: injected.signer
    })];
  }

  assert(addressEq(address, pair.address), `Unable to retrieve keypair for ${address}`);
  return ['signing', address, _objectSpread(_objectSpread({}, options), {}, {
    signer: new AccountSigner(api.registry, pair)
  })];
}

function tryExtract(address) {
  try {
    return extractExternal(address);
  } catch {
    return {};
  }
}

function TxSigned({
  className,
  currentItem,
  requestAddress
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const {
    getLedger
  } = useLedger();
  const {
    queueSetTxStatus
  } = useContext(StatusContext);
  const [flags, setFlags] = useState(() => tryExtract(requestAddress));
  const [error, setError] = useState(null);
  const [{
    isQrHashed,
    qrAddress,
    qrPayload,
    qrResolve
  }, setQrState] = useState({
    isQrHashed: false,
    qrAddress: '',
    qrPayload: new Uint8Array()
  });
  const [isBusy, setBusy] = useState(false);
  const [isRenderError, toggleRenderError] = useToggle();
  const [isSubmit, setIsSubmit] = useState(true);
  const [passwordError, setPasswordError] = useState(null);
  const [senderInfo, setSenderInfo] = useState({
    isMultiCall: false,
    isUnlockCached: false,
    multiRoot: null,
    proxyRoot: null,
    signAddress: requestAddress,
    signPassword: ''
  });
  const [signedOptions, setSignedOptions] = useState({});
  const [signedTx, setSignedTx] = useState(null);
  const [{
    innerHash,
    innerTx
  }, setCallInfo] = useState(EMPTY_INNER);
  const [tip, setTip] = useState(BN_ZERO);
  useEffect(() => {
    setFlags(tryExtract(senderInfo.signAddress));
    setPasswordError(null);
  }, [senderInfo]); // when we are sending the hash only, get the wrapped call for display (proxies if required)

  useEffect(() => {
    const method = currentItem.extrinsic && (senderInfo.proxyRoot ? api.tx.proxy.proxy(senderInfo.proxyRoot, null, currentItem.extrinsic) : currentItem.extrinsic).method;
    setCallInfo(method ? {
      innerHash: method.hash.toHex(),
      innerTx: senderInfo.multiRoot ? method.toHex() : null
    } : EMPTY_INNER);
  }, [api, currentItem, senderInfo]);

  const _addQrSignature = useCallback(({
    signature
  }) => qrResolve && qrResolve({
    id: ++qrId,
    signature
  }), [qrResolve]);

  const _unlock = useCallback(async () => {
    let passwordError = null;

    if (senderInfo.signAddress) {
      if (flags.isUnlockable) {
        passwordError = unlockAccount(senderInfo);
      } else if (flags.isHardware) {
        try {
          const ledger = getLedger();
          const {
            address
          } = await ledger.getAddress(false, flags.accountOffset, flags.addressOffset);
          console.log(`Signing with Ledger address ${address}`);
        } catch (error) {
          console.error(error);
          passwordError = t('Unable to connect to the Ledger, ensure support is enabled in settings and no other app is using it. {{error}}', {
            replace: {
              error: error.message
            }
          });
        }
      }
    }

    setPasswordError(passwordError);
    return !passwordError;
  }, [flags, getLedger, senderInfo, t]);

  const _onSendPayload = useCallback((queueSetTxStatus, currentItem, senderInfo) => {
    if (senderInfo.signAddress && currentItem.payload) {
      const {
        id,
        payload,
        signerCb = NOOP
      } = currentItem;
      const pair = keyring.getPair(senderInfo.signAddress);
      const result = api.createType('ExtrinsicPayload', payload, {
        version: payload.version
      }).sign(pair);
      signerCb(id, _objectSpread({
        id
      }, result));
      queueSetTxStatus(id, 'completed');
    }
  }, [api]);

  const _onSend = useCallback(async (queueSetTxStatus, currentItem, senderInfo) => {
    if (senderInfo.signAddress) {
      const [tx, [status, pairOrAddress, options]] = await Promise.all([wrapTx(api, currentItem, senderInfo), extractParams(api, senderInfo.signAddress, {
        nonce: -1,
        tip
      }, getLedger, setQrState)]);
      queueSetTxStatus(currentItem.id, status);
      await signAndSend(queueSetTxStatus, currentItem, tx, pairOrAddress, options);
    }
  }, [api, getLedger, tip]);

  const _onSign = useCallback(async (queueSetTxStatus, currentItem, senderInfo) => {
    if (senderInfo.signAddress) {
      const [tx, [, pairOrAddress, options]] = await Promise.all([wrapTx(api, currentItem, senderInfo), extractParams(api, senderInfo.signAddress, _objectSpread(_objectSpread({}, signedOptions), {}, {
        tip
      }), getLedger, setQrState)]);
      setSignedTx(await signAsync(queueSetTxStatus, currentItem, tx, pairOrAddress, options));
    }
  }, [api, getLedger, signedOptions, tip]);

  const _doStart = useCallback(() => {
    setBusy(true);
    setTimeout(() => {
      const errorHandler = error => {
        console.error(error);
        setBusy(false);
        setError(error);
      };

      _unlock().then(isUnlocked => {
        if (isUnlocked) {
          isSubmit ? currentItem.payload ? _onSendPayload(queueSetTxStatus, currentItem, senderInfo) : _onSend(queueSetTxStatus, currentItem, senderInfo).catch(errorHandler) : _onSign(queueSetTxStatus, currentItem, senderInfo).catch(errorHandler);
        } else {
          setBusy(false);
        }
      }).catch(error => {
        errorHandler(error);
      });
    }, 0);
  }, [_onSend, _onSendPayload, _onSign, _unlock, currentItem, isSubmit, queueSetTxStatus, senderInfo]);

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Modal.Content, {
      className: className,
      children: /*#__PURE__*/_jsx(ErrorBoundary, {
        error: error,
        onError: toggleRenderError,
        children: isBusy && flags.isQr ? /*#__PURE__*/_jsx(Qr, {
          address: qrAddress,
          genesisHash: api.genesisHash,
          isHashed: isQrHashed,
          onSignature: _addQrSignature,
          payload: qrPayload
        }) : /*#__PURE__*/_jsxs(_Fragment, {
          children: [/*#__PURE__*/_jsx(Transaction, {
            accountId: senderInfo.signAddress,
            currentItem: currentItem,
            onError: toggleRenderError
          }), /*#__PURE__*/_jsx(Address, {
            currentItem: currentItem,
            onChange: setSenderInfo,
            onEnter: _doStart,
            passwordError: passwordError,
            requestAddress: requestAddress
          }), !currentItem.payload && /*#__PURE__*/_jsx(Tip, {
            onChange: setTip
          }), !isSubmit && /*#__PURE__*/_jsx(SignFields, {
            address: senderInfo.signAddress,
            onChange: setSignedOptions,
            signedTx: signedTx
          }), isSubmit && !senderInfo.isMultiCall && innerTx && /*#__PURE__*/_jsx(Modal.Columns, {
            hint: t('The full call data that can be supplied to a final call to multi approvals'),
            children: /*#__PURE__*/_jsx(Output, {
              isDisabled: true,
              isTrimmed: true,
              label: t('multisig call data'),
              value: innerTx,
              withCopy: true
            })
          }), isSubmit && innerHash && /*#__PURE__*/_jsx(Modal.Columns, {
            hint: t('The call hash as calculated for this transaction'),
            children: /*#__PURE__*/_jsx(Output, {
              isDisabled: true,
              isTrimmed: true,
              label: t('call hash'),
              value: innerHash,
              withCopy: true
            })
          })]
        })
      })
    }), /*#__PURE__*/_jsxs(Modal.Actions, {
      children: [/*#__PURE__*/_jsx(Button, {
        icon: flags.isQr ? 'qrcode' : 'sign-in-alt',
        isBusy: isBusy,
        isDisabled: !senderInfo.signAddress || isRenderError,
        label: flags.isQr ? t('Sign via Qr') : isSubmit ? t('Sign and Submit') : t('Sign (no submission)'),
        onClick: _doStart,
        tabIndex: 2
      }), !isBusy && /*#__PURE__*/_jsx(Toggle, {
        className: "signToggle",
        isDisabled: !!currentItem.payload,
        label: isSubmit ? t('Sign and Submit') : t('Sign (no submission)'),
        onChange: setIsSubmit,
        value: isSubmit
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(TxSigned).withConfig({
  displayName: "TxSigned",
  componentId: "sc-sg7qv-0"
})([".tipToggle{width:100%;text-align:right;}.ui--Checks{margin-top:0.75rem;}"]));