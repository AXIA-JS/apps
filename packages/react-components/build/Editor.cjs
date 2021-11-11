"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _codeflask = _interopRequireDefault(require("codeflask"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
// Something is seriously going wrong here...

/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-call */

/**
 * @name Editor
 * @summary A code editor based on the codeflask npm module
 * @description It allows to live-edit code examples and JSON files.
 *
 * @example
 * <BR>
 *
 * ```javascript
 * import {Editor} from '@axia-js/react-components';
 *
 * <Editor
 *    className={string} // optional
 *    code={string}
 *    isValid={boolean}, // optional
 *    onEdit={() => callbackFunction}
 *  />
 * ```
 */
function Editor({
  className = '',
  code,
  isValid,
  onEdit
}) {
  const [editorId] = (0, _react.useState)(() => `flask-${Date.now()}`);
  const editorRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(() => {
    const editor = new _codeflask.default(`#${editorId}`, {
      language: 'js',
      lineNumbers: true
    });
    editor.updateCode(code);
    editor.editorRoot.addEventListener('keydown', () => {
      editor.onUpdate(onEdit);
    });
    editorRef.current = editor; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  (0, _react.useEffect)(() => {
    editorRef.current && editorRef.current.updateCode(code);
  }, [code]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: `ui-Editor ${className}${isValid === false ? ' invalid' : ''}`,
    id: editorId
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Editor).withConfig({
  displayName: "Editor",
  componentId: "sc-h3oepg-0"
})([".codeflask{border:1px solid var(--border-input);background:transparent;}&.invalid{.codeflask{background-color:#fff6f6;border-color:#e0b4b4;}}"]));

exports.default = _default;