"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _translate = require("../../translate.cjs");

var _SenderInfo = _interopRequireDefault(require("../partials/SenderInfo.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
const MAX_KICK = 128;
const accountOpts = {
  withExposure: true
};

function KickNominees({
  className = '',
  controllerId,
  nominating,
  onClose,
  stashId
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [selected, setSelected] = (0, _react.useState)([]);
  const [{
    kickTx
  }, setTx] = (0, _react.useState)({});
  const queryInfo = (0, _reactHooks.useCall)(api.derive.staking.query, [stashId, accountOpts]);
  const nominators = (0, _react.useMemo)(() => {
    var _queryInfo$exposure;

    return queryInfo === null || queryInfo === void 0 ? void 0 : (_queryInfo$exposure = queryInfo.exposure) === null || _queryInfo$exposure === void 0 ? void 0 : _queryInfo$exposure.others.map(({
      who
    }) => who.toString());
  }, [queryInfo]);
  (0, _react.useEffect)(() => {
    try {
      setTx({
        kickTx: selected.length ? api.tx.staking.kick(selected) : null
      });
    } catch {
      setTx({
        kickTx: null
      });
    }
  }, [api, selected]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
    className: className,
    header: t('Remove nominees'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SenderInfo.default, {
        controllerId: controllerId,
        stashId: stashId
      }), nominators ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddressMulti, {
        available: nominators,
        availableLabel: t('existing/active nominators'),
        defaultValue: nominating,
        help: t('Filter available nominators based on name, address or short account index.'),
        maxCount: MAX_KICK,
        onChange: setSelected,
        valueLabel: t('nominators to be removed')
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Spinner, {
        label: t('Retrieving active nominators')
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
        accountId: controllerId,
        extrinsic: kickTx,
        icon: "user-slash",
        isDisabled: !kickTx,
        label: t('Remove'),
        onStart: onClose
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(KickNominees);

exports.default = _default;