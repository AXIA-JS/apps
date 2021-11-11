"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.api = exports.DEFAULT_AUX = exports.DEFAULT_SS58 = exports.DEFAULT_DECIMALS = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _connect = require("@substrate/connect");

var _react = _interopRequireWildcard(require("react"));

var _store = _interopRequireDefault(require("store"));

var _api = require("@axia-js/api");

var _promise = require("@axia-js/api/promise");

var _util = require("@axia-js/api-derive/util");

var _appsConfig = require("@axia-js/apps-config");

var _extensionDapp = require("@axia-js/extension-dapp");

var _InputNumber = require("@axia-js/react-components/InputNumber");

var _Status = require("@axia-js/react-components/Status");

var _ApiSigner = _interopRequireDefault(require("@axia-js/react-signer/signers/ApiSigner"));

var _uiKeyring = require("@axia-js/ui-keyring");

var _uiSettings = require("@axia-js/ui-settings");

var _util2 = require("@axia-js/util");

var _defaults = require("@axia-js/util-crypto/address/defaults");

var _ApiContext = _interopRequireDefault(require("./ApiContext.cjs"));

var _typeRegistry = _interopRequireDefault(require("./typeRegistry.cjs"));

var _urlTypes = require("./urlTypes.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const DEFAULT_DECIMALS = _typeRegistry.default.createType('u32', 12);

exports.DEFAULT_DECIMALS = DEFAULT_DECIMALS;

const DEFAULT_SS58 = _typeRegistry.default.createType('u32', _defaults.defaults.prefix);

exports.DEFAULT_SS58 = DEFAULT_SS58;
const DEFAULT_AUX = ['Aux1', 'Aux2', 'Aux3', 'Aux4', 'Aux5', 'Aux6', 'Aux7', 'Aux8', 'Aux9'];
exports.DEFAULT_AUX = DEFAULT_AUX;
let api;
exports.api = api;

function isKeyringLoaded() {
  try {
    return !!_uiKeyring.keyring.keyring;
  } catch {
    return false;
  }
}

function getDevTypes() {
  const types = (0, _urlTypes.decodeUrlTypes)() || _store.default.get('types', {});

  const names = Object.keys(types);
  names.length && console.log('Injected types:', names.join(', '));
  return types;
}

async function getInjectedAccounts(injectedPromise) {
  try {
    await injectedPromise;
    const accounts = await (0, _extensionDapp.web3Accounts)();
    return accounts.map(({
      address,
      meta
    }, whenCreated) => ({
      address,
      meta: _objectSpread(_objectSpread({}, meta), {}, {
        name: `${meta.name || 'unknown'} (${meta.source === 'axia-js' ? 'extension' : meta.source})`,
        whenCreated
      })
    }));
  } catch (error) {
    console.error('web3Accounts', error);
    return [];
  }
}

async function retrieve(api, injectedPromise) {
  var _api$consts$system;

  const [chainProperties, systemChain, systemChainType, systemName, systemVersion, injectedAccounts] = await Promise.all([api.rpc.system.properties(), api.rpc.system.chain(), api.rpc.system.chainType ? api.rpc.system.chainType() : Promise.resolve(_typeRegistry.default.createType('ChainType', 'Live')), api.rpc.system.name(), api.rpc.system.version(), getInjectedAccounts(injectedPromise)]);
  return {
    injectedAccounts,
    properties: _typeRegistry.default.createType('ChainProperties', {
      ss58Format: ((_api$consts$system = api.consts.system) === null || _api$consts$system === void 0 ? void 0 : _api$consts$system.ss58Prefix) || chainProperties.ss58Format,
      tokenDecimals: chainProperties.tokenDecimals,
      tokenSymbol: chainProperties.tokenSymbol
    }),
    systemChain: (systemChain || '<unknown>').toString(),
    systemChainType,
    systemName: systemName.toString(),
    systemVersion: systemVersion.toString()
  };
}

async function loadOnReady(api, injectedPromise, store, types) {
  _typeRegistry.default.register(types);

  const {
    injectedAccounts,
    properties,
    systemChain,
    systemChainType,
    systemName,
    systemVersion
  } = await retrieve(api, injectedPromise);
  const ss58Format = _uiSettings.settings.prefix === -1 ? properties.ss58Format.unwrapOr(DEFAULT_SS58).toNumber() : _uiSettings.settings.prefix;
  const tokenSymbol = properties.tokenSymbol.unwrapOr([_util2.formatBalance.getDefaults().unit, ...DEFAULT_AUX]);
  const tokenDecimals = properties.tokenDecimals.unwrapOr([DEFAULT_DECIMALS]);

  const isEthereum = _appsConfig.ethereumChains.includes(api.runtimeVersion.specName.toString());

  const isDevelopment = systemChainType.isDevelopment || systemChainType.isLocal || (0, _util2.isTestChain)(systemChain);
  console.log(`chain: ${systemChain} (${systemChainType.toString()}), ${JSON.stringify(properties)}`); // explicitly override the ss58Format as specified

  _typeRegistry.default.setChainProperties(_typeRegistry.default.createType('ChainProperties', {
    ss58Format,
    tokenDecimals,
    tokenSymbol
  })); // first setup the UI helpers


  _util2.formatBalance.setDefaults({
    decimals: tokenDecimals.map(b => b.toNumber()),
    unit: tokenSymbol[0].toString()
  });

  _InputNumber.TokenUnit.setAbbr(tokenSymbol[0].toString()); // finally load the keyring


  isKeyringLoaded() || _uiKeyring.keyring.loadAll({
    genesisHash: api.genesisHash,
    isDevelopment,
    ss58Format,
    store,
    type: isEthereum ? 'ethereum' : 'ed25519'
  }, injectedAccounts);
  const defaultSection = Object.keys(api.tx)[0];
  const defaultMethod = Object.keys(api.tx[defaultSection])[0];
  const apiDefaultTx = api.tx[defaultSection][defaultMethod];
  const apiDefaultTxSudo = api.tx.system && api.tx.system.setCode || apiDefaultTx;
  (0, _util.setDeriveCache)(api.genesisHash.toHex(), _util.deriveMapCache);
  return {
    apiDefaultTx,
    apiDefaultTxSudo,
    hasInjectedAccounts: injectedAccounts.length !== 0,
    isApiReady: true,
    isDevelopment: isEthereum ? false : isDevelopment,
    isEthereum,
    specName: api.runtimeVersion.specName.toString(),
    specVersion: api.runtimeVersion.specVersion.toString(),
    systemChain,
    systemName,
    systemVersion
  };
}

function Api({
  apiUrl,
  children,
  store
}) {
  const {
    queuePayload,
    queueSetTxStatus
  } = (0, _react.useContext)(_Status.StatusContext);
  const [state, setState] = (0, _react.useState)({
    hasInjectedAccounts: false,
    isApiReady: false
  });
  const [isApiConnected, setIsApiConnected] = (0, _react.useState)(false);
  const [isApiInitialized, setIsApiInitialized] = (0, _react.useState)(false);
  const [apiError, setApiError] = (0, _react.useState)(null);
  const [extensions, setExtensions] = (0, _react.useState)();
  const value = (0, _react.useMemo)(() => _objectSpread(_objectSpread({}, state), {}, {
    api,
    apiError,
    apiUrl,
    extensions,
    isApiConnected,
    isApiInitialized,
    isWaitingInjected: !extensions
  }), [apiError, extensions, isApiConnected, isApiInitialized, state, apiUrl]); // initial initialization

  (0, _react.useEffect)(() => {
    let provider;

    if (apiUrl.startsWith('light://')) {
      const detect = new _connect.Detector('axia-js/apps');
      provider = detect.provider(apiUrl.replace('light://substrate-connect/', ''));
      provider.connect().catch(console.error);
    } else {
      provider = new _api.WsProvider(apiUrl);
    }

    const signer = new _ApiSigner.default(_typeRegistry.default, queuePayload, queueSetTxStatus);
    const types = getDevTypes();
    exports.api = api = new _promise.ApiPromise({
      provider,
      registry: _typeRegistry.default,
      signer,
      types,
      typesBundle: _appsConfig.typesBundle,
      typesChain: _appsConfig.typesChain
    });
    api.on('connected', () => setIsApiConnected(true));
    api.on('disconnected', () => setIsApiConnected(false));
    api.on('error', error => setApiError(error.message));
    api.on('ready', () => {
      const injectedPromise = (0, _extensionDapp.web3Enable)('axia-js/apps');
      injectedPromise.then(setExtensions).catch(console.error);
      loadOnReady(api, injectedPromise, store, types).then(setState).catch(error => {
        console.error(error);
        setApiError(error.message);
      });
    });
    setIsApiInitialized(true);
  }, [apiUrl, queuePayload, queueSetTxStatus, store]);

  if (!value.isApiInitialized) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ApiContext.default.Provider, {
    value: value,
    children: children
  });
}

var _default = /*#__PURE__*/_react.default.memo(Api);

exports.default = _default;