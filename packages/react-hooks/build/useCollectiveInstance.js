// Copyright 2017-2021 @axia-js/app-tech-comm authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useMemo } from 'react';
import { useApi } from '@axia-js/react-hooks';
import { isFunction } from '@axia-js/util';
export function useCollectiveInstance(instanceType, instanceIndex) {
  const {
    api
  } = useApi();
  return useMemo(() => {
    const index = instanceIndex || 0;
    const instances = api.registry.getModuleInstances(api.runtimeVersion.specName.toString(), instanceType);
    const instance = instances && index < instances.length ? instances[index] : instanceType;
    return api.tx[instance] && isFunction(api.tx[instance].close) ? instance : null;
  }, [api, instanceIndex, instanceType]);
}