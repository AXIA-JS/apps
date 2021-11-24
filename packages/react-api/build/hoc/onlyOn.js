// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { getEnvironment } from "../util/index.js";

const onlyOn = environment => component => {
  if (getEnvironment() === environment) {
    return component;
  }

  return () => null;
};

export const onlyOnWeb = onlyOn('web');
export const onlyOnApp = onlyOn('app');