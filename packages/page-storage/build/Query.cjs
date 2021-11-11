"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _hoc = require("@axia-js/react-api/hoc");

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _valueToText = _interopRequireDefault(require("@axia-js/react-params/valueToText"));

var _util = require("@axia-js/types/metadata/util");

var _StorageKey = require("@axia-js/types/primitive/StorageKey");

var _util2 = require("@axia-js/util");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-storage authors & contributors
// SPDX-License-Identifier: Apache-2.0
const cache = [];

function keyToName(isConst, _key) {
  if (isConst) {
    const key = _key;
    return `const ${key.section}.${key.method}`;
  }

  const key = _key;

  if ((0, _util2.isU8a)(key)) {
    const [, u8a] = (0, _util2.compactStripLength)(key); // If the string starts with `:`, handle it as a pure string

    return u8a[0] === 0x3a ? (0, _util2.u8aToString)(u8a) : (0, _util2.u8aToHex)(u8a);
  }

  return `${key.creator.section}.${key.creator.method}`;
}

function typeToString(registry, {
  creator: {
    meta: {
      modifier,
      type
    }
  }
}) {
  const _type = (0, _StorageKey.unwrapStorageType)(registry, type);

  return modifier.isOptional ? `Option<${_type}>` : _type;
}

function createComponent(type, Component, defaultProps, renderHelper) {
  return {
    Component,
    // In order to modify the parameters which are used to render the default component, we can use this method
    refresh: contentShorten => renderHelper(value => /*#__PURE__*/(0, _jsxRuntime.jsx)("pre", {
      children: (0, _valueToText.default)(type, value, contentShorten)
    }), defaultProps),
    // In order to replace the default component during runtime we can provide a RenderFn to create a new 'plugged' component
    render: createComponent => renderHelper(createComponent, defaultProps)
  };
}

function getCachedComponent(registry, query) {
  const {
    id,
    isConst,
    key,
    params = []
  } = query;

  if (!cache[id]) {
    let renderHelper;
    let type;

    if (isConst) {
      const {
        meta,
        method,
        section
      } = key;
      renderHelper = (0, _hoc.withCallDiv)(`consts.${section}.${method}`, {
        withIndicator: true
      });
      type = (0, _util.getSiName)(registry.lookup, meta.type);
    } else {
      if ((0, _util2.isU8a)(key)) {
        // subscribe to the raw key here
        renderHelper = (0, _hoc.withCallDiv)('rpc.state.subscribeStorage', {
          paramName: 'params',
          paramValid: true,
          params: [[key]],
          transform: ([data]) => data,
          withIndicator: true
        });
      } else {
        const values = params.map(({
          value
        }) => value);
        const {
          creator: {
            meta: {
              type
            }
          }
        } = key;
        const allCount = type.isPlain ? 0 : type.asMap.hashers.length;
        renderHelper = (0, _hoc.withCallDiv)('subscribe', {
          paramName: 'params',
          paramValid: true,
          params: values.length === allCount ? [key, ...values] : [key.entries, ...values],
          withIndicator: true
        });
      }

      type = key.creator && key.creator.meta ? typeToString(registry, key) : 'Raw';
    }

    const defaultProps = {
      className: 'ui--output'
    };
    const Component = renderHelper( // By default we render a simple div node component with the query results in it
    value => /*#__PURE__*/(0, _jsxRuntime.jsx)("pre", {
      children: (0, _valueToText.default)(type, value, true)
    }), defaultProps);
    cache[query.id] = createComponent(type, Component, defaultProps, renderHelper);
  }

  return cache[id];
}

function Query({
  className = '',
  onRemove,
  value
}) {
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [{
    Component
  }, callName, callType] = (0, _react.useMemo)(() => [getCachedComponent(api.registry, value), keyToName(value.isConst, value.key), value.isConst ? value.key.meta.type.toString() : (0, _util2.isU8a)(value.key) ? 'Raw' : typeToString(api.registry, value.key)], [api, value]);

  const _onRemove = (0, _react.useCallback)(() => {
    delete cache[value.id];
    onRemove(value.id);
  }, [onRemove, value]);

  if (!Component) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `storage--Query storage--actionrow ${className}`,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "storage--actionrow-value",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Labelled, {
        label: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "storage--actionrow-label",
          children: [callName, ": ", callType]
        }),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(Component, {})
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "storage--actionrow-buttons",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "times",
        onClick: _onRemove
      }, 'close')
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Query).withConfig({
  displayName: "Query",
  componentId: "sc-11ntvd6-0"
})(["margin-bottom:0.25em;label{text-transform:none !important;}.ui.disabled.dropdown.selection{color:#aaa;opacity:1;}.ui--IdentityIcon{margin:-10px 0;vertical-align:middle;}pre{margin:0;.ui--Param-text{overflow:hidden;text-overflow:ellipsis;}}.storage--actionrow-buttons{margin-top:-0.25rem;}"]));

exports.default = _default;