"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ClaimStyles = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _reactQuery = require("@axia-js/react-query");

var _util = require("@axia-js/util");

var _translate = require("./translate.cjs");

var _util2 = require("./util.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
    params: [accountId, ethereumSignature, (_getStatement = (0, _util2.getStatement)(systemChain, kind)) === null || _getStatement === void 0 ? void 0 : _getStatement.sentence],
    tx: api.tx.claims.claimAttest
  };
}

function Claim(_ref) {
  let {
    accountId,
    className = '',
    ethereumAddress,
    ethereumSignature,
    isOldClaimProcess,
    onSuccess,
    statementKind
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api,
    systemChain
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

  if (!ethereumAddress || isBusy || !claimValue) {
    return null;
  }

  const hasClaim = claimValue.gt(_util.BN_ZERO);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Card, {
    isError: !hasClaim,
    isSuccess: hasClaim,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: className,
      children: [t('Your Ethereum account'), /*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
        children: (0, _util2.addrToChecksum)(ethereumAddress.toString())
      }), hasClaim ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [t('has a valid claim for'), /*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
            value: claimValue
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button.Group, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, _objectSpread({
            icon: "paper-plane",
            isUnsigned: true,
            label: t('Claim'),
            onSuccess: onSuccess
          }, constructTx(api, systemChain, accountId, ethereumSignature, statementKind, isOldClaimProcess)))
        })]
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
        children: t('does not appear to have a valid claim. Please double check that you have signed the transaction correctly on the correct ETH account.')
      })]
    })
  });
}

const ClaimStyles = `
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
exports.ClaimStyles = ClaimStyles;

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Claim).withConfig({
  displayName: "Claim",
  componentId: "sc-hhj7u3-0"
})(["", ""], ClaimStyles));

exports.default = _default;