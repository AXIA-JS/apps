"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _util = require("@axia-js/react-components/util");

var _reactHooks = require("@axia-js/react-hooks");

var _reactQuery = require("@axia-js/react-query");

var _util2 = require("@axia-js/util");

var _MaxBadge = _interopRequireDefault(require("../MaxBadge.cjs"));

var _Favorite = _interopRequireDefault(require("../Overview/Address/Favorite.cjs"));

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
function queryAddress(address) {
  window.location.hash = `/staking/query/${address}`;
}

function Validator({
  allSlashes,
  canSelect,
  filterName,
  info,
  isNominated,
  isSelected,
  nominatedBy = [],
  toggleFavorite,
  toggleSelected
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const accountInfo = (0, _reactHooks.useCall)(api.derive.accounts.info, [info.accountId]);
  const [,, time] = (0, _reactHooks.useBlockTime)(info.lastPayout);
  const isVisible = (0, _react.useMemo)(() => accountInfo ? (0, _util.checkVisibility)(api, info.key, accountInfo, filterName) : true, [accountInfo, api, filterName, info]);
  const slashes = (0, _react.useMemo)(() => (allSlashes || []).map(([era, all]) => ({
    era,
    slashes: all.filter(({
      validator
    }) => validator.eq(info.accountId))
  })).filter(({
    slashes
  }) => slashes.length), [allSlashes, info]);

  const _onQueryStats = (0, _react.useCallback)(() => queryAddress(info.key), [info.key]);

  const _toggleSelected = (0, _react.useCallback)(() => toggleSelected(info.key), [info.key, toggleSelected]);

  if (!isVisible) {
    return null;
  }

  const {
    accountId,
    bondOther,
    bondOwn,
    bondTotal,
    commissionPer,
    isBlocking,
    isElected,
    isFavorite,
    key,
    lastPayout,
    numNominators,
    rankOverall,
    stakedReturnCmp
  } = info;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("td", {
      className: "badge together",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Favorite.default, {
        address: key,
        isFavorite: isFavorite,
        toggleFavorite: toggleFavorite
      }), isNominated ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Badge, {
        color: "green",
        icon: "hand-paper"
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Badge, {
        color: "transparent"
      }), isElected ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Badge, {
        color: "blue",
        icon: "chevron-right"
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Badge, {
        color: "transparent"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_MaxBadge.default, {
        numNominators: numNominators || nominatedBy.length
      }), isBlocking && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Badge, {
        color: "red",
        icon: "user-slash"
      }), slashes.length !== 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Badge, {
        color: "red",
        hover: t('Slashed in era {{eras}}', {
          replace: {
            eras: slashes.map(({
              era
            }) => (0, _util2.formatNumber)(era)).join(', ')
          }
        }),
        icon: "skull-crossbones"
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number",
      children: (0, _util2.formatNumber)(rankOverall)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "address all",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressSmall, {
        value: accountId
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number media--1400",
      children: lastPayout && (api.consts.babe ? time.days ? time.days === 1 ? t('yesterday') : t('{{days}} days', {
        replace: {
          days: time.days
        }
      }) : t('recently') : (0, _util2.formatNumber)(lastPayout))
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number media--1200 no-pad-right",
      children: numNominators || ''
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number media--1200 no-pad-left",
      children: nominatedBy.length || ''
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("td", {
      className: "number media--1100",
      children: [commissionPer.toFixed(2), "%"]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number together",
      children: !bondTotal.isZero() && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
        value: bondTotal
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number together media--900",
      children: !bondOwn.isZero() && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
        value: bondOwn
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number together media--1600",
      children: !bondOther.isZero() && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
        value: bondOther
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number together",
      children: stakedReturnCmp > 0 && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [stakedReturnCmp.toFixed(2), "%"]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      children: !isBlocking && (canSelect || isSelected) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Checkbox, {
        onChange: _toggleSelected,
        value: isSelected
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Icon, {
        className: "staking--stats highlight--color",
        icon: "chart-line",
        onClick: _onQueryStats
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Validator);

exports.default = _default;