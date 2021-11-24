// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";

function Column({
  children,
  className = ''
}) {
  return /*#__PURE__*/_jsx("div", {
    className: `ui--Column ${className}`,
    children: children
  });
}

function Columar({
  children,
  className = '',
  is60
}) {
  return /*#__PURE__*/_jsx("div", {
    className: `ui--Columnar ${is60 ? 'is60' : 'is50'} ${className}`,
    children: children
  });
}

const ColumarStyled = /*#__PURE__*/React.memo(styled(Columar).withConfig({
  displayName: "Columar__ColumarStyled",
  componentId: "sc-18v71sm-0"
})(["display:flex;flex-wrap:wrap;&.is50{.ui--Column{@media (min-width:1025px){max-width:50%;min-width:50%;}}}&.is60{.ui--Column:first-child{@media (min-width:1025px){max-width:60%;min-width:60%;}}.ui--Column:last-child{@media (min-width:1025px){max-width:40%;min-width:40%;}}}"]));
ColumarStyled.Column = /*#__PURE__*/React.memo(styled(Column).withConfig({
  displayName: "Columar__Column",
  componentId: "sc-18v71sm-1"
})(["box-sizing:border-box;max-width:100%;flex:1 1;margin:0;padding:0 0.75rem;&:first-child{padding-left:0;}&:last-child{padding-right:0;}@media (min-width:1025px){max-width:50%;min-width:50%;}"]));
export default ColumarStyled;