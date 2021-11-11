"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactHooks = require("@axia-js/react-hooks");

var _Extrinsics = _interopRequireDefault(require("../BlockInfo/Extrinsics.cjs"));

var _translate = require("../translate.cjs");

var _Peers = _interopRequireDefault(require("./Peers.cjs"));

var _Summary = _interopRequireDefault(require("./Summary.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-nodeinfo authors & contributors
// SPDX-License-Identifier: Apache-2.0
const POLL_TIMEOUT = 9900;

async function retrieveInfo(api) {
  try {
    const [blockNumber, health, peers, extrinsics] = await Promise.all([api.derive.chain.bestNumber(), api.rpc.system.health().catch(() => null), api.rpc.system.peers().catch(() => null), api.rpc.author.pendingExtrinsics().catch(() => null)]);
    return {
      blockNumber,
      extrinsics,
      health,
      peers
    };
  } catch (error) {
    return {};
  }
}

function NodeInfo() {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [info, setInfo] = (0, _react.useState)({});
  const [nextRefresh, setNextRefresh] = (0, _react.useState)(() => Date.now());
  (0, _react.useEffect)(() => {
    const _getStatus = () => {
      retrieveInfo(api).then(setInfo).catch(console.error);
    };

    _getStatus();

    const timerId = window.setInterval(() => {
      setNextRefresh(Date.now() + POLL_TIMEOUT);

      _getStatus();
    }, POLL_TIMEOUT);
    return () => {
      window.clearInterval(timerId);
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Summary.default, {
      info: info,
      nextRefresh: nextRefresh
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Peers.default, {
      peers: info.peers
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Extrinsics.default, {
      blockNumber: info.blockNumber,
      label: t('pending extrinsics'),
      value: info.extrinsics
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(NodeInfo);

exports.default = _default;