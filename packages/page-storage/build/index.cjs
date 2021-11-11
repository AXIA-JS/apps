"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Queries = _interopRequireDefault(require("./Queries.cjs"));

var _index = _interopRequireDefault(require("./Selection/index.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-storage authors & contributors
// SPDX-License-Identifier: Apache-2.0
function StorageApp({
  basePath,
  className = ''
}) {
  const [queue, setQueue] = (0, _react.useState)([]);

  const _onAdd = (0, _react.useCallback)(query => setQueue(queue => [query, ...queue]), []);

  const _onRemove = (0, _react.useCallback)(id => setQueue(queue => queue.filter(item => item.id !== id)), []);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("main", {
    className: `storage--App ${className}`,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {
      basePath: basePath,
      onAdd: _onAdd
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Queries.default, {
      onRemove: _onRemove,
      value: queue
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(StorageApp).withConfig({
  displayName: "src",
  componentId: "sc-1kpfh4z-0"
})([".storage--actionrow{align-items:flex-start;display:flex;.ui--Button{margin:0.25rem;}&.head{flex:1 1 100%;margin:0 auto;max-width:620px;}}.storage--actionrow-value{flex:1;min-width:0;.ui--output{word-break:break-all;}}.storage--actionrow-buttons{flex:0;padding:0.5rem 0.25rem;}"]));

exports.default = _default;