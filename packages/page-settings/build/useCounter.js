// Copyright 2017-2021 @axia-js/app-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0
import useExtensions from "./useExtensions.js";
export default function useCounter() {
  const {
    count
  } = useExtensions();
  return count;
}