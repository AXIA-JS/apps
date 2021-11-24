// Copyright 2017-2021 @axia-js/react-api authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { interval } from 'rxjs';
const interval$ = interval(500);
export default function intervalObservable(that) {
  return interval$.subscribe(() => {
    const elapsed = Date.now() - (that.state.callUpdatedAt || 0);
    const callUpdated = elapsed <= 1500;

    if (callUpdated !== that.state.callUpdated) {
      that.setState({
        callUpdated
      });
    }
  });
}