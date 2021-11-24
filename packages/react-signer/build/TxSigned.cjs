"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _extensionDapp = require("@axia-js/extension-dapp");

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _uiKeyring = require("@axia-js/ui-keyring");

var _util = require("@axia-js/util");

var _utilCrypto = require("@axia-js/util-crypto");

var _Address = _interopRequireDefault(require("./Address.cjs"));

var _Qr = _interopRequireDefault(require("./Qr.cjs"));

var _index = require("./signers/index.cjs");

var _SignFields = _interopRequireDefault(require("./SignFields.cjs"));

var _Tip = _interopRequireDefault(require("./Tip.cjs"));

var _Transaction = _interopRequireDefault(require("./Transaction.cjs"));

var _translate = require("./translate.cjs");

var _util2 = require("./util.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const NOOP = () => undefined;

const EMPTY_INNER = {
  innerHash: null,
  innerTx: null
};
let qrId = 0;

function unlockAccount(_ref) {
  let {
    isUnlockCached,
    signAddress,
    signPassword
  } = _ref;
  let publicKey;

  try {
    publicKey = _uiKeyring.keyring.decodeAddress(signAddress);
  } catch (error) {
    console.error(error);
    return 'unable to decode address';
  }

  const pair = _uiKeyring.keyring.getPair(publicKey);

  try {
    pair.decodePkcs8(signPassword);
    isUnlockCached && (0, _util2.cacheUnlock)(pair);
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
    const unsubscribe = await tx.send((0, _util2.handleTxResults)('signAndSend', queueSetTxStatus, currentItem, () => {
      unsubscribe();
    }));
  } catch (error) {
    console.error('signAndSend: error:', error);
    queueSetTxStatus(currentItem.id, 'error', {}, error);
    currentItem.txFailedCb && currentItem.txFailedCb(error);
  }
}

async function signAsync(queueSetTxStatus, _ref2, tx, pairOrAddress, options) {
  let {
    id,
    txFailedCb = NOOP,
    txStartCb = NOOP
  } = _ref2;
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

async function wrapTx(api, currentItem, _ref3) {
  let {
    isMultiCall,
    multiRoot,
    proxyRoot,
    signAddress
  } = _ref3;
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
    } = (0, _util2.extractExternal)(multiRoot);
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
  const pair = _uiKeyring.keyring.getPair(address);

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
      signer: new _index.LedgerSigner(api.registry, getLedger, accountOffset || 0, addressOffset || 0)
    })];
  } else if (isExternal && !isProxied) {
    return ['qr', address, _objectSpread(_objectSpread({}, options), {}, {
      signer: new _index.QrSigner(api.registry, setQrState)
    })];
  } else if (isInjected) {
    const injected = await (0, _extensionDapp.web3FromSource)(source);
    (0, _util.assert)(injected, `Unable to find a signer for ${address}`);
    return ['signing', address, _objectSpread(_objectSpread({}, options), {}, {
      signer: injected.signer
    })];
  }

  (0, _util.assert)((0, _utilCrypto.addressEq)(address, pair.address), `Unable to retrieve keypair for ${address}`);
  return ['signing', address, _objectSpread(_objectSpread({}, options), {}, {
    signer: new _index.AccountSigner(api.registry, pair)
  })];
}

function tryExtract(address) {
  try {
    return (0, _util2.extractExternal)(address);
  } catch {
    return {};
  }
}

