"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bn = _interopRequireDefault(require("bn.js"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _util = require("@axia-js/util");

var _Event = _interopRequireDefault(require("../Event.cjs"));

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0
const BN_TEN_THOUSAND = new _bn.default(10000);

function getEra(_ref, blockNumber) {
  let {
    era
  } = _ref;

  if (blockNumber && era.isMortalEra) {
    const mortalEra = era.asMortalEra;
    return [mortalEra.birth(blockNumber.toNumber()), mortalEra.death(blockNumber.toNumber())];
  }

  return null;
}

function filterEvents(index) {
  let events = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  let maxBlockWeight = arguments.length > 2 ? arguments[2] : undefined;
  const filtered = events.filter(_ref2 => {
    let {
      record: {
        phase
      }
    } = _ref2;
    return phase.isApplyExtrinsic && phase.asApplyExtrinsic.eq(index);
  });
  const infoRecord = filtered.find(_ref3 => {
    let {
      record: {
        event: {
          method,
          section
        }
      }
    } = _ref3;
    return section === 'system' && ['ExtrinsicFailed', 'ExtrinsicSuccess'].includes(method);
  });
  const dispatchInfo = infoRecord ? infoRecord.record.event.method === 'ExtrinsicSuccess' ? infoRecord.record.event.data[0] : infoRecord.record.event.data[1] : undefined;
  return [dispatchInfo, dispatchInfo && maxBlockWeight ? dispatchInfo.weight.mul(BN_TEN_THOUSAND).div(maxBlockWeight).toNumber() / 100 : 0, filtered];
}

function ExtrinsicDisplay(_ref4) {
  var _value$tip;

  let {
    blockNumber,
    className = '',
    events,
    index,
    maxBlockWeight,
    value
  } = _ref4;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    meta,
    method,
    section
  } = (0, _react.useMemo)(() => value.registry.findMetaCall(value.callIndex), [value]);
  const mortality = (0, _react.useMemo)(() => {
    if (value.isSigned) {
      const era = getEra(value, blockNumber);
      return era ? t('mortal, valid from #{{startAt}} to #{{endsAt}}', {
        replace: {
          endsAt: (0, _util.formatNumber)(era[1]),
          startAt: (0, _util.formatNumber)(era[0])
        }
      }) : t('immortal');
    }

    return undefined;
  }, [blockNumber, t, value]);
  const [dispatchInfo, weightPercentage, thisEvents] = (0, _react.useMemo)(() => filterEvents(index, events, maxBlockWeight), [index, events, maxBlockWeight]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "top",
      colSpan: 2,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Expander, {
        summary: `${section}.${method}`,
        summaryMeta: meta,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Call, {
          className: "details",
          mortality: mortality,
          tip: (_value$tip = value.tip) === null || _value$tip === void 0 ? void 0 : _value$tip.toBn(),
          value: value,
          withHash: true,
          withSignature: true
        })
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "top media--1000",
      colSpan: 2,
      children: thisEvents.map(_ref5 => {
        let {
          key,
          record
        } = _ref5;
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Event.default, {
          className: "explorer--BlockByHash-event",
          value: record
        }, key);
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "top number media--1400",
      children: dispatchInfo && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
          children: (0, _util.formatNumber)(dispatchInfo.weight)
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          children: [weightPercentage.toFixed(2), "%"]
        })]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "top media--1200",
      children: value.isSigned && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressMini, {
          value: value.signer
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "explorer--BlockByHash-nonce",
          children: [t('index'), " ", (0, _util.formatNumber)(value.nonce)]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.LinkExternal, {
          data: value.hash.toHex(),
          type: "extrinsic"
        })]
      })
    })]
  }, `extrinsic:${index}`);
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(ExtrinsicDisplay).withConfig({
  displayName: "Extrinsic",
  componentId: "sc-1ief7am-0"
})([".explorer--BlockByHash-event+.explorer--BlockByHash-event{margin-top:0.75rem;}.explorer--BlockByHash-nonce{font-size:0.75rem;margin-left:2.25rem;margin-top:-0.5rem;opacity:0.6;text-align:left;}.explorer--BlockByHash-unsigned{opacity:0.6;font-weight:var(--font-weight-normal);}"]));

exports.default = _default;