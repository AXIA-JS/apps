// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Button, Menu, Popup } from '@axia-js/react-components';
import { useCollectiveMembers, useToggle } from '@axia-js/react-hooks';
import { determineUnassignCuratorAction } from "../helpers/index.js";
import { useBountyStatus, useUserRole } from "../hooks/index.js";
import { useTranslation } from "../translate.js";
import BountyRejectCurator from "./BountyRejectCurator.js";
import CloseBounty from "./CloseBounty.js";
import ExtendBountyExpiryAction from "./ExtendBountyExpiryAction.js";
import GiveUp from "./GiveUp.js";
import SlashCurator from "./SlashCurator.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Index({
  bestNumber,
  className,
  description,
  index,
  proposals,
  status
}) {
  const [isCloseBountyOpen, toggleCloseBounty] = useToggle();
  const [isRejectCuratorOpen, toggleRejectCurator] = useToggle();
  const [isSlashCuratorOpen, toggleSlashCurator] = useToggle();
  const [isExtendExpiryOpen, toggleExtendExpiry] = useToggle();
  const [isGiveUpCuratorOpen, toggleGiveUpCurator] = useToggle();
  const [selectedAction, setSlashAction] = useState();
  const {
    t
  } = useTranslation();
  const {
    isMember
  } = useCollectiveMembers('council');
  const {
    curator,
    updateDue
  } = useBountyStatus(status);
  const blocksUntilUpdate = useMemo(() => updateDue === null || updateDue === void 0 ? void 0 : updateDue.sub(bestNumber), [bestNumber, updateDue]);
  const {
    isCurator,
    roles
  } = useUserRole(curator);
  const availableSlashActions = determineUnassignCuratorAction(roles, status, blocksUntilUpdate);
  const slashCuratorActionNames = useRef({
    SlashCuratorAction: t('Slash curator'),
    SlashCuratorMotion: t('Slash curator (Council)'),
    UnassignCurator: t('Unassign curator')
  });
  const existingCloseBountyProposal = useMemo(() => proposals === null || proposals === void 0 ? void 0 : proposals.find(({
    proposal
  }) => proposal.method === 'closeBounty'), [proposals]);
  const existingUnassignCuratorProposal = useMemo(() => proposals === null || proposals === void 0 ? void 0 : proposals.find(({
    proposal
  }) => proposal.method === 'unassignCurator'), [proposals]);
  const showCloseBounty = (status.isFunded || status.isActive || status.isCuratorProposed) && isMember && !existingCloseBountyProposal;
  const showRejectCurator = status.isCuratorProposed && isCurator;
  const showGiveUpCurator = status.isActive && isCurator;
  const showExtendExpiry = status.isActive && isCurator;
  const showSlashCurator = (status.isCuratorProposed || status.isActive || status.isPendingPayout) && !existingUnassignCuratorProposal && availableSlashActions.length !== 0;
  const hasNoItems = !(showCloseBounty || showRejectCurator || showExtendExpiry || showSlashCurator || showGiveUpCurator);
  const slashCurator = useCallback(actionName => () => {
    setSlashAction(actionName);
    toggleSlashCurator();
  }, [toggleSlashCurator]);
  return !hasNoItems ? /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [isCloseBountyOpen && /*#__PURE__*/_jsx(CloseBounty, {
      description: description,
      index: index,
      toggleOpen: toggleCloseBounty
    }), isRejectCuratorOpen && curator && /*#__PURE__*/_jsx(BountyRejectCurator, {
      curatorId: curator,
      description: description,
      index: index,
      toggleOpen: toggleRejectCurator
    }), isExtendExpiryOpen && curator && /*#__PURE__*/_jsx(ExtendBountyExpiryAction, {
      curatorId: curator,
      description: description,
      index: index,
      toggleOpen: toggleExtendExpiry
    }), isGiveUpCuratorOpen && curator && /*#__PURE__*/_jsx(GiveUp, {
      curatorId: curator,
      description: description,
      index: index,
      toggleOpen: toggleGiveUpCurator
    }), isSlashCuratorOpen && curator && selectedAction && /*#__PURE__*/_jsx(SlashCurator, {
      action: selectedAction,
      curatorId: curator,
      description: description,
      index: index,
      toggleOpen: toggleSlashCurator
    }), /*#__PURE__*/_jsx(Popup, {
      value: /*#__PURE__*/_jsxs(Menu, {
        className: "settings-menu",
        children: [showCloseBounty && /*#__PURE__*/_jsx(Menu.Item, {
          onClick: toggleCloseBounty,
          children: t('Close')
        }, 'closeBounty'), showRejectCurator && /*#__PURE__*/_jsx(Menu.Item, {
          onClick: toggleRejectCurator,
          children: t('Reject curator')
        }, 'rejectCurator'), showExtendExpiry && /*#__PURE__*/_jsx(Menu.Item, {
          onClick: toggleExtendExpiry,
          children: t('Extend expiry')
        }, 'extendExpiry'), showGiveUpCurator && /*#__PURE__*/_jsx(Menu.Item, {
          onClick: toggleGiveUpCurator,
          children: t('Give up')
        }, 'giveUpCurator'), showSlashCurator && availableSlashActions.map(actionName => /*#__PURE__*/_jsx(Menu.Item, {
          onClick: slashCurator(actionName),
          children: slashCuratorActionNames.current[actionName]
        }, actionName))]
      }),
      children: /*#__PURE__*/_jsx(Button, {
        dataTestId: "extra-actions",
        icon: "ellipsis-v",
        isReadOnly: false
      })
    })]
  }) : null;
}

export default /*#__PURE__*/React.memo(Index);