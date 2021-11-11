"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.createCustomAccount = exports.u64FromCurrency = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _definitions = require("@equilab/definitions");

var _bn = _interopRequireDefault(require("bn.js"));

var _rxjs = require("rxjs");

var _types = require("@axia-js/types");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const u64FromCurrency = currency => {
  const buf = Buffer.from(currency.toLowerCase());
  const size = buf.length;
  return buf.reduce((val, digit, i) => val + Math.pow(256, size - 1 - i) * digit, 0);
};

exports.u64FromCurrency = u64FromCurrency;

const transformBalanceStorage = (query, currency, transform, currencyToAsset, api) => {
  const arg = currencyToAsset(currency, api); // HACK as we cannot properly transform queryMulti result, define AccountData getters on standard Enum

  if (!_types.Enum.hacked) {
    _types.Enum.hacked = true;

    for (const prop of ['free', 'reserved', 'miscFrozen', 'feeFrozen']) {
      Object.defineProperty(_types.Enum.prototype, prop, {
        get() {
          const accData = transform(this);
          return accData[prop];
        },

        set() {// Do nothing
        }

      });
    }
  } // Transform result if we call the func normally


  const boundFunction = account => query(account, arg).pipe((0, _rxjs.map)(transform)); // Bind currency as second key for doubleMap for queryMulti


  const boundCreator = account => query.creator([account, arg]);

  Object.assign(boundCreator, _objectSpread({}, query.creator));
  return Object.assign(boundFunction, _objectSpread(_objectSpread({}, query), {}, {
    creator: boundCreator
  }));
};

const signedBalancePredicate = raw => ['asNegative', 'asPositive', 'isNegative', 'isPositive'].some(key => Object.prototype.hasOwnProperty.call(raw, key));

const createCustomAccount = (currency, currencyToAsset, accountDataType = 'AccountData') => (instanceId, api) => {
  const registry = api.registry;

  const transform = balance => {
    let free = registry.createType('Balance');
    const reserved = registry.createType('Balance');
    const miscFrozen = registry.createType('Balance');
    const feeFrozen = registry.createType('Balance');

    if (signedBalancePredicate(balance)) {
      if (balance.isPositive) {
        free = registry.createType('Balance', balance.asPositive);
      } else if (balance.isNegative) {
        free = registry.createType('Balance', balance.asNegative.mul(new _bn.default(-1)));
      }
    }

    return registry.createType(accountDataType, {
      feeFrozen,
      free,
      miscFrozen,
      reserved
    });
  };

  return transformBalanceStorage(api.query.eqBalances.account, currency, transform, currencyToAsset, api);
};

exports.createCustomAccount = createCustomAccount;
const definitions = {
  derives: _objectSpread({}, _definitions.equilibrium.instances.balances.reduce((all, cur) => _objectSpread(_objectSpread({}, all), {}, {
    [cur]: {
      customAccount: createCustomAccount(cur, (currency, api) => {
        let assetsEnabled = true;

        try {
          api === null || api === void 0 ? void 0 : api.registry.createType('AssetIdInnerType');
        } catch (_) {
          assetsEnabled = false;
        }

        return assetsEnabled ? {
          0: u64FromCurrency(currency)
        } : currency;
      })
    }
  }), {})),
  instances: _definitions.equilibrium.instances,
  types: [{
    minmax: [0, 262],
    types: _definitions.equilibrium.types
  }, {
    minmax: [263, undefined],
    types: _definitions.equilibriumNext.types
  }]
};
var _default = definitions;
exports.default = _default;