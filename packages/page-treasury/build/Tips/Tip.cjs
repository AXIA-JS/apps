"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _reactQuery = require("@axia-js/react-query");

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _TipEndorse = _interopRequireDefault(require("./TipEndorse.cjs"));

var _TipReason = _interopRequireDefault(require("./TipReason.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0
function isCurrentTip(tip) {
  return !!(tip !== null && tip !== void 0 && tip.findersFee);
}

function extractTipState(tip, allAccounts) {
  const closesAt = tip.closes.unwrapOr(null);
  let finder = null;
  let deposit = null;

  if (isCurrentTip(tip)) {
    finder = tip.finder;
    deposit = tip.deposit;
  } else if (tip.finder.isSome) {
    const finderInfo = tip.finder.unwrap();
    finder = finderInfo[0];
    deposit = finderInfo[1];
  }

  const values = tip.tips.map(_ref => {
    let [, value] = _ref;
    return value;
  }).sort((a, b) => a.cmp(b));
  const midIndex = Math.floor(values.length / 2);
  const median = values.length ? values.length % 2 ? values[midIndex] : values[midIndex - 1].add(values[midIndex]).divn(2) : _util.BN_ZERO;
  return {
    closesAt,
    deposit,
    finder,
    isFinder: !!finder && allAccounts.includes(finder.toString()),
    isTipped: !!values.length,
    isTipper: tip.tips.some(_ref2 => {
      let [address] = _ref2;
      return allAccounts.includes(address.toString());
    }),
    median
  };
}

function Tip(_ref3) {
  let {
    bestNumber,
    className = '',
    defaultId,
    hash,
    isMember,
    members,
    onSelect,
    onlyUntipped,
    tip
  } = _ref3;
  const {
    api
  } = (0, _reactHooks.useApi)();
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    allAccounts
  } = (0, _reactHooks.useAccounts)();
  const {
    closesAt,
    finder,
    isFinder,
    isTipped,
    isTipper,
    median
  } = (0, _react.useMemo)(() => extractTipState(tip, allAccounts), [allAccounts, tip]);
  const councilId = (0, _react.useMemo)(() => allAccounts.find(accountId => members.includes(accountId)) || null, [allAccounts, members]);
  const [isMedianSelected, setMedianTip] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    onSelect(hash, isMedianSelected, median);
  }, [hash, isMedianSelected, median, onSelect]);
  (0, _react.useEffect)(() => {
    setMedianTip(isMember && !isTipper);
  }, [isMember, isTipper]);

  if (onlyUntipped && !closesAt && isTipper) {
    return null;
  }

  const {
    reason,
    tips,
    who
  } = tip;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "address",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressSmall, {
        value: who
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "address media--1400",
      children: finder && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressMini, {
        value: finder
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TipReason.default, {
      hash: reason
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "expand media--1100",
      children: tips.length !== 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Expander, {
        summary: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            children: t('Tippers ({{count}})', {
              replace: {
                count: tips.length
              }
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
            value: median
          })]
        }),
        children: tips.map(_ref4 => {
          let [tipper, balance] = _ref4;
          return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressMini, {
            balance: balance,
            value: tipper,
            withBalance: true
          }, tipper.toString());
        })
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("td", {
      className: "button together",
      children: [closesAt ? bestNumber && closesAt.gt(bestNumber) && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "closingTimer",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.BlockToTime, {
          value: closesAt.sub(bestNumber)
        }), "#", (0, _util.formatNumber)(closesAt)]
      }) : finder && isFinder && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
        accountId: finder,
        className: "media--1400",
        icon: "times",
        label: t('Cancel'),
        params: [hash],
        tx: (api.tx.tips || api.tx.treasury).retractTip
      }), !closesAt || !bestNumber || closesAt.gt(bestNumber) ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_TipEndorse.default, {
        defaultId: defaultId,
        hash: hash,
        isMember: isMember,
        isTipped: isTipped,
        median: median,
        members: members
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
        accountId: councilId,
        icon: "times",
        label: t('Close'),
        params: [hash],
        tx: (api.tx.tips || api.tx.treasury).closeTip
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "badge media--1700",
      children: isMember && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Icon, {
        color: isTipper ? 'green' : 'gray',
        icon: "asterisk"
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Checkbox, {
        isDisabled: !isMember,
        onChange: setMedianTip,
        value: isMedianSelected
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "links media--1700",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.LinkExternal, {
        data: hash,
        isLogo: true,
        type: "tip"
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Tip).withConfig({
  displayName: "Tip",
  componentId: "sc-1uewwyn-0"
})([".closingTimer{display:inline-block;padding:0 0.5rem;}"]));

exports.default = _default;