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

var _translate = require("../../translate.cjs");

var _useInactives = _interopRequireDefault(require("../useInactives.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
const EMPTY_MAP = {};

function mapExposure(stashId, all, eraExposure) {
  if (!(eraExposure !== null && eraExposure !== void 0 && eraExposure.validators)) {
    return EMPTY_MAP;
  }

  const nomBalanceMap = {}; // for every active nominee

  all.forEach(nom => {
    var _eraExposure$validato;

    // cycle through its nominator to find our current stash
    (_eraExposure$validato = eraExposure.validators[nom]) === null || _eraExposure$validato === void 0 ? void 0 : _eraExposure$validato.others.some(o => {
      if (o.who.eq(stashId)) {
        nomBalanceMap[nom] = o.value.toBn();
        return true;
      }

      return false;
    });
  });
  return nomBalanceMap;
}

function renderNominators(stashId) {
  let all = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  let eraExposure = arguments.length > 2 ? arguments[2] : undefined;
  return all.length ? [all.length, () => {
    const nomBalanceMap = mapExposure(stashId, all, eraExposure);
    return all.map((nomineeId, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressMini, {
      balance: nomBalanceMap[nomineeId],
      value: nomineeId,
      withBalance: !!eraExposure
    }, index));
  }] : null;
}

function ListNominees(_ref) {
  var _api$derive$session, _api$consts$staking, _api$consts$staking$m;

  let {
    nominating,
    stashId
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const {
    nomsActive,
    nomsChilled,
    nomsInactive,
    nomsOver,
    nomsWaiting
  } = (0, _useInactives.default)(stashId, nominating);
  const sessionInfo = (0, _reactHooks.useCall)(api.query.staking && ((_api$derive$session = api.derive.session) === null || _api$derive$session === void 0 ? void 0 : _api$derive$session.indexes));
  const eraExposure = (0, _reactHooks.useCall)((0, _util.isFunction)(api.query.staking.erasStakers) && api.derive.staking.eraExposure, [sessionInfo === null || sessionInfo === void 0 ? void 0 : sessionInfo.activeEra]);
  const [renActive, renChilled, renInactive, renOver, renWaiting] = (0, _react.useMemo)(() => [renderNominators(stashId, nomsActive, eraExposure), renderNominators(stashId, nomsChilled), renderNominators(stashId, nomsInactive), renderNominators(stashId, nomsOver), renderNominators(stashId, nomsWaiting)], [eraExposure, nomsActive, nomsChilled, nomsInactive, nomsOver, nomsWaiting, stashId]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [renOver && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Expander, {
      className: "stakeOver",
      help: t('These validators are active but only the top {{max}} nominators by backing stake will be receiving rewards. The nominating stash is not one of those to be rewarded in the current era.', {
        replace: (_api$consts$staking = api.consts.staking) === null || _api$consts$staking === void 0 ? void 0 : (_api$consts$staking$m = _api$consts$staking.maxNominatorRewardedPerValidator) === null || _api$consts$staking$m === void 0 ? void 0 : _api$consts$staking$m.toString()
      }),
      renderChildren: renOver[1],
      summary: t('Oversubscribed nominations ({{count}})', {
        replace: {
          count: renOver[0]
        }
      })
    }), renActive && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Expander, {
      help: t('The validators selected by the Phragmen algorithm to nominate for this era.'),
      renderChildren: renActive[1],
      summary: t('Active nominations ({{count}})', {
        replace: {
          count: renActive[0]
        }
      })
    }), renInactive && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Expander, {
      help: t('The elected validator list that did not get selected by the Phragmen algorithm for this era. However they may be selected in the future.'),
      renderChildren: renInactive[1],
      summary: t('Inactive nominations ({{count}})', {
        replace: {
          count: renInactive[0]
        }
      })
    }), renChilled && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Expander, {
      help: t('The validators that got slashed and for which your nomination got auto-chilled. Re-nominating these will make them available to the Phragmen algorithm.'),
      renderChildren: renChilled[1],
      summary: t('Renomination required ({{count}})', {
        replace: {
          count: renChilled[0]
        }
      })
    }), renWaiting && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Expander, {
      help: t('The validators that are not in the validator set because they need more nominations or because they have willingly stop validating. Any nominations made before the next election will also appear here.'),
      renderChildren: renWaiting[1],
      summary: t('Waiting nominations ({{count}})', {
        replace: {
          count: renWaiting[0]
        }
      })
    }), nomsActive && nomsInactive && nomsActive.length === 0 && nomsInactive.length !== 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkWarning, {
      content: t('Your nomination has not been applied to any validator in the active set by the election algorithm. This could mean that all your validators are over-subscribed or that you have less bonded than the lowest nominator elected for each of the validators.')
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(ListNominees);

exports.default = _default;