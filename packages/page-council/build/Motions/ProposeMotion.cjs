"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bn = _interopRequireDefault(require("bn.js"));

var _react = _interopRequireWildcard(require("react"));

var _appsConfig = require("@axia-js/apps-config");

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-council authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Propose(_ref) {
  let {
    isMember,
    members
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api,
    apiDefaultTxSudo
  } = (0, _reactHooks.useApi)();
  const [isOpen, toggleOpen] = (0, _reactHooks.useToggle)();
  const [accountId, setAcountId] = (0, _react.useState)(null);
  const [{
    proposal,
    proposalLength
  }, setProposal] = (0, _react.useState)({
    proposalLength: 0
  });
  const [{
    isThresholdValid,
    threshold
  }, setThreshold] = (0, _react.useState)({
    isThresholdValid: false
  });
  const modLocation = (0, _reactHooks.useCollectiveInstance)('council');
  (0, _react.useEffect)(() => {
    members && setThreshold({
      isThresholdValid: members.length !== 0,
      threshold: new _bn.default(Math.ceil(members.length * (0, _appsConfig.getProposalThreshold)(api)))
    });
  }, [api, members]);

  const _setMethod = (0, _react.useCallback)(proposal => setProposal({
    proposal,
    proposalLength: (proposal === null || proposal === void 0 ? void 0 : proposal.encodedLength) || 0
  }), []);

  const _setThreshold = (0, _react.useCallback)(threshold => setThreshold({
    isThresholdValid: !!(threshold !== null && threshold !== void 0 && threshold.gtn(0)),
    threshold
  }), []);

  if (!modLocation) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
      icon: "plus",
      isDisabled: !isMember,
      label: t('Propose motion'),
      onClick: toggleOpen
    }), isOpen && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
      header: t('Propose a council motion'),
      onClose: toggleOpen,
      size: "large",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('The council account for the proposal. The selection is filtered by the current members.'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
            filter: members,
            help: t('Select the account you wish to make the proposal with.'),
            label: t('propose from account'),
            onChange: setAcountId,
            type: "account",
            withLabel: true
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('The desired threshold. Here set to a default of 50%+1, as applicable for general proposals.'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputNumber, {
            className: "medium",
            help: t('The minimum number of council votes required to approve this motion'),
            isError: !threshold || threshold.eqn(0) || threshold.gtn(members.length),
            label: t('threshold'),
            onChange: _setThreshold,
            placeholder: t('Positive number between 1 and {{memberCount}}', {
              replace: {
                memberCount: members.length
              }
            }),
            value: threshold || _util.BN_ZERO
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('The actual proposal to make, based on the selected call and parameters thereof.'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Extrinsic, {
            defaultValue: apiDefaultTxSudo,
            label: t('proposal'),
            onChange: _setMethod
          })
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
          accountId: accountId,
          isDisabled: !proposal || !isThresholdValid,
          label: t('Propose'),
          onStart: toggleOpen,
          params: api.tx[modLocation].propose.meta.args.length === 3 ? [threshold, proposal, proposalLength] : [threshold, proposal],
          tx: api.tx[modLocation].propose
        })
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Propose);

exports.default = _default;