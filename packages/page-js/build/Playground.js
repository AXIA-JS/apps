import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/app-js authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, Dropdown, Editor, Tabs } from '@axia-js/react-components';
import { useApi, useToggle } from '@axia-js/react-hooks';
import * as types from '@axia-js/types';
import uiKeyring from '@axia-js/ui-keyring';
import * as util from '@axia-js/util';
import * as hashing from '@axia-js/util-crypto';
import makeWrapper from "./snippets/wrapping.js";
import ActionButtons from "./ActionButtons.js";
import { CUSTOM_LABEL, STORE_EXAMPLES, STORE_SELECTED } from "./constants.js";
import Output from "./Output.js";
import allSnippets from "./snippets/index.js";
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
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
const snippets = JSON.parse(JSON.stringify(allSnippets));
let hasSnippetWrappers = false;

function setupInjected({
  api,
  isDevelopment
}, setIsRunning, hookConsole) {
  return _objectSpread(_objectSpread({}, Object.keys(window).filter(key => !key.includes('-') && !ALLOWED_GLOBALS.includes(key)).reduce((result, key) => {
    result[key] = null;
    return result;
  }, _objectSpread({}, DEFAULT_NULL))), {}, {
    api: api.clone(),
    console: {
      error: (...args) => hookConsole('error', args),
      log: (...args) => hookConsole('log', args)
    },
    hashing,
    keyring: isDevelopment ? uiKeyring.keyring : null,
    setIsRunning,
    types,
    uiKeyring: isDevelopment ? uiKeyring : null,
    util
  });
} // FIXME This... ladies & gentlemen, is a mess that should be untangled


