"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TokenUnit = void 0;

var _bn = _interopRequireDefault(require("bn.js"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _constants = require("./constants.cjs");

var _Dropdown = _interopRequireDefault(require("./Dropdown.cjs"));

var _Input = _interopRequireWildcard(require("./Input.cjs"));

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
const DEFAULT_BITLENGTH = _constants.BitLengthOption.NORMAL_NUMBERS;

class TokenUnit {
  static setAbbr(abbr = TokenUnit.abbr) {
    TokenUnit.abbr = abbr;
  }

}

exports.TokenUnit = TokenUnit;
TokenUnit.abbr = 'Unit';

function getGlobalMaxValue(bitLength) {
  return _util.BN_TWO.pow(new _bn.default(bitLength || DEFAULT_BITLENGTH)).isub(_util.BN_ONE);
}

function getRegex(isDecimal) {
  const decimal = '.';
  return new RegExp(isDecimal ? `^(0|[1-9]\\d*)(\\${decimal}\\d*)?$` : '^(0|[1-9]\\d*)$');
}

function getSiOptions(symbol, decimals) {
  return _util.formatBalance.getOptions(decimals).map(({
    power,
    text,
    value
  }) => ({
    text: power === 0 ? symbol : text,
    value
  }));
}

function getSiPowers(si, decimals) {
  if (!si) {
    return [_util.BN_ZERO, 0, 0];
  }

  const basePower = (0, _util.isUndefined)(decimals) ? _util.formatBalance.getDefaults().decimals : decimals;
  return [new _bn.default(basePower + si.power), basePower, si.power];
}

function isValidNumber(bn, bitLength, isZeroable, maxValue) {
  if ( // cannot be negative
  bn.lt(_util.BN_ZERO) || // cannot be > than allowed max
  bn.gt(getGlobalMaxValue(bitLength)) || !isZeroable && bn.isZero() || bn.bitLength() > (bitLength || DEFAULT_BITLENGTH) || maxValue && maxValue.gtn(0) && bn.gt(maxValue)) {
    return false;
  }

  return true;
}

function inputToBn(api, input, si, bitLength, isZeroable, maxValue, decimals) {
  const [siPower, basePower, siUnitPower] = getSiPowers(si, decimals); // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec

  const isDecimalValue = input.match(/^(\d+)\.(\d+)$/);
  let result;

  if (isDecimalValue) {
    if (siUnitPower - isDecimalValue[2].length < -basePower) {
      result = new _bn.default(-1);
    }

    const div = new _bn.default(input.replace(/\.\d*$/, ''));
    const modString = input.replace(/^\d+\./, '').substr(0, api.registry.chainDecimals[0]);
    const mod = new _bn.default(modString);
    result = div.mul(_util.BN_TEN.pow(siPower)).add(mod.mul(_util.BN_TEN.pow(new _bn.default(basePower + siUnitPower - modString.length))));
  } else {
    result = new _bn.default(input.replace(/[^\d]/g, '')).mul(_util.BN_TEN.pow(siPower));
  }

  return [result, isValidNumber(result, bitLength, isZeroable, maxValue)];
}

function getValuesFromString(api, value, si, bitLength, isZeroable, maxValue, decimals) {
  const [valueBn, isValid] = inputToBn(api, value, si, bitLength, isZeroable, maxValue, decimals);
  return [value, valueBn, isValid];
}

function getValuesFromBn(valueBn, si, isZeroable, _decimals) {
  const decimals = (0, _util.isUndefined)(_decimals) ? _util.formatBalance.getDefaults().decimals : _decimals;
  const value = si ? valueBn.div(_util.BN_TEN.pow(new _bn.default(decimals + si.power))).toString() : valueBn.toString();
  return [value, valueBn, isZeroable ? true : valueBn.gt(_util.BN_ZERO)];
}

function getValues(api, value = _util.BN_ZERO, si, bitLength, isZeroable, maxValue, decimals) {
  return (0, _util.isBn)(value) ? getValuesFromBn(value, si, isZeroable, decimals) : getValuesFromString(api, value, si, bitLength, isZeroable, maxValue, decimals);
}

function InputNumber({
  autoFocus,
  bitLength = DEFAULT_BITLENGTH,
  children,
  className = '',
  defaultValue,
  help,
  isDecimal,
  isFull,
  isSi,
  isDisabled,
  isError = false,
  isWarning,
  isZeroable = true,
  label,
  labelExtra,
  maxLength,
  maxValue,
  onChange,
  onEnter,
  onEscape,
  placeholder,
  siDecimals,
  siDefault,
  siSymbol,
  value: propsValue
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [si, setSi] = (0, _react.useState)(() => isSi ? siDefault || _util.formatBalance.findSi('-') : null);
  const [[value, valueBn, isValid], setValues] = (0, _react.useState)(() => getValues(api, propsValue || defaultValue, si, bitLength, isZeroable, maxValue, siDecimals));
  const [isPreKeyDown, setIsPreKeyDown] = (0, _react.useState)(false);
  const siOptions = (0, _react.useMemo)(() => getSiOptions(siSymbol || TokenUnit.abbr, siDecimals), [siDecimals, siSymbol]);
  (0, _react.useEffect)(() => {
    onChange && onChange(isValid ? valueBn : undefined);
  }, [isValid, onChange, valueBn]);

  const _onChangeWithSi = (0, _react.useCallback)((input, si) => setValues(getValuesFromString(api, input, si, bitLength, isZeroable, maxValue, siDecimals)), [api, bitLength, isZeroable, maxValue, siDecimals]);

  const _onChange = (0, _react.useCallback)(input => _onChangeWithSi(input, si), [_onChangeWithSi, si]);

  (0, _react.useEffect)(() => {
    defaultValue && _onChange(defaultValue.toString());
  }, [_onChange, defaultValue]);

  const _onKeyDown = (0, _react.useCallback)(event => {
    if (_Input.KEYS_PRE.includes(event.key)) {
      setIsPreKeyDown(true);
      return;
    }

    if (event.key.length === 1 && !isPreKeyDown) {
      const {
        selectionEnd: j,
        selectionStart: i,
        value
      } = event.target;
      const newValue = `${value.substring(0, i || 0)}${event.key}${value.substring(j || 0)}`;

      if (!getRegex(isDecimal || !!si).test(newValue)) {
        event.preventDefault();
      }
    }
  }, [isDecimal, isPreKeyDown, si]);

  const _onKeyUp = (0, _react.useCallback)(event => {
    if (_Input.KEYS_PRE.includes(event.key)) {
      setIsPreKeyDown(false);
    }
  }, []);

  const _onPaste = (0, _react.useCallback)(event => {
    const {
      value: newValue
    } = event.target;

    if (!getRegex(isDecimal || !!si).test(newValue)) {
      event.preventDefault();
    }
  }, [isDecimal, si]);

  const _onSelectSiUnit = (0, _react.useCallback)(siUnit => {
    const si = _util.formatBalance.findSi(siUnit);

    setSi(si);

    _onChangeWithSi(value, si);
  }, [_onChangeWithSi, value]); // Same as the number of digits, which means it can still overflow, i.e.
  // for u8 we allow 3, which could be 999 (however 2 digits will limit to only 99,
  // so this is more-or-less the lesser of evils without a max-value check)


  const maxValueLength = getGlobalMaxValue(bitLength).toString().length;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Input.default, {
    autoFocus: autoFocus,
    className: `ui--InputNumber${isDisabled ? ' isDisabled' : ''} ${className}`,
    help: help,
    isAction: isSi,
    isDisabled: isDisabled,
    isError: !isValid || isError,
    isFull: isFull,
    isWarning: isWarning,
    label: label,
    labelExtra: labelExtra,
    maxLength: maxLength || maxValueLength,
    onChange: _onChange,
    onEnter: onEnter,
    onEscape: onEscape,
    onKeyDown: _onKeyDown,
    onKeyUp: _onKeyUp,
    onPaste: _onPaste,
    placeholder: placeholder || t('Positive number'),
    type: "text",
    value: value,
    children: [!!si && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Dropdown.default, {
      defaultValue: isDisabled && siDefault ? siDefault.value : si.value,
      dropdownClassName: "ui--SiDropdown",
      isButton: true,
      onChange: isDisabled ? undefined : _onSelectSiUnit,
      options: siOptions
    }), children]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(InputNumber).withConfig({
  displayName: "InputNumber",
  componentId: "sc-1j4qf4-0"
})(["&.isDisabled{.ui--SiDropdown{background:transparent;border-color:var(--border-input) !important;border-style:dashed;color:#666 !important;cursor:default !important;.dropdown.icon{display:none;}}}.ui.buttons+.ui--Toggle.isOverlay{bottom:1.1rem;right:6.5rem;}"]));

exports.default = _default;