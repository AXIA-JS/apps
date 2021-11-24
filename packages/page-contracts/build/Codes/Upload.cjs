"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _apiContract = require("@axia-js/api-contract");

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _reactQuery = require("@axia-js/react-query");

var _uiKeyring = require("@axia-js/ui-keyring");

var _util = require("@axia-js/util");

var _constants = require("../constants.cjs");

var _index = require("../shared/index.cjs");

var _store = _interopRequireDefault(require("../store.cjs"));

var _translate = require("../translate.cjs");

var _useAbi = _interopRequireDefault(require("../useAbi.cjs"));

var _useWeight = _interopRequireDefault(require("../useWeight.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-contracts authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Upload(_ref) {
  let {
    onClose
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [accountId, setAccountId] = (0, _reactHooks.useAccountId)();
  const [step, nextStep, prevStep] = (0, _reactHooks.useStepper)();
  const [[uploadTx, error], setUploadTx] = (0, _react.useState)([null, null]);
  const [constructorIndex, setConstructorIndex] = (0, _react.useState)(0);
  const [endowment, isEndowmentValid, setEndowment] = (0, _reactHooks.useNonZeroBn)(_constants.ENDOWMENT);
  const [params, setParams] = (0, _react.useState)([]);
  const [[wasm, isWasmValid], setWasm] = (0, _react.useState)([null, false]);
  const [name, isNameValid, setName] = (0, _reactHooks.useNonEmptyString)();
  const {
    abiName,
    contractAbi,
    errorText,
    isAbiError,
    isAbiSupplied,
    isAbiValid,
    onChangeAbi,
    onRemoveAbi
  } = (0, _useAbi.default)();
  const weight = (0, _useWeight.default)();
  const code = (0, _react.useMemo)(() => isAbiValid && isWasmValid && wasm && contractAbi ? new _apiContract.CodePromise(api, contractAbi, wasm) : null, [api, contractAbi, isAbiValid, isWasmValid, wasm]);
  const constructOptions = (0, _react.useMemo)(() => contractAbi ? contractAbi.constructors.map((c, index) => ({
    info: c.identifier,
    key: c.identifier,
    text: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.MessageSignature, {
      asConstructor: true,
      message: c
    }),
    value: index
  })) : [], [contractAbi]);
  (0, _react.useEffect)(() => {
    setConstructorIndex(0);
  }, [constructOptions]);
  (0, _react.useEffect)(() => {
    setParams([]);
  }, [contractAbi, constructorIndex]);
  (0, _react.useEffect)(() => {
    setWasm(contractAbi && (0, _util.isWasm)(contractAbi.project.source.wasm) ? [contractAbi.project.source.wasm, true] : [null, false]);
  }, [contractAbi]);
  (0, _react.useEffect)(() => {
    abiName && setName(abiName);
  }, [abiName, setName]);
  (0, _react.useEffect)(() => {
    let contract = null;
    let error = null;

    try {
      var _contractAbi$construc;

      contract = code && contractAbi !== null && contractAbi !== void 0 && (_contractAbi$construc = contractAbi.constructors[constructorIndex]) !== null && _contractAbi$construc !== void 0 && _contractAbi$construc.method && endowment ? code.tx[contractAbi.constructors[constructorIndex].method]({
        gasLimit: weight.weight,
        value: endowment
      }, ...params) : null;
    } catch (e) {
      error = e.message;
    }

    setUploadTx(() => [contract, error]);
  }, [code, contractAbi, constructorIndex, endowment, params, weight]);

  const _onAddWasm = (0, _react.useCallback)((wasm, name) => {
    setWasm([wasm, (0, _util.isWasm)(wasm)]);
    setName(name.replace('.wasm', '').replace('_', ' '));
  }, [setName]);

  const _onSuccess = (0, _react.useCallback)(result => {
    result.blueprint && _store.default.saveCode(result.blueprint.codeHash, {
      abi: (0, _util.stringify)(result.blueprint.abi.json),
      name: name || '<>',
      tags: []
    });
    result.contract && _uiKeyring.keyring.saveContract(result.contract.address.toString(), {
      contract: {
        abi: (0, _util.stringify)(result.contract.abi.json),
        genesisHash: api.genesisHash.toHex()
      },
      name: name || '<>',
      tags: []
    });
  }, [api, name]);

  const isSubmittable = !!accountId && !(0, _util.isNull)(name) && isNameValid && isWasmValid && isAbiSupplied && isAbiValid && !!uploadTx && step === 2;
  const invalidAbi = isAbiError || !isAbiSupplied;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
    header: t('Upload & deploy code {{info}}', {
      replace: {
        info: `${step}/2`
      }
    }),
    onClose: onClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
      children: [step === 1 && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
          help: t('Specify the user account to use for this deployment. Any fees will be deducted from this account.'),
          isInput: false,
          label: t('deployment account'),
          labelExtra: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.Available, {
            label: t('transferrable'),
            params: accountId
          }),
          onChange: setAccountId,
          type: "account",
          value: accountId
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.ABI, {
          contractAbi: contractAbi,
          errorText: errorText,
          isError: invalidAbi,
          isSupplied: isAbiSupplied,
          isValid: isAbiValid,
          label: t('json for either ABI or .contract bundle'),
          onChange: onChangeAbi,
          onRemove: onRemoveAbi,
          withWasm: true
        }), !invalidAbi && contractAbi && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [!contractAbi.project.source.wasm.length && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputFile, {
            help: t('The compiled WASM for the contract that you wish to deploy. Each unique code blob will be attached with a code hash that can be used to create new instances.'),
            isError: !isWasmValid,
            label: t('compiled contract WASM'),
            onChange: _onAddWasm,
            placeholder: wasm && !isWasmValid && t('The code is not recognized as being in valid WASM format')
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.InputName, {
            isError: !isNameValid,
            onChange: setName,
            value: name || undefined
          })]
        })]
      }), step === 2 && contractAbi && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Dropdown, {
          help: t('The deployment constructor information for this contract, as provided by the ABI.'),
          isDisabled: contractAbi.constructors.length <= 1,
          label: t('deployment constructor'),
          onChange: setConstructorIndex,
          options: constructOptions,
          value: constructorIndex
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Params, {
          onChange: setParams,
          params: contractAbi.constructors[constructorIndex].args,
          registry: contractAbi.registry
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputBalance, {
          help: t('The allotted endowment for the deployed contract, i.e. the amount transferred to the contract upon instantiation.'),
          isError: !isEndowmentValid,
          label: t('endowment'),
          onChange: setEndowment,
          value: endowment
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.InputMegaGas, {
          help: t('The maximum amount of gas that can be used by this deployment, if the code requires more, the deployment will fail.'),
          weight: weight
        }), error && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkError, {
          content: error
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Actions, {
      children: [step === 1 ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "step-forward",
        isDisabled: !code || !contractAbi,
        label: t('Next'),
        onClick: nextStep
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "step-backward",
        label: t('Prev'),
        onClick: prevStep
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
        accountId: accountId,
        extrinsic: uploadTx,
        icon: "upload",
        isDisabled: !isSubmittable,
        label: t('Deploy'),
        onClick: onClose,
        onSuccess: _onSuccess
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Upload);

exports.default = _default;