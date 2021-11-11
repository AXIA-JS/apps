"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bn = _interopRequireDefault(require("bn.js"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _uiKeyring = require("@axia-js/ui-keyring");

var _util = require("@axia-js/util");

var _Backup = _interopRequireDefault(require("../modals/Backup.cjs"));

var _ChangePass = _interopRequireDefault(require("../modals/ChangePass.cjs"));

var _Delegate = _interopRequireDefault(require("../modals/Delegate.cjs"));

var _Derive = _interopRequireDefault(require("../modals/Derive.cjs"));

var _IdentityMain = _interopRequireDefault(require("../modals/IdentityMain.cjs"));

var _IdentitySub = _interopRequireDefault(require("../modals/IdentitySub.cjs"));

var _MultisigApprove = _interopRequireDefault(require("../modals/MultisigApprove.cjs"));

var _ProxyOverview = _interopRequireDefault(require("../modals/ProxyOverview.cjs"));

var _RecoverAccount = _interopRequireDefault(require("../modals/RecoverAccount.cjs"));

var _RecoverSetup = _interopRequireDefault(require("../modals/RecoverSetup.cjs"));

var _Transfer = _interopRequireDefault(require("../modals/Transfer.cjs"));

var _Undelegate = _interopRequireDefault(require("../modals/Undelegate.cjs"));

var _translate = require("../translate.cjs");

var _util2 = require("../util.cjs");

var _useMultisigApprovals = _interopRequireDefault(require("./useMultisigApprovals.cjs"));

