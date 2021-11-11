// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import { Badge, Icon } from '@axia-js/react-components';
import { useAccounts } from '@axia-js/react-hooks';
import MaxBadge from "../../MaxBadge.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const NO_NOMS = [];

function Status({
  isElected,
  isMain,
  isPara,
  isRelay,
  nominators = NO_NOMS,
  onlineCount,
  onlineMessage
}) {
  const {
    allAccounts
  } = useAccounts();
  const blockCount = onlineCount && onlineCount.toNumber();
  const isNominating = useMemo(() => nominators.some(({
    nominatorId
  }) => allAccounts.includes(nominatorId)), [allAccounts, nominators]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [isNominating ? /*#__PURE__*/_jsx(Badge, {
      color: "green",
      icon: "hand-paper"
    }) : /*#__PURE__*/_jsx(Badge, {
      color: "transparent"
    }), isRelay && (isPara ? /*#__PURE__*/_jsx(Badge, {
      color: "purple",
      icon: "vector-square"
    }) : /*#__PURE__*/_jsx(Badge, {
      color: "transparent"
    })), isElected ? /*#__PURE__*/_jsx(Badge, {
      color: "blue",
      icon: "chevron-right"
    }) : /*#__PURE__*/_jsx(Badge, {
      color: "transparent"
    }), isMain && (blockCount || onlineMessage ? /*#__PURE__*/_jsx(Badge, {
      color: "green",
      info: blockCount || /*#__PURE__*/_jsx(Icon, {
        icon: "envelope"
      })
    }) : /*#__PURE__*/_jsx(Badge, {
      color: "transparent"
    })), /*#__PURE__*/_jsx(MaxBadge, {
      numNominators: nominators.length
    })]
  });
}

export default /*#__PURE__*/React.memo(Status);