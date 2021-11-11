"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "useCounter", {
  enumerable: true,
  get: function () {
    return _useCounter.default;
  }
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactCopyToClipboard = _interopRequireDefault(require("react-copy-to-clipboard"));

var _reactI18next = require("react-i18next");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _InputNumber = require("@axia-js/react-components/InputNumber");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _utilCrypto = require("@axia-js/util-crypto");

var _Attest = _interopRequireDefault(require("./Attest.cjs"));

var _Claim = _interopRequireDefault(require("./Claim.cjs"));

var _Statement = _interopRequireDefault(require("./Statement.cjs"));

var _translate = require("./translate.cjs");

var _util2 = require("./util.cjs");

var _Warning = _interopRequireDefault(require("./Warning.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

var _useCounter = _interopRequireDefault(require("./useCounter.cjs"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-claims authors & contributors
// SPDX-License-Identifier: Apache-2.0
var Step;

(function (Step) {
  Step[Step["Account"] = 0] = "Account";
  Step[Step["ETHAddress"] = 1] = "ETHAddress";
  Step[Step["Sign"] = 2] = "Sign";
  Step[Step["Claim"] = 3] = "Claim";
})(Step || (Step = {}));

const PRECLAIMS_LOADING = 'PRECLAIMS_LOADING'; // FIXME no embedded components (hossible to tweak)

const Payload = _styledComponents.default.pre.withConfig({
  displayName: "src__Payload",
  componentId: "sc-1k3p3a7-0"
})(["cursor:copy;font:var(--font-mono);border:1px dashed #c2c2c2;background:#f2f2f2;padding:1rem;width:100%;margin:1rem 0;white-space:normal;word-break:break-all;"]);

const Signature = _styledComponents.default.textarea.withConfig({
  displayName: "src__Signature",
  componentId: "sc-1k3p3a7-1"
})(["font:var(--font-mono);padding:1rem;border:1px solid var(--border-input);border-radius:0.25rem;margin:1rem 0;resize:none;width:100%;&::placeholder{color:rgba(0,0,0,0.5);}&::-ms-input-placeholder{color:rgba(0,0,0,0.5);}&:-ms-input-placeholder{color:rgba(0,0,0,0.5);}"]);

const transformStatement = {
  transform: option => option.unwrapOr(null)
};

function ClaimsApp({
  basePath
}) {
  var _getStatement;

  const [didCopy, setDidCopy] = (0, _react.useState)(false);
  const [ethereumAddress, setEthereumAddress] = (0, _react.useState)(null);
  const [signature, setSignature] = (0, _react.useState)(null);
  const [step, setStep] = (0, _react.useState)(Step.Account);
  const [accountId, setAccountId] = (0, _react.useState)(null);
  const {
    api,
    systemChain
  } = (0, _reactHooks.useApi)();
  const {
    t
  } = (0, _translate.useTranslation)(); // This preclaimEthereumAddress holds the result of `api.query.claims.preclaims`:
  // - an `EthereumAddress` when there's a preclaim
  // - null if no preclaim
  // - `PRECLAIMS_LOADING` if we're fetching the results

  const [preclaimEthereumAddress, setPreclaimEthereumAddress] = (0, _react.useState)(PRECLAIMS_LOADING);
  const isPreclaimed = !!preclaimEthereumAddress && preclaimEthereumAddress !== PRECLAIMS_LOADING;
  const itemsRef = (0, _react.useRef)([{
    isRoot: true,
    name: 'create',
    text: t('Claim tokens')
  }]); // Everytime we change account, reset everything, and check if the accountId
  // has a preclaim.

  (0, _react.useEffect)(() => {
    if (!accountId) {
      return;
    }

    setStep(Step.Account);
    setEthereumAddress(null);
    setPreclaimEthereumAddress(PRECLAIMS_LOADING);

    if (!api.query.claims || !api.query.claims.preclaims) {
      return setPreclaimEthereumAddress(null);
    }

    api.query.claims.preclaims(accountId).then(preclaim => {
      var _preclaim$unwrapOr;

      const address = (_preclaim$unwrapOr = preclaim.unwrapOr(null)) === null || _preclaim$unwrapOr === void 0 ? void 0 : _preclaim$unwrapOr.toString();
      setEthereumAddress(address);
      setPreclaimEthereumAddress(address);
    }).catch(error => {
      console.error(error);
      setPreclaimEthereumAddress(null);
    });
  }, [accountId, api.query.claims, api.query.claims.preclaims]); // Old claim process used `api.tx.claims.claim`, and didn't have attest

  const isOldClaimProcess = !api.tx.claims.claimAttest;
  (0, _react.useEffect)(() => {
    if (didCopy) {
      setTimeout(() => {
        setDidCopy(false);
      }, 1000);
    }
  }, [didCopy]);
  const goToStepAccount = (0, _react.useCallback)(() => {
    setStep(Step.Account);
  }, []);
  const goToStepSign = (0, _react.useCallback)(() => {
    setStep(Step.Sign);
  }, []);
  const goToStepClaim = (0, _react.useCallback)(() => {
    setStep(Step.Claim);
  }, []); // Depending on the account, decide which step to show.

  const handleAccountStep = (0, _react.useCallback)(() => {
    if (isPreclaimed) {
      goToStepClaim();
    } else if (ethereumAddress || isOldClaimProcess) {
      goToStepSign();
    } else {
      setStep(Step.ETHAddress);
    }
  }, [ethereumAddress, goToStepClaim, goToStepSign, isPreclaimed, isOldClaimProcess]);
  const onChangeSignature = (0, _react.useCallback)(event => {
    const {
      value: signatureJson
    } = event.target;
    const {
      ethereumAddress,
      signature
    } = (0, _util2.recoverFromJSON)(signatureJson);
    setEthereumAddress(ethereumAddress === null || ethereumAddress === void 0 ? void 0 : ethereumAddress.toString());
    setSignature(signature);
  }, []);
  const onChangeEthereumAddress = (0, _react.useCallback)(value => {
    // FIXME We surely need a better check than just a trim
    setEthereumAddress(value.trim());
  }, []);
  const onCopy = (0, _react.useCallback)(() => {
    setDidCopy(true);
  }, []); // If it's 1/ not preclaimed and 2/ not the old claiming process, fetch the
  // statement kind to sign.

  const statementKind = (0, _reactHooks.useCall)(!isPreclaimed && !isOldClaimProcess && !!ethereumAddress && api.query.claims.signing, [ethereumAddress], transformStatement);
  const statementSentence = ((_getStatement = (0, _util2.getStatement)(systemChain, statementKind)) === null || _getStatement === void 0 ? void 0 : _getStatement.sentence) || '';
  const prefix = (0, _util.u8aToString)(api.consts.claims.prefix.toU8a(true));
  const payload = accountId ? `${prefix}${(0, _util.u8aToHex)((0, _utilCrypto.decodeAddress)(accountId), -1, false)}${statementSentence}` : '';
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("main", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Tabs, {
      basePath: basePath,
      items: itemsRef.current
    }), !isOldClaimProcess && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Warning.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)("h1", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactI18next.Trans, {
        children: ["Claim your ", /*#__PURE__*/(0, _jsxRuntime.jsx)("em", {
          children: _InputNumber.TokenUnit.abbr
        }), " tokens"]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Columar, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Columar.Column, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Card, {
          withBottomMargin: true,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
            children: t('1. Select your {{chain}} account', {
              replace: {
                chain: systemChain
              }
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
            defaultValue: accountId,
            help: t('The account you want to claim to.'),
            label: t('claim to account'),
            onChange: setAccountId,
            type: "all"
          }), step === Step.Account && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button.Group, {
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
              icon: "sign-in-alt",
              isDisabled: preclaimEthereumAddress === PRECLAIMS_LOADING,
              label: preclaimEthereumAddress === PRECLAIMS_LOADING ? t('Loading') : t('Continue'),
              onClick: handleAccountStep
            })
          })]
        }), // We need to know the ethereuem address only for the new process
        // to be able to know the statement kind so that the users can sign it
        step >= Step.ETHAddress && !isPreclaimed && !isOldClaimProcess && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Card, {
          withBottomMargin: true,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
            children: t('2. Enter the ETH address from the sale.')
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
            autoFocus: true,
            className: "full",
            help: t('The Ethereum address you used during the pre-sale (starting by "0x")'),
            label: t('Pre-sale ethereum address'),
            onChange: onChangeEthereumAddress,
            value: ethereumAddress || ''
          }), step === Step.ETHAddress && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button.Group, {
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
              icon: "sign-in-alt",
              isDisabled: !ethereumAddress,
              label: t('Continue'),
              onClick: goToStepSign
            })
          })]
        }), step >= Step.Sign && !isPreclaimed && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Card, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
            children: t('{{step}}. Sign with your ETH address', {
              replace: {
                step: isOldClaimProcess ? '2' : '3'
              }
            })
          }), !isOldClaimProcess && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Statement.default, {
            kind: statementKind,
            systemChain: systemChain
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            children: t('Copy the following string and sign it with the Ethereum account you used during the pre-sale in the wallet of your choice, using the string as the payload, and then paste the transaction signature object below:')
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactCopyToClipboard.default, {
            onCopy: onCopy,
            text: payload,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(Payload, {
              "data-for": "tx-payload",
              "data-tip": true,
              children: payload
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Tooltip, {
            place: "right",
            text: didCopy ? t('copied') : t('click to copy'),
            trigger: "tx-payload"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            children: t('Paste the signed message into the field below. The placeholder text is there as a hint to what the message should look like:')
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Signature, {
            onChange: onChangeSignature,
            placeholder: `{\n  "address": "0x ...",\n  "msg": "${prefix}:...",\n  "sig": "0x ...",\n  "version": "2"\n}`,
            rows: 10
          }), step === Step.Sign && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button.Group, {
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
              icon: "sign-in-alt",
              isDisabled: !accountId || !signature,
              label: t('Confirm claim'),
              onClick: goToStepClaim
            })
          })]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Columar.Column, {
        children: step >= Step.Claim && (isPreclaimed ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_Attest.default, {
          accountId: accountId,
          ethereumAddress: ethereumAddress,
          onSuccess: goToStepAccount,
          statementKind: statementKind,
          systemChain: systemChain
        }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_Claim.default, {
          accountId: accountId,
          ethereumAddress: ethereumAddress,
          ethereumSignature: signature,
          isOldClaimProcess: isOldClaimProcess,
          onSuccess: goToStepAccount,
          statementKind: statementKind
        }))
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(ClaimsApp);

exports.default = _default;