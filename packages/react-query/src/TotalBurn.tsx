// Copyright 2017-2021 @axia-js/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect, useState } from 'react';

import { useApi } from '@axia-js/react-hooks';

import FormatBalance from './FormatBalance';

interface Props {
  children?: React.ReactNode;
  className?: string;
  label?: React.ReactNode;
}

function TotalBurn({ children, className = '', label }: Props): React.ReactElement<Props> {
  const { api } = useApi();
  const [totalBurn, setTotalBurn] = useState(1);

  useEffect(() => {
    const fetch = async () => {
      const balances = await api.query.system.account.multi(['111111111111111111111111111111111HC1']);
      const freeAmount: number = JSON.parse(balances)?.data?.free;

      if (freeAmount > 0) setTotalBurn(freeAmount);
    };

    fetch();
  }, []);

  return (
    <div className={className}>
      {label || ''}
      <FormatBalance
        value={totalBurn}
        withSi
      />
      {children}
    </div>
  );
}

export default React.memo(TotalBurn);
