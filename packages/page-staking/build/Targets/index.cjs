"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _constants = require("../constants.cjs");

var _ElectionBanner = _interopRequireDefault(require("../ElectionBanner.cjs"));

var _Filtering = _interopRequireDefault(require("../Filtering.cjs"));

var _Legend = _interopRequireDefault(require("../Legend.cjs"));

var _translate = require("../translate.cjs");

var _useIdentities = _interopRequireDefault(require("../useIdentities.cjs"));

var _useNominations = _interopRequireDefault(require("../useNominations.cjs"));

var _Nominate = _interopRequireDefault(require("./Nominate.cjs"));

var _Summary = _interopRequireDefault(require("./Summary.cjs"));

var _useOwnNominators = _interopRequireDefault(require("./useOwnNominators.cjs"));

var _Validator = _interopRequireDefault(require("./Validator.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const CLASSES = {
  rankBondOther: 'media--1600',
  rankBondOwn: 'media--900'
};
const MAX_CAP_PERCENT = 100; // 75 if only using numNominators

const MAX_COMM_PERCENT = 20; // -1 for median

const MAX_DAYS = 7;
const SORT_KEYS = ['rankBondTotal', 'rankBondOwn', 'rankBondOther', 'rankOverall'];

function overlapsDisplay(displays, test) {
  return displays.some(d => d.length === test.length ? d.length === 1 ? d[0] === test[0] : d.reduce((c, p, i) => c + (p === test[i] ? 1 : 0), 0) >= test.length - 1 : false);
}

function applyFilter(validators, medianComm, allIdentity, _ref, nominatedBy) {
  let {
    daysPayout,
    isBabe,
    maxPaid,
    withElected,
    withGroup,
    withIdentity,
    withPayout,
    withoutComm,
    withoutOver
  } = _ref;
  const displays = [];
  const parentIds = [];
  return validators.filter(_ref2 => {
    var _nominatedBy$stashId;

    let {
      accountId,
      commissionPer,
      isElected,
      isFavorite,
      lastPayout,
      numNominators
    } = _ref2;

    if (isFavorite) {
      return true;
    }

    const stashId = accountId.toString();
    const thisIdentity = allIdentity[stashId];
    const nomCount = numNominators || (nominatedBy === null || nominatedBy === void 0 ? void 0 : (_nominatedBy$stashId = nominatedBy[stashId]) === null || _nominatedBy$stashId === void 0 ? void 0 : _nominatedBy$stashId.length) || 0;

    if ((!withElected || isElected) && (!withIdentity || !!(thisIdentity !== null && thisIdentity !== void 0 && thisIdentity.hasIdentity)) && (!withPayout || !isBabe || !!lastPayout && daysPayout.gte(lastPayout)) && (!withoutComm || (MAX_COMM_PERCENT > 0 ? commissionPer < MAX_COMM_PERCENT : !medianComm || commissionPer <= medianComm)) && (!withoutOver || !maxPaid || maxPaid.muln(MAX_CAP_PERCENT).div(_util.BN_HUNDRED).gten(nomCount))) {
      if (!withGroup) {
        return true;
      } else if (!thisIdentity || !thisIdentity.hasIdentity) {
        parentIds.push(stashId);
        return true;
      } else if (!thisIdentity.parentId) {
        if (!parentIds.includes(stashId)) {
          if (thisIdentity.display) {
            const sanitized = thisIdentity.display.replace(/[^\x20-\x7E]/g, '').replace(/-/g, ' ').replace(/_/g, ' ').split(' ').map(p => p.trim()).filter(v => !!v);

            if (overlapsDisplay(displays, sanitized)) {
              return false;
            }

            displays.push(sanitized);
          }

          parentIds.push(stashId);
          return true;
        }
      } else if (!parentIds.includes(thisIdentity.parentId)) {
        parentIds.push(thisIdentity.parentId);
        return true;
      }
    }

    return false;
  });
}

function sort(sortBy, sortFromMax, validators) {
  return validators.sort((a, b) => sortFromMax ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy]).sort((a, b) => a.isFavorite === b.isFavorite ? 0 : a.isFavorite ? -1 : 1);
}

function extractNominees() {
  let ownNominators = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  const myNominees = [];
  ownNominators.forEach(_ref3 => {
    let {
      nominating = []
    } = _ref3;
    nominating.forEach(nominee => {
      !myNominees.includes(nominee) && myNominees.push(nominee);
    });
  });
  return myNominees;
}

