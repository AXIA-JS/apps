// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import { AddressMini, AddressSmall, Expander } from '@axia-js/react-components';
import { BlockToTime, FormatBalance } from '@axia-js/react-query';
import { useTranslation } from "../translate.js";
import PayButton from "./PayButton.js";
import useEraBlocks from "./useEraBlocks.js";
import { createErasString } from "./util.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function extractState(payout) {
  var _payout$eras$;

  const eraStr = createErasString(payout.eras.map(({
    era
  }) => era));
  const nominators = payout.eras.reduce((nominators, {
    stashes
  }) => {
    Object.entries(stashes).forEach(([stashId, value]) => {
      if (nominators[stashId]) {
        nominators[stashId] = nominators[stashId].add(value);
      } else {
        nominators[stashId] = value;
      }
    });
    return nominators;
  }, {});
  return {
    eraStr,
    nominators,
    numNominators: Object.keys(nominators).length,
    oldestEra: (_payout$eras$ = payout.eras[0]) === null || _payout$eras$ === void 0 ? void 0 : _payout$eras$.era
  };
}

function Validator({
  className = '',
  isDisabled,
  payout
}) {
  const {
    t
  } = useTranslation();
  const {
    eraStr,
    nominators,
    numNominators,
    oldestEra
  } = useMemo(() => extractState(payout), [payout]);
  const eraBlocks = useEraBlocks(oldestEra);
  return /*#__PURE__*/_jsxs("tr", {
    className: className,
    children: [/*#__PURE__*/_jsx("td", {
      className: "address",
      colSpan: 2,
      children: /*#__PURE__*/_jsx(AddressSmall, {
        value: payout.validatorId
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
        value: payout.available
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "number",
      children: eraBlocks && /*#__PURE__*/_jsx(BlockToTime, {
        value: eraBlocks
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "expand",
      colSpan: 2,
      children: /*#__PURE__*/_jsx(Expander, {
        summary: t('{{count}} own stashes', {
          replace: {
            count: numNominators
          }
        }),
        children: Object.entries(nominators).map(([stashId, balance]) => /*#__PURE__*/_jsx(AddressMini, {
          balance: balance,
          value: stashId,
          withBalance: true
        }, stashId))
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "button",
      children: /*#__PURE__*/_jsx(PayButton, {
        isDisabled: isDisabled,
        payout: payout
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(Validator);