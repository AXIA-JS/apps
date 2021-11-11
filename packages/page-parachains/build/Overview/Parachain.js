// Copyright 2017-2021 @axia-js/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import BN from 'bn.js';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AddressMini, Expander, ParaLink } from '@axia-js/react-components';
import { useApi, useCallMulti } from '@axia-js/react-hooks';
import { BlockToTime } from '@axia-js/react-query';
import { BN_ZERO, formatNumber } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import { sliceHex } from "../util.js";
import Lifecycle from "./Lifecycle.js";
import ParachainInfo from "./ParachainInfo.js";
import Periods from "./Periods.js";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
const optionsMulti = {
  defaultValue: {
    headHex: null,
    leases: [],
    lifecycle: null,
    paraInfo: null,
    pendingAvail: null,
    qDmp: 0,
    qHrmpE: 0,
    qHrmpI: 0,
    qUmp: 0,
    updateAt: null,
    watermark: null
  },
  transform: ([headData, optUp, optLifecycle, dmp, ump, hrmpE, hrmpI, optWm, optPending, optInfo, leases]) => ({
    headHex: headData.isSome ? sliceHex(headData.unwrap()) : null,
    leases: leases.map((opt, index) => opt.isSome ? index : -1).filter(period => period !== -1),
    lifecycle: optLifecycle.unwrapOr(null),
    paraInfo: optInfo.unwrapOr(null),
    pendingAvail: optPending.unwrapOr(null),
    qDmp: dmp.length,
    qHrmpE: hrmpE.length,
    qHrmpI: hrmpI.length,
    qUmp: ump.length,
    updateAt: optUp.unwrapOr(null),
    watermark: optWm.unwrapOr(null)
  })
};

function renderAddresses(list, indices) {
  return list === null || list === void 0 ? void 0 : list.map((id, index) => /*#__PURE__*/_jsx(AddressMini, {
    nameExtra: indices && /*#__PURE__*/_jsxs(_Fragment, {
      children: ["\xA0", `(${formatNumber(indices[index])})`]
    }),
    value: id
  }, id.toString()));
}