function TxSigned(_ref4) {
  let {
    className,
    currentItem,
    requestAddress
  } = _ref4;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const {
    getLedger
  } = (0, _reactHooks.useLedger)();
  const {
    queueSetTxStatus
  } = (0, _react.useContext)(_reactComponents.StatusContext);
  const [flags, setFlags] = (0, _react.useState)(() => tryExtract(requestAddress));
  const [error, setError] = (0, _react.useState)(null);
  const [{
    isQrHashed,
    qrAddress,
    qrPayload,
    qrResolve
  }, setQrState] = (0, _react.useState)({
    isQrHashed: false,
    qrAddress: '',
    qrPayload: new Uint8Array()
  });
  const [isBusy, setBusy] = (0, _react.useState)(false);
  const [isRenderError, toggleRenderError] = (0, _reactHooks.useToggle)();
  const [isSubmit, setIsSubmit] = (0, _react.useState)(true);
  const [passwordError, setPasswordError] = (0, _react.useState)(null);
  const [senderInfo, setSenderInfo] = (0, _react.useState)({
    isMultiCall: false,
    isUnlockCached: false,
    multiRoot: null,
    proxyRoot: null,
    signAddress: requestAddress,
    signPassword: ''
  });
  const [signedOptions, setSignedOptions] = (0, _react.useState)({});
  const [signedTx, setSignedTx] = (0, _react.useState)(null);
  const [{
    innerHash,
    innerTx
  }, setCallInfo] = (0, _react.useState)(EMPTY_INNER);
  const [tip, setTip] = (0, _react.useState)(_util.BN_ZERO);
  (0, _react.useEffect)(() => {
    setFlags(tryExtract(senderInfo.signAddress));
    setPasswordError(null);
  }, [senderInfo]); // when we are sending the hash only, get the wrapped call for display (proxies if required)

  (0, _react.useEffect)(() => {
    const method = currentItem.extrinsic && (senderInfo.proxyRoot ? api.tx.proxy.proxy(senderInfo.proxyRoot, null, currentItem.extrinsic) : currentItem.extrinsic).method;
    setCallInfo(method ? {
      innerHash: method.hash.toHex(),
      innerTx: senderInfo.multiRoot ? method.toHex() : null
    } : EMPTY_INNER);
  }, [api, currentItem, senderInfo]);

  const _addQrSignature = (0, _react.useCallback)(_ref5 => {
    let {
      signature
    } = _ref5;
    return qrResolve && qrResolve({
      id: ++qrId,
      signature
    });
  }, [qrResolve]);

  const _unlock = (0, _react.useCallback)(async () => {
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

  const _onSendPayload = (0, _react.useCallback)((queueSetTxStatus, currentItem, senderInfo) => {
    if (senderInfo.signAddress && currentItem.payload) {
      const {
        id,
        payload,
        signerCb = NOOP
      } = currentItem;

      const pair = _uiKeyring.keyring.getPair(senderInfo.signAddress);

      const result = api.createType('ExtrinsicPayload', payload, {
        version: payload.version
      }).sign(pair);
      signerCb(id, _objectSpread({
        id
      }, result));
      queueSetTxStatus(id, 'completed');
    }
  }, [api]);

  const _onSend = (0, _react.useCallback)(async (queueSetTxStatus, currentItem, senderInfo) => {
    if (senderInfo.signAddress) {
      const [tx, [status, pairOrAddress, options]] = await Promise.all([wrapTx(api, currentItem, senderInfo), extractParams(api, senderInfo.signAddress, {
        nonce: -1,
        tip
      }, getLedger, setQrState)]);
      queueSetTxStatus(currentItem.id, status);
      await signAndSend(queueSetTxStatus, currentItem, tx, pairOrAddress, options);
    }
  }, [api, getLedger, tip]);

  const _onSign = (0, _react.useCallback)(async (queueSetTxStatus, currentItem, senderInfo) => {
    if (senderInfo.signAddress) {
      const [tx, [, pairOrAddress, options]] = await Promise.all([wrapTx(api, currentItem, senderInfo), extractParams(api, senderInfo.signAddress, _objectSpread(_objectSpread({}, signedOptions), {}, {
        tip
      }), getLedger, setQrState)]);
      setSignedTx(await signAsync(queueSetTxStatus, currentItem, tx, pairOrAddress, options));
    }
  }, [api, getLedger, signedOptions, tip]);

  const _doStart = (0, _react.useCallback)(() => {
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

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Content, {
      className: className,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.ErrorBoundary, {
        error: error,
        onError: toggleRenderError,
        children: isBusy && flags.isQr ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_Qr.default, {
          address: qrAddress,
          genesisHash: api.genesisHash,
          isHashed: isQrHashed,
          onSignature: _addQrSignature,
          payload: qrPayload
        }) : /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Transaction.default, {
            accountId: senderInfo.signAddress,
            currentItem: currentItem,
            onError: toggleRenderError
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Address.default, {
            currentItem: currentItem,
            onChange: setSenderInfo,
            onEnter: _doStart,
            passwordError: passwordError,
            requestAddress: requestAddress
          }), !currentItem.payload && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tip.default, {
            onChange: setTip
          }), !isSubmit && /*#__PURE__*/(0, _jsxRuntime.jsx)(_SignFields.default, {
            address: senderInfo.signAddress,
            onChange: setSignedOptions,
            signedTx: signedTx
          }), isSubmit && !senderInfo.isMultiCall && innerTx && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
            hint: t('The full call data that can be supplied to a final call to multi approvals'),
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Output, {
              isDisabled: true,
              isTrimmed: true,
              label: t('multisig call data'),
              value: innerTx,
              withCopy: true
            })
          }), isSubmit && innerHash && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
            hint: t('The call hash as calculated for this transaction'),
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Output, {
              isDisabled: true,
              isTrimmed: true,
              label: t('call hash'),
              value: innerHash,
              withCopy: true
            })
          })]
        })
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Actions, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: flags.isQr ? 'qrcode' : 'sign-in-alt',
        isBusy: isBusy,
        isDisabled: !senderInfo.signAddress || isRenderError,
        label: flags.isQr ? t('Sign via Qr') : isSubmit ? t('Sign and Submit') : t('Sign (no submission)'),
        onClick: _doStart,
        tabIndex: 2
      }), !isBusy && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Toggle, {
        className: "signToggle",
        isDisabled: !!currentItem.payload,
        label: isSubmit ? t('Sign and Submit') : t('Sign (no submission)'),
        onChange: setIsSubmit,
        value: isSubmit
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(TxSigned).withConfig({
  displayName: "TxSigned",
  componentId: "sc-sg7qv-0"
})([".tipToggle{width:100%;text-align:right;}.ui--Checks{margin-top:0.75rem;}"]));

exports.default = _default;