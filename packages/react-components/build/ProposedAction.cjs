"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _util = require("@axia-js/util");

var _Call = _interopRequireDefault(require("./Call.cjs"));

var _Expander = _interopRequireDefault(require("./Expander.cjs"));

var _translate = require("./translate.cjs");

var _TreasuryProposal = _interopRequireDefault(require("./TreasuryProposal.cjs"));

var _index = require("./util/index.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function ProposedAction(_ref) {
  let {
    className = '',
    expandNested,
    idNumber,
    proposal,
    withLinks
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const stringId = (0, _util.isString)(idNumber) ? idNumber : (0, _util.formatNumber)(idNumber);

  if (!proposal) {
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("h3", {
      children: ["#", stringId, "\xA0", t('No execution details available for this proposal')]
    });
  }

  const {
    meta,
    method,
    section
  } = proposal.registry.findMetaCall(proposal.callIndex);
  const header = `#${stringId}: ${section}.${method}`;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `ui--ProposedAction ${className}`,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
      children: header
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Expander.default, {
      summaryMeta: meta,
      children: (0, _index.isTreasuryProposalVote)(proposal) && expandNested ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_TreasuryProposal.default, {
        asInset: withLinks,
        insetProps: _objectSpread({
          withBottomMargin: true,
          withTopMargin: true
        }, withLinks ? {
          href: '/treasury'
        } : {}),
        proposalId: proposal.args[0].toString()
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_Call.default, {
        value: proposal
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(ProposedAction).withConfig({
  displayName: "ProposedAction",
  componentId: "sc-1t18sf9-0"
})(["margin-left:2rem;.ui--ProposedAction-extrinsic{.ui--Params-Content{padding-left:0;}}.ui--ProposedAction-header{margin-bottom:1rem;}"]));

exports.default = _default;