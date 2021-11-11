// Copyright 2017-2021 @axia-js/app-nodeinfo authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useState } from 'react';
import { CardSummary, SummaryBox } from '@axia-js/react-components';
import { BestNumber, Elapsed } from '@axia-js/react-query';
import { BN_ZERO, formatNumber } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const EMPTY_INFO = {
  extrinsics: null,
  health: null,
  peers: null
};

function Summary({
  info: {
    extrinsics,
    health,
    peers
  } = EMPTY_INFO,
  nextRefresh
}) {
  const {
    t
  } = useTranslation();
  const [peerBest, setPeerBest] = useState(BN_ZERO);
  useEffect(() => {
    if (peers) {
      const bestPeer = peers.sort((a, b) => b.bestNumber.cmp(a.bestNumber))[0];
      setPeerBest(bestPeer ? bestPeer.bestNumber : BN_ZERO);
    }
  }, [peers]);
  return /*#__PURE__*/_jsxs(SummaryBox, {
    children: [/*#__PURE__*/_jsxs("section", {
      children: [/*#__PURE__*/_jsx(CardSummary, {
        label: t('refresh in'),
        children: /*#__PURE__*/_jsx(Elapsed, {
          value: nextRefresh
        })
      }), health && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(CardSummary, {
          className: "media--800",
          label: t('total peers'),
          children: formatNumber(health.peers)
        }), /*#__PURE__*/_jsx(CardSummary, {
          className: "media--800",
          label: t('syncing'),
          children: health.isSyncing.valueOf() ? t('yes') : t('no')
        })]
      })]
    }), extrinsics && extrinsics.length > 0 && /*#__PURE__*/_jsx("section", {
      className: "media--1200",
      children: /*#__PURE__*/_jsx(CardSummary, {
        label: t('queued tx'),
        children: extrinsics.length
      })
    }), /*#__PURE__*/_jsxs("section", {
      children: [(peerBest === null || peerBest === void 0 ? void 0 : peerBest.gtn(0)) && /*#__PURE__*/_jsx(CardSummary, {
        label: t('peer best'),
        children: formatNumber(peerBest)
      }), /*#__PURE__*/_jsx(CardSummary, {
        label: t('our best'),
        children: /*#__PURE__*/_jsx(BestNumber, {})
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(Summary);