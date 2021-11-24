// Copyright 2017-2021 @axia-js/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useApi } from '@axia-js/react-hooks';
import { formatBalance, isString } from '@axia-js/util';
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
// for million, 2 * 3-grouping + comma
const M_LENGTH = 6 + 1;
const K_LENGTH = 3 + 1;

function getFormat(registry, formatIndex = 0) {
  const decimals = registry.chainDecimals;
  const tokens = registry.chainTokens;
  return [formatIndex < decimals.length ? decimals[formatIndex] : decimals[0], formatIndex < tokens.length ? tokens[formatIndex] : tokens[1]];
}

function createElement(prefix, postfix, unit, label = '', isShort = false) {
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [`${prefix}${isShort ? '' : '.'}`, !isShort && /*#__PURE__*/_jsx("span", {
      className: "ui--FormatBalance-postfix",
      children: `0000${postfix || ''}`.slice(-4)
    }), /*#__PURE__*/_jsxs("span", {
      className: "ui--FormatBalance-unit",
      children: [" ", unit]
    }), label]
  });
}

function splitFormat(value, label, isShort) {
  const [prefix, postfixFull] = value.split('.');
  const [postfix, unit] = postfixFull.split(' ');
  return createElement(prefix, postfix, unit, label, isShort);
}

function applyFormat(value, [decimals, token], withCurrency = true, withSi, _isShort, labelPost) {
  const [prefix, postfix] = formatBalance(value, {
    decimals,
    forceUnit: '-',
    withSi: false
  }).split('.');
  const isShort = _isShort || withSi && prefix.length >= K_LENGTH;
  const unitPost = withCurrency ? token : '';

  if (prefix.length > M_LENGTH) {
    const [major, rest] = formatBalance(value, {
      decimals,
      withUnit: false
    }).split('.');
    const minor = rest.substr(0, 4);
    const unit = rest.substr(4);
    return /*#__PURE__*/_jsxs(_Fragment, {
      children: [major, ".", /*#__PURE__*/_jsx("span", {
        className: "ui--FormatBalance-postfix",
        children: minor
      }), /*#__PURE__*/_jsxs("span", {
        className: "ui--FormatBalance-unit",
        children: [unit, unit ? unitPost : ` ${unitPost}`]
      }), labelPost || '']
    });
  }

  return createElement(prefix, postfix, unitPost, labelPost, isShort);
}

function FormatBalance({
  children,
  className = '',
  format,
  formatIndex,
  isShort,
  label,
  labelPost,
  value,
  valueFormatted,
  withCurrency,
  withSi
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const formatInfo = useMemo(() => format || getFormat(api.registry, formatIndex), [api, format, formatIndex]); // labelPost here looks messy, however we ensure we have one less text node

  return /*#__PURE__*/_jsxs("div", {
    className: `ui--FormatBalance ${className}`,
    children: [label ? /*#__PURE__*/_jsxs(_Fragment, {
      children: [label, "\xA0"]
    }) : '', /*#__PURE__*/_jsx("span", {
      className: "ui--FormatBalance-value",
      "data-testid": "balance-summary",
      children: valueFormatted ? splitFormat(valueFormatted, labelPost, isShort) : value ? value === 'all' ? t('everything{{labelPost}}', {
        replace: {
          labelPost
        }
      }) : applyFormat(value, formatInfo, withCurrency, withSi, isShort, labelPost) : isString(labelPost) ? `-${labelPost}` : labelPost
    }), children]
  });
}

export default /*#__PURE__*/React.memo(styled(FormatBalance).withConfig({
  displayName: "FormatBalance",
  componentId: "sc-ora4zi-0"
})(["display:inline-block;vertical-align:baseline;white-space:nowrap;*{vertical-align:baseline !important;}> label,> .label{display:inline-block;margin-right:0.25rem;vertical-align:baseline;}.ui--FormatBalance-unit{font-size:0.825em;text-transform:uppercase;}.ui--FormatBalance-value{text-align:right;> .ui--FormatBalance-postfix{font-weight:var(--font-weight-light);opacity:0.7;vertical-align:baseline;}}> .ui--Button{margin-left:0.25rem;}.ui--Icon{margin-bottom:-0.25rem;margin-top:0.25rem;}.ui--Icon+.ui--FormatBalance-value{margin-left:0.375rem;}"]));