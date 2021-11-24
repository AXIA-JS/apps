import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useRef, useState } from 'react';
import jsonrpc from '@axia-js/types/interfaces/jsonrpc';
import { getContractAbi } from "../util/index.js";
import { STATUS_COMPLETE } from "./constants.js";
import { QueueProvider } from "./Context.js";
import { jsx as _jsx } from "react/jsx-runtime";
let nextId = 0;
const EVENT_MESSAGE = 'extrinsic event';
const REMOVE_TIMEOUT = 7500;
const SUBMIT_RPC = jsonrpc.author.submitAndWatchExtrinsic;

function mergeStatus(status) {
  let others = null;
  const initial = status.reduce((result, status) => {
    const prev = result.find(({
      status: prev
    }) => prev.action === status.action && prev.status === status.status);

    if (prev) {
      prev.count++;
    } else {
      result.push({
        count: 1,
        status
      });
    }

    return result;
  }, []).map(({
    count,
    status
  }) => count === 1 ? status : _objectSpread(_objectSpread({}, status), {}, {
    action: `${status.action} (x${count})`
  })).filter(status => {
    if (status.message !== EVENT_MESSAGE) {
      return true;
    }

    if (others) {
      if (status.action.startsWith('system.ExtrinsicSuccess')) {
        others.action.unshift(status.action);
      } else {
        others.action.push(status.action);
      }
    } else {
      others = _objectSpread(_objectSpread({}, status), {}, {
        action: [status.action]
      });
    }

    return false;
  });
  return others ? initial.concat(others) : initial;
}

function extractEvents(result) {
  return mergeStatus((result && result.events || [] // filter events handled globally, or those we are not interested in, these are
  // handled by the global overview, so don't add them here
  ).filter(record => !!record.event && record.event.section !== 'democracy').map(({
    event: {
      data,
      method,
      section
    }
  }) => {
    if (section === 'system' && method === 'ExtrinsicFailed') {
      const [dispatchError] = data;
      let message = dispatchError.type;

      if (dispatchError.isModule) {
        try {
          const mod = dispatchError.asModule;
          const error = dispatchError.registry.findMetaError(mod);
          message = `${error.section}.${error.name}`;
        } catch (error) {// swallow
        }
      } else if (dispatchError.isToken) {
        message = `${dispatchError.type}.${dispatchError.asToken.type}`;
      }

      return {
        action: `${section}.${method}`,
        message,
        status: 'error'
      };
    } else if (section === 'contracts') {
      if (method === 'ContractExecution' && data.length === 2) {
        // see if we have info for this contract
        const [accountId, encoded] = data;

        try {
          const abi = getContractAbi(accountId.toString());

          if (abi) {
            const decoded = abi.decodeEvent(encoded);
            return {
              action: decoded.event.identifier,
              message: 'contract event',
              status: 'event'
            };
          }
        } catch (error) {
          // ABI mismatch?
          console.error(error);
        }
      } else if (method === 'Evicted') {
        return {
          action: `${section}.${method}`,
          message: 'contract evicted',
          status: 'error'
        };
      }
    }

    return {
      action: `${section}.${method}`,
      message: EVENT_MESSAGE,
      status: 'event'
    };
  }));
}

function Queue({
  children
}) {
  const [stqueue, _setStQueue] = useState([]);
  const [txqueue, _setTxQueue] = useState([]);
  const stRef = useRef(stqueue);
  const txRef = useRef(txqueue);
  const setStQueue = useCallback(st => {
    stRef.current = st;

    _setStQueue(st);
  }, []);
  const setTxQueue = useCallback(tx => {
    txRef.current = tx;

    _setTxQueue(tx);
  }, []);
  const addToTxQueue = useCallback(value => {
    const id = ++nextId;

    const removeItem = () => setTxQueue([...txRef.current.map(item => item.id === id ? _objectSpread(_objectSpread({}, item), {}, {
      status: 'completed'
    }) : item)]);

    setTxQueue([...txRef.current, _objectSpread(_objectSpread({}, value), {}, {
      id,
      removeItem,
      rpc: value.rpc || SUBMIT_RPC,
      status: 'queued'
    })]);
  }, [setTxQueue]);
  const queueAction = useCallback(_status => {
    const status = Array.isArray(_status) ? _status : [_status];
    status.length && setStQueue([...stRef.current, ...status.map(item => {
      const id = ++nextId;

      const removeItem = () => setStQueue([...stRef.current.filter(item => item.id !== id)]);

      setTimeout(removeItem, REMOVE_TIMEOUT);
      return _objectSpread(_objectSpread({}, item), {}, {
        id,
        isCompleted: false,
        removeItem
      });
    })]);
  }, [setStQueue]);
  const queueExtrinsic = useCallback(value => addToTxQueue(_objectSpread({}, value)), [addToTxQueue]);
  const queuePayload = useCallback((registry, payload, signerCb) => {
    addToTxQueue({
      accountId: payload.address,
      // this is not great, but the Extrinsic doesn't need a submittable
      extrinsic: registry.createType('Extrinsic', {
        method: registry.createType('Call', payload.method)
      }, {
        version: payload.version
      }),
      payload,
      signerCb
    });
  }, [addToTxQueue]);
  const queueRpc = useCallback(value => addToTxQueue(_objectSpread({}, value)), [addToTxQueue]);
  const queueSetTxStatus = useCallback((id, status, result, error) => {
    setTxQueue([...txRef.current.map(item => item.id === id ? _objectSpread(_objectSpread({}, item), {}, {
      error: error === undefined ? item.error : error,
      result: result === undefined ? item.result : result,
      status: item.status === 'completed' ? item.status : status
    }) : item)]);
    queueAction(extractEvents(result));

    if (STATUS_COMPLETE.includes(status)) {
      setTimeout(() => {
        const item = txRef.current.find(item => item.id === id);
        item && item.removeItem();
      }, REMOVE_TIMEOUT);
    }
  }, [queueAction, setTxQueue]);
  return /*#__PURE__*/_jsx(QueueProvider, {
    value: {
      queueAction,
      queueExtrinsic,
      queuePayload,
      queueRpc,
      queueSetTxStatus,
      stqueue,
      txqueue
    },
    children: children
  });
}

export default /*#__PURE__*/React.memo(Queue);