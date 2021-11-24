import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _classPrivateFieldLooseBase from "@babel/runtime/helpers/esm/classPrivateFieldLooseBase";
import _classPrivateFieldLooseKey from "@babel/runtime/helpers/esm/classPrivateFieldLooseKey";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/app-contracts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import EventEmitter from 'eventemitter3';
import store from 'store';
import { Abi } from '@axia-js/api-contract';
import { api } from '@axia-js/react-api';
import { isString } from '@axia-js/util';
const KEY_CODE = 'code:';

var _allCode = /*#__PURE__*/_classPrivateFieldLooseKey("allCode");

class Store extends EventEmitter {
  constructor(...args) {
    super(...args);
    Object.defineProperty(this, _allCode, {
      writable: true,
      value: {}
    });
  }

  get hasCode() {
    return Object.keys(_classPrivateFieldLooseBase(this, _allCode)[_allCode]).length !== 0;
  }

  getAllCode() {
    return Object.values(_classPrivateFieldLooseBase(this, _allCode)[_allCode]);
  }

  getCode(codeHash) {
    return _classPrivateFieldLooseBase(this, _allCode)[_allCode][codeHash];
  }

  saveCode(_codeHash, partial) {
    const codeHash = (isString(_codeHash) ? api.registry.createType('Hash', _codeHash) : _codeHash).toHex();
    const existing = this.getCode(codeHash);

    const json = _objectSpread(_objectSpread(_objectSpread({}, existing ? existing.json : {}), partial), {}, {
      codeHash,
      genesisHash: api.genesisHash.toHex(),
      whenCreated: (existing === null || existing === void 0 ? void 0 : existing.json.whenCreated) || Date.now()
    });

    const key = `${KEY_CODE}${json.codeHash}`;
    store.set(key, json);
    this.addCode(key, json);
  }

  forgetCode(codeHash) {
    this.removeCode(`${KEY_CODE}${codeHash}`, codeHash);
  }

  loadAll(onLoaded) {
    try {
      const genesisHash = api.genesisHash.toHex();
      store.each((json, key) => {
        if (json && json.genesisHash === genesisHash && key.startsWith(KEY_CODE)) {
          this.addCode(key, json);
        }
      });
      onLoaded && onLoaded();
    } catch (error) {
      console.error('Unable to load code', error);
    }
  }

  addCode(key, json) {
    try {
      _classPrivateFieldLooseBase(this, _allCode)[_allCode][json.codeHash] = {
        contractAbi: json.abi ? new Abi(json.abi, api.registry.getChainProperties()) : undefined,
        json
      };
      this.emit('new-code');
    } catch (error) {
      console.error(error);
      this.removeCode(key, json.codeHash);
    }
  }

  removeCode(key, codeHash) {
    try {
      delete _classPrivateFieldLooseBase(this, _allCode)[_allCode][codeHash];
      store.remove(key);
      this.emit('removed-code');
    } catch (error) {
      console.error(error);
    }
  }

}

export default new Store();