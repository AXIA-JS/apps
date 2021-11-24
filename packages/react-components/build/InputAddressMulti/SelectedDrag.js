import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import ReactDOM from 'react-dom';
import { PORTAL_ID } from "../../../apps/src/Apps.js";
import AddressToggle from "../AddressToggle.js";
import { jsx as _jsx } from "react/jsx-runtime";
const portal = document.getElementById(PORTAL_ID);

function Selected({
  address,
  index,
  onDeselect
}) {
  return /*#__PURE__*/_jsx(Draggable, {
    draggableId: address,
    index: index,
    children: (provided, snapshot) => {
      const element = /*#__PURE__*/_jsx("div", _objectSpread(_objectSpread(_objectSpread({
        // eslint-disable-next-line @typescript-eslint/unbound-method
        ref: provided.innerRef
      }, provided.draggableProps), provided.dragHandleProps), {}, {
        children: /*#__PURE__*/_jsx(AddressToggle, {
          address: address,
          className: snapshot.isDragging ? 'isDragging' : '',
          noToggle: true,
          onChange: onDeselect
        })
      }));

      return snapshot.isDragging ? /*#__PURE__*/ReactDOM.createPortal(element, portal) : element;
    }
  }, address);
}

export default /*#__PURE__*/React.memo(Selected);