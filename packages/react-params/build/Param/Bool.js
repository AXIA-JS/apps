// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useRef, useState } from 'react';
import { Dropdown } from '@axia-js/react-components';
import { isBoolean } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import Bare from "./Bare.js";
import { jsx as _jsx } from "react/jsx-runtime";

function BoolParam({
  className = '',
  defaultValue: {
    value
  },
  isDisabled,
  isError,
  label,
  onChange,
  withLabel
}) {
  const {
    t
  } = useTranslation();
  const [defaultValue] = useState(value instanceof Boolean ? value.valueOf() : isBoolean(value) ? value : false);
  const options = useRef([{
    text: t('No'),
    value: false
  }, {
    text: t('Yes'),
    value: true
  }]);

  const _onChange = useCallback(value => onChange && onChange({
    isValid: true,
    value
  }), [onChange]);

  return /*#__PURE__*/_jsx(Bare, {
    className: className,
    children: /*#__PURE__*/_jsx(Dropdown, {
      className: "full",
      defaultValue: defaultValue,
      isDisabled: isDisabled,
      isError: isError,
      label: label,
      onChange: _onChange,
      options: options.current,
      withEllipsis: true,
      withLabel: withLabel
    })
  });
}

export default /*#__PURE__*/React.memo(BoolParam);