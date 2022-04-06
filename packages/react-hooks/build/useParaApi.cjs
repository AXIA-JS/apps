"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useParaApi = useParaApi;

var _react = require("react");

var _useApiUrl = require("./useApiUrl.cjs");

var _useIsMountedRef = require("./useIsMountedRef.cjs");

var _useParaEndpoints = require("./useParaEndpoints.cjs");

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
// use from @axia-js/util
function arrayShuffle(result) {
  let currentIndex = result.length;

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [result[currentIndex], result[randomIndex]] = [result[randomIndex], result[currentIndex]];
  }

  return result;
}

function useParaApi(allyId) {
  const mountedRef = (0, _useIsMountedRef.useIsMountedRef)();
  const endpoints = (0, _useParaEndpoints.useParaEndpoints)(allyId);
  const [state, setState] = (0, _react.useState)(() => ({
    api: null,
    endpoints,
    urls: []
  }));
  const api = (0, _useApiUrl.useApiUrl)(state.urls);
  (0, _react.useEffect)(() => {
    mountedRef.current && setState({
      api: null,
      endpoints,
      urls: arrayShuffle(endpoints.map(_ref => {
        let {
          value
        } = _ref;
        return value;
      }))
    });
  }, [endpoints, mountedRef]);
  (0, _react.useEffect)(() => {
    mountedRef.current && setState(_ref2 => {
      let {
        endpoints,
        urls
      } = _ref2;
      return {
        api,
        endpoints,
        urls
      };
    });
  }, [api, mountedRef]);
  return state;
}