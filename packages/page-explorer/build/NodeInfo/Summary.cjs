"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactQuery = require("@axia-js/react-query");

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-nodeinfo authors & contributors
// SPDX-License-Identifier: Apache-2.0
const EMPTY_INFO = {
  extrinsics: null,
  health: null,
  peers: null
};

function Summary(_ref) {
  let {
    info: {
      extrinsics,
      health,
      peers
    } = EMPTY_INFO,
    nextRefresh
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const [peerBest, setPeerBest] = (0, _react.useState)(_util.BN_ZERO);
  (0, _react.useEffect)(() => {
    if (peers) {
      const bestPeer = peers.sort((a, b) => b.bestNumber.cmp(a.bestNumber))[0];
      setPeerBest(bestPeer ? bestPeer.bestNumber : _util.BN_ZERO);
    }
  }, [peers]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.SummaryBox, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        label: t('refresh in'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.Elapsed, {
          value: nextRefresh
        })
      }), health && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
          className: "media--800",
          label: t('total peers'),
          children: (0, _util.formatNumber)(health.peers)
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
          className: "media--800",
          label: t('syncing'),
          children: health.isSyncing.valueOf() ? t('yes') : t('no')
        })]
      })]
    }), extrinsics && extrinsics.length > 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)("section", {
      className: "media--1200",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        label: t('queued tx'),
        children: extrinsics.length
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
      children: [(peerBest === null || peerBest === void 0 ? void 0 : peerBest.gtn(0)) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        label: t('peer best'),
        children: (0, _util.formatNumber)(peerBest)
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        label: t('our best'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.BestNumber, {})
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Summary);

exports.default = _default;