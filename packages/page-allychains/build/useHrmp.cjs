"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useHrmp;

var _reactHooks = require("@axia-js/react-hooks");

// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
const optChannels = {
  transform: _ref => {
    let [[channelIds], channels] = _ref;
    return channelIds.map((id, index) => [id, channels[index]]).filter(_ref2 => {
      let [, opt] = _ref2;
      return opt.isSome;
    }).map(_ref3 => {
      let [id, opt] = _ref3;
      return [id, opt.unwrap()];
    }).reduce((all, _ref4) => {
      var _all$dst, _id$receiver$toString, _all$src, _id$sender$toString;

      let [id, channel] = _ref4;
      (_all$dst = all.dst)[_id$receiver$toString = id.receiver.toString()] || (_all$dst[_id$receiver$toString] = []);
      (_all$src = all.src)[_id$sender$toString = id.sender.toString()] || (_all$src[_id$sender$toString] = []);
      all.dst[id.receiver.toString()].push([id, channel]);
      all.src[id.sender.toString()].push([id, channel]);
      return all;
    }, {
      dst: {},
      src: {}
    });
  },
  withParamsTransform: true
};

function extractChannelIds(keys) {
  return keys.map(_ref5 => {
    let {
      args: [id]
    } = _ref5;
    return id;
  });
}

function useHrmp() {
  var _ref6, _ref7, _ref8, _ref9;

  const {
    api
  } = (0, _reactHooks.useApi)();
  const trigger = (0, _reactHooks.useEventTrigger)([(_ref6 = api.events.parasHrmp || api.events.paraHrmp || api.events.hrmp) === null || _ref6 === void 0 ? void 0 : _ref6.OpenChannelAccepted, (_ref7 = api.events.parasHrmp || api.events.paraHrmp || api.events.hrmp) === null || _ref7 === void 0 ? void 0 : _ref7.ChannelClosed]);
  const channelIds = (0, _reactHooks.useMapKeys)((_ref8 = api.query.parasHrmp || api.query.paraHrmp || api.query.hrmp) === null || _ref8 === void 0 ? void 0 : _ref8.hrmpChannels, {
    at: trigger.blockHash,
    transform: extractChannelIds
  });
  return (0, _reactHooks.useCall)(channelIds && ((_ref9 = api.query.parasHrmp || api.query.paraHrmp || api.query.hrmp) === null || _ref9 === void 0 ? void 0 : _ref9.hrmpChannels.multi), [channelIds], optChannels);
}