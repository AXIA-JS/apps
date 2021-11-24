// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useFormField } from "./useFormField.js";

function isValid(value) {
  return value && value.length > 0 || false;
}

export function useNonEmptyString(initialValue = '') {
  return useFormField(initialValue, isValid);
}