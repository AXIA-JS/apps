"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDestPrev = createDestPrev;
exports.createDestCurr = createDestCurr;

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function createDestPrev(t) {
  return [{
    text: t('Stash account (increase the amount at stake)'),
    value: 'Staked'
  }, {
    text: t('Stash account (do not increase the amount at stake)'),
    value: 'Stash'
  }, {
    text: t('Controller account'),
    value: 'Controller'
  }];
}

function createDestCurr(t) {
  return createDestPrev(t).concat({
    text: t('Specified payment account'),
    value: 'Account'
  });
}