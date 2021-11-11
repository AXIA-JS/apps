"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _reactParams = _interopRequireDefault(require("@axia-js/react-params"));

var _create = require("@axia-js/types/create");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
const DEFAULT_PARAMS = {
  params: [],
  values: []
};
const transformProposal = {
  transform: optProp => optProp.unwrapOr(null)
};

function TreasuryCell({
  className = '',
  value
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [proposalId] = (0, _react.useState)(() => value.unwrap());
  const proposal = (0, _reactHooks.useCall)(api.query.treasury.proposals, [proposalId], transformProposal);
  const [{
    params,
    values
  }, setExtracted] = (0, _react.useState)(DEFAULT_PARAMS);
  (0, _react.useEffect)(() => {
    proposal && setExtracted({
      params: [{
        name: 'proposal',
        type: (0, _create.getTypeDef)('TreasuryProposal')
      }],
      values: [{
        isValid: true,
        value: proposal
      }]
    });
  }, [proposal]);

  if (!proposal) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: className,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactParams.default, {
      isDisabled: true,
      params: params,
      values: values,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
        defaultValue: proposal.beneficiary,
        isDisabled: true,
        label: t('beneficiary')
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputBalance, {
        defaultValue: proposal.value,
        isDisabled: true,
        label: t('payout')
      })]
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo(TreasuryCell);

exports.default = _default;