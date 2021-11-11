"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _bn = _interopRequireDefault(require("bn.js"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _reactQuery = require("@axia-js/react-query");

var _util = require("@axia-js/util");

var _index = require("../shared/index.cjs");

var _translate = require("../translate.cjs");

var _useWeight = _interopRequireDefault(require("../useWeight.cjs"));

var _Outcome = _interopRequireDefault(require("./Outcome.cjs"));

var _util2 = require("./util.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const MAX_CALL_WEIGHT = new _bn.default(5000000000000).isub(_util.BN_ONE);

function Call({
  className = '',
  contract,
  messageIndex,
  onCallResult,
  onChangeMessage,
  onClose
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const message = contract.abi.messages[messageIndex];
  const [accountId, setAccountId] = (0, _reactHooks.useAccountId)();
  const [estimatedWeight, setEstimatedWeight] = (0, _react.useState)(null);
  const [value, isValueValid, setEndowment] = (0, _reactHooks.useFormField)(_util.BN_ZERO);
  const [outcomes, setOutcomes] = (0, _react.useState)([]);
  const [execTx, setExecTx] = (0, _react.useState)(null);
  const [params, setParams] = (0, _react.useState)([]);
  const [isViaCall, toggleViaCall] = (0, _reactHooks.useToggle)();
  const weight = (0, _useWeight.default)();
  const dbValue = (0, _reactHooks.useDebounce)(value);
  const dbParams = (0, _reactHooks.useDebounce)(params);
  (0, _react.useEffect)(() => {
    setEstimatedWeight(null);
    setParams([]);
  }, [contract, messageIndex]);
  (0, _react.useEffect)(() => {
    value && message.isMutating && setExecTx(() => {
      try {
        return contract.tx[message.method]({
          gasLimit: weight.weight,
          value: message.isPayable ? value : 0
        }, ...params);
      } catch (error) {
        return null;
      }
    });
  }, [accountId, contract, message, value, weight, params]);
  (0, _react.useEffect)(() => {
    if (!accountId || !message || !dbParams || !dbValue) return;
    contract.query[message.method](accountId, {
      gasLimit: -1,
      value: message.isPayable ? dbValue : 0
    }, ...dbParams).then(({
      gasRequired,
      result
    }) => setEstimatedWeight(result.isOk ? gasRequired : null)).catch(() => setEstimatedWeight(null));
  }, [accountId, contract, message, dbParams, dbValue]);

  const _onSubmitRpc = (0, _react.useCallback)(() => {
    if (!accountId || !message || !value || !weight) return;
    contract.query[message.method](accountId, {
      gasLimit: weight.isEmpty ? -1 : weight.weight,
      value: message.isPayable ? value : 0
    }, ...params).then(result => {
      setOutcomes([_objectSpread(_objectSpread({}, result), {}, {
        from: accountId,
        message,
        params,
        when: new Date()
      }), ...outcomes]);
      onCallResult && onCallResult(messageIndex, result);
    }).catch(error => {
      console.error(error);
      onCallResult && onCallResult(messageIndex);
    });
  }, [accountId, contract, message, messageIndex, onCallResult, outcomes, params, value, weight]);

  const _onClearOutcome = (0, _react.useCallback)(outcomeIndex => () => setOutcomes([...outcomes.filter((_, index) => index !== outcomeIndex)]), [outcomes]);

  const isValid = !!(accountId && weight.isValid && isValueValid);
  const isViaRpc = contract.hasRpcContractsCall && (isViaCall || !message.isMutating && !message.isPayable);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
    className: [className || '', 'app--contracts-Modal'].join(' '),
    header: t('Call a contract'),
    onClose: onClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
        help: t('A deployed contract that has either been deployed or attached. The address and ABI are used to construct the parameters.'),
        isDisabled: true,
        label: t('contract to use'),
        type: "contract",
        value: contract.address
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
        defaultValue: accountId,
        help: t('Specify the user account to use for this contract call. And fees will be deducted from this account.'),
        label: t('call from account'),
        labelExtra: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.Available, {
          label: t('transferrable'),
          params: accountId
        }),
        onChange: setAccountId,
        type: "account",
        value: accountId
      }), messageIndex !== null && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Dropdown, {
          defaultValue: messageIndex,
          help: t('The message to send to this contract. Parameters are adjusted based on the ABI provided.'),
          isError: message === null,
          label: t('message to send'),
          onChange: onChangeMessage,
          options: (0, _util2.getCallMessageOptions)(contract),
          value: messageIndex
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Params, {
          onChange: setParams,
          params: message ? message.args : undefined,
          registry: contract.abi.registry
        })]
      }), message.isPayable && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputBalance, {
        help: t('The allotted value for this contract, i.e. the amount transferred to the contract as part of this call.'),
        isError: !isValueValid,
        isZeroable: true,
        label: t('value'),
        onChange: setEndowment,
        value: value
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.InputMegaGas, {
        estimatedWeight: message.isMutating ? estimatedWeight : MAX_CALL_WEIGHT,
        help: t('The maximum amount of gas to use for this contract call. If the call requires more, it will fail.'),
        isCall: !message.isMutating,
        weight: weight
      }), message.isMutating && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Toggle, {
        className: "rpc-toggle",
        label: t('read contract only, no execution'),
        onChange: toggleViaCall,
        value: isViaCall
      }), outcomes.length > 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Expander, {
        className: "outcomes",
        isOpen: true,
        summary: t('Call results'),
        children: outcomes.map((outcome, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Outcome.default, {
          onClear: _onClearOutcome(index),
          outcome: outcome
        }, `outcome-${index}`))
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
      children: isViaRpc ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "sign-in-alt",
        isDisabled: !isValid,
        label: t('Read'),
        onClick: _onSubmitRpc
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
        accountId: accountId,
        extrinsic: execTx,
        icon: "sign-in-alt",
        isDisabled: !isValid || !execTx,
        label: t('Execute'),
        onStart: onClose
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Call).withConfig({
  displayName: "Call",
  componentId: "sc-1b0aupg-0"
})([".rpc-toggle{margin-top:1rem;display:flex;justify-content:flex-end;}.clear-all{float:right;}.outcomes{margin-top:1rem;}"]));

exports.default = _default;