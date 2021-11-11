// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { BN_ONE, formatNumber } from '@axia-js/util';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function isSingle(entry) {
  return !Array.isArray(entry);
}

export function createErasString(eras) {
  if (!eras.length) {
    return '';
  }

  const parts = eras.sort((a, b) => a.cmp(b)).reduce((result, era) => {
    if (result.length === 0) {
      return [era];
    } else {
      const last = result[result.length - 1];

      if (isSingle(last)) {
        if (last.add(BN_ONE).eq(era)) {
          result[result.length - 1] = [last, era];
        } else {
          result.push(era);
        }
      } else {
        if (last[1].add(BN_ONE).eq(era)) {
          last[1] = era;
        } else {
          result.push(era);
        }
      }
    }

    return result;
  }, []).map(entry => isSingle(entry) ? formatNumber(entry) : `${formatNumber(entry[0])}-${formatNumber(entry[1])}`);
  return /*#__PURE__*/_jsx(_Fragment, {
    children: parts.map((section, index) => /*#__PURE__*/_jsxs(React.Fragment, {
      children: [index !== 0 && ', ', /*#__PURE__*/_jsx("span", {
        children: section
      })]
    }, section))
  });
}