// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
export default function createOptions(api) {
  return Object.keys(api.rpc).sort().filter(section => Object.keys(api.rpc[section]).length !== 0).map(name => ({
    text: name,
    value: name
  }));
}