var _useProxies = _interopRequireDefault(require("./useProxies.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
function calcVisible(filter, name, tags) {
  if (filter.length === 0) {
    return true;
  }

  const _filter = filter.toLowerCase();

  return tags.reduce((result, tag) => {
    return result || tag.toLowerCase().includes(_filter);
  }, name.toLowerCase().includes(_filter));
}

function calcUnbonding(stakingInfo) {
  if (!(stakingInfo !== null && stakingInfo !== void 0 && stakingInfo.unlocking)) {
    return _util.BN_ZERO;
  }

  const filtered = stakingInfo.unlocking.filter(({
    remainingEras,
    value
  }) => value.gt(_util.BN_ZERO) && remainingEras.gt(_util.BN_ZERO)).map(unlock => unlock.value);
  const total = filtered.reduce((total, value) => total.iadd(value), new _bn.default(0));
  return total;
}

function createClearDemocracyTx(api, address, unlockableIds) {
  return api.tx.utility ? api.tx.utility.batch(unlockableIds.map(id => api.tx.democracy.removeVote(id)).concat(api.tx.democracy.unlock(address))) : null;
}

async function showLedgerAddress(getLedger, meta) {
  const ledger = getLedger();
  await ledger.getAddress(true, meta.accountOffset || 0, meta.addressOffset || 0);
}

const transformRecovery = {
  transform: opt => opt.unwrapOr(null)
};

function Account({
  account: {
    address,
    meta
  },
  className = '',
  delegation,
  filter,
  isFavorite,
  proxy,
  setBalance,
  toggleFavorite
}) {
  var _api$api$derive$democ, _api$api$query$recove, _api$api$tx$balances;

  const {
    t
  } = (0, _translate.useTranslation)();
  const [isExpanded, toggleIsExpanded] = (0, _reactHooks.useToggle)(false);
  const {
    theme
  } = (0, _react.useContext)(_styledComponents.ThemeContext);
  const {
    queueExtrinsic
  } = (0, _react.useContext)(_reactComponents.StatusContext);
  const api = (0, _reactHooks.useApi)();
  const {
    getLedger
  } = (0, _reactHooks.useLedger)();
  const bestNumber = (0, _reactHooks.useBestNumber)();
  const balancesAll = (0, _reactHooks.useBalancesAll)(address);
  const stakingInfo = (0, _reactHooks.useStakingInfo)(address);
  const democracyLocks = (0, _reactHooks.useCall)((_api$api$derive$democ = api.api.derive.democracy) === null || _api$api$derive$democ === void 0 ? void 0 : _api$api$derive$democ.locks, [address]);
  const recoveryInfo = (0, _reactHooks.useCall)((_api$api$query$recove = api.api.query.recovery) === null || _api$api$query$recove === void 0 ? void 0 : _api$api$query$recove.recoverable, [address], transformRecovery);
  const multiInfos = (0, _useMultisigApprovals.default)(address);
  const proxyInfo = (0, _useProxies.default)(address);
  const {
    flags: {
      isDevelopment,
      isEditable,
      isExternal,
      isHardware,
      isInjected,
      isMultisig,
      isProxied
    },
    genesisHash,
    identity,
    name: accName,
    onSetGenesisHash,
    tags
  } = (0, _reactHooks.useAccountInfo)(address);
  const [{
    democracyUnlockTx
  }, setUnlockableIds] = (0, _react.useState)({
    democracyUnlockTx: null,
    ids: []
  });
  const [vestingVestTx, setVestingTx] = (0, _react.useState)(null);
  const [isBackupOpen, toggleBackup] = (0, _reactHooks.useToggle)();
  const [isDeriveOpen, toggleDerive] = (0, _reactHooks.useToggle)();
  const [isForgetOpen, toggleForget] = (0, _reactHooks.useToggle)();
  const [isIdentityMainOpen, toggleIdentityMain] = (0, _reactHooks.useToggle)();
  const [isIdentitySubOpen, toggleIdentitySub] = (0, _reactHooks.useToggle)();
  const [isMultisigOpen, toggleMultisig] = (0, _reactHooks.useToggle)();
  const [isProxyOverviewOpen, toggleProxyOverview] = (0, _reactHooks.useToggle)();
  const [isPasswordOpen, togglePassword] = (0, _reactHooks.useToggle)();
  const [isRecoverAccountOpen, toggleRecoverAccount] = (0, _reactHooks.useToggle)();
  const [isRecoverSetupOpen, toggleRecoverSetup] = (0, _reactHooks.useToggle)();
  const [isTransferOpen, toggleTransfer] = (0, _reactHooks.useToggle)();
  const [isDelegateOpen, toggleDelegate] = (0, _reactHooks.useToggle)();
  const [isUndelegateOpen, toggleUndelegate] = (0, _reactHooks.useToggle)();
  (0, _react.useEffect)(() => {
    if (balancesAll) {
      var _stakingInfo$stakingL, _stakingInfo$redeemab, _api$api$tx$vesting;

      setBalance(address, {
        bonded: (_stakingInfo$stakingL = stakingInfo === null || stakingInfo === void 0 ? void 0 : stakingInfo.stakingLedger.active.unwrap()) !== null && _stakingInfo$stakingL !== void 0 ? _stakingInfo$stakingL : _util.BN_ZERO,
        locked: balancesAll.lockedBalance,
        redeemable: (_stakingInfo$redeemab = stakingInfo === null || stakingInfo === void 0 ? void 0 : stakingInfo.redeemable) !== null && _stakingInfo$redeemab !== void 0 ? _stakingInfo$redeemab : _util.BN_ZERO,
        total: balancesAll.freeBalance.add(balancesAll.reservedBalance),
        transferrable: balancesAll.availableBalance,
        unbonding: calcUnbonding(stakingInfo)
      });
      ((_api$api$tx$vesting = api.api.tx.vesting) === null || _api$api$tx$vesting === void 0 ? void 0 : _api$api$tx$vesting.vest) && setVestingTx(() => balancesAll.vestingLocked.isZero() ? null : api.api.tx.vesting.vest());
    }
  }, [address, api, balancesAll, setBalance, stakingInfo]);
  (0, _react.useEffect)(() => {
    bestNumber && democracyLocks && setUnlockableIds(prev => {
      const ids = democracyLocks.filter(({
        isFinished,
        unlockAt
      }) => isFinished && bestNumber.gt(unlockAt)).map(({
        referendumId
      }) => referendumId);

      if (JSON.stringify(prev.ids) === JSON.stringify(ids)) {
        return prev;
      }

      return {
        democracyUnlockTx: createClearDemocracyTx(api.api, address, ids),
        ids
      };
    });
  }, [address, api, bestNumber, democracyLocks]);
  const isVisible = (0, _react.useMemo)(() => calcVisible(filter, accName, tags), [accName, filter, tags]);

  const _onFavorite = (0, _react.useCallback)(() => toggleFavorite(address), [address, toggleFavorite]);

  const _onForget = (0, _react.useCallback)(() => {
    if (!address) {
      return;
    }

    const status = {
      account: address,
      action: 'forget'
    };

    try {
      _uiKeyring.keyring.forgetAccount(address);

      status.status = 'success';
      status.message = t('account forgotten');
    } catch (error) {
      status.status = 'error';
      status.message = error.message;
    }
  }, [address, t]);

  const _clearDemocracyLocks = (0, _react.useCallback)(() => democracyUnlockTx && queueExtrinsic({
    accountId: address,
    extrinsic: democracyUnlockTx
  }), [address, democracyUnlockTx, queueExtrinsic]);

  const _vestingVest = (0, _react.useCallback)(() => vestingVestTx && queueExtrinsic({
    accountId: address,
    extrinsic: vestingVestTx
  }), [address, queueExtrinsic, vestingVestTx]);

  const _showOnHardware = (0, _react.useCallback)( // TODO: we should check the hardwareType from metadata here as well,
  // for now we are always assuming hardwareType === 'ledger'
  () => {
    showLedgerAddress(getLedger, meta).catch(error => {
      console.error(`ledger: ${error.message}`);
    });
  }, [getLedger, meta]);

  const menuItems = (0, _react.useMemo)(() => {
    var _api$api$tx$identity, _api$api$tx$identity2, _api$api$tx$democracy, _api$api$tx$vesting2, _api$api$tx$recovery, _api$api$tx$multisig, _api$api$query$democr, _api$api$query$democr2, _api$api$query$proxy;

    return [(0, _util2.createMenuGroup)('identityGroup', [(0, _util.isFunction)((_api$api$tx$identity = api.api.tx.identity) === null || _api$api$tx$identity === void 0 ? void 0 : _api$api$tx$identity.setIdentity) && !isHardware && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Menu.Item, {
      icon: "link",
      onClick: toggleIdentityMain,
      children: t('Set on-chain identity')
    }, 'identityMain'), (0, _util.isFunction)((_api$api$tx$identity2 = api.api.tx.identity) === null || _api$api$tx$identity2 === void 0 ? void 0 : _api$api$tx$identity2.setSubs) && (identity === null || identity === void 0 ? void 0 : identity.display) && !isHardware && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Menu.Item, {
      icon: "vector-square",
      onClick: toggleIdentitySub,
      children: t('Set on-chain sub-identities')
    }, 'identitySub'), (0, _util.isFunction)((_api$api$tx$democracy = api.api.tx.democracy) === null || _api$api$tx$democracy === void 0 ? void 0 : _api$api$tx$democracy.unlock) && democracyUnlockTx && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Menu.Item, {
      icon: "broom",
      onClick: _clearDemocracyLocks,
      children: t('Clear expired democracy locks')
    }, 'clearDemocracy'), (0, _util.isFunction)((_api$api$tx$vesting2 = api.api.tx.vesting) === null || _api$api$tx$vesting2 === void 0 ? void 0 : _api$api$tx$vesting2.vest) && vestingVestTx && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Menu.Item, {
      icon: "unlock",
      onClick: _vestingVest,
      children: t('Unlock vested amount')
    }, 'vestingVest')], t('Identity')), (0, _util2.createMenuGroup)('deriveGroup', [!(isExternal || isHardware || isInjected || isMultisig) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Menu.Item, {
      icon: "download",
      onClick: toggleDerive,
      children: t('Derive account via derivation path')
    }, 'deriveAccount'), isHardware && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Menu.Item, {
      icon: "eye",
      onClick: _showOnHardware,
      children: t('Show address on hardware device')
    }, 'showHwAddress')], t('Derive')), (0, _util2.createMenuGroup)('backupGroup', [!(isExternal || isHardware || isInjected || isMultisig || isDevelopment) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Menu.Item, {
      icon: "database",
      onClick: toggleBackup,
      children: t('Create a backup file for this account')
    }, 'backupJson'), !(isExternal || isHardware || isInjected || isMultisig || isDevelopment) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Menu.Item, {
      icon: "edit",
      onClick: togglePassword,
      children: t("Change this account's password")
    }, 'changePassword'), !(isInjected || isDevelopment) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Menu.Item, {
      icon: "trash-alt",
      onClick: toggleForget,
      children: t('Forget this account')
    }, 'forgetAccount')], t('Backup')), (0, _util.isFunction)((_api$api$tx$recovery = api.api.tx.recovery) === null || _api$api$tx$recovery === void 0 ? void 0 : _api$api$tx$recovery.createRecovery) && (0, _util2.createMenuGroup)('reoveryGroup', [!recoveryInfo && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Menu.Item, {
      icon: "redo",
      onClick: toggleRecoverSetup,
      children: t('Make recoverable')
    }, 'makeRecoverable'), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Menu.Item, {
      icon: "screwdriver",
      onClick: toggleRecoverAccount,
      children: t('Initiate recovery for another')
    }, 'initRecovery')], t('Recovery')), (0, _util.isFunction)((_api$api$tx$multisig = api.api.tx.multisig) === null || _api$api$tx$multisig === void 0 ? void 0 : _api$api$tx$multisig.asMulti) && isMultisig && (0, _util2.createMenuGroup)('multisigGroup', [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Menu.Item, {
      disabled: !multiInfos || !multiInfos.length,
      icon: "file-signature",
      onClick: toggleMultisig,
      children: t('Multisig approvals')
    }, 'multisigApprovals')], t('Multisig')), (0, _util.isFunction)((_api$api$query$democr = api.api.query.democracy) === null || _api$api$query$democr === void 0 ? void 0 : _api$api$query$democr.votingOf) && (delegation === null || delegation === void 0 ? void 0 : delegation.accountDelegated) && (0, _util2.createMenuGroup)('undelegateGroup', [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Menu.Item, {
      icon: "user-edit",
      onClick: toggleDelegate,
      children: t('Change democracy delegation')
    }, 'changeDelegate'), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Menu.Item, {
      icon: "user-minus",
      onClick: toggleUndelegate,
      children: t('Undelegate')
    }, 'undelegate')], t('Undelegate')), (0, _util2.createMenuGroup)('delegateGroup', [(0, _util.isFunction)((_api$api$query$democr2 = api.api.query.democracy) === null || _api$api$query$democr2 === void 0 ? void 0 : _api$api$query$democr2.votingOf) && !(delegation !== null && delegation !== void 0 && delegation.accountDelegated) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Menu.Item, {
      icon: "user-plus",
      onClick: toggleDelegate,
      children: t('Delegate democracy votes')
    }, 'delegate'), (0, _util.isFunction)((_api$api$query$proxy = api.api.query.proxy) === null || _api$api$query$proxy === void 0 ? void 0 : _api$api$query$proxy.proxies) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Menu.Item, {
      icon: "sitemap",
      onClick: toggleProxyOverview,
      children: proxy !== null && proxy !== void 0 && proxy[0].length ? t('Manage proxies') : t('Add proxy')
    }, 'proxy-overview')], t('Delegate')), isEditable && !api.isDevelopment && (0, _util2.createMenuGroup)('genesisGroup', [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.ChainLock, {
      className: "accounts--network-toggle",
      genesisHash: genesisHash,
      onChange: onSetGenesisHash
    }, 'chainlock')])].filter(i => i);
  }, [_clearDemocracyLocks, _showOnHardware, _vestingVest, api, delegation, democracyUnlockTx, genesisHash, identity, isDevelopment, isEditable, isExternal, isHardware, isInjected, isMultisig, multiInfos, onSetGenesisHash, proxy, recoveryInfo, t, toggleBackup, toggleDelegate, toggleDerive, toggleForget, toggleIdentityMain, toggleIdentitySub, toggleMultisig, togglePassword, toggleProxyOverview, toggleRecoverAccount, toggleRecoverSetup, toggleUndelegate, vestingVestTx]);

  if (!isVisible) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
      className: `${className}${isExpanded ? ' noBorder' : ''}`,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "favorite",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Icon, {
          color: isFavorite ? 'orange' : 'gray',
          icon: "star",
          onClick: _onFavorite
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("td", {
        className: "together",
        children: [meta.genesisHash ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Badge, {
          color: "transparent"
        }) : isDevelopment ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Badge, {
          className: "devBadge",
          color: "orange",
          hover: t('This is a development account derived from the known development seed. Do not use for any funds on a non-development network.'),
          icon: "wrench"
        }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Badge, {
          color: "orange",
          hover: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
              children: t('This account is available on all networks. It is recommended to link to a specific network via the account options ("only this network" option) to limit availability. For accounts from an extension, set the network on the extension.')
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
              children: t('This does not send any transaction, rather is only sets the genesis in the account JSON.')
            })]
          }),
          icon: "exclamation-triangle"
        }), recoveryInfo && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Badge, {
          color: "green",
          hover: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
              children: t('This account is recoverable, with the following friends:')
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              children: recoveryInfo.friends.map((friend, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.IdentityIcon, {
                value: friend
              }, index))
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("table", {
              children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("tbody", {
                children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
                  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
                    children: t('threshold')
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
                    children: (0, _util.formatNumber)(recoveryInfo.threshold)
                  })]
                }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
                  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
                    children: t('delay')
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
                    children: (0, _util.formatNumber)(recoveryInfo.delayPeriod)
                  })]
                }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
                  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
                    children: t('deposit')
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
                    children: (0, _util.formatBalance)(recoveryInfo.deposit)
                  })]
                })]
              })
            })]
          }),
          icon: "shield"
        }), multiInfos && multiInfos.length !== 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Badge, {
          color: "red",
          hover: t('Multisig approvals pending'),
          info: multiInfos.length
        }), isProxied && !proxyInfo.hasOwned && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Badge, {
          color: "red",
          hover: t('Proxied account has no owned proxies'),
          info: "0"
        }), (delegation === null || delegation === void 0 ? void 0 : delegation.accountDelegated) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Badge, {
          color: "blue",
          hover: t('This account has a governance delegation'),
          icon: "calendar-check",
          onClick: toggleDelegate
        }), !!(proxy !== null && proxy !== void 0 && proxy[0].length) && api.api.tx.utility && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Badge, {
          color: "blue",
          hover: t('This account has {{proxyNumber}} proxy set.', {
            replace: {
              proxyNumber: proxy[0].length
            }
          }),
          icon: "arrow-right",
          onClick: toggleProxyOverview
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("td", {
        className: "address",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressSmall, {
          parentAddress: meta.parentAddress,
          value: address,
          withShortAddress: true
        }), isBackupOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Backup.default, {
          address: address,
          onClose: toggleBackup
        }, 'modal-backup-account'), isDelegateOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Delegate.default, {
          onClose: toggleDelegate,
          previousAmount: delegation === null || delegation === void 0 ? void 0 : delegation.amount,
          previousConviction: delegation === null || delegation === void 0 ? void 0 : delegation.conviction,
          previousDelegatedAccount: delegation === null || delegation === void 0 ? void 0 : delegation.accountDelegated,
          previousDelegatingAccount: address
        }, 'modal-delegate'), isDeriveOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Derive.default, {
          from: address,
          onClose: toggleDerive
        }, 'modal-derive-account'), isForgetOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Forget, {
          address: address,
          onClose: toggleForget,
          onForget: _onForget
        }, 'modal-forget-account'), isIdentityMainOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_IdentityMain.default, {
          address: address,
          onClose: toggleIdentityMain
        }, 'modal-identity-main'), isIdentitySubOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_IdentitySub.default, {
          address: address,
          onClose: toggleIdentitySub
        }, 'modal-identity-sub'), isPasswordOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChangePass.default, {
          address: address,
          onClose: togglePassword
        }, 'modal-change-pass'), isTransferOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Transfer.default, {
          onClose: toggleTransfer,
          senderId: address
        }, 'modal-transfer'), isProxyOverviewOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProxyOverview.default, {
          onClose: toggleProxyOverview,
          previousProxy: proxy,
          proxiedAccount: address
        }, 'modal-proxy-overview'), isMultisigOpen && multiInfos && /*#__PURE__*/(0, _jsxRuntime.jsx)(_MultisigApprove.default, {
          address: address,
          onClose: toggleMultisig,
          ongoing: multiInfos,
          threshold: meta.threshold,
          who: meta.who
        }, 'multisig-approve'), isRecoverAccountOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_RecoverAccount.default, {
          address: address,
          onClose: toggleRecoverAccount
        }, 'recover-account'), isRecoverSetupOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_RecoverSetup.default, {
          address: address,
          onClose: toggleRecoverSetup
        }, 'recover-setup'), isUndelegateOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Undelegate.default, {
          accountDelegating: address,
          onClose: toggleUndelegate
        }, 'modal-delegate')]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "number",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CryptoType, {
          accountId: address
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "number media--1500",
        children: (balancesAll === null || balancesAll === void 0 ? void 0 : balancesAll.accountNonce.gt(_util.BN_ZERO)) && (0, _util.formatNumber)(balancesAll.accountNonce)
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "number",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressInfo, {
          address: address,
          balancesAll: balancesAll,
          withBalance: {
            available: false,
            bonded: false,
            locked: false,
            redeemable: false,
            reserved: false,
            total: true,
            unlocking: false,
            vested: false
          },
          withExtended: false
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "fast-actions",
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "fast-actions-row",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.LinkExternal, {
            className: "ui--AddressCard-exporer-link media--1400",
            data: address,
            isLogo: true,
            type: "address"
          }), (0, _util.isFunction)((_api$api$tx$balances = api.api.tx.balances) === null || _api$api$tx$balances === void 0 ? void 0 : _api$api$tx$balances.transfer) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
            className: "send-button",
            icon: "paper-plane",
            label: t('send'),
            onClick: toggleTransfer
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Popup, {
            className: `theme--${theme}`,
            isDisabled: !menuItems.length,
            value: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Menu, {
              children: menuItems
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.ExpandButton, {
            expanded: isExpanded,
            onClick: toggleIsExpanded
          })]
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
      className: `${className} ${isExpanded ? 'isExpanded' : 'isCollapsed'}`,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        colSpan: 2
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "tags",
          "data-testid": "tags",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Tags, {
            value: tags,
            withTitle: true
          })
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "media--1500"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {}), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressInfo, {
          address: address,
          balancesAll: balancesAll,
          withBalance: {
            available: true,
            bonded: true,
            locked: true,
            redeemable: true,
            reserved: true,
            total: false,
            unlocking: true,
            vested: true
          },
          withExtended: false
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        colSpan: 2
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Account).withConfig({
  displayName: "Account",
  componentId: "sc-qj9s1p-0"
})(["&.isCollapsed{visibility:collapse;}&.isExpanded{visibility:visible;}.tags{width:100%;min-height:1.5rem;}.devBadge{opacity:0.65;}&& td.button{padding-bottom:0.5rem;}&& td.fast-actions{padding-left:0.2rem;padding-right:1rem;width:1%;.fast-actions-row{display:flex;align-items:center;justify-content:flex-end;& > * + *{margin-left:0.35rem;}.send-button{min-width:6.5rem;}}}"]));

exports.default = _default;