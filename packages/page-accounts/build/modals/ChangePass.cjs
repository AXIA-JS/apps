"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _uiKeyring = require("@axia-js/ui-keyring");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function ChangePass(_ref) {
  let {
    address,
    className = '',
    onClose
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const [isBusy, setIsBusy] = (0, _react.useState)(false);
  const [newPass1, setNewPass1] = (0, _react.useState)({
    isValid: false,
    password: ''
  });
  const [newPass2, setNewPass2] = (0, _react.useState)({
    isValid: false,
    password: ''
  });
  const [{
    isOldValid,
    oldPass
  }, setOldPass] = (0, _react.useState)({
    isOldValid: false,
    oldPass: ''
  });

  const _onChangeNew1 = (0, _react.useCallback)(password => setNewPass1({
    isValid: _uiKeyring.keyring.isPassValid(password),
    password
  }), []);

  const _onChangeNew2 = (0, _react.useCallback)(password => setNewPass2({
    isValid: _uiKeyring.keyring.isPassValid(password) && newPass1.password === password,
    password
  }), [newPass1]);

  const _onChangeOld = (0, _react.useCallback)(oldPass => setOldPass({
    isOldValid: _uiKeyring.keyring.isPassValid(oldPass),
    oldPass
  }), []);

  const _doChange = (0, _react.useCallback)(() => {
    const account = address && _uiKeyring.keyring.getPair(address);

    if (!account) {
      return;
    }

    setIsBusy(true);
    setTimeout(() => {
      try {
        if (!account.isLocked) {
          account.lock();
        }

        account.decodePkcs8(oldPass);
      } catch (error) {
        setOldPass(state => _objectSpread(_objectSpread({}, state), {}, {
          isOldValid: false
        }));
        setIsBusy(false);
        return;
      }

      try {
        _uiKeyring.keyring.encryptAccount(account, newPass1.password);
      } catch (error) {
        setNewPass2(state => _objectSpread(_objectSpread({}, state), {}, {
          isValid: false
        }));
        setIsBusy(false);
        return;
      }

      setIsBusy(false);
      onClose();
    }, 0);
  }, [address, newPass1, oldPass, onClose]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
    className: `${className} app--accounts-Modal`,
    header: t('Change account password'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressRow, {
        isInline: true,
        value: address
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
        hint: t('The existing account password as specified when this account was created or when it was last changed.'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Password, {
          autoFocus: true,
          help: t('The existing account password as specified when this account was created or when it was last changed.'),
          isError: !isOldValid,
          label: t('your current password'),
          onChange: _onChangeOld,
          tabIndex: 1,
          value: oldPass
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
        hint: t('This will apply to any future use of this account as stored on this browser. Ensure that you securely store this new password and that it is strong and unique to the account.'),
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Password, {
          help: t('The new account password. Once set, all future account unlocks will be performed with this new password.'),
          isError: !newPass1.isValid,
          label: t('your new password'),
          onChange: _onChangeNew1,
          onEnter: _doChange,
          tabIndex: 2,
          value: newPass1.password
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Password, {
          help: t('Verify the password entered above.'),
          isError: !newPass2.isValid,
          label: t('password (repeat)'),
          onChange: _onChangeNew2,
          onEnter: _doChange,
          tabIndex: 2,
          value: newPass2.password
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.PasswordStrength, {
          value: newPass1.password
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "sign-in-alt",
        isBusy: isBusy,
        isDisabled: !newPass1.isValid || !newPass2.isValid || !isOldValid,
        label: t('Change'),
        onClick: _doChange
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(ChangePass);

exports.default = _default;