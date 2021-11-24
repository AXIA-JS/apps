"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bn = _interopRequireDefault(require("bn.js"));

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _translate = require("../../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
const COMM_MUL = new _bn.default(1e7);

function Validate(_ref) {
  let {
    className = '',
    controllerId,
    onChange,
    stashId,
    withFocus,
    withSenders
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [commission, setCommission] = (0, _react.useState)(1);
  const [allowNoms, setAllowNoms] = (0, _react.useState)(true);
  const blockedOptions = (0, _react.useRef)([{
    text: t('Yes, allow nominations'),
    value: true
  }, {
    text: t('No, block all nominations'),
    value: false
  }]);
  (0, _react.useEffect)(() => {
    try {
      onChange({
        validateTx: api.tx.staking.validate({
          blocked: !allowNoms,
          commission
        })
      });
    } catch {
      onChange({
        validateTx: null
      });
    }
  }, [api, allowNoms, commission, onChange]);

  const _setCommission = (0, _react.useCallback)(value => value && setCommission(value.isZero() ? 1 // small non-zero set to avoid isEmpty
  : value.mul(COMM_MUL)), []);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [withSenders && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
      hint: t('The stash and controller pair. This transaction, managing preferences, will be sent from the controller.'),
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
        defaultValue: stashId,
        isDisabled: true,
        label: t('stash account')
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
        defaultValue: controllerId,
        isDisabled: true,
        label: t('controller account')
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
      hint: t('The commission is deducted from all rewards before the remainder is split with nominators.'),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputNumber, {
        autoFocus: withFocus,
        help: t('The percentage reward (0-100) that should be applied for the validator'),
        isZeroable: true,
        label: t('reward commission percentage'),
        maxValue: _util.BN_HUNDRED,
        onChange: _setCommission
      })
    }), (0, _util.isFunction)(api.tx.staking.kick) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
      hint: t('The validator can block any new nominations. By default it is set to allow all nominations.'),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Dropdown, {
        defaultValue: true,
        help: t('Does this validator allow nominations or is it blocked for all'),
        label: t('allows new nominations'),
        onChange: setAllowNoms,
        options: blockedOptions.current
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Validate);

exports.default = _default;