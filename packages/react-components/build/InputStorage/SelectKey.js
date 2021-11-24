// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { useApi } from '@axia-js/react-hooks';
import Dropdown from "../Dropdown.js";
import { jsx as _jsx } from "react/jsx-runtime";

function transform(api, {
  value
}) {
  return function (method) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return api.query[value.creator.section] ? api.query[value.creator.section][method] : value;
  };
}

function SelectKey(props) {
  const {
    api
  } = useApi();
  const {
    className = '',
    isError,
    onChange,
    options,
    value
  } = props;

  if (!options.length) {
    return null;
  }

  return /*#__PURE__*/_jsx(Dropdown, {
    className: `ui--DropdownLinked-Items ${className}`,
    isError: isError,
    onChange: onChange,
    options: options,
    transform: transform(api, props),
    value: value.creator.method,
    withLabel: false
  });
}

export default /*#__PURE__*/React.memo(SelectKey);