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

var types = _interopRequireWildcard(require("@axia-js/types"));

var _uiKeyring = _interopRequireDefault(require("@axia-js/ui-keyring"));

var util = _interopRequireWildcard(require("@axia-js/util"));

var hashing = _interopRequireWildcard(require("@axia-js/util-crypto"));

var _wrapping = _interopRequireDefault(require("./snippets/wrapping.cjs"));

var _ActionButtons = _interopRequireDefault(require("./ActionButtons.cjs"));

var _constants = require("./constants.cjs");

var _Output = _interopRequireDefault(require("./Output.cjs"));

var _index = _interopRequireDefault(require("./snippets/index.cjs"));

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const ALLOWED_GLOBALS = ['atob', 'btoa'];
const DEFAULT_NULL = {
  Atomics: null,
  Bluetooth: null,
  Clipboard: null,
  Document: null,
  Function: null,
  Location: null,
  ServiceWorker: null,
  SharedWorker: null,
  USB: null,
  global: null,
  window: null
};
const snippets = JSON.parse(JSON.stringify(_index.default));
let hasSnippetWrappers = false;

function setupInjected(_ref, setIsRunning, hookConsole) {
  let {
    api,
    isDevelopment
  } = _ref;
  return _objectSpread(_objectSpread({}, Object.keys(window).filter(key => !key.includes('-') && !ALLOWED_GLOBALS.includes(key)).reduce((result, key) => {
    result[key] = null;
    return result;
  }, _objectSpread({}, DEFAULT_NULL))), {}, {
    api: api.clone(),
    console: {
      error: function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return hookConsole('error', args);
      },
      log: function () {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return hookConsole('log', args);
      }
    },
    hashing,
    keyring: isDevelopment ? _uiKeyring.default.keyring : null,
    setIsRunning,
    types,
    uiKeyring: isDevelopment ? _uiKeyring.default : null,
    util
  });
} // FIXME This... ladies & gentlemen, is a mess that should be untangled


