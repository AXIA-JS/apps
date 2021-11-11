"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _InputOwner = _interopRequireDefault(require("../InputOwner.cjs"));

var _translate = require("../translate.cjs");

var _useLeaseRanges = require("../useLeaseRanges.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0
const EMPTY_OWNER = {
  accountId: null,
  paraId: 0
};

function Bid({
  auctionInfo,
  className,
  lastWinners,
  ownedIds
}) {
  var _auctionInfo$leasePer, _auctionInfo$leasePer2;

  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const {
    hasAccounts
  } = (0, _reactHooks.useAccounts)();
  const bestNumber = (0, _reactHooks.useBestNumber)();
  const ranges = (0, _useLeaseRanges.useLeaseRanges)();
  const [{
    accountId,
    paraId
  }, setOwnerInfo] = (0, _react.useState)(EMPTY_OWNER);
  const [amount, setAmount] = (0, _react.useState)(_util.BN_ZERO);
  const [range, setRange] = (0, _react.useState)(0);
  const [isOpen, toggleOpen] = (0, _reactHooks.useToggle)();
  const rangeOpts = (0, _react.useMemo)(() => {
    if (!(auctionInfo !== null && auctionInfo !== void 0 && auctionInfo.leasePeriod)) {
      return [];
    }

    const leasePeriod = auctionInfo.leasePeriod.toNumber();
    return ranges.map(([first, last], value) => ({
      firstSlot: leasePeriod + first,
      lastSlot: leasePeriod + last,
      text: `${(0, _util.formatNumber)(leasePeriod + first)} - ${(0, _util.formatNumber)(leasePeriod + last)}`,
      value
    }));
  }, [auctionInfo, ranges]);
  const currentWinner = (0, _react.useMemo)(() => lastWinners && lastWinners.winners.find(({
    firstSlot,
    lastSlot
  }) => firstSlot.eqn(rangeOpts[range].firstSlot) && lastSlot.eqn(rangeOpts[range].lastSlot)), [lastWinners, range, rangeOpts]);
  const isAmountLess = !!(amount && currentWinner) && amount.lte(currentWinner.value);
  const isAmountError = !amount || amount.isZero() || isAmountLess;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
      icon: "plus",
      isDisabled: !ownedIds.length || !hasAccounts || !(auctionInfo !== null && auctionInfo !== void 0 && auctionInfo.numAuctions) || !auctionInfo.leasePeriod || !auctionInfo.endBlock || !api.consts.auctions || (bestNumber === null || bestNumber === void 0 ? void 0 : bestNumber.gte(auctionInfo.endBlock.add(api.consts.auctions.endingPeriod))),
      label: t('Bid'),
      onClick: toggleOpen
    }), isOpen && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
      className: className,
      header: t('Place bid'),
      onClose: toggleOpen,
      size: "large",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_InputOwner.default, {
          onChange: setOwnerInfo,
          ownedIds: ownedIds
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('The first and last lease period for this bid. The last lease period should be after the first with the maximum determined by the auction config.'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Dropdown, {
            label: t('bid period range (first lease - last lease)'),
            onChange: setRange,
            options: rangeOpts,
            value: range
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
          hint: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
              children: t('The amount to to bid for this parachain lease period range.')
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
              children: t('The bid should be more than the current range winner to be accepted and influence the auction outcome.')
            })]
          }),
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputBalance, {
            autoFocus: true,
            isError: isAmountError,
            isZeroable: false,
            label: t('bid amount'),
            onChange: setAmount
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputBalance, {
            defaultValue: currentWinner === null || currentWinner === void 0 ? void 0 : currentWinner.value,
            isDisabled: true,
            label: t('current range winning bid')
          }, range)]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
          accountId: accountId,
          icon: "plus",
          isDisabled: !paraId || isAmountError || !(auctionInfo !== null && auctionInfo !== void 0 && auctionInfo.leasePeriod),
          label: t('Bid'),
          onStart: toggleOpen,
          params: [paraId, auctionInfo === null || auctionInfo === void 0 ? void 0 : auctionInfo.numAuctions, auctionInfo === null || auctionInfo === void 0 ? void 0 : (_auctionInfo$leasePer = auctionInfo.leasePeriod) === null || _auctionInfo$leasePer === void 0 ? void 0 : _auctionInfo$leasePer.addn(ranges[range][0]), auctionInfo === null || auctionInfo === void 0 ? void 0 : (_auctionInfo$leasePer2 = auctionInfo.leasePeriod) === null || _auctionInfo$leasePer2 === void 0 ? void 0 : _auctionInfo$leasePer2.addn(ranges[range][1]), amount],
          tx: api.tx.auctions.bid
        })
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Bid);

exports.default = _default;