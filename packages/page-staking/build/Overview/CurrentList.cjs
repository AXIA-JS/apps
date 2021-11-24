"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _reactQuery = require("@axia-js/react-query");

var _Filtering = _interopRequireDefault(require("../Filtering.cjs"));

var _Legend = _interopRequireDefault(require("../Legend.cjs"));

var _translate = require("../translate.cjs");

var _useNominations = _interopRequireDefault(require("../useNominations.cjs"));

var _index = _interopRequireDefault(require("./Address/index.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
const EmptyAuthorsContext = /*#__PURE__*/_react.default.createContext({
  byAuthor: {},
  eraPoints: {},
  lastBlockAuthors: [],
  lastHeaders: []
});

function filterAccounts() {
  let accounts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  let elected = arguments.length > 1 ? arguments[1] : undefined;
  let favorites = arguments.length > 2 ? arguments[2] : undefined;
  let without = arguments.length > 3 ? arguments[3] : undefined;
  return accounts.filter(accountId => !without.includes(accountId)).map(accountId => [accountId, elected.includes(accountId), favorites.includes(accountId)]).sort((_ref, _ref2) => {
    let [,, isFavA] = _ref;
    let [,, isFavB] = _ref2;
    return isFavA === isFavB ? 0 : isFavA ? -1 : 1;
  });
}

function accountsToString(accounts) {
  return accounts.map(a => a.toString());
}

function getFiltered(stakingOverview, favorites, next) {
  const allElected = accountsToString(stakingOverview.nextElected);
  const validatorIds = accountsToString(stakingOverview.validators);
  return {
    validators: filterAccounts(validatorIds, allElected, favorites, []),
    waiting: filterAccounts(allElected, allElected, favorites, validatorIds).concat(filterAccounts(next, [], favorites, allElected))
  };
}

const DEFAULT_PARAS = {};

function CurrentList(_ref3) {
  var _api$derive$imOnline, _ref4;

  let {
    favorites,
    hasQueries,
    isIntentions,
    paraValidators = DEFAULT_PARAS,
    stakingOverview,
    targets,
    toggleFavorite
  } = _ref3;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const {
    byAuthor,
    eraPoints
  } = (0, _react.useContext)(isIntentions ? EmptyAuthorsContext : _reactQuery.BlockAuthorsContext);
  const recentlyOnline = (0, _reactHooks.useCall)(!isIntentions && ((_api$derive$imOnline = api.derive.imOnline) === null || _api$derive$imOnline === void 0 ? void 0 : _api$derive$imOnline.receivedHeartbeats));
  const nominatedBy = (0, _useNominations.default)(isIntentions);
  const [nameFilter, setNameFilter] = (0, _react.useState)('');
  const [toggles, setToggle] = (0, _reactHooks.useSavedFlags)('staking:overview', {
    withIdentity: false
  }); // we have a very large list, so we use a loading delay

  const isLoading = (0, _reactHooks.useLoadingDelay)();
  const {
    validators,
    waiting
  } = (0, _react.useMemo)(() => stakingOverview ? getFiltered(stakingOverview, favorites, targets.waitingIds) : {}, [favorites, stakingOverview, targets]);
  const infoMap = (0, _react.useMemo)(() => {
    var _targets$validators;

    return (_targets$validators = targets.validators) === null || _targets$validators === void 0 ? void 0 : _targets$validators.reduce((result, info) => {
      result[info.key] = info;
      return result;
    }, {});
  }, [targets]);
  const headerRef = (0, _react.useRef)(isIntentions ? [[t('intentions'), 'start', 2], [t('nominators'), 'expand'], [t('commission'), 'number'], [], []] : [[t('validators'), 'start', 2], [t('other stake'), 'expand'], [t('own stake'), 'media--1100'], [t('commission')], [t('points')], [t('last #')], [], [undefined, 'media--1200']]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Table, {
    empty: !isLoading && (isIntentions ? waiting && nominatedBy && t('No waiting validators found') : recentlyOnline && validators && infoMap && t('No active validators found')),
    emptySpinner: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [!waiting && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: t('Retrieving validators')
      }), !infoMap && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: t('Retrieving validator info')
      }), isIntentions ? !nominatedBy && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: t('Retrieving nominators')
      }) : !recentlyOnline && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: t('Retrieving online status')
      })]
    }),
    filter: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Filtering.default, {
      nameFilter: nameFilter,
      setNameFilter: setNameFilter,
      setWithIdentity: setToggle.withIdentity,
      withIdentity: toggles.withIdentity
    }),
    header: headerRef.current,
    legend: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Legend.default, {
      isRelay: !isIntentions && !!((_ref4 = api.query.parasShared || api.query.shared) !== null && _ref4 !== void 0 && _ref4.activeValidatorIndices)
    }),
    children: !isLoading && ((isIntentions ? nominatedBy && waiting : validators) || []).map(_ref5 => {
      let [address, isElected, isFavorite] = _ref5;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {
        address: address,
        filterName: nameFilter,
        hasQueries: hasQueries,
        isElected: isElected,
        isFavorite: isFavorite,
        isMain: !isIntentions,
        isPara: isIntentions ? false : paraValidators[address],
        lastBlock: byAuthor[address],
        nominatedBy: nominatedBy === null || nominatedBy === void 0 ? void 0 : nominatedBy[address],
        points: eraPoints[address],
        recentlyOnline: recentlyOnline === null || recentlyOnline === void 0 ? void 0 : recentlyOnline[address],
        toggleFavorite: toggleFavorite,
        validatorInfo: infoMap === null || infoMap === void 0 ? void 0 : infoMap[address],
        withIdentity: toggles.withIdentity
      }, address);
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo(CurrentList);

exports.default = _default;