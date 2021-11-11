import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";
// one-time init of FA libraries
library.add(fas);

function Icon({
  className = '',
  color = 'normal',
  icon,
  isPadded,
  isSpinning,
  onClick,
  size = '1x',
  tooltip
}) {
  const extraProps = _objectSpread({
    'data-testid': icon
  }, tooltip ? {
    'data-for': tooltip,
    'data-tip': true
  } : {});

  return /*#__PURE__*/_jsx(FontAwesomeIcon, _objectSpread(_objectSpread({}, extraProps), {}, {
    className: `ui--Icon ${color}Color${onClick ? ' isClickable' : ''}${isPadded ? ' isPadded' : ''} ${className}`,
    icon: icon,
    onClick: onClick,
    size: size,
    spin: isSpinning,
    tabIndex: -1
  }));
}

export default /*#__PURE__*/React.memo(styled(Icon).withConfig({
  displayName: "Icon",
  componentId: "sc-1uql7up-0"
})(["outline:none;&.isClickable{cursor:pointer;}&.isPadded{margin:0 0.25rem;}&.grayColor{opacity:0.25;}&.greenColor{color:green;}&.orangeColor{color:darkorange;}&.redColor{color:darkred;}&.transparentColor{color:transparent;}&.whiteColor{color:white;}&.darkGrayColor{color:#8B8B8B;}"]));