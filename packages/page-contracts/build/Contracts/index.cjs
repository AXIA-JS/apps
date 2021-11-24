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

var _index = _interopRequireDefault(require("../Codes/index.cjs"));

var _Add = _interopRequireDefault(require("../Codes/Add.cjs"));

var _Upload = _interopRequireDefault(require("../Codes/Upload.cjs"));

var _translate = require("../translate.cjs");

var _useCodes = require("../useCodes.cjs");

var _useContracts = require("../useContracts.cjs");

var _Add2 = _interopRequireDefault(require("./Add.cjs"));

var _ContractsTable = _interopRequireDefault(require("./ContractsTable.cjs"));

var _Deploy = _interopRequireDefault(require("./Deploy.cjs"));

var _Summary = _interopRequireDefault(require("./Summary.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-contracts authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Contracts(_ref) {
  let {
    className = ''
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    allCodes,
    codeTrigger
  } = (0, _useCodes.useCodes)();
  const {
    allContracts
  } = (0, _useContracts.useContracts)();
  const [isAddOpen, toggleAdd] = (0, _reactHooks.useToggle)();
  const [isDeployOpen, toggleDeploy, setIsDeployOpen] = (0, _reactHooks.useToggle)();
  const [isHashOpen, toggleHash] = (0, _reactHooks.useToggle)();
  const [isUploadOpen, toggleUpload] = (0, _reactHooks.useToggle)();
  const [codeHash, setCodeHash] = (0, _react.useState)();
  const [constructorIndex, setConstructorIndex] = (0, _react.useState)(0);

  const _onShowDeploy = (0, _react.useCallback)((codeHash, constructorIndex) => {
    setCodeHash(codeHash || (allCodes && allCodes[0] ? allCodes[0].json.codeHash : undefined));
    setConstructorIndex(constructorIndex);
    toggleDeploy();
  }, [allCodes, toggleDeploy]);

  const _onCloseDeploy = (0, _react.useCallback)(() => setIsDeployOpen(false), [setIsDeployOpen]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Summary.default, {
      trigger: codeTrigger
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Button.Group, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "plus",
        label: t('Upload & deploy code'),
        onClick: toggleUpload
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "plus",
        label: t('Add an existing code hash'),
        onClick: toggleHash
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "plus",
        label: t('Add an existing contract'),
        onClick: toggleAdd
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ContractsTable.default, {
      contracts: allContracts,
      updated: codeTrigger
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {
      onShowDeploy: _onShowDeploy,
      updated: codeTrigger
    }), codeHash && isDeployOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Deploy.default, {
      codeHash: codeHash,
      constructorIndex: constructorIndex,
      onClose: _onCloseDeploy,
      setConstructorIndex: setConstructorIndex
    }), isUploadOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Upload.default, {
      onClose: toggleUpload
    }), isHashOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Add.default, {
      onClose: toggleHash
    }), isAddOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Add2.default, {
      onClose: toggleAdd
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Contracts).withConfig({
  displayName: "Contracts",
  componentId: "sc-eas8h7-0"
})([".ui--Table td > article{background:transparent;border:none;margin:0;padding:0;}"]));

exports.default = _default;