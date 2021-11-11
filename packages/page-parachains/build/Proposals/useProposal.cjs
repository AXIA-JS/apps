"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useProposal;

var _react = require("react");

var _reactHooks = require("@axia-js/react-hooks");

// Copyright 2017-2021 @axia-js/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useProposal(id, approvedIds, scheduled) {
  const {
    api
  } = (0, _reactHooks.useApi)();
  const opt = (0, _reactHooks.useCall)(api.query.proposeParachain.proposals, [id]);
  return (0, _react.useMemo)(() => ({
    id,
    isApproved: approvedIds.some(a => a.eq(id)),
    isScheduled: scheduled.some(({
      scheduledIds
    }) => scheduledIds.some(s => s.eq(id))),
    proposal: opt && opt.isSome ? opt.unwrap() : undefined
  }), [approvedIds, id, opt, scheduled]);
}