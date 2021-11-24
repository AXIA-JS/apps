"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _reactParams = _interopRequireDefault(require("@axia-js/react-params"));

var _types = require("@axia-js/types");

var _util = require("@axia-js/types/metadata/util");

var _types2 = require("@axia-js/types/types");

var _util2 = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-storage authors & contributors
// SPDX-License-Identifier: Apache-2.0
function areParamsValid(_ref, values) {
  let {
    creator: {
      meta: {
        type
      }
    }
  } = _ref;
  return values.reduce((isValid, value) => isValid && !(0, _util2.isUndefined)(value) && !(0, _util2.isUndefined)(value.value) && value.isValid, values.length === (type.isPlain ? 0 : type.asMap.hashers.length));
}

function expandParams(registry, st, isIterable) {
  let types = [];

  if (st.isMap) {
    const {
      hashers,
      key
    } = st.asMap;
    types = hashers.length === 1 ? [(0, _util.getSiName)(registry.lookup, key)] : registry.lookup.getSiType(key).def.asTuple.map(k => (0, _util.getSiName)(registry.lookup, k));
  }

  return types.map((str, index) => {
    let type;

    if (isIterable && index === types.length - 1) {
      type = (0, _types.getTypeDef)(`Option<${str}>`);
      type.withOptionActive = true;
    } else {
      type = (0, _types.getTypeDef)(str);
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
    return registry.lookup.getTypeDef(key).info !== _types2.TypeDefInfo.Option;
  }

  const keys = registry.lookup.getSiType(key).def.asTuple;
  return registry.lookup.getTypeDef(keys[keys.length - 1]).info !== _types2.TypeDefInfo.Option;
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

function Modules(_ref2) {
  var _api$query$timestamp, _api$query$timestamp2;

  let {
    onAdd
  } = _ref2;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [{
    defaultValues,
    isIterable,
    key,
    params
  }, setKey] = (0, _react.useState)({
    defaultValues: undefined,
    isIterable: false,
    key: ((_api$query$timestamp = api.query.timestamp) === null || _api$query$timestamp === void 0 ? void 0 : _api$query$timestamp.now) || api.query.system.events,
    params: []
  });
  const [{
    isValid,
    values
  }, setValues] = (0, _react.useState)({
    isValid: true,
    values: []
  });

  const _onAdd = (0, _react.useCallback)(() => {
    isValid && onAdd({
      isConst: false,
      key,
      params: values.filter((_ref3, index) => {
        let {
          value
        } = _ref3;
        return !isIterable || index !== values.length - 1 || !(0, _util2.isNull)(value);
      })
    });
  }, [isIterable, isValid, key, onAdd, values]);

  const _onChangeValues = (0, _react.useCallback)(values => setValues({
    isValid: areParamsValid(key, values),
    values
  }), [key]);

  const _onChangeKey = (0, _react.useCallback)(key => {
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
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
    className: "storage--actionrow",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "storage--actionrow-value",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputStorage, {
        defaultValue: ((_api$query$timestamp2 = api.query.timestamp) === null || _api$query$timestamp2 === void 0 ? void 0 : _api$query$timestamp2.now) || api.query.system.events,
        help: meta === null || meta === void 0 ? void 0 : meta.docs.join(' '),
        label: t('selected state query'),
        onChange: _onChangeKey
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactParams.default, {
        onChange: _onChangeValues,
        onEnter: _onAdd,
        params: params,
        values: defaultValues
      }, `${section}.${method}:params`
      /* force re-render on change */
      )]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "storage--actionrow-buttons",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "plus",
        isDisabled: !isValid,
        onClick: _onAdd
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Modules);

exports.default = _default;