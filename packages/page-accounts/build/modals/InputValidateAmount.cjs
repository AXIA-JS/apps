"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
function ValidateAmount({
  amount,
  delegatingAccount,
  onError
}) {
  var _api$derive$balances;

  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const delegatingAccountBalance = (0, _reactHooks.useCall)((_api$derive$balances = api.derive.balances) === null || _api$derive$balances === void 0 ? void 0 : _api$derive$balances.all, [delegatingAccount]);
  const [{
    error,
    warning
  }, setResult] = (0, _react.useState)({
    error: null,
    warning: null
  });
  (0, _react.useEffect)(() => {
    if (delegatingAccountBalance !== null && delegatingAccountBalance !== void 0 && delegatingAccountBalance.freeBalance && amount !== null && amount !== void 0 && amount.gt(_util.BN_ZERO)) {
      let newError = null;

      if (amount.gte(delegatingAccountBalance.freeBalance)) {
        newError = t('The maximum amount you can delegate is the amount of funds available on the delegating account.');
      }

      setResult(state => {
        const error = state.error !== newError ? newError : state.error;
        const warning = state.warning;
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
  }, [api, onError, amount, t, delegatingAccountBalance]);

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