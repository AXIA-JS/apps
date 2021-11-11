import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { DEV_PHRASE } from '@axia-js/keyring/defaults';
import { AddressRow, Button, Checkbox, CopyButton, Dropdown, Expander, Input, MarkError, MarkWarning, Modal, TextArea } from '@axia-js/react-components';
import { useApi, useLedger, useStepper } from '@axia-js/react-hooks';
import { keyring } from '@axia-js/ui-keyring';
import { settings } from '@axia-js/ui-settings';
import { isHex, u8aToHex } from '@axia-js/util';
import { hdLedger, hdValidatePath, keyExtractSuri, mnemonicGenerate, mnemonicValidate, randomAsU8a } from '@axia-js/util-crypto';
import { useTranslation } from "../translate.js";
import { tryCreateAccount } from "../util.js";
import CreateAccountInputs from "./CreateAccountInputs.js";
import CreateConfirmation from "./CreateConfirmation.js";
import CreateEthDerivationPath, { ETH_DEFAULT_PATH } from "./CreateEthDerivationPath.js";
import CreateSuriLedger from "./CreateSuriLedger.js";
import ExternalWarning from "./ExternalWarning.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const DEFAULT_PAIR_TYPE = 'sr25519';
const STEPS_COUNT = 3;

function getSuri(seed, derivePath, pairType) {
  return pairType === 'ed25519-ledger' ? u8aToHex(hdLedger(seed, derivePath).secretKey.slice(0, 32)) : pairType === 'ethereum' ? `${seed}/${derivePath}` : `${seed}${derivePath}`;
}

function deriveValidate(seed, seedType, derivePath, pairType) {
  try {
    const {
      password,
      path
    } = keyExtractSuri(pairType === 'ethereum' ? `${seed}/${derivePath}` : `${seed}${derivePath}`);
    let result = {}; // show a warning in case the password contains an unintended / character

    if (password !== null && password !== void 0 && password.includes('/')) {
      result = {
        warning: 'WARNING_SLASH_PASSWORD'
      };
    } // we don't allow soft for ed25519


    if (pairType === 'ed25519' && path.some(({
      isSoft
    }) => isSoft)) {
      return _objectSpread(_objectSpread({}, result), {}, {
        error: 'SOFT_NOT_ALLOWED'
      });
    } // we don't allow password for hex seed


    if (seedType === 'raw' && password) {
      return _objectSpread(_objectSpread({}, result), {}, {
        error: 'PASSWORD_IGNORED'
      });
    }

    if (pairType === 'ethereum' && !hdValidatePath(derivePath)) {
      return _objectSpread(_objectSpread({}, result), {}, {
        error: 'INVALID_DERIVATION_PATH'
      });
    }

    return result;
  } catch (error) {
    return {
      error: error.message
    };
  }
}

function isHexSeed(seed) {
  return isHex(seed) && seed.length === 66;
}

function rawValidate(seed) {
  return seed.length > 0 && seed.length <= 32 || isHexSeed(seed);
}

function addressFromSeed(seed, derivePath, pairType) {
  return keyring.createFromUri(getSuri(seed, derivePath, pairType), {}, pairType === 'ed25519-ledger' ? 'ed25519' : pairType).address;
}

function newSeed(seed, seedType) {
  switch (seedType) {
    case 'bip':
      return mnemonicGenerate();

    case 'dev':
      return DEV_PHRASE;

    default:
      return seed || u8aToHex(randomAsU8a());
  }
}

function generateSeed(_seed, derivePath, seedType, pairType = DEFAULT_PAIR_TYPE) {
  const seed = newSeed(_seed, seedType);
  const address = addressFromSeed(seed, derivePath, pairType);
  return {
    address,
    derivePath,
    deriveValidation: undefined,
    isSeedValid: true,
    pairType,
    seed,
    seedType
  };
}

