// Copyright 2017-2021 @axia-js/react-signer authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useState } from 'react';
import { InputBalance, Modal, Toggle } from '@axia-js/react-components';
import { BN_ZERO } from '@axia-js/util';
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Tip({
  className,
  onChange
}) {
  const {
    t
  } = useTranslation();
  const [tip, setTip] = useState(BN_ZERO);
  const [showTip, setShowTip] = useState(false);
  useEffect(() => {
    onChange(showTip ? tip : BN_ZERO);
  }, [onChange, showTip, tip]);
  return /*#__PURE__*/_jsxs(Modal.Columns, {
    className: className,
    hint: t('Adding an optional tip to the transaction could allow for higher priority, especially when the chain is busy.'),
    children: [/*#__PURE__*/_jsx(Toggle, {
      className: "tipToggle",
      label: showTip ? t('Include an optional tip for faster processing') : t('Do not include a tip for the block author'),
      onChange: setShowTip,
      value: showTip
    }), showTip && /*#__PURE__*/_jsx(InputBalance, {
      help: t('Add a tip to this extrinsic, paying the block author for greater priority'),
      isZeroable: true,
      label: t('Tip (optional)'),
      onChange: setTip
    })]
  });
}

export default /*#__PURE__*/React.memo(Tip);