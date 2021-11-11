// Copyright 2017-2021 @axia-js/app-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import store from 'store';
import styled from 'styled-components';
import { decodeUrlTypes, encodeUrlTypes } from '@axia-js/react-api/urlTypes';
import { Button, CopyButton, Editor, InputFile } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import { isJsonObject, stringToU8a, u8aToString } from '@axia-js/util';
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const EMPTY_CODE = '{\n\n}';
const EMPTY_TYPES = {};

function Developer({
  className = '',
  onStatusChange
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [code, setCode] = useState(EMPTY_CODE);
  const [isJsonValid, setIsJsonValid] = useState(true);
  const [isTypesValid, setIsTypesValid] = useState(true);
  const [types, setTypes] = useState(EMPTY_TYPES);
  const [typesPlaceholder, setTypesPlaceholder] = useState(null);
  const [sharedUrl, setSharedUrl] = useState(null);
  useEffect(() => {
    const types = decodeUrlTypes() || store.get('types') || {};

    if (Object.keys(types).length) {
      setCode(JSON.stringify(types, null, 2));
      setTypes({});
      setTypesPlaceholder(Object.keys(types).join(', '));
      setSharedUrl(encodeUrlTypes(types));
    }
  }, []);

  const _setState = useCallback(({
    code,
    isJsonValid,
    isTypesValid,
    types,
    typesPlaceholder
  }) => {
    setCode(code);
    setIsJsonValid(isJsonValid);
    setIsTypesValid(isTypesValid);
    setTypes(types);
    setTypesPlaceholder(typesPlaceholder);
  }, []);

  const _clearTypes = useCallback(() => {
    store.remove('types');

    _setState({
      code: EMPTY_CODE,
      isJsonValid: true,
      isTypesValid: true,
      types: EMPTY_TYPES,
      typesPlaceholder: null
    });
  }, [_setState]);

  const _onChangeTypes = useCallback(data => {
    const code = u8aToString(data);

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

  const _onEditTypes = useCallback(code => {
    try {
      if (!isJsonObject(code)) {
        throw Error(t('This is not a valid JSON object.'));
      }

      _onChangeTypes(stringToU8a(code));
    } catch (error) {
      setCode(code);
      setIsJsonValid(false);
      setTypesPlaceholder(error.message);
    }
  }, [_onChangeTypes, t]);

  const _saveDeveloper = useCallback(() => {
    let url = null;

    try {
      api.registerTypes(types);
      store.set('types', types);
      setIsTypesValid(true);
      onStatusChange({
        action: t('Your custom types have been added'),
        status: 'success'
      });

      if (Object.keys(types).length) {
        url = encodeUrlTypes(types);
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

  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsx("div", {
      className: "ui--row",
      children: /*#__PURE__*/_jsx("div", {
        className: "full",
        children: /*#__PURE__*/_jsx(InputFile, {
          clearContent: typesHasNoEntries && isTypesValid,
          help: t('Save the type definitions for your custom structures as key-value pairs in a valid JSON file. The key should be the name of your custom structure and the value an object containing your type definitions.'),
          isError: !isTypesValid,
          label: t('Additional types as a JSON file (or edit below)'),
          onChange: _onChangeTypes,
          placeholder: typesPlaceholder
        })
      })
    }), /*#__PURE__*/_jsx("div", {
      className: "ui--row",
      children: /*#__PURE__*/_jsx("div", {
        className: "full",
        children: /*#__PURE__*/_jsx(Editor, {
          className: "editor",
          code: code,
          isValid: isJsonValid,
          onEdit: _onEditTypes
        })
      })
    }), /*#__PURE__*/_jsx("div", {
      className: "ui--row",
      children: /*#__PURE__*/_jsx("div", {
        className: "full",
        children: /*#__PURE__*/_jsx(Trans, {
          i18nKey: "devConfig",
          children: /*#__PURE__*/_jsxs("div", {
            className: "help",
            children: ["If you are a development team with at least a test network available, consider adding the types directly ", /*#__PURE__*/_jsx("a", {
              href: "https://github.com/axia-js/apps/tree/master/packages/apps-config",
              rel: "noopener noreferrer",
              target: "_blank",
              children: "to the apps-config"
            }), ", allowing out of the box operation for your spec & chains, both for you and anybody trying to connect to it. This is not a replacement for your chain-specific UI, however doing so does help in allowing users to easily discover and use with zero-config."]
          })
        })
      })
    }), /*#__PURE__*/_jsxs(Button.Group, {
      children: [/*#__PURE__*/_jsx(CopyButton, {
        label: t('Share'),
        type: t('url'),
        value: sharedUrl
      }), /*#__PURE__*/_jsx(Button, {
        icon: "sync",
        label: t('Reset'),
        onClick: _clearTypes
      }), /*#__PURE__*/_jsx(Button, {
        icon: "save",
        isDisabled: !isTypesValid || !isJsonValid,
        label: t('Save'),
        onClick: _saveDeveloper
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Developer).withConfig({
  displayName: "Developer",
  componentId: "sc-18ldj78-0"
})([".editor{height:21rem;margin-left:2rem;position:relative;}.help{padding:0.5rem 2rem;}"]));