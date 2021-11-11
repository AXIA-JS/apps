// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useMemo } from 'react';
import { BN_ZERO, bnToBn } from '@axia-js/util';
import { useFormField } from "./useFormField.js";

function isValid(value) {
  return !value.isZero();
}

export function useNonZeroBn(initialValue = BN_ZERO) {
  const value = useMemo(() => bnToBn(initialValue), [initialValue]);
  return useFormField(value, isValid);
}