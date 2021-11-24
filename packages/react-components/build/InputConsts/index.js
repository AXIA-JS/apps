import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useState } from 'react';
import { useApi } from '@axia-js/react-hooks';
import LinkedWrapper from "../InputExtrinsic/LinkedWrapper.js";
import keyOptions from "./options/key.js";
import sectionOptions from "./options/section.js";
import SelectKey from "./SelectKey.js";
import SelectSection from "./SelectSection.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function getValue(api, {
  method,
  section
}) {
  const firstSec = Object.keys(api.consts)[0];
  const firstMet = Object.keys(api.consts[firstSec])[0];
  const value = api.consts[section] && api.consts[section][method] ? {
    method,
    section
  } : {
    method: firstMet,
    section: firstSec
  };
  return _objectSpread(_objectSpread({}, value), {}, {
    meta: api.consts[value.section][value.method].meta
  });
}

function InputConsts({
  className = '',
  defaultValue,
  help,
  label,
  onChange,
  withLabel
}) {
  const {
    api
  } = useApi();
  const [optionsMethod, setOptionsMethod] = useState(() => keyOptions(api, defaultValue.section));
  const [optionsSection] = useState(() => sectionOptions(api));
  const [value, setValue] = useState(() => getValue(api, defaultValue));

  const _onKeyChange = useCallback(newValue => {
    if (value.section === newValue.section && value.method === newValue.method) {
      return;
    }

    const {
      method,
      section
    } = newValue;
    const meta = api.consts[section][method].meta;
    const updated = {
      meta,
      method,
      section
    };
    setValue(updated);
    onChange && onChange(updated);
  }, [api, onChange, value]);

  const _onSectionChange = useCallback(section => {
    if (section === value.section) {
      return;
    }

    const optionsMethod = keyOptions(api, section);
    setOptionsMethod(optionsMethod);

    _onKeyChange({
      method: optionsMethod[0].value,
      section
    });
  }, [_onKeyChange, api, value]);

  return /*#__PURE__*/_jsxs(LinkedWrapper, {
    className: className,
    help: help,
    label: label,
    withLabel: withLabel,
    children: [/*#__PURE__*/_jsx(SelectSection, {
      className: "small",
      onChange: _onSectionChange,
      options: optionsSection,
      value: value
    }), /*#__PURE__*/_jsx(SelectKey, {
      className: "large",
      onChange: _onKeyChange,
      options: optionsMethod,
      value: value
    })]
  });
}

export default /*#__PURE__*/React.memo(InputConsts);