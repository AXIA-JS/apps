"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactQuery = require("@axia-js/react-query");

var _util = require("@axia-js/util");

var _Labelled = _interopRequireDefault(require("./Labelled.cjs"));

var _Progress = _interopRequireDefault(require("./Progress.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function CardSummary(_ref) {
  let {
    children,
    className = '',
    help,
    label,
    progress
  } = _ref;
  const value = progress && progress.value;
  const total = progress && progress.total;
  const left = progress && !(0, _util.isUndefined)(value) && !(0, _util.isUndefined)(total) && value.gten(0) && total.gtn(0) ? value.gt(total) ? `>${progress.isPercent ? '100' : (0, _util.formatNumber)(total)}` : progress.isPercent ? value.mul(_util.BN_HUNDRED).div(total).toString() : (0, _util.formatNumber)(value) : undefined;

  if (progress && (0, _util.isUndefined)(left)) {
    return null;
  }

  const isTimed = progress && progress.withTime && !(0, _util.isUndefined)(progress.total);
  const testidSuffix = (label !== null && label !== void 0 ? label : '').toString();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("article", {
    className: className,
    "data-testid": `card-summary:${testidSuffix}`,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_Labelled.default, {
      help: help,
      isSmall: true,
      label: label,
      children: [children, progress && !progress.hideValue && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [isTimed && !children && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.BlockToTime, {
          value: progress.total
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: isTimed ? 'isSecondary' : 'isPrimary',
          children: !left || (0, _util.isUndefined)(progress.total) ? '-' : !isTimed || progress.isPercent || !progress.value ? `${left}${progress.isPercent ? '' : '/'}${progress.isPercent ? '%' : (0, _util.formatNumber)(progress.total)}` : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.BlockToTime, {
            className: "timer",
            value: progress.total.sub(progress.value)
          })
        })]
      })]
    }), progress && !progress.hideGraph && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Progress.default, _objectSpread({}, progress))]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(CardSummary).withConfig({
  displayName: "CardSummary",
  componentId: "sc-c1dznr-0"
})(["align-items:center;background:transparent !important;border:none !important;box-shadow:none !important;color:var(--color-summary);display:flex;flex:0 1 auto;flex-flow:row wrap;justify-content:flex-end;padding:0 1.5rem;.ui--FormatBalance .balance-postfix{opacity:1;}.ui--Progress{margin:0.5rem 0.125rem 0.125rem 0.75rem;}> .ui--Labelled{font-size:1.75rem;font-weight:var(--font-weight-light);position:relative;line-height:1;text-align:right;> *{margin:0.25rem 0;&:first-child{margin-top:0;}&:last-child{margin-bottom:0;}}> label{font-size:0.95rem;}.isSecondary{font-size:1rem;font-weight:var(--font-weight-normal);.timer{min-width:8rem;}}}@media(max-width:767px){min-height:4.8rem;padding:0.25 0.4em;> div{font-size:1.4rem;}}"]));

exports.default = _default;