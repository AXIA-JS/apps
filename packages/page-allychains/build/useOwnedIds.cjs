"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useOwnedIds;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = require("react");

var _reactHooks = require("@axia-js/react-hooks");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function extractIds(entries) {
  const owned = entries.map(_ref => {
    let [{
      args: [paraId]
    }, optInfo] = _ref;

    if (optInfo.isNone) {
      return null;
    }

    const paraInfo = optInfo.unwrap();
    return {
      manager: paraInfo.manager.toString(),
      paraId,
      paraInfo
    };
  }).filter(id => !!id);
  return {
    ids: owned.map(_ref2 => {
      let {
        paraId
      } = _ref2;
      return paraId;
    }),
    owned
  };
}

const hashesOption = {
  transform: _ref3 => {
    let [[paraIds], optHashes] = _ref3;
    return paraIds.map((paraId, index) => ({
      hash: optHashes[index].unwrapOr(null),
      paraId
    }));
  },
  withParamsTransform: true
};

function useOwnedIds() {
  const {
    api
  } = (0, _reactHooks.useApi)();
  const {
    allAccounts
  } = (0, _reactHooks.useAccounts)();
  const trigger = (0, _reactHooks.useEventTrigger)([api.events.registrar.Registered, api.events.registrar.Reserved]);
  const unfiltered = (0, _reactHooks.useMapEntries)(api.query.registrar.paras, {
    at: trigger.blockHash,
    transform: extractIds
  });
  const hashes = (0, _reactHooks.useCall)(api.query.paras.currentCodeHash.multi, [unfiltered ? unfiltered.ids : []], hashesOption);
  return (0, _react.useMemo)(() => unfiltered && hashes ? unfiltered.owned.filter(id => allAccounts.some(a => a === id.manager)).map(data => _objectSpread(_objectSpread({}, data), {}, {
    hasCode: hashes.some(_ref4 => {
      let {
        hash,
        paraId
      } = _ref4;
      return !!hash && paraId.eq(data.paraId);
    })
  })) : [], [allAccounts, hashes, unfiltered]);
}