// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import spinnerSrc from "./Spinner.png";
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
// prefetch
const img = new Image();
img.src = spinnerSrc;

function Spinner({
  className = '',
  label,
  noLabel,
  variant = 'app'
}) {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/_jsxs("div", {
    className: `${className} ui--Spinner variant-${variant}`,
    children: [/*#__PURE__*/_jsx("img", {
      className: variant === 'push' ? '' : 'highlight--bg highlight--border',
      src: spinnerSrc
    }), !noLabel && variant.startsWith('app') && /*#__PURE__*/_jsx("div", {
      className: "text",
      children: label || t('Retrieving data')
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Spinner).withConfig({
  displayName: "Spinner",
  componentId: "sc-169snes-0"
})(["display:block;line-height:1rem;margin:0 auto;text-align:center;&.variant-appPadded{margin-top:0.5rem;}&.variant-cover{bottom:0;left:0;position:absolute;right:0;img{border:1 px solid white;margin:0 auto;}}img{border:1px solid transparent;border-radius:10rem;}.text{color:inherit !important;margin:0.25rem auto 1.5rem auto;opacity:0.6;div+div{margin-top:0.25rem;}}"]));