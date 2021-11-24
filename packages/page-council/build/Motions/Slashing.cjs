"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _appsConfig = require("@axia-js/apps-config");

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-council authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Slashing(_ref) {
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
  const slashes = (0, _reactHooks.useAvailableSlashes)();
  const [isVisible, toggleVisible] = (0, _reactHooks.useToggle)();
  const [accountId, setAcountId] = (0, _react.useState)(null);
  const [{
    proposal,
    proposalLength
  }, setProposal] = (0, _react.useState)({
    proposal: null,
    proposalLength: 0
  });
  const [selectedEra, setSelectedEra] = (0, _react.useState)(0);
  const modLocation = (0, _reactHooks.useCollectiveInstance)('council');
  const threshold = Math.ceil((members.length || 0) * (0, _appsConfig.getSlashProposalThreshold)(api));
  const eras = (0, _react.useMemo)(() => (slashes || []).map(_ref2 => {
    let [era, slashes] = _ref2;
    return {
      text: t('era {{era}}, {{count}} slashes', {
        replace: {
          count: slashes.length,
          era: era.toNumber()
        }
      }),
      value: era.toNumber()
    };
  }), [slashes, t]);
  (0, _react.useEffect)(() => {
    const actioned = selectedEra && slashes && slashes.find(_ref3 => {
      let [era] = _ref3;
      return era.eqn(selectedEra);
    });
    const proposal = actioned ? api.tx.staking.cancelDeferredSlash(actioned[0], actioned[1].map((_, index) => index)) : null;
    setProposal({
      proposal,
      proposalLength: (proposal === null || proposal === void 0 ? void 0 : proposal.encodedLength) || 0
    });
  }, [api, selectedEra, slashes]);

  if (!modLocation || !api.tx.staking) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
      icon: "sync",
      isDisabled: !isMember || !slashes.length,
      label: t('Cancel slashes'),
      onClick: toggleVisible
    }), isVisible && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
      className: className,
      header: t('Revert pending slashes'),
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
          hint: t('The specific eras on which there are unapplied slashes. For each era a separate proposal is to be made.'),
          children: eras.length ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Dropdown, {
            defaultValue: eras[0].value,
            help: t('The unapplied slashed era to cancel.'),
            label: t('the era to cancel for'),
            onChange: setSelectedEra,
            options: eras
          }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
            isDisabled: true,
            label: t('the era to cancel for'),
            value: t('no unapplied slashes found')
          })
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
          accountId: accountId,
          icon: "sync",
          isDisabled: !threshold || !members.includes(accountId || '') || !proposal,
          label: t('Revert'),
          onStart: toggleVisible,
          params: api.tx[modLocation].propose.meta.args.length === 3 ? [threshold, proposal, proposalLength] : [threshold, proposal],
          tx: api.tx[modLocation].propose
        })
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Slashing);

exports.default = _default;