"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _defaults = require("@axia-js/keyring/defaults");

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _uiKeyring = require("@axia-js/ui-keyring");

var _uiSettings = require("@axia-js/ui-settings");

var _util = require("@axia-js/util");

var _utilCrypto = require("@axia-js/util-crypto");

var _translate = require("../translate.cjs");

var _util2 = require("../util.cjs");

var _CreateAccountInputs = _interopRequireDefault(require("./CreateAccountInputs.cjs"));

var _CreateConfirmation = _interopRequireDefault(require("./CreateConfirmation.cjs"));

var _CreateEthDerivationPath = _interopRequireWildcard(require("./CreateEthDerivationPath.cjs"));

var _CreateSuriLedger = _interopRequireDefault(require("./CreateSuriLedger.cjs"));

var _ExternalWarning = _interopRequireDefault(require("./ExternalWarning.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const DEFAULT_PAIR_TYPE = 'sr25519';
const STEPS_COUNT = 3;

function getSuri(seed, derivePath, pairType) {
  return pairType === 'ed25519-ledger' ? (0, _util.u8aToHex)((0, _utilCrypto.hdLedger)(seed, derivePath).secretKey.slice(0, 32)) : pairType === 'ethereum' ? `${seed}/${derivePath}` : `${seed}${derivePath}`;
}

function deriveValidate(seed, seedType, derivePath, pairType) {
  try {
    const {
      password,
      path
    } = (0, _utilCrypto.keyExtractSuri)(pairType === 'ethereum' ? `${seed}/${derivePath}` : `${seed}${derivePath}`);
    let result = {}; // show a warning in case the password contains an unintended / character

    if (password !== null && password !== void 0 && password.includes('/')) {
      result = {
        warning: 'WARNING_SLASH_PASSWORD'
      };
    } // we don't allow soft for ed25519


    if (pairType === 'ed25519' && path.some(_ref => {
      let {
        isSoft
      } = _ref;
      return isSoft;
    })) {
      return _objectSpread(_objectSpread({}, result), {}, {
        error: 'SOFT_NOT_ALLOWED'
      });
    } // we don't allow password for hex seed


    if (seedType === 'raw' && password) {
      return _objectSpread(_objectSpread({}, result), {}, {
        error: 'PASSWORD_IGNORED'
      });
    }

    if (pairType === 'ethereum' && !(0, _utilCrypto.hdValidatePath)(derivePath)) {
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
  return (0, _util.isHex)(seed) && seed.length === 66;
}

function rawValidate(seed) {
  return seed.length > 0 && seed.length <= 32 || isHexSeed(seed);
}

function addressFromSeed(seed, derivePath, pairType) {
  return _uiKeyring.keyring.createFromUri(getSuri(seed, derivePath, pairType), {}, pairType === 'ed25519-ledger' ? 'ed25519' : pairType).address;
}

function newSeed(seed, seedType) {
  switch (seedType) {
    case 'bip':
      return (0, _utilCrypto.mnemonicGenerate)();

    case 'dev':
      return _defaults.DEV_PHRASE;

    default:
      return seed || (0, _util.u8aToHex)((0, _utilCrypto.randomAsU8a)());
  }
}

function generateSeed(_seed, derivePath, seedType) {
  let pairType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_PAIR_TYPE;
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
  let isSeedValid = seedType === 'raw' ? rawValidate(seed) : (0, _utilCrypto.mnemonicValidate)(seed);

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

function createAccount(seed, derivePath, pairType, _ref2, password, success) {
  let {
    genesisHash,
    name,
    tags = []
  } = _ref2;

  const commitAccount = () => _uiKeyring.keyring.addUri(getSuri(seed, derivePath, pairType), password, {
    genesisHash,
    isHardware: false,
    name,
    tags
  }, pairType === 'ed25519-ledger' ? 'ed25519' : pairType);

  return (0, _util2.tryCreateAccount)(commitAccount, success);
}

function Create(_ref3) {
  let {
    className = '',
    onClose,
    onStatusChange,
    seed: propsSeed,
    type: propsType
  } = _ref3;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api,
    isDevelopment,
    isEthereum
  } = (0, _reactHooks.useApi)();
  const {
    isLedgerEnabled
  } = (0, _reactHooks.useLedger)();
  const [{
    address,
    derivePath,
    deriveValidation,
    isSeedValid,
    pairType,
    seed,
    seedType
  }, setAddress] = (0, _react.useState)(() => generateSeed(propsSeed, isEthereum ? _CreateEthDerivationPath.ETH_DEFAULT_PATH : '', propsSeed ? 'raw' : 'bip', isEthereum ? 'ethereum' : propsType));
  const [isMnemonicSaved, setIsMnemonicSaved] = (0, _react.useState)(false);
  const [step, nextStep, prevStep] = (0, _reactHooks.useStepper)();
  const [isBusy, setIsBusy] = (0, _react.useState)(false);
  const [{
    isNameValid,
    name
  }, setName] = (0, _react.useState)({
    isNameValid: false,
    name: ''
  });
  const [{
    isPasswordValid,
    password
  }, setPassword] = (0, _react.useState)({
    isPasswordValid: false,
    password: ''
  });
  const isFirstStepValid = !!address && isMnemonicSaved && !(deriveValidation !== null && deriveValidation !== void 0 && deriveValidation.error) && isSeedValid;
  const isSecondStepValid = isNameValid && isPasswordValid;
  const isValid = isFirstStepValid && isSecondStepValid;
  const errorIndex = (0, _react.useRef)({
    INVALID_DERIVATION_PATH: t('This is an invalid derivation path.'),
    PASSWORD_IGNORED: t('Password are ignored for hex seed'),
    SOFT_NOT_ALLOWED: t('Soft derivation paths are not allowed on ed25519'),
    WARNING_SLASH_PASSWORD: t('Your password contains at least one "/" character. Disregard this warning if it is intended.')
  });
  const seedOpt = (0, _react.useRef)((isDevelopment ? [{
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

  const _onChangePath = (0, _react.useCallback)(newDerivePath => setAddress(updateAddress(seed, newDerivePath, seedType, pairType)), [pairType, seed, seedType]);

  const _onChangeSeed = (0, _react.useCallback)(newSeed => setAddress(updateAddress(newSeed, derivePath, seedType, pairType)), [derivePath, pairType, seedType]);

  const _onChangePairType = (0, _react.useCallback)(newPairType => setAddress(updateAddress(seed, isEthereum ? _CreateEthDerivationPath.ETH_DEFAULT_PATH : '', seedType, newPairType)), [seed, seedType, isEthereum]);

  const _selectSeedType = (0, _react.useCallback)(newSeedType => {
    if (newSeedType !== seedType) {
      setAddress(generateSeed(null, derivePath, newSeedType, pairType));
    }
  }, [derivePath, pairType, seedType]);

  const _toggleMnemonicSaved = (0, _react.useCallback)(() => setIsMnemonicSaved(!isMnemonicSaved), [isMnemonicSaved]);

  const _onCommit = (0, _react.useCallback)(() => {
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

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
    className: className,
    header: t('Add an account via seed {{step}}/{{STEPS_COUNT}}', {
      replace: {
        STEPS_COUNT,
        step
      }
    }),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressRow, {
          defaultName: name,
          fullLength: true,
          isEditableName: false,
          noDefaultNameOpacity: true,
          value: isSeedValid ? address : ''
        })
      }), step === 1 && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('The secret seed value for this account. Ensure that you keep this in a safe place, with access to the seed you can re-create the account.'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.TextArea, {
            help: isEthereum ? t("Your ethereum key pair is derived from your private key. Don't divulge this key.") : t('The private key for your account is derived from this seed. This seed must be kept secret as anyone in its possession has access to the funds of this account. If you validate, use the seed of the session account as the "--key" parameter of your node.'),
            isAction: true,
            isError: !isSeedValid,
            isReadOnly: seedType === 'dev',
            label: seedType === 'bip' ? t('mnemonic seed') : seedType === 'dev' ? t('development seed') : isEthereum ? t('ethereum private key') : t('seed (hex or string)'),
            onChange: _onChangeSeed,
            seed: seed,
            withLabel: true,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CopyButton, {
              className: "copyMoved",
              type: seedType === 'bip' ? t('mnemonic') : seedType === 'raw' ? isEthereum ? t('private key') : 'seed' : t('raw seed'),
              value: seed
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Dropdown, {
              defaultValue: seedType,
              isButton: true,
              onChange: _selectSeedType,
              options: seedOpt.current
            })]
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Expander, {
          className: "accounts--Creator-advanced",
          isPadded: true,
          summary: t('Advanced creation options'),
          children: [pairType !== 'ethereum' && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
            hint: t('If you are moving accounts between applications, ensure that you use the correct type.'),
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Dropdown, {
              defaultValue: pairType,
              help: t('Determines what cryptography will be used to create this account. Note that to validate on AXIA, the session account must use "ed25519".'),
              label: t('keypair crypto type'),
              onChange: _onChangePairType,
              options: isEthereum ? _uiSettings.settings.availableCryptosEth : isLedgerEnabled ? _uiSettings.settings.availableCryptosLedger : _uiSettings.settings.availableCryptos,
              tabIndex: -1
            })
          }), pairType === 'ed25519-ledger' ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_CreateSuriLedger.default, {
            onChange: _onChangePath,
            seedType: seedType
          }) : pairType === 'ethereum' ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_CreateEthDerivationPath.default, {
            derivePath: derivePath,
            deriveValidation: deriveValidation,
            onChange: _onChangePath,
            seed: seed,
            seedType: seedType
          }) : /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
            hint: t('The derivation path allows you to create different accounts from the same base mnemonic.'),
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
              help: t('You can set a custom derivation path for this account using the following syntax "/<soft-key>//<hard-key>". The "/<soft-key>" and "//<hard-key>" may be repeated and mixed`. An optional "///<password>" can be used with a mnemonic seed, and may only be specified once.'),
              isDisabled: seedType === 'raw',
              isError: !!(deriveValidation !== null && deriveValidation !== void 0 && deriveValidation.error),
              label: t('secret derivation path'),
              onChange: _onChangePath,
              placeholder: seedType === 'raw' ? pairType === 'sr25519' ? t('//hard/soft') : t('//hard') : pairType === 'sr25519' ? t('//hard/soft///password') : t('//hard///password'),
              tabIndex: -1,
              value: derivePath
            }), (deriveValidation === null || deriveValidation === void 0 ? void 0 : deriveValidation.error) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkError, {
              content: errorIndex.current[deriveValidation.error] || deriveValidation.error
            }), (deriveValidation === null || deriveValidation === void 0 ? void 0 : deriveValidation.warning) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkWarning, {
              content: errorIndex.current[deriveValidation.warning]
            })]
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ExternalWarning.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "saveToggle",
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Checkbox, {
              label: /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
                children: t('I have saved my mnemonic seed safely')
              }),
              onChange: _toggleMnemonicSaved,
              value: isMnemonicSaved
            })
          })]
        })]
      }), step === 2 && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CreateAccountInputs.default, {
          name: {
            isNameValid,
            name
          },
          onCommit: _onCommit,
          setName: setName,
          setPassword: setPassword
        }), ";", /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ExternalWarning.default, {})
        })]
      }), step === 3 && address && /*#__PURE__*/(0, _jsxRuntime.jsx)(_CreateConfirmation.default, {
        derivePath: derivePath,
        isBusy: isBusy,
        pairType: pairType === 'ed25519-ledger' ? 'ed25519' : pairType,
        seed: seed
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Actions, {
      children: [step === 1 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        activeOnEnter: true,
        icon: "step-forward",
        isDisabled: !isFirstStepValid,
        label: t('Next'),
        onClick: nextStep
      }), step === 2 && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
          icon: "step-backward",
          label: t('Prev'),
          onClick: prevStep
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
          activeOnEnter: true,
          icon: "step-forward",
          isDisabled: !isSecondStepValid,
          label: t('Next'),
          onClick: nextStep
        })]
      }), step === 3 && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
          icon: "step-backward",
          label: t('Prev'),
          onClick: prevStep
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
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

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Create).withConfig({
  displayName: "Create",
  componentId: "sc-14h106e-0"
})([".accounts--Creator-advanced{margin-top:1rem;overflow:visible;}.ui--CopyButton.copyMoved{position:absolute;right:9.25rem;top:1.15rem;}&& .TextAreaWithDropdown{textarea{width:80%;}.ui.buttons{width:20%;}}.saveToggle{text-align:right;.ui--Checkbox{margin:0.8rem 0;> label{font-weight:var(--font-weight-normal);}}}"]));

exports.default = _default;