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

var _util = require("@axia-js/util");

var _translate = require("./translate.cjs");

var _TxSigned = _interopRequireDefault(require("./TxSigned.cjs"));

var _TxUnsigned = _interopRequireDefault(require("./TxUnsigned.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-signer authors & contributors
// SPDX-License-Identifier: Apache-2.0
const NOOP = () => undefined;

const AVAIL_STATUS = ['queued', 'qr', 'signing'];

async function submitRpc(api, _ref, values) {
  let {
    method,
    section
  } = _ref;

  try {
    const rpc = api.rpc;
    (0, _util.assert)((0, _util.isFunction)(rpc[section] && rpc[section][method]), `api.rpc.${section}.${method} does not exist`);
    const result = await rpc[section][method](...values);
    console.log('submitRpc: result ::', (0, _util.loggerFormat)(result));
    return {
      result,
      status: 'sent'
    };
  } catch (error) {
    console.error(error);
    return {
      error: error,
      status: 'error'
    };
  }
}

async function sendRpc(api, queueSetTxStatus, _ref2) {
  let {
    id,
    rpc,
    values = []
  } = _ref2;

  if (rpc) {
    queueSetTxStatus(id, 'sending'); // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

    const {
      error,
      result,
      status
    } = await submitRpc(api, rpc, values);
    queueSetTxStatus(id, status, result, error);
  }
}

function extractCurrent(txqueue) {
  const available = txqueue.filter(_ref3 => {
    let {
      status
    } = _ref3;
    return AVAIL_STATUS.includes(status);
  });
  const currentItem = available[0] || null;
  let isRpc = false;
  let isVisible = false;

  if (currentItem) {
    if (currentItem.status === 'queued' && !(currentItem.extrinsic || currentItem.payload)) {
      isRpc = true;
    } else if (currentItem.status !== 'signing') {
      isVisible = true;
    }
  }

  return {
    count: available.length,
    currentItem,
    isRpc,
    isVisible,
    requestAddress: currentItem && currentItem.accountId || null
  };
}

function Signer(_ref4) {
  let {
    children,
    className = ''
  } = _ref4;
  const {
    api
  } = (0, _reactHooks.useApi)();
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    queueSetTxStatus,
    txqueue
  } = (0, _react.useContext)(_reactComponents.StatusContext);
  const {
    count,
    currentItem,
    isRpc,
    isVisible,
    requestAddress
  } = (0, _react.useMemo)(() => extractCurrent(txqueue), [txqueue]);
  (0, _react.useEffect)(() => {
    isRpc && currentItem && sendRpc(api, queueSetTxStatus, currentItem).catch(console.error);
  }, [api, isRpc, currentItem, queueSetTxStatus]);

  const _onCancel = (0, _react.useCallback)(() => {
    if (currentItem) {
      const {
        id,
        signerCb = NOOP,
        txFailedCb = NOOP
      } = currentItem;
      queueSetTxStatus(id, 'cancelled');
      signerCb(id, null);
      txFailedCb(null);
    }
  }, [currentItem, queueSetTxStatus]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [children, currentItem && isVisible && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal, {
      className: className,
      header: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [t('Authorize transaction'), count === 1 ? undefined : /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: ["\xA01/", count]
        })]
      }),
      onClose: _onCancel,
      size: "large",
      children: currentItem.isUnsigned ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_TxUnsigned.default, {
        currentItem: currentItem
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_TxSigned.default, {
        currentItem: currentItem,
        requestAddress: requestAddress
      })
    }, currentItem.id)]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Signer).withConfig({
  displayName: "src",
  componentId: "sc-183e5vf-0"
})([".signToggle{bottom:1.5rem;left:1.5rem;position:absolute;}"]));

exports.default = _default;