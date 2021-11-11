// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
// Robots lovingly delivered by Robohash.org
// https://github.com/e1ven/Robohash
//
// The "set1" artwork (and robohash backgrounds) were created by Zikri Kader. They are available under CC-BY-3.0 or CC-BY-4.0 license.
// The "set2" artwork was created by Hrvoje Novakovic. They are available under CC-BY-3.0 license.
// The "set3" artwork was created by Julian Peter Arias. They are available under CC-BY-3.0 license.
// The Cats/"set4" were created by David Revoy, used under CC-BY-4.0 https://www.peppercarrot.com/en/article391/cat-avatar-generator
// The avatars used in "set5" were created by Pablo Stanley, for https://avataaars.com/ They are "Free for personal and commercial use. 😇"
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { blake2AsU8a } from '@axia-js/util-crypto';
import backgrounds from "./backgrounds/index.js";
import sets from "./sets/index.js";
import { jsx as _jsx } from "react/jsx-runtime";

function getIndex(list, hash) {
  let value = 0; // grab 48 bits worth of data (last increment before max int)
  // (6 also doesn't divide into 32, so we have a rolling window)

  for (let i = 0; i < 6; i++) {
    value = value * 256 + hash.hash[hash.index];
    hash.index++;

    if (hash.index === 32) {
      hash.index = 0;
    }
  }

  return list[value % list.length];
}

function createInfo(value) {
  const hash = {
    hash: blake2AsU8a(value),
    index: 0
  };
  const result = [getIndex(backgrounds, hash)];
  getIndex(sets, hash).forEach(section => {
    result.push(getIndex(section, hash));
  });
  return result;
}

function RoboHash({
  className,
  publicKey,
  size
}) {
  const info = useMemo(() => createInfo(publicKey), [publicKey]);
  const style = useMemo(() => ({
    height: `${size}px`,
    width: `${size}px`
  }), [size]);
  return /*#__PURE__*/_jsx("div", {
    className: className,
    style: style,
    children: info.map((src, index) => /*#__PURE__*/_jsx("img", {
      src: src
    }, index))
  });
}

export default /*#__PURE__*/React.memo(styled(RoboHash).withConfig({
  displayName: "RoboHash",
  componentId: "sc-m8pbyk-0"
})(["background:var(--bg-page);border-radius:50%;position:relative;overflow:hidden;img{height:100%;left:0;position:absolute;top:0;width:100%;&:first-child{opacity:0.35;}}"]));