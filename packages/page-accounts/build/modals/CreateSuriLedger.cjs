"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _networks = require("@axia-js/networks");

var _reactComponents = require("@axia-js/react-components");

var _translate = require("../translate.cjs");

var _Ledger = require("./Ledger.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
const ledgerNets = _networks.selectableNetworks.filter(_ref => {
  let {
    hasLedgerSupport
  } = _ref;
  return hasLedgerSupport;
});

function CreateSuriLedger(_ref2) {
  let {
    className,
    onChange,
    seedType
  } = _ref2;
  const {
    t
  } = (0, _translate.useTranslation)();
  const [accIndex, setAccIndex] = (0, _react.useState)(0);
  const [addIndex, setAddIndex] = (0, _react.useState)(0);
  const [chainType, setChainType] = (0, _react.useState)('axia');
  const netOpts = (0, _react.useRef)(ledgerNets.map(_ref3 => {
    let {
      displayName,
      network
    } = _ref3;
    return {
      text: displayName,
      value: network
    };
  }));
  const accOps = (0, _react.useRef)(_Ledger.AVAIL_INDEXES.map(value => ({
    text: t('Account type {{index}}', {
      replace: {
        index: value
      }
    }),
    value
  })));
  const addOps = (0, _react.useRef)(_Ledger.AVAIL_INDEXES.map(value => ({
    text: t('Address index {{index}}', {
      replace: {
        index: value
      }
    }),
    value
  })));
  (0, _react.useEffect)(() => {
    const network = ledgerNets.find(_ref4 => {
      let {
        network
      } = _ref4;
      return network === chainType;
    });
    onChange(`m/44'/${network === null || network === void 0 ? void 0 : network.slip44}'/${accIndex}'/0'/${addIndex}'`);
  }, [accIndex, addIndex, chainType, onChange]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
    className: className,
    hint: t('The derivation will be constructed from the values you specify.'),
    children: seedType === 'bip' ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Dropdown, {
        help: t('The network to derive on'),
        label: t('Ledger app type (originated from)'),
        onChange: setChainType,
        options: netOpts.current,
        value: chainType
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Dropdown, {
        help: t('The account type (derivation) to use'),
        label: t('account type'),
        onChange: setAccIndex,
        options: accOps.current,
        value: accIndex
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Dropdown, {
        help: t('The address index (derivation on account) to use'),
        label: t('address index'),
        onChange: setAddIndex,
        options: addOps.current,
        value: addIndex
      })]
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkError, {
      content: t('Derivation for Ledger-type accounts are only available on mnemonic seeds.')
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo(CreateSuriLedger);

exports.default = _default;