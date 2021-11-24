"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useAXIAPreclaims;

var _react = require("react");

var _reactHooks = require("@axia-js/react-hooks");

// Copyright 2017-2021 @axia-js/app-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useAXIAPreclaims() {
  var _api$query$claims, _api$query$claims$pre;

  const {
    allAccounts
  } = (0, _reactHooks.useAccounts)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const mountedRef = (0, _reactHooks.useIsMountedRef)();
  const [needsAttest, setNeedsAttest] = (0, _react.useState)([]); // find all own preclaims

  const preclaims = (0, _reactHooks.useCall)((_api$query$claims = api.query.claims) === null || _api$query$claims === void 0 ? void 0 : (_api$query$claims$pre = _api$query$claims.preclaims) === null || _api$query$claims$pre === void 0 ? void 0 : _api$query$claims$pre.multi, [allAccounts], {
    transform: preclaims => preclaims.map((opt, index) => [allAccounts[index], opt]).filter(_ref => {
      let [, opt] = _ref;
      return opt.isSome;
    }).map(_ref2 => {
      let [address, opt] = _ref2;
      return [address, opt.unwrap()];
    })
  }); // Filter the accounts that need attest. They are accounts that
  // - already preclaimed
  // - has a balance, either vested or normal

  (0, _react.useEffect)(() => {
    preclaims && api.queryMulti(preclaims.reduce((result, _ref3) => {
      let [, ethAddr] = _ref3;
      return result.concat([[api.query.claims.claims, ethAddr], [api.query.claims.vesting, ethAddr]]);
    }, []), opts => {
      // filter the cases where either claims or vesting has a value
      mountedRef.current && setNeedsAttest(preclaims.filter((_, index) => opts[index * 2].isSome || opts[index * 2 + 1].isSome).map(_ref4 => {
        let [address] = _ref4;
        return address;
      }));
    });
  }, [api, allAccounts, mountedRef, preclaims]);
  return needsAttest;
}