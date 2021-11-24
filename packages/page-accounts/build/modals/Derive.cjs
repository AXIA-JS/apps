"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _uiKeyring = require("@axia-js/ui-keyring");

var _utilCrypto = require("@axia-js/util-crypto");

var _translate = require("../translate.cjs");

var _util = require("../util.cjs");

var _CreateAccountInputs = _interopRequireDefault(require("./CreateAccountInputs.cjs"));

var _CreateConfirmation = _interopRequireDefault(require("./CreateConfirmation.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function deriveValidate(suri, pairType) {
  if (suri.includes('///')) {
    return 'Password paths are not supported on keys derived from others';
  }

  try {
    const {
      path
    } = (0, _utilCrypto.keyExtractPath)(suri); // we don't allow soft for ed25519

    if (pairType === 'ed25519' && path.some(_ref => {
      let {
        isSoft
      } = _ref;
      return isSoft;
    })) {
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
    return _uiKeyring.keyring.addPair(derived, password || '');
  };

  return (0, _util.tryCreateAccount)(commitAccount, success);
}

function Derive(_ref2) {
  let {
    className = '',
    from,
    onClose
  } = _ref2;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api,
    isDevelopment
  } = (0, _reactHooks.useApi)();
  const {
    queueAction
  } = (0, _react.useContext)(_reactComponents.StatusContext);
  const [source] = (0, _react.useState)(() => _uiKeyring.keyring.getPair(from));
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
  const [{
    address,
    deriveError
  }, setDerive] = (0, _react.useState)({
    address: null,
    deriveError: null
  });
  const [isConfirmationOpen, toggleConfirmation] = (0, _reactHooks.useToggle)();
  const [{
    isLocked,
    lockedError
  }, setIsLocked] = (0, _react.useState)({
    isLocked: source.isLocked,
    lockedError: null
  });
  const [{
    isRootValid,
    rootPass
  }, setRootPass] = (0, _react.useState)({
    isRootValid: false,
    rootPass: ''
  });
  const [suri, setSuri] = (0, _react.useState)('');
  const debouncedSuri = (0, _reactHooks.useDebounce)(suri);
  const isValid = !!address && !deriveError && isNameValid && isPasswordValid;
  (0, _react.useEffect)(() => {
    setIsLocked({
      isLocked: source.isLocked,
      lockedError: null
    });
  }, [source]);
  (0, _react.useEffect)(() => {
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

  const _onChangeRootPass = (0, _react.useCallback)(rootPass => {
    setRootPass({
      isRootValid: !!rootPass,
      rootPass
    });
    setIsLocked(_ref3 => {
      let {
        isLocked
      } = _ref3;
      return {
        isLocked,
        lockedError: null
      };
    });
  }, []);

  const _onUnlock = (0, _react.useCallback)(() => {
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

  const _onCommit = (0, _react.useCallback)(() => {
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

  const sourceStatic = /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
    help: t('The selected account to perform the derivation on.'),
    isDisabled: true,
    label: t('derive root account'),
    value: from
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
    className: className,
    header: t('Derive account from pair'),
    onClose: onClose,
    children: [address && isConfirmationOpen ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_CreateConfirmation.default, {
      address: address,
      derivePath: suri,
      isBusy: isBusy,
      name: name,
      pairType: source.type
    }) : /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
      children: [isLocked && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [sourceStatic, /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Password, {
          autoFocus: true,
          help: t('The password to unlock the selected account.'),
          isError: !!lockedError,
          label: t('password'),
          onChange: _onChangeRootPass,
          value: rootPass
        })]
      }), !isLocked && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.AddressRow, {
        defaultName: name,
        noDefaultNameOpacity: true,
        value: deriveError ? '' : address,
        children: [sourceStatic, /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
          autoFocus: true,
          help: t('You can set a custom derivation path for this account using the following syntax "/<soft-key>//<hard-key>///<password>". The "/<soft-key>" and "//<hard-key>" may be repeated and mixed`.'),
          label: t('derivation path'),
          onChange: setSuri,
          placeholder: t('//hard/soft')
        }), deriveError && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkError, {
          content: deriveError
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CreateAccountInputs.default, {
          name: {
            isNameValid,
            name
          },
          onCommit: _onCommit,
          setName: setName,
          setPassword: setPassword
        }), ";"]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
      children: isLocked ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "lock",
        isBusy: isBusy,
        isDisabled: !isRootValid,
        label: t('Unlock'),
        onClick: _onUnlock
      }) : isConfirmationOpen ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
          icon: "step-backward",
          label: t('Prev'),
          onClick: toggleConfirmation
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
          icon: "plus",
          isBusy: isBusy,
          label: t('Save'),
          onClick: _onCommit
        })]
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "step-forward",
        isDisabled: !isValid,
        label: t('Next'),
        onClick: toggleConfirmation
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Derive);

exports.default = _default;