"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _util = require("@axia-js/util");

var _translate = require("../../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
function extractFunction(all) {
  return all.length ? [all.length, () => all.map(who => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressMini, {
    value: who
  }, who))] : null;
}

function extractChilled(nominators = [], slashingSpans) {
  const chilled = slashingSpans ? nominators.filter(({
    submittedIn
  }) => !slashingSpans.lastNonzeroSlash.isZero() && slashingSpans.lastNonzeroSlash.gte(submittedIn)).map(({
    nominatorId
  }) => nominatorId) : [];
  return {
    active: extractFunction(nominators.filter(({
      nominatorId
    }) => !chilled.includes(nominatorId)).map(({
      nominatorId
    }) => nominatorId)),
    chilled: extractFunction(chilled)
  };
}

function NominatedBy({
  nominators,
  slashingSpans
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    active,
    chilled
  } = (0, _react.useMemo)(() => extractChilled(nominators, slashingSpans), [nominators, slashingSpans]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("td", {
    className: "expand all",
    children: [active && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Expander, {
      renderChildren: active[1],
      summary: t('Nominations ({{count}})', {
        replace: {
          count: (0, _util.formatNumber)(active[0])
        }
      })
    }), chilled && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Expander, {
      renderChildren: chilled[1],
      summary: t('Renomination required ({{count}})', {
        replace: {
          count: (0, _util.formatNumber)(chilled[0])
        }
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(NominatedBy);

exports.default = _default;