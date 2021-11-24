"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCollectiveInstance = useCollectiveInstance;

var _react = require("react");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

// Copyright 2017-2021 @axia-js/app-tech-comm authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useCollectiveInstance(instanceType, instanceIndex) {
  const {
    api
  } = (0, _reactHooks.useApi)();
  return (0, _react.useMemo)(() => {
    const index = instanceIndex || 0;
    const instances = api.registry.getModuleInstances(api.runtimeVersion.specName.toString(), instanceType);
    const instance = instances && index < instances.length ? instances[index] : instanceType;
    return api.tx[instance] && (0, _util.isFunction)(api.tx[instance].close) ? instance : null;
  }, [api, instanceIndex, instanceType]);
}