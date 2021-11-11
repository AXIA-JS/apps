// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useState } from 'react';
import { AddressSmall } from '@axia-js/react-components';
import { BlockToTime, FormatBalance } from '@axia-js/react-query';
import useEraBlocks from "./useEraBlocks.js";
import { createErasString } from "./util.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Stash({
  className = '',
  payout: {
    available,
    rewards,
    stashId
  }
}) {
  const [{
    eraStr,
    oldestEra
  }, setEraInfo] = useState({
    eraStr: ''
  });
  const eraBlocks = useEraBlocks(oldestEra);
  useEffect(() => {
    var _rewards$;

    rewards && setEraInfo({
      eraStr: createErasString(rewards.map(({
        era
      }) => era)),
      oldestEra: (_rewards$ = rewards[0]) === null || _rewards$ === void 0 ? void 0 : _rewards$.era
    });
  }, [rewards]);
  return /*#__PURE__*/_jsxs("tr", {
    className: className,
    children: [/*#__PURE__*/_jsx("td", {
      className: "address",
      colSpan: 2,
      children: /*#__PURE__*/_jsx(AddressSmall, {
        value: stashId
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "start",
      children: /*#__PURE__*/_jsx("span", {
        className: "payout-eras",
        children: eraStr
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "number",
      children: /*#__PURE__*/_jsx(FormatBalance, {
        value: available
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "number",
      children: eraBlocks && /*#__PURE__*/_jsx(BlockToTime, {
        value: eraBlocks
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "button",
      colSpan: 3
    })]
  });
}

export default /*#__PURE__*/React.memo(Stash);