// Copyright 2017-2021 @axia-js/app-claims authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect, useRef, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Trans } from 'react-i18next';
import styled from 'styled-components';
import { Button, Card, Columar, Input, InputAddress, Tabs, Tooltip } from '@axia-js/react-components';
import { TokenUnit } from '@axia-js/react-components/InputNumber';
import { useApi, useCall } from '@axia-js/react-hooks';
import { u8aToHex, u8aToString } from '@axia-js/util';
import { decodeAddress } from '@axia-js/util-crypto';
import AttestDisplay from "./Attest.js";
import ClaimDisplay from "./Claim.js";
import Statement from "./Statement.js";
import { useTranslation } from "./translate.js";
import { getStatement, recoverFromJSON } from "./util.js";
import Warning from "./Warning.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export { default as useCounter } from "./useCounter.js";
var Step;

(function (Step) {
  Step[Step["Account"] = 0] = "Account";
  Step[Step["ETHAddress"] = 1] = "ETHAddress";
  Step[Step["Sign"] = 2] = "Sign";
  Step[Step["Claim"] = 3] = "Claim";
})(Step || (Step = {}));

const PRECLAIMS_LOADING = 'PRECLAIMS_LOADING'; // FIXME no embedded components (hossible to tweak)

const Payload = styled.pre.withConfig({
  displayName: "src__Payload",
  componentId: "sc-od775f-0"
})(["cursor:copy;font:var(--font-mono);border:1px dashed #c2c2c2;background:#f2f2f2;padding:1rem;width:100%;margin:1rem 0;white-space:normal;word-break:break-all;"]);
const Signature = styled.textarea.withConfig({
  displayName: "src__Signature",
  componentId: "sc-od775f-1"
})(["font:var(--font-mono);padding:1rem;border:1px solid var(--border-input);border-radius:0.25rem;margin:1rem 0;resize:none;width:100%;&::placeholder{color:rgba(0,0,0,0.5);}&::-ms-input-placeholder{color:rgba(0,0,0,0.5);}&:-ms-input-placeholder{color:rgba(0,0,0,0.5);}"]);
const transformStatement = {
  transform: option => option.unwrapOr(null)
};

