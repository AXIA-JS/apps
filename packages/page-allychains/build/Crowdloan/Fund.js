// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useMemo, useState } from 'react';
import { AddressMini, Expander, Icon, ParaLink, Spinner, TxButton } from '@axia-js/react-components';
import { useAccounts, useApi, useParaEndpoints } from '@axia-js/react-hooks';
import { BlockToTime, FormatBalance } from '@axia-js/react-query';
import { formatNumber } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import Contribute from "./Contribute.js";
import Refund from "./Refund.js";
import useContributions from "./useContributions.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function Fund({
  bestHash,
  bestNumber,
  className = '',
  isOngoing,
  leasePeriod,
  value: {
    info: {
      cap,
      depositor,
      end,
      firstPeriod,
      lastPeriod,
      raised,
      verifier
    },
    isCapped,
    isEnded,
    isWinner,
    paraId
  }
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const {
    isAccount
  } = useAccounts();
  const endpoints = useParaEndpoints(paraId);
  const {
    blockHash,
    contributorsHex,
    hasLoaded,
    myAccounts,
    myAccountsHex,
    myContributions
  } = useContributions(paraId);
  const [lastChange, setLastChange] = useState(() => ({
    prevHash: '',
    prevLength: 0
  }));
  const isDepositor = useMemo(() => isAccount(depositor.toString()), [depositor, isAccount]);
  const blocksLeft = useMemo(() => bestNumber && end.gt(bestNumber) ? end.sub(bestNumber) : null, [bestNumber, end]);
  const percentage = useMemo(() => cap.isZero() ? '100.00%' : `${(raised.muln(10000).div(cap).toNumber() / 100).toFixed(2)}%`, [cap, raised]);
  const hasEnded = !blocksLeft && !!leasePeriod && (isWinner ? leasePeriod.currentPeriod.gt(lastPeriod) : leasePeriod.currentPeriod.gt(firstPeriod));
  const canContribute = isOngoing && !isCapped && !isWinner && !!blocksLeft;
  const canDissolve = raised.isZero();
  const canWithdraw = !raised.isZero() && hasEnded;
  const homepage = endpoints.length !== 0 && endpoints[0].homepage;
  useEffect(() => {
    setLastChange(prev => {
      const prevLength = contributorsHex.length;
      return prev.prevLength !== prevLength ? {
        prevHash: blockHash,
        prevLength
      } : prev;
    });
  }, [contributorsHex, blockHash]);
  return /*#__PURE__*/_jsxs("tr", {
    className: className,
    children: [/*#__PURE__*/_jsx("td", {
      className: "number",
      children: /*#__PURE__*/_jsx("h1", {
        children: formatNumber(paraId)
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "badge",
      children: /*#__PURE__*/_jsx(ParaLink, {
        id: paraId
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "media--800",
      children: isWinner ? t('Winner') : blocksLeft ? isCapped ? t('Capped') : isOngoing ? t('Active') : t('Past') : t('Ended')
    }), /*#__PURE__*/_jsx("td", {
      className: "address media--1400",
      children: /*#__PURE__*/_jsx(AddressMini, {
        value: depositor
      })
    }), /*#__PURE__*/_jsxs("td", {
      className: "all number together media--1200",
      children: [blocksLeft && /*#__PURE__*/_jsx(BlockToTime, {
        value: blocksLeft
      }), "#", formatNumber(end)]
    }), /*#__PURE__*/_jsx("td", {
      className: "number all together",
      children: firstPeriod.eq(lastPeriod) ? formatNumber(firstPeriod) : `${formatNumber(firstPeriod)} - ${formatNumber(lastPeriod)}`
    }), /*#__PURE__*/_jsxs("td", {
      className: "number together",
      children: [/*#__PURE__*/_jsx(FormatBalance, {
        value: raised,
        withCurrency: false
      }), "\xA0/\xA0", /*#__PURE__*/_jsx(FormatBalance, {
        value: cap
      }), /*#__PURE__*/_jsx("div", {
        children: percentage
      }), myAccounts.length !== 0 && /*#__PURE__*/_jsx(Expander, {
        summary: t('My contributions ({{count}})', {
          replace: {
            count: myAccounts.length
          }
        }),
        withBreaks: true,
        children: myAccounts.map((a, index) => /*#__PURE__*/_jsx(AddressMini, {
          balance: myContributions[myAccountsHex[index]],
          value: a,
          withBalance: true
        }, a))
      })]
    }), /*#__PURE__*/_jsx("td", {
      className: "number together media--1100",
      children: !hasLoaded ? /*#__PURE__*/_jsx(Spinner, {
        noLabel: true
      }) : /*#__PURE__*/_jsxs(_Fragment, {
        children: [bestHash && /*#__PURE__*/_jsx(Icon, {
          color: lastChange.prevHash === bestHash ? 'green' : 'transparent',
          icon: "chevron-up",
          isPadded: true
        }), contributorsHex.length !== 0 && formatNumber(contributorsHex.length)]
      })
    }), /*#__PURE__*/_jsxs("td", {
      className: "button media--1000",
      children: [canWithdraw && contributorsHex.length !== 0 && /*#__PURE__*/_jsx(Refund, {
        paraId: paraId
      }), canDissolve && /*#__PURE__*/_jsx(TxButton, {
        accountId: depositor,
        className: "media--1400",
        icon: "times",
        isDisabled: !isDepositor,
        label: isEnded ? t('Close') : t('Cancel'),
        params: [paraId],
        tx: api.tx.crowdloan.dissolve
      }), isOngoing && canContribute && /*#__PURE__*/_jsx(Contribute, {
        cap: cap,
        needsSignature: verifier.isSome,
        paraId: paraId,
        raised: raised
      }), isOngoing && homepage && /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("a", {
          href: homepage,
          rel: "noopener noreferrer",
          target: "_blank",
          children: t('Homepage')
        }), "\xA0\xA0\xA0"]
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(Fund);