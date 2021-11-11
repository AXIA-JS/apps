"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _reactHooks = require("@axia-js/react-hooks");

var _reactQuery = require("@axia-js/react-query");

var _util = require("@axia-js/util");

var _InputBalance = _interopRequireDefault(require("./InputBalance.cjs"));

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function getValues(selectedId, isCouncil, allBalances, existential) {
  const value = allBalances.lockedBalance;
  const maxValue = allBalances.votingBalance.add(isCouncil ? allBalances.reservedBalance : _util.BN_ZERO);
  return {
    maxValue,
    selectedId,
    value: value.isZero() ? maxValue.gt(existential) ? maxValue.sub(existential) : _util.BN_ZERO : value
  };
}

function VoteValue({
  accountId,
  autoFocus,
  isCouncil,
  onChange
}) {
  var _api$derive$balances;

  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const allBalances = (0, _reactHooks.useCall)((_api$derive$balances = api.derive.balances) === null || _api$derive$balances === void 0 ? void 0 : _api$derive$balances.all, [accountId]);
  const [{
    maxValue,
    selectedId,
    value
  }, setValue] = (0, _react.useState)({
    maxValue: _util.BN_ZERO,
    value: _util.BN_ZERO
  });
  (0, _react.useEffect)(() => {
    // if the set accountId changes and the new balances is for that id, set it
    allBalances && allBalances.accountId.eq(accountId) && setValue(state => state.selectedId !== accountId ? getValues(accountId, isCouncil, allBalances, api.consts.balances.existentialDeposit) : state);
  }, [allBalances, accountId, api, isCouncil]); // only do onChange to parent when the BN value comes in, not our formatted version

  (0, _react.useEffect)(() => {
    onChange(value);
  }, [onChange, value]);

  const _setValue = (0, _react.useCallback)(value => setValue(state => state.selectedId === accountId && value && !value.eq(state.value) ? _objectSpread(_objectSpread({}, state), {}, {
    value
  }) : state), [accountId]);

  const isDisabled = accountId !== selectedId;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputBalance.default, {
    autoFocus: autoFocus,
    defaultValue: isDisabled ? undefined : value,
    help: t('The amount that is associated with this vote. This value is is locked for the duration of the vote.'),
    isDisabled: isDisabled,
    isZeroable: true,
    label: t('vote value'),
    labelExtra: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.BalanceVoting, {
      isCouncil: isCouncil,
      label: /*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
        children: t('voting balance')
      }),
      params: accountId
    }),
    maxValue: maxValue,
    onChange: _setValue
  });
}

var _default = /*#__PURE__*/_react.default.memo(VoteValue);

exports.default = _default;