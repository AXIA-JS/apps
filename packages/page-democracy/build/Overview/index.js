// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Button } from '@axia-js/react-components';
import { useApi, useCall, useToggle } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import Externals from "./Externals.js";
import PreImage from "./PreImage.js";
import Proposals from "./Proposals.js";
import Propose from "./Propose.js";
import Referendums from "./Referendums.js";
import Summary from "./Summary.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Overview({
  className
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [isPreimageOpen, togglePreimage] = useToggle();
  const [isProposeOpen, togglePropose] = useToggle();
  const referendums = useCall(api.derive.democracy.referendums);
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsx(Summary, {
      referendumCount: referendums === null || referendums === void 0 ? void 0 : referendums.length
    }), /*#__PURE__*/_jsxs(Button.Group, {
      children: [/*#__PURE__*/_jsx(Button, {
        icon: "plus",
        label: t('Submit preimage'),
        onClick: togglePreimage
      }), /*#__PURE__*/_jsx(Button, {
        icon: "plus",
        label: t('Submit proposal'),
        onClick: togglePropose
      })]
    }), isPreimageOpen && /*#__PURE__*/_jsx(PreImage, {
      onClose: togglePreimage
    }), isProposeOpen && /*#__PURE__*/_jsx(Propose, {
      onClose: togglePropose
    }), /*#__PURE__*/_jsx(Referendums, {
      referendums: referendums
    }), /*#__PURE__*/_jsx(Proposals, {}), /*#__PURE__*/_jsx(Externals, {})]
  });
}

export default /*#__PURE__*/React.memo(Overview);