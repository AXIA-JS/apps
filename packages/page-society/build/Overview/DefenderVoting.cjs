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

// Copyright 2017-2021 @axia-js/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0
function DefenderVoting({
  isMember,
  ownMembers
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [isVisible, toggleVisible] = (0, _reactHooks.useToggle)();
  const [vote, setVote] = (0, _react.useState)(true);
  const [accountId, setAccountId] = (0, _react.useState)(null);
  const voteOptsRef = (0, _react.useRef)([{
    text: t('Aye, I approve'),
    value: true
  }, {
    text: t('Nay, I do not approve'),
    value: false
  }]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [isVisible && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
      header: t('Vote for defender'),
      onClose: toggleVisible,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
          filter: ownMembers,
          help: t('The address to vote from (must be a member)'),
          label: t('vote from account'),
          onChange: setAccountId
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Dropdown, {
          help: t('Approve or reject this defender.'),
          label: t('vote for defender'),
          onChange: setVote,
          options: voteOptsRef.current,
          value: vote
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
          accountId: accountId,
          icon: "check",
          label: t('Vote'),
          onStart: toggleVisible,
          params: [vote],
          tx: api.tx.society.defenderVote
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
      icon: "check",
      isDisabled: !isMember,
      label: t('Vote'),
      onClick: toggleVisible
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(DefenderVoting);

exports.default = _default;