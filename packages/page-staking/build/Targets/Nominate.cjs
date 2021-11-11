"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Nominate({
  className = '',
  isDisabled,
  ownNominators,
  targets
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [ids, setIds] = (0, _react.useState)(null);
  const [isOpen, toggleOpen] = (0, _reactHooks.useToggle)();
  const stashes = (0, _react.useMemo)(() => (ownNominators || []).map(({
    stashId
  }) => stashId), [ownNominators]);

  const _onChangeStash = (0, _react.useCallback)(accountId => {
    const acc = ownNominators && ownNominators.find(({
      stashId
    }) => stashId === accountId);
    setIds(acc ? {
      controllerId: acc.controllerId,
      stashId: acc.stashId
    } : null);
  }, [ownNominators]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
      icon: "hand-paper",
      isDisabled: isDisabled || !stashes.length || !targets.length,
      label: t('Nominate selected'),
      onClick: toggleOpen
    }), isOpen && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
      className: className,
      header: t('Nominate validators'),
      onClose: toggleOpen,
      size: "large",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
          hint: t('One of your available nomination accounts, keyed by the stash. The transaction will be sent from the controller.'),
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
            filter: stashes,
            help: t('Your stash account. The transaction will be sent from the associated controller.'),
            label: t('the stash account to nominate with'),
            onChange: _onChangeStash,
            value: ids === null || ids === void 0 ? void 0 : ids.stashId
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
            isDisabled: true,
            label: t('the associated controller'),
            value: ids === null || ids === void 0 ? void 0 : ids.controllerId
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
              children: t('The selected validators to nominate, either via the "currently best algorithm" or via a manual selection.')
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
              children: t('Once transmitted the new selection will only take effect in 2 eras since the selection criteria for the next era was done at the end of the previous era. Until then, the nominations will show as inactive.')
            })]
          }),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Static, {
            label: t('selected validators'),
            value: targets.map(validatorId => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressMini, {
              className: "addressStatic",
              value: validatorId
            }, validatorId))
          })
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
          accountId: ids === null || ids === void 0 ? void 0 : ids.controllerId,
          label: t('Nominate'),
          onStart: toggleOpen,
          params: [targets],
          tx: api.tx.staking.nominate
        })
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Nominate).withConfig({
  displayName: "Nominate",
  componentId: "sc-hn8m58-0"
})([".ui--AddressMini.padded.addressStatic{padding-top:0.5rem;.ui--AddressMini-info{min-width:10rem;max-width:10rem;}}"]));

exports.default = _default;