"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _reactQuery = require("@axia-js/react-query");

var _translate = require("../../translate.cjs");

var _useUnbondDuration = _interopRequireDefault(require("../useUnbondDuration.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Unbond(_ref) {
  var _ref2;

  let {
    className = '',
    controllerId,
    onClose,
    stakingLedger,
    stashId
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const bondedBlocks = (0, _useUnbondDuration.default)();
  const [maxBalance] = (0, _react.useState)(() => {
    var _stakingLedger$active;

    return (stakingLedger === null || stakingLedger === void 0 ? void 0 : (_stakingLedger$active = stakingLedger.active) === null || _stakingLedger$active === void 0 ? void 0 : _stakingLedger$active.unwrap()) || null;
  });
  const [maxUnbond, setMaxUnbond] = (0, _react.useState)(null);
  const [withMax, setWithMax] = (0, _react.useState)(false);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
    className: `staking--Unbond ${className}`,
    header: t('Unbond funds'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
        hint: t('The stash and controller pair, here the controller will be used to send the transaction.'),
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
          defaultValue: stashId,
          isDisabled: true,
          label: t('stash account')
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
          defaultValue: controllerId,
          isDisabled: true,
          label: t('controller account')
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
        hint: t('The funds will only be available for withdrawal after the unbonding period, however will not be part of the staked amount after the next validator election. You can follow the unlock countdown in the UI.'),
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputBalance, {
          autoFocus: true,
          defaultValue: maxBalance,
          help: t('The amount of funds to unbond, this is adjusted using the bonded funds on the stash account.'),
          isDisabled: withMax,
          label: t('unbond amount'),
          maxValue: maxBalance,
          onChange: setMaxUnbond,
          withMax: true,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Toggle, {
            isOverlay: true,
            label: t('all bonded'),
            onChange: setWithMax,
            value: withMax
          })
        }, `unbondAmount-${withMax.toString()}`), (bondedBlocks === null || bondedBlocks === void 0 ? void 0 : bondedBlocks.gtn(0)) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Static, {
          help: t('The bonding duration for any staked funds. After this period needs to be withdrawn.'),
          label: t('on-chain bonding duration'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.BlockToTime, {
            value: bondedBlocks
          })
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
        accountId: controllerId,
        icon: "unlock",
        isDisabled: !((_ref2 = withMax ? maxBalance : maxUnbond) !== null && _ref2 !== void 0 && _ref2.gtn(0)),
        label: t('Unbond'),
        onStart: onClose,
        params: [withMax ? maxBalance : maxUnbond],
        tx: api.tx.staking.unbond
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Unbond).withConfig({
  displayName: "Unbond",
  componentId: "sc-1pwkkej-0"
})([".staking--Unbond--max > div{justify-content:flex-end;& .column{flex:0;}}"]));

exports.default = _default;