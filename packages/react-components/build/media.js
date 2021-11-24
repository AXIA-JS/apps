// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { css } from 'styled-components';
import { ScreenSizes } from "./constants.js";
const media = Object.keys(ScreenSizes).reduce((acc, label) => {
  const size = ScreenSizes[label];

  acc[label] = values => css(["@media (min-width:", "em){", "}"], size / 16, values);

  return acc;
}, {});
export default media;