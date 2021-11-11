// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
// TODO: We have a lot shared between this and InputExtrinsic
import React, { useCallback, useState } from 'react';
import { useApi } from '@axia-js/react-hooks';
import LinkedWrapper from "../InputExtrinsic/LinkedWrapper.js";
import keyOptions from "./options/key.js";
import sectionOptions from "./options/section.js";
import SelectKey from "./SelectKey.js";
import SelectSection from "./SelectSection.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function InputStorage({
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
  const [optionsMethod, setOptionsMethod] = useState(() => keyOptions(api, defaultValue.creator.section));
  const [optionsSection] = useState(() => sectionOptions(api));
  const [value, setValue] = useState(() => defaultValue);

  const _onKeyChange = useCallback(newValue => {
    if (value.creator.section !== newValue.creator.section || value.creator.method !== newValue.creator.method) {
      // set via callback
      setValue(() => newValue);
      onChange && onChange(newValue);
    }
  }, [onChange, value]);

  const _onSectionChange = useCallback(section => {
    if (section !== value.creator.section) {
      const optionsMethod = keyOptions(api, section);
      setOptionsMethod(optionsMethod);

      _onKeyChange(api.query[section][optionsMethod[0].value]);
    }
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

export default /*#__PURE__*/React.memo(InputStorage);