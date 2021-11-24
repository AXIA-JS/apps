"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useOwnStashInfos = useOwnStashInfos;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = require("react");

var _util = require("@axia-js/util");

var _useAccounts = require("./useAccounts.cjs");

var _useApi = require("./useApi.cjs");

var _useIsMountedRef = require("./useIsMountedRef.cjs");

var _useOwnStashes = require("./useOwnStashes.cjs");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function toIdString(id) {
  return id ? id.toString() : null;
}

function getStakerState(stashId, allAccounts, _ref) {
  let [isOwnStash, {
    controllerId: _controllerId,
    exposure,
    nextSessionIds: _nextSessionIds,
    nominators,
    rewardDestination,
    sessionIds: _sessionIds,
    stakingLedger,
    validatorPrefs
  }, validateInfo] = _ref;
  const isStashNominating = !!(nominators !== null && nominators !== void 0 && nominators.length);
  const isStashValidating = !(Array.isArray(validateInfo) ? validateInfo[1].isEmpty : validateInfo.isEmpty);
  const nextSessionIds = _nextSessionIds instanceof Map ? [..._nextSessionIds.values()] : _nextSessionIds;
  const nextConcat = (0, _util.u8aConcat)(...nextSessionIds.map(id => id.toU8a()));
  const sessionIds = _sessionIds instanceof Map ? [..._sessionIds.values()] : _sessionIds;
  const currConcat = (0, _util.u8aConcat)(...sessionIds.map(id => id.toU8a()));
  const controllerId = toIdString(_controllerId);
  return {
    controllerId,
    destination: rewardDestination,
    exposure,
    hexSessionIdNext: (0, _util.u8aToHex)(nextConcat, 48),
    hexSessionIdQueue: (0, _util.u8aToHex)(currConcat.length ? currConcat : nextConcat, 48),
    isLoading: false,
    isOwnController: allAccounts.includes(controllerId || ''),
    isOwnStash,
    isStashNominating,
    isStashValidating,
    // we assume that all ids are non-null
    nominating: nominators === null || nominators === void 0 ? void 0 : nominators.map(toIdString),
    sessionIds: (nextSessionIds.length ? nextSessionIds : sessionIds).map(toIdString),
    stakingLedger,
    stashId,
    validatorPrefs
  };
}

function useOwnStashInfos() {
  const {
    api
  } = (0, _useApi.useApi)();
  const {
    allAccounts
  } = (0, _useAccounts.useAccounts)();
  const mountedRef = (0, _useIsMountedRef.useIsMountedRef)();
  const ownStashes = (0, _useOwnStashes.useOwnStashes)();
  const [queried, setQueried] = (0, _react.useState)();
  (0, _react.useEffect)(() => {
    let unsub;

    if (ownStashes) {
      if (ownStashes.length) {
        const stashIds = ownStashes.map(_ref2 => {
          let [stashId] = _ref2;
          return stashId;
        });
        const fns = [[api.derive.staking.accounts, stashIds], [api.query.staking.validators.multi, stashIds]];
        api.combineLatest(fns, _ref3 => {
          let [accounts, validators] = _ref3;
          mountedRef.current && ownStashes.length === accounts.length && ownStashes.length === validators.length && setQueried(ownStashes.reduce((queried, _ref4, index) => {
            let [stashId, isOwnStash] = _ref4;
            return _objectSpread(_objectSpread({}, queried), {}, {
              [stashId]: [isOwnStash, accounts[index], validators[index]]
            });
          }, {}));
        }).then(u => {
          unsub = u;
        }).catch(console.error);
      } else {
        mountedRef.current && setQueried({});
      }
    }

    return () => {
      unsub && unsub();
    };
  }, [api, mountedRef, ownStashes]);
  return (0, _react.useMemo)(() => ownStashes && queried && ownStashes.length === Object.keys(queried).length ? ownStashes.filter(_ref5 => {
    let [stashId] = _ref5;
    return queried[stashId];
  }).map(_ref6 => {
    let [stashId] = _ref6;
    return getStakerState(stashId, allAccounts, queried[stashId]);
  }) : undefined, [allAccounts, ownStashes, queried]);
}