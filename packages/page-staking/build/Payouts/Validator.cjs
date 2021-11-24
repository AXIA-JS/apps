"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactQuery = require("@axia-js/react-query");

var _translate = require("../translate.cjs");

var _PayButton = _interopRequireDefault(require("./PayButton.cjs"));

var _useEraBlocks = _interopRequireDefault(require("./useEraBlocks.cjs"));

var _util = require("./util.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
function extractState(payout) {
  var _payout$eras$;

  const eraStr = (0, _util.createErasString)(payout.eras.map(_ref => {
    let {
      era
    } = _ref;
    return era;
  }));
  const nominators = payout.eras.reduce((nominators, _ref2) => {
    let {
      stashes
    } = _ref2;
    Object.entries(stashes).forEach(_ref3 => {
      let [stashId, value] = _ref3;

      if (nominators[stashId]) {
        nominators[stashId] = nominators[stashId].add(value);
      } else {
        nominators[stashId] = value;
      }
    });
    return nominators;
  }, {});
  return {
    eraStr,
    nominators,
    numNominators: Object.keys(nominators).length,
    oldestEra: (_payout$eras$ = payout.eras[0]) === null || _payout$eras$ === void 0 ? void 0 : _payout$eras$.era
  };
}

function Validator(_ref4) {
  let {
    className = '',
    isDisabled,
    payout
  } = _ref4;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    eraStr,
    nominators,
    numNominators,
    oldestEra
  } = (0, _react.useMemo)(() => extractState(payout), [payout]);
  const eraBlocks = (0, _useEraBlocks.default)(oldestEra);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "address",
      colSpan: 2,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressSmall, {
        value: payout.validatorId
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "start",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: "payout-eras",
        children: eraStr
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
        value: payout.available
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number",
      children: eraBlocks && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.BlockToTime, {
        value: eraBlocks
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "expand",
      colSpan: 2,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Expander, {
        summary: t('{{count}} own stashes', {
          replace: {
            count: numNominators
          }
        }),
        children: Object.entries(nominators).map(_ref5 => {
          let [stashId, balance] = _ref5;
          return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressMini, {
            balance: balance,
            value: stashId,
            withBalance: true
          }, stashId);
        })
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "button",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_PayButton.default, {
        isDisabled: isDisabled,
        payout: payout
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Validator);

exports.default = _default;