// Copyright 2017-2021 @axia-js/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0
export function sanitize(value) {
  return (value === null || value === void 0 ? void 0 : value.toLowerCase().replace(/-/g, ' ')) || '';
}