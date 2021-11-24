// Copyright 2017-2021 @axia-js/react-api authors & contributors
// SPDX-License-Identifier: Apache-2.0
import withCall from "./call.js";
export default function withCalls(...calls) {
  return Component => {
    // NOTE: Order is reversed so it makes sense in the props, i.e. component
    // after something can use the value of the preceding version
    return calls.reverse().reduce((Component, call) => {
      return Array.isArray(call) ? withCall(...call)(Component) : withCall(call)(Component);
    }, Component);
  };
}