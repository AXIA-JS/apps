"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _definitions = require("@equilab/definitions");

var _equilibrium = require("./equilibrium.cjs");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const definitions = {
  derives: _objectSpread({}, _definitions.genshiro.instances.balances.reduce((all, cur) => _objectSpread(_objectSpread({}, all), {}, {
    [cur]: {
      customAccount: (0, _equilibrium.createCustomAccount)(cur, currency => ({
        0: (0, _equilibrium.u64FromCurrency)(currency)
      }), 'CompatAccountData')
    }
  }), {})),
  instances: _definitions.genshiro.instances,
  types: [{
    // on all versions
    minmax: [0, undefined],
    types: _definitions.genshiro.types
  }]
};
var _default = definitions;
exports.default = _default;