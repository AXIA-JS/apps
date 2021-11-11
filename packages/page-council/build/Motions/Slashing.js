// Copyright 2017-2021 @axia-js/app-council authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useMemo, useState } from 'react';
import { getSlashProposalThreshold } from '@axia-js/apps-config';
import { Button, Dropdown, Input, InputAddress, Modal, TxButton } from '@axia-js/react-components';
import { useApi, useAvailableSlashes, useCollectiveInstance, useToggle } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function Slashing({
  className = '',
  isMember,
  members
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const slashes = useAvailableSlashes();
  const [isVisible, toggleVisible] = useToggle();
  const [accountId, setAcountId] = useState(null);
  const [{
    proposal,
    proposalLength
  }, setProposal] = useState({
    proposal: null,
    proposalLength: 0
  });
  const [selectedEra, setSelectedEra] = useState(0);
  const modLocation = useCollectiveInstance('council');
  const threshold = Math.ceil((members.length || 0) * getSlashProposalThreshold(api));
  const eras = useMemo(() => (slashes || []).map(([era, slashes]) => ({
    text: t('era {{era}}, {{count}} slashes', {
      replace: {
        count: slashes.length,
        era: era.toNumber()
      }
    }),
    value: era.toNumber()
  })), [slashes, t]);
  useEffect(() => {
    const actioned = selectedEra && slashes && slashes.find(([era]) => era.eqn(selectedEra));
    const proposal = actioned ? api.tx.staking.cancelDeferredSlash(actioned[0], actioned[1].map((_, index) => index)) : null;
    setProposal({
      proposal,
      proposalLength: (proposal === null || proposal === void 0 ? void 0 : proposal.encodedLength) || 0
    });
  }, [api, selectedEra, slashes]);

  if (!modLocation || !api.tx.staking) {
    return null;
  }

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Button, {
      icon: "sync",
      isDisabled: !isMember || !slashes.length,
      label: t('Cancel slashes'),
      onClick: toggleVisible
    }), isVisible && /*#__PURE__*/_jsxs(Modal, {
      className: className,
      header: t('Revert pending slashes'),
      onClose: toggleVisible,
      size: "large",
      children: [/*#__PURE__*/_jsxs(Modal.Content, {
        children: [/*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('The council account for the proposal. The selection is filtered by the current members.'),
          children: /*#__PURE__*/_jsx(InputAddress, {
            filter: members,
            help: t('Select the account you wish to make the proposal with.'),
            label: t('propose from account'),
            onChange: setAcountId,
            type: "account",
            withLabel: true
          })
        }), /*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('The specific eras on which there are unapplied slashes. For each era a separate proposal is to be made.'),
          children: eras.length ? /*#__PURE__*/_jsx(Dropdown, {
            defaultValue: eras[0].value,
            help: t('The unapplied slashed era to cancel.'),
            label: t('the era to cancel for'),
            onChange: setSelectedEra,
            options: eras
          }) : /*#__PURE__*/_jsx(Input, {
            isDisabled: true,
            label: t('the era to cancel for'),
            value: t('no unapplied slashes found')
          })
        })]
      }), /*#__PURE__*/_jsx(Modal.Actions, {
        children: /*#__PURE__*/_jsx(TxButton, {
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

export default /*#__PURE__*/React.memo(Slashing);