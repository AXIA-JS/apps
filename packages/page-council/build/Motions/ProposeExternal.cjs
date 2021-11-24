"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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
function ProposeExternal(_ref) {
  let {
    className = '',
    isMember,
    members
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [isVisible, toggleVisible] = (0, _reactHooks.useToggle)();
  const [accountId, setAcountId] = (0, _react.useState)(null);
  const [{
    proposal,
    proposalLength
  }, setProposal] = (0, _react.useState)({
    proposalLength: 0
  });
  const [{
    hash,
    isHashValid
  }, setHash] = (0, _react.useState)({
    hash: '',
    isHashValid: false
  });
  const modLocation = (0, _reactHooks.useCollectiveInstance)('council');
  const threshold = Math.ceil((members.length || 0) * (0, _appsConfig.getProposalThreshold)(api));

  const _onChangeHash = (0, _react.useCallback)(hash => setHash({
    hash,
    isHashValid: (0, _util.isHex)(hash, 256)
  }), []);

  (0, _react.useEffect)(() => {
    if (isHashValid && hash) {
      const proposal = api.tx.democracy.externalProposeMajority(hash);
      setProposal({
        proposal,
        proposalLength: proposal.encodedLength || 0
      });
    } else {
      setProposal({
        proposal: null,
        proposalLength: 0
      });
    }
  }, [api, hash, isHashValid]);

  if (!modLocation) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
      icon: "plus",
      isDisabled: !isMember,
      label: t('Propose external'),
      onClick: toggleVisible
    }), isVisible && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
      className: className,
      header: t('Propose external (majority)'),
      onClose: toggleVisible,
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
          hint: t('The hash of the proposal image, either already submitted or valid for the specific call.'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
            autoFocus: true,
            help: t('The preimage hash of the proposal'),
            isError: !isHashValid,
            label: t('preimage hash'),
            onChange: _onChangeHash,
            value: hash
          })
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
          accountId: accountId,
          icon: "plus",
          isDisabled: !threshold || !members.includes(accountId || '') || !proposal,
          label: t('Propose'),
          onStart: toggleVisible,
          params: api.tx[modLocation].propose.meta.args.length === 3 ? [threshold, proposal, proposalLength] : [threshold, proposal],
          tx: api.tx[modLocation].propose
        })
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(ProposeExternal);

exports.default = _default;