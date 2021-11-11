"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bn = _interopRequireDefault(require("bn.js"));

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _reactQuery = require("@axia-js/react-query");

var _util = require("@axia-js/util");

var _ElectionBanner = _interopRequireDefault(require("../ElectionBanner.cjs"));

var _translate = require("../translate.cjs");

var _index = _interopRequireDefault(require("./Account/index.cjs"));

var _NewNominator = _interopRequireDefault(require("./NewNominator.cjs"));

var _NewStash = _interopRequireDefault(require("./NewStash.cjs"));

var _NewValidator = _interopRequireDefault(require("./NewValidator.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
function assignValue({
  isStashNominating,
  isStashValidating
}) {
  return isStashValidating ? 1 : isStashNominating ? 5 : 99;
}

function sortStashes(a, b) {
  return assignValue(a) - assignValue(b);
}

function extractState(ownStashes) {
  if (!ownStashes) {
    return {};
  }

  const bondedNoms = new _bn.default(0);
  const bondedNone = new _bn.default(0);
  const bondedVals = new _bn.default(0);
  const bondedTotal = new _bn.default(0);
  ownStashes.forEach(({
    isStashNominating,
    isStashValidating,
    stakingLedger
  }) => {
    const value = stakingLedger && stakingLedger.total ? stakingLedger.total.unwrap() : _util.BN_ZERO;
    bondedTotal.iadd(value);

    if (isStashNominating) {
      bondedNoms.iadd(value);
    } else if (isStashValidating) {
      bondedVals.iadd(value);
    } else {
      bondedNone.iadd(value);
    }
  });
  return {
    bondedNoms,
    bondedNone,
    bondedTotal,
    bondedVals,
    foundStashes: ownStashes.sort(sortStashes)
  };
}

function filterStashes(typeIndex, stashes) {
  return stashes.filter(({
    isStashNominating,
    isStashValidating
  }) => {
    switch (typeIndex) {
      case 1:
        return isStashNominating;

      case 2:
        return isStashValidating;

      case 3:
        return !isStashNominating && !isStashValidating;

      default:
        return true;
    }
  });
}

function getValue(typeIndex, {
  bondedNoms,
  bondedNone,
  bondedTotal,
  bondedVals
}) {
  switch (typeIndex) {
    case 0:
      return bondedTotal;

    case 1:
      return bondedNoms;

    case 2:
      return bondedVals;

    case 3:
      return bondedNone;

    default:
      return bondedTotal;
  }
}

function formatTotal(typeIndex, state) {
  const value = getValue(typeIndex, state);
  return value && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
    value: value
  });
}

function Actions({
  className = '',
  isInElection,
  ownStashes,
  targets
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const allSlashes = (0, _reactHooks.useAvailableSlashes)();
  const [typeIndex, setTypeIndex] = (0, _react.useState)(0);
  const headerRef = (0, _react.useRef)([[t('stashes'), 'start', 2], [t('controller'), 'address'], [t('rewards'), 'start media--1200'], [t('bonded'), 'number'], [undefined, undefined, 2]]);
  const typeRef = (0, _react.useRef)([{
    text: t('All stashes'),
    value: 'all'
  }, {
    text: t('Nominators'),
    value: 'noms'
  }, {
    text: t('Validators'),
    value: 'vals'
  }, {
    text: t('Inactive'),
    value: 'chill'
  }]);
  const state = (0, _react.useMemo)(() => extractState(ownStashes), [ownStashes]);
  const footer = (0, _react.useMemo)(() => /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      colSpan: 4
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number",
      children: formatTotal(typeIndex, state)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      colSpan: 2
    })]
  }), [state, typeIndex]);
  const filtered = (0, _react.useMemo)(() => state.foundStashes && filterStashes(typeIndex, state.foundStashes), [state, typeIndex]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Button.Group, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.ToggleGroup, {
        onChange: setTypeIndex,
        options: typeRef.current,
        value: typeIndex
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_NewNominator.default, {
        isInElection: isInElection,
        targets: targets
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_NewValidator.default, {
        isInElection: isInElection,
        targets: targets
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_NewStash.default, {})]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ElectionBanner.default, {
      isInElection: isInElection
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Table, {
      empty: filtered && t('No funds staked yet. Bond funds to validate or nominate a validator'),
      footer: footer,
      header: headerRef.current,
      children: filtered === null || filtered === void 0 ? void 0 : filtered.map(info => /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {
        allSlashes: allSlashes,
        info: info,
        isDisabled: isInElection,
        targets: targets
      }, info.stashId))
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Actions);

exports.default = _default;