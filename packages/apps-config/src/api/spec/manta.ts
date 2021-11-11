// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { OverrideBundleDefinition } from '@axia-js/types/types';

// structs need to be in order
/* eslint-disable sort-keys */

const definitions: OverrideBundleDefinition = {
  types: [
    {
      // on all versions
      minmax: [0, undefined],
      types:
      {
        CurrencyId: {
          _enum: [
            'MA'
          ]
        },
        CurrencyIdOf: 'CurrencyId',
        Amount: 'i128',
        AmountOf: 'Amount',
        AccountInfo: 'AccountInfoWithDualRefCount'
      }
    }
  ]
};

export default definitions;
