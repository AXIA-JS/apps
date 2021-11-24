"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactI18next = require("react-i18next");

var _store = _interopRequireDefault(require("store"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _urlTypes = require("@axia-js/react-api/urlTypes");

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0
const EMPTY_CODE = '{\n\n}';
const EMPTY_TYPES = {};

function Developer(_ref) {
  let {
    className = '',
    onStatusChange
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [code, setCode] = (0, _react.useState)(EMPTY_CODE);
  const [isJsonValid, setIsJsonValid] = (0, _react.useState)(true);
  const [isTypesValid, setIsTypesValid] = (0, _react.useState)(true);
  const [types, setTypes] = (0, _react.useState)(EMPTY_TYPES);
  const [typesPlaceholder, setTypesPlaceholder] = (0, _react.useState)(null);
  const [sharedUrl, setSharedUrl] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    const types = (0, _urlTypes.decodeUrlTypes)() || _store.default.get('types') || {};

    if (Object.keys(types).length) {
      setCode(JSON.stringify(types, null, 2));
      setTypes({});
      setTypesPlaceholder(Object.keys(types).join(', '));
      setSharedUrl((0, _urlTypes.encodeUrlTypes)(types));
    }
  }, []);

  const _setState = (0, _react.useCallback)(_ref2 => {
    let {
      code,
      isJsonValid,
      isTypesValid,
      types,
      typesPlaceholder
    } = _ref2;
    setCode(code);
    setIsJsonValid(isJsonValid);
    setIsTypesValid(isTypesValid);
    setTypes(types);
    setTypesPlaceholder(typesPlaceholder);
  }, []);

  const _clearTypes = (0, _react.useCallback)(() => {
    _store.default.remove('types');

    _setState({
      code: EMPTY_CODE,
      isJsonValid: true,
      isTypesValid: true,
      types: EMPTY_TYPES,
      typesPlaceholder: null
    });
  }, [_setState]);

  const _onChangeTypes = (0, _react.useCallback)(data => {
    const code = (0, _util.u8aToString)(data);

    try {
      const types = JSON.parse(code);
      const typesPlaceholder = Object.keys(types).join(', ');
      console.log('Detected types:', typesPlaceholder);

      _setState({
        code,
        isJsonValid: true,
        isTypesValid: true,
        types: Object.keys(types).length === 0 ? {} : types,
        typesPlaceholder
      });
    } catch (error) {
      console.error('Error registering types:', error);

      _setState({
        code,
        isJsonValid: false,
        isTypesValid: false,
        types: {},
        typesPlaceholder: error.message
      });
    }
  }, [_setState]);

  const _onEditTypes = (0, _react.useCallback)(code => {
    try {
      if (!(0, _util.isJsonObject)(code)) {
        throw Error(t('This is not a valid JSON object.'));
      }

      _onChangeTypes((0, _util.stringToU8a)(code));
    } catch (error) {
      setCode(code);
      setIsJsonValid(false);
      setTypesPlaceholder(error.message);
    }
  }, [_onChangeTypes, t]);

  const _saveDeveloper = (0, _react.useCallback)(() => {
    let url = null;

    try {
      api.registerTypes(types);

      _store.default.set('types', types);

      setIsTypesValid(true);
      onStatusChange({
        action: t('Your custom types have been added'),
        status: 'success'
      });

      if (Object.keys(types).length) {
        url = (0, _urlTypes.encodeUrlTypes)(types);
        console.log(url);
      }
    } catch (error) {
      console.error(error);
      setIsTypesValid(false);
      onStatusChange({
        action: t(`Error saving your custom types. ${error.message}`),
        status: 'error'
      });
    }

    setSharedUrl(url);
  }, [api, onStatusChange, t, types]);

  const typesHasNoEntries = Object.keys(types).length === 0; // Trans component

  /* eslint-disable react/jsx-max-props-per-line */

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "ui--row",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "full",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputFile, {
          clearContent: typesHasNoEntries && isTypesValid,
          help: t('Save the type definitions for your custom structures as key-value pairs in a valid JSON file. The key should be the name of your custom structure and the value an object containing your type definitions.'),
          isError: !isTypesValid,
          label: t('Additional types as a JSON file (or edit below)'),
          onChange: _onChangeTypes,
          placeholder: typesPlaceholder
        })
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "ui--row",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "full",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Editor, {
          className: "editor",
          code: code,
          isValid: isJsonValid,
          onEdit: _onEditTypes
        })
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "ui--row",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "full",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactI18next.Trans, {
          i18nKey: "devConfig",
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: "help",
            children: ["If you are a development team with at least a test network available, consider adding the types directly ", /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
              href: "https://github.com/axia-js/apps/tree/master/packages/apps-config",
              rel: "noopener noreferrer",
              target: "_blank",
              children: "to the apps-config"
            }), ", allowing out of the box operation for your spec & chains, both for you and anybody trying to connect to it. This is not a replacement for your chain-specific UI, however doing so does help in allowing users to easily discover and use with zero-config."]
          })
        })
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Button.Group, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CopyButton, {
        label: t('Share'),
        type: t('url'),
        value: sharedUrl
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "sync",
        label: t('Reset'),
        onClick: _clearTypes
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "save",
        isDisabled: !isTypesValid || !isJsonValid,
        label: t('Save'),
        onClick: _saveDeveloper
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Developer).withConfig({
  displayName: "Developer",
  componentId: "sc-1mi24va-0"
})([".editor{height:21rem;margin-left:2rem;position:relative;}.help{padding:0.5rem 2rem;}"]));

exports.default = _default;