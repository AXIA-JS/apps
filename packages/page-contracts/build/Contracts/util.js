// Copyright 2017-2021 @axia-js/app-contracts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { ContractPromise as Contract } from '@axia-js/api-contract';
import { getContractAbi } from '@axia-js/react-components/util';
import MessageSignature from "../shared/MessageSignature.js";
import { jsx as _jsx } from "react/jsx-runtime";
export function findCallMethod(callContract, callMethodIndex = 0) {
  const message = callContract && callContract.abi.messages[callMethodIndex];
  return message || null;
}
export function getContractMethodFn(callContract, callMethodIndex) {
  const fn = callContract && callContract.abi && callMethodIndex !== null && callContract.abi.messages[callMethodIndex];
  return fn || null;
}
export function getContractForAddress(api, address) {
  if (!address) {
    return null;
  } else {
    const abi = getContractAbi(address);
    return abi ? new Contract(api, abi, address) : null;
  }
}
export function getCallMessageOptions(callContract) {
  return callContract ? callContract.abi.messages.map((m, index) => ({
    key: m.identifier,
    text: /*#__PURE__*/_jsx(MessageSignature, {
      message: m
    }),
    value: index
  })) : [];
}