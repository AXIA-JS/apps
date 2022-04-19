// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type BN from 'bn.js';
import type { AllyId } from '@axia-js/types/interfaces';
import type { OwnedId } from '../types';

import React from 'react';

import { Button } from '@axia-js/react-components';
import { useApi, useCall, useToggle } from '@axia-js/react-hooks';

import { useTranslation } from '../translate';
import { LOWEST_PUBLIC_ID } from './constants';
import RegisterId from './RegisterId';
import RegisterThread from './RegisterThread';

interface Props {
  className?: string;
  ownedIds: OwnedId[];
}

const transformId = {
  transform: (nextId: AllyId) =>
    nextId.isZero()
      ? LOWEST_PUBLIC_ID
      : nextId
};

function Actions ({ className, ownedIds }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const [isRegisterOpen, toggleRegisterOpen] = useToggle();
  const [isReserveOpen, toggleReserveOpen] = useToggle();
  const nextAllyId = useCall<AllyId | BN>(api.query.registrar.nextFreeAllyId, [], transformId);

  return (
    <Button.Group className={className}>
      <Button
        icon='plus'
        isDisabled={!api.tx.registrar.reserve}
        label={t<string>('AllyId')}
        onClick={toggleReserveOpen}
      />
      {isReserveOpen && (
        <RegisterId
          nextAllyId={nextAllyId}
          onClose={toggleReserveOpen}
        />
      )}
      <Button
        icon='plus'
        isDisabled={api.tx.registrar.reserve ? !ownedIds.length : false}
        label={t<string>('AllyThread')}
        onClick={toggleRegisterOpen}
      />
      {isRegisterOpen && (
        <RegisterThread
          nextAllyId={nextAllyId}
          onClose={toggleRegisterOpen}
          ownedIds={ownedIds}
        />
      )}
    </Button.Group>
  );
}

export default React.memo(Actions);
