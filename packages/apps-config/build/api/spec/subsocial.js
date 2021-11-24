// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0
import * as subsocialDefinitions from '@subsocial/types/substrate/interfaces/definitions';
import { typesFromDefs } from "../util.js"; // structs need to be in order

/* eslint-disable sort-keys */

const definitions = {
  types: [{
    // on all versions
    minmax: [0, undefined],
    types: typesFromDefs(subsocialDefinitions)
  }]
};
export default definitions;