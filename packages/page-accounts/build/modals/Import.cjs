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

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _ExternalWarning = _interopRequireDefault(require("./ExternalWarning.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const acceptedFormats = ['application/json', 'text/plain'].join(', ');

function parseFile(file, setWarning, isEthereum, genesisHash) {
  try {
    const pair = _uiKeyring.keyring.createFromJson(JSON.parse((0, _util.u8aToString)(file)), {
      genesisHash
    });

    if (isEthereum && pair.type !== 'ethereum') {
      throw new Error('JSON File does not contain an ethereum type key pair');
    }

    return pair;
  } catch (error) {
    console.error(error);
    setWarning(error.message ? error.message : error.toString());
  }

  return null;
}

function Import(_ref) {
  let {
    className = '',
    onClose,
    onStatusChange
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api,
    isDevelopment,
    isEthereum
  } = (0, _reactHooks.useApi)();
  const [isBusy, setIsBusy] = (0, _react.useState)(false);
  const [pair, setPair] = (0, _react.useState)(null);
  const [warning, setWarning] = (0, _react.useState)(null);
  const [{
    isPassValid,
    password
  }, setPass] = (0, _react.useState)({
    isPassValid: false,
    password: ''
  });
  const apiGenesisHash = (0, _react.useMemo)(() => isDevelopment ? null : api.genesisHash.toHex(), [api, isDevelopment]);
  const differentGenesis = (0, _react.useMemo)(() => (pair === null || pair === void 0 ? void 0 : pair.meta.genesisHash) && pair.meta.genesisHash !== apiGenesisHash, [apiGenesisHash, pair]);

  const _onChangeFile = (0, _react.useCallback)(file => setPair(parseFile(file, setWarning, isEthereum, apiGenesisHash)), [apiGenesisHash, isEthereum]);

  const _onChangePass = (0, _react.useCallback)(password => setPass({
    isPassValid: _uiKeyring.keyring.isPassValid(password),
    password
  }), []);

  const _onSave = (0, _react.useCallback)(() => {
    if (!pair) {
      return;
    }

    setIsBusy(true);
    setTimeout(() => {
      const status = {
        action: 'restore'
      };

      try {
        _uiKeyring.keyring.addPair(pair, password);

        status.status = 'success';
        status.account = pair.address;
        status.message = t('account restored');

        _reactComponents.InputAddress.setLastValue('account', pair.address);
      } catch (error) {
        setPass(state => _objectSpread(_objectSpread({}, state), {}, {
          isPassValid: false
        }));
        status.status = 'error';
        status.message = error.message;
        console.error(error);
      }

      setIsBusy(false);
      onStatusChange(status);

      if (status.status !== 'error') {
        onClose();
      }
    }, 0);
  }, [onClose, onStatusChange, pair, password, t]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
    className: className,
    header: t('Add via backup file'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressRow, {
          defaultName: (pair === null || pair === void 0 ? void 0 : pair.meta.name) || null,
          noDefaultNameOpacity: true,
          value: (pair === null || pair === void 0 ? void 0 : pair.address) || null
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
        hint: t('Supply a backed-up JSON file, encrypted with your account-specific password.'),
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputFile, {
          accept: acceptedFormats,
          className: "full",
          help: t('Select the JSON key file that was downloaded when you created the account. This JSON file contains your private key encrypted with your password.'),
          isError: !pair,
          label: t('backup file'),
          onChange: _onChangeFile,
          withLabel: true
        }), differentGenesis && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkWarning, {
          content: t('The network from which this account was originally generated is different than the network you are currently connected to. Once imported ensure you toggle the "allow on any network" option for the account to keep it visible on the current network.')
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
        hint: t('The password previously used to encrypt this account.'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Password, {
          autoFocus: true,
          className: "full",
          help: t('Type the password chosen at the account creation. It was used to encrypt your account\'s private key in the backup file.'),
          isError: !isPassValid,
          label: t('password'),
          onChange: _onChangePass,
          onEnter: _onSave,
          value: password
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ExternalWarning.default, {}), warning && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkWarning, {
          content: warning
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "sync",
        isBusy: isBusy,
        isDisabled: !pair || !isPassValid,
        label: t('Restore'),
        onClick: _onSave
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Import);

exports.default = _default;