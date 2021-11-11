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
  transform: ([activeTotal, queueTotals]) => ({
    activeIndex: activeTotal.index.isZero() ? null : activeTotal.index.sub(_util.BN_ONE),
    activeTotal,
    queueTotals: queueTotals.map(([numItems, balance], index) => ({
      balance,
      index: index + 1,
      numItems
    })).filter(({
      balance
    }) => !balance.isZero())
  })
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