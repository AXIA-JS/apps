// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { OwnedId, OwnerInfo } from './types';

import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Dropdown, InputAddress, MarkError, Modal } from '@axia-js/react-components';

import { useTranslation } from './translate';

interface Props {
  noCodeCheck?: boolean;
  onChange: (owner: OwnerInfo) => void;
  ownedIds: OwnedId[];
}

function InputOwner ({ noCodeCheck, onChange, ownedIds }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const [accountId, setAccountId] = useState<string | null>(null);
  const [allyId, setAllyId] = useState<number>(0);

  useEffect((): void => {
    onChange(
      accountId && allyId
        ? { accountId, allyId }
        : { accountId: null, allyId: 0 }
    );
  }, [accountId, onChange, ownedIds, allyId]);

  const owners = useMemo(
    () => ownedIds.map(({ manager }) => manager),
    [ownedIds]
  );

  const optIds = useMemo(
    () => ownedIds
      .filter(({ manager }) => manager === accountId)
      .map(({ allyId }) => ({ text: allyId.toString(), value: allyId.toNumber() })),
    [accountId, ownedIds]
  );

  const _setAllyId = useCallback(
    (id: number) => setAllyId(
      noCodeCheck || ownedIds.some(({ hasCode, allyId }) => allyId.eq(id) && hasCode)
        ? id
        : 0
    ),
    [noCodeCheck, ownedIds]
  );

  return (
    <Modal.Columns hint={
      <>
        <p>{t<string>('This account that has been used to register the allychain. This will pay all associated fees.')}</p>
        <p>{t<string>('The allychain id is associated with the selected account via allythread registration.')}</p>
      </>
    }
    >
      <InputAddress
        filter={owners}
        label={t<string>('allychain owner')}
        onChange={setAccountId}
        type='account'
        value={accountId}
      />
      {accountId && (
        <Dropdown
          defaultValue={optIds[0].value}
          key={accountId}
          label={t<string>('allychain id')}
          onChange={_setAllyId}
          options={optIds}
        />
      )}
      {!noCodeCheck && !allyId && (
        <MarkError content={t<string>('Before using this registered allyId, you need to have a WASM validation function registered on-chain')} />
      )}
    </Modal.Columns>
  );
}

export default React.memo(InputOwner);
