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

var _Scheduled = _interopRequireDefault(require("./Scheduled.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
const transformEntries = {
  transform: entries => {
    return entries.filter(([, vecSchedOpt]) => vecSchedOpt.some(schedOpt => schedOpt.isSome)).reduce((items, [key, vecSchedOpt]) => {
      const blockNumber = key.args[0];
      return vecSchedOpt.filter(schedOpt => schedOpt.isSome).map(schedOpt => schedOpt.unwrap()).reduce((items, {
        call,
        maybeId,
        maybePeriodic,
        priority
      }, index) => {
        items.push({
          blockNumber,
          call,
          key: `${blockNumber.toString()}-${index}`,
          maybeId,
          maybePeriodic,
          priority
        });
        return items;
      }, items);
    }, []);
  }
};

function Schedule({
  className = ''
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const bestNumber = (0, _reactHooks.useBestNumber)();
  const items = (0, _reactHooks.useCall)(api.query.scheduler.agenda.entries, undefined, transformEntries);
  const filtered = (0, _react.useMemo)(() => bestNumber && items && items.filter(({
    blockNumber
  }) => blockNumber.gte(bestNumber)), [bestNumber, items]);
  const headerRef = (0, _react.useRef)([[t('scheduled'), 'start'], [t('id'), 'start'], [t('remaining')], [t('period')], [t('count')]]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Table, {
    className: className,
    empty: filtered && t('No active schedules'),
    header: headerRef.current,
    children: filtered === null || filtered === void 0 ? void 0 : filtered.map(value => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Scheduled.default, {
      bestNumber: bestNumber,
      value: value
    }, value.key))
  });
}

var _default = /*#__PURE__*/_react.default.memo(Schedule);

exports.default = _default;