"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAccountInfo = useAccountInfo;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = require("react");

var _uiKeyring = require("@axia-js/ui-keyring");

var _util = require("@axia-js/util");

var _useAccounts = require("./useAccounts.cjs");

var _useAddresses = require("./useAddresses.cjs");

var _useApi = require("./useApi.cjs");

var _useCall = require("./useCall.cjs");

var _useToggle = require("./useToggle.cjs");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const IS_NONE = {
  isCouncil: false,
  isDevelopment: false,
  isEditable: false,
  isExternal: false,
  isFavorite: false,
  isHardware: false,
  isInContacts: false,
  isInjected: false,
  isMultisig: false,
  isNominator: false,
  isOwned: false,
  isProxied: false,
  isSociety: false,
  isSudo: false,
  isTechCommittee: false,
  isValidator: false
};

function useAccountInfo(value) {
  var _api$query$staking, _api$query$staking2;

  let isContract = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  const {
    api
  } = (0, _useApi.useApi)();
  const {
    isAccount
  } = (0, _useAccounts.useAccounts)();
  const {
    isAddress
  } = (0, _useAddresses.useAddresses)();
  const accountInfo = (0, _useCall.useCall)(api.derive.accounts.info, [value]);
  const accountFlags = (0, _useCall.useCall)(api.derive.accounts.flags, [value]);
  const nominator = (0, _useCall.useCall)((_api$query$staking = api.query.staking) === null || _api$query$staking === void 0 ? void 0 : _api$query$staking.nominators, [value]);
  const validator = (0, _useCall.useCall)((_api$query$staking2 = api.query.staking) === null || _api$query$staking2 === void 0 ? void 0 : _api$query$staking2.validators, [value]);
  const [accountIndex, setAccountIndex] = (0, _react.useState)(undefined);
  const [tags, setSortedTags] = (0, _react.useState)([]);
  const [name, setName] = (0, _react.useState)('');
  const [genesisHash, setGenesisHash] = (0, _react.useState)(null);
  const [identity, setIdentity] = (0, _react.useState)();
  const [flags, setFlags] = (0, _react.useState)(IS_NONE);
  const [meta, setMeta] = (0, _react.useState)();
  const [isEditingName, toggleIsEditingName, setIsEditingName] = (0, _useToggle.useToggle)();
  const [isEditingTags, toggleIsEditingTags, setIsEditingTags] = (0, _useToggle.useToggle)();
  (0, _react.useEffect)(() => {
    validator && setFlags(flags => _objectSpread(_objectSpread({}, flags), {}, {
      isValidator: !validator.isEmpty
    }));
  }, [validator]);
  (0, _react.useEffect)(() => {
    nominator && setFlags(flags => _objectSpread(_objectSpread({}, flags), {}, {
      isNominator: !nominator.isEmpty
    }));
  }, [nominator]);
  (0, _react.useEffect)(() => {
    accountFlags && setFlags(flags => _objectSpread(_objectSpread({}, flags), accountFlags));
  }, [accountFlags]);
  (0, _react.useEffect)(() => {
    var _api$query$identity;

    const {
      accountIndex,
      identity,
      nickname
    } = accountInfo || {};
    const newIndex = accountIndex === null || accountIndex === void 0 ? void 0 : accountIndex.toString();
    setAccountIndex(oldIndex => oldIndex !== newIndex ? newIndex : oldIndex);
    let name;

    if ((0, _util.isFunction)((_api$query$identity = api.query.identity) === null || _api$query$identity === void 0 ? void 0 : _api$query$identity.identityOf)) {
      if (identity !== null && identity !== void 0 && identity.display) {
        name = identity.display;
      }
    } else if (nickname) {
      name = nickname;
    }

    setName(name || '');

    if (identity) {
      const judgements = identity.judgements.filter(_ref => {
        let [, judgement] = _ref;
        return !judgement.isFeePaid;
      });
      const isKnownGood = judgements.some(_ref2 => {
        let [, judgement] = _ref2;
        return judgement.isKnownGood;
      });
      const isReasonable = judgements.some(_ref3 => {
        let [, judgement] = _ref3;
        return judgement.isReasonable;
      });
      const isErroneous = judgements.some(_ref4 => {
        let [, judgement] = _ref4;
        return judgement.isErroneous;
      });
      const isLowQuality = judgements.some(_ref5 => {
        let [, judgement] = _ref5;
        return judgement.isLowQuality;
      });
      setIdentity(_objectSpread(_objectSpread({}, identity), {}, {
        isBad: isErroneous || isLowQuality,
        isErroneous,
        isExistent: !!identity.display,
        isGood: isKnownGood || isReasonable,
        isKnownGood,
        isLowQuality,
        isReasonable,
        judgements,
        waitCount: identity.judgements.length - judgements.length
      }));
    } else {
      setIdentity(undefined);
    }
  }, [accountInfo, api]);
  (0, _react.useEffect)(() => {
    if (value) {
      try {
        const accountOrAddress = _uiKeyring.keyring.getAccount(value) || _uiKeyring.keyring.getAddress(value);

        const isOwned = isAccount(value);
        const isInContacts = isAddress(value);
        setGenesisHash((accountOrAddress === null || accountOrAddress === void 0 ? void 0 : accountOrAddress.meta.genesisHash) || null);
        setFlags(flags => _objectSpread(_objectSpread({}, flags), {}, {
          isDevelopment: (accountOrAddress === null || accountOrAddress === void 0 ? void 0 : accountOrAddress.meta.isTesting) || false,
          isEditable: !!(!(identity !== null && identity !== void 0 && identity.display) && (isInContacts || accountOrAddress !== null && accountOrAddress !== void 0 && accountOrAddress.meta.isMultisig || accountOrAddress && !accountOrAddress.meta.isInjected)) || false,
          isExternal: !!(accountOrAddress !== null && accountOrAddress !== void 0 && accountOrAddress.meta.isExternal) || false,
          isHardware: !!(accountOrAddress !== null && accountOrAddress !== void 0 && accountOrAddress.meta.isHardware) || false,
          isInContacts,
          isInjected: !!(accountOrAddress !== null && accountOrAddress !== void 0 && accountOrAddress.meta.isInjected) || false,
          isMultisig: !!(accountOrAddress !== null && accountOrAddress !== void 0 && accountOrAddress.meta.isMultisig) || false,
          isOwned,
          isProxied: !!(accountOrAddress !== null && accountOrAddress !== void 0 && accountOrAddress.meta.isProxied) || false
        }));
        setMeta(accountOrAddress === null || accountOrAddress === void 0 ? void 0 : accountOrAddress.meta);
        setName((accountOrAddress === null || accountOrAddress === void 0 ? void 0 : accountOrAddress.meta.name) || '');
        setSortedTags(accountOrAddress !== null && accountOrAddress !== void 0 && accountOrAddress.meta.tags ? accountOrAddress.meta.tags.sort() : []);
      } catch (error) {// ignore
      }
    }
  }, [identity, isAccount, isAddress, value]);
  const onSaveName = (0, _react.useCallback)(() => {
    if (isEditingName) {
      toggleIsEditingName();
    }

    const meta = {
      name,
      whenEdited: Date.now()
    };

    if (isContract) {
      try {
        if (value) {
          var _keyring$getAddress;

          const originalMeta = (_keyring$getAddress = _uiKeyring.keyring.getAddress(value)) === null || _keyring$getAddress === void 0 ? void 0 : _keyring$getAddress.meta;

          _uiKeyring.keyring.saveContract(value, _objectSpread(_objectSpread({}, originalMeta), meta));
        }
      } catch (error) {
        console.error(error);
      }
    } else if (value) {
      try {
        const pair = _uiKeyring.keyring.getPair(value);

        pair && _uiKeyring.keyring.saveAccountMeta(pair, meta);
      } catch (error) {
        const pair = _uiKeyring.keyring.getAddress(value);

        if (pair) {
          _uiKeyring.keyring.saveAddress(value, meta);
        } else {
          _uiKeyring.keyring.saveAddress(value, _objectSpread({
            genesisHash: api.genesisHash.toHex()
          }, meta));
        }
      }
    }
  }, [api, isContract, isEditingName, name, toggleIsEditingName, value]);
  const onSaveTags = (0, _react.useCallback)(() => {
    const meta = {
      tags,
      whenEdited: Date.now()
    };

    if (isContract) {
      try {
        if (value) {
          var _keyring$getAddress2;

          const originalMeta = (_keyring$getAddress2 = _uiKeyring.keyring.getAddress(value)) === null || _keyring$getAddress2 === void 0 ? void 0 : _keyring$getAddress2.meta;
          value && _uiKeyring.keyring.saveContract(value, _objectSpread(_objectSpread({}, originalMeta), meta));
        }
      } catch (error) {
        console.error(error);
      }
    } else if (value) {
      try {
        const currentKeyring = _uiKeyring.keyring.getPair(value);

        currentKeyring && _uiKeyring.keyring.saveAccountMeta(currentKeyring, meta);
      } catch (error) {
        _uiKeyring.keyring.saveAddress(value, meta);
      }
    }
  }, [isContract, tags, value]);
  const onForgetAddress = (0, _react.useCallback)(() => {
    if (isEditingName) {
      toggleIsEditingName();
    }

    if (isEditingTags) {
      toggleIsEditingTags();
    }

    try {
      value && _uiKeyring.keyring.forgetAddress(value);
    } catch (e) {
      console.error(e);
    }
  }, [isEditingName, isEditingTags, toggleIsEditingName, toggleIsEditingTags, value]);
  const onSetGenesisHash = (0, _react.useCallback)(genesisHash => {
    if (value) {
      const account = _uiKeyring.keyring.getPair(value);

      account && _uiKeyring.keyring.saveAccountMeta(account, _objectSpread(_objectSpread({}, account.meta), {}, {
        genesisHash
      }));
      setGenesisHash(genesisHash);
    }
  }, [value]);
  const setTags = (0, _react.useCallback)(tags => setSortedTags(tags.sort()), []);
  const isEditing = (0, _react.useCallback)(() => isEditingName || isEditingTags, [isEditingName, isEditingTags]);
  return {
    accountIndex,
    flags,
    genesisHash,
    identity,
    isEditing,
    isEditingName,
    isEditingTags,
    isNull: !value,
    meta,
    name,
    onForgetAddress,
    onSaveName,
    onSaveTags,
    onSetGenesisHash,
    setIsEditingName,
    setIsEditingTags,
    setName,
    setTags,
    tags,
    toggleIsEditingName,
    toggleIsEditingTags
  };
}