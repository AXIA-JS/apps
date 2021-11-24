"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.useTranslation = useTranslation;

var _reactI18next = require("react-i18next");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useTranslation() {
  return (0, _reactI18next.useTranslation)('react-hooks');
}

var _default = (0, _reactI18next.withTranslation)(['react-hooks']);

exports.default = _default;