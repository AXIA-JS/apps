"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0
const JUDGEMENT_ENUM = [{
  text: 'Unknown',
  value: 0
}, {
  text: 'Fee paid',
  value: 1
}, {
  text: 'Reasonable',
  value: 2
}, {
  text: 'Known good',
  value: 3
}, {
  text: 'Out of date',
  value: 4
}, {
  text: 'Low quality',
  value: 5
}];

function RegistrarJudgement(_ref) {
  let {
    address,
    registrars,
    toggleJudgement
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [addresses] = (0, _react.useState)(() => registrars.map(_ref2 => {
    let {
      address
    } = _ref2;
    return address;
  }));
  const [judgementAccountId, setJudgementAccountId] = (0, _react.useState)(null);
  const [judgementEnum, setJudgementEnum] = (0, _react.useState)(2); // Reasonable

  const [registrarIndex, setRegistrarIndex] = (0, _react.useState)(-1); // find the id of our registrar in the list

  (0, _react.useEffect)(() => {
    const registrar = registrars.find(_ref3 => {
      let {
        address
      } = _ref3;
      return judgementAccountId === address;
    });
    setRegistrarIndex(registrar ? registrar.index : -1);
  }, [judgementAccountId, registrars]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
    header: t('Provide judgement'),
    onClose: toggleJudgement,
    size: "small",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
        filter: addresses,
        label: t('registrar account'),
        onChange: setJudgementAccountId,
        type: "account"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
        isDisabled: true,
        label: t('registrar index'),
        value: registrarIndex === -1 ? t('invalid/unknown registrar account') : registrarIndex.toString()
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Dropdown, {
        label: t('judgement'),
        onChange: setJudgementEnum,
        options: JUDGEMENT_ENUM,
        value: judgementEnum
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
        accountId: judgementAccountId,
        icon: "check",
        isDisabled: registrarIndex === -1,
        label: t('Judge'),
        onStart: toggleJudgement,
        params: [registrarIndex, address, judgementEnum],
        tx: api.tx.identity.provideJudgement
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(RegistrarJudgement);

exports.default = _default;