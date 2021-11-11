"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useVoters;

var _react = require("react");

var _reactHooks = require("@axia-js/react-hooks");

// Copyright 2017-2021 @axia-js/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0
const EMPTY_VOTERS = {};

async function getVoters(api, candidates) {
  const skeptics = [];
  const voters = [];
  const entries = candidates.length ? await Promise.all(candidates.map(({
    accountId
  }) => api.query.society.votes.entries(accountId))) : [];
  entries.forEach(list => {
    list.forEach(([{
      args: [, accountId]
    }, opt]) => {
      if (opt.isSome) {
        const key = accountId.toString();
        const vote = opt.unwrap();

        if (vote.isSkeptic) {
          !skeptics.includes(key) && skeptics.push(key);
        } else {
          !voters.includes(key) && voters.push(key);
        }
      }
    });
  });
  return {
    candidates,
    skeptics,
    voters
  };
}

function useVoters() {
  const {
    api
  } = (0, _reactHooks.useApi)();
  const voteTrigger = (0, _reactHooks.useEventTrigger)([api.events.society.Vote]);
  const candidates = (0, _reactHooks.useCall)(api.derive.society.candidates);
  const [state, setState] = (0, _react.useState)(EMPTY_VOTERS);
  (0, _react.useEffect)(() => {
    voteTrigger && candidates && getVoters(api, candidates).then(setState).catch(console.error);
  }, [api, candidates, voteTrigger]);
  return state;
}