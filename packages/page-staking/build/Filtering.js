// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import queryString from 'query-string';
import React, { useCallback, useEffect } from 'react';
import { Input, Toggle } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import { isString } from '@axia-js/util';
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Filtering({
  children,
  className,
  nameFilter,
  setNameFilter,
  setWithIdentity,
  withIdentity
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi(); // on load, parse the query string and extract the filter

  useEffect(() => {
    const queryFilter = queryString.parse(location.href.split('?')[1]).filter;

    if (isString(queryFilter)) {
      setNameFilter(queryFilter, true);
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);

  const _setNameFilter = useCallback(value => setNameFilter(value, false), [setNameFilter]);

  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsx(Input, {
      autoFocus: true,
      isFull: true,
      label: t('filter by name, address or index'),
      onChange: _setNameFilter,
      value: nameFilter
    }), /*#__PURE__*/_jsxs("div", {
      className: "staking--optionsBar",
      children: [children, api.query.identity && /*#__PURE__*/_jsx(Toggle, {
        className: "staking--buttonToggle",
        label: t('only with an identity'),
        onChange: setWithIdentity,
        value: withIdentity
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(Filtering);