"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _i18next = _interopRequireDefault(require("i18next"));

var _i18nextBrowserLanguagedetector = _interopRequireDefault(require("i18next-browser-languagedetector"));

var _reactI18next = require("react-i18next");

var _uiSettings = require("@axia-js/ui-settings");

var _Backend = _interopRequireDefault(require("./Backend.cjs"));

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
const languageDetector = new _i18nextBrowserLanguagedetector.default();
languageDetector.addDetector({
  lookup: () => {
    const i18nLang = _uiSettings.settings.i18nLang;
    return i18nLang === _uiSettings.LANGUAGE_DEFAULT ? undefined : i18nLang;
  },
  name: 'i18nLangDetector'
});

_i18next.default.use(languageDetector).use(_reactI18next.initReactI18next).use(_Backend.default).init({
  backend: {},
  debug: false,
  detection: {
    order: ['i18nLangDetector', 'navigator']
  },
  fallbackLng: false,
  interpolation: {
    escapeValue: false
  },
  keySeparator: false,
  load: 'languageOnly',
  ns: ['apps', 'apps-config', 'apps-electron', 'apps-routing', 'app-accounts', 'app-claims', 'app-contracts', 'app-council', 'app-democracy', 'app-explorer', 'app-extrinsics', 'app-generic-asset', 'app-js', 'app-allychains', 'app-poll', 'app-rpc', 'app-settings', 'app-signing', 'app-society', 'app-staking', 'app-storage', 'app-sudo', 'app-tech-comm', 'app-treasury', 'react-api', 'react-components', 'react-hooks', 'react-params', 'react-query', 'react-signer', 'translation'],
  nsSeparator: false,
  react: {
    useSuspense: true
  },
  returnEmptyString: false,
  returnNull: false
}).catch(error => console.log('i18n: failure', error));

_uiSettings.settings.on('change', settings => {
  _i18next.default.changeLanguage(settings.i18nLang === _uiSettings.LANGUAGE_DEFAULT // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
  ? _i18next.default.services.languageDetector.detect() : settings.i18nLang).catch(console.error);
});

var _default = _i18next.default;
exports.default = _default;