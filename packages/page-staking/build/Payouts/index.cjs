"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bn = _interopRequireDefault(require("bn.js"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _reactQuery = require("@axia-js/react-query");

var _util = require("@axia-js/util");

var _ElectionBanner = _interopRequireDefault(require("../ElectionBanner.cjs"));

var _translate = require("../translate.cjs");

var _PayButton = _interopRequireDefault(require("./PayButton.cjs"));

var _Stash = _interopRequireDefault(require("./Stash.cjs"));

var _Validator = _interopRequireDefault(require("./Validator.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
const DAY_SECS = new _bn.default(1000 * 60 * 60 * 24);

function groupByValidator(allRewards) {
  return Object.entries(allRewards).reduce((grouped, _ref) => {
    let [stashId, rewards] = _ref;
    rewards.forEach(reward => {
      Object.entries(reward.validators).forEach(_ref2 => {
        let [validatorId, {
          total,
          value
        }] = _ref2;
        const entry = grouped.find(entry => entry.validatorId === validatorId);

        if (entry) {
          const eraEntry = entry.eras.find(entry => entry.era.eq(reward.era));

          if (eraEntry) {
            eraEntry.stashes[stashId] = value;
          } else {
            entry.eras.push({
              era: reward.era,
              stashes: {
                [stashId]: value
              }
            });
          }

          entry.available = entry.available.add(value);
          entry.total = entry.total.add(total);
        } else {
          grouped.push({
            available: value,
            eras: [{
              era: reward.era,
              stashes: {
                [stashId]: value
              }
            }],
            total,
            validatorId
          });
        }
      });
    });
    return grouped;
  }, []).sort((a, b) => b.available.cmp(a.available));
}

function extractStashes(allRewards) {
  return Object.entries(allRewards).map(_ref3 => {
    let [stashId, rewards] = _ref3;
    return {
      available: rewards.reduce((result, _ref4) => {
        let {
          validators
        } = _ref4;
        return Object.values(validators).reduce((result, _ref5) => {
          let {
            value
          } = _ref5;
          return result.iadd(value);
        }, result);
      }, new _bn.default(0)),
      rewards,
      stashId
    };
  }).filter(_ref6 => {
    let {
      available
    } = _ref6;
    return !available.isZero();
  }).sort((a, b) => b.available.cmp(a.available));
}

function getAvailable(allRewards) {
  if (allRewards) {
    const stashes = extractStashes(allRewards);
    const validators = groupByValidator(allRewards);
    const stashAvail = stashes.length ? stashes.reduce((a, _ref7) => {
      let {
        available
      } = _ref7;
      return a.iadd(available);
    }, new _bn.default(0)) : null;
    const [valAvail, valTotal] = validators.length ? validators.reduce((_ref8, _ref9) => {
      let [a, t] = _ref8;
      let {
        available,
        total
      } = _ref9;
      return [a.iadd(available), t.iadd(total)];
    }, [new _bn.default(0), new _bn.default(0)]) : [null, null];
    return {
      stashAvail,
      stashes,
      valAvail,
      valTotal,
      validators
    };
  }

  return {};
}

function getOptions(api, eraLength, historyDepth, t) {
  var _api$consts$babe, _api$consts$timestamp;

  if (!eraLength || !historyDepth) {
    return [{
      text: '',
      value: 0
    }];
  }

  const blocksPerDay = DAY_SECS.div(((_api$consts$babe = api.consts.babe) === null || _api$consts$babe === void 0 ? void 0 : _api$consts$babe.expectedBlockTime) || ((_api$consts$timestamp = api.consts.timestamp) === null || _api$consts$timestamp === void 0 ? void 0 : _api$consts$timestamp.minimumPeriod.muln(2)) || new _bn.default(6000));
  const maxBlocks = eraLength.mul(historyDepth);
  const eraSelection = [];
  const days = new _bn.default(2);

  while (true) {
    const dayBlocks = blocksPerDay.mul(days);

    if (dayBlocks.gte(maxBlocks)) {
      break;
    }

    eraSelection.push({
      text: t('{{days}} days', {
        replace: {
          days: days.toString()
        }
      }),
      value: dayBlocks.div(eraLength).toNumber()
    });
    days.imul(_util.BN_THREE);
  }

  eraSelection.push({
    text: t('Max, {{eras}} eras', {
      replace: {
        eras: historyDepth.toNumber()
      }
    }),
    value: historyDepth.toNumber()
  });
  return eraSelection;
}

function Payouts(_ref10) {
  let {
    className = '',
    isInElection,
    ownValidators
  } = _ref10;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [hasOwnValidators] = (0, _react.useState)(() => ownValidators.length !== 0);
  const [myStashesIndex, setMyStashesIndex] = (0, _react.useState)(() => hasOwnValidators ? 0 : 1);
  const [eraSelectionIndex, setEraSelectionIndex] = (0, _react.useState)(0);
  const eraLength = (0, _reactHooks.useCall)(api.derive.session.eraLength);
  const historyDepth = (0, _reactHooks.useCall)(api.query.staking.historyDepth);
  const eraSelection = (0, _react.useMemo)(() => getOptions(api, eraLength, historyDepth, t), [api, eraLength, historyDepth, t]);
  const {
    allRewards,
    isLoadingRewards
  } = (0, _reactHooks.useOwnEraRewards)(eraSelection[eraSelectionIndex].value, myStashesIndex ? undefined : ownValidators);
  const {
    stashAvail,
    stashes,
    valAvail,
    validators
  } = (0, _react.useMemo)(() => getAvailable(allRewards), [allRewards]);
  const headerStashes = (0, _react.useMemo)(() => [[myStashesIndex ? t('payout/stash') : t('overall/validator'), 'start', 2], [t('eras'), 'start'], [myStashesIndex ? t('own') : t('total')], ['remaining'], [undefined, undefined, 3]], [myStashesIndex, t]);
  const headerValidatorsRef = (0, _react.useRef)([[t('payout/validator'), 'start', 2], [t('eras'), 'start'], [t('own')], ['remaining'], [undefined, undefined, 3]]);
  const valOptions = (0, _react.useMemo)(() => [{
    isDisabled: !hasOwnValidators,
    text: t('Own validators'),
    value: 'val'
  }, {
    text: t('Own stashes'),
    value: 'all'
  }], [hasOwnValidators, t]);
  const footerStash = (0, _react.useMemo)(() => /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      colSpan: 3
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number",
      children: stashAvail && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
        value: stashAvail
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      colSpan: 4
    })]
  }), [stashAvail]);
  const footerVal = (0, _react.useMemo)(() => /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      colSpan: 3
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number",
      children: valAvail && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
        value: valAvail
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      colSpan: 4
    })]
  }), [valAvail]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Button.Group, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.ToggleGroup, {
        onChange: setEraSelectionIndex,
        options: eraSelection,
        value: eraSelectionIndex
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.ToggleGroup, {
        onChange: setMyStashesIndex,
        options: valOptions,
        value: myStashesIndex
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_PayButton.default, {
        isAll: true,
        isDisabled: isInElection,
        payout: validators
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ElectionBanner.default, {
      isInElection: isInElection
    }), !isLoadingRewards && !(stashes !== null && stashes !== void 0 && stashes.length) && /*#__PURE__*/(0, _jsxRuntime.jsxs)("article", {
      className: "warning centered",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        children: t('Payouts of rewards for a validator can be initiated by any account. This means that as soon as a validator or nominator requests a payout for an era, all the nominators for that validator will be rewarded. Each user does not need to claim individually and the suggestion is that validators should claim rewards for everybody as soon as an era ends.')
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        children: t('If you have not claimed rewards straight after the end of the era, the validator is in the active set and you are seeing no rewards, this would mean that the reward payout transaction was made by another account on your behalf. Always check your favorite explorer to see any historic payouts made to your accounts.')
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Table, {
      empty: !isLoadingRewards && stashes && (myStashesIndex ? t('No pending payouts for your stashes') : t('No pending payouts for your validators')),
      emptySpinner: t('Retrieving info for the selected eras, this will take some time'),
      footer: footerStash,
      header: headerStashes,
      isFixed: true,
      children: !isLoadingRewards && (stashes === null || stashes === void 0 ? void 0 : stashes.map(payout => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Stash.default, {
        payout: payout
      }, payout.stashId)))
    }), myStashesIndex === 1 && !isLoadingRewards && validators && validators.length !== 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Table, {
      footer: footerVal,
      header: headerValidatorsRef.current,
      isFixed: true,
      children: !isLoadingRewards && validators.filter(_ref11 => {
        let {
          available
        } = _ref11;
        return !available.isZero();
      }).map(payout => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Validator.default, {
        isDisabled: isInElection,
        payout: payout
      }, payout.validatorId))
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Payouts).withConfig({
  displayName: "Payouts",
  componentId: "sc-15uy4cc-0"
})([".payout-eras{padding-left:0.25rem;vertical-align:middle;span{white-space:nowrap;}}"]));

exports.default = _default;