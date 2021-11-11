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

var _uiKeyring = require("@axia-js/ui-keyring");

var _util = require("@axia-js/util");

var _Messages = _interopRequireDefault(require("../shared/Messages.cjs"));

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
function transformInfo(optInfo) {
  return optInfo.unwrapOr(null);
}

function Contract({
  className,
  contract,
  index,
  links,
  onCall
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const info = (0, _reactHooks.useCall)(api.query.contracts.contractInfoOf, [contract.address], {
    transform: transformInfo
  });
  const [isForgetOpen, toggleIsForgetOpen] = (0, _reactHooks.useToggle)();

  const _onCall = (0, _react.useCallback)((messageIndex, resultCb) => onCall(index, messageIndex, resultCb), [index, onCall]);

  const _onForget = (0, _react.useCallback)(() => {
    const status = {
      account: contract.address,
      action: 'forget'
    };

    try {
      _uiKeyring.keyring.forgetContract(contract.address.toString());

      status.status = 'success';
      status.message = t('address forgotten');
    } catch (error) {
      status.status = 'error';
      status.message = error.message;
    }

    toggleIsForgetOpen();
  }, [contract.address, t, toggleIsForgetOpen]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("td", {
      className: "address top",
      children: [isForgetOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Forget, {
        address: contract.address.toString(),
        mode: "contract",
        onClose: toggleIsForgetOpen,
        onForget: _onForget
      }, 'modal-forget-contract'), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressMini, {
        value: contract.address
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "all top",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Messages.default, {
        contract: contract,
        contractAbi: contract.abi,
        isWatching: true,
        onSelect: _onCall,
        withMessages: true
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "top",
      children: links === null || links === void 0 ? void 0 : links.map(({
        blockHash,
        blockNumber
      }, index) => /*#__PURE__*/(0, _jsxRuntime.jsxs)("a", {
        href: `#/explorer/query/${blockHash}`,
        children: ["#", blockNumber]
      }, `${index}-${blockNumber}`))
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressInfo, {
        address: contract.address,
        withBalance: true,
        withBalanceToggle: true,
        withExtended: false
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "start together",
      children: !(0, _util.isUndefined)(info) && (info ? info.type : t('Not on-chain'))
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "button",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "trash",
        onClick: toggleIsForgetOpen
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Contract).withConfig({
  displayName: "Contract",
  componentId: "sc-na0t7z-0"
})(["td.top a+a{margin-left:0.75rem;}"]));

exports.default = _default;