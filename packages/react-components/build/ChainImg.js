// Copyright 2017-2021 @axia-js/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { chainLogos, emptyLogos, namedLogos, nodeLogos, specLogos } from '@axia-js/apps-config';
import { useApi } from '@axia-js/react-hooks';
import { jsx as _jsx } from "react/jsx-runtime";

function sanitize(value) {
  return (value === null || value === void 0 ? void 0 : value.toLowerCase().replace('-', ' ')) || '';
}

function ChainImg({
  className = '',
  isInline,
  logo,
  onClick,
  withoutHl
}) {
  const {
    specName,
    systemChain,
    systemName
  } = useApi();
  const [isEmpty, img] = useMemo(() => {
    const found = logo ? namedLogos[logo] : chainLogos[sanitize(systemChain)] || nodeLogos[sanitize(systemName)] || specLogos[sanitize(specName)];
    return [!found || logo === 'empty', found || emptyLogos.empty];
  }, [logo, specName, systemChain, systemName]);
  return /*#__PURE__*/_jsx("img", {
    alt: "chain logo",
    className: `${className}${isEmpty && !withoutHl ? ' highlight--bg' : ''}${isInline ? ' isInline' : ''}`,
    onClick: onClick,
    src: img
  });
}

export default /*#__PURE__*/React.memo(styled(ChainImg).withConfig({
  displayName: "ChainImg",
  componentId: "sc-1fip3vp-0"
})(["background:white;border-radius:50%;box-sizing:border-box;&.isInline{display:inline-block;height:24px;margin-right:0.75rem;vertical-align:middle;width:24px;}"]));