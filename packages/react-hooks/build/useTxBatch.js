// Copyright 2017-2020 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useEffect, useMemo, useState } from 'react';
import { isFunction } from '@axia-js/util';
import { useAccounts } from "./useAccounts.js";
import { useApi } from "./useApi.js";

function createBatches(api, txs, batchSize, isBatchAll = false) {
  var _api$tx$utility;

  if (batchSize === 1 || !isFunction((_api$tx$utility = api.tx.utility) === null || _api$tx$utility === void 0 ? void 0 : _api$tx$utility.batch)) {
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
  }, [[]]).map(batch => batch.length === 1 ? batch[0] : isBatchAll && isFunction(api.tx.utility.batchAll) ? api.tx.utility.batchAll(batch) : api.tx.utility.batch(batch));
}

export function useTxBatch(txs, options) {
  const {
    api
  } = useApi();
  const {
    allAccounts
  } = useAccounts();
  const [batchSize, setBatchSize] = useState(Math.floor((options === null || options === void 0 ? void 0 : options.batchSize) || 64));
  useEffect(() => {
    var _api$rpc$payment;

    txs && txs.length && allAccounts[0] && isFunction((_api$rpc$payment = api.rpc.payment) === null || _api$rpc$payment === void 0 ? void 0 : _api$rpc$payment.queryInfo) && txs[0].paymentInfo(allAccounts[0]).then(info => setBatchSize(prev => info.weight.isZero() ? prev : Math.floor((api.consts.system.blockWeights ? api.consts.system.blockWeights.maxBlock : api.consts.system.maximumBlockWeight).muln(64) // 65% of the block weight on a single extrinsic (64 for safety)
    .div(info.weight).toNumber() / 100))).catch(console.error);
  }, [allAccounts, api, options, txs]);
  return useMemo(() => txs && txs.length ? createBatches(api, txs, batchSize, options === null || options === void 0 ? void 0 : options.isBatchAll) : null, [api, batchSize, options, txs]);
}