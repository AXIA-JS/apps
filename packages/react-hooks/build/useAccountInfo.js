import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useCallback, useEffect, useState } from 'react';
import { keyring } from '@axia-js/ui-keyring';
import { isFunction } from '@axia-js/util';
import { useAccounts } from "./useAccounts.js";
import { useAddresses } from "./useAddresses.js";
import { useApi } from "./useApi.js";
import { useCall } from "./useCall.js";
import { useToggle } from "./useToggle.js";
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
export function useAccountInfo(value, isContract = false) {
  var _api$query$staking, _api$query$staking2;

  const {
    api
  } = useApi();
  const {
    isAccount
  } = useAccounts();
  const {
    isAddress
  } = useAddresses();
  const accountInfo = useCall(api.derive.accounts.info, [value]);
  const accountFlags = useCall(api.derive.accounts.flags, [value]);
  const nominator = useCall((_api$query$staking = api.query.staking) === null || _api$query$staking === void 0 ? void 0 : _api$query$staking.nominators, [value]);
  const validator = useCall((_api$query$staking2 = api.query.staking) === null || _api$query$staking2 === void 0 ? void 0 : _api$query$staking2.validators, [value]);
  const [accountIndex, setAccountIndex] = useState(undefined);
  const [tags, setSortedTags] = useState([]);
  const [name, setName] = useState('');
  const [genesisHash, setGenesisHash] = useState(null);
  const [identity, setIdentity] = useState();
  const [flags, setFlags] = useState(IS_NONE);
  const [meta, setMeta] = useState();
  const [isEditingName, toggleIsEditingName, setIsEditingName] = useToggle();
  const [isEditingTags, toggleIsEditingTags, setIsEditingTags] = useToggle();
  useEffect(() => {
    validator && setFlags(flags => _objectSpread(_objectSpread({}, flags), {}, {
      isValidator: !validator.isEmpty
    }));
  }, [validator]);
  useEffect(() => {
    nominator && setFlags(flags => _objectSpread(_objectSpread({}, flags), {}, {
      isNominator: !nominator.isEmpty
    }));
  }, [nominator]);
  useEffect(() => {
    accountFlags && setFlags(flags => _objectSpread(_objectSpread({}, flags), accountFlags));
  }, [accountFlags]);
  useEffect(() => {
    var _api$query$identity;

    const {
      accountIndex,
      identity,
      nickname
    } = accountInfo || {};
    const newIndex = accountIndex === null || accountIndex === void 0 ? void 0 : accountIndex.toString();
    setAccountIndex(oldIndex => oldIndex !== newIndex ? newIndex : oldIndex);
    let name;

    if (isFunction((_api$query$identity = api.query.identity) === null || _api$query$identity === void 0 ? void 0 : _api$query$identity.identityOf)) {
      if (identity !== null && identity !== void 0 && identity.display) {
        name = identity.display;
      }
    } else if (nickname) {
      name = nickname;
    }

    setName(name || '');

    if (identity) {
      const judgements = identity.judgements.filter(([, judgement]) => !judgement.isFeePaid);
      const isKnownGood = judgements.some(([, judgement]) => judgement.isKnownGood);
      const isReasonable = judgements.some(([, judgement]) => judgement.isReasonable);
      const isErroneous = judgements.some(([, judgement]) => judgement.isErroneous);
      const isLowQuality = judgements.some(([, judgement]) => judgement.isLowQuality);
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
  useEffect(() => {
    if (value) {
      try {
        const accountOrAddress = keyring.getAccount(value) || keyring.getAddress(value);
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
  const onSaveName = useCallback(() => {
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

          const originalMeta = (_keyring$getAddress = keyring.getAddress(value)) === null || _keyring$getAddress === void 0 ? void 0 : _keyring$getAddress.meta;
          keyring.saveContract(value, _objectSpread(_objectSpread({}, originalMeta), meta));
        }
      } catch (error) {
        console.error(error);
      }
    } else if (value) {
      try {
        const pair = keyring.getPair(value);
        pair && keyring.saveAccountMeta(pair, meta);
      } catch (error) {
        const pair = keyring.getAddress(value);

        if (pair) {
          keyring.saveAddress(value, meta);
        } else {
          keyring.saveAddress(value, _objectSpread({
            genesisHash: api.genesisHash.toHex()
          }, meta));
        }
      }
    }
  }, [api, isContract, isEditingName, name, toggleIsEditingName, value]);
  const onSaveTags = useCallback(() => {
    const meta = {
      tags,
      whenEdited: Date.now()
    };

    if (isContract) {
      try {
        if (value) {
          var _keyring$getAddress2;

          const originalMeta = (_keyring$getAddress2 = keyring.getAddress(value)) === null || _keyring$getAddress2 === void 0 ? void 0 : _keyring$getAddress2.meta;
          value && keyring.saveContract(value, _objectSpread(_objectSpread({}, originalMeta), meta));
        }
      } catch (error) {
        console.error(error);
      }
    } else if (value) {
      try {
        const currentKeyring = keyring.getPair(value);
        currentKeyring && keyring.saveAccountMeta(currentKeyring, meta);
      } catch (error) {
        keyring.saveAddress(value, meta);
      }
    }
  }, [isContract, tags, value]);
  const onForgetAddress = useCallback(() => {
    if (isEditingName) {
      toggleIsEditingName();
    }

    if (isEditingTags) {
      toggleIsEditingTags();
    }

    try {
      value && keyring.forgetAddress(value);
    } catch (e) {
      console.error(e);
    }
  }, [isEditingName, isEditingTags, toggleIsEditingName, toggleIsEditingTags, value]);
  const onSetGenesisHash = useCallback(genesisHash => {
    if (value) {
      const account = keyring.getPair(value);
      account && keyring.saveAccountMeta(account, _objectSpread(_objectSpread({}, account.meta), {}, {
        genesisHash
      }));
      setGenesisHash(genesisHash);
    }
  }, [value]);
  const setTags = useCallback(tags => setSortedTags(tags.sort()), []);
  const isEditing = useCallback(() => isEditingName || isEditingTags, [isEditingName, isEditingTags]);
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