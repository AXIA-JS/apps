// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Columar, Input, InputAddress, Modal, Spinner, TxButton } from '@axia-js/react-components';
import { useAccounts, useApi, useCall, useSubidentities } from '@axia-js/react-hooks';
import { u8aToString } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function extractInfo([[ids], opts]) {
  return ids.reduce((result, id, index) => {
    const opt = opts[index];

    if (opt.isSome) {
      const [, data] = opt.unwrap();

      if (data.isRaw) {
        result.push([id, u8aToString(data.asRaw)]);
      }
    }

    return result;
  }, []);
}

function IdentitySub({
  address,
  index,
  name,
  setAddress,
  setName,
  t
}) {
  const _setAddress = useCallback(value => setAddress(index, value || ''), [index, setAddress]);

  const _setName = useCallback(value => setName(index, value || ''), [index, setName]);

  return /*#__PURE__*/_jsxs(Columar, {
    children: [/*#__PURE__*/_jsx(Columar.Column, {
      children: /*#__PURE__*/_jsx(InputAddress, {
        defaultValue: address,
        label: t('address {{index}}', {
          replace: {
            index: index + 1
          }
        }),
        onChange: _setAddress
      })
    }), /*#__PURE__*/_jsx(Columar.Column, {
      children: /*#__PURE__*/_jsx(Input, {
        defaultValue: name,
        isError: !name,
        isFull: true,
        label: t('sub name'),
        onChange: _setName
      })
    })]
  });
}

const IdentitySubMemo = /*#__PURE__*/React.memo(IdentitySub);
const transformInfo = {
  withParams: true
};

function IdentitySubModal({
  address,
  className,
  onClose
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const {
    allAccounts
  } = useAccounts();
  const queryIds = useSubidentities(address);
  const queryInfos = useCall(queryIds && queryIds.length !== 0 && api.query.identity.superOf.multi, [queryIds], transformInfo);
  const [infos, setInfos] = useState();
  useEffect(() => {
    if (queryInfos) {
      setInfos(extractInfo(queryInfos));
    } else if (queryIds && !queryIds.length) {
      setInfos([]);
    }
  }, [allAccounts, queryIds, queryInfos]);

  const _rowAdd = useCallback(() => setInfos(infos => infos && infos.concat([[allAccounts[0], '']])), [allAccounts]);

  const _rowRemove = useCallback(() => setInfos(infos => infos && infos.slice(0, infos.length - 1)), []);

  const _setAddress = useCallback((index, address) => setInfos(infos => (infos || []).map(([a, n], i) => [index === i ? address : a, n])), []);

  const _setName = useCallback((index, name) => setInfos(infos => (infos || []).map(([a, n], i) => [a, index === i ? name : n])), []);

  return /*#__PURE__*/_jsxs(Modal, {
    className: className,
    header: t('Register sub-identities'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/_jsx(Modal.Content, {
      children: !infos ? /*#__PURE__*/_jsx(Spinner, {
        label: t('Retrieving sub-identities')
      }) : /*#__PURE__*/_jsxs("div", {
        children: [!infos.length ? /*#__PURE__*/_jsx("article", {
          children: t('No sub identities set.')
        }) : infos.map(([address, name], index) => /*#__PURE__*/_jsx(IdentitySubMemo, {
          address: address,
          index: index,
          name: name,
          setAddress: _setAddress,
          setName: _setName,
          t: t
        }, index)), /*#__PURE__*/_jsxs(Button.Group, {
          children: [/*#__PURE__*/_jsx(Button, {
            icon: "plus",
            label: t('Add sub'),
            onClick: _rowAdd
          }), /*#__PURE__*/_jsx(Button, {
            icon: "minus",
            isDisabled: infos.length === 0,
            label: t('Remove sub'),
            onClick: _rowRemove
          })]
        })]
      })
    }), /*#__PURE__*/_jsx(Modal.Actions, {
      children: infos && /*#__PURE__*/_jsx(TxButton, {
        accountId: address,
        isDisabled: infos.some(([address, raw]) => !address || !raw),
        label: t('Set Subs'),
        onStart: onClose,
        params: [infos.map(([address, raw]) => [address, {
          raw
        }])],
        tx: api.tx.identity.setSubs
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(IdentitySubModal);