function ClaimsApp({
  basePath
}) {
  var _getStatement;

  const [didCopy, setDidCopy] = useState(false);
  const [ethereumAddress, setEthereumAddress] = useState(null);
  const [signature, setSignature] = useState(null);
  const [step, setStep] = useState(Step.Account);
  const [accountId, setAccountId] = useState(null);
  const {
    api,
    systemChain
  } = useApi();
  const {
    t
  } = useTranslation(); // This preclaimEthereumAddress holds the result of `api.query.claims.preclaims`:
  // - an `EthereumAddress` when there's a preclaim
  // - null if no preclaim
  // - `PRECLAIMS_LOADING` if we're fetching the results

  const [preclaimEthereumAddress, setPreclaimEthereumAddress] = useState(PRECLAIMS_LOADING);
  const isPreclaimed = !!preclaimEthereumAddress && preclaimEthereumAddress !== PRECLAIMS_LOADING;
  const itemsRef = useRef([{
    isRoot: true,
    name: 'create',
    text: t('Claim tokens')
  }]); // Everytime we change account, reset everything, and check if the accountId
  // has a preclaim.

  useEffect(() => {
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
  useEffect(() => {
    if (didCopy) {
      setTimeout(() => {
        setDidCopy(false);
      }, 1000);
    }
  }, [didCopy]);
  const goToStepAccount = useCallback(() => {
    setStep(Step.Account);
  }, []);
  const goToStepSign = useCallback(() => {
    setStep(Step.Sign);
  }, []);
  const goToStepClaim = useCallback(() => {
    setStep(Step.Claim);
  }, []); // Depending on the account, decide which step to show.

  const handleAccountStep = useCallback(() => {
    if (isPreclaimed) {
      goToStepClaim();
    } else if (ethereumAddress || isOldClaimProcess) {
      goToStepSign();
    } else {
      setStep(Step.ETHAddress);
    }
  }, [ethereumAddress, goToStepClaim, goToStepSign, isPreclaimed, isOldClaimProcess]);
  const onChangeSignature = useCallback(event => {
    const {
      value: signatureJson
    } = event.target;
    const {
      ethereumAddress,
      signature
    } = recoverFromJSON(signatureJson);
    setEthereumAddress(ethereumAddress === null || ethereumAddress === void 0 ? void 0 : ethereumAddress.toString());
    setSignature(signature);
  }, []);
  const onChangeEthereumAddress = useCallback(value => {
    // FIXME We surely need a better check than just a trim
    setEthereumAddress(value.trim());
  }, []);
  const onCopy = useCallback(() => {
    setDidCopy(true);
  }, []); // If it's 1/ not preclaimed and 2/ not the old claiming process, fetch the
  // statement kind to sign.

  const statementKind = useCall(!isPreclaimed && !isOldClaimProcess && !!ethereumAddress && api.query.claims.signing, [ethereumAddress], transformStatement);
  const statementSentence = ((_getStatement = getStatement(systemChain, statementKind)) === null || _getStatement === void 0 ? void 0 : _getStatement.sentence) || '';
  const prefix = u8aToString(api.consts.claims.prefix.toU8a(true));
  const payload = accountId ? `${prefix}${u8aToHex(decodeAddress(accountId), -1, false)}${statementSentence}` : '';
  return /*#__PURE__*/_jsxs("main", {
    children: [/*#__PURE__*/_jsx(Tabs, {
      basePath: basePath,
      items: itemsRef.current
    }), !isOldClaimProcess && /*#__PURE__*/_jsx(Warning, {}), /*#__PURE__*/_jsx("h1", {
      children: /*#__PURE__*/_jsxs(Trans, {
        children: ["Claim your ", /*#__PURE__*/_jsx("em", {
          children: TokenUnit.abbr
        }), " tokens"]
      })
    }), /*#__PURE__*/_jsxs(Columar, {
      children: [/*#__PURE__*/_jsxs(Columar.Column, {
        children: [/*#__PURE__*/_jsxs(Card, {
          withBottomMargin: true,
          children: [/*#__PURE__*/_jsx("h3", {
            children: t('1. Select your {{chain}} account', {
              replace: {
                chain: systemChain
              }
            })
          }), /*#__PURE__*/_jsx(InputAddress, {
            defaultValue: accountId,
            help: t('The account you want to claim to.'),
            label: t('claim to account'),
            onChange: setAccountId,
            type: "all"
          }), step === Step.Account && /*#__PURE__*/_jsx(Button.Group, {
            children: /*#__PURE__*/_jsx(Button, {
              icon: "sign-in-alt",
              isDisabled: preclaimEthereumAddress === PRECLAIMS_LOADING,
              label: preclaimEthereumAddress === PRECLAIMS_LOADING ? t('Loading') : t('Continue'),
              onClick: handleAccountStep
            })
          })]
        }), // We need to know the ethereuem address only for the new process
        // to be able to know the statement kind so that the users can sign it
        step >= Step.ETHAddress && !isPreclaimed && !isOldClaimProcess && /*#__PURE__*/_jsxs(Card, {
          withBottomMargin: true,
          children: [/*#__PURE__*/_jsx("h3", {
            children: t('2. Enter the ETH address from the sale.')
          }), /*#__PURE__*/_jsx(Input, {
            autoFocus: true,
            className: "full",
            help: t('The Ethereum address you used during the pre-sale (starting by "0x")'),
            label: t('Pre-sale ethereum address'),
            onChange: onChangeEthereumAddress,
            value: ethereumAddress || ''
          }), step === Step.ETHAddress && /*#__PURE__*/_jsx(Button.Group, {
            children: /*#__PURE__*/_jsx(Button, {
              icon: "sign-in-alt",
              isDisabled: !ethereumAddress,
              label: t('Continue'),
              onClick: goToStepSign
            })
          })]
        }), step >= Step.Sign && !isPreclaimed && /*#__PURE__*/_jsxs(Card, {
          children: [/*#__PURE__*/_jsx("h3", {
            children: t('{{step}}. Sign with your ETH address', {
              replace: {
                step: isOldClaimProcess ? '2' : '3'
              }
            })
          }), !isOldClaimProcess && /*#__PURE__*/_jsx(Statement, {
            kind: statementKind,
            systemChain: systemChain
          }), /*#__PURE__*/_jsx("div", {
            children: t('Copy the following string and sign it with the Ethereum account you used during the pre-sale in the wallet of your choice, using the string as the payload, and then paste the transaction signature object below:')
          }), /*#__PURE__*/_jsx(CopyToClipboard, {
            onCopy: onCopy,
            text: payload,
            children: /*#__PURE__*/_jsx(Payload, {
              "data-for": "tx-payload",
              "data-tip": true,
              children: payload
            })
          }), /*#__PURE__*/_jsx(Tooltip, {
            place: "right",
            text: didCopy ? t('copied') : t('click to copy'),
            trigger: "tx-payload"
          }), /*#__PURE__*/_jsx("div", {
            children: t('Paste the signed message into the field below. The placeholder text is there as a hint to what the message should look like:')
          }), /*#__PURE__*/_jsx(Signature, {
            onChange: onChangeSignature,
            placeholder: `{\n  "address": "0x ...",\n  "msg": "${prefix}:...",\n  "sig": "0x ...",\n  "version": "2"\n}`,
            rows: 10
          }), step === Step.Sign && /*#__PURE__*/_jsx(Button.Group, {
            children: /*#__PURE__*/_jsx(Button, {
              icon: "sign-in-alt",
              isDisabled: !accountId || !signature,
              label: t('Confirm claim'),
              onClick: goToStepClaim
            })
          })]
        })]
      }), /*#__PURE__*/_jsx(Columar.Column, {
        children: step >= Step.Claim && (isPreclaimed ? /*#__PURE__*/_jsx(AttestDisplay, {
          accountId: accountId,
          ethereumAddress: ethereumAddress,
          onSuccess: goToStepAccount,
          statementKind: statementKind,
          systemChain: systemChain
        }) : /*#__PURE__*/_jsx(ClaimDisplay, {
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

export default /*#__PURE__*/React.memo(ClaimsApp);