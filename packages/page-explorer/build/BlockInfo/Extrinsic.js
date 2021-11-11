// Copyright 2017-2021 @axia-js/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0
import BN from 'bn.js';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { AddressMini, Call, Expander, LinkExternal } from '@axia-js/react-components';
import { formatNumber } from '@axia-js/util';
import Event from "../Event.js";
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const BN_TEN_THOUSAND = new BN(10000);

function getEra({
  era
}, blockNumber) {
  if (blockNumber && era.isMortalEra) {
    const mortalEra = era.asMortalEra;
    return [mortalEra.birth(blockNumber.toNumber()), mortalEra.death(blockNumber.toNumber())];
  }

  return null;
}

function filterEvents(index, events = [], maxBlockWeight) {
  const filtered = events.filter(({
    record: {
      phase
    }
  }) => phase.isApplyExtrinsic && phase.asApplyExtrinsic.eq(index));
  const infoRecord = filtered.find(({
    record: {
      event: {
        method,
        section
      }
    }
  }) => section === 'system' && ['ExtrinsicFailed', 'ExtrinsicSuccess'].includes(method));
  const dispatchInfo = infoRecord ? infoRecord.record.event.method === 'ExtrinsicSuccess' ? infoRecord.record.event.data[0] : infoRecord.record.event.data[1] : undefined;
  return [dispatchInfo, dispatchInfo && maxBlockWeight ? dispatchInfo.weight.mul(BN_TEN_THOUSAND).div(maxBlockWeight).toNumber() / 100 : 0, filtered];
}

function ExtrinsicDisplay({
  blockNumber,
  className = '',
  events,
  index,
  maxBlockWeight,
  value
}) {
  var _value$tip;

  const {
    t
  } = useTranslation();
  const {
    meta,
    method,
    section
  } = useMemo(() => value.registry.findMetaCall(value.callIndex), [value]);
  const mortality = useMemo(() => {
    if (value.isSigned) {
      const era = getEra(value, blockNumber);
      return era ? t('mortal, valid from #{{startAt}} to #{{endsAt}}', {
        replace: {
          endsAt: formatNumber(era[1]),
          startAt: formatNumber(era[0])
        }
      }) : t('immortal');
    }

    return undefined;
  }, [blockNumber, t, value]);
  const [dispatchInfo, weightPercentage, thisEvents] = useMemo(() => filterEvents(index, events, maxBlockWeight), [index, events, maxBlockWeight]);
  return /*#__PURE__*/_jsxs("tr", {
    className: className,
    children: [/*#__PURE__*/_jsx("td", {
      className: "top",
      colSpan: 2,
      children: /*#__PURE__*/_jsx(Expander, {
        summary: `${section}.${method}`,
        summaryMeta: meta,
        children: /*#__PURE__*/_jsx(Call, {
          className: "details",
          mortality: mortality,
          tip: (_value$tip = value.tip) === null || _value$tip === void 0 ? void 0 : _value$tip.toBn(),
          value: value,
          withHash: true,
          withSignature: true
        })
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "top media--1000",
      colSpan: 2,
      children: thisEvents.map(({
        key,
        record
      }) => /*#__PURE__*/_jsx(Event, {
        className: "explorer--BlockByHash-event",
        value: record
      }, key))
    }), /*#__PURE__*/_jsx("td", {
      className: "top number media--1400",
      children: dispatchInfo && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(_Fragment, {
          children: formatNumber(dispatchInfo.weight)
        }), /*#__PURE__*/_jsxs("div", {
          children: [weightPercentage.toFixed(2), "%"]
        })]
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "top media--1200",
      children: value.isSigned && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(AddressMini, {
          value: value.signer
        }), /*#__PURE__*/_jsxs("div", {
          className: "explorer--BlockByHash-nonce",
          children: [t('index'), " ", formatNumber(value.nonce)]
        }), /*#__PURE__*/_jsx(LinkExternal, {
          data: value.hash.toHex(),
          type: "extrinsic"
        })]
      })
    })]
  }, `extrinsic:${index}`);
}

export default /*#__PURE__*/React.memo(styled(ExtrinsicDisplay).withConfig({
  displayName: "Extrinsic",
  componentId: "sc-1ybykw8-0"
})([".explorer--BlockByHash-event+.explorer--BlockByHash-event{margin-top:0.75rem;}.explorer--BlockByHash-nonce{font-size:0.75rem;margin-left:2.25rem;margin-top:-0.5rem;opacity:0.6;text-align:left;}.explorer--BlockByHash-unsigned{opacity:0.6;font-weight:var(--font-weight-normal);}"]));