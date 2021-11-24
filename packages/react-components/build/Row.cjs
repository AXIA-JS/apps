"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactHooks = require("@axia-js/react-hooks");

var _EditButton = _interopRequireDefault(require("./EditButton.cjs"));

var _Input = _interopRequireDefault(require("./Input.cjs"));

var _Tags = _interopRequireDefault(require("./Tags.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
const styles = `
  text-align: left;

  &.isDisabled {
    opacity: 0.6;

    .ui--IdentityIcon  {
      filter: grayscale(100%);
    }
  }

  &.isInline {
    display: flex;

    .ui--Row-accountId {
      white-space: nowrap;
    }
  }

  &.isInvalid {
    .ui--Row-accountId,
    .ui--Row-icon {
      filter: grayscale(100);
      opacity: 0.5;
    }
  }

  .ui--Row-base {
    display: flex;
    min-width: 16rem;
  }

  .ui--Row-buttons {
    position: relative;
    margin-right: -0.5rem;
    margin-top: -0.5rem;
    white-space: nowrap;
    height: 0rem;
    overflow: visible;

    button.ui.button:last-child {
      margin-right: 0;
    }
  }

  .ui--Row-children {
    display: block;
    padding-left: 1rem;
    padding-top: 1rem;
  }

  .ui--Row-details {
    flex: 1;
    margin-right: 1rem;
    padding: 0.25rem 0 0;
    width: 100%;
    min-width: 0;

    .account-label{
      margin: -0.75rem 0 0 0
    }

    * {
      vertical-align: middle;
    }
  }

  .ui--Row-address,
  .ui--Row-accountIndex {
    font-family: monospace;
    font-size: 1.25em;
    padding: 0;
    margin-bottom: 0.25rem;
  }

  .ui--Row-name {
    display: flex;
    box-sizing: border-box;
    height: 1.5rem;
    margin: 0;
    padding: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-transform: uppercase;
    overflow: hidden;
    text-overflow: inherit;
  }

  .ui--Row-icon {
    flex: 0;
    margin-right: 1em;
    position: relative;

    .ui--Row-icon-info {
      left: -0.5rem;
      position: absolute;
      top: -0.5rem;
    }
  }

  .ui--Row-name-input {
    input {
      height: 1em;
      text-transform: uppercase;
      margin-top: -0.3em;
    }
  }

  .ui--Row-tags {
    &.editable {
      display: flex;
      flex-wrap: wrap;
      justify-content: left;

      .addTags {
        border: 1px #00000052 solid;
        border-radius: .5em;
        border-style: dashed;
        color: grey;
        font-size: x-small;
        padding: .1em 0.3em 0.1em 0.3em;
        margin-top: .2em;
      }

      > div.label {
        margin-top:.3em
      }
    }
  }

  .ui--Row-tags-input {
    margin-bottom: -1.4em;
  }
`;
exports.styles = styles;

function Row(_ref) {
  let {
    address,
    buttons,
    children,
    className = '',
    defaultName,
    details,
    icon,
    iconInfo,
    isDisabled,
    isEditableName,
    isEditableTags,
    isInline,
    name,
    onChangeName,
    onChangeTags,
    onSaveName,
    onSaveTags,
    tags
  } = _ref;
  const [isEditingName, toggleIsEditingName] = (0, _reactHooks.useToggle)();
  const [isEditingTags, toggleIsEditingTags] = (0, _reactHooks.useToggle)();

  const _onSaveName = (0, _react.useCallback)(() => {
    onSaveName && onSaveName();
    toggleIsEditingName();
  }, [onSaveName, toggleIsEditingName]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `ui--Row${isDisabled ? ' isDisabled' : ''}${isInline ? ' isInline' : ''} ${className}`,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "ui--Row-base",
      children: [icon && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "ui--Row-icon",
        children: [icon, iconInfo && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "ui--Row-icon-info",
          children: iconInfo
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "ui--Row-details",
        children: [(name || defaultName) && (isEditableName && isEditingName ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_Input.default, {
          autoFocus: true,
          defaultValue: name || defaultName,
          isInPlaceEditor: true,
          onBlur: _onSaveName,
          onChange: onChangeName,
          onEnter: true,
          withLabel: false
        }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "ui--Row-name",
          children: isEditableName ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_EditButton.default, {
            onClick: toggleIsEditingName,
            children: name || defaultName
          }) : name || defaultName
        })), address && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "ui--Row-address",
          children: address
        }), details, tags && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tags.default, {
          className: "ui--Row-tags",
          isEditable: isEditableTags,
          isEditing: isEditingTags,
          onChange: onChangeTags,
          onSave: onSaveTags,
          onToggleIsEditing: toggleIsEditingTags,
          size: "tiny",
          value: tags
        })]
      }), buttons && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "ui--Row-buttons",
        children: buttons
      })]
    }), children && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "ui--Row-children",
      children: children
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Row).withConfig({
  displayName: "Row",
  componentId: "sc-50bp1v-0"
})(["", ""], styles));

exports.default = _default;