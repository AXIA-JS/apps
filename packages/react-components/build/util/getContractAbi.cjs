"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getContractAbi = getContractAbi;

var _apiContract = require("@axia-js/api-contract");

var _reactApi = require("@axia-js/react-api");

var _getAddressMeta = require("./getAddressMeta.cjs");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function getContractAbi(address) {
  if (!address) {
    return null;
  }

  let abi;
  const meta = (0, _getAddressMeta.getAddressMeta)(address, 'contract');

  try {
    const data = meta.contract && JSON.parse(meta.contract.abi);
    abi = new _apiContract.Abi(data, _reactApi.api.registry.getChainProperties());
  } catch (error) {
    console.error(error);
  }

  return abi || null;
}