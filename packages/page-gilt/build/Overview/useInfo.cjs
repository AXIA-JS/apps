"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useInfo;

var _react = require("react");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

// Copyright 2017-2021 @axia-js/app-gilt authors & contributors
// SPDX-License-Identifier: Apache-2.0
const optGiltInfo = {
  defaultValue: {},
  transform: _ref => {
    let [activeTotal, queueTotals] = _ref;
    return {
      activeIndex: activeTotal.index.isZero() ? null : activeTotal.index.sub(_util.BN_ONE),
      activeTotal,
      queueTotals: queueTotals.map((_ref2, index) => {
        let [numItems, balance] = _ref2;
        return {
          balance,
          index: index + 1,
          numItems
        };
      }).filter(_ref3 => {
        let {
          balance
        } = _ref3;
        return !balance.isZero();
      })
    };
  }
};

function useInfo() {
  const {
    api
  } = (0, _reactHooks.useApi)();
  const info = (0, _reactHooks.useCallMulti)([api.query.gilt.activeTotal, api.query.gilt.queueTotals], optGiltInfo); // useEffect((): void => {
  //   info.activeIndex &&
  //     api.query.gilt.active
  //       .entries()
  //       .then((value) => console.log(JSON.stringify(value)))
  //       .catch(console.error);
  // }, [api, info?.activeIndex]);

  return (0, _react.useMemo)(() => ({
    info
  }), [info]);
}