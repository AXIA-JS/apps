"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _Row = _interopRequireDefault(require("@axia-js/react-components/Row"));

var _store = _interopRequireDefault(require("../store.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
const DEFAULT_HASH = '0x';
const DEFAULT_NAME = '<unknown>';

function CodeRow(_ref) {
  let {
    buttons,
    children,
    className,
    code: {
      json
    },
    isInline,
    withTags
  } = _ref;
  const [name, setName] = (0, _react.useState)(json.name || DEFAULT_NAME);
  const [tags, setTags] = (0, _react.useState)(json.tags || []);
  const [codeHash, setCodeHash] = (0, _react.useState)(json.codeHash || DEFAULT_HASH);
  (0, _react.useEffect)(() => {
    setName(json.name || DEFAULT_NAME);
    setTags(json.tags || []);
    setCodeHash(json.codeHash || DEFAULT_HASH);
  }, [json]);

  const _onSaveName = (0, _react.useCallback)(() => {
    const trimmedName = name.trim();

    if (trimmedName && codeHash) {
      _store.default.saveCode(codeHash, {
        name
      });
    }
  }, [codeHash, name]);

  const _onSaveTags = (0, _react.useCallback)(() => {
    codeHash && _store.default.saveCode(codeHash, {
      tags
    });
  }, [codeHash, tags]);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Row.default, {
    buttons: buttons,
    className: className,
    icon: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "ui--CodeRow-icon",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Icon, {
        icon: "code"
      })
    }),
    isInline: isInline,
    name: name,
    onChangeName: setName,
    onChangeTags: setTags,
    onSaveName: _onSaveName,
    onSaveTags: _onSaveTags,
    tags: withTags && tags,
    children: children
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(CodeRow).withConfig({
  displayName: "CodeRow",
  componentId: "sc-16okq39-0"
})([".ui--CodeRow-icon{margin-right:-0.5em;background:#eee;border-radius:50%;color:#666;width:26px;height:26px;display:flex;justify-content:center;align-items:center;}"]));

exports.default = _default;