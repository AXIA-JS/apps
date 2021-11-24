// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useState } from 'react';
import { useApi } from '@axia-js/react-hooks';
import methodOptions from "./options/method.js";
import sectionOptions from "./options/section.js";
import LinkedWrapper from "./LinkedWrapper.js";
import SelectMethod from "./SelectMethod.js";
import SelectSection from "./SelectSection.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function InputExtrinsic({
  className = '',
  defaultValue,
  help,
  isDisabled,
  label,
  onChange,
  withLabel
}) {
  const {
    api
  } = useApi();
  const [optionsMethod, setOptionsMethod] = useState(() => methodOptions(api, defaultValue.section));
  const [optionsSection] = useState(() => sectionOptions(api));
  const [value, setValue] = useState(() => defaultValue);

  const _onKeyChange = useCallback(newValue => {
    if (value.section === newValue.section && value.method === newValue.method) {
      return;
    } // set this via callback, since the we are setting a function (alternatively... we have issues)


    setValue(() => newValue);
    onChange && onChange(newValue);
  }, [onChange, value]);

  const _onSectionChange = useCallback(section => {
    if (section === value.section) {
      return;
    }

    const optionsMethod = methodOptions(api, section);
    setOptionsMethod(optionsMethod);

    _onKeyChange(api.tx[section][optionsMethod[0].value]);
  }, [_onKeyChange, api, value]);

  return /*#__PURE__*/_jsxs(LinkedWrapper, {
    className: className,
    help: help,
    label: label,
    withLabel: withLabel,
    children: [/*#__PURE__*/_jsx(SelectSection, {
      className: "small",
      defaultValue: isDisabled ? value.section : undefined,
      isDisabled: isDisabled,
      onChange: isDisabled ? undefined : _onSectionChange,
      options: optionsSection,
      value: value
    }), /*#__PURE__*/_jsx(SelectMethod, {
      api: api,
      className: "large",
      defaultValue: isDisabled ? value.method : undefined,
      isDisabled: isDisabled,
      onChange: isDisabled ? undefined : _onKeyChange,
      options: optionsMethod,
      value: value
    })]
  });
}

export default /*#__PURE__*/React.memo(InputExtrinsic);