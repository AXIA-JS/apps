// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@axia-js/react-components';
import Row from '@axia-js/react-components/Row';
import contracts from "../store.js";
import { jsx as _jsx } from "react/jsx-runtime";
const DEFAULT_HASH = '0x';
const DEFAULT_NAME = '<unknown>';

function CodeRow({
  buttons,
  children,
  className,
  code: {
    json
  },
  isInline,
  withTags
}) {
  const [name, setName] = useState(json.name || DEFAULT_NAME);
  const [tags, setTags] = useState(json.tags || []);
  const [codeHash, setCodeHash] = useState(json.codeHash || DEFAULT_HASH);
  useEffect(() => {
    setName(json.name || DEFAULT_NAME);
    setTags(json.tags || []);
    setCodeHash(json.codeHash || DEFAULT_HASH);
  }, [json]);

  const _onSaveName = useCallback(() => {
    const trimmedName = name.trim();

    if (trimmedName && codeHash) {
      contracts.saveCode(codeHash, {
        name
      });
    }
  }, [codeHash, name]);

  const _onSaveTags = useCallback(() => {
    codeHash && contracts.saveCode(codeHash, {
      tags
    });
  }, [codeHash, tags]);

  return /*#__PURE__*/_jsx(Row, {
    buttons: buttons,
    className: className,
    icon: /*#__PURE__*/_jsx("div", {
      className: "ui--CodeRow-icon",
      children: /*#__PURE__*/_jsx(Icon, {
        icon: "code"
      })
    }),
    isInline: isInline,
    name: name,
    onChangeName: setName,
    onChangeTags: setTags,
    onSaveName: _onSaveName,
    onSaveTags: _onSaveTags,
    tags: withTags && tags,
    children: children
  });
}

export default /*#__PURE__*/React.memo(styled(CodeRow).withConfig({
  displayName: "CodeRow",
  componentId: "sc-16okq39-0"
})([".ui--CodeRow-icon{margin-right:-0.5em;background:#eee;border-radius:50%;color:#666;width:26px;height:26px;display:flex;justify-content:center;align-items:center;}"]));