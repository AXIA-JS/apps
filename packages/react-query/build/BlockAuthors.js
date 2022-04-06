// Copyright 2017-2021 @axia-js/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useState } from 'react';
import { useApi, useCall } from '@axia-js/react-hooks';
import { formatNumber, isFunction } from '@axia-js/util'; // TODO update HeaderExtended in api-derive

import { jsx as _jsx } from "react/jsx-runtime";
const MAX_HEADERS = 75;
const byAuthor = {};
const eraPoints = {};
const BlockAuthorsContext = /*#__PURE__*/React.createContext({
  byAuthor,
  eraPoints,
  lastBlockAuthors: [],
  lastHeaders: []
});
const ValidatorsContext = /*#__PURE__*/React.createContext([]);

function BlockAuthorsBase({
  children
}) {
  var _api$derive$staking;

  const {
    api,
    isApiReady
  } = useApi();
  const queryPoints = useCall(isApiReady && ((_api$derive$staking = api.derive.staking) === null || _api$derive$staking === void 0 ? void 0 : _api$derive$staking.currentPoints));
  const [state, setState] = useState({
    byAuthor,
    eraPoints,
    lastBlockAuthors: [],
    lastHeaders: []
  });
  const [validators, setValidators] = useState([]);
  useEffect(() => {
    // No unsub, global context - destroyed on app close
    api.isReady.then(() => {
      var _api$query$authorMapp, _api$query$authorMapp2;

      let lastHeaders = [];
      let lastBlockAuthors = [];
      let lastBlockNumber = '';
      const isAuthorIds = isFunction((_api$query$authorMapp = api.query.authorMapping) === null || _api$query$authorMapp === void 0 ? void 0 : _api$query$authorMapp.authorIds); // TODO-AXTEND reevaluate in a month: 07/16/21

      const isAuthorMappingWithDeposit = isFunction((_api$query$authorMapp2 = api.query.authorMapping) === null || _api$query$authorMapp2 === void 0 ? void 0 : _api$query$authorMapp2.mappingWithDeposit); // subscribe to all validators

      api.query.session && api.query.session.validators(validatorIds => {
        setValidators(validatorIds.map(validatorId => validatorId.toString()));
      }).catch(console.error); // subscribe to new headers

      api.derive.chain.subscribeNewHeads(async lastHeader => {
        if (lastHeader !== null && lastHeader !== void 0 && lastHeader.number) {
          const blockNumber = lastHeader.number.unwrap();
          let thisBlockAuthor = '';

          if (lastHeader.author) {
            thisBlockAuthor = lastHeader.author.toString();
          } else if (isAuthorMappingWithDeposit && lastHeader.digest.logs && lastHeader.digest.logs[0] && lastHeader.digest.logs[0].isConsensus && lastHeader.digest.logs[0].asConsensus[1]) {
            // Some blockchains such as Axtend need to fetch the author accountId from a mapping
            thisBlockAuthor = (await api.query.authorMapping.mappingWithDeposit(lastHeader.digest.logs[0].asConsensus[1])).toHuman().account;
            lastHeader.authorFromMapping = thisBlockAuthor;
          } else if (isAuthorIds && lastHeader.digest.logs && lastHeader.digest.logs[0] && lastHeader.digest.logs[0].isConsensus && lastHeader.digest.logs[0].asConsensus[1]) {
            // TODO-AXTEND reevaluate in a month: 07/16/21
            // Some blockchains such as Axtend need to fetch the author accountId from a mapping (function call may differ according to pallet version)
            thisBlockAuthor = (await api.query.authorMapping.authorIds(lastHeader.digest.logs[0].asConsensus[1])).toString();
            lastHeader.authorFromMapping = thisBlockAuthor;
          }

          const thisBlockNumber = formatNumber(blockNumber);

          if (thisBlockAuthor) {
            byAuthor[thisBlockAuthor] = thisBlockNumber;

            if (thisBlockNumber !== lastBlockNumber) {
              lastBlockNumber = thisBlockNumber;
              lastBlockAuthors = [thisBlockAuthor];
            } else {
              lastBlockAuthors.push(thisBlockAuthor);
            }
          }

          lastHeaders = lastHeaders.filter((old, index) => index < MAX_HEADERS && old.number.unwrap().lt(blockNumber)).reduce((next, header) => {
            next.push(header);
            return next;
          }, [lastHeader]).sort((a, b) => b.number.unwrap().cmp(a.number.unwrap()));
          setState({
            byAuthor,
            eraPoints,
            lastBlockAuthors: lastBlockAuthors.slice(),
            lastBlockNumber,
            lastHeader,
            lastHeaders
          });
        }
      }).catch(console.error);
    }).catch(console.error); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (queryPoints) {
      const entries = [...queryPoints.individual.entries()].map(([accountId, points]) => [accountId.toString(), formatNumber(points)]);
      const current = Object.keys(eraPoints); // we have an update, clear all previous

      if (current.length !== entries.length) {
        current.forEach(accountId => {
          delete eraPoints[accountId];
        });
      }

      entries.forEach(([accountId, points]) => {
        eraPoints[accountId] = points;
      });
    }
  }, [queryPoints]);
  return /*#__PURE__*/_jsx(ValidatorsContext.Provider, {
    value: validators,
    children: /*#__PURE__*/_jsx(BlockAuthorsContext.Provider, {
      value: state,
      children: children
    })
  });
}

const BlockAuthors = /*#__PURE__*/React.memo(BlockAuthorsBase);
export { BlockAuthorsContext, BlockAuthors, ValidatorsContext };