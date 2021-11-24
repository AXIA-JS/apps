// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { AddressMini, Call as CallDisplay, Dropdown, Expander, Input, InputAddress, MarkError, Modal, Toggle, TxButton } from '@axia-js/react-components';
import { useAccounts, useApi, useWeight } from '@axia-js/react-hooks';
import { assert, isHex } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const EMPTY_CALL = {
  callData: null,
  callError: null,
  callInfo: null
};

function MultisigApprove({
  className = '',
  onClose,
  ongoing,
  threshold,
  who
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
  const [callHex, setCallHex] = useState('');
  const [{
    callData,
    callError,
    callInfo
  }, setCallData] = useState(EMPTY_CALL);
  const [callWeight] = useWeight(callData);
  const [hash, setHash] = useState(ongoing[0][0].toHex());
  const [{
    isMultiCall,
    multisig
  }, setMultisig] = useState({
    isMultiCall: false,
    multisig: null
  });
  const [isCallOverride, setCallOverride] = useState(true);
  const [others, setOthers] = useState([]);
  const [signatory, setSignatory] = useState(null);
  const [whoFilter, setWhoFilter] = useState([]);
  const [type, setType] = useState('aye');
  const [tx, setTx] = useState(null);
  const callOptRef = useRef([{
    text: t('Approve this call hash'),
    value: 'aye'
  }, {
    text: t('Cancel this call hash'),
    value: 'nay'
  }]);
  const hashes = useMemo(() => ongoing.map(([h]) => ({
    text: h.toHex(),
    value: h.toHex()
  })), [ongoing]); // filter the current multisig by supplied hash

  useEffect(() => {
    const [, multisig] = ongoing.find(([h]) => h.eq(hash)) || [null, null];
    setMultisig({
      isMultiCall: !!multisig && multisig.approvals.length + 1 >= threshold,
      multisig
    });
    setCallData(EMPTY_CALL);
  }, [hash, ongoing, threshold]); // the others are all the who elements, without the current signatory (re-encoded)

  useEffect(() => {
    setOthers(who.map(w => api.createType('AccountId', w)).filter(w => !w.eq(signatory)));
  }, [api, signatory, who]); // Filter the who by those not approved yet that is an actual account we own. In the case of
  // rejections, we defer to the the first approver, since he is the only one to send the cancel
  // On reaching threshold, we include all possible signatories in the list

  useEffect(() => {
    const hasThreshold = multisig && multisig.approvals.length >= threshold;
    setWhoFilter(who.map(w => api.createType('AccountId', w).toString()).filter(w => allAccounts.some(a => a === w) && multisig && (type === 'nay' ? multisig.approvals[0].eq(w) : hasThreshold || !multisig.approvals.some(a => a.eq(w)))));
  }, [api, allAccounts, multisig, threshold, type, who]); // when the hex changes, re-evaluate

  useEffect(() => {
    if (callHex) {
      try {
        assert(isHex(callHex), 'Hex call data required');
        const callData = api.createType('Call', callHex);
        assert(callData.hash.eq(hash), 'Call data does not match the existing call hash');
        const callInfo = api.registry.findMetaCall(callData.callIndex);
        setCallData({
          callData,
          callError: null,
          callInfo
        });
      } catch (error) {
        setCallData({
          callData: null,
          callError: error.message,
          callInfo: null
        });
      }
    } else {
      setCallData(EMPTY_CALL);
    }
  }, [api, callHex, hash]); // based on the type, multisig, others create the tx. This can be either an approval or final call

  useEffect(() => {
    const multiMod = api.tx.multisig || api.tx.utility;
    setTx(() => hash && multisig ? type === 'aye' ? isMultiCall && isCallOverride ? callData ? multiMod.asMulti.meta.args.length === 6 ? multiMod.asMulti(threshold, others, multisig.when, callData.toHex(), false, callWeight) // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore (We are doing toHex here since we have a Vec<u8> input)
    : multiMod.asMulti(threshold, others, multisig.when, callData) : null : multiMod.approveAsMulti.meta.args.length === 5 ? multiMod.approveAsMulti(threshold, others, multisig.when, hash, callWeight) // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    : multiMod.approveAsMulti(threshold, others, multisig.when, hash) : multiMod.cancelAsMulti(threshold, others, multisig.when, hash) : null);
  }, [api, callData, callWeight, hash, isCallOverride, isMultiCall, others, multisig, threshold, type]);
  const isAye = type === 'aye';
  return /*#__PURE__*/_jsxs(Modal, {
    className: className,
    header: t('Pending call hashes'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/_jsxs(Modal.Content, {
      children: [/*#__PURE__*/_jsx(Modal.Columns, {
        hint: t('The call hash from the list of available and unapproved calls.'),
        children: /*#__PURE__*/_jsx(Dropdown, {
          help: t('The call hashes that have not been executed as of yet.'),
          label: t('pending hashes {{count}}', {
            replace: {
              count: hashes.length
            }
          }),
          onChange: setHash,
          options: hashes,
          value: hash
        })
      }), multisig && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('The creator for this multisig call'),
          children: /*#__PURE__*/_jsx(InputAddress, {
            defaultValue: multisig.depositor,
            isDisabled: true,
            label: t('depositor')
          })
        }), /*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('The current approvals applied to this multisig'),
          children: /*#__PURE__*/_jsx(Expander, {
            isPadded: true,
            summary: t('Existing approvals ({{approvals}}/{{threshold}})', {
              replace: {
                approvals: multisig.approvals.length,
                threshold
              }
            }),
            children: multisig.approvals.map(a => /*#__PURE__*/_jsx(AddressMini, {
              isPadded: false,
              value: a
            }, assert.toString()))
          })
        })]
      }), /*#__PURE__*/_jsx(Modal.Columns, {
        hint: t('The operation type to apply. For approvals both non-final and final approvals are supported.'),
        children: /*#__PURE__*/_jsx(Dropdown, {
          help: t('Either approve or reject this call.'),
          label: t('approval type'),
          onChange: setType,
          options: callOptRef.current,
          value: type
        })
      }), whoFilter.length !== 0 && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('For approvals outstanding approvers will be shown, for hashes that should be cancelled the first approver is required.'),
          children: /*#__PURE__*/_jsx(InputAddress, {
            filter: whoFilter,
            help: t('The signatory to send the approval/cancel from'),
            label: t('signatory'),
            onChange: setSignatory
          })
        }), type === 'aye' && isMultiCall && /*#__PURE__*/_jsxs(_Fragment, {
          children: [isCallOverride && /*#__PURE__*/_jsxs(Modal.Columns, {
            hint: t('The call data for this transaction matching the hash. Once sent, the multisig will be executed against this.'),
            children: [callData && callInfo ? /*#__PURE__*/_jsx(Expander, {
              isPadded: true,
              summary: `${callInfo.section}.${callInfo.method}`,
              summaryMeta: callInfo.meta,
              children: /*#__PURE__*/_jsx(CallDisplay, {
                className: "details",
                value: callData
              })
            }) : /*#__PURE__*/_jsx(Input, {
              autoFocus: true,
              help: t('For final approvals, the actual full call data is required to execute the transaction'),
              isError: !callHex || !!callError,
              label: t('call data for final approval'),
              onChange: setCallHex
            }), callError && /*#__PURE__*/_jsx(MarkError, {
              content: callError
            })]
          }), /*#__PURE__*/_jsx(Modal.Columns, {
            hint: t('Swap to a non-executing approval type, with subsequent calls providing the actual call data.'),
            children: /*#__PURE__*/_jsx(Toggle, {
              className: "tipToggle",
              label: isMultiCall ? t('Multisig message with call (for final approval)') : t('Multisig approval with hash (non-final approval)'),
              onChange: setCallOverride,
              value: isCallOverride
            })
          })]
        })]
      })]
    }), /*#__PURE__*/_jsx(Modal.Actions, {
      children: /*#__PURE__*/_jsx(TxButton, {
        accountId: signatory,
        extrinsic: tx,
        icon: isAye ? 'check' : 'times',
        isDisabled: !tx || isAye && !whoFilter.length,
        label: isAye ? 'Approve' : 'Reject',
        onStart: onClose
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(MultisigApprove).withConfig({
  displayName: "MultisigApprove",
  componentId: "sc-1xboc98-0"
})([".tipToggle{width:100%;text-align:right;}"]));