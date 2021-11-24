// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useEffect, useState } from 'react';
import { BN_ZERO, isFunction } from '@axia-js/util';
import { useApi } from "./useApi.js";
import { useIsMountedRef } from "./useIsMountedRef.js"; // a random address that we are using for our queries

const ZERO_ACCOUNT = '5CAUdnwecHGxxyr5vABevAfZ34Fi4AaraDRMwfDQXQ52PXqg';
const EMPTY_STATE = [BN_ZERO, 0]; // for a given call, calculate the weight

export function useWeight(call) {
  const {
    api
  } = useApi();
  const mountedRef = useIsMountedRef();
  const [state, setState] = useState(EMPTY_STATE);
  useEffect(() => {
    var _api$rpc$payment;

    if (call && isFunction((_api$rpc$payment = api.rpc.payment) === null || _api$rpc$payment === void 0 ? void 0 : _api$rpc$payment.queryInfo)) {
      api.tx(call).paymentInfo(ZERO_ACCOUNT).then(({
        weight
      }) => mountedRef.current && setState([weight, call.encodedLength])).catch(console.error);
    } else {
      setState(EMPTY_STATE);
    }
  }, [api, call, mountedRef]);
  return state;
}