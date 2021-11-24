"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _translate = require("../../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
const transformBonded = {
  transform: value => value.isSome ? value.unwrap().toString() : null
};
const transformStash = {
  transform: value => value.isSome ? value.unwrap().stash.toString() : null
};

function ValidateController(_ref) {
  var _api$derive$balances;

  let {
    accountId,
    controllerId,
    defaultController,
    onError
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const bondedId = (0, _reactHooks.useCall)(controllerId ? api.query.staking.bonded : null, [controllerId], transformBonded);
  const stashId = (0, _reactHooks.useCall)(controllerId ? api.query.staking.ledger : null, [controllerId], transformStash);
  const allBalances = (0, _reactHooks.useCall)(controllerId ? (_api$derive$balances = api.derive.balances) === null || _api$derive$balances === void 0 ? void 0 : _api$derive$balances.all : null, [controllerId]);
  const [{
    error,
    isFatal
  }, setError] = (0, _react.useState)({
    error: null,
    isFatal: false
  });
  (0, _react.useEffect)(() => {
    // don't show an error if the selected controller is the default
    // this applies when changing controller
    if (defaultController !== controllerId) {
      let newError = null;
      let isFatal = false;

      if (bondedId && controllerId !== accountId) {
        isFatal = true;
        newError = t('A controller account should not map to another stash. This selected controller is a stash, controlled by {{bondedId}}', {
          replace: {
            bondedId
          }
        });
      } else if (stashId) {
        isFatal = true;
        newError = t('A controller account should not be set to manage multiple stashes. The selected controller is already controlling {{stashId}}', {
          replace: {
            stashId
          }
        });
      } else if (allBalances !== null && allBalances !== void 0 && allBalances.freeBalance.isZero()) {
        isFatal = true;
        newError = t('The controller does not have sufficient funds available to cover transaction fees. Ensure that a funded controller is used.');
      } else if (controllerId === accountId) {
        newError = t('Distinct stash and controller accounts are recommended to ensure fund security. You will be allowed to make the transaction, but take care to not tie up all funds, only use a portion of the available funds during this period.');
      }

      onError(newError, isFatal);
      setError(state => state.error !== newError ? {
        error: newError,
        isFatal
      } : state);
    }
  }, [accountId, allBalances, bondedId, controllerId, defaultController, onError, stashId, t]);

  if (!error || !accountId) {
    return null;
  }

  return isFatal ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkError, {
    content: error
  }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkWarning, {
    content: error
  });
}

var _default = /*#__PURE__*/_react.default.memo(ValidateController);

exports.default = _default;