function selectProfitable(list, maxNominations) {
  const result = [];

  for (let i = 0; i < list.length && result.length < maxNominations; i++) {
    const {
      isBlocking,
      isFavorite,
      key,
      stakedReturnCmp
    } = list[i];
    !isBlocking && (isFavorite || stakedReturnCmp > 0) && result.push(key);
  }

  return result;
}

const DEFAULT_FLAGS = {
  withElected: false,
  withGroup: true,
  withIdentity: false,
  withPayout: false,
  withoutComm: true,
  withoutOver: true
};
const DEFAULT_NAME = {
  isQueryFiltered: false,
  nameFilter: ''
};
const DEFAULT_SORT = {
  sortBy: 'rankOverall',
  sortFromMax: true
};

function Targets(_ref4) {
  let {
    className = '',
    isInElection,
    ownStashes,
    targets: {
      avgStaked,
      inflation: {
        stakedReturn
      },
      lowStaked,
      medianComm,
      minNominated,
      minNominatorBond,
      nominators,
      totalIssuance,
      totalStaked,
      validatorIds,
      validators
    },
    toggleFavorite,
    toggleLedger
  } = _ref4;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const allSlashes = (0, _reactHooks.useAvailableSlashes)();
  const daysPayout = (0, _reactHooks.useBlocksPerDays)(MAX_DAYS);
  const ownNominators = (0, _useOwnNominators.default)(ownStashes);
  const nominatedBy = (0, _useNominations.default)(true);
  const allIdentity = (0, _useIdentities.default)(validatorIds);
  const [selected, setSelected] = (0, _react.useState)([]);
  const [{
    isQueryFiltered,
    nameFilter
  }, setNameFilter] = (0, _react.useState)(DEFAULT_NAME);
  const [toggles, setToggle] = (0, _reactHooks.useSavedFlags)('staking:targets', DEFAULT_FLAGS);
  const [{
    sortBy,
    sortFromMax
  }, setSortBy] = (0, _react.useState)(DEFAULT_SORT);
  const [sorted, setSorted] = (0, _react.useState)();
  const labelsRef = (0, _react.useRef)({
    rankBondOther: t('other stake'),
    rankBondOwn: t('own stake'),
    rankBondTotal: t('total stake'),
    rankOverall: t('return')
  });
  const flags = (0, _react.useMemo)(() => {
    var _api$consts$staking;

    return _objectSpread(_objectSpread({}, toggles), {}, {
      daysPayout,
      isBabe: !!api.consts.babe,
      isQueryFiltered,
      maxPaid: (_api$consts$staking = api.consts.staking) === null || _api$consts$staking === void 0 ? void 0 : _api$consts$staking.maxNominatorRewardedPerValidator
    });
  }, [api, daysPayout, isQueryFiltered, toggles]);
  const filtered = (0, _react.useMemo)(() => allIdentity && validators && nominatedBy && applyFilter(validators, medianComm, allIdentity, flags, nominatedBy), [allIdentity, flags, medianComm, nominatedBy, validators]); // We are using an effect here to get this async. Sorting will have a double-render, however it allows
  // the page to immediately display (with loading), whereas useMemo would have a laggy interface
  // (the same applies for changing the sort order, state here is more effective)

  (0, _react.useEffect)(() => {
    filtered && setSorted(sort(sortBy, sortFromMax, filtered));
  }, [filtered, sortBy, sortFromMax]);
  (0, _react.useEffect)(() => {
    toggleLedger();
  }, [toggleLedger]);
  const myNominees = (0, _react.useMemo)(() => extractNominees(ownNominators), [ownNominators]);

  const _sort = (0, _react.useCallback)(sortBy => setSortBy(p => ({
    sortBy,
    sortFromMax: sortBy === p.sortBy ? !p.sortFromMax : true
  })), []);

  const _toggleSelected = (0, _react.useCallback)(address => setSelected(selected.includes(address) ? selected.filter(a => address !== a) : [...selected, address]), [selected]);

  const _selectProfitable = (0, _react.useCallback)(() => filtered && setSelected(selectProfitable(filtered, api.consts.staking.maxNominations ? api.consts.staking.maxNominations.toNumber() : _constants.MAX_NOMINATIONS)), [api, filtered]);

  const _setNameFilter = (0, _react.useCallback)((nameFilter, isQueryFiltered) => setNameFilter({
    isQueryFiltered,
    nameFilter
  }), []);

  const header = (0, _react.useMemo)(() => [[t('validators'), 'start', 3], [t('payout'), 'media--1400'], [t('nominators'), 'media--1200', 2], [t('comm.'), 'media--1100'], ...SORT_KEYS.map(header => [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [labelsRef.current[header], /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Icon, {
      icon: sortBy === header ? sortFromMax ? 'chevron-down' : 'chevron-up' : 'minus'
    })]
  }), `${sorted ? `isClickable ${sortBy === header ? 'highlight--border' : ''} number` : 'number'} ${CLASSES[header] || ''}`, 1, () => _sort(header)]), [], []], [_sort, labelsRef, sortBy, sorted, sortFromMax, t]);
  const filter = (0, _react.useMemo)(() => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Filtering.default, {
      nameFilter: nameFilter,
      setNameFilter: _setNameFilter,
      setWithIdentity: setToggle.withIdentity,
      withIdentity: toggles.withIdentity,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Toggle, {
        className: "staking--buttonToggle",
        label: t('single from operator'),
        onChange: setToggle.withGroup,
        value: toggles.withGroup
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Toggle, {
        className: "staking--buttonToggle",
        label: MAX_COMM_PERCENT > 0 ? t('no {{maxComm}}%+ comm', {
          replace: {
            maxComm: MAX_COMM_PERCENT
          }
        }) : t('no median+ comm'),
        onChange: setToggle.withoutComm,
        value: toggles.withoutComm
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Toggle, {
        className: "staking--buttonToggle",
        label: MAX_CAP_PERCENT < 100 ? t('no {{maxCap}}%+ capacity', {
          replace: {
            maxCap: MAX_CAP_PERCENT
          }
        }) : t('no at capacity'),
        onChange: setToggle.withoutOver,
        value: toggles.withoutOver
      }), api.consts.babe &&
      /*#__PURE__*/
      // FIXME have some sane era defaults for Aura
      (0, _jsxRuntime.jsx)(_reactComponents.Toggle, {
        className: "staking--buttonToggle",
        label: t('recent payouts'),
        onChange: setToggle.withPayout,
        value: toggles.withPayout
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Toggle, {
        className: "staking--buttonToggle",
        label: t('only elected'),
        onChange: setToggle.withElected,
        value: toggles.withElected
      })]
    })
  }), [api, nameFilter, _setNameFilter, setToggle, t, toggles]);
  const displayList = isQueryFiltered ? validators : sorted;
  const maxNominations = api.consts.staking.maxNominations ? api.consts.staking.maxNominations.toNumber() : _constants.MAX_NOMINATIONS;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Summary.default, {
      avgStaked: avgStaked,
      lowStaked: lowStaked,
      minNominated: minNominated,
      minNominatorBond: minNominatorBond,
      numNominators: nominators === null || nominators === void 0 ? void 0 : nominators.length,
      numValidators: validators === null || validators === void 0 ? void 0 : validators.length,
      stakedReturn: stakedReturn,
      totalIssuance: totalIssuance,
      totalStaked: totalStaked
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Button.Group, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "check",
        isDisabled: !(validators !== null && validators !== void 0 && validators.length) || !(ownNominators !== null && ownNominators !== void 0 && ownNominators.length),
        label: t('Most profitable'),
        onClick: _selectProfitable
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Nominate.default, {
        isDisabled: isInElection || !(validators !== null && validators !== void 0 && validators.length),
        ownNominators: ownNominators,
        targets: selected
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ElectionBanner.default, {
      isInElection: isInElection
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Table, {
      empty: sorted && t('No active validators to check'),
      emptySpinner: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [!(validators && allIdentity) && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          children: t('Retrieving validators')
        }), !nominatedBy && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          children: t('Retrieving nominators')
        })]
      }),
      filter: filter,
      header: header,
      legend: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Legend.default, {}),
      children: displayList === null || displayList === void 0 ? void 0 : displayList.map(info => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Validator.default, {
        allSlashes: allSlashes,
        canSelect: selected.length < maxNominations,
        filterName: nameFilter,
        info: info,
        isNominated: myNominees.includes(info.key),
        isSelected: selected.includes(info.key),
        nominatedBy: nominatedBy === null || nominatedBy === void 0 ? void 0 : nominatedBy[info.key],
        toggleFavorite: toggleFavorite,
        toggleSelected: _toggleSelected
      }, info.key))
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Targets).withConfig({
  displayName: "Targets",
  componentId: "sc-19x5wb3-0"
})(["text-align:center;th.isClickable{.ui--Icon{margin-left:0.5rem;}}.ui--Table{overflow-x:auto;}"]));

exports.default = _default;