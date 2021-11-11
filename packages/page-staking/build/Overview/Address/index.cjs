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

var _Favorite = _interopRequireDefault(require("./Favorite.cjs"));

var _NominatedBy = _interopRequireDefault(require("./NominatedBy.cjs"));

var _StakeOther = _interopRequireDefault(require("./StakeOther.cjs"));

var _Status = _interopRequireDefault(require("./Status.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
function expandInfo({
  exposure,
  validatorPrefs
}) {
  var _commission;

  let nominators = [];
  let stakeTotal;
  let stakeOther;
  let stakeOwn;

  if (exposure && exposure.total) {
    var _exposure$total;

    nominators = exposure.others.map(({
      value,
      who
    }) => ({
      nominatorId: who.toString(),
      value: value.unwrap()
    }));
    stakeTotal = ((_exposure$total = exposure.total) === null || _exposure$total === void 0 ? void 0 : _exposure$total.unwrap()) || _util2.BN_ZERO;
    stakeOwn = exposure.own.unwrap();
    stakeOther = stakeTotal.sub(stakeOwn);
  }

  const commission = validatorPrefs === null || validatorPrefs === void 0 ? void 0 : (_commission = validatorPrefs.commission) === null || _commission === void 0 ? void 0 : _commission.unwrap();
  return {
    commission: commission === null || commission === void 0 ? void 0 : commission.toHuman(),
    nominators,
    stakeOther,
    stakeOwn,
    stakeTotal
  };
}

const transformSlashes = {
  transform: opt => opt.unwrapOr(null)
};

function useAddressCalls(api, address, isMain) {
  const params = (0, _react.useMemo)(() => [address], [address]);
  const accountInfo = (0, _reactHooks.useCall)(api.derive.accounts.info, params);
  const slashingSpans = (0, _reactHooks.useCall)(!isMain && api.query.staking.slashingSpans, params, transformSlashes);
  return {
    accountInfo,
    slashingSpans
  };
}

function Address({
  address,
  className = '',
  filterName,
  hasQueries,
  isElected,
  isFavorite,
  isMain,
  isPara,
  lastBlock,
  nominatedBy,
  points,
  recentlyOnline,
  toggleFavorite,
  validatorInfo,
  withIdentity
}) {
  var _ref;

  const {
    api
  } = (0, _reactHooks.useApi)();
  const {
    accountInfo,
    slashingSpans
  } = useAddressCalls(api, address, isMain);
  const {
    commission,
    nominators,
    stakeOther,
    stakeOwn
  } = (0, _react.useMemo)(() => validatorInfo ? expandInfo(validatorInfo) : {
    nominators: []
  }, [validatorInfo]);
  const isVisible = (0, _react.useMemo)(() => accountInfo ? (0, _util.checkVisibility)(api, address, accountInfo, filterName, withIdentity) : true, [api, accountInfo, address, filterName, withIdentity]);

  const _onQueryStats = (0, _react.useCallback)(() => {
    window.location.hash = `/staking/query/${address}`;
  }, [address]);

  if (!isVisible) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("td", {
      className: "badge together",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Favorite.default, {
        address: address,
        isFavorite: isFavorite,
        toggleFavorite: toggleFavorite
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Status.default, {
        isElected: isElected,
        isMain: isMain,
        isPara: isPara,
        isRelay: !!((_ref = api.query.parasShared || api.query.shared) !== null && _ref !== void 0 && _ref.activeValidatorIndices),
        nominators: isMain ? nominators : nominatedBy,
        onlineCount: recentlyOnline === null || recentlyOnline === void 0 ? void 0 : recentlyOnline.blockCount,
        onlineMessage: recentlyOnline === null || recentlyOnline === void 0 ? void 0 : recentlyOnline.hasMessage
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "address",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressSmall, {
        value: address
      })
    }), isMain ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_StakeOther.default, {
      nominators: nominators,
      stakeOther: stakeOther
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_NominatedBy.default, {
      nominators: nominatedBy,
      slashingSpans: slashingSpans
    }), isMain && /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number media--1100",
      children: (stakeOwn === null || stakeOwn === void 0 ? void 0 : stakeOwn.gtn(0)) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
        value: stakeOwn
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number",
      children: commission
    }), isMain && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "number",
        children: points
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "number",
        children: lastBlock
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      children: hasQueries && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Icon, {
        className: "highlight--color",
        icon: "chart-line",
        onClick: _onQueryStats
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "links media--1200",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.LinkExternal, {
        data: address,
        isLogo: true,
        type: isMain ? 'validator' : 'intention'
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Address);

exports.default = _default;