// Copyright 2017-2021 @axia-js/app-storage authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import Query from "./Query.js";
import { jsx as _jsx } from "react/jsx-runtime";

function Queries({
  onRemove,
  value
}) {
  if (!value || !value.length) {
    return null;
  }

  return /*#__PURE__*/_jsx("section", {
    className: "storage--Queries",
    children: value.map(query => /*#__PURE__*/_jsx(Query, {
      onRemove: onRemove,
      value: query
    }, query.id))
  });
}

export default /*#__PURE__*/React.memo(Queries);