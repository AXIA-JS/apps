"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTranslation = useTranslation;
exports.default = void 0;

var _reactI18next = require("react-i18next");

// Copyright 2017-2021 @axia-js/app-claims authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useTranslation() {
  return (0, _reactI18next.useTranslation)('app-claims');
}

var _default = (0, _reactI18next.withTranslation)(['app-claims']);

exports.default = _default;