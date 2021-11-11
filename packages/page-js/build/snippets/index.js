// Copyright 2017-2021 @axia-js/app-js authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { constsStakingParameters } from "./consts-examples.js";
import { extrinsicMakeTransfer } from "./extrinsics-examples.js";
import { rpcNetworkAuthoring, rpcNewHead, rpcQueryState, rpcSysthemInfo } from "./rpc-examples.js";
import { storageGetInfo, storageKeys, storageListenToBalanceChange, storageListenToMultipleBalancesChange, storageRetrieveInfoOnQueryKeys, storageSystemEvents } from "./storage-examples.js";
const snippets = [rpcNetworkAuthoring, rpcNewHead, rpcQueryState, rpcSysthemInfo, storageGetInfo, storageSystemEvents, storageListenToBalanceChange, storageListenToMultipleBalancesChange, storageRetrieveInfoOnQueryKeys, storageKeys, constsStakingParameters, extrinsicMakeTransfer];
export default snippets;