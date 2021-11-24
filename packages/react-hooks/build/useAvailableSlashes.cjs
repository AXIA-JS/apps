"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAvailableSlashes = useAvailableSlashes;

var _bn = _interopRequireDefault(require("bn.js"));

var _react = require("react");

var _util = require("@axia-js/util");

var _useApi = require("./useApi.cjs");

var _useCall = require("./useCall.cjs");

var _useIsMountedRef = require("./useIsMountedRef.cjs");

// Copyright 2017-2021 @axia-js/app-council authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useAvailableSlashes() {
  var _api$derive$session, _api$query$staking;

  const {
    api
  } = (0, _useApi.useApi)();
  const indexes = (0, _useCall.useCall)((_api$derive$session = api.derive.session) === null || _api$derive$session === void 0 ? void 0 : _api$derive$session.indexes);
  const earliestSlash = (0, _useCall.useCall)((_api$query$staking = api.query.staking) === null || _api$query$staking === void 0 ? void 0 : _api$query$staking.earliestUnappliedSlash);
  const mountedRef = (0, _useIsMountedRef.useIsMountedRef)();
  const [slashes, setSlashes] = (0, _react.useState)([]);
  (0, _react.useEffect)(() => {
    let unsub;

    if (mountedRef.current && indexes && earliestSlash && earliestSlash.isSome) {
      const from = earliestSlash.unwrap();
      const range = [];
      let start = new _bn.default(from); // any <= activeEra (we include activeEra since slashes are immediately reflected)

      while (start.lte(indexes.activeEra)) {
        range.push(start);
        start = start.add(_util.BN_ONE);
      }

      if (range.length) {
        (async () => {
          unsub = await api.query.staking.unappliedSlashes.multi(range, values => {
            mountedRef.current && setSlashes(values.map((value, index) => [from.addn(index), value]).filter(_ref => {
              let [, slashes] = _ref;
              return slashes.length;
            }));
          });
        })().catch(console.error);
      }
    }

    return () => {
      unsub && unsub();
    };
  }, [api, earliestSlash, indexes, mountedRef]);
  return slashes;
}