function updateAddress(seed, derivePath, seedType, pairType) {
  var _deriveValidation;

  let address = null;
  let deriveValidation = deriveValidate(seed, seedType, derivePath, pairType);
  let isSeedValid = seedType === 'raw' ? rawValidate(seed) : mnemonicValidate(seed);

  if (!((_deriveValidation = deriveValidation) !== null && _deriveValidation !== void 0 && _deriveValidation.error) && isSeedValid) {
    try {
      address = addressFromSeed(seed, derivePath, pairType);
    } catch (error) {
      console.error(error);
      deriveValidation = {
        error: error.message ? error.message : error.toString()
      };
      isSeedValid = false;
    }
  }

  return {
    address,
    derivePath,
    deriveValidation,
    isSeedValid,
    pairType,
    seed,
    seedType
  };
}

function createAccount(seed, derivePath, pairType, {
  genesisHash,
  name,
  tags = []
}, password, success) {
  const commitAccount = () => keyring.addUri(getSuri(seed, derivePath, pairType), password, {
    genesisHash,
    isHardware: false,
    name,
    tags
  }, pairType === 'ed25519-ledger' ? 'ed25519' : pairType);

  return tryCreateAccount(commitAccount, success);
}

function Create({
  className = '',
  onClose,
  onStatusChange,
  seed: propsSeed,
  type: propsType
}) {
  const {
    t
  } = useTranslation();
  const {
    api,
    isDevelopment,
    isEthereum
  } = useApi();
  const {
    isLedgerEnabled
  } = useLedger();
  const [{
    address,
    derivePath,
    deriveValidation,
    isSeedValid,
    pairType,
    seed,
    seedType
  }, setAddress] = useState(() => generateSeed(propsSeed, isEthereum ? ETH_DEFAULT_PATH : '', propsSeed ? 'raw' : 'bip', isEthereum ? 'ethereum' : propsType));
  const [isMnemonicSaved, setIsMnemonicSaved] = useState(false);
  const [step, nextStep, prevStep] = useStepper();
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
  const isFirstStepValid = !!address && isMnemonicSaved && !(deriveValidation !== null && deriveValidation !== void 0 && deriveValidation.error) && isSeedValid;
  const isSecondStepValid = isNameValid && isPasswordValid;
  const isValid = isFirstStepValid && isSecondStepValid;
  const errorIndex = useRef({
    INVALID_DERIVATION_PATH: t('This is an invalid derivation path.'),
    PASSWORD_IGNORED: t('Password are ignored for hex seed'),
    SOFT_NOT_ALLOWED: t('Soft derivation paths are not allowed on ed25519'),
    WARNING_SLASH_PASSWORD: t('Your password contains at least one "/" character. Disregard this warning if it is intended.')
  });
  const seedOpt = useRef((isDevelopment ? [{
    text: t('Development'),
    value: 'dev'
  }] : []).concat({
    text: t('Mnemonic'),
    value: 'bip'
  }, isEthereum ? {
    text: t('Private Key'),
    value: 'raw'
  } : {
    text: t('Raw seed'),
    value: 'raw'
  }));

  const _onChangePath = useCallback(newDerivePath => setAddress(updateAddress(seed, newDerivePath, seedType, pairType)), [pairType, seed, seedType]);

  const _onChangeSeed = useCallback(newSeed => setAddress(updateAddress(newSeed, derivePath, seedType, pairType)), [derivePath, pairType, seedType]);

  const _onChangePairType = useCallback(newPairType => setAddress(updateAddress(seed, isEthereum ? ETH_DEFAULT_PATH : '', seedType, newPairType)), [seed, seedType, isEthereum]);

  const _selectSeedType = useCallback(newSeedType => {
    if (newSeedType !== seedType) {
      setAddress(generateSeed(null, derivePath, newSeedType, pairType));
    }
  }, [derivePath, pairType, seedType]);

  const _toggleMnemonicSaved = useCallback(() => setIsMnemonicSaved(!isMnemonicSaved), [isMnemonicSaved]);

  const _onCommit = useCallback(() => {
    if (!isValid) {
      return;
    }

    setIsBusy(true);
    setTimeout(() => {
      const options = {
        genesisHash: isDevelopment ? undefined : api.genesisHash.toString(),
        isHardware: false,
        name: name.trim()
      };
      const status = createAccount(seed, derivePath, pairType, options, password, t('created account'));
      onStatusChange(status);
      setIsBusy(false);
      onClose();
    }, 0);
  }, [api, derivePath, isDevelopment, isValid, name, onClose, onStatusChange, pairType, password, seed, t]);

  return /*#__PURE__*/_jsxs(Modal, {
    className: className,
    header: t('Add an account via seed {{step}}/{{STEPS_COUNT}}', {
      replace: {
        STEPS_COUNT,
        step
      }
    }),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/_jsxs(Modal.Content, {
      children: [/*#__PURE__*/_jsx(Modal.Columns, {
        children: /*#__PURE__*/_jsx(AddressRow, {
          defaultName: name,
          fullLength: true,
          isEditableName: false,
          noDefaultNameOpacity: true,
          value: isSeedValid ? address : ''
        })
      }), step === 1 && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('The secret seed value for this account. Ensure that you keep this in a safe place, with access to the seed you can re-create the account.'),
          children: /*#__PURE__*/_jsxs(TextArea, {
            help: isEthereum ? t("Your ethereum key pair is derived from your private key. Don't divulge this key.") : t('The private key for your account is derived from this seed. This seed must be kept secret as anyone in its possession has access to the funds of this account. If you validate, use the seed of the session account as the "--key" parameter of your node.'),
            isAction: true,
            isError: !isSeedValid,
            isReadOnly: seedType === 'dev',
            label: seedType === 'bip' ? t('mnemonic seed') : seedType === 'dev' ? t('development seed') : isEthereum ? t('ethereum private key') : t('seed (hex or string)'),
            onChange: _onChangeSeed,
            seed: seed,
            withLabel: true,
            children: [/*#__PURE__*/_jsx(CopyButton, {
              className: "copyMoved",
              type: seedType === 'bip' ? t('mnemonic') : seedType === 'raw' ? isEthereum ? t('private key') : 'seed' : t('raw seed'),
              value: seed
            }), /*#__PURE__*/_jsx(Dropdown, {
              defaultValue: seedType,
              isButton: true,
              onChange: _selectSeedType,
              options: seedOpt.current
            })]
          })
        }), /*#__PURE__*/_jsxs(Expander, {
          className: "accounts--Creator-advanced",
          isPadded: true,
          summary: t('Advanced creation options'),
          children: [pairType !== 'ethereum' && /*#__PURE__*/_jsx(Modal.Columns, {
            hint: t('If you are moving accounts between applications, ensure that you use the correct type.'),
            children: /*#__PURE__*/_jsx(Dropdown, {
              defaultValue: pairType,
              help: t('Determines what cryptography will be used to create this account. Note that to validate on AXIA, the session account must use "ed25519".'),
              label: t('keypair crypto type'),
              onChange: _onChangePairType,
              options: isEthereum ? settings.availableCryptosEth : isLedgerEnabled ? settings.availableCryptosLedger : settings.availableCryptos,
              tabIndex: -1
            })
          }), pairType === 'ed25519-ledger' ? /*#__PURE__*/_jsx(CreateSuriLedger, {
            onChange: _onChangePath,
            seedType: seedType
          }) : pairType === 'ethereum' ? /*#__PURE__*/_jsx(CreateEthDerivationPath, {
            derivePath: derivePath,
            deriveValidation: deriveValidation,
            onChange: _onChangePath,
            seed: seed,
            seedType: seedType
          }) : /*#__PURE__*/_jsxs(Modal.Columns, {
            hint: t('The derivation path allows you to create different accounts from the same base mnemonic.'),
            children: [/*#__PURE__*/_jsx(Input, {
              help: t('You can set a custom derivation path for this account using the following syntax "/<soft-key>//<hard-key>". The "/<soft-key>" and "//<hard-key>" may be repeated and mixed`. An optional "///<password>" can be used with a mnemonic seed, and may only be specified once.'),
              isDisabled: seedType === 'raw',
              isError: !!(deriveValidation !== null && deriveValidation !== void 0 && deriveValidation.error),
              label: t('secret derivation path'),
              onChange: _onChangePath,
              placeholder: seedType === 'raw' ? pairType === 'sr25519' ? t('//hard/soft') : t('//hard') : pairType === 'sr25519' ? t('//hard/soft///password') : t('//hard///password'),
              tabIndex: -1,
              value: derivePath
            }), (deriveValidation === null || deriveValidation === void 0 ? void 0 : deriveValidation.error) && /*#__PURE__*/_jsx(MarkError, {
              content: errorIndex.current[deriveValidation.error] || deriveValidation.error
            }), (deriveValidation === null || deriveValidation === void 0 ? void 0 : deriveValidation.warning) && /*#__PURE__*/_jsx(MarkWarning, {
              content: errorIndex.current[deriveValidation.warning]
            })]
          })]
        }), /*#__PURE__*/_jsxs(Modal.Columns, {
          children: [/*#__PURE__*/_jsx(ExternalWarning, {}), /*#__PURE__*/_jsx("div", {
            className: "saveToggle",
            children: /*#__PURE__*/_jsx(Checkbox, {
              label: /*#__PURE__*/_jsx(_Fragment, {
                children: t('I have saved my mnemonic seed safely')
              }),
              onChange: _toggleMnemonicSaved,
              value: isMnemonicSaved
            })
          })]
        })]
      }), step === 2 && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(CreateAccountInputs, {
          name: {
            isNameValid,
            name
          },
          onCommit: _onCommit,
          setName: setName,
          setPassword: setPassword
        }), ";", /*#__PURE__*/_jsx(Modal.Columns, {
          children: /*#__PURE__*/_jsx(ExternalWarning, {})
        })]
      }), step === 3 && address && /*#__PURE__*/_jsx(CreateConfirmation, {
        derivePath: derivePath,
        isBusy: isBusy,
        pairType: pairType === 'ed25519-ledger' ? 'ed25519' : pairType,
        seed: seed
      })]
    }), /*#__PURE__*/_jsxs(Modal.Actions, {
      children: [step === 1 && /*#__PURE__*/_jsx(Button, {
        activeOnEnter: true,
        icon: "step-forward",
        isDisabled: !isFirstStepValid,
        label: t('Next'),
        onClick: nextStep
      }), step === 2 && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(Button, {
          icon: "step-backward",
          label: t('Prev'),
          onClick: prevStep
        }), /*#__PURE__*/_jsx(Button, {
          activeOnEnter: true,
          icon: "step-forward",
          isDisabled: !isSecondStepValid,
          label: t('Next'),
          onClick: nextStep
        })]
      }), step === 3 && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(Button, {
          icon: "step-backward",
          label: t('Prev'),
          onClick: prevStep
        }), /*#__PURE__*/_jsx(Button, {
          activeOnEnter: true,
          icon: "plus",
          isBusy: isBusy,
          label: t('Save'),
          onClick: _onCommit
        })]
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Create).withConfig({
  displayName: "Create",
  componentId: "sc-1agvn49-0"
})([".accounts--Creator-advanced{margin-top:1rem;overflow:visible;}.ui--CopyButton.copyMoved{position:absolute;right:9.25rem;top:1.15rem;}&& .TextAreaWithDropdown{textarea{width:80%;}.ui.buttons{width:20%;}}.saveToggle{text-align:right;.ui--Checkbox{margin:0.8rem 0;> label{font-weight:var(--font-weight-normal);}}}"]));