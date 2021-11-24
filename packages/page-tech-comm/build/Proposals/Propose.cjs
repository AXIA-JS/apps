"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bn = _interopRequireDefault(require("bn.js"));

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-tech-comm authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Propose(_ref) {
  let {
    isMember,
    members,
    type
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api,
    apiDefaultTxSudo
  } = (0, _reactHooks.useApi)();
  const {
    isOpen,
    onClose,
    onOpen
  } = (0, _reactHooks.useModal)();
  const [accountId, setAcountId] = (0, _react.useState)(null);
  const [{
    proposal,
    proposalLength
  }, setProposal] = (0, _react.useState)({
    proposalLength: 0
  });
  const [[threshold, hasThreshold], setThreshold] = (0, _react.useState)([new _bn.default(members.length / 2 + 1), true]);
  const modLocation = (0, _reactHooks.useCollectiveInstance)(type);

  const _hasThreshold = (0, _react.useCallback)(threshold => !!threshold && !threshold.isZero() && threshold.lten(members.length), [members]);

  const _onChangeExtrinsic = (0, _react.useCallback)(proposal => setProposal({
    proposal,
    proposalLength: (proposal === null || proposal === void 0 ? void 0 : proposal.length) || 0
  }), []);

  const _onChangeThreshold = (0, _react.useCallback)(threshold => setThreshold([threshold || null, _hasThreshold(threshold)]), [_hasThreshold]);

  if (!modLocation) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [isOpen && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
      header: t('Propose a committee motion'),
      onClose: onClose,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
          filter: members,
          help: t('Select the account you wish to make the proposal with.'),
          label: t('propose from account'),
          onChange: setAcountId,
          type: "account",
          withLabel: true
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputNumber, {
          className: "medium",
          help: t('The minimum number of committee votes required to approve this motion'),
          isError: !hasThreshold,
          label: t('threshold'),
          onChange: _onChangeThreshold,
          placeholder: t('Positive number between 1 and {{count}}', {
            replace: {
              count: members.length
            }
          }),
          value: threshold || undefined
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Extrinsic, {
          defaultValue: apiDefaultTxSudo,
          label: t('proposal'),
          onChange: _onChangeExtrinsic
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
          accountId: accountId,
          isDisabled: !hasThreshold || !proposal,
          onStart: onClose,
          params: api.tx[modLocation].propose.meta.args.length === 3 ? [threshold, proposal, proposalLength] : [threshold, proposal],
          tx: api.tx[modLocation].propose
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
      icon: "plus",
      isDisabled: !isMember,
      label: t('Submit proposal'),
      onClick: onOpen
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Propose);

exports.default = _default;