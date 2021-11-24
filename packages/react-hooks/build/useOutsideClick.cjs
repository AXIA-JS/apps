"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useOutsideClick = void 0;

var _react = require("react");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function getClickedElement(refs, e) {
  return refs.find(ref => ref.current && ref.current.contains(e.target));
}

const useOutsideClick = (elements, callback) => {
  const handleClick = (0, _react.useCallback)(e => {
    if (elements.length && !getClickedElement(elements, e)) {
      callback();
    }
  }, [elements, callback]);
  (0, _react.useEffect)(() => {
    document.addEventListener('click', handleClick, true);
    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [handleClick, callback]);
};

exports.useOutsideClick = useOutsideClick;