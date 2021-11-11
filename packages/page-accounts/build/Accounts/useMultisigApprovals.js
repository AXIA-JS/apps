// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useContext, useEffect, useState } from 'react';
import { useApi, useIncrement, useIsMountedRef } from '@axia-js/react-hooks';
import { EventsContext } from '@axia-js/react-query';
export default function useMultisigApprovals(address) {
  const {
    events
  } = useContext(EventsContext);
  const {
    api
  } = useApi();
  const [multiInfos, setMultiInfos] = useState([]);
  const [trigger, incTrigger] = useIncrement();
  const mountedRef = useIsMountedRef(); // increment the trigger by looking at all events
  //   - filter the by multisig module (old utility is not supported)
  //   - find anything data item where the type is AccountId
  //   - increment the trigger when at least one matches our address

  useEffect(() => {
    events.filter(({
      record: {
        event: {
          section
        }
      }
    }) => section === 'multisig').reduce((hasMultisig, {
      record: {
        event: {
          data
        }
      }
    }) => data.reduce((hasMultisig, item) => hasMultisig || item.toRawType() === 'AccountId' && item.eq(address), hasMultisig), false) && incTrigger();
  }, [address, events, incTrigger]); // query all the entries for the multisig, extracting approvals with their hash

  useEffect(() => {
    const multiModule = api.query.multisig || api.query.utility;
    multiModule && multiModule.multisigs && multiModule.multisigs.entries(address).then(infos => {
      mountedRef.current && setMultiInfos(infos.filter(([, opt]) => opt.isSome).map(([key, opt]) => [key.args[1], opt.unwrap()]));
    }).catch(console.error);
  }, [address, api, mountedRef, trigger]);
  return multiInfos;
}