"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

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

var _BountyRejectCurator = _interopRequireDefault(require("./BountyRejectCurator.cjs"));

var _CloseBounty = _interopRequireDefault(require("./CloseBounty.cjs"));

var _ExtendBountyExpiryAction = _interopRequireDefault(require("./ExtendBountyExpiryAction.cjs"));

var _GiveUp = _interopRequireDefault(require("./GiveUp.cjs"));

var _SlashCurator = _interopRequireDefault(require("./SlashCurator.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Index({
  bestNumber,
  className,
  description,
  index,
  proposals,
  status
}) {
  const [isCloseBountyOpen, toggleCloseBounty] = (0, _reactHooks.useToggle)();
  const [isRejectCuratorOpen, toggleRejectCurator] = (0, _reactHooks.useToggle)();
  const [isSlashCuratorOpen, toggleSlashCurator] = (0, _reactHooks.useToggle)();
  const [isExtendExpiryOpen, toggleExtendExpiry] = (0, _reactHooks.useToggle)();
  const [isGiveUpCuratorOpen, toggleGiveUpCurator] = (0, _reactHooks.useToggle)();
  const [selectedAction, setSlashAction] = (0, _react.useState)();
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    isMember
  } = (0, _reactHooks.useCollectiveMembers)('council');
  const {
    curator,
    updateDue
  } = (0, _index2.useBountyStatus)(status);
  const blocksUntilUpdate = (0, _react.useMemo)(() => updateDue === null || updateDue === void 0 ? void 0 : updateDue.sub(bestNumber), [bestNumber, updateDue]);
  const {
    isCurator,
    roles
  } = (0, _index2.useUserRole)(curator);
  const availableSlashActions = (0, _index.determineUnassignCuratorAction)(roles, status, blocksUntilUpdate);
  const slashCuratorActionNames = (0, _react.useRef)({
    SlashCuratorAction: t('Slash curator'),
    SlashCuratorMotion: t('Slash curator (Council)'),
    UnassignCurator: t('Unassign curator')
  });
  const existingCloseBountyProposal = (0, _react.useMemo)(() => proposals === null || proposals === void 0 ? void 0 : proposals.find(({
    proposal
  }) => proposal.method === 'closeBounty'), [proposals]);
  const existingUnassignCuratorProposal = (0, _react.useMemo)(() => proposals === null || proposals === void 0 ? void 0 : proposals.find(({
    proposal
  }) => proposal.method === 'unassignCurator'), [proposals]);
  const showCloseBounty = (status.isFunded || status.isActive || status.isCuratorProposed) && isMember && !existingCloseBountyProposal;
  const showRejectCurator = status.isCuratorProposed && isCurator;
  const showGiveUpCurator = status.isActive && isCurator;
  const showExtendExpiry = status.isActive && isCurator;
  const showSlashCurator = (status.isCuratorProposed || status.isActive || status.isPendingPayout) && !existingUnassignCuratorProposal && availableSlashActions.length !== 0;
  const hasNoItems = !(showCloseBounty || showRejectCurator || showExtendExpiry || showSlashCurator || showGiveUpCurator);
  const slashCurator = (0, _react.useCallback)(actionName => () => {
    setSlashAction(actionName);
    toggleSlashCurator();
  }, [toggleSlashCurator]);
  return !hasNoItems ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [isCloseBountyOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_CloseBounty.default, {
      description: description,
      index: index,
      toggleOpen: toggleCloseBounty
    }), isRejectCuratorOpen && curator && /*#__PURE__*/(0, _jsxRuntime.jsx)(_BountyRejectCurator.default, {
      curatorId: curator,
      description: description,
      index: index,
      toggleOpen: toggleRejectCurator
    }), isExtendExpiryOpen && curator && /*#__PURE__*/(0, _jsxRuntime.jsx)(_ExtendBountyExpiryAction.default, {
      curatorId: curator,
      description: description,
      index: index,
      toggleOpen: toggleExtendExpiry
    }), isGiveUpCuratorOpen && curator && /*#__PURE__*/(0, _jsxRuntime.jsx)(_GiveUp.default, {
      curatorId: curator,
      description: description,
      index: index,
      toggleOpen: toggleGiveUpCurator
    }), isSlashCuratorOpen && curator && selectedAction && /*#__PURE__*/(0, _jsxRuntime.jsx)(_SlashCurator.default, {
      action: selectedAction,
      curatorId: curator,
      description: description,
      index: index,
      toggleOpen: toggleSlashCurator
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Popup, {
      value: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Menu, {
        className: "settings-menu",
        children: [showCloseBounty && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Menu.Item, {
          onClick: toggleCloseBounty,
          children: t('Close')
        }, 'closeBounty'), showRejectCurator && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Menu.Item, {
          onClick: toggleRejectCurator,
          children: t('Reject curator')
        }, 'rejectCurator'), showExtendExpiry && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Menu.Item, {
          onClick: toggleExtendExpiry,
          children: t('Extend expiry')
        }, 'extendExpiry'), showGiveUpCurator && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Menu.Item, {
          onClick: toggleGiveUpCurator,
          children: t('Give up')
        }, 'giveUpCurator'), showSlashCurator && availableSlashActions.map(actionName => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Menu.Item, {
          onClick: slashCurator(actionName),
          children: slashCuratorActionNames.current[actionName]
        }, actionName))]
      }),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        dataTestId: "extra-actions",
        icon: "ellipsis-v",
        isReadOnly: false
      })
    })]
  }) : null;
}

var _default = /*#__PURE__*/_react.default.memo(Index);

exports.default = _default;