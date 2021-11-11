"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _index = require("../helpers/index.cjs");

var _index2 = require("../hooks/index.cjs");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
function BountyAcceptCurator({
  curatorId,
  description,
  fee,
  index
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    acceptCurator
  } = (0, _index2.useBounties)();
  const {
    isCurator
  } = (0, _index2.useUserRole)(curatorId);
  const {
    bountyCuratorDeposit
  } = (0, _index2.useBounties)();
  const [isOpen, toggleOpen] = (0, _reactHooks.useToggle)();
  const deposit = (0, _react.useMemo)(() => (0, _index.permillOf)(fee, bountyCuratorDeposit), [fee, bountyCuratorDeposit]);
  return isCurator ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
      icon: "check",
      isDisabled: false,
      label: t('Accept'),
      onClick: toggleOpen
    }), isOpen && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
      header: `${t('accept curator role')} - "${(0, _index.truncateTitle)(description, 30)}"`,
      onClose: toggleOpen,
      size: "large",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('Only the account proposed as curator by the council can create the assign curator transaction'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
            help: t('This account will accept the curator role.'),
            isDisabled: true,
            label: t('curator account'),
            type: "account",
            value: curatorId.toString(),
            withLabel: true
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t("This amount will be sent to your account after bounty is rewarded and you claim curator's fee."),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputBalance, {
            defaultValue: fee.toString(),
            isDisabled: true,
            label: t("curator's fee")
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('This amount will be reserved from your account and returned after bounty claim is confirmed or if you give up, unless you are slashed earlier.'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputBalance, {
            defaultValue: deposit.toString(),
            help: t("Curator's deposit is calculated based on the accepted curator's fee for this bounty."),
            isDisabled: true,
            label: t("curator's deposit")
          })
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
          accountId: curatorId,
          icon: "check",
          label: t('Accept Curator Role'),
          onStart: toggleOpen,
          params: [index],
          tx: acceptCurator
        })
      })]
    })]
  }) : null;
}

var _default = /*#__PURE__*/_react.default.memo(BountyAcceptCurator);

exports.default = _default;