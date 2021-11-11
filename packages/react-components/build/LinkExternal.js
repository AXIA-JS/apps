// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { externalLinks } from '@axia-js/apps-config';
import { useApi } from '@axia-js/react-hooks';
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

// function shortName (name: string): string {
//   return `${name[0]}${name[name.length - 1]}`;
// }
function genLinks(systemChain, {
  data,
  hash,
  isLogo,
  isSidebar,
  type
}) {
  return Object.entries(externalLinks).map(([name, {
    chains,
    create,
    isActive,
    logo,
    paths,
    url
  }]) => {
    const extChain = chains[systemChain];
    const extPath = paths[type];

    if (!isActive || !extChain || !extPath) {
      return null;
    }

    return /*#__PURE__*/_jsx("a", {
      href: create(extChain, extPath, data, hash),
      rel: "noopener noreferrer",
      target: "_blank",
      title: `${name}, ${url}`,
      children: isLogo ? /*#__PURE__*/_jsx("img", {
        className: `${isSidebar ? ' isSidebar' : ''}`,
        src: logo
      }) : name
    }, name);
  }).filter(node => !!node);
}

function LinkExternal({
  className = '',
  data,
  hash,
  isLogo,
  isSidebar,
  isSmall,
  type
}) {
  const {
    t
  } = useTranslation();
  const {
    systemChain
  } = useApi();
  const links = useMemo(() => genLinks(systemChain, {
    data,
    hash,
    isLogo,
    isSidebar,
    type
  }), [systemChain, data, hash, isLogo, isSidebar, type]);

  if (!links.length) {
    return null;
  }

  return /*#__PURE__*/_jsxs("div", {
    className: `${className}${isLogo ? ' isLogo' : ''}${isSmall ? ' isSmall' : ''}${isSidebar ? ' isSidebar' : ''}`,
    children: [!(isLogo || isSmall) && /*#__PURE__*/_jsx("div", {
      children: t('View this externally')
    }), /*#__PURE__*/_jsx("div", {
      className: "links",
      children: links.map((link, index) => /*#__PURE__*/_jsx("span", {
        children: link
      }, index))
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(LinkExternal).withConfig({
  displayName: "LinkExternal",
  componentId: "sc-12wbqh9-0"
})(["text-align:right;&.isSmall{font-size:0.85rem;line-height:1.35;text-align:center;}&.isSidebar{text-align:center;}&.isLogo{line-height:1;.links{white-space:nowrap;}}.links{img{border-radius:50%;cursor:pointer;filter:grayscale(1) opacity(0.66);height:1.5rem;width:1.5rem;&.isSidebar{height:2rem;width:2rem;}&:hover{filter:grayscale(0) opacity(1);}}span{word-wrap:normal;display:inline-block;}span+span{margin-left:0.3rem;}}"]));