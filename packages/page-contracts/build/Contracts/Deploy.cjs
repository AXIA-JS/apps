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

var _utilCrypto = require("@axia-js/util-crypto");

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
function Deploy({
  codeHash,
  constructorIndex = 0,
  onClose,
  setConstructorIndex
}) {
  var _contractAbi$construc2;

  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const weight = (0, _useWeight.default)();
  const [initTx, setInitTx] = (0, _react.useState)(null);
  const [params, setParams] = (0, _react.useState)([]);
  const [accountId, isAccountIdValid, setAccountId] = (0, _reactHooks.useFormField)(null);
  const [endowment, isEndowmentValid, setEndowment] = (0, _reactHooks.useNonZeroBn)(_constants.ENDOWMENT);
  const [salt, setSalt] = (0, _react.useState)(() => (0, _utilCrypto.randomAsHex)());
  const [withSalt, setWithSalt] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    setParams([]);
  }, [constructorIndex]);
  const code = (0, _react.useMemo)(() => _store.default.getCode(codeHash), [codeHash]);
  const [name, isNameValid, setName] = (0, _reactHooks.useNonEmptyString)(code && code.json.name);
  const {
    contractAbi,
    errorText,
    isAbiError,
    isAbiSupplied,
    isAbiValid,
    onChangeAbi,
    onRemoveAbi
  } = (0, _useAbi.default)([code && code.json.abi, code && code.contractAbi], codeHash, true);
  const blueprint = (0, _react.useMemo)(() => isAbiValid && codeHash && contractAbi ? new _apiContract.BlueprintPromise(api, contractAbi, codeHash) : null, [api, codeHash, contractAbi, isAbiValid]);
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
    endowment && setInitTx(() => {
      var _contractAbi$construc;

      if (blueprint && contractAbi !== null && contractAbi !== void 0 && (_contractAbi$construc = contractAbi.constructors[constructorIndex]) !== null && _contractAbi$construc !== void 0 && _contractAbi$construc.method) {
        try {
          return blueprint.tx[contractAbi.constructors[constructorIndex].method]({
            gasLimit: weight.weight,
            salt: withSalt ? salt : null,
            value: endowment
          }, ...params);
        } catch (error) {
          return null;
        }
      }

      return null;
    });
  }, [blueprint, contractAbi, constructorIndex, endowment, params, salt, weight, withSalt]);

  const _onSuccess = (0, _react.useCallback)(result => {
    if (result.contract) {
      _uiKeyring.keyring.saveContract(result.contract.address.toString(), {
        contract: {
          abi: (0, _util.stringify)(result.contract.abi.json),
          genesisHash: api.genesisHash.toHex()
        },
        name,
        tags: []
      });

      onClose && onClose();
    }
  }, [api, name, onClose]);

  const isSaltValid = !withSalt || salt && (!salt.startsWith('0x') || (0, _util.isHex)(salt));
  const isValid = isNameValid && isEndowmentValid && weight.isValid && isAccountIdValid && isSaltValid;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
    header: t('Deploy a contract'),
    onClose: onClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
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
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.InputName, {
        isContract: true,
        isError: !isNameValid,
        onChange: setName,
        value: name || ''
      }), !isAbiSupplied && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.ABI, {
        contractAbi: contractAbi,
        errorText: errorText,
        isError: isAbiError,
        isSupplied: isAbiSupplied,
        isValid: isAbiValid,
        onChange: onChangeAbi,
        onRemove: onRemoveAbi
      }), contractAbi && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Dropdown, {
          help: t('The deployment constructor information for this contract, as provided by the ABI.'),
          isDisabled: contractAbi.constructors.length <= 1,
          label: t('deployment constructor'),
          onChange: setConstructorIndex,
          options: constructOptions,
          value: constructorIndex
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Params, {
          onChange: setParams,
          params: (_contractAbi$construc2 = contractAbi.constructors[constructorIndex]) === null || _contractAbi$construc2 === void 0 ? void 0 : _contractAbi$construc2.args,
          registry: contractAbi.registry
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputBalance, {
        help: t('The allotted endowment for this contract, i.e. the amount transferred to the contract upon instantiation.'),
        isError: !isEndowmentValid,
        label: t('endowment'),
        onChange: setEndowment,
        value: endowment
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
        help: t('A hex or string value that acts as a salt for this deployment.'),
        isDisabled: !withSalt,
        label: t('unique deployment salt'),
        onChange: setSalt,
        placeholder: t('0x prefixed hex, e.g. 0x1234 or ascii data'),
        value: withSalt ? salt : t('<none>'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Toggle, {
          isOverlay: true,
          label: t('use deployment salt'),
          onChange: setWithSalt,
          value: withSalt
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.InputMegaGas, {
        help: t('The maximum amount of gas that can be used by this deployment, if the code requires more, the deployment will fail.'),
        weight: weight
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
        accountId: accountId,
        extrinsic: initTx,
        icon: "upload",
        isDisabled: !isValid || !initTx,
        label: t('Deploy'),
        onClick: onClose,
        onSuccess: _onSuccess,
        withSpinner: true
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Deploy);

exports.default = _default;