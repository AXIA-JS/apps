"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useApiUrl = useApiUrl;

var _react = require("react");

var _api = require("@axia-js/api");

var _appsConfig = require("@axia-js/apps-config");

var _util = require("@axia-js/util");

var _useIsMountedRef = require("./useIsMountedRef.cjs");

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
function disconnect(api) {
  api && api.disconnect().catch(console.error);
}

function useApiUrl(url) {
  const apiRef = (0, _react.useRef)(null);
  const mountedRef = (0, _useIsMountedRef.useIsMountedRef)();
  const [state, setState] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    return () => {
      disconnect(apiRef.current);
      apiRef.current = null;
    };
  }, []);

  const _setApi = (0, _react.useCallback)(api => {
    disconnect(apiRef.current);

    if (mountedRef.current) {
      apiRef.current = api;
      setState(api);
    }
  }, [mountedRef]);

  (0, _react.useEffect)(() => {
    _setApi(null);

    url && ((0, _util.isString)(url) || url.length) && _api.ApiPromise.create({
      provider: new _api.WsProvider(url),
      typesBundle: _appsConfig.typesBundle,
      typesChain: _appsConfig.typesChain
    }).then(_setApi).catch(console.error);
  }, [_setApi, url]);
  return state;
}