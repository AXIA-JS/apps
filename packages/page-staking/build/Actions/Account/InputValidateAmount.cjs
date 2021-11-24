"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bn = _interopRequireDefault(require("bn.js"));

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _translate = require("../../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
function formatExistential(value) {
  let fmt = (value.mul(_util.BN_THOUSAND).div(_util.BN_TEN.pow(new _bn.default(_util.formatBalance.getDefaults().decimals))).toNumber() / 1000).toFixed(3);

  while (fmt.length !== 1 && ['.', '0'].includes(fmt[fmt.length - 1])) {
    const isLast = fmt.endsWith('.');
    fmt = fmt.substr(0, fmt.length - 1);

    if (isLast) {
      break;
    }
  }

  return fmt;
}

function ValidateAmount(_ref) {
  var _api$derive$balances;

  let {
    currentAmount,
    isNominating,
    minNominated,
    minNominatorBond,
    minValidatorBond,
    onError,
    stashId,
    value
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const stashBalance = (0, _reactHooks.useCall)((_api$derive$balances = api.derive.balances) === null || _api$derive$balances === void 0 ? void 0 : _api$derive$balances.all, [stashId]);
  const [{
    error,
    warning
  }, setResult] = (0, _react.useState)({
    error: null,
    warning: null
  });
  (0, _react.useEffect)(() => {
    if (stashBalance && value) {
      // also used in bond extra, take check against total of current bonded and new
      const check = value.add(currentAmount || _util.BN_ZERO);
      const existentialDeposit = api.consts.balances.existentialDeposit;
      const maxBond = stashBalance.freeBalance.sub(existentialDeposit.divn(2));
      let newError = null;
      let newWarning = null;

      if (check.gte(maxBond)) {
        newError = t('The specified value is too large and does not allow funds to pay future transaction fees.');
      } else if (check.lt(existentialDeposit)) {
        newError = t('The bonded amount is less than the minimum bond amount of {{existentialDeposit}}', {
          replace: {
            existentialDeposit: formatExistential(existentialDeposit)
          }
        });
      } else if (isNominating) {
        if (minNominatorBond && check.lt(minNominatorBond)) {
          newError = t('The bonded amount is less than the minimum threshold of {{minBond}} for nominators', {
            replace: {
              minBond: (0, _util.formatBalance)(minNominatorBond)
            }
          });
        } else if (minNominated && check.lt(minNominated)) {
          newWarning = t('The bonded amount is less than the current active minimum nominated amount of {{minNomination}} and depending on the network state, may not be selected to participate', {
            replace: {
              minNomination: (0, _util.formatBalance)(minNominated)
            }
          });
        }
      } else {
        if (minValidatorBond && check.lt(minValidatorBond)) {
          newError = t('The bonded amount is less than the minimum threshold of {{minBond}} for validators', {
            replace: {
              minBond: (0, _util.formatBalance)(minValidatorBond)
            }
          });
        }
      }

      setResult(state => {
        const error = state.error !== newError ? newError : state.error;
        const warning = state.warning !== newWarning ? newWarning : state.warning;
        onError(error || warning ? {
          error,
          warning
        } : null);
        return {
          error,
          warning
        };
      });
    }
  }, [api, currentAmount, isNominating, minNominated, minNominatorBond, minValidatorBond, onError, stashBalance, t, value]);

  if (error) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkError, {
      content: error
    });
  } else if (warning) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkWarning, {
      content: warning
    });
  }

  return null;
}

var _default = /*#__PURE__*/_react.default.memo(ValidateAmount);

exports.default = _default;