function Playground(_ref2) {
  let {
    basePath,
    className = ''
  } = _ref2;
  const {
    t
  } = (0, _translate.useTranslation)();
  const apiProps = (0, _reactHooks.useApi)();
  const injectedRef = (0, _react.useRef)(null);
  const [code, setCode] = (0, _react.useState)('');
  const [isCustomExample, setIsCustomExample] = (0, _react.useState)(false);
  const [isRunning, setIsRunning] = (0, _react.useState)(false);
  const [isWarnOpen, toggleWarnOpen] = (0, _reactHooks.useToggle)(true);
  const [customExamples, setCustomExamples] = (0, _react.useState)([]);
  const [logs, setLogs] = (0, _react.useState)([]);
  const [options, setOptions] = (0, _react.useState)([]);
  const [selected, setSelected] = (0, _react.useState)(snippets[0]);
  const tabsRef = (0, _react.useRef)([{
    isRoot: true,
    name: 'playground',
    text: t('Console')
  }]); // initialize all options

  (0, _react.useEffect)(() => {
    // add snippets if not already available (global)
    if (!hasSnippetWrappers) {
      snippets.forEach(snippet => {
        snippet.code = `${(0, _wrapping.default)(apiProps.isDevelopment)}${snippet.code}`;
      });
      hasSnippetWrappers = true;
    }

    const localData = {
      examples: localStorage.getItem(_constants.STORE_EXAMPLES),
      selectedValue: localStorage.getItem(_constants.STORE_SELECTED)
    };
    const customExamples = localData.examples ? JSON.parse(localData.examples) : [];
    const options = [...customExamples, ...snippets];
    const selected = options.find(option => option.value === localData.selectedValue);
    setCustomExamples(customExamples);
    setIsCustomExample(selected && selected.type === 'custom' || false);
    setOptions(options);
    setSelected(selected || snippets[0]); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  (0, _react.useEffect)(() => {
    setCode(selected.code);
  }, [selected]);

  const _clearConsole = (0, _react.useCallback)(() => setLogs([]), []);

  const _hookConsole = (0, _react.useCallback)((type, args) => {
    logs.push({
      args,
      type
    });
    setLogs(logs.slice(0));
  }, [logs]);

  const _stopJs = (0, _react.useCallback)(() => {
    if (injectedRef.current) {
      injectedRef.current.api.disconnect().catch(console.error);
      injectedRef.current = null;
    }

    setIsRunning(false);
  }, []);

  const _runJs = (0, _react.useCallback)(async () => {
    setIsRunning(true);

    _clearConsole();

    injectedRef.current = setupInjected(apiProps, setIsRunning, _hookConsole);
    await injectedRef.current.api.isReady;

    try {
      // squash into a single line so exceptions (with line numbers) maps to the
      // same line/origin as we have in the editor view
      // TODO: Make the console.error here actually return the full stack
      const exec = `(async ({${Object.keys(injectedRef.current).sort().join(',')}}) => { try { ${code} \n } catch (error) { console.error(error); setIsRunning(false); } })(injected);`; // eslint-disable-next-line no-new-func,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-implied-eval

      new Function('injected', exec).bind({}, injectedRef.current)();
    } catch (error) {
      injectedRef.current.console.error(error);
    }

    setIsRunning(false);
  }, [_clearConsole, _hookConsole, apiProps, code]);

  const _selectExample = (0, _react.useCallback)(value => {
    _stopJs();

    if (value.length) {
      const option = options.find(option => option.value === value);

      if (option) {
        localStorage.setItem(_constants.STORE_SELECTED, value);

        _clearConsole();

        setIsCustomExample(option.type === 'custom');
        setSelected(option);
      }
    }
  }, [_clearConsole, _stopJs, options]);

  const _removeSnippet = (0, _react.useCallback)(() => {
    const filtered = customExamples.filter(value => value.value !== selected.value);
    const nextOptions = [...filtered, ...snippets];
    setCustomExamples(filtered);
    setIsCustomExample(nextOptions[0].type === 'custom');
    setOptions(nextOptions);

    _selectExample(nextOptions[0].value);

    localStorage.setItem(_constants.STORE_EXAMPLES, JSON.stringify(filtered));
  }, [_selectExample, customExamples, selected.value]);

  const _saveSnippet = (0, _react.useCallback)(snippetName => {
    // The <Dropdown> component doesn't take boolean custom props and no
    // camelCase keys, that's why 'custom' is passed as a string here
    const snapshot = {
      code,
      label: _constants.CUSTOM_LABEL,
      text: snippetName,
      type: 'custom',
      value: `custom-${Date.now()}`
    };
    const options = [snapshot, ...customExamples, ...snippets];
    localStorage.setItem(_constants.STORE_EXAMPLES, JSON.stringify([snapshot, ...customExamples]));
    setCustomExamples([snapshot, ...customExamples]);
    setIsCustomExample(true);
    setOptions(options);
    setSelected(snapshot);
  }, [code, customExamples]);

  const snippetName = selected.type === 'custom' ? selected.text : undefined;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("main", {
    className: `js--App ${className}`,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Tabs, {
      basePath: basePath,
      items: tabsRef.current
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("section", {
      className: "js--Selection",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Dropdown, {
        className: "js--Dropdown",
        isFull: true,
        label: t('Select example'),
        onChange: _selectExample,
        options: options,
        value: selected.value
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
      className: "js--Content",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("article", {
        className: "container js--Editor",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ActionButtons.default, {
          isCustomExample: isCustomExample,
          isRunning: isRunning,
          removeSnippet: _removeSnippet,
          runJs: _runJs,
          saveSnippet: _saveSnippet,
          snippetName: snippetName,
          stopJs: _stopJs
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Editor, {
          code: code,
          onEdit: setCode
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Output.default, {
        className: "js--Output",
        logs: logs,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
          className: "action-button",
          icon: "eraser",
          onClick: _clearConsole
        })
      })]
    }), isWarnOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "warnOverlay",
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("article", {
        className: "warning centered",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          children: t('This is a developer tool that allows you to execute selected snippets in a limited context.')
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          children: t('Never execute JS snippets from untrusted sources.')
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          children: t('Unless you are a developer with insight into what the specific script does to your environment (based on reading the code being executed) generally the advice would be to not use this environment.')
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button.Group, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
            icon: "times",
            label: t('Close'),
            onClick: toggleWarnOpen
          })
        })]
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Playground).withConfig({
  displayName: "Playground",
  componentId: "sc-11iooi2-0"
})(["display:flex;flex-direction:column;height:100vh;position:relative;article{p:last-child{margin-bottom:0;}}.js--Selection{margin-bottom:1rem;}.js--Content{align-content:stretch;align-items:stretch;display:flex;height:100%;justify-content:space-between;margin-bottom:0;}.js--Dropdown{position:relative;z-index:200;.dropdown .menu > .item{display:flex;flex-direction:row-reverse;justify-content:space-between;}}.js--Editor,.js--Output{min-width:200px;.action-button{margin:0;position:absolute;right:0.5rem;top:0.5rem;z-index:100;}}.js--Editor{flex-grow:1;overflow:auto;padding:0;position:relative;resize:horizontal;width:60%;textarea{outline:0;}.codeflask{background:transparent;}.codeflask--has-line-numbers{z-index:0;}.codeflask--has-line-numbers .codeflask__flatten{font-size:12px;line-height:18px;min-width:calc(100% - 40px);padding-top:50px;width:auto;}.codeflask__lines{background:#f2f2f2;line-height:18px;padding-top:50px;z-index:100;}&::after{bottom:0;content:'\u2194';cursor:col-resize;font-size:20px;height:20px;line-height:18px;position:absolute;right:0;width:22px;z-index:1;}}.ui.popup.popup-local{display:flex;flex:1 1 100%;max-width:300px;}.warnOverlay{left:0;position:absolute;right:0;top:-0.25rem;z-index:202;article p:first-child{padding-top:1rem;}.ui--Button-Group{margin-bottom:0;}}"]));

exports.default = _default;