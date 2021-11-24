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

var _Actions = _interopRequireDefault(require("./Actions.cjs"));

var _Parathread = _interopRequireDefault(require("./Parathread.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
function extractParaMap(hasLinksMap, paraIds, leases) {
  return paraIds.reduce((all, id, index) => {
    all.push([id, leases[index].map((optLease, period) => {
      if (optLease.isNone) {
        return null;
      }

      const [accountId, balance] = optLease.unwrap();
      return {
        accountId,
        balance,
        period
      };
    }).filter(item => !!item)]);
    return all;
  }, []).sort((_ref, _ref2) => {
    let [aId, aLeases] = _ref;
    let [bId, bLeases] = _ref2;
    const aKnown = hasLinksMap[aId.toString()] || false;
    const bKnown = hasLinksMap[bId.toString()] || false;
    return aLeases.length && bLeases.length ? aLeases[0].period - bLeases[0].period || aId.cmp(bId) : aLeases.length ? -1 : bLeases.length ? 1 : aKnown === bKnown ? aId.cmp(bId) : aKnown ? -1 : 1;
  });
}

function Parathreads(_ref3) {
  let {
    actionsQueue,
    className,
    ids,
    leasePeriod,
    ownedIds
  } = _ref3;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const hasLinksMap = (0, _reactHooks.useIsParasLinked)(ids);
  const leaseMap = (0, _reactHooks.useCall)(ids && api.query.slots.leases.multi, [ids], {
    transform: (0, _react.useCallback)(_ref4 => {
      let [[paraIds], leases] = _ref4;
      return extractParaMap(hasLinksMap, paraIds, leases);
    }, [hasLinksMap]),
    withParamsTransform: true
  });
  const headerRef = (0, _react.useRef)([[t('parathreads'), 'start', 2], ['', 'media--1100'], [t('head'), 'start media--1500'], [t('lifecycle'), 'start'], [], [], // [t('chain'), 'no-pad-left'],
  [t('leases')], ['', 'media--900']]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Actions.default, {
      ownedIds: ownedIds
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Table, {
      empty: leasePeriod && ids && (ids.length === 0 || leaseMap) && t('There are no available parathreads'),
      header: headerRef.current,
      children: leasePeriod && (leaseMap === null || leaseMap === void 0 ? void 0 : leaseMap.map(_ref5 => {
        let [id, leases] = _ref5;
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Parathread.default, {
          id: id,
          leasePeriod: leasePeriod,
          leases: leases,
          nextAction: actionsQueue.find(_ref6 => {
            let {
              paraIds
            } = _ref6;
            return paraIds.some(p => p.eq(id));
          })
        }, id.toString());
      }))
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Parathreads);

exports.default = _default;