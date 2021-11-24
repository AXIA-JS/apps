import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/app-claims authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Card, TxButton } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import { FormatBalance } from '@axia-js/react-query';
import { BN_ZERO } from '@axia-js/util';
import { useTranslation } from "./translate.js";
import { addrToChecksum, getStatement } from "./util.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

// Depending on isOldClaimProcess, construct the correct tx.
// FIXME We actually want to return the constructed extrinsic here (probably in useMemo)
function constructTx(api, systemChain, accountId, ethereumSignature, kind, isOldClaimProcess) {
  var _getStatement;

  if (!ethereumSignature) {
    return {};
  }

  return isOldClaimProcess || !kind ? {
    params: [accountId, ethereumSignature],
    tx: api.tx.claims.claim
  } : {
    params: [accountId, ethereumSignature, (_getStatement = getStatement(systemChain, kind)) === null || _getStatement === void 0 ? void 0 : _getStatement.sentence],
    tx: api.tx.claims.claimAttest
  };
}

function Claim({
  accountId,
  className = '',
  ethereumAddress,
  ethereumSignature,
  isOldClaimProcess,
  onSuccess,
  statementKind
}) {
  const {
    t
  } = useTranslation();
  const {
    api,
    systemChain
  } = useApi();
  const [claimValue, setClaimValue] = useState(null);
  const [isBusy, setIsBusy] = useState(false);
  useEffect(() => {
    if (!ethereumAddress) {
      return;
    }

    setIsBusy(true);
    api.query.claims.claims(ethereumAddress).then(claim => {
      setClaimValue(claim.unwrapOr(BN_ZERO));
      setIsBusy(false);
    }).catch(error => {
      console.error(error);
      setIsBusy(false);
    });
  }, [api, ethereumAddress]);

  if (!ethereumAddress || isBusy || !claimValue) {
    return null;
  }

  const hasClaim = claimValue.gt(BN_ZERO);
  return /*#__PURE__*/_jsx(Card, {
    isError: !hasClaim,
    isSuccess: hasClaim,
    children: /*#__PURE__*/_jsxs("div", {
      className: className,
      children: [t('Your Ethereum account'), /*#__PURE__*/_jsx("h3", {
        children: addrToChecksum(ethereumAddress.toString())
      }), hasClaim ? /*#__PURE__*/_jsxs(_Fragment, {
        children: [t('has a valid claim for'), /*#__PURE__*/_jsx("h2", {
          children: /*#__PURE__*/_jsx(FormatBalance, {
            value: claimValue
          })
        }), /*#__PURE__*/_jsx(Button.Group, {
          children: /*#__PURE__*/_jsx(TxButton, _objectSpread({
            icon: "paper-plane",
            isUnsigned: true,
            label: t('Claim'),
            onSuccess: onSuccess
          }, constructTx(api, systemChain, accountId, ethereumSignature, statementKind, isOldClaimProcess)))
        })]
      }) : /*#__PURE__*/_jsx(_Fragment, {
        children: t('does not appear to have a valid claim. Please double check that you have signed the transaction correctly on the correct ETH account.')
      })]
    })
  });
}

export const ClaimStyles = `
font-size: 1.15rem;
display: flex;
flex-direction: column;
justify-content: center;
min-height: 12rem;
align-items: center;
margin: 0 1rem;

h3 {
  font-family: monospace;
  font-size: 1.5rem;
  max-width: 100%;
  margin: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

h2 {
  margin: 0.5rem 0 2rem;
  font-family: monospace;
  font-size: 2.5rem;
  font-weight: 400;
}
`;
export default /*#__PURE__*/React.memo(styled(Claim).withConfig({
  displayName: "Claim",
  componentId: "sc-hhj7u3-0"
})(["", ""], ClaimStyles));