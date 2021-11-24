"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _Bond = _interopRequireDefault(require("./partials/Bond.cjs"));

var _Nominate = _interopRequireDefault(require("./partials/Nominate.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
const EMPTY_NOMS = [];
const NUM_STEPS = 2;

function NewNominator(_ref) {
  var _api$tx$utility, _targets$validators;

  let {
    isInElection,
    targets
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [isVisible, toggleVisible] = (0, _reactHooks.useToggle)();
  const [{
    bondOwnTx,
    bondTx,
    controllerId,
    controllerTx,
    stashId
  }, setBondInfo] = (0, _react.useState)({});
  const [{
    nominateTx
  }, setNominateInfo] = (0, _react.useState)({});
  const [step, setStep] = (0, _react.useState)(1);
  const isDisabled = isInElection || !(0, _util.isFunction)((_api$tx$utility = api.tx.utility) === null || _api$tx$utility === void 0 ? void 0 : _api$tx$utility.batch);

  const _nextStep = (0, _react.useCallback)(() => setStep(step => step + 1), []);

  const _prevStep = (0, _react.useCallback)(() => setStep(step => step - 1), []);

  const _toggle = (0, _react.useCallback)(() => {
    setBondInfo({});
    setNominateInfo({});
    setStep(1);
    toggleVisible();
  }, [toggleVisible]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
      icon: "plus",
      isDisabled: isDisabled || !((_targets$validators = targets.validators) !== null && _targets$validators !== void 0 && _targets$validators.length),
      label: t('Nominator'),
      onClick: _toggle
    }, 'new-nominator'), isVisible && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
      header: t('Setup Nominator {{step}}/{{NUM_STEPS}}', {
        replace: {
          NUM_STEPS,
          step
        }
      }),
      onClose: _toggle,
      size: "large",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
        children: [step === 1 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Bond.default, {
          isNominating: true,
          minNominated: targets.minNominated,
          minNominatorBond: targets.minNominatorBond,
          onChange: setBondInfo
        }), controllerId && stashId && step === 2 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Nominate.default, {
          controllerId: controllerId,
          nominating: EMPTY_NOMS,
          onChange: setNominateInfo,
          stashId: stashId,
          targets: targets
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.BatchWarning, {})
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Actions, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
          icon: "step-backward",
          isDisabled: step === 1,
          label: t('prev'),
          onClick: _prevStep
        }), step === NUM_STEPS ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
          accountId: stashId,
          icon: "sign-in-alt",
          isDisabled: !bondTx || !nominateTx || !stashId || !controllerId,
          label: t('Bond & Nominate'),
          onStart: _toggle,
          params: [stashId === controllerId ? [bondTx, nominateTx] : [bondOwnTx, nominateTx, controllerTx]],
          tx: api.tx.utility.batchAll || api.tx.utility.batch
        }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
          icon: "step-forward",
          isDisabled: !bondTx,
          label: t('next'),
          onClick: _nextStep
        })]
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(NewNominator);

exports.default = _default;