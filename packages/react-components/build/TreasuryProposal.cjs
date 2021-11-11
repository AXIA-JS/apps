"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _reactQuery = require("@axia-js/react-query");

var _Inset = _interopRequireDefault(require("./Inset.cjs"));

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function TreasuryProposal({
  asInset,
  className = '',
  insetProps,
  onClick,
  proposal,
  proposalId
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const [stateProposal, setProposal] = (0, _react.useState)(null);
  const {
    api
  } = (0, _reactHooks.useApi)();
  (0, _react.useEffect)(() => {
    if (!proposal && proposalId) {
      api.query.treasury.proposals(proposalId).then(proposal => proposal.unwrapOr(null)).catch(() => null).then(setProposal).catch(console.error);
    } else {
      setProposal(proposal || null);
    }
  }, [api, proposal, proposalId]);

  if (!stateProposal) {
    return null;
  }

  const {
    beneficiary,
    bond,
    proposer,
    value
  } = stateProposal;
  const inner = /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Labelled, {
      label: t('proposed by'),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
        defaultValue: proposer,
        isDisabled: true,
        value: proposer,
        withLabel: false
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Labelled, {
      label: t('beneficiary'),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
        defaultValue: beneficiary,
        isDisabled: true,
        value: beneficiary,
        withLabel: false
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Static, {
      label: t('value'),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
        value: value
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Static, {
      label: t('bond'),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
        value: bond
      })
    })]
  });

  if (asInset) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Inset.default, _objectSpread(_objectSpread({
      className: className
    }, insetProps), {}, {
      children: inner
    }));
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: className,
    onClick: onClick && onClick,
    children: inner
  });
}

var _default = /*#__PURE__*/_react.default.memo(TreasuryProposal);

exports.default = _default;