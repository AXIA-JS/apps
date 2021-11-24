"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _uiSettings = require("@axia-js/ui-settings");

var _generator = _interopRequireDefault(require("@axia-js/vanitygen/generator"));

var _regex = _interopRequireDefault(require("@axia-js/vanitygen/regex"));

var _sort = _interopRequireDefault(require("@axia-js/vanitygen/sort"));

var _Create = _interopRequireDefault(require("../modals/Create.cjs"));

var _translate = require("../translate.cjs");

var _Match = _interopRequireDefault(require("./Match.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const DEFAULT_MATCH = 'Some';
const BOOL_OPTIONS = [{
  text: 'No',
  value: false
}, {
  text: 'Yes',
  value: true
}];

function VanityApp(_ref) {
  let {
    className = '',
    onStatusChange
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api,
    isEthereum
  } = (0, _reactHooks.useApi)();
  const results = (0, _react.useRef)([]);
  const runningRef = (0, _react.useRef)(false);
  const mountedRef = (0, _reactHooks.useIsMountedRef)();
  const [createSeed, setCreateSeed] = (0, _react.useState)(null);
  const [{
    elapsed,
    isRunning,
    keyCount,
    matches
  }, setResults] = (0, _react.useState)({
    elapsed: 0,
    isRunning: false,
    keyCount: -1,
    keyTime: 0,
    matches: [],
    startAt: 0
  });
  const [{
    isMatchValid,
    match
  }, setMatch] = (0, _react.useState)({
    isMatchValid: true,
    match: DEFAULT_MATCH
  });
  const [type, setType] = (0, _react.useState)('ed25519');
  const [withCase, setWithCase] = (0, _react.useState)(true);

  const _clearSeed = (0, _react.useCallback)(() => setCreateSeed(null), []);

  const _checkMatches = (0, _react.useCallback)(() => {
    const checks = results.current;
    results.current = [];

    if (checks.length === 0 || !mountedRef.current) {
      return;
    }

    setResults(_ref2 => {
      let {
        isRunning,
        keyCount,
        keyTime,
        matches,
        startAt
      } = _ref2;
      let newKeyCount = keyCount;
      let newKeyTime = keyTime;
      const newMatches = checks.reduce((result, _ref3) => {
        let {
          elapsed,
          found
        } = _ref3;
        newKeyCount += found.length;
        newKeyTime += elapsed;
        return result.concat(found);
      }, matches);
      return {
        elapsed: Date.now() - startAt,
        isRunning,
        keyCount: newKeyCount,
        keyTime: newKeyTime,
        matches: newMatches.sort(_sort.default).slice(0, 25),
        startAt
      };
    });
  }, [mountedRef]);

  const _executeGeneration = (0, _react.useCallback)(() => {
    if (!runningRef.current) {
      return _checkMatches();
    }

    setTimeout(() => {
      if (mountedRef.current) {
        if (results.current.length === 25) {
          _checkMatches();
        }

        results.current.push((0, _generator.default)({
          match,
          runs: 10,
          ss58Format: api.registry.chainSS58 || 0,
          type,
          withCase,
          withHex: true
        }));

        _executeGeneration();
      }
    }, 0);
  }, [_checkMatches, api, match, mountedRef, runningRef, type, withCase]);

  const _onChangeMatch = (0, _react.useCallback)(match => setMatch({
    isMatchValid: _regex.default.test(match) && match.length !== 0 && match.length < 31,
    match
  }), []);

  const _onRemove = (0, _react.useCallback)(address => setResults(results => _objectSpread(_objectSpread({}, results), {}, {
    matches: results.matches.filter(item => item.address !== address)
  })), []);

  const _toggleStart = (0, _react.useCallback)(() => setResults(_ref4 => {
    let {
      elapsed,
      isRunning,
      keyCount,
      keyTime,
      matches,
      startAt
    } = _ref4;
    return {
      elapsed,
      isRunning: !isRunning,
      keyCount: isRunning ? keyCount : 0,
      keyTime: isRunning ? keyTime : 0,
      matches,
      startAt: isRunning ? startAt : Date.now()
    };
  }), []);

  (0, _react.useEffect)(() => {
    runningRef.current = isRunning;

    if (isRunning) {
      _executeGeneration();
    }
  }, [_executeGeneration, isRunning]);
  const header = (0, _react.useMemo)(() => [[t('matches'), 'start', 2], [t('Evaluated {{count}} keys in {{elapsed}}s ({{avg}} keys/s)', {
    replace: {
      avg: (keyCount / (elapsed / 1000)).toFixed(3),
      count: keyCount,
      elapsed: (elapsed / 1000).toFixed(2)
    }
  }), 'start'], [t('secret'), 'start'], []], [elapsed, keyCount, t]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "ui--row",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
        autoFocus: true,
        className: "medium",
        help: t('Type here what you would like your address to contain. This tool will generate the keys and show the associated addresses that best match your search. '),
        isDisabled: isRunning,
        isError: !isMatchValid,
        label: t('Search for'),
        onChange: _onChangeMatch,
        onEnter: _toggleStart,
        value: match
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Dropdown, {
        className: "medium",
        help: t('Should the search be case sensitive, e.g if you select "no" your search for "Some" may return addresses containing "somE" or "sOme"...'),
        isDisabled: isRunning,
        label: t('case sensitive'),
        onChange: setWithCase,
        options: BOOL_OPTIONS,
        value: withCase
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "ui--row",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Dropdown, {
        className: "medium",
        defaultValue: type,
        help: t('Determines what cryptography will be used to create this account. Note that to validate on AXIA, the session account must use "ed25519".'),
        label: t('keypair crypto type'),
        onChange: setType,
        options: isEthereum ? _uiSettings.settings.availableCryptosEth : _uiSettings.settings.availableCryptos
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button.Group, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: isRunning ? 'stop' : 'sign-in-alt',
        isDisabled: !isMatchValid,
        label: isRunning ? t('Stop generation') : t('Start generation'),
        onClick: _toggleStart
      })
    }), matches.length !== 0 && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("article", {
        className: "warning centered",
        children: t('Ensure that you utilized the "Save" functionality before using a generated address to receive funds. Without saving the address any funds and the associated seed any funds sent to it will be lost.')
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Table, {
        className: "vanity--App-matches",
        empty: t('No matches found'),
        header: header,
        children: matches.map(match => /*#__PURE__*/(0, _react.createElement)(_Match.default, _objectSpread(_objectSpread({}, match), {}, {
          key: match.address,
          onCreateToggle: setCreateSeed,
          onRemove: _onRemove
        })))
      })]
    }), createSeed && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Create.default, {
      onClose: _clearSeed,
      onStatusChange: onStatusChange,
      seed: createSeed,
      type: type
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(VanityApp).withConfig({
  displayName: "Vanity",
  componentId: "sc-1frwcu8-0"
})([".vanity--App-matches{overflow-x:auto;padding:1em 0;}.vanity--App-stats{padding:1em 0 0 0;opacity:0.45;text-align:center;}"]));

exports.default = _default;