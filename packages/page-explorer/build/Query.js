// Copyright 2017-2021 @axia-js/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Button, FilterOverlay, Input } from '@axia-js/react-components';
import { isHex } from '@axia-js/util';
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";

function stateFromValue(value) {
  return {
    isValid: isHex(value, 256) || /^\d+$/.test(value),
    value
  };
}

function Query({
  className = '',
  value: propsValue
}) {
  const {
    t
  } = useTranslation();
  const [{
    isValid,
    value
  }, setState] = useState(() => stateFromValue(propsValue || ''));

  const _setHash = useCallback(value => setState(stateFromValue(value)), []);

  const _onQuery = useCallback(() => {
    if (isValid && value.length !== 0) {
      window.location.hash = `/explorer/query/${value}`;
    }
  }, [isValid, value]);

  return /*#__PURE__*/_jsx(FilterOverlay, {
    className: `ui--FilterOverlay hasOwnMaxWidth ${className}`,
    children: /*#__PURE__*/_jsx(Input, {
      className: "explorer--query",
      defaultValue: propsValue,
      isError: !isValid && value.length !== 0,
      onChange: _setHash,
      onEnter: _onQuery,
      placeholder: t('block hash or number to query'),
      withLabel: false,
      children: /*#__PURE__*/_jsx(Button, {
        icon: "play",
        onClick: _onQuery
      })
    })
  });
}

export default /*#__PURE__*/React.memo(styled(Query).withConfig({
  displayName: "Query",
  componentId: "sc-drekwz-0"
})([".explorer--query{width:20em;}"]));