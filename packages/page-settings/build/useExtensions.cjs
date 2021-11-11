"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useExtensions;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = require("react");

var _store = _interopRequireDefault(require("store"));

var _reactHooks = require("@axia-js/react-hooks");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

let triggerCount = 0;
const triggers = new Map();

function triggerAll() {
  [...triggers.values()].forEach(trigger => trigger(Date.now()));
} // save the properties for a specific extension


function saveProperties(api, {
  name,
  version
}) {
  const storeKey = `properties:${api.genesisHash.toHex()}`;

  const allProperties = _store.default.get(storeKey, {});

  allProperties[name] = {
    extensionVersion: version,
    ss58Format: api.registry.chainSS58,
    tokenDecimals: api.registry.chainDecimals[0],
    tokenSymbol: api.registry.chainTokens[0]
  };

  _store.default.set(storeKey, allProperties);
} // determines if the extension has current properties


function hasCurrentProperties(api, {
  extension
}) {
  const allProperties = _store.default.get(`properties:${api.genesisHash.toHex()}`, {}); // when we don't have properties yet, assume nothing has changed and store


  if (!allProperties[extension.name]) {
    saveProperties(api, extension);
    return true;
  }

  const {
    ss58Format,
    tokenDecimals,
    tokenSymbol
  } = allProperties[extension.name];
  return ss58Format === api.registry.chainSS58 && tokenDecimals === api.registry.chainDecimals[0] && tokenSymbol === api.registry.chainTokens[0];
} // filter extensions based on the properties we have available


function filterAll(api, all) {
  const extensions = all.map(info => {
    const current = info.known.find(({
      genesisHash
    }) => api.genesisHash.eq(genesisHash)) || null; // if we cannot find it as known, or either the specVersion or properties mismatches, mark it as upgradable

    return !current || api.runtimeVersion.specVersion.gtn(current.specVersion) || !hasCurrentProperties(api, info) ? _objectSpread(_objectSpread({}, info), {}, {
      current
    }) : null;
  }).filter(info => !!info);
  return {
    count: extensions.length,
    extensions
  };
}

async function getExtensionInfo(api, extension) {
  if (!extension.metadata) {
    return null;
  }

  try {
    const metadata = extension.metadata;
    const known = await metadata.get();
    return {
      extension,
      known,
      update: async def => {
        let isOk = false;

        try {
          isOk = await metadata.provide(def);

          if (isOk) {
            saveProperties(api, extension);
            triggerAll();
          }
        } catch (error) {// ignore
        }

        return isOk;
      }
    };
  } catch (error) {
    return null;
  }
} // eslint-disable-next-line @typescript-eslint/no-unused-vars


async function getKnown(api, extensions, _) {
  const all = await Promise.all(extensions.map(extension => getExtensionInfo(api, extension)));
  return all.filter(info => !!info);
}

const EMPTY_STATE = {
  count: 0,
  extensions: []
};

function useExtensions() {
  const {
    api,
    extensions,
    isApiReady,
    isDevelopment
  } = (0, _reactHooks.useApi)();
  const [all, setAll] = (0, _react.useState)();
  const [trigger, setTrigger] = (0, _react.useState)(0);
  (0, _react.useEffect)(() => {
    const myId = `${++triggerCount}-${Date.now()}`;
    triggers.set(myId, setTrigger);
    return () => {
      triggers.delete(myId);
    };
  }, []);
  (0, _react.useEffect)(() => {
    extensions && getKnown(api, extensions, trigger).then(setAll);
  }, [api, extensions, trigger]);
  return (0, _react.useMemo)(() => isDevelopment || !isApiReady || !all ? EMPTY_STATE : filterAll(api, all), [all, api, isApiReady, isDevelopment]);
}