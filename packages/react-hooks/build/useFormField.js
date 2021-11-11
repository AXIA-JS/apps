// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useCallback, useMemo, useState } from 'react';
import { isUndefined } from '@axia-js/util';

const defaultValidate = () => true;

export function useFormField(defaultValue, validate = defaultValidate) {
  const [value, setValue] = useState(defaultValue);
  const isValid = useMemo(() => !!value && validate(value), [validate, value]);
  const setter = useCallback(value => !isUndefined(value) && setValue(value), []);
  return [value, isValid, setter];
}