"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _appsConfig = require("@axia-js/apps-config");

var _networks = require("@axia-js/networks");

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _uiSettings = require("@axia-js/ui-settings");

var _util = require("@axia-js/util");

var _translate = require("./translate.cjs");

var _util2 = require("./util.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const ledgerConnOptions = _uiSettings.settings.availableLedgerConn;

function General({
  className = ''
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api,
    isApiReady
  } = (0, _reactHooks.useApi)();
  const {
    isLedgerCapable
  } = (0, _reactHooks.useLedger)(); // tri-state: null = nothing changed, false = no reload, true = reload required

  const [changed, setChanged] = (0, _react.useState)(null);
  const [state, setSettings] = (0, _react.useState)(() => {
    const values = _uiSettings.settings.get();

    return _objectSpread(_objectSpread({}, values), {}, {
      uiTheme: values.uiTheme === 'dark' ? 'dark' : 'light'
    });
  });
  const iconOptions = (0, _react.useMemo)(() => _uiSettings.settings.availableIcons.map(o => (0, _util2.createIdenticon)(o, ['default'])).concat((0, _util2.createIdenticon)({
    info: 'robohash',
    text: 'RoboHash',
    value: 'robohash'
  })), []);
  const prefixOptions = (0, _react.useMemo)(() => {
    let ss58Format = api.registry.chainSS58;

    if ((0, _util.isUndefined)(ss58Format)) {
      ss58Format = 42;
    }

    const network = _networks.allNetworks.find(({
      prefix
    }) => prefix === ss58Format);

    return (0, _appsConfig.createSs58)(t).map(o => (0, _util2.createOption)(o, ['default'], 'empty', o.value === -1 ? isApiReady ? network ? ` (${network.displayName}, ${ss58Format || 0})` : ` (${ss58Format || 0})` : undefined : ` (${o.value})`));
  }, [api, isApiReady, t]);
  const themeOptions = (0, _react.useMemo)(() => [{
    text: t('Light theme (default)'),
    value: 'light'
  }, {
    text: t('Dark theme (experimental, work-in-progress)'),
    value: 'dark'
  }], [t]);
  const translateLanguages = (0, _react.useMemo)(() => (0, _appsConfig.createLanguages)(t), [t]);
  (0, _react.useEffect)(() => {
    const prev = _uiSettings.settings.get();

    const hasChanges = Object.entries(state).some(([key, value]) => prev[key] !== value);
    const needsReload = prev.apiUrl !== state.apiUrl || prev.prefix !== state.prefix;
    setChanged(hasChanges ? needsReload : null);
  }, [state]);

  const _handleChange = (0, _react.useCallback)(key => value => setSettings(state => _objectSpread(_objectSpread({}, state), {}, {
    [key]: value
  })), []);

  const _saveAndReload = (0, _react.useCallback)(() => (0, _util2.saveAndReload)(state), [state]);

  const _save = (0, _react.useCallback)(() => {
    (0, _util2.save)(state);
    setChanged(null);
  }, [state]);

  const {
    i18nLang,
    icon,
    ledgerConn,
    prefix,
    uiTheme
  } = state;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "ui--row",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Dropdown, {
        defaultValue: prefix,
        help: t('Override the default ss58 prefix for address generation'),
        label: t('address prefix'),
        onChange: _handleChange('prefix'),
        options: prefixOptions
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "ui--row",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Dropdown, {
        defaultValue: icon,
        help: t('Override the default identity icon display with a specific theme'),
        label: t('default icon theme'),
        onChange: _handleChange('icon'),
        options: iconOptions
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "ui--row",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Dropdown, {
        defaultValue: uiTheme,
        label: t('default interface theme'),
        onChange: _handleChange('uiTheme'),
        options: themeOptions
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "ui--row",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Dropdown, {
        defaultValue: i18nLang,
        label: t('default interface language'),
        onChange: _handleChange('i18nLang'),
        options: translateLanguages
      })
    }), isLedgerCapable && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "ui--row",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Dropdown, {
          defaultValue: ledgerConn,
          help: t('Manage your connection to Ledger S'),
          label: t('manage hardware connections'),
          onChange: _handleChange('ledgerConn'),
          options: ledgerConnOptions
        })
      }), state.ledgerConn !== 'none' && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "ui--row",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkWarning, {
          content: t('Ledger support is still experimental and some issues may remain. Trust, but verify the addresses on your devices before transferring large amounts. There are some features that will not work, including batch calls (used extensively in staking and democracy) as well as any identity operations.')
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button.Group, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "save",
        isDisabled: changed === null,
        label: changed ? t('Save & Reload') : t('Save'),
        onClick: changed ? _saveAndReload : _save
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(General);

exports.default = _default;