"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _reactQuery = require("@axia-js/react-query");

var _util = require("@axia-js/util");

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const DEFAULT_INFO = {
  extrinsic: null,
  extrinsicCall: null,
  extrinsicError: null,
  extrinsicFn: null,
  extrinsicHash: null,
  extrinsicHex: null
};

function Decoder({
  className
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [{
    extrinsic,
    extrinsicCall,
    extrinsicError,
    extrinsicFn,
    extrinsicHash
  }, setExtrinsicInfo] = (0, _react.useState)(DEFAULT_INFO);
  const [accountId, setAccountId] = (0, _react.useState)(null);

  const _setExtrinsicHex = (0, _react.useCallback)(extrinsicHex => {
    try {
      (0, _util.assert)((0, _util.isHex)(extrinsicHex), 'Expected a hex-encoded call');
      let extrinsicCall;

      try {
        // cater for an extrinsic input...
        extrinsicCall = api.createType('Call', api.tx(extrinsicHex).method);
      } catch (e) {
        extrinsicCall = api.createType('Call', extrinsicHex);
      }

      const extrinsicHash = extrinsicCall.hash.toHex();
      const {
        method,
        section
      } = api.registry.findMetaCall(extrinsicCall.callIndex);
      const extrinsicFn = api.tx[section][method];
      const extrinsic = extrinsicFn(...extrinsicCall.args);
      setExtrinsicInfo(_objectSpread(_objectSpread({}, DEFAULT_INFO), {}, {
        extrinsic,
        extrinsicCall,
        extrinsicFn,
        extrinsicHash,
        extrinsicHex
      }));
    } catch (e) {
      setExtrinsicInfo(_objectSpread(_objectSpread({}, DEFAULT_INFO), {}, {
        extrinsicError: e.message
      }));
    }
  }, [api]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
      isError: !extrinsicFn,
      label: t('hex-encoded call'),
      onChange: _setExtrinsicHex,
      placeholder: t('0x...')
    }), extrinsicError && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkError, {
      content: extrinsicError
    }), extrinsicFn && extrinsicCall && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputExtrinsic, {
        defaultValue: extrinsicFn,
        isDisabled: true,
        label: t('decoded call')
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Call, {
        className: "details",
        value: extrinsicCall
      })]
    }), extrinsicHash && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Output, {
      isDisabled: true,
      label: "encoded call hash",
      value: extrinsicHash,
      withCopy: true
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
      label: t('using the selected account'),
      labelExtra: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.BalanceFree, {
        label: /*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
          children: t('free balance')
        }),
        params: accountId
      }),
      onChange: setAccountId,
      type: "account"
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Button.Group, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
        extrinsic: extrinsic,
        icon: "sign-in-alt",
        isUnsigned: true,
        label: t('Submit Unsigned'),
        withSpinner: true
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
        accountId: accountId,
        extrinsic: extrinsic,
        icon: "sign-in-alt",
        label: t('Submit Transaction')
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Decoder);

exports.default = _default;