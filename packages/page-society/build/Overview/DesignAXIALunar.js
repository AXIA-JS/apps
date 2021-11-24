// Copyright 2017-2021 @axia-js/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useRef, useState } from 'react';
import { AXIALUNAR_GENESIS } from '@axia-js/apps-config';
import { Button, Modal } from '@axia-js/react-components';
import { useApi, useToggle } from '@axia-js/react-hooks';
import drawCanary, { PADD, SIZE } from "../draw/canary.js";
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const CANVAS_STYLE = {
  display: 'block',
  margin: '0 auto'
};
const HEIGHT = SIZE * 2 + PADD * 1;
const WIDTH = SIZE * 3 + PADD * 2;

function DesignAXIALunar({
  accountId
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const canvasRef = useRef(null);
  const [onAXIALunar] = useState(() => api.genesisHash.eq(AXIALUNAR_GENESIS));
  const [isShowing, toggleDesign] = useToggle();
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');

      if (ctx) {
        drawCanary(ctx, accountId);
      }
    }
  });

  if (!onAXIALunar) {
    return null;
  }

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Button, {
      icon: "pen-nib",
      onClick: toggleDesign
    }), isShowing && /*#__PURE__*/_jsx(Modal, {
      header: t('design samples'),
      onClose: toggleDesign,
      size: "large",
      children: /*#__PURE__*/_jsx(Modal.Content, {
        children: /*#__PURE__*/_jsx("canvas", {
          height: HEIGHT,
          ref: canvasRef,
          style: CANVAS_STYLE,
          width: WIDTH
        })
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(DesignAXIALunar);