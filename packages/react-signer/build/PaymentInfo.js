// Copyright 2017-2021 @axia-js/react-signer authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import { Expander, MarkWarning } from '@axia-js/react-components';
import { useApi, useCall, useIsMountedRef } from '@axia-js/react-hooks';
import { formatBalance, isFunction } from '@axia-js/util';
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function PaymentInfo({
  accountId,
  className = '',
  extrinsic
}) {
  var _api$derive$balances, _api$tx$balances;

  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [dispatchInfo, setDispatchInfo] = useState(null);
  const balances = useCall((_api$derive$balances = api.derive.balances) === null || _api$derive$balances === void 0 ? void 0 : _api$derive$balances.all, [accountId]);
  const mountedRef = useIsMountedRef();
  useEffect(() => {
    var _api$rpc$payment;

    accountId && extrinsic && isFunction(extrinsic.paymentInfo) && isFunction((_api$rpc$payment = api.rpc.payment) === null || _api$rpc$payment === void 0 ? void 0 : _api$rpc$payment.queryInfo) && setTimeout(() => {
      try {
        extrinsic.paymentInfo(accountId).then(info => mountedRef.current && setDispatchInfo(info)).catch(console.error);
      } catch (error) {
        console.error(error);
      }
    }, 0);
  }, [api, accountId, extrinsic, mountedRef]);

  if (!dispatchInfo || !extrinsic) {
    return null;
  }

  const isFeeError = api.consts.balances && !((_api$tx$balances = api.tx.balances) !== null && _api$tx$balances !== void 0 && _api$tx$balances.transfer.is(extrinsic)) && (balances === null || balances === void 0 ? void 0 : balances.accountId.eq(accountId)) && (balances.availableBalance.lte(dispatchInfo.partialFee) || balances.freeBalance.sub(dispatchInfo.partialFee).lte(api.consts.balances.existentialDeposit));
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Expander, {
      className: className,
      summary: /*#__PURE__*/_jsxs(Trans, {
        i18nKey: "feesForSubmission",
        children: ["Fees of ", /*#__PURE__*/_jsx("span", {
          className: "highlight",
          children: formatBalance(dispatchInfo.partialFee, {
            withSiFull: true
          })
        }), " will be applied to the submission"]
      })
    }), isFeeError && /*#__PURE__*/_jsx(MarkWarning, {
      content: t('The account does not have enough free funds (excluding locked/bonded/reserved) available to cover the transaction fees without dropping the balance below the account existential amount.')
    })]
  });
}

export default /*#__PURE__*/React.memo(PaymentInfo);