// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { getTypeDef } from '@axia-js/types';
import { TypeDefInfo } from '@axia-js/types/types';
import { isBn } from '@axia-js/util';
import Account from "./Account.js";
import Amount from "./Amount.js";
import Balance from "./Balance.js";
import Bool from "./Bool.js";
import Bytes from "./Bytes.js";
import Call from "./Call.js";
import Code from "./Code.js";
import DispatchError from "./DispatchError.js";
import DispatchResult from "./DispatchResult.js";
import Enum from "./Enum.js";
import Hash160 from "./Hash160.js";
import Hash256 from "./Hash256.js";
import Hash512 from "./Hash512.js";
import KeyValue from "./KeyValue.js";
import KeyValueArray from "./KeyValueArray.js";
import Moment from "./Moment.js";
import Null from "./Null.js";
import OpaqueCall from "./OpaqueCall.js";
import Option from "./Option.js";
import Raw from "./Raw.js";
import Struct from "./Struct.js";
import Text from "./Text.js";
import Tuple from "./Tuple.js";
import Unknown from "./Unknown.js";
import Vector from "./Vector.js";
import VectorFixed from "./VectorFixed.js";
import Vote from "./Vote.js";
import VoteThreshold from "./VoteThreshold.js";
const SPECIAL_TYPES = ['AccountId', 'AccountIndex', 'Address', 'Balance'];
const componentDef = [{
  c: Account,
  t: ['AccountId', 'Address', 'LookupSource']
}, {
  c: Amount,
  t: ['AccountIndex', 'i8', 'i16', 'i32', 'i64', 'i128', 'u8', 'u16', 'u32', 'u64', 'u128', 'u256']
}, {
  c: Balance,
  t: ['Amount', 'Balance', 'BalanceOf']
}, {
  c: Bool,
  t: ['bool']
}, {
  c: Bytes,
  t: ['Bytes']
}, {
  c: Call,
  t: ['Call', 'Proposal']
}, {
  c: Code,
  t: ['Code']
}, {
  c: DispatchError,
  t: ['DispatchError']
}, {
  c: DispatchResult,
  t: ['DispatchResult']
}, {
  c: Raw,
  t: ['Raw', 'Keys']
}, {
  c: Enum,
  t: ['Enum']
}, {
  c: Hash256,
  t: ['Hash', 'H256']
}, {
  c: Hash160,
  t: ['H160']
}, {
  c: Hash512,
  t: ['H512']
}, {
  c: KeyValue,
  t: ['KeyValue']
}, {
  c: KeyValueArray,
  t: ['Vec<KeyValue>']
}, {
  c: Moment,
  t: ['Moment', 'MomentOf']
}, {
  c: Null,
  t: ['Null']
}, {
  c: OpaqueCall,
  t: ['OpaqueCall']
}, {
  c: Option,
  t: ['Option']
}, {
  c: Text,
  t: ['String', 'Text']
}, {
  c: Struct,
  t: ['Struct']
}, {
  c: Tuple,
  t: ['Tuple']
}, {
  c: Vector,
  t: ['Vec']
}, {
  c: VectorFixed,
  t: ['VecFixed']
}, {
  c: Vote,
  t: ['Vote']
}, {
  c: VoteThreshold,
  t: ['VoteThreshold']
}, {
  c: Unknown,
  t: ['Unknown']
}];
const components = componentDef.reduce((components, {
  c,
  t
}) => {
  t.forEach(type => {
    components[type] = c;
  });
  return components;
}, {});
const warnList = [];

function fromDef({
  displayName,
  info,
  sub,
  type
}) {
  if (displayName && SPECIAL_TYPES.includes(displayName)) {
    return displayName;
  }

  switch (info) {
    case TypeDefInfo.Compact:
      return sub.type;

    case TypeDefInfo.Option:
      return 'Option';

    case TypeDefInfo.Enum:
      return 'Enum';

    case TypeDefInfo.Struct:
      return 'Struct';

    case TypeDefInfo.Tuple:
      if (components[type] === Account) {
        return type;
      }

      return 'Tuple';

    case TypeDefInfo.Vec:
      if (type === 'Vec<u8>') {
        return 'Bytes';
      }

      return ['Vec<KeyValue>'].includes(type) ? 'Vec<KeyValue>' : 'Vec';

    case TypeDefInfo.VecFixed:
      if (sub.type === 'u8') {
        return type;
      }

      return 'VecFixed';

    default:
      return type;
  }
}

export default function findComponent(registry, def, overrides = {}) {
  const findOne = type => overrides[type] || components[type];

  const type = fromDef(def);
  let Component = findOne(type);

  if (!Component) {
    let error = null;

    try {
      const instance = registry.createType(type);
      const raw = getTypeDef(instance.toRawType());
      Component = findOne(raw.type);

      if (Component) {
        return Component;
      } else if (isBn(instance)) {
        return Amount;
      } else if ([TypeDefInfo.Enum, TypeDefInfo.Struct, TypeDefInfo.Tuple].includes(raw.info)) {
        return findComponent(registry, raw, overrides);
      } else if (raw.info === TypeDefInfo.VecFixed && raw.sub.type !== 'u8') {
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

  return Component || Unknown;
}