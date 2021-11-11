"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _fileSaver = _interopRequireDefault(require("file-saver"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _i18n = _interopRequireDefault(require("@axia-js/react-components/i18n"));

var _cache = _interopRequireDefault(require("@axia-js/react-components/i18n/cache"));

var _reactHooks = require("@axia-js/react-hooks");

var _uiSettings = require("@axia-js/ui-settings");

var _translate = require("../translate.cjs");

var _StringInput = _interopRequireDefault(require("./StringInput.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const cache = new Map();

async function retrieveJson(url) {
  if (cache.has(url)) {
    return cache.get(url);
  }

  const json = await fetch(`locales/${url}`).then(response => response.json()).catch(e => console.error(e));
  cache.set(url, json);
  return json || {};
}

async function retrieveEnglish() {
  const paths = await retrieveJson('en/index.json');
  const strings = await Promise.all(paths.map(path => retrieveJson(`en/${path}`)));
  return strings.reduce((language, strings, index) => {
    language[paths[index]] = strings;
    return language;
  }, {});
}

async function retrieveAll() {
  const _keys = await retrieveJson('index.json');

  const keys = _keys.filter(lng => lng !== 'en');

  const missing = keys.filter(lng => !_cache.default[lng]);
  const english = await retrieveEnglish();
  const translations = missing.length ? await Promise.all(missing.map(lng => retrieveJson(`${lng}/translation.json`))) : []; // setup the language cache

  missing.forEach((lng, index) => {
    _cache.default[lng] = translations[index];
  }); // fill in all empty values (useful for download, filling in)

  keys.forEach(lng => {
    Object.keys(english).forEach(record => {
      Object.keys(english[record]).forEach(key => {
        if (!_cache.default[lng][key]) {
          _cache.default[lng][key] = '';
        }
      });
    });
  });
  return {
    english,
    keys: keys.map(text => ({
      text,
      value: text
    })),
    modules: Object.keys(english).map(text => ({
      text: text.replace('.json', '').replace('app-', 'page-'),
      value: text
    })).sort((a, b) => a.text.localeCompare(b.text))
  };
}

function calcProgress(english, language) {
  const breakdown = {};
  let done = 0;
  let total = 0;
  Object.keys(english).forEach(record => {
    const mod = english[record];
    const mtotal = Object.keys(mod).length;
    let mdone = 0;
    Object.keys(mod).forEach(key => {
      if (language[key]) {
        mdone++;
      }
    });
    done += mdone;
    total += mtotal;
    breakdown[record] = [mdone, mtotal, 0];
  });
  return [[done, total, 0], breakdown];
}

function doDownload(strings, withEmpty) {
  const sanitized = Object.keys(strings).sort().reduce((result, key) => {
    const sanitized = strings[key].trim();

    if (sanitized || withEmpty) {
      result[key] = sanitized;
    }

    return result;
  }, {});

  _fileSaver.default.saveAs(new Blob([JSON.stringify(sanitized, null, 2)], {
    type: 'application/json; charset=utf-8'
  }), 'translation.json');
} // eslint-disable-next-line @typescript-eslint/no-unused-vars


function progressDisplay([done, total, _] = [0, 0, 0]) {
  return {
    done,
    progress: (total ? done * 100 / total : 100).toFixed(2),
    total
  };
}

function Translate({
  className
}) {
  var _allProgress$record, _allProgress$record2;

  const {
    t
  } = (0, _translate.useTranslation)();
  const [withEmpty, toggleWithEmpty] = (0, _reactHooks.useToggle)();
  const [{
    english,
    keys,
    modules
  }, setDefaults] = (0, _react.useState)({
    english: {},
    keys: [],
    modules: []
  });
  const [lng, setLng] = (0, _react.useState)('zh');
  const [[modProgress, allProgress], setProgress] = (0, _react.useState)([[0, 0, 0], {}]);
  const [record, setRecord] = (0, _react.useState)('app-accounts.json');
  const [strings, setStrings] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    retrieveAll().then(setDefaults).catch(console.error);
  }, []);
  (0, _react.useEffect)(() => {
    setStrings(_cache.default[lng]);
    setProgress(calcProgress(english, _cache.default[lng]));
  }, [english, lng]);
  (0, _react.useEffect)(() => {
    setLng(keys.some(({
      value
    }) => value === _uiSettings.settings.i18nLang) ? _uiSettings.settings.i18nLang : 'zh');
  }, [keys]);

  const _setString = (0, _react.useCallback)((key, value) => {
    setStrings(strings => strings ? _objectSpread(_objectSpread({}, strings), {}, {
      [key]: value
    }) : null);
    const hasPrevVal = !!_cache.default[lng][key];
    const sanitized = value.trim();
    _cache.default[lng][key] = value;

    if (hasPrevVal !== !!sanitized) {
      const [progress, breakdown] = calcProgress(english, _cache.default[lng]);
      setProgress(([counters]) => {
        progress[2] = Math.max(0, progress[0] - counters[0]);
        return [progress, breakdown];
      });
    }
  }, [english, lng]);

  const _doApply = (0, _react.useCallback)(() => {
    _i18n.default.reloadResources().catch(console.error);
  }, []);

  const _onDownload = (0, _react.useCallback)(() => doDownload(strings || {}, withEmpty), [strings, withEmpty]);

  if (!keys.length) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Spinner, {});
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("main", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("header", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Columar, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Columar.Column, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Dropdown, {
              isFull: true,
              label: t('the language to display translations for'),
              onChange: setLng,
              options: keys,
              value: lng
            }), t('{{done}}/{{total}}, {{progress}}% done', {
              replace: progressDisplay(modProgress)
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Progress, {
            color: "auto",
            total: modProgress[1],
            value: modProgress[0]
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Columar.Column, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Dropdown, {
              isFull: true,
              label: t('the module to display strings for'),
              onChange: setRecord,
              options: modules,
              value: record
            }), t('{{done}}/{{total}}, {{progress}}% done', {
              replace: progressDisplay(allProgress[record])
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Progress, {
            color: "auto",
            total: (_allProgress$record = allProgress[record]) === null || _allProgress$record === void 0 ? void 0 : _allProgress$record[1],
            value: (_allProgress$record2 = allProgress[record]) === null || _allProgress$record2 === void 0 ? void 0 : _allProgress$record2[0]
          })]
        })]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "toggleWrapper",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Toggle, {
        label: withEmpty ? t('include all empty strings in the generated file') : t('do not include empty strings in the generated file'),
        onChange: toggleWithEmpty,
        value: withEmpty
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Button.Group, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "sync",
        label: t('Apply to UI'),
        onClick: _doApply
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "download",
        label: t('Generate {{lng}}/translation.json', {
          replace: {
            lng
          }
        }),
        onClick: _onDownload
      })]
    }), record && strings && Object.keys(english[record]).map((key, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_StringInput.default, {
      onChange: _setString,
      original: english[record][key],
      tkey: key,
      tval: strings[key]
    }, index))]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Translate).withConfig({
  displayName: "I18n",
  componentId: "sc-16mug44-0"
})([".ui--Column{display:flex;> div:first-child{flex:1;text-align:right;}}.ui--Progress{margin:0 0 0 0.25rem;}.toggleWrapper{display:flex;justify-content:flex-end;margin-top:0.75rem;}"]));

exports.default = _default;