"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _translate = require("../translate.cjs");

var _useLeaseRanges = require("../useLeaseRanges.cjs");

var _WinRange = _interopRequireDefault(require("./WinRange.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Auction(_ref) {
  let {
    auctionInfo,
    campaigns,
    className,
    winningData
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const rangeMax = (0, _useLeaseRanges.useLeaseRangeMax)();
  const newRaise = (0, _reactHooks.useCall)(api.query.crowdloan.newRaise);
  const headerRef = (0, _react.useRef)([[t('bids'), 'start', 3], [t('bidder'), 'address'], [t('crowdloan')], [t('leases')], [t('value')]]);
  const loans = (0, _react.useMemo)(() => {
    if (newRaise && auctionInfo && auctionInfo.leasePeriod && campaigns.funds) {
      const leasePeriodStart = auctionInfo.leasePeriod;
      const leasePeriodEnd = leasePeriodStart.add(rangeMax);
      return campaigns.funds.filter(_ref2 => {
        let {
          firstSlot,
          isWinner,
          lastSlot,
          paraId
        } = _ref2;
        return !isWinner && newRaise.some(n => n.eq(paraId)) && firstSlot.gte(leasePeriodStart) && lastSlot.lte(leasePeriodEnd);
      }).sort((a, b) => b.value.cmp(a.value));
    } else {
      return undefined;
    }
  }, [auctionInfo, campaigns, newRaise, rangeMax]);
  const interleave = (0, _react.useCallback)((winners, asIs) => {
    if (asIs || !newRaise || !(auctionInfo !== null && auctionInfo !== void 0 && auctionInfo.leasePeriod) || !loans) {
      return winners;
    }

    return winners.concat(...loans.filter(_ref3 => {
      let {
        firstSlot,
        lastSlot,
        paraId,
        value
      } = _ref3;
      return !winners.some(w => w.firstSlot.eq(firstSlot) && w.lastSlot.eq(lastSlot)) && !loans.some(e => !paraId.eq(e.paraId) && firstSlot.eq(e.firstSlot) && lastSlot.eq(e.lastSlot) && value.lt(e.value));
    })).map(w => loans.find(_ref4 => {
      let {
        firstSlot,
        lastSlot,
        value
      } = _ref4;
      return w.firstSlot.eq(firstSlot) && w.lastSlot.eq(lastSlot) && w.value.lt(value);
    }) || w).sort((a, b) => a.firstSlot.eq(b.firstSlot) ? a.lastSlot.cmp(b.lastSlot) : a.firstSlot.cmp(b.firstSlot));
  }, [auctionInfo, loans, newRaise]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Table, {
    className: className,
    empty: newRaise && auctionInfo && auctionInfo.numAuctions && winningData && (auctionInfo.endBlock && !winningData.length ? t('No winners in this auction') : t('No ongoing auction')),
    header: headerRef.current,
    noBodyTag: true,
    children: auctionInfo && auctionInfo.leasePeriod && winningData && loans && (winningData.length ? winningData.map((_ref5, round) => {
      let {
        blockNumber,
        winners
      } = _ref5;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("tbody", {
        children: interleave(winners, round !== 0 || winningData.length !== 1).map((value, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_WinRange.default, {
          auctionInfo: auctionInfo,
          blockNumber: blockNumber,
          isFirst: index === 0,
          isLatest: round === 0,
          value: value
        }, `${blockNumber.toString()}:${value.key}`))
      }, round);
    }) : loans.length !== 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)("tbody", {
      children: interleave([], false).map((value, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_WinRange.default, {
        auctionInfo: auctionInfo,
        isFirst: index === 0,
        isLatest: true,
        value: value
      }, `latest-crowd:${value.key}`))
    }, 'latest-crowd'))
  });
}

var _default = /*#__PURE__*/_react.default.memo(Auction);

exports.default = _default;