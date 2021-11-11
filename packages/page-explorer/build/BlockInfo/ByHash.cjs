"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _Events = _interopRequireDefault(require("../Events.cjs"));

var _translate = require("../translate.cjs");

var _Extrinsics = _interopRequireDefault(require("./Extrinsics.cjs"));

var _Justifications = _interopRequireDefault(require("./Justifications.cjs"));

var _Logs = _interopRequireDefault(require("./Logs.cjs"));

var _Summary = _interopRequireDefault(require("./Summary.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0
const EMPTY_HEADER = [['...', 'start', 6]];

function transformResult([events, getBlock, getHeader]) {
  return [events.map((record, index) => ({
    indexes: [index],
    key: `${Date.now()}-${index}-${record.hash.toHex()}`,
    record
  })), getBlock, getHeader];
}

function BlockByHash({
  className = '',
  error,
  value
}) {
  var _api$consts$system$bl;

  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const mountedRef = (0, _reactHooks.useIsMountedRef)();
  const [[events, getBlock, getHeader], setState] = (0, _react.useState)([]);
  const [myError, setError] = (0, _react.useState)(error);
  (0, _react.useEffect)(() => {
    value && Promise.all([api.query.system.events.at(value), api.rpc.chain.getBlock(value), api.derive.chain.getHeader(value)]).then(result => {
      mountedRef.current && setState(transformResult(result));
    }).catch(error => {
      mountedRef.current && setError(error);
    });
  }, [api, mountedRef, value]);
  const header = (0, _react.useMemo)(() => getHeader ? [[(0, _util.formatNumber)(getHeader.number.unwrap()), 'start', 1], [t('hash'), 'start'], [t('parent'), 'start'], [t('extrinsics'), 'start'], [t('state'), 'start'], [undefined, 'media--1200']] : EMPTY_HEADER, [getHeader, t]);
  const blockNumber = getHeader === null || getHeader === void 0 ? void 0 : getHeader.number.unwrap();
  const parentHash = getHeader === null || getHeader === void 0 ? void 0 : getHeader.parentHash.toHex();
  const hasParent = !(getHeader !== null && getHeader !== void 0 && getHeader.parentHash.isEmpty);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Summary.default, {
      events: events,
      maxBlockWeight: (_api$consts$system$bl = api.consts.system.blockWeights) === null || _api$consts$system$bl === void 0 ? void 0 : _api$consts$system$bl.maxBlock,
      signedBlock: getBlock
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Table, {
      header: header,
      isFixed: true,
      children: myError ? /*#__PURE__*/(0, _jsxRuntime.jsx)("tr", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
          colSpan: 6,
          children: t('Unable to retrieve the specified block details. {{error}}', {
            replace: {
              error: myError.message
            }
          })
        })
      }) : getBlock && getHeader && !getBlock.isEmpty && !getHeader.isEmpty && /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
          className: "address",
          children: getHeader.author && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressSmall, {
            value: getHeader.author
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
          className: "hash overflow",
          children: getHeader.hash.toHex()
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
          className: "hash overflow",
          children: hasParent ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Link, {
            to: `/explorer/query/${parentHash || ''}`,
            children: parentHash
          }) : parentHash
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
          className: "hash overflow",
          children: getHeader.extrinsicsRoot.toHex()
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
          className: "hash overflow",
          children: getHeader.stateRoot.toHex()
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
          className: "media--1200",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.LinkExternal, {
            data: value,
            type: "block"
          })
        })]
      })
    }), getBlock && getHeader && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Extrinsics.default, {
        blockNumber: blockNumber,
        events: events,
        value: getBlock.block.extrinsics
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Columar, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Columar.Column, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Events.default, {
            eventClassName: "explorer--BlockByHash-block",
            events: events === null || events === void 0 ? void 0 : events.filter(({
              record: {
                phase
              }
            }) => !phase.isApplyExtrinsic),
            label: t('system events')
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Columar.Column, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Logs.default, {
            value: getHeader.digest.logs
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Justifications.default, {
            value: getBlock.justifications
          })]
        })]
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(BlockByHash);

exports.default = _default;