"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useBlockTime = useBlockTime;

var _react = require("react");

var _util = require("@axia-js/util");

var _translate = require("./translate.cjs");

var _useApi = require("./useApi.cjs");

// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
const DEFAULT_TIME = new _util.BN(6000); // Some chains incorrectly use these, i.e. it is se to values such as 0 or even 2
// Use a low minimum validity threshold to check these against

const THRESHOLD = _util.BN_THOUSAND.div(_util.BN_TWO);

function useBlockTime(blocks = _util.BN_ONE, apiOverride) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _useApi.useApi)();
  return (0, _react.useMemo)(() => {
    var _a$consts$babe, _a$consts$difficulty, _a$consts$timestamp;

    const a = apiOverride || api;
    const blockTime = // Babe
    ((_a$consts$babe = a.consts.babe) === null || _a$consts$babe === void 0 ? void 0 : _a$consts$babe.expectedBlockTime) || ( // POW, eg. Kulupu
    (_a$consts$difficulty = a.consts.difficulty) === null || _a$consts$difficulty === void 0 ? void 0 : _a$consts$difficulty.targetBlockTime) || ( // Check against threshold to determine value validity
    (_a$consts$timestamp = a.consts.timestamp) !== null && _a$consts$timestamp !== void 0 && _a$consts$timestamp.minimumPeriod.gte(THRESHOLD) // Default minimum period config
    ? a.consts.timestamp.minimumPeriod.mul(_util.BN_TWO) : a.query.parachainSystem // default guess for a parachain
    ? DEFAULT_TIME.mul(_util.BN_TWO) // default guess for others
    : DEFAULT_TIME);
    const value = blockTime.mul((0, _util.bnToBn)(blocks)).toNumber();
    const time = (0, _util.extractTime)(Math.abs(value));
    const {
      days,
      hours,
      minutes,
      seconds
    } = time;
    const timeStr = [days ? days > 1 ? t('{{days}} days', {
      replace: {
        days
      }
    }) : t('1 day') : null, hours ? hours > 1 ? t('{{hours}} hrs', {
      replace: {
        hours
      }
    }) : t('1 hr') : null, minutes ? minutes > 1 ? t('{{minutes}} mins', {
      replace: {
        minutes
      }
    }) : t('1 min') : null, seconds ? seconds > 1 ? t('{{seconds}} s', {
      replace: {
        seconds
      }
    }) : t('1 s') : null].filter(s => !!s).slice(0, 2).join(' ');
    return [blockTime.toNumber(), `${value < 0 ? '+' : ''}${timeStr}`, time];
  }, [api, apiOverride, blocks, t]);
}