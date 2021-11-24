// Copyright 2017-2021 @axia-js/app-claims authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Button, Card, TxButton } from '@axia-js/react-components';
import { useAccounts, useApi } from '@axia-js/react-hooks';
import { FormatBalance } from '@axia-js/react-query';
import { BN_ZERO } from '@axia-js/util';
import { ClaimStyles } from "./Claim.js";
import Statement from "./Statement.js";
import { useTranslation } from "./translate.js";
import { getStatement } from "./util.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Attest({
  accountId,
  className,
  ethereumAddress,
  onSuccess,
  statementKind,
  systemChain
}) {
  const accounts = useAccounts();
  const {
    t
  } = useTranslation();
  const {
    api
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
  const statementSentence = useMemo(() => {
    var _getStatement;

    return (_getStatement = getStatement(systemChain, statementKind)) === null || _getStatement === void 0 ? void 0 : _getStatement.sentence;
  }, [systemChain, statementKind]);

  if (isBusy || !claimValue) {
    return null;
  }

  const noClaim = claimValue.isZero();

  if (noClaim || !statementSentence) {
    return /*#__PURE__*/_jsx(Card, {
      isError: true,
      children: /*#__PURE__*/_jsxs("div", {
        className: className,
        children: [noClaim && /*#__PURE__*/_jsx("p", {
          children: t('There is no on-chain claimable balance associated with the Ethereum account {{ethereumAddress}}', {
            replace: {
              ethereumAddress
            }
          })
        }), !statementSentence && /*#__PURE__*/_jsx("p", {
          children: t('There is no on-chain attestation statement associated with the Ethereum account {{ethereumAddress}}', {
            replace: {
              ethereumAddress
            }
          })
        })]
      })
    });
  }

  if (!accounts.isAccount(accountId)) {
    return /*#__PURE__*/_jsx(Card, {
      isError: true,
      children: /*#__PURE__*/_jsxs("div", {
        className: className,
        children: [t('We found a pre-claim with this AXIA address. However, attesting requires signing with this account. To continue with attesting, please add this account as an owned account first.'), /*#__PURE__*/_jsx("h3", {
          children: /*#__PURE__*/_jsx(FormatBalance, {
            label: t('Account balance:'),
            value: claimValue
          })
        })]
      })
    });
  }

  return /*#__PURE__*/_jsx(Card, {
    isSuccess: true,
    children: /*#__PURE__*/_jsxs("div", {
      className: className,
      children: [/*#__PURE__*/_jsx(Statement, {
        kind: statementKind,
        systemChain: systemChain
      }), /*#__PURE__*/_jsx("h3", {
        children: /*#__PURE__*/_jsx(FormatBalance, {
          label: t('Account balance:'),
          value: claimValue
        })
      }), /*#__PURE__*/_jsx(Button.Group, {
        children: /*#__PURE__*/_jsx(TxButton, {
          accountId: accountId,
          icon: "paper-plane",
          isDisabled: !statementSentence,
          label: t('I agree'),
          onSuccess: onSuccess,
          params: [statementSentence],
          tx: api.tx.claims.attest
        })
      })]
    })
  });
}

export default /*#__PURE__*/React.memo(styled(Attest).withConfig({
  displayName: "Attest",
  componentId: "sc-y5dg00-0"
})(["", ""], ClaimStyles));