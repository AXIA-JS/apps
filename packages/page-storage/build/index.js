// Copyright 2017-2021 @axia-js/app-storage authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Queries from "./Queries.js";
import Selection from "./Selection/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function StorageApp({
  basePath,
  className = ''
}) {
  const [queue, setQueue] = useState([]);

  const _onAdd = useCallback(query => setQueue(queue => [query, ...queue]), []);

  const _onRemove = useCallback(id => setQueue(queue => queue.filter(item => item.id !== id)), []);

  return /*#__PURE__*/_jsxs("main", {
    className: `storage--App ${className}`,
    children: [/*#__PURE__*/_jsx(Selection, {
      basePath: basePath,
      onAdd: _onAdd
    }), /*#__PURE__*/_jsx(Queries, {
      onRemove: _onRemove,
      value: queue
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(StorageApp).withConfig({
  displayName: "src",
  componentId: "sc-1kpfh4z-0"
})([".storage--actionrow{align-items:flex-start;display:flex;.ui--Button{margin:0.25rem;}&.head{flex:1 1 100%;margin:0 auto;max-width:620px;}}.storage--actionrow-value{flex:1;min-width:0;.ui--output{word-break:break-all;}}.storage--actionrow-buttons{flex:0;padding:0.5rem 0.25rem;}"]));