"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-tech-comm authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Close({
  hasFailed,
  hash,
  idNumber,
  proposal,
  type
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [isOpen, toggleOpen] = (0, _reactHooks.useToggle)();
  const [accountId, setAccountId] = (0, _react.useState)(null);
  const [proposalWeight, proposalLength] = (0, _reactHooks.useWeight)(proposal);
  const modLocation = (0, _reactHooks.useCollectiveInstance)(type);

  if (!modLocation) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [isOpen && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
      header: t('Close proposal'),
      onClose: toggleOpen,
      size: "large",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('The proposal that will be affected. Once closed for the current voting round, it would need to be re-submitted for a subsequent voting round.'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.ProposedAction, {
            idNumber: idNumber,
            proposal: proposal
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('The committee account that will apply the close for the current round.'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
            help: t('Select the account you wish close the proposal with.'),
            label: t('close from account'),
            onChange: setAccountId,
            type: "account"
          })
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
          accountId: accountId,
          onStart: toggleOpen,
          params: api.tx[modLocation].close.meta.args.length === 4 ? hasFailed ? [hash, idNumber, 0, 0] : [hash, idNumber, proposalWeight, proposalLength] : [hash, idNumber],
          tx: api.tx[modLocation].closeOperational || api.tx[modLocation].close
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
      icon: "times",
      label: t('Close'),
      onClick: toggleOpen
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Close);

exports.default = _default;