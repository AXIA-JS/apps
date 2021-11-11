import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Table } from '@axia-js/react-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import { formatNumber } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import Call from "./Call.js";
import Contract from "./Contract.js";
import { getContractForAddress } from "./util.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function filterContracts(api, keyringContracts = []) {
  return keyringContracts.map(address => getContractForAddress(api, address.toString())).filter(contract => !!contract);
}

function ContractsTable({
  contracts: keyringContracts
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const newBlock = useCall(api.derive.chain.subscribeNewBlocks);
  const [{
    contractIndex,
    messageIndex,
    onCallResult
  }, setIndexes] = useState({
    contractIndex: 0,
    messageIndex: 0
  });
  const [isCallOpen, setIsCallOpen] = useState(false);
  const [contractLinks, setContractLinks] = useState({});
  const headerRef = useRef([[t('contracts'), 'start'], [undefined, undefined, 3], [t('status'), 'start'], []]);
  useEffect(() => {
    if (newBlock) {
      const exts = newBlock.block.extrinsics.filter(({
        method
      }) => api.tx.contracts.call.is(method)).map(({
        args
      }) => {
        const contractId = keyringContracts.find(a => args[0].eq(a));

        if (!contractId) {
          return null;
        }

        return {
          blockHash: newBlock.block.header.hash.toHex(),
          blockNumber: formatNumber(newBlock.block.header.number),
          contractId
        };
      }).filter(value => !!value);
      exts.length && setContractLinks(links => {
        exts.forEach(value => {
          links[value.contractId] = [value].concat(links[value.contractId] || []).slice(0, 3);
        });
        return _objectSpread({}, links);
      });
    }
  }, [api, keyringContracts, newBlock]);
  const contracts = useMemo(() => filterContracts(api, keyringContracts), [api, keyringContracts]);

  const _toggleCall = useCallback(() => setIsCallOpen(isCallOpen => !isCallOpen), []);

  const _onCall = useCallback((contractIndex, messageIndex, onCallResult) => {
    setIndexes({
      contractIndex,
      messageIndex,
      onCallResult
    });
    setIsCallOpen(true);
  }, []);

  const _setMessageIndex = useCallback(messageIndex => setIndexes(state => _objectSpread(_objectSpread({}, state), {}, {
    messageIndex
  })), []);

  const contract = contracts[contractIndex] || null;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Table, {
      empty: t('No contracts available'),
      header: headerRef.current,
      children: contracts.map((contract, index) => /*#__PURE__*/_jsx(Contract, {
        contract: contract,
        index: index,
        links: contractLinks[contract.address.toString()],
        onCall: _onCall
      }, contract.address.toString()))
    }), isCallOpen && contract && /*#__PURE__*/_jsx(Call, {
      contract: contract,
      isOpen: isCallOpen,
      messageIndex: messageIndex,
      onCallResult: onCallResult,
      onChangeMessage: _setMessageIndex,
      onClose: _toggleCall
    })]
  });
}

export default /*#__PURE__*/React.memo(ContractsTable);