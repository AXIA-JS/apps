// Copyright 2017-2021 @axia-js/app-storage authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { withCallDiv } from '@axia-js/react-api/hoc';
import { Button, Labelled } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import valueToText from '@axia-js/react-params/valueToText';
import { getSiName } from '@axia-js/types/metadata/util';
import { unwrapStorageType } from '@axia-js/types/primitive/StorageKey';
import { compactStripLength, isU8a, u8aToHex, u8aToString } from '@axia-js/util';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const cache = [];

function keyToName(isConst, _key) {
  if (isConst) {
    const key = _key;
    return `const ${key.section}.${key.method}`;
  }

  const key = _key;

  if (isU8a(key)) {
    const [, u8a] = compactStripLength(key); // If the string starts with `:`, handle it as a pure string

    return u8a[0] === 0x3a ? u8aToString(u8a) : u8aToHex(u8a);
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
  const _type = unwrapStorageType(registry, type);

  return modifier.isOptional ? `Option<${_type}>` : _type;
}

function createComponent(type, Component, defaultProps, renderHelper) {
  return {
    Component,
    // In order to modify the parameters which are used to render the default component, we can use this method
    refresh: contentShorten => renderHelper(value => /*#__PURE__*/_jsx("pre", {
      children: valueToText(type, value, contentShorten)
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
      renderHelper = withCallDiv(`consts.${section}.${method}`, {
        withIndicator: true
      });
      type = getSiName(registry.lookup, meta.type);
    } else {
      if (isU8a(key)) {
        // subscribe to the raw key here
        renderHelper = withCallDiv('rpc.state.subscribeStorage', {
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
        renderHelper = withCallDiv('subscribe', {
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
    value => /*#__PURE__*/_jsx("pre", {
      children: valueToText(type, value, true)
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
  } = useApi();
  const [{
    Component
  }, callName, callType] = useMemo(() => [getCachedComponent(api.registry, value), keyToName(value.isConst, value.key), value.isConst ? value.key.meta.type.toString() : isU8a(value.key) ? 'Raw' : typeToString(api.registry, value.key)], [api, value]);

  const _onRemove = useCallback(() => {
    delete cache[value.id];
    onRemove(value.id);
  }, [onRemove, value]);

  if (!Component) {
    return null;
  }

  return /*#__PURE__*/_jsxs("div", {
    className: `storage--Query storage--actionrow ${className}`,
    children: [/*#__PURE__*/_jsx("div", {
      className: "storage--actionrow-value",
      children: /*#__PURE__*/_jsx(Labelled, {
        label: /*#__PURE__*/_jsxs("div", {
          className: "storage--actionrow-label",
          children: [callName, ": ", callType]
        }),
        children: /*#__PURE__*/_jsx(Component, {})
      })
    }), /*#__PURE__*/_jsx("div", {
      className: "storage--actionrow-buttons",
      children: /*#__PURE__*/_jsx(Button, {
        icon: "times",
        onClick: _onRemove
      }, 'close')
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Query).withConfig({
  displayName: "Query",
  componentId: "sc-hdpdyv-0"
})(["margin-bottom:0.25em;label{text-transform:none !important;}.ui.disabled.dropdown.selection{color:#aaa;opacity:1;}.ui--IdentityIcon{margin:-10px 0;vertical-align:middle;}pre{margin:0;.ui--Param-text{overflow:hidden;text-overflow:ellipsis;}}.storage--actionrow-buttons{margin-top:-0.25rem;}"]));