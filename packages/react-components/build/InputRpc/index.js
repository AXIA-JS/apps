// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
// TODO: We have a lot shared between this and InputExtrinsic & InputStorage
import React, { useCallback, useEffect, useState } from 'react';
import { useApi } from '@axia-js/react-hooks';
import LinkedWrapper from "../InputExtrinsic/LinkedWrapper.js";
import methodOptions from "./options/method.js";
import sectionOptions from "./options/section.js";
import SelectMethod from "./SelectMethod.js";
import SelectSection from "./SelectSection.js";
import useRpcs from "./useRpcs.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function InputRpc({
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
  const rpcs = useRpcs();
  const [optionsMethod, setOptionsMethod] = useState(() => methodOptions(api, rpcs, defaultValue.section));
  const [optionsSection] = useState(() => sectionOptions(api));
  const [value, setValue] = useState(() => defaultValue);
  useEffect(() => {
    onChange && onChange(value);
  }, [onChange, value]);

  const _onMethodChange = useCallback(newValue => {
    if (value.section === newValue.section && value.method === newValue.method) {
      return;
    } // set via callback since the method is a function itself


    setValue(() => newValue);
  }, [value]);

  const _onSectionChange = useCallback(section => {
    if (section === value.section) {
      return;
    }

    const optionsMethod = methodOptions(api, rpcs, section);
    setOptionsMethod(optionsMethod);

    _onMethodChange(rpcs[section][optionsMethod[0].value]);
  }, [_onMethodChange, api, rpcs, value]);

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
    }), /*#__PURE__*/_jsx(SelectMethod, {
      className: "large",
      onChange: _onMethodChange,
      options: optionsMethod,
      value: value
    })]
  });
}

export default /*#__PURE__*/React.memo(InputRpc);