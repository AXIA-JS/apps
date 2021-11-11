import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/app-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createLanguages, createSs58 } from '@axia-js/apps-config';
import { allNetworks } from '@axia-js/networks';
import { Button, Dropdown, MarkWarning } from '@axia-js/react-components';
import { useApi, useLedger } from '@axia-js/react-hooks';
import { settings } from '@axia-js/ui-settings';
import { isUndefined } from '@axia-js/util';
import { useTranslation } from "./translate.js";
import { createIdenticon, createOption, save, saveAndReload } from "./util.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const ledgerConnOptions = settings.availableLedgerConn;

function General({
  className = ''
}) {
  const {
    t
  } = useTranslation();
  const {
    api,
    isApiReady
  } = useApi();
  const {
    isLedgerCapable
  } = useLedger(); // tri-state: null = nothing changed, false = no reload, true = reload required

  const [changed, setChanged] = useState(null);
  const [state, setSettings] = useState(() => {
    const values = settings.get();
    return _objectSpread(_objectSpread({}, values), {}, {
      uiTheme: values.uiTheme === 'dark' ? 'dark' : 'light'
    });
  });
  const iconOptions = useMemo(() => settings.availableIcons.map(o => createIdenticon(o, ['default'])).concat(createIdenticon({
    info: 'robohash',
    text: 'RoboHash',
    value: 'robohash'
  })), []);
  const prefixOptions = useMemo(() => {
    let ss58Format = api.registry.chainSS58;

    if (isUndefined(ss58Format)) {
      ss58Format = 42;
    }

    const network = allNetworks.find(({
      prefix
    }) => prefix === ss58Format);
    return createSs58(t).map(o => createOption(o, ['default'], 'empty', o.value === -1 ? isApiReady ? network ? ` (${network.displayName}, ${ss58Format || 0})` : ` (${ss58Format || 0})` : undefined : ` (${o.value})`));
  }, [api, isApiReady, t]);
  const themeOptions = useMemo(() => [{
    text: t('Light theme (default)'),
    value: 'light'
  }, {
    text: t('Dark theme (experimental, work-in-progress)'),
    value: 'dark'
  }], [t]);
  const translateLanguages = useMemo(() => createLanguages(t), [t]);
  useEffect(() => {
    const prev = settings.get();
    const hasChanges = Object.entries(state).some(([key, value]) => prev[key] !== value);
    const needsReload = prev.apiUrl !== state.apiUrl || prev.prefix !== state.prefix;
    setChanged(hasChanges ? needsReload : null);
  }, [state]);

  const _handleChange = useCallback(key => value => setSettings(state => _objectSpread(_objectSpread({}, state), {}, {
    [key]: value
  })), []);

  const _saveAndReload = useCallback(() => saveAndReload(state), [state]);

  const _save = useCallback(() => {
    save(state);
    setChanged(null);
  }, [state]);

  const {
    i18nLang,
    icon,
    ledgerConn,
    prefix,
    uiTheme
  } = state;
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsx("div", {
      className: "ui--row",
      children: /*#__PURE__*/_jsx(Dropdown, {
        defaultValue: prefix,
        help: t('Override the default ss58 prefix for address generation'),
        label: t('address prefix'),
        onChange: _handleChange('prefix'),
        options: prefixOptions
      })
    }), /*#__PURE__*/_jsx("div", {
      className: "ui--row",
      children: /*#__PURE__*/_jsx(Dropdown, {
        defaultValue: icon,
        help: t('Override the default identity icon display with a specific theme'),
        label: t('default icon theme'),
        onChange: _handleChange('icon'),
        options: iconOptions
      })
    }), /*#__PURE__*/_jsx("div", {
      className: "ui--row",
      children: /*#__PURE__*/_jsx(Dropdown, {
        defaultValue: uiTheme,
        label: t('default interface theme'),
        onChange: _handleChange('uiTheme'),
        options: themeOptions
      })
    }), /*#__PURE__*/_jsx("div", {
      className: "ui--row",
      children: /*#__PURE__*/_jsx(Dropdown, {
        defaultValue: i18nLang,
        label: t('default interface language'),
        onChange: _handleChange('i18nLang'),
        options: translateLanguages
      })
    }), isLedgerCapable && /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx("div", {
        className: "ui--row",
        children: /*#__PURE__*/_jsx(Dropdown, {
          defaultValue: ledgerConn,
          help: t('Manage your connection to Ledger S'),
          label: t('manage hardware connections'),
          onChange: _handleChange('ledgerConn'),
          options: ledgerConnOptions
        })
      }), state.ledgerConn !== 'none' && /*#__PURE__*/_jsx("div", {
        className: "ui--row",
        children: /*#__PURE__*/_jsx(MarkWarning, {
          content: t('Ledger support is still experimental and some issues may remain. Trust, but verify the addresses on your devices before transferring large amounts. There are some features that will not work, including batch calls (used extensively in staking and democracy) as well as any identity operations.')
        })
      })]
    }), /*#__PURE__*/_jsx(Button.Group, {
      children: /*#__PURE__*/_jsx(Button, {
        icon: "save",
        isDisabled: changed === null,
        label: changed ? t('Save & Reload') : t('Save'),
        onClick: changed ? _saveAndReload : _save
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(General);