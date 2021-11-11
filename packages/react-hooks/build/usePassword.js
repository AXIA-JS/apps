// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useEffect, useState } from 'react';
import { keyring } from '@axia-js/ui-keyring';
export function usePassword() {
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  useEffect(() => {
    setIsPasswordValid(keyring.isPassValid(password));
  }, [password]);
  return {
    isPasswordValid,
    password,
    setIsPasswordValid,
    setPassword
  };
}