// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { InputAddressMulti, MarkWarning, Modal } from '@axia-js/react-components';
import { useApi, useFavorites } from '@axia-js/react-hooks';
import { MAX_NOMINATIONS, STORE_FAVS_BASE } from "../../constants.js";
import { useTranslation } from "../../translate.js";
import SenderInfo from "./SenderInfo.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Nominate({
  className = '',
  controllerId,
  nominating,
  onChange,
  stashId,
  targets: {
    nominateIds = []
  },
  withSenders
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [favorites] = useFavorites(STORE_FAVS_BASE);
  const [selected, setSelected] = useState(nominating || []);
  const [available] = useState(() => {
    const shortlist = [// ensure that the favorite is included in the list of stashes
    ...favorites.filter(a => nominateIds.includes(a)), // make sure the nominee is not in our favorites already
    ...(nominating || []).filter(a => !favorites.includes(a))];
    return shortlist.concat(...nominateIds.filter(a => !shortlist.includes(a)));
  });
  useEffect(() => {
    try {
      onChange({
        nominateTx: selected && selected.length ? api.tx.staking.nominate(selected) : null
      });
    } catch {
      onChange({
        nominateTx: null
      });
    }
  }, [api, onChange, selected]);
  const maxNominations = api.consts.staking.maxNominations ? api.consts.staking.maxNominations.toNumber() : MAX_NOMINATIONS;
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [withSenders && /*#__PURE__*/_jsx(SenderInfo, {
      controllerId: controllerId,
      stashId: stashId
    }), /*#__PURE__*/_jsxs(Modal.Columns, {
      hint: /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx("p", {
          children: t('Nominators can be selected manually from the list of all currently available validators.')
        }), /*#__PURE__*/_jsx("p", {
          children: t('Once transmitted the new selection will only take effect in 2 eras taking the new validator election cycle into account. Until then, the nominations will show as inactive.')
        })]
      }),
      children: [/*#__PURE__*/_jsx(InputAddressMulti, {
        available: available,
        availableLabel: t('candidate accounts'),
        defaultValue: nominating,
        help: t('Filter available candidates based on name, address or short account index.'),
        maxCount: maxNominations,
        onChange: setSelected,
        valueLabel: t('nominated accounts')
      }), /*#__PURE__*/_jsx(MarkWarning, {
        content: t('You should trust your nominations to act competently and honest; basing your decision purely on their current profitability could lead to reduced profits or even loss of funds.')
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Nominate).withConfig({
  displayName: "Nominate",
  componentId: "sc-16fagzy-0"
})(["article.warning{margin-top:0;}.auto--toggle{margin:0.5rem 0 0;text-align:right;width:100%;}.ui--Static .ui--AddressMini.padded.addressStatic{padding-top:0.5rem;.ui--AddressMini-info{min-width:10rem;max-width:10rem;}}.shortlist{display:flex;flex-wrap:wrap;justify-content:center;.candidate{border:1px solid #eee;border-radius:0.25rem;margin:0.25rem;padding-bottom:0.25rem;padding-right:0.5rem;position:relative;&::after{content:'';position:absolute;top:0;right:0;border-color:transparent;border-style:solid;border-radius:0.25em;border-width:0.25em;}&.isAye{background:#fff;border-color:#ccc;}&.member::after{border-color:green;}&.runnerup::after{border-color:steelblue;}.ui--AddressMini-icon{z-index:1;}.candidate-right{text-align:right;}}}"]));