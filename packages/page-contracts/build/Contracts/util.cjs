"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findCallMethod = findCallMethod;
exports.getContractMethodFn = getContractMethodFn;
exports.getContractForAddress = getContractForAddress;
exports.getCallMessageOptions = getCallMessageOptions;

var _react = _interopRequireDefault(require("react"));

var _apiContract = require("@axia-js/api-contract");

var _util = require("@axia-js/react-components/util");

var _MessageSignature = _interopRequireDefault(require("../shared/MessageSignature.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-contracts authors & contributors
// SPDX-License-Identifier: Apache-2.0
function findCallMethod(callContract, callMethodIndex = 0) {
  const message = callContract && callContract.abi.messages[callMethodIndex];
  return message || null;
}

function getContractMethodFn(callContract, callMethodIndex) {
  const fn = callContract && callContract.abi && callMethodIndex !== null && callContract.abi.messages[callMethodIndex];
  return fn || null;
}

function getContractForAddress(api, address) {
  if (!address) {
    return null;
  } else {
    const abi = (0, _util.getContractAbi)(address);
    return abi ? new _apiContract.ContractPromise(api, abi, address) : null;
  }
}

function getCallMessageOptions(callContract) {
  return callContract ? callContract.abi.messages.map((m, index) => ({
    key: m.identifier,
    text: /*#__PURE__*/(0, _jsxRuntime.jsx)(_MessageSignature.default, {
      message: m
    }),
    value: index
  })) : [];
}