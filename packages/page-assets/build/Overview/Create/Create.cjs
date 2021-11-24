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

var _Info = _interopRequireDefault(require("./Info.cjs"));

var _Team = _interopRequireDefault(require("./Team.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-assets authors & contributors
// SPDX-License-Identifier: Apache-2.0
const BATCH_OPTIONS = {
  isBatchAll: true
};

function Create(_ref) {
  let {
    assetIds,
    className,
    onClose,
    openId
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [step, nextStep, prevStep] = (0, _reactHooks.useStepper)();
  const [asset, setAsset] = (0, _react.useState)(null);
  const [team, setTeam] = (0, _react.useState)(null);
  const [createTx, metadataTx] = (0, _react.useMemo)(() => asset ? [api.tx.assets.create(asset.assetId, asset.accountId, asset.minBalance), api.tx.assets.setMetadata(asset.assetId, asset.assetName, asset.assetSymbol, asset.assetDecimals)] : [null, null], [api, asset]);
  const teamTx = (0, _react.useMemo)(() => asset && team && (team.adminId !== asset.accountId || team.freezerId !== asset.accountId || team.issuerId !== asset.accountId) ? api.tx.assets.setTeam(asset.assetId, team.issuerId, team.adminId, team.freezerId) : null, [api, asset, team]);
  const txs = (0, _react.useMemo)(() => createTx && metadataTx && team && (teamTx ? [createTx, metadataTx, teamTx] : [createTx, metadataTx]), [createTx, metadataTx, team, teamTx]);
  const extrinsic = (0, _reactHooks.useTxBatch)(txs, BATCH_OPTIONS);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
    className: className,
    header: t('create asset {{step}}/{{steps}}', {
      replace: {
        step,
        steps: 2
      }
    }),
    onClose: onClose,
    size: "large",
    children: [step === 1 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Info.default, {
      assetIds: assetIds,
      defaultValue: asset,
      onChange: setAsset,
      openId: openId
    }), step === 2 && asset && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Team.default, {
      accountId: asset.accountId,
      defaultValue: team,
      onChange: setTeam
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Actions, {
      children: [step === 1 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "step-forward",
        isDisabled: !asset,
        label: t('Next'),
        onClick: nextStep
      }), step === 2 && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
          icon: "step-backward",
          label: t('Prev'),
          onClick: prevStep
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
          accountId: asset === null || asset === void 0 ? void 0 : asset.accountId,
          extrinsic: extrinsic,
          icon: "plus",
          label: t('Create'),
          onStart: onClose
        })]
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Create);

exports.default = _default;