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

function FundAdd({
  auctionInfo,
  bestNumber,
  className,
  leasePeriod,
  ownedIds
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const ranges = (0, _useLeaseRanges.useLeaseRanges)();
  const [{
    accountId,
    paraId
  }, setOwnerInfo] = (0, _react.useState)(EMPTY_OWNER);
  const [cap, setCap] = (0, _react.useState)();
  const [endBlock, setEndBlock] = (0, _react.useState)();
  const [firstSlot, setFirstSlot] = (0, _react.useState)();
  const [lastSlot, setLastSlot] = (0, _react.useState)();
  const [isOpen, toggleOpen] = (0, _reactHooks.useToggle)();
  const maxPeriods = ranges[ranges.length - 1][1] - ranges[0][0];
  const isEndError = !bestNumber || !endBlock || endBlock.lt(bestNumber);
  const isFirstError = !firstSlot || !!leasePeriod && firstSlot.lt(leasePeriod.currentPeriod);
  const isLastError = !lastSlot || !firstSlot || lastSlot.lt(firstSlot) || lastSlot.gt(firstSlot.addn(maxPeriods));
  const defaultSlot = ((auctionInfo === null || auctionInfo === void 0 ? void 0 : auctionInfo.leasePeriod) || (leasePeriod === null || leasePeriod === void 0 ? void 0 : leasePeriod.currentPeriod.add(_util.BN_ONE)) || 1).toString(); // TODO Add verifier

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
      icon: "plus",
      isDisabled: !ownedIds.length,
      label: t('Add fund'),
      onClick: toggleOpen
    }), isOpen && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
      className: className,
      header: t('Add campaign'),
      onClose: toggleOpen,
      size: "large",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_InputOwner.default, {
          onChange: setOwnerInfo,
          ownedIds: ownedIds
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('The amount to be raised in this funding campaign.'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputBalance, {
            isZeroable: false,
            label: t('crowdfund cap'),
            onChange: setCap
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('The end block for contributions to this fund.'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputNumber, {
            isError: isEndError,
            label: t('ending block'),
            onChange: setEndBlock
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
          hint: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
              children: t('The first and last lease periods for this funding campaign.')
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
              children: t('The ending lease period should be after the first and a maximum of {{maxPeriods}} periods more than the first', {
                replace: {
                  maxPeriods
                }
              })
            })]
          }),
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputNumber, {
            defaultValue: defaultSlot,
            isError: isFirstError,
            label: t('first period'),
            onChange: setFirstSlot
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputNumber, {
            defaultValue: defaultSlot,
            isError: isLastError,
            label: t('last period'),
            onChange: setLastSlot
          })]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
          accountId: accountId,
          icon: "plus",
          isDisabled: !paraId || !(cap !== null && cap !== void 0 && cap.gt(_util.BN_ZERO)) || isEndError || isFirstError || isLastError,
          label: t('Add'),
          onStart: toggleOpen,
          params: [paraId, cap, firstSlot, lastSlot, endBlock, null],
          tx: api.tx.crowdloan.create
        })
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(FundAdd);

exports.default = _default;