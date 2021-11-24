"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactHooks = require("@axia-js/react-hooks");

var _reactQuery = require("@axia-js/react-query");

var _util = require("@axia-js/util");

var _Icon = _interopRequireDefault(require("./Icon.cjs"));

var _Tooltip = _interopRequireDefault(require("./Tooltip.cjs"));

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
let id = 0; // group by header & details
//   - all unlockable together
//   - all ongoing together
//   - unlocks are displayed individually

function groupLocks(t, bestNumber) {
  let locks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  return {
    maxBalance: (0, _util.bnMax)(...locks.map(_ref => {
      let {
        balance
      } = _ref;
      return balance;
    }).filter(b => !!b)),
    sorted: locks.map(info => [info, info.unlockAt && info.unlockAt.gt(bestNumber) ? info.unlockAt.sub(bestNumber) : _util.BN_ZERO]).sort((a, b) => (a[0].referendumId || _util.BN_ZERO).cmp(b[0].referendumId || _util.BN_ZERO)).sort((a, b) => a[1].cmp(b[1])).sort((a, b) => a[0].isFinished === b[0].isFinished ? 0 : a[0].isFinished ? -1 : 1).reduce((sorted, _ref2) => {
      let [{
        balance,
        isDelegated,
        isFinished = false,
        referendumId,
        vote
      }, blocks] = _ref2;
      const isCountdown = blocks.gt(_util.BN_ZERO);
      const header = referendumId && vote ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: ["#", referendumId.toString(), " ", (0, _util.formatBalance)(balance, {
          forceUnit: '-'
        }), " ", vote.conviction.toString(), isDelegated && '/d']
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: t('Prior locked voting')
      });
      const prev = sorted.length ? sorted[sorted.length - 1] : null;

      if (!prev || isCountdown || isFinished !== prev.isFinished) {
        sorted.push({
          details: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "faded",
            children: isCountdown ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.BlockToTime, {
              label: `${t('{{blocks}} blocks', {
                replace: {
                  blocks: (0, _util.formatNumber)(blocks)
                }
              })}, `,
              value: blocks
            }) : isFinished ? t('lock expired') : t('ongoing referendum')
          }),
          headers: [header],
          isCountdown,
          isFinished
        });
      } else {
        prev.headers.push(header);
      }

      return sorted;
    }, [])
  };
}

function DemocracyLocks(_ref3) {
  let {
    className = '',
    value
  } = _ref3;
  const {
    t
  } = (0, _translate.useTranslation)();
  const bestNumber = (0, _reactHooks.useBestNumber)();
  const [trigger] = (0, _react.useState)(() => `${Date.now()}-democracy-locks-${++id}`);
  const [{
    maxBalance,
    sorted
  }, setState] = (0, _react.useState)({
    maxBalance: _util.BN_ZERO,
    sorted: []
  });
  (0, _react.useEffect)(() => {
    bestNumber && setState(state => {
      const newState = groupLocks(t, bestNumber, value); // only update when the structure of new is different
      //   - it has a new overall breakdown with sections
      //   - one of the sections has a different number of headers

      return state.sorted.length !== newState.sorted.length || state.sorted.some((s, i) => s.headers.length !== newState.sorted[i].headers.length) ? newState : state;
    });
  }, [bestNumber, t, value]);

  if (!sorted.length) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
      labelPost: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Icon.default, {
        icon: "clock",
        tooltip: trigger
      }),
      value: maxBalance
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tooltip.default, {
      text: sorted.map((_ref4, index) => {
        let {
          details,
          headers
        } = _ref4;
        return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "row",
          children: [headers.map((header, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            children: header
          }, index)), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "faded",
            children: details
          })]
        }, index);
      }),
      trigger: trigger
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(DemocracyLocks).withConfig({
  displayName: "DemocracyLocks",
  componentId: "sc-1bi2068-0"
})(["white-space:nowrap;.ui--FormatBalance{display:inline-block;}"]));

exports.default = _default;