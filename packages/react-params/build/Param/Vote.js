// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useRef } from 'react';
import { Dropdown } from '@axia-js/react-components';
import { GenericVote } from '@axia-js/types';
import { isBn } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import Bare from "./Bare.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function doChange(onChange) {
  return function (value) {
    onChange && onChange({
      isValid: true,
      value
    });
  };
}

function Vote({
  className = '',
  defaultValue: {
    value
  },
  isDisabled,
  isError,
  onChange,
  withLabel
}) {
  const {
    t
  } = useTranslation();
  const optAyeRef = useRef([{
    text: t('Nay'),
    value: 0
  }, {
    text: t('Aye'),
    value: -1
  }]);
  const optConvRef = useRef([{
    text: t('None'),
    value: 0
  }, {
    text: t('Locked1x'),
    value: 1
  }, {
    text: t('Locked2x'),
    value: 2
  }, {
    text: t('Locked3x'),
    value: 3
  }, {
    text: t('Locked4x'),
    value: 4
  }, {
    text: t('Locked5x'),
    value: 5
  }, {
    text: t('Locked6x'),
    value: 6
  }]);
  const defaultValue = isBn(value) ? value.toNumber() : value instanceof GenericVote ? value.isAye ? -1 : 0 : value;
  const defaultConv = value instanceof GenericVote ? value.conviction.index : 0;
  return /*#__PURE__*/_jsxs(Bare, {
    className: className,
    children: [/*#__PURE__*/_jsx(Dropdown, {
      className: "full",
      defaultValue: defaultValue,
      isDisabled: isDisabled,
      isError: isError,
      label: t('aye: bool'),
      onChange: doChange(onChange),
      options: optAyeRef.current,
      withLabel: withLabel
    }), isDisabled && /*#__PURE__*/_jsx(Dropdown, {
      className: "full",
      defaultValue: defaultConv,
      isDisabled: isDisabled,
      isError: isError,
      label: t('conviction: Conviction'),
      options: optConvRef.current,
      withLabel: withLabel
    })]
  });
}

export default /*#__PURE__*/React.memo(Vote);