function Playground({
  basePath,
  className = ''
}) {
  const {
    t
  } = useTranslation();
  const apiProps = useApi();
  const injectedRef = useRef(null);
  const [code, setCode] = useState('');
  const [isCustomExample, setIsCustomExample] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isWarnOpen, toggleWarnOpen] = useToggle(true);
  const [customExamples, setCustomExamples] = useState([]);
  const [logs, setLogs] = useState([]);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(snippets[0]);
  const tabsRef = useRef([{
    isRoot: true,
    name: 'playground',
    text: t('Console')
  }]); // initialize all options

  useEffect(() => {
    // add snippets if not already available (global)
    if (!hasSnippetWrappers) {
      snippets.forEach(snippet => {
        snippet.code = `${makeWrapper(apiProps.isDevelopment)}${snippet.code}`;
      });
      hasSnippetWrappers = true;
    }

    const localData = {
      examples: localStorage.getItem(STORE_EXAMPLES),
      selectedValue: localStorage.getItem(STORE_SELECTED)
    };
    const customExamples = localData.examples ? JSON.parse(localData.examples) : [];
    const options = [...customExamples, ...snippets];
    const selected = options.find(option => option.value === localData.selectedValue);
    setCustomExamples(customExamples);
    setIsCustomExample(selected && selected.type === 'custom' || false);
    setOptions(options);
    setSelected(selected || snippets[0]); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setCode(selected.code);
  }, [selected]);

  const _clearConsole = useCallback(() => setLogs([]), []);

  const _hookConsole = useCallback((type, args) => {
    logs.push({
      args,
      type
    });
    setLogs(logs.slice(0));
  }, [logs]);

  const _stopJs = useCallback(() => {
    if (injectedRef.current) {
      injectedRef.current.api.disconnect().catch(console.error);
      injectedRef.current = null;
    }

    setIsRunning(false);
  }, []);

  const _runJs = useCallback(async () => {
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

  const _selectExample = useCallback(value => {
    _stopJs();

    if (value.length) {
      const option = options.find(option => option.value === value);

      if (option) {
        localStorage.setItem(STORE_SELECTED, value);

        _clearConsole();

        setIsCustomExample(option.type === 'custom');
        setSelected(option);
      }
    }
  }, [_clearConsole, _stopJs, options]);

  const _removeSnippet = useCallback(() => {
    const filtered = customExamples.filter(value => value.value !== selected.value);
    const nextOptions = [...filtered, ...snippets];
    setCustomExamples(filtered);
    setIsCustomExample(nextOptions[0].type === 'custom');
    setOptions(nextOptions);

    _selectExample(nextOptions[0].value);

    localStorage.setItem(STORE_EXAMPLES, JSON.stringify(filtered));
  }, [_selectExample, customExamples, selected.value]);

  const _saveSnippet = useCallback(snippetName => {
    // The <Dropdown> component doesn't take boolean custom props and no
    // camelCase keys, that's why 'custom' is passed as a string here
    const snapshot = {
      code,
      label: CUSTOM_LABEL,
      text: snippetName,
      type: 'custom',
      value: `custom-${Date.now()}`
    };
    const options = [snapshot, ...customExamples, ...snippets];
    localStorage.setItem(STORE_EXAMPLES, JSON.stringify([snapshot, ...customExamples]));
    setCustomExamples([snapshot, ...customExamples]);
    setIsCustomExample(true);
    setOptions(options);
    setSelected(snapshot);
  }, [code, customExamples]);

  const snippetName = selected.type === 'custom' ? selected.text : undefined;
  return /*#__PURE__*/_jsxs("main", {
    className: `js--App ${className}`,
    children: [/*#__PURE__*/_jsx(Tabs, {
      basePath: basePath,
      items: tabsRef.current
    }), /*#__PURE__*/_jsx("section", {
      className: "js--Selection",
      children: /*#__PURE__*/_jsx(Dropdown, {
        className: "js--Dropdown",
        isFull: true,
        label: t('Select example'),
        onChange: _selectExample,
        options: options,
        value: selected.value
      })
    }), /*#__PURE__*/_jsxs("section", {
      className: "js--Content",
      children: [/*#__PURE__*/_jsxs("article", {
        className: "container js--Editor",
        children: [/*#__PURE__*/_jsx(ActionButtons, {
          isCustomExample: isCustomExample,
          isRunning: isRunning,
          removeSnippet: _removeSnippet,
          runJs: _runJs,
          saveSnippet: _saveSnippet,
          snippetName: snippetName,
          stopJs: _stopJs
        }), /*#__PURE__*/_jsx(Editor, {
          code: code,
          onEdit: setCode
        })]
      }), /*#__PURE__*/_jsx(Output, {
        className: "js--Output",
        logs: logs,
        children: /*#__PURE__*/_jsx(Button, {
          className: "action-button",
          icon: "eraser",
          onClick: _clearConsole
        })
      })]
    }), isWarnOpen && /*#__PURE__*/_jsx("div", {
      className: "warnOverlay",
      children: /*#__PURE__*/_jsxs("article", {
        className: "warning centered",
        children: [/*#__PURE__*/_jsx("p", {
          children: t('This is a developer tool that allows you to execute selected snippets in a limited context.')
        }), /*#__PURE__*/_jsx("p", {
          children: t('Never execute JS snippets from untrusted sources.')
        }), /*#__PURE__*/_jsx("p", {
          children: t('Unless you are a developer with insight into what the specific script does to your environment (based on reading the code being executed) generally the advice would be to not use this environment.')
        }), /*#__PURE__*/_jsx(Button.Group, {
          children: /*#__PURE__*/_jsx(Button, {
            icon: "times",
            label: t('Close'),
            onClick: toggleWarnOpen
          })
        })]
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Playground).withConfig({
  displayName: "Playground",
  componentId: "sc-11iooi2-0"
})(["display:flex;flex-direction:column;height:100vh;position:relative;article{p:last-child{margin-bottom:0;}}.js--Selection{margin-bottom:1rem;}.js--Content{align-content:stretch;align-items:stretch;display:flex;height:100%;justify-content:space-between;margin-bottom:0;}.js--Dropdown{position:relative;z-index:200;.dropdown .menu > .item{display:flex;flex-direction:row-reverse;justify-content:space-between;}}.js--Editor,.js--Output{min-width:200px;.action-button{margin:0;position:absolute;right:0.5rem;top:0.5rem;z-index:100;}}.js--Editor{flex-grow:1;overflow:auto;padding:0;position:relative;resize:horizontal;width:60%;textarea{outline:0;}.codeflask{background:transparent;}.codeflask--has-line-numbers{z-index:0;}.codeflask--has-line-numbers .codeflask__flatten{font-size:12px;line-height:18px;min-width:calc(100% - 40px);padding-top:50px;width:auto;}.codeflask__lines{background:#f2f2f2;line-height:18px;padding-top:50px;z-index:100;}&::after{bottom:0;content:'\u2194';cursor:col-resize;font-size:20px;height:20px;line-height:18px;position:absolute;right:0;width:22px;z-index:1;}}.ui.popup.popup-local{display:flex;flex:1 1 100%;max-width:300px;}.warnOverlay{left:0;position:absolute;right:0;top:-0.25rem;z-index:202;article p:first-child{padding-top:1rem;}.ui--Button-Group{margin-bottom:0;}}"]));