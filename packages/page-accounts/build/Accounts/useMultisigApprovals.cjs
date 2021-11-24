"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useMultisigApprovals;

var _react = require("react");

var _reactHooks = require("@axia-js/react-hooks");

var _reactQuery = require("@axia-js/react-query");

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useMultisigApprovals(address) {
  const {
    events
  } = (0, _react.useContext)(_reactQuery.EventsContext);
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [multiInfos, setMultiInfos] = (0, _react.useState)([]);
  const [trigger, incTrigger] = (0, _reactHooks.useIncrement)();
  const mountedRef = (0, _reactHooks.useIsMountedRef)(); // increment the trigger by looking at all events
  //   - filter the by multisig module (old utility is not supported)
  //   - find anything data item where the type is AccountId
  //   - increment the trigger when at least one matches our address

  (0, _react.useEffect)(() => {
    events.filter(_ref => {
      let {
        record: {
          event: {
            section
          }
        }
      } = _ref;
      return section === 'multisig';
    }).reduce((hasMultisig, _ref2) => {
      let {
        record: {
          event: {
            data
          }
        }
      } = _ref2;
      return data.reduce((hasMultisig, item) => hasMultisig || item.toRawType() === 'AccountId' && item.eq(address), hasMultisig);
    }, false) && incTrigger();
  }, [address, events, incTrigger]); // query all the entries for the multisig, extracting approvals with their hash

  (0, _react.useEffect)(() => {
    const multiModule = api.query.multisig || api.query.utility;
    multiModule && multiModule.multisigs && multiModule.multisigs.entries(address).then(infos => {
      mountedRef.current && setMultiInfos(infos.filter(_ref3 => {
        let [, opt] = _ref3;
        return opt.isSome;
      }).map(_ref4 => {
        let [key, opt] = _ref4;
        return [key.args[1], opt.unwrap()];
      }));
    }).catch(console.error);
  }, [address, api, mountedRef, trigger]);
  return multiInfos;
}