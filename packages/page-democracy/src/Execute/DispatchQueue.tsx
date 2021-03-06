// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DeriveDispatch } from '@axia-js/api-derive/types';

import React, { useMemo, useRef } from 'react';

import { Table } from '@axia-js/react-components';
import { useApi, useBestNumber, useCall } from '@axia-js/react-hooks';

import { useTranslation } from '../translate';
import DispatchEntry from './DispatchEntry';

interface Props {
  className?: string;
}

function DispatchQueue ({ className }: Props): React.ReactElement<Props> | null {
  const { t } = useTranslation();
  const { api } = useApi();
  const bestNumber = useBestNumber();
  const queued = useCall<DeriveDispatch[]>(api.derive.democracy.dispatchQueue);

  const filtered = useMemo(
    () => bestNumber && queued && queued.filter(({ at }) => at.gte(bestNumber)),
    [bestNumber, queued]
  );

  const headerRef = useRef([
    [t('dispatch queue'), 'start', 2],
    [t('enact')],
    [],
    [undefined, 'media--1000']
  ]);

  return (
    <Table
      className={className}
      empty={filtered && t<string>('Nothing queued for execution')}
      header={headerRef.current}
    >
      {filtered?.map((entry): React.ReactNode => (
        <DispatchEntry
          key={entry.index.toString()}
          value={entry}
        />
      ))}
    </Table>
  );
}

export default React.memo(DispatchQueue);
