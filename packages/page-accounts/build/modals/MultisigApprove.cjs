"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
const EMPTY_CALL = {
  callData: null,
  callError: null,
  callInfo: null
};

function MultisigApprove(_ref) {
  let {
    className = '',
    onClose,
    ongoing,
    threshold,
    who
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const {
    allAccounts
  } = (0, _reactHooks.useAccounts)();
  const [callHex, setCallHex] = (0, _react.useState)('');
  const [{
    callData,
    callError,
    callInfo
  }, setCallData] = (0, _react.useState)(EMPTY_CALL);
  const [callWeight] = (0, _reactHooks.useWeight)(callData);
  const [hash, setHash] = (0, _react.useState)(ongoing[0][0].toHex());
  const [{
    isMultiCall,
    multisig
  }, setMultisig] = (0, _react.useState)({
    isMultiCall: false,
    multisig: null
  });
  const [isCallOverride, setCallOverride] = (0, _react.useState)(true);
  const [others, setOthers] = (0, _react.useState)([]);
  const [signatory, setSignatory] = (0, _react.useState)(null);
  const [whoFilter, setWhoFilter] = (0, _react.useState)([]);
  const [type, setType] = (0, _react.useState)('aye');
  const [tx, setTx] = (0, _react.useState)(null);
  const callOptRef = (0, _react.useRef)([{
    text: t('Approve this call hash'),
    value: 'aye'
  }, {
    text: t('Cancel this call hash'),
    value: 'nay'
  }]);
  const hashes = (0, _react.useMemo)(() => ongoing.map(_ref2 => {
    let [h] = _ref2;
    return {
      text: h.toHex(),
      value: h.toHex()
    };
  }), [ongoing]); // filter the current multisig by supplied hash

  (0, _react.useEffect)(() => {
    const [, multisig] = ongoing.find(_ref3 => {
      let [h] = _ref3;
      return h.eq(hash);
    }) || [null, null];
    setMultisig({
      isMultiCall: !!multisig && multisig.approvals.length + 1 >= threshold,
      multisig
    });
    setCallData(EMPTY_CALL);
  }, [hash, ongoing, threshold]); // the others are all the who elements, without the current signatory (re-encoded)

  (0, _react.useEffect)(() => {
    setOthers(who.map(w => api.createType('AccountId', w)).filter(w => !w.eq(signatory)));
  }, [api, signatory, who]); // Filter the who by those not approved yet that is an actual account we own. In the case of
  // rejections, we defer to the the first approver, since he is the only one to send the cancel
  // On reaching threshold, we include all possible signatories in the list

  (0, _react.useEffect)(() => {
    const hasThreshold = multisig && multisig.approvals.length >= threshold;
    setWhoFilter(who.map(w => api.createType('AccountId', w).toString()).filter(w => allAccounts.some(a => a === w) && multisig && (type === 'nay' ? multisig.approvals[0].eq(w) : hasThreshold || !multisig.approvals.some(a => a.eq(w)))));
  }, [api, allAccounts, multisig, threshold, type, who]); // when the hex changes, re-evaluate

  (0, _react.useEffect)(() => {
    if (callHex) {
      try {
        (0, _util.assert)((0, _util.isHex)(callHex), 'Hex call data required');
        const callData = api.createType('Call', callHex);
        (0, _util.assert)(callData.hash.eq(hash), 'Call data does not match the existing call hash');
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

  (0, _react.useEffect)(() => {
    const multiMod = api.tx.multisig || api.tx.utility;
    setTx(() => hash && multisig ? type === 'aye' ? isMultiCall && isCallOverride ? callData ? multiMod.asMulti.meta.args.length === 6 ? multiMod.asMulti(threshold, others, multisig.when, callData.toHex(), false, callWeight) // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore (We are doing toHex here since we have a Vec<u8> input)
    : multiMod.asMulti(threshold, others, multisig.when, callData) : null : multiMod.approveAsMulti.meta.args.length === 5 ? multiMod.approveAsMulti(threshold, others, multisig.when, hash, callWeight) // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    : multiMod.approveAsMulti(threshold, others, multisig.when, hash) : multiMod.cancelAsMulti(threshold, others, multisig.when, hash) : null);
  }, [api, callData, callWeight, hash, isCallOverride, isMultiCall, others, multisig, threshold, type]);
  const isAye = type === 'aye';
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
    className: className,
    header: t('Pending call hashes'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
        hint: t('The call hash from the list of available and unapproved calls.'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Dropdown, {
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
      }), multisig && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('The creator for this multisig call'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
            defaultValue: multisig.depositor,
            isDisabled: true,
            label: t('depositor')
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('The current approvals applied to this multisig'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Expander, {
            isPadded: true,
            summary: t('Existing approvals ({{approvals}}/{{threshold}})', {
              replace: {
                approvals: multisig.approvals.length,
                threshold
              }
            }),
            children: multisig.approvals.map(a => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressMini, {
              isPadded: false,
              value: a
            }, _util.assert.toString()))
          })
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
        hint: t('The operation type to apply. For approvals both non-final and final approvals are supported.'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Dropdown, {
          help: t('Either approve or reject this call.'),
          label: t('approval type'),
          onChange: setType,
          options: callOptRef.current,
          value: type
        })
      }), whoFilter.length !== 0 && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('For approvals outstanding approvers will be shown, for hashes that should be cancelled the first approver is required.'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
            filter: whoFilter,
            help: t('The signatory to send the approval/cancel from'),
            label: t('signatory'),
            onChange: setSignatory
          })
        }), type === 'aye' && isMultiCall && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [isCallOverride && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
            hint: t('The call data for this transaction matching the hash. Once sent, the multisig will be executed against this.'),
            children: [callData && callInfo ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Expander, {
              isPadded: true,
              summary: `${callInfo.section}.${callInfo.method}`,
              summaryMeta: callInfo.meta,
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Call, {
                className: "details",
                value: callData
              })
            }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
              autoFocus: true,
              help: t('For final approvals, the actual full call data is required to execute the transaction'),
              isError: !callHex || !!callError,
              label: t('call data for final approval'),
              onChange: setCallHex
            }), callError && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkError, {
              content: callError
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
            hint: t('Swap to a non-executing approval type, with subsequent calls providing the actual call data.'),
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Toggle, {
              className: "tipToggle",
              label: isMultiCall ? t('Multisig message with call (for final approval)') : t('Multisig approval with hash (non-final approval)'),
              onChange: setCallOverride,
              value: isCallOverride
            })
          })]
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
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

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(MultisigApprove).withConfig({
  displayName: "MultisigApprove",
  componentId: "sc-1xboc98-0"
})([".tipToggle{width:100%;text-align:right;}"]));

exports.default = _default;