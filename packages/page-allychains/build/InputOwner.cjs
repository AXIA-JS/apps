"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
function InputOwner(_ref) {
  let {
    noCodeCheck,
    onChange,
    ownedIds
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const [accountId, setAccountId] = (0, _react.useState)(null);
  const [paraId, setParaId] = (0, _react.useState)(0);
  (0, _react.useEffect)(() => {
    onChange(accountId && paraId ? {
      accountId,
      paraId
    } : {
      accountId: null,
      paraId: 0
    });
  }, [accountId, onChange, ownedIds, paraId]);
  const owners = (0, _react.useMemo)(() => ownedIds.map(_ref2 => {
    let {
      manager
    } = _ref2;
    return manager;
  }), [ownedIds]);
  const optIds = (0, _react.useMemo)(() => ownedIds.filter(_ref3 => {
    let {
      manager
    } = _ref3;
    return manager === accountId;
  }).map(_ref4 => {
    let {
      paraId
    } = _ref4;
    return {
      text: paraId.toString(),
      value: paraId.toNumber()
    };
  }), [accountId, ownedIds]);

  const _setParaId = (0, _react.useCallback)(id => setParaId(noCodeCheck || ownedIds.some(_ref5 => {
    let {
      hasCode,
      paraId
    } = _ref5;
    return paraId.eq(id) && hasCode;
  }) ? id : 0), [noCodeCheck, ownedIds]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
    hint: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        children: t('This account that has been used to register the allychain. This will pay all associated fees.')
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        children: t('The allychain id is associated with the selected account via parathread registration.')
      })]
    }),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
      filter: owners,
      label: t('allychain owner'),
      onChange: setAccountId,
      type: "account",
      value: accountId
    }), accountId && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Dropdown, {
      defaultValue: optIds[0].value,
      label: t('allychain id'),
      onChange: _setParaId,
      options: optIds
    }, accountId), !noCodeCheck && !paraId && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkError, {
      content: t('Before using this registered paraId, you need to have a WASM validation function registered on-chain')
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(InputOwner);

exports.default = _default;