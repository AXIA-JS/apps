// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DeriveElectionsInfo } from '@axia-js/api-derive/types';
import type { AccountId } from '@axia-js/types/interfaces';

import React, { useRef } from 'react';

import { Table } from '@axia-js/react-components';

import { useTranslation } from '../translate';
import Candidate from './Candidate';

interface Props {
  allVotes?: Record<string, AccountId[]>;
  className?: string;
  electionsInfo?: DeriveElectionsInfo;
  hasElections: boolean;
  prime?: AccountId | null;
}

function Members ({ allVotes = {}, className = '', electionsInfo, hasElections, prime }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  const headerRef = useRef([
    [t('members'), 'start', 2],
    [hasElections ? t('backing') : undefined, 'expand'],
    [hasElections ? t('votes') : undefined]
  ]);

  return (
    <Table
      className={className}
      empty={electionsInfo && t<string>('No members found')}
      header={headerRef.current}
    >
      {electionsInfo?.members.map(([accountId, balance]): React.ReactNode => (
        <Candidate
          address={accountId}
          balance={balance}
          isPrime={prime?.eq(accountId)}
          key={accountId.toString()}
          voters={allVotes[accountId.toString()]}
        />
      ))}
    </Table>
  );
}

export default React.memo(Members);
