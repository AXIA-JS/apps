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

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
function createStream(api, payouts) {
  return payouts.sort((a, b) => a.era.cmp(b.era)).map(_ref => {
    let {
      era,
      validatorId
    } = _ref;
    return api.tx.staking.payoutStakers(validatorId, era);
  });
}

function createExtrinsics(api, payout) {
  if (!Array.isArray(payout)) {
    const {
      eras,
      validatorId
    } = payout;
    return eras.length === 1 ? [api.tx.staking.payoutStakers(validatorId, eras[0].era)] : createStream(api, eras.map(era => ({
      era: era.era,
      validatorId
    })));
  } else if (payout.length === 1) {
    return createExtrinsics(api, payout[0]);
  }

  return createStream(api, payout.reduce((payouts, _ref2) => {
    let {
      eras,
      validatorId
    } = _ref2;
    eras.forEach(_ref3 => {
      let {
        era
      } = _ref3;
      payouts.push({
        era,
        validatorId
      });
    });
    return payouts;
  }, []));
}

function PayButton(_ref4) {
  var _api$consts$staking$m;

  let {
    className,
    isAll,
    isDisabled,
    payout
  } = _ref4;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [isVisible, togglePayout] = (0, _reactHooks.useToggle)();
  const [accountId, setAccount] = (0, _react.useState)(null);
  const [txs, setTxs] = (0, _react.useState)(null);
  const extrinsics = (0, _reactHooks.useTxBatch)(txs, {
    batchSize: 36 * 64 / (((_api$consts$staking$m = api.consts.staking.maxNominatorRewardedPerValidator) === null || _api$consts$staking$m === void 0 ? void 0 : _api$consts$staking$m.toNumber()) || 64)
  });
  (0, _react.useEffect)(() => {
    payout && setTxs(() => createExtrinsics(api, payout));
  }, [api, payout]);
  const isPayoutEmpty = !payout || Array.isArray(payout) && payout.length === 0;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [payout && isVisible && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
      className: className,
      header: t('Payout all stakers'),
      onClose: togglePayout,
      size: "large",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('Any account can request payout for stakers, this is not limited to accounts that will be rewarded.'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
            label: t('request payout from'),
            onChange: setAccount,
            type: "account",
            value: accountId
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
              children: t('All the listed validators and all their nominators will receive their rewards.')
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
              children: t('The UI puts a limit of 40 payouts at a time, where each payout is a single validator for a single era.')
            })]
          }),
          children: Array.isArray(payout) ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Static, {
            label: t('payout stakers for (multiple)'),
            value: payout.map(_ref5 => {
              let {
                validatorId
              } = _ref5;
              return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressMini, {
                className: "addressStatic",
                value: validatorId
              }, validatorId);
            })
          }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
            defaultValue: payout.validatorId,
            isDisabled: true,
            label: t('payout stakers for (single)')
          })
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
          accountId: accountId,
          extrinsic: extrinsics,
          icon: "credit-card",
          isDisabled: !extrinsics || !extrinsics.length || !accountId,
          label: t('Payout'),
          onStart: togglePayout
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
      icon: "credit-card",
      isDisabled: isDisabled || isPayoutEmpty,
      label: isAll || Array.isArray(payout) ? t('Payout all') : t('Payout'),
      onClick: togglePayout
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(PayButton).withConfig({
  displayName: "PayButton",
  componentId: "sc-1cb5jht-0"
})([".ui--AddressMini.padded.addressStatic{padding-top:0.5rem;.ui--AddressMini-info{min-width:10rem;max-width:10rem;}}"]));

exports.default = _default;