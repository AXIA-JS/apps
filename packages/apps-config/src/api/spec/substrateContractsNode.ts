// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { OverrideBundleDefinition } from '@axia-js/types/types';

// structs need to be in order
/* eslint-disable sort-keys */

const definitions: OverrideBundleDefinition = {
  types: [
    {
      // updated to Substrate master
      minmax: [0, undefined],
      types: {
        Keys: 'SessionKeys2'
      }
    }
  ]
};

export default definitions;
