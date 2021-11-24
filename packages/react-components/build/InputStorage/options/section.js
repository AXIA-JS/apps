// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
export default function createOptions(api) {
  return Object.keys(api.query).sort().filter(name => Object.keys(api.query[name]).length).map(name => ({
    text: name,
    value: name
  }));
}