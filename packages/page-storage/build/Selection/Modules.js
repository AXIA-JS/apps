// Copyright 2017-2021 @axia-js/app-storage authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useState } from 'react';
import { Button, InputStorage } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import Params from '@axia-js/react-params';
import { getTypeDef } from '@axia-js/types';
import { getSiName } from '@axia-js/types/metadata/util';
import { TypeDefInfo } from '@axia-js/types/types';
import { isNull, isUndefined } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function areParamsValid({
  creator: {
    meta: {
      type
    }
  }
}, values) {
  return values.reduce((isValid, value) => isValid && !isUndefined(value) && !isUndefined(value.value) && value.isValid, values.length === (type.isPlain ? 0 : type.asMap.hashers.length));
}

function expandParams(registry, st, isIterable) {
  let types = [];

  if (st.isMap) {
    const {
      hashers,
      key
    } = st.asMap;
    types = hashers.length === 1 ? [getSiName(registry.lookup, key)] : registry.lookup.getSiType(key).def.asTuple.map(k => getSiName(registry.lookup, k));
  }

  return types.map((str, index) => {
    let type;

    if (isIterable && index === types.length - 1) {
      type = getTypeDef(`Option<${str}>`);
      type.withOptionActive = true;
    } else {
      type = getTypeDef(str);
    }

    return {
      type
    };
  });
}

function checkIterable(registry, type) {
  // in the case of Option<type> keys, we don't allow map iteration, in this case
  // we would have option for the iterable and then option for the key value
  if (type.isPlain) {
    return true;
  }

  const {
    hashers,
    key
  } = type.asMap;

  if (hashers.length === 1) {
    return registry.lookup.getTypeDef(key).info !== TypeDefInfo.Option;
  }

  const keys = registry.lookup.getSiType(key).def.asTuple;
  return registry.lookup.getTypeDef(keys[keys.length - 1]).info !== TypeDefInfo.Option;
}

function expandKey(api, key) {
  const {
    creator: {
      meta: {
        type
      },
      section
    }
  } = key;
  const isIterable = checkIterable(api.registry, type);
  return {
    defaultValues: section === 'session' && type.isMap && api.consts.session && api.consts.session.dedupKeyPrefix ? [{
      isValid: true,
      value: api.consts.session.dedupKeyPrefix.toHex()
    }] : null,
    isIterable,
    key,
    params: expandParams(api.registry, type, isIterable)
  };
}

function Modules({
  onAdd
}) {
  var _api$query$timestamp, _api$query$timestamp2;

  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [{
    defaultValues,
    isIterable,
    key,
    params
  }, setKey] = useState({
    defaultValues: undefined,
    isIterable: false,
    key: ((_api$query$timestamp = api.query.timestamp) === null || _api$query$timestamp === void 0 ? void 0 : _api$query$timestamp.now) || api.query.system.events,
    params: []
  });
  const [{
    isValid,
    values
  }, setValues] = useState({
    isValid: true,
    values: []
  });

  const _onAdd = useCallback(() => {
    isValid && onAdd({
      isConst: false,
      key,
      params: values.filter(({
        value
      }, index) => !isIterable || index !== values.length - 1 || !isNull(value))
    });
  }, [isIterable, isValid, key, onAdd, values]);

  const _onChangeValues = useCallback(values => setValues({
    isValid: areParamsValid(key, values),
    values
  }), [key]);

  const _onChangeKey = useCallback(key => {
    setKey(expandKey(api, key));

    _onChangeValues([]);
  }, [_onChangeValues, api]);

  const {
    creator: {
      meta,
      method,
      section
    }
  } = key;
  return /*#__PURE__*/_jsxs("section", {
    className: "storage--actionrow",
    children: [/*#__PURE__*/_jsxs("div", {
      className: "storage--actionrow-value",
      children: [/*#__PURE__*/_jsx(InputStorage, {
        defaultValue: ((_api$query$timestamp2 = api.query.timestamp) === null || _api$query$timestamp2 === void 0 ? void 0 : _api$query$timestamp2.now) || api.query.system.events,
        help: meta === null || meta === void 0 ? void 0 : meta.docs.join(' '),
        label: t('selected state query'),
        onChange: _onChangeKey
      }), /*#__PURE__*/_jsx(Params, {
        onChange: _onChangeValues,
        onEnter: _onAdd,
        params: params,
        values: defaultValues
      }, `${section}.${method}:params`
      /* force re-render on change */
      )]
    }), /*#__PURE__*/_jsx("div", {
      className: "storage--actionrow-buttons",
      children: /*#__PURE__*/_jsx(Button, {
        icon: "plus",
        isDisabled: !isValid,
        onClick: _onAdd
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(Modules);