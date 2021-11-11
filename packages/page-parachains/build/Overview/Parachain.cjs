"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bn = _interopRequireDefault(require("bn.js"));

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _reactQuery = require("@axia-js/react-query");

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _util2 = require("../util.cjs");

var _Lifecycle = _interopRequireDefault(require("./Lifecycle.cjs"));

var _ParachainInfo = _interopRequireDefault(require("./ParachainInfo.cjs"));

var _Periods = _interopRequireDefault(require("./Periods.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0
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
    headHex: headData.isSome ? (0, _util2.sliceHex)(headData.unwrap()) : null,
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
  return list === null || list === void 0 ? void 0 : list.map((id, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressMini, {
    nameExtra: indices && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: ["\xA0", `(${(0, _util.formatNumber)(indices[index])})`]
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
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const paraInfo = (0, _reactHooks.useCallMulti)([[api.query.paras.heads, id], [api.query.paras.futureCodeUpgrades, id], [api.query.paras.paraLifecycles, id], [(_ref = api.query.parasDmp || api.query.paraDmp || api.query.dmp) === null || _ref === void 0 ? void 0 : _ref.downwardMessageQueues, id], [(_ref2 = api.query.parasUmp || api.query.ump) === null || _ref2 === void 0 ? void 0 : _ref2.relayDispatchQueues, id], [(_ref3 = api.query.parasHrmp || api.query.paraHrmp || api.query.hrmp) === null || _ref3 === void 0 ? void 0 : _ref3.hrmpEgressChannelsIndex, id], [(_ref4 = api.query.parasHrmp || api.query.paraHrmp || api.query.hrmp) === null || _ref4 === void 0 ? void 0 : _ref4.hrmpIngressChannelsIndex, id], [(_ref5 = api.query.parasHrmp || api.query.paraHrmp || api.query.hrmp) === null || _ref5 === void 0 ? void 0 : _ref5.hrmpWatermarks, id], [(_ref6 = api.query.parasInclusion || api.query.paraInclusion || api.query.inclusion) === null || _ref6 === void 0 ? void 0 : _ref6.pendingAvailability, id], [api.query.registrar.paras, id], [api.query.slots.leases, id]], optionsMulti);
  const [nonBacked, setNonBacked] = (0, _react.useState)([]);
  const channelCounts = (0, _react.useMemo)(() => [channelDst ? channelDst.reduce((count, [, channel]) => count.iadd(channel.msgCount), new _bn.default(0)) : _util.BN_ZERO, channelSrc ? channelSrc.reduce((count, [, channel]) => count.iadd(channel.msgCount), new _bn.default(0)) : _util.BN_ZERO], [channelDst, channelSrc]);
  const blockDelay = (0, _react.useMemo)(() => bestNumber && (lastInclusion ? bestNumber.sub(lastInclusion.blockNumber) : paraInfo.watermark ? bestNumber.sub(paraInfo.watermark) : undefined), [bestNumber, lastInclusion, paraInfo]);
  const valRender = (0, _react.useCallback)(() => renderAddresses(validators && validators[1].map(({
    validatorId
  }) => validatorId), validators && validators[1].map(({
    indexValidator
  }) => indexValidator)), [validators]);
  const bckRender = (0, _react.useCallback)(() => renderAddresses(nonBacked), [nonBacked]);
  (0, _react.useEffect)(() => {
    if (sessionValidators) {
      if (paraInfo.pendingAvail) {
        const list = paraInfo.pendingAvail.availabilityVotes.toHuman().slice(2).replace(/_/g, '').split('').map((c, index) => c === '0' ? sessionValidators[index] : null).filter((v, index) => !!v && index < sessionValidators.length);
        list.length !== sessionValidators.length && setNonBacked(list);
      } else {
        setNonBacked([]);
      }
    }
  }, [paraInfo, sessionValidators]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("h1", {
        children: (0, _util.formatNumber)(id)
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "badge",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.ParaLink, {
        id: id
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("td", {
      className: "number media--1400",
      children: [validators && validators[1].length !== 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Expander, {
        renderChildren: valRender,
        summary: t('Val. Group {{group}} ({{count}})', {
          replace: {
            count: (0, _util.formatNumber)(validators[1].length),
            group: validators[0]
          }
        })
      }), nonBacked && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Expander, {
        renderChildren: bckRender,
        summary: t('Non-voters ({{count}})', {
          replace: {
            count: (0, _util.formatNumber)(nonBacked.length)
          }
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "start together hash media--1500",
      children: paraInfo.headHex
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "start",
      children: paraInfo.updateAt && bestNumber && (_paraInfo$lifecycle = paraInfo.lifecycle) !== null && _paraInfo$lifecycle !== void 0 && _paraInfo$lifecycle.isParachain ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [t('Upgrading'), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.BlockToTime, {
          value: paraInfo.updateAt.sub(bestNumber)
        }), "#", (0, _util.formatNumber)(paraInfo.updateAt)]
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_Lifecycle.default, {
        lifecycle: paraInfo.lifecycle,
        nextAction: nextAction
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "all"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number",
      children: blockDelay && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.BlockToTime, {
        value: blockDelay
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number no-pad-left",
      children: lastInclusion ? /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
        href: `#/explorer/query/${lastInclusion.blockHash}`,
        children: (0, _util.formatNumber)(lastInclusion.blockNumber)
      }) : paraInfo.watermark && (0, _util.formatNumber)(paraInfo.watermark)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number no-pad-left media--800",
      children: lastBacked && /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
        href: `#/explorer/query/${lastBacked.blockHash}`,
        children: (0, _util.formatNumber)(lastBacked.blockNumber)
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number no-pad-left media--900",
      children: lastTimeout && /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
        href: `#/explorer/query/${lastTimeout.blockHash}`,
        children: (0, _util.formatNumber)(lastTimeout.blockNumber)
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number no-pad-left",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ParachainInfo.default, {
        id: id
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("td", {
      className: "number media--1200",
      children: [(0, _util.formatNumber)(paraInfo.qHrmpI), "\xA0(", (0, _util.formatNumber)(channelCounts[0]), ")"]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("td", {
      className: "number no-pad-left media--1200",
      children: [(0, _util.formatNumber)(paraInfo.qHrmpE), "\xA0(", (0, _util.formatNumber)(channelCounts[1]), ")"]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number together media--1000",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Periods.default, {
        leasePeriod: leasePeriod,
        periods: paraInfo.leases
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Parachain);

exports.default = _default;