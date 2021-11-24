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

var _Fund = _interopRequireDefault(require("./Fund.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
function extractLists(value, leasePeriod) {
  const currentPeriod = leasePeriod === null || leasePeriod === void 0 ? void 0 : leasePeriod.currentPeriod;
  let active = null;
  let ended = null;
  let allIds = null;

  if (value && currentPeriod) {
    active = value.filter(_ref => {
      let {
        firstSlot,
        isCapped,
        isEnded,
        isWinner
      } = _ref;
      return !(isCapped || isEnded || isWinner) && currentPeriod.lte(firstSlot);
    });
    ended = value.filter(_ref2 => {
      let {
        firstSlot,
        isCapped,
        isEnded,
        isWinner
      } = _ref2;
      return isCapped || isEnded || isWinner || currentPeriod.gt(firstSlot);
    });
    allIds = value.map(_ref3 => {
      let {
        paraId
      } = _ref3;
      return paraId;
    });
  }

  return [active, ended, allIds];
}

function sortList(hasLinksMap, list) {
  return list === null || list === void 0 ? void 0 : list.sort((_ref4, _ref5) => {
    let {
      key: a
    } = _ref4;
    let {
      key: b
    } = _ref5;
    const aKnown = hasLinksMap[a] || false;
    const bKnown = hasLinksMap[b] || false;
    return aKnown === bKnown ? 0 : aKnown ? -1 : 1;
  });
}

function Funds(_ref6) {
  let {
    bestNumber,
    className,
    leasePeriod,
    value
  } = _ref6;
  const {
    t
  } = (0, _translate.useTranslation)();
  const bestHash = (0, _reactHooks.useBestHash)();
  const [active, ended, allIds] = (0, _react.useMemo)(() => extractLists(value, leasePeriod), [leasePeriod, value]);
  const hasLinksMap = (0, _reactHooks.useIsParasLinked)(allIds);
  const [activeSorted, endedSorted] = (0, _react.useMemo)(() => [sortList(hasLinksMap, active), sortList(hasLinksMap, ended)], [active, ended, hasLinksMap]);
  const headerActiveRef = (0, _react.useRef)([[t('ongoing'), 'start', 2], [undefined, 'media--800'], [undefined, 'media--1400'], [t('ending'), 'media--1200'], [t('leases')], [t('raised')], [t('count'), 'media--1100'], [undefined, 'media--1000']]);
  const headedEndedRef = (0, _react.useRef)([[t('completed'), 'start', 2], [undefined, 'media--800'], [undefined, 'media--1400'], [t('ending'), 'media--1200'], [t('leases')], [t('raised')], [t('count'), 'media--1100'], [undefined, 'media--1000']]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkWarning, {
      className: "warning centered",
      content: t('Do not transfer any funds directly to a specific account that is associated with a loan or a team. Use the "Contribute" action to record the contribution on-chain using the crowdloan runtime module. When the fund is dissolved, after either the allychain lease expires or the loan ending without winning, the full value will be returned to your account by the runtime. Funds sent directly to an account, without using the crowdloan functionality, may not be returned by the receiving account.')
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Table, {
      className: className,
      empty: value && activeSorted && t('No active campaigns found'),
      header: headerActiveRef.current,
      children: activeSorted === null || activeSorted === void 0 ? void 0 : activeSorted.map(fund => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Fund.default, {
        bestHash: bestHash,
        bestNumber: bestNumber,
        isOngoing: true,
        value: fund
      }, fund.accountId))
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Table, {
      className: className,
      empty: value && endedSorted && t('No completed campaigns found'),
      header: headedEndedRef.current,
      children: endedSorted === null || endedSorted === void 0 ? void 0 : endedSorted.map(fund => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Fund.default, {
        bestNumber: bestNumber,
        leasePeriod: leasePeriod,
        value: fund
      }, fund.accountId))
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Funds);

exports.default = _default;