"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _reactQuery = require("@axia-js/react-query");

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _Contribute = _interopRequireDefault(require("./Contribute.cjs"));

var _Refund = _interopRequireDefault(require("./Refund.cjs"));

var _useContributions = _interopRequireDefault(require("./useContributions.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Fund(_ref) {
  let {
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
      allyId
    }
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const {
    isAccount
  } = (0, _reactHooks.useAccounts)();
  const endpoints = (0, _reactHooks.useParaEndpoints)(allyId);
  const {
    blockHash,
    contributorsHex,
    hasLoaded,
    myAccounts,
    myAccountsHex,
    myContributions
  } = (0, _useContributions.default)(allyId);
  const [lastChange, setLastChange] = (0, _react.useState)(() => ({
    prevHash: '',
    prevLength: 0
  }));
  const isDepositor = (0, _react.useMemo)(() => isAccount(depositor.toString()), [depositor, isAccount]);
  const blocksLeft = (0, _react.useMemo)(() => bestNumber && end.gt(bestNumber) ? end.sub(bestNumber) : null, [bestNumber, end]);
  const percentage = (0, _react.useMemo)(() => cap.isZero() ? '100.00%' : `${(raised.muln(10000).div(cap).toNumber() / 100).toFixed(2)}%`, [cap, raised]);
  const hasEnded = !blocksLeft && !!leasePeriod && (isWinner ? leasePeriod.currentPeriod.gt(lastPeriod) : leasePeriod.currentPeriod.gt(firstPeriod));
  const canContribute = isOngoing && !isCapped && !isWinner && !!blocksLeft;
  const canDissolve = raised.isZero();
  const canWithdraw = !raised.isZero() && hasEnded;
  const homepage = endpoints.length !== 0 && endpoints[0].homepage;
  (0, _react.useEffect)(() => {
    setLastChange(prev => {
      const prevLength = contributorsHex.length;
      return prev.prevLength !== prevLength ? {
        prevHash: blockHash,
        prevLength
      } : prev;
    });
  }, [contributorsHex, blockHash]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("h1", {
        children: (0, _util.formatNumber)(allyId)
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "badge",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.ParaLink, {
        id: allyId
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "media--800",
      children: isWinner ? t('Winner') : blocksLeft ? isCapped ? t('Capped') : isOngoing ? t('Active') : t('Past') : t('Ended')
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "address media--1400",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressMini, {
        value: depositor
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("td", {
      className: "all number together media--1200",
      children: [blocksLeft && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.BlockToTime, {
        value: blocksLeft
      }), "#", (0, _util.formatNumber)(end)]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number all together",
      children: firstPeriod.eq(lastPeriod) ? (0, _util.formatNumber)(firstPeriod) : `${(0, _util.formatNumber)(firstPeriod)} - ${(0, _util.formatNumber)(lastPeriod)}`
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("td", {
      className: "number together",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
        value: raised,
        withCurrency: false
      }), "\xA0/\xA0", /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
        value: cap
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: percentage
      }), myAccounts.length !== 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Expander, {
        summary: t('My contributions ({{count}})', {
          replace: {
            count: myAccounts.length
          }
        }),
        withBreaks: true,
        children: myAccounts.map((a, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressMini, {
          balance: myContributions[myAccountsHex[index]],
          value: a,
          withBalance: true
        }, a))
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number together media--1100",
      children: !hasLoaded ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Spinner, {
        noLabel: true
      }) : /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [bestHash && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Icon, {
          color: lastChange.prevHash === bestHash ? 'green' : 'transparent',
          icon: "chevron-up",
          isPadded: true
        }), contributorsHex.length !== 0 && (0, _util.formatNumber)(contributorsHex.length)]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("td", {
      className: "button media--1000",
      children: [canWithdraw && contributorsHex.length !== 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Refund.default, {
        allyId: allyId
      }), canDissolve && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
        accountId: depositor,
        className: "media--1400",
        icon: "times",
        isDisabled: !isDepositor,
        label: isEnded ? t('Close') : t('Cancel'),
        params: [allyId],
        tx: api.tx.crowdloan.dissolve
      }), isOngoing && canContribute && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Contribute.default, {
        cap: cap,
        needsSignature: verifier.isSome,
        allyId: allyId,
        raised: raised
      }), isOngoing && homepage && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
          href: homepage,
          rel: "noopener noreferrer",
          target: "_blank",
          children: t('Homepage')
        }), "\xA0\xA0\xA0"]
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Fund);

exports.default = _default;