"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _translate = require("../translate.cjs");

var _useModuleElections = require("../useModuleElections.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-council authors & contributors
// SPDX-License-Identifier: Apache-2.0
function SubmitCandidacy({
  electionsInfo
}) {
  const {
    api
  } = (0, _reactHooks.useApi)();
  const {
    t
  } = (0, _translate.useTranslation)();
  const [accountId, setAcountId] = (0, _react.useState)(null);
  const {
    isOpen,
    onClose,
    onOpen
  } = (0, _reactHooks.useModal)();
  const modLocation = (0, _useModuleElections.useModuleElections)();

  if (!modLocation) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [isOpen && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
      header: t('Submit your council candidacy'),
      onClose: onClose,
      size: "large",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('This account will appear in the list of candidates. With enough votes in an election, it will become either a runner-up or a council member.'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
            help: t('Select the account you wish to submit for candidacy.'),
            label: t('candidate account'),
            onChange: setAcountId,
            type: "account"
          })
        }), api.consts[modLocation] && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('The bond will be reserved for the duration of your candidacy and membership.'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputBalance, {
            defaultValue: api.consts[modLocation].candidacyBond,
            help: t('The bond that is reserved'),
            isDisabled: true,
            label: t('candidacy bond')
          })
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
          accountId: accountId,
          isDisabled: !electionsInfo,
          onStart: onClose,
          params: api.tx[modLocation].submitCandidacy.meta.args.length === 1 ? [electionsInfo === null || electionsInfo === void 0 ? void 0 : electionsInfo.candidates.length] : [],
          tx: api.tx[modLocation].submitCandidacy
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
      icon: "plus",
      isDisabled: !electionsInfo,
      label: t('Submit candidacy'),
      onClick: onOpen
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(SubmitCandidacy);

exports.default = _default;