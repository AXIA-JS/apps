"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCodes = useCodes;

var _react = require("react");

var _reactHooks = require("@axia-js/react-hooks");

var _store = _interopRequireDefault(require("./store.cjs"));

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
const DEFAULT_STATE = {
  allCodes: [],
  codeTrigger: Date.now()
};

function useCodes() {
  const mountedRef = (0, _reactHooks.useIsMountedRef)();
  const [state, setState] = (0, _react.useState)(DEFAULT_STATE);
  (0, _react.useEffect)(() => {
    const triggerUpdate = () => {
      mountedRef.current && setState({
        allCodes: _store.default.getAllCode(),
        codeTrigger: Date.now()
      });
    };

    _store.default.on('new-code', triggerUpdate);

    _store.default.on('removed-code', triggerUpdate);

    _store.default.loadAll(triggerUpdate);
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  []);
  return state;
}