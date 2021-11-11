// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { bnToBn } from '@axia-js/util';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function DivClip({
  angle,
  type
}) {
  return /*#__PURE__*/_jsx("div", {
    className: `clip ${type}`,
    children: /*#__PURE__*/_jsx("div", {
      className: "highlight--bg",
      style: {
        transform: `rotate(${angle}deg)`
      }
    })
  });
}

const Clip = /*#__PURE__*/React.memo(DivClip);

function Progress({
  className = '',
  isDisabled,
  total,
  value
}) {
  const _total = bnToBn(total || 0);

  const angle = _total.gtn(0) ? bnToBn(value || 0).muln(36000).div(_total).toNumber() / 100 : 0;

  if (angle < 0) {
    return null;
  }

  const drawAngle = angle % 360;
  return /*#__PURE__*/_jsxs("div", {
    className: `ui--Progress${isDisabled ? ' isDisabled' : ''} ${className}`,
    children: [/*#__PURE__*/_jsx("div", {
      className: "background highlight--bg"
    }), /*#__PURE__*/_jsx(Clip, {
      angle: drawAngle <= 180 ? drawAngle.toFixed(1) : '180',
      type: "first"
    }), /*#__PURE__*/_jsx(Clip, {
      angle: drawAngle <= 180 ? '0' : (drawAngle - 180).toFixed(1),
      type: "second"
    }), /*#__PURE__*/_jsx("div", {
      className: "inner",
      children: /*#__PURE__*/_jsxs("div", {
        children: [Math.floor(angle * 100 / 360), "%"]
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Progress).withConfig({
  displayName: "Progress",
  componentId: "sc-1569tdn-0"
})(["border-radius:100%;clip-path:circle(50%);height:4rem;position:relative;width:4rem;&.isDisabled{filter:grayscale(100%);opacity:0.25;}.background,.clip{bottom:0;left:0;position:absolute;right:0;top:0;}.background{opacity:0.125;}.clip{div{border-radius:100%;bottom:0;left:0;position:absolute;right:0;transform:rotate(0);top:0;zoom:1;}}.clip.first{clip-path:polygon(50% 0,100% 0,100% 100%,50% 100%);div{clip-path:polygon(0 0,50% 0,50% 100%,0 100%);}}.clip.second{clip-path:polygon(0 0,50% 0,50% 100%,0 100%);div{clip-path:polygon(50% 0,100% 0,100% 100%,50% 100%);}}.inner{align-items:center;background:var(--bg-inverse);border-radius:100%;bottom:0.375rem;color:var(--color-summary);display:flex;justify-content:center;left:0.375rem;position:absolute;right:0.375rem;top:0.375rem;div{line-height:1;font-size:1.1rem;text-shadow:0 0 2px #f5f3f1;}}"]));