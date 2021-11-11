"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTxBatch = useTxBatch;

var _react = require("react");

var _util = require("@axia-js/util");

var _useAccounts = require("./useAccounts.cjs");

var _useApi = require("./useApi.cjs");

// Copyright 2017-2020 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
function createBatches(api, txs, batchSize, isBatchAll = false) {
  var _api$tx$utility;

  if (batchSize === 1 || !(0, _util.isFunction)((_api$tx$utility = api.tx.utility) === null || _api$tx$utility === void 0 ? void 0 : _api$tx$utility.batch)) {
    return txs;
  }

  return txs.reduce((batches, tx) => {
    const batch = batches[batches.length - 1];

    if (batch.length >= batchSize) {
      batches.push([tx]);
    } else {
      batch.push(tx);
    }

    return batches;
  }, [[]]).map(batch => batch.length === 1 ? batch[0] : isBatchAll && (0, _util.isFunction)(api.tx.utility.batchAll) ? api.tx.utility.batchAll(batch) : api.tx.utility.batch(batch));
}

function useTxBatch(txs, options) {
  const {
    api
  } = (0, _useApi.useApi)();
  const {
    allAccounts
  } = (0, _useAccounts.useAccounts)();
  const [batchSize, setBatchSize] = (0, _react.useState)(Math.floor((options === null || options === void 0 ? void 0 : options.batchSize) || 64));
  (0, _react.useEffect)(() => {
    var _api$rpc$payment;

    txs && txs.length && allAccounts[0] && (0, _util.isFunction)((_api$rpc$payment = api.rpc.payment) === null || _api$rpc$payment === void 0 ? void 0 : _api$rpc$payment.queryInfo) && txs[0].paymentInfo(allAccounts[0]).then(info => setBatchSize(prev => info.weight.isZero() ? prev : Math.floor((api.consts.system.blockWeights ? api.consts.system.blockWeights.maxBlock : api.consts.system.maximumBlockWeight).muln(64) // 65% of the block weight on a single extrinsic (64 for safety)
    .div(info.weight).toNumber() / 100))).catch(console.error);
  }, [allAccounts, api, options, txs]);
  return (0, _react.useMemo)(() => txs && txs.length ? createBatches(api, txs, batchSize, options === null || options === void 0 ? void 0 : options.isBatchAll) : null, [api, batchSize, options, txs]);
}