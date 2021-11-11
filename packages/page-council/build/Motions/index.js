// Copyright 2017-2021 @axia-js/app-council authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useRef } from 'react';
import { Button, Table } from '@axia-js/react-components';
import { useCollectiveMembers } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import Motion from "./Motion.js";
import ProposeExternal from "./ProposeExternal.js";
import ProposeMotion from "./ProposeMotion.js";
import Slashing from "./Slashing.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Proposals({
  className = '',
  motions,
  prime
}) {
  const {
    t
  } = useTranslation();
  const {
    isMember,
    members
  } = useCollectiveMembers('council');
  const headerRef = useRef([[t('motions'), 'start', 2], [t('threshold')], [t('voting end')], [t('votes'), 'expand'], [], [undefined, 'badge'], []]);
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsxs(Button.Group, {
      children: [/*#__PURE__*/_jsx(ProposeMotion, {
        isMember: isMember,
        members: members
      }), /*#__PURE__*/_jsx(ProposeExternal, {
        isMember: isMember,
        members: members
      }), /*#__PURE__*/_jsx(Slashing, {
        isMember: isMember,
        members: members
      })]
    }), /*#__PURE__*/_jsx(Table, {
      empty: motions && t('No council motions'),
      header: headerRef.current,
      children: motions === null || motions === void 0 ? void 0 : motions.map(motion => /*#__PURE__*/_jsx(Motion, {
        isMember: isMember,
        members: members,
        motion: motion,
        prime: prime
      }, motion.hash.toHex()))
    })]
  });
}

export default /*#__PURE__*/React.memo(Proposals);