function Parachain({
  bestNumber,
  channelDst,
  channelSrc,
  className = '',
  id,
  lastBacked,
  lastInclusion,
  lastTimeout,
  leasePeriod,
  nextAction,
  sessionValidators,
  validators
}) {
  var _ref, _ref2, _ref3, _ref4, _ref5, _ref6, _paraInfo$lifecycle;

  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const paraInfo = useCallMulti([[api.query.paras.heads, id], [api.query.paras.futureCodeUpgrades, id], [api.query.paras.paraLifecycles, id], [(_ref = api.query.parasDmp || api.query.paraDmp || api.query.dmp) === null || _ref === void 0 ? void 0 : _ref.downwardMessageQueues, id], [(_ref2 = api.query.parasUmp || api.query.ump) === null || _ref2 === void 0 ? void 0 : _ref2.relayDispatchQueues, id], [(_ref3 = api.query.parasHrmp || api.query.paraHrmp || api.query.hrmp) === null || _ref3 === void 0 ? void 0 : _ref3.hrmpEgressChannelsIndex, id], [(_ref4 = api.query.parasHrmp || api.query.paraHrmp || api.query.hrmp) === null || _ref4 === void 0 ? void 0 : _ref4.hrmpIngressChannelsIndex, id], [(_ref5 = api.query.parasHrmp || api.query.paraHrmp || api.query.hrmp) === null || _ref5 === void 0 ? void 0 : _ref5.hrmpWatermarks, id], [(_ref6 = api.query.parasInclusion || api.query.paraInclusion || api.query.inclusion) === null || _ref6 === void 0 ? void 0 : _ref6.pendingAvailability, id], [api.query.registrar.paras, id], [api.query.slots.leases, id]], optionsMulti);
  const [nonBacked, setNonBacked] = useState([]);
  const channelCounts = useMemo(() => [channelDst ? channelDst.reduce((count, [, channel]) => count.iadd(channel.msgCount), new BN(0)) : BN_ZERO, channelSrc ? channelSrc.reduce((count, [, channel]) => count.iadd(channel.msgCount), new BN(0)) : BN_ZERO], [channelDst, channelSrc]);
  const blockDelay = useMemo(() => bestNumber && (lastInclusion ? bestNumber.sub(lastInclusion.blockNumber) : paraInfo.watermark ? bestNumber.sub(paraInfo.watermark) : undefined), [bestNumber, lastInclusion, paraInfo]);
  const valRender = useCallback(() => renderAddresses(validators && validators[1].map(({
    validatorId
  }) => validatorId), validators && validators[1].map(({
    indexValidator
  }) => indexValidator)), [validators]);
  const bckRender = useCallback(() => renderAddresses(nonBacked), [nonBacked]);
  useEffect(() => {
    if (sessionValidators) {
      if (paraInfo.pendingAvail) {
        const list = paraInfo.pendingAvail.availabilityVotes.toHuman().slice(2).replace(/_/g, '').split('').map((c, index) => c === '0' ? sessionValidators[index] : null).filter((v, index) => !!v && index < sessionValidators.length);
        list.length !== sessionValidators.length && setNonBacked(list);
      } else {
        setNonBacked([]);
      }
    }
  }, [paraInfo, sessionValidators]);
  return /*#__PURE__*/_jsxs("tr", {
    className: className,
    children: [/*#__PURE__*/_jsx("td", {
      className: "number",
      children: /*#__PURE__*/_jsx("h1", {
        children: formatNumber(id)
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "badge",
      children: /*#__PURE__*/_jsx(ParaLink, {
        id: id
      })
    }), /*#__PURE__*/_jsxs("td", {
      className: "number media--1400",
      children: [validators && validators[1].length !== 0 && /*#__PURE__*/_jsx(Expander, {
        renderChildren: valRender,
        summary: t('Val. Group {{group}} ({{count}})', {
          replace: {
            count: formatNumber(validators[1].length),
            group: validators[0]
          }
        })
      }), nonBacked && /*#__PURE__*/_jsx(Expander, {
        renderChildren: bckRender,
        summary: t('Non-voters ({{count}})', {
          replace: {
            count: formatNumber(nonBacked.length)
          }
        })
      })]
    }), /*#__PURE__*/_jsx("td", {
      className: "start together hash media--1500",
      children: paraInfo.headHex
    }), /*#__PURE__*/_jsx("td", {
      className: "start",
      children: paraInfo.updateAt && bestNumber && (_paraInfo$lifecycle = paraInfo.lifecycle) !== null && _paraInfo$lifecycle !== void 0 && _paraInfo$lifecycle.isParachain ? /*#__PURE__*/_jsxs(_Fragment, {
        children: [t('Upgrading'), /*#__PURE__*/_jsx(BlockToTime, {
          value: paraInfo.updateAt.sub(bestNumber)
        }), "#", formatNumber(paraInfo.updateAt)]
      }) : /*#__PURE__*/_jsx(Lifecycle, {
        lifecycle: paraInfo.lifecycle,
        nextAction: nextAction
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "all"
    }), /*#__PURE__*/_jsx("td", {
      className: "number",
      children: blockDelay && /*#__PURE__*/_jsx(BlockToTime, {
        value: blockDelay
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "number no-pad-left",
      children: lastInclusion ? /*#__PURE__*/_jsx("a", {
        href: `#/explorer/query/${lastInclusion.blockHash}`,
        children: formatNumber(lastInclusion.blockNumber)
      }) : paraInfo.watermark && formatNumber(paraInfo.watermark)
    }), /*#__PURE__*/_jsx("td", {
      className: "number no-pad-left media--800",
      children: lastBacked && /*#__PURE__*/_jsx("a", {
        href: `#/explorer/query/${lastBacked.blockHash}`,
        children: formatNumber(lastBacked.blockNumber)
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "number no-pad-left media--900",
      children: lastTimeout && /*#__PURE__*/_jsx("a", {
        href: `#/explorer/query/${lastTimeout.blockHash}`,
        children: formatNumber(lastTimeout.blockNumber)
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "number no-pad-left",
      children: /*#__PURE__*/_jsx(ParachainInfo, {
        id: id
      })
    }), /*#__PURE__*/_jsxs("td", {
      className: "number media--1200",
      children: [formatNumber(paraInfo.qHrmpI), "\xA0(", formatNumber(channelCounts[0]), ")"]
    }), /*#__PURE__*/_jsxs("td", {
      className: "number no-pad-left media--1200",
      children: [formatNumber(paraInfo.qHrmpE), "\xA0(", formatNumber(channelCounts[1]), ")"]
    }), /*#__PURE__*/_jsx("td", {
      className: "number together media--1000",
      children: /*#__PURE__*/_jsx(Periods, {
        leasePeriod: leasePeriod,
        periods: paraInfo.leases
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(Parachain);