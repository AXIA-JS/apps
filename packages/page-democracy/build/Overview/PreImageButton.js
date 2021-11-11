// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Button } from '@axia-js/react-components';
import { useToggle } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import PreImage from "./PreImage.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function PreImageButton({
  imageHash,
  isImminent
}) {
  const {
    t
  } = useTranslation();
  const [isPreimageOpen, togglePreimage] = useToggle();
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Button, {
      icon: "plus",
      label: t('Image'),
      onClick: togglePreimage
    }), isPreimageOpen && /*#__PURE__*/_jsx(PreImage, {
      imageHash: imageHash,
      isImminent: isImminent,
      onClose: togglePreimage
    })]
  });
}

export default /*#__PURE__*/React.memo(PreImageButton);