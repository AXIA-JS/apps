"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findComponent;

var _types = require("@axia-js/types");

var _types2 = require("@axia-js/types/types");

var _util = require("@axia-js/util");

var _Account = _interopRequireDefault(require("./Account.cjs"));

var _Amount = _interopRequireDefault(require("./Amount.cjs"));

var _Balance = _interopRequireDefault(require("./Balance.cjs"));

var _Bool = _interopRequireDefault(require("./Bool.cjs"));

var _Bytes = _interopRequireDefault(require("./Bytes.cjs"));

var _Call = _interopRequireDefault(require("./Call.cjs"));

var _Code = _interopRequireDefault(require("./Code.cjs"));

var _DispatchError = _interopRequireDefault(require("./DispatchError.cjs"));

var _DispatchResult = _interopRequireDefault(require("./DispatchResult.cjs"));

var _Enum = _interopRequireDefault(require("./Enum.cjs"));

var _Hash = _interopRequireDefault(require("./Hash160.cjs"));

var _Hash2 = _interopRequireDefault(require("./Hash256.cjs"));

var _Hash3 = _interopRequireDefault(require("./Hash512.cjs"));

var _KeyValue = _interopRequireDefault(require("./KeyValue.cjs"));

var _KeyValueArray = _interopRequireDefault(require("./KeyValueArray.cjs"));

var _Moment = _interopRequireDefault(require("./Moment.cjs"));

var _Null = _interopRequireDefault(require("./Null.cjs"));

var _OpaqueCall = _interopRequireDefault(require("./OpaqueCall.cjs"));

var _Option = _interopRequireDefault(require("./Option.cjs"));

var _Raw = _interopRequireDefault(require("./Raw.cjs"));

var _Struct = _interopRequireDefault(require("./Struct.cjs"));

var _Text = _interopRequireDefault(require("./Text.cjs"));

var _Tuple = _interopRequireDefault(require("./Tuple.cjs"));

var _Unknown = _interopRequireDefault(require("./Unknown.cjs"));

var _Vector = _interopRequireDefault(require("./Vector.cjs"));

var _VectorFixed = _interopRequireDefault(require("./VectorFixed.cjs"));

var _Vote = _interopRequireDefault(require("./Vote.cjs"));

var _VoteThreshold = _interopRequireDefault(require("./VoteThreshold.cjs"));

// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
const SPECIAL_TYPES = ['AccountId', 'AccountIndex', 'Address', 'Balance'];
const componentDef = [{
  c: _Account.default,
  t: ['AccountId', 'Address', 'LookupSource']
}, {
  c: _Amount.default,
  t: ['AccountIndex', 'i8', 'i16', 'i32', 'i64', 'i128', 'u8', 'u16', 'u32', 'u64', 'u128', 'u256']
}, {
  c: _Balance.default,
  t: ['Amount', 'Balance', 'BalanceOf']
}, {
  c: _Bool.default,
  t: ['bool']
}, {
  c: _Bytes.default,
  t: ['Bytes']
}, {
  c: _Call.default,
  t: ['Call', 'Proposal']
}, {
  c: _Code.default,
  t: ['Code']
}, {
  c: _DispatchError.default,
  t: ['DispatchError']
}, {
  c: _DispatchResult.default,
  t: ['DispatchResult']
}, {
  c: _Raw.default,
  t: ['Raw', 'Keys']
}, {
  c: _Enum.default,
  t: ['Enum']
}, {
  c: _Hash2.default,
  t: ['Hash', 'H256']
}, {
  c: _Hash.default,
  t: ['H160']
}, {
  c: _Hash3.default,
  t: ['H512']
}, {
  c: _KeyValue.default,
  t: ['KeyValue']
}, {
  c: _KeyValueArray.default,
  t: ['Vec<KeyValue>']
}, {
  c: _Moment.default,
  t: ['Moment', 'MomentOf']
}, {
  c: _Null.default,
  t: ['Null']
}, {
  c: _OpaqueCall.default,
  t: ['OpaqueCall']
}, {
  c: _Option.default,
  t: ['Option']
}, {
  c: _Text.default,
  t: ['String', 'Text']
}, {
  c: _Struct.default,
  t: ['Struct']
}, {
  c: _Tuple.default,
  t: ['Tuple']
}, {
  c: _Vector.default,
  t: ['Vec']
}, {
  c: _VectorFixed.default,
  t: ['VecFixed']
}, {
  c: _Vote.default,
  t: ['Vote']
}, {
  c: _VoteThreshold.default,
  t: ['VoteThreshold']
}, {
  c: _Unknown.default,
  t: ['Unknown']
}];
const components = componentDef.reduce((components, _ref) => {
  let {
    c,
    t
  } = _ref;
  t.forEach(type => {
    components[type] = c;
  });
  return components;
}, {});
const warnList = [];

function fromDef(_ref2) {
  let {
    displayName,
    info,
    sub,
    type
  } = _ref2;

  if (displayName && SPECIAL_TYPES.includes(displayName)) {
    return displayName;
  }

  switch (info) {
    case _types2.TypeDefInfo.Compact:
      return sub.type;

    case _types2.TypeDefInfo.Option:
      return 'Option';

    case _types2.TypeDefInfo.Enum:
      return 'Enum';

    case _types2.TypeDefInfo.Struct:
      return 'Struct';

    case _types2.TypeDefInfo.Tuple:
      if (components[type] === _Account.default) {
        return type;
      }

      return 'Tuple';

    case _types2.TypeDefInfo.Vec:
      if (type === 'Vec<u8>') {
        return 'Bytes';
      }

      return ['Vec<KeyValue>'].includes(type) ? 'Vec<KeyValue>' : 'Vec';

    case _types2.TypeDefInfo.VecFixed:
      if (sub.type === 'u8') {
        return type;
      }

      return 'VecFixed';

    default:
      return type;
  }
}

function findComponent(registry, def) {
  let overrides = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  const findOne = type => overrides[type] || components[type];

  const type = fromDef(def);
  let Component = findOne(type);

  if (!Component) {
    let error = null;

    try {
      const instance = registry.createType(type);
      const raw = (0, _types.getTypeDef)(instance.toRawType());
      Component = findOne(raw.type);

      if (Component) {
        return Component;
      } else if ((0, _util.isBn)(instance)) {
        return _Amount.default;
      } else if ([_types2.TypeDefInfo.Enum, _types2.TypeDefInfo.Struct, _types2.TypeDefInfo.Tuple].includes(raw.info)) {
        return findComponent(registry, raw, overrides);
      } else if (raw.info === _types2.TypeDefInfo.VecFixed && raw.sub.type !== 'u8') {
        return findComponent(registry, raw, overrides);
      }
    } catch (e) {
      error = e.message;
    } // we only want to want once, not spam


    if (!warnList.includes(type)) {
      warnList.push(type);
      error && console.error(`params: findComponent: ${error}`);
      console.info(`params: findComponent: No pre-defined component for type ${type} from ${JSON.stringify(def)}, using defaults`);
    }
  }

  return Component || _Unknown.default;
}