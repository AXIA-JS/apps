// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { AddressMini, Button, InputAddress, Modal, Static, TxButton } from '@axia-js/react-components';
import { useApi, useToggle } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function Nominate({
  className = '',
  isDisabled,
  ownNominators,
  targets
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [ids, setIds] = useState(null);
  const [isOpen, toggleOpen] = useToggle();
  const stashes = useMemo(() => (ownNominators || []).map(({
    stashId
  }) => stashId), [ownNominators]);

  const _onChangeStash = useCallback(accountId => {
    const acc = ownNominators && ownNominators.find(({
      stashId
    }) => stashId === accountId);
    setIds(acc ? {
      controllerId: acc.controllerId,
      stashId: acc.stashId
    } : null);
  }, [ownNominators]);

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Button, {
      icon: "hand-paper",
      isDisabled: isDisabled || !stashes.length || !targets.length,
      label: t('Nominate selected'),
      onClick: toggleOpen
    }), isOpen && /*#__PURE__*/_jsxs(Modal, {
      className: className,
      header: t('Nominate validators'),
      onClose: toggleOpen,
      size: "large",
      children: [/*#__PURE__*/_jsxs(Modal.Content, {
        children: [/*#__PURE__*/_jsxs(Modal.Columns, {
          hint: t('One of your available nomination accounts, keyed by the stash. The transaction will be sent from the controller.'),
          children: [/*#__PURE__*/_jsx(InputAddress, {
            filter: stashes,
            help: t('Your stash account. The transaction will be sent from the associated controller.'),
            label: t('the stash account to nominate with'),
            onChange: _onChangeStash,
            value: ids === null || ids === void 0 ? void 0 : ids.stashId
          }), /*#__PURE__*/_jsx(InputAddress, {
            isDisabled: true,
            label: t('the associated controller'),
            value: ids === null || ids === void 0 ? void 0 : ids.controllerId
          })]
        }), /*#__PURE__*/_jsx(Modal.Columns, {
          hint: /*#__PURE__*/_jsxs(_Fragment, {
            children: [/*#__PURE__*/_jsx("p", {
              children: t('The selected validators to nominate, either via the "currently best algorithm" or via a manual selection.')
            }), /*#__PURE__*/_jsx("p", {
              children: t('Once transmitted the new selection will only take effect in 2 eras since the selection criteria for the next era was done at the end of the previous era. Until then, the nominations will show as inactive.')
            })]
          }),
          children: /*#__PURE__*/_jsx(Static, {
            label: t('selected validators'),
            value: targets.map(validatorId => /*#__PURE__*/_jsx(AddressMini, {
              className: "addressStatic",
              value: validatorId
            }, validatorId))
          })
        })]
      }), /*#__PURE__*/_jsx(Modal.Actions, {
        children: /*#__PURE__*/_jsx(TxButton, {
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

export default /*#__PURE__*/React.memo(styled(Nominate).withConfig({
  displayName: "Nominate",
  componentId: "sc-hn8m58-0"
})([".ui--AddressMini.padded.addressStatic{padding-top:0.5rem;.ui--AddressMini-info{min-width:10rem;max-width:10rem;}}"]));