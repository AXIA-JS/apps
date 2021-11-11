// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
// Something is seriously going wrong here...

/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-call */
import CodeFlask from 'codeflask';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";

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
  const [editorId] = useState(() => `flask-${Date.now()}`);
  const editorRef = useRef(null);
  useEffect(() => {
    const editor = new CodeFlask(`#${editorId}`, {
      language: 'js',
      lineNumbers: true
    });
    editor.updateCode(code);
    editor.editorRoot.addEventListener('keydown', () => {
      editor.onUpdate(onEdit);
    });
    editorRef.current = editor; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    editorRef.current && editorRef.current.updateCode(code);
  }, [code]);
  return /*#__PURE__*/_jsx("div", {
    className: `ui-Editor ${className}${isValid === false ? ' invalid' : ''}`,
    id: editorId
  });
}

export default /*#__PURE__*/React.memo(styled(Editor).withConfig({
  displayName: "Editor",
  componentId: "sc-h3oepg-0"
})([".codeflask{border:1px solid var(--border-input);background:transparent;}&.invalid{.codeflask{background-color:#fff6f6;border-color:#e0b4b4;}}"]));