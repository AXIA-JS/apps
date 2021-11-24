import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AddressRow, Button, Input, InputAddress, MarkError, Modal, Password, StatusContext } from '@axia-js/react-components';
import { useApi, useDebounce, useToggle } from '@axia-js/react-hooks';
import { keyring } from '@axia-js/ui-keyring';
import { keyExtractPath } from '@axia-js/util-crypto';
import { useTranslation } from "../translate.js";
import { tryCreateAccount } from "../util.js";
import CreateAccountInputs from "./CreateAccountInputs.js";
import CreateConfirmation from "./CreateConfirmation.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function deriveValidate(suri, pairType) {
  if (suri.includes('///')) {
    return 'Password paths are not supported on keys derived from others';
  }

  try {
    const {
      path
    } = keyExtractPath(suri); // we don't allow soft for ed25519

    if (pairType === 'ed25519' && path.some(({
      isSoft
    }) => isSoft)) {
      return 'Soft derivation paths are not allowed on ed25519';
    }
  } catch (error) {
    console.error(error);
    return error.message;
  }

  return null;
}

function createAccount(source, suri, name, password, success, genesisHash) {
  const commitAccount = () => {
    const derived = source.derive(suri);
    derived.setMeta(_objectSpread(_objectSpread({}, derived.meta), {}, {
      genesisHash,
      name,
      parentAddress: source.address,
      tags: []
    }));
    return keyring.addPair(derived, password || '');
  };

  return tryCreateAccount(commitAccount, success);
}

function Derive({
  className = '',
  from,
  onClose
}) {
  const {
    t
  } = useTranslation();
  const {
    api,
    isDevelopment
  } = useApi();
  const {
    queueAction
  } = useContext(StatusContext);
  const [source] = useState(() => keyring.getPair(from));
  const [isBusy, setIsBusy] = useState(false);
  const [{
    isNameValid,
    name
  }, setName] = useState({
    isNameValid: false,
    name: ''
  });
  const [{
    isPasswordValid,
    password
  }, setPassword] = useState({
    isPasswordValid: false,
    password: ''
  });
  const [{
    address,
    deriveError
  }, setDerive] = useState({
    address: null,
    deriveError: null
  });
  const [isConfirmationOpen, toggleConfirmation] = useToggle();
  const [{
    isLocked,
    lockedError
  }, setIsLocked] = useState({
    isLocked: source.isLocked,
    lockedError: null
  });
  const [{
    isRootValid,
    rootPass
  }, setRootPass] = useState({
    isRootValid: false,
    rootPass: ''
  });
  const [suri, setSuri] = useState('');
  const debouncedSuri = useDebounce(suri);
  const isValid = !!address && !deriveError && isNameValid && isPasswordValid;
  useEffect(() => {
    setIsLocked({
      isLocked: source.isLocked,
      lockedError: null
    });
  }, [source]);
  useEffect(() => {
    !isLocked && setDerive(() => {
      let address = null;
      const deriveError = deriveValidate(debouncedSuri, source.type);

      if (!deriveError) {
        const result = source.derive(debouncedSuri);
        address = result.address;
      }

      return {
        address,
        deriveError
      };
    });
  }, [debouncedSuri, isLocked, source]);

  const _onChangeRootPass = useCallback(rootPass => {
    setRootPass({
      isRootValid: !!rootPass,
      rootPass
    });
    setIsLocked(({
      isLocked
    }) => ({
      isLocked,
      lockedError: null
    }));
  }, []);

  const _onUnlock = useCallback(() => {
    setIsBusy(true);
    setTimeout(() => {
      try {
        source.decodePkcs8(rootPass);
        setIsLocked({
          isLocked: source.isLocked,
          lockedError: null
        });
      } catch (error) {
        console.error(error);
        setIsLocked({
          isLocked: true,
          lockedError: error.message
        });
      }

      setIsBusy(false);
    }, 0);
  }, [rootPass, source]);

  const _onCommit = useCallback(() => {
    if (!isValid) {
      return;
    }

    setIsBusy(true);
    setTimeout(() => {
      const status = createAccount(source, suri, name, password, t('created account'), isDevelopment ? undefined : api.genesisHash.toString());
      queueAction(status);
      setIsBusy(false);
      onClose();
    }, 0);
  }, [api, isDevelopment, isValid, name, onClose, password, queueAction, source, suri, t]);

  const sourceStatic = /*#__PURE__*/_jsx(InputAddress, {
    help: t('The selected account to perform the derivation on.'),
    isDisabled: true,
    label: t('derive root account'),
    value: from
  });

  return /*#__PURE__*/_jsxs(Modal, {
    className: className,
    header: t('Derive account from pair'),
    onClose: onClose,
    children: [address && isConfirmationOpen ? /*#__PURE__*/_jsx(CreateConfirmation, {
      address: address,
      derivePath: suri,
      isBusy: isBusy,
      name: name,
      pairType: source.type
    }) : /*#__PURE__*/_jsxs(Modal.Content, {
      children: [isLocked && /*#__PURE__*/_jsxs(_Fragment, {
        children: [sourceStatic, /*#__PURE__*/_jsx(Password, {
          autoFocus: true,
          help: t('The password to unlock the selected account.'),
          isError: !!lockedError,
          label: t('password'),
          onChange: _onChangeRootPass,
          value: rootPass
        })]
      }), !isLocked && /*#__PURE__*/_jsxs(AddressRow, {
        defaultName: name,
        noDefaultNameOpacity: true,
        value: deriveError ? '' : address,
        children: [sourceStatic, /*#__PURE__*/_jsx(Input, {
          autoFocus: true,
          help: t('You can set a custom derivation path for this account using the following syntax "/<soft-key>//<hard-key>///<password>". The "/<soft-key>" and "//<hard-key>" may be repeated and mixed`.'),
          label: t('derivation path'),
          onChange: setSuri,
          placeholder: t('//hard/soft')
        }), deriveError && /*#__PURE__*/_jsx(MarkError, {
          content: deriveError
        }), /*#__PURE__*/_jsx(CreateAccountInputs, {
          name: {
            isNameValid,
            name
          },
          onCommit: _onCommit,
          setName: setName,
          setPassword: setPassword
        }), ";"]
      })]
    }), /*#__PURE__*/_jsx(Modal.Actions, {
      children: isLocked ? /*#__PURE__*/_jsx(Button, {
        icon: "lock",
        isBusy: isBusy,
        isDisabled: !isRootValid,
        label: t('Unlock'),
        onClick: _onUnlock
      }) : isConfirmationOpen ? /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(Button, {
          icon: "step-backward",
          label: t('Prev'),
          onClick: toggleConfirmation
        }), /*#__PURE__*/_jsx(Button, {
          icon: "plus",
          isBusy: isBusy,
          label: t('Save'),
          onClick: _onCommit
        })]
      }) : /*#__PURE__*/_jsx(Button, {
        icon: "step-forward",
        isDisabled: !isValid,
        label: t('Next'),
        onClick: toggleConfirmation
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(Derive);