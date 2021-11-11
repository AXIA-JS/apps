// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useRef, useState } from 'react';
import { Button, Table, TxButton } from '@axia-js/react-components';
import { useApi, useCollectiveInstance } from '@axia-js/react-hooks';
import { isFunction } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import Row from "./Row.js";
import Summary from "./Summary.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Slashes({
  buttons,
  councilId,
  councilThreshold,
  slash
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const councilMod = useCollectiveInstance('council');
  const [{
    selected,
    txAll,
    txSome
  }, setSelected] = useState(() => {
    const proposal = api.tx.staking.cancelDeferredSlash(slash.era, slash.slashes.map((_, index) => index));
    return {
      selected: [],
      txAll: councilMod ? {
        length: proposal.encodedLength,
        proposal
      } : null,
      txSome: null
    };
  });
  const headerRef = useRef([[t('era {{era}}/unapplied', {
    replace: {
      era: slash.era.toString()
    }
  }), 'start', 3], [t('reporters'), 'address'], [t('own')], [t('other')], [t('total')], [t('payout')], []]);

  const _onSelect = useCallback(index => setSelected(state => {
    const selected = state.selected.includes(index) ? state.selected.filter(i => i !== index) : state.selected.concat(index).sort((a, b) => a - b);
    const proposal = selected.length ? api.tx.staking.cancelDeferredSlash(slash.era, selected) : null;
    return {
      selected,
      txAll: state.txAll,
      txSome: proposal && councilMod && isFunction(api.tx[councilMod].propose) ? {
        length: proposal.encodedLength,
        proposal
      } : null
    };
  }), [api, councilMod, slash]);

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Summary, {
      slash: slash
    }), /*#__PURE__*/_jsxs(Button.Group, {
      children: [buttons, councilMod && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(TxButton, {
          accountId: councilId,
          isDisabled: !txSome,
          isToplevel: true,
          label: t('Cancel selected'),
          params: txSome && (api.tx[councilMod].propose.meta.args.length === 3 ? [councilThreshold, txSome.proposal, txSome.length] : [councilThreshold, txSome.proposal]),
          tx: api.tx[councilMod].propose
        }), /*#__PURE__*/_jsx(TxButton, {
          accountId: councilId,
          isDisabled: !txAll,
          isToplevel: true,
          label: t('Cancel all'),
          params: txAll && (api.tx[councilMod].propose.meta.args.length === 3 ? [councilThreshold, txAll.proposal, txAll.length] : [councilThreshold, txAll.proposal]),
          tx: api.tx[councilMod].propose
        })]
      })]
    }), /*#__PURE__*/_jsx(Table, {
      header: headerRef.current,
      children: slash.slashes.map((slash, index) => /*#__PURE__*/_jsx(Row, {
        index: index,
        isSelected: selected.includes(index),
        onSelect: councilId ? _onSelect : undefined,
        slash: slash
      }, index))
    })]
  });
}

export default /*#__PURE__*/React.memo(Slashes);