"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _reactQuery = require("@axia-js/react-query");

var _util = require("@axia-js/util");

var _Claim = require("./Claim.cjs");

var _Statement = _interopRequireDefault(require("./Statement.cjs"));

var _translate = require("./translate.cjs");

var _util2 = require("./util.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-claims authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Attest({
  accountId,
  className,
  ethereumAddress,
  onSuccess,
  statementKind,
  systemChain
}) {
  const accounts = (0, _reactHooks.useAccounts)();
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [claimValue, setClaimValue] = (0, _react.useState)(null);
  const [isBusy, setIsBusy] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    if (!ethereumAddress) {
      return;
    }

    setIsBusy(true);
    api.query.claims.claims(ethereumAddress).then(claim => {
      setClaimValue(claim.unwrapOr(_util.BN_ZERO));
      setIsBusy(false);
    }).catch(error => {
      console.error(error);
      setIsBusy(false);
    });
  }, [api, ethereumAddress]);
  const statementSentence = (0, _react.useMemo)(() => {
    var _getStatement;

    return (_getStatement = (0, _util2.getStatement)(systemChain, statementKind)) === null || _getStatement === void 0 ? void 0 : _getStatement.sentence;
  }, [systemChain, statementKind]);

  if (isBusy || !claimValue) {
    return null;
  }

  const noClaim = claimValue.isZero();

  if (noClaim || !statementSentence) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Card, {
      isError: true,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: className,
        children: [noClaim && /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          children: t('There is no on-chain claimable balance associated with the Ethereum account {{ethereumAddress}}', {
            replace: {
              ethereumAddress
            }
          })
        }), !statementSentence && /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
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
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Card, {
      isError: true,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: className,
        children: [t('We found a pre-claim with this AXIA address. However, attesting requires signing with this account. To continue with attesting, please add this account as an owned account first.'), /*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
            label: t('Account balance:'),
            value: claimValue
          })
        })]
      })
    });
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Card, {
    isSuccess: true,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: className,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Statement.default, {
        kind: statementKind,
        systemChain: systemChain
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
          label: t('Account balance:'),
          value: claimValue
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button.Group, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
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

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Attest).withConfig({
  displayName: "Attest",
  componentId: "sc-16imda9-0"
})(["", ""], _Claim.ClaimStyles));

exports.default = _default;