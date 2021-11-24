// Copyright 2017-2021 @axia-js/app-gilt authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useMemo } from 'react';
import { useApi, useCallMulti } from '@axia-js/react-hooks';
import { BN_ONE } from '@axia-js/util';
const optGiltInfo = {
  defaultValue: {},
  transform: ([activeTotal, queueTotals]) => ({
    activeIndex: activeTotal.index.isZero() ? null : activeTotal.index.sub(BN_ONE),
    activeTotal,
    queueTotals: queueTotals.map(([numItems, balance], index) => ({
      balance,
      index: index + 1,
      numItems
    })).filter(({
      balance
    }) => !balance.isZero())
  })
};
export default function useInfo() {
  const {
    api
  } = useApi();
  const info = useCallMulti([api.query.gilt.activeTotal, api.query.gilt.queueTotals], optGiltInfo); // useEffect((): void => {
  //   info.activeIndex &&
  //     api.query.gilt.active
  //       .entries()
  //       .then((value) => console.log(JSON.stringify(value)))
  //       .catch(console.error);
  // }, [api, info?.activeIndex]);

  return useMemo(() => ({
    info
  }), [info]);
}