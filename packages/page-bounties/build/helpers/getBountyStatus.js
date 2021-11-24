import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
export const getBountyStatus = status => {
  const statusAsString = status.type;
  let result = {
    beneficiary: undefined,
    bountyStatus: statusAsString,
    curator: undefined,
    unlockAt: undefined,
    updateDue: undefined
  };

  if (status.isCuratorProposed) {
    result = _objectSpread(_objectSpread({}, result), {}, {
      bountyStatus: 'CuratorProposed',
      curator: status.asCuratorProposed.curator
    });
  }

  if (status.isActive) {
    result = _objectSpread(_objectSpread({}, result), {}, {
      curator: status.asActive.curator,
      updateDue: status.asActive.updateDue
    });
  }

  if (status.isPendingPayout) {
    result = _objectSpread(_objectSpread({}, result), {}, {
      beneficiary: status.asPendingPayout.beneficiary,
      bountyStatus: 'PendingPayout',
      curator: status.asPendingPayout.curator,
      unlockAt: status.asPendingPayout.unlockAt
    });
  }

  return result;
};