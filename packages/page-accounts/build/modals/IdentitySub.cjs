"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
function extractInfo(_ref) {
  let [[ids], opts] = _ref;
  return ids.reduce((result, id, index) => {
    const opt = opts[index];

    if (opt.isSome) {
      const [, data] = opt.unwrap();

      if (data.isRaw) {
        result.push([id, (0, _util.u8aToString)(data.asRaw)]);
      }
    }

    return result;
  }, []);
}

function IdentitySub(_ref2) {
  let {
    address,
    index,
    name,
    setAddress,
    setName,
    t
  } = _ref2;

  const _setAddress = (0, _react.useCallback)(value => setAddress(index, value || ''), [index, setAddress]);

  const _setName = (0, _react.useCallback)(value => setName(index, value || ''), [index, setName]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Columar, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Columar.Column, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
        defaultValue: address,
        label: t('address {{index}}', {
          replace: {
            index: index + 1
          }
        }),
        onChange: _setAddress
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Columar.Column, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
        defaultValue: name,
        isError: !name,
        isFull: true,
        label: t('sub name'),
        onChange: _setName
      })
    })]
  });
}

const IdentitySubMemo = /*#__PURE__*/_react.default.memo(IdentitySub);

const transformInfo = {
  withParams: true
};

function IdentitySubModal(_ref3) {
  let {
    address,
    className,
    onClose
  } = _ref3;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const {
    allAccounts
  } = (0, _reactHooks.useAccounts)();
  const queryIds = (0, _reactHooks.useSubidentities)(address);
  const queryInfos = (0, _reactHooks.useCall)(queryIds && queryIds.length !== 0 && api.query.identity.superOf.multi, [queryIds], transformInfo);
  const [infos, setInfos] = (0, _react.useState)();
  (0, _react.useEffect)(() => {
    if (queryInfos) {
      setInfos(extractInfo(queryInfos));
    } else if (queryIds && !queryIds.length) {
      setInfos([]);
    }
  }, [allAccounts, queryIds, queryInfos]);

  const _rowAdd = (0, _react.useCallback)(() => setInfos(infos => infos && infos.concat([[allAccounts[0], '']])), [allAccounts]);

  const _rowRemove = (0, _react.useCallback)(() => setInfos(infos => infos && infos.slice(0, infos.length - 1)), []);

  const _setAddress = (0, _react.useCallback)((index, address) => setInfos(infos => (infos || []).map((_ref4, i) => {
    let [a, n] = _ref4;
    return [index === i ? address : a, n];
  })), []);

  const _setName = (0, _react.useCallback)((index, name) => setInfos(infos => (infos || []).map((_ref5, i) => {
    let [a, n] = _ref5;
    return [a, index === i ? name : n];
  })), []);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
    className: className,
    header: t('Register sub-identities'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Content, {
      children: !infos ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Spinner, {
        label: t('Retrieving sub-identities')
      }) : /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: [!infos.length ? /*#__PURE__*/(0, _jsxRuntime.jsx)("article", {
          children: t('No sub identities set.')
        }) : infos.map((_ref6, index) => {
          let [address, name] = _ref6;
          return /*#__PURE__*/(0, _jsxRuntime.jsx)(IdentitySubMemo, {
            address: address,
            index: index,
            name: name,
            setAddress: _setAddress,
            setName: _setName,
            t: t
          }, index);
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Button.Group, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
            icon: "plus",
            label: t('Add sub'),
            onClick: _rowAdd
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
            icon: "minus",
            isDisabled: infos.length === 0,
            label: t('Remove sub'),
            onClick: _rowRemove
          })]
        })]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
      children: infos && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
        accountId: address,
        isDisabled: infos.some(_ref7 => {
          let [address, raw] = _ref7;
          return !address || !raw;
        }),
        label: t('Set Subs'),
        onStart: onClose,
        params: [infos.map(_ref8 => {
          let [address, raw] = _ref8;
          return [address, {
            raw
          }];
        })],
        tx: api.tx.identity.setSubs
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(IdentitySubModal);

exports.default = _default;