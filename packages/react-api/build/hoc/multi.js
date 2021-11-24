// Copyright 2017-2021 @axia-js/react-api authors & contributors
// SPDX-License-Identifier: Apache-2.0
export default function withMulti(Component, ...hocs) {
  // NOTE: Order is reversed so it makes sense in the props, i.e. component
  // after something can use the value of the preceding version
  return hocs.reverse().reduce((Component, hoc) => hoc(Component), Component);
}