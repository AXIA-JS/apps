// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import BN from 'bn.js';
import React, { useEffect, useRef, useState } from 'react';
import { Checkbox, Dropdown, Input, InputNumber, MarkError, MarkWarning, Modal } from '@axia-js/react-components';
import { useToggle } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export const ETH_DEFAULT_PATH = "m/44'/60'/0'/0/0";

function CreateEthDerivationPath({
  className,
  derivePath,
  deriveValidation,
  onChange,
  seedType
}) {
  const {
    t
  } = useTranslation();
  const [addIndex, setAddIndex] = useState(0);
  const [customIndex, setCustomIndex] = useState(new BN(0));
  const [addressList] = useState(new Array(10).fill(0).map((_, i) => ({
    key: i,
    text: t('Address index {{index}}', {
      replace: {
        index: i
      }
    }),
    value: i
  })));
  const [useCustomPath, toggleCustomPath] = useToggle();
  const [useCustomIndex, toggleCustomIndex] = useToggle();
  const errorIndex = useRef({
    INVALID_DERIVATION_PATH: t('This is an invalid derivation path.'),
    PASSWORD_IGNORED: t('Password are ignored for hex seed'),
    SOFT_NOT_ALLOWED: t('Soft derivation paths are not allowed on ed25519'),
    WARNING_SLASH_PASSWORD: t('Your password contains at least one "/" character. Disregard this warning if it is intended.')
  });
  useEffect(() => {
    onChange(`m/44'/60'/0'/0/${useCustomIndex ? Number(customIndex) : addIndex}`);
  }, [customIndex, onChange, useCustomIndex, addIndex]);
  return /*#__PURE__*/_jsxs(Modal.Columns, {
    className: className,
    hint: seedType === 'raw' ? t('The derivation path is only relevant when deriving keys from a mnemonic.') : t('The derivation path allows you to create different accounts from the same base mnemonic.'),
    children: [seedType === 'bip' ? /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx("div", {
        className: "saveToggle",
        children: /*#__PURE__*/_jsx(Checkbox, {
          label: /*#__PURE__*/_jsx(_Fragment, {
            children: t('Use custom address index')
          }),
          onChange: toggleCustomIndex,
          value: useCustomIndex
        })
      }), useCustomIndex ? /*#__PURE__*/_jsx(InputNumber, {
        help: t('You can set a custom derivation index for this account'),
        isDecimal: false,
        label: t('Custom index'),
        onChange: setCustomIndex,
        value: customIndex
      }) : /*#__PURE__*/_jsx(Dropdown, {
        help: t('The address index (derivation on account) to use'),
        label: t('address index'),
        onChange: setAddIndex,
        options: addressList,
        value: addIndex
      }), /*#__PURE__*/_jsx("div", {
        className: "saveToggle",
        children: /*#__PURE__*/_jsx(Checkbox, {
          label: /*#__PURE__*/_jsx(_Fragment, {
            children: t('Use custom derivation path')
          }),
          onChange: toggleCustomPath,
          value: useCustomPath
        })
      }), useCustomPath ? /*#__PURE__*/_jsx(Input, {
        help: t('You can set a custom derivation path for this account using the following syntax "m/<purpose>/<coin_type>/<account>/<change>/<address_index>'),
        isError: !!(deriveValidation !== null && deriveValidation !== void 0 && deriveValidation.error),
        label: t('secret derivation path'),
        onChange: onChange,
        placeholder: ETH_DEFAULT_PATH,
        tabIndex: -1,
        value: derivePath
      }) : null]
    }) : /*#__PURE__*/_jsx(MarkWarning, {
      content: t('The derivation path is only relevant when deriving keys from a mnemonic.')
    }), (deriveValidation === null || deriveValidation === void 0 ? void 0 : deriveValidation.error) && /*#__PURE__*/_jsx(MarkError, {
      content: errorIndex.current[deriveValidation.error] || deriveValidation.error
    }), (deriveValidation === null || deriveValidation === void 0 ? void 0 : deriveValidation.warning) && /*#__PURE__*/_jsx(MarkWarning, {
      content: errorIndex.current[deriveValidation.warning]
    })]
  });
}

export default /*#__PURE__*/React.memo(CreateEthDerivationPath);