// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import BN from 'bn.js';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { AddressInfo, AddressSmall, Badge, Button, ChainLock, CryptoType, ExpandButton, Forget, Icon, IdentityIcon, LinkExternal, Menu, Popup, StatusContext, Tags } from '@axia-js/react-components';
import { useAccountInfo, useApi, useBalancesAll, useBestNumber, useCall, useLedger, useStakingInfo, useToggle } from '@axia-js/react-hooks';
import { keyring } from '@axia-js/ui-keyring';
import { BN_ZERO, formatBalance, formatNumber, isFunction } from '@axia-js/util';
import Backup from "../modals/Backup.js";
import ChangePass from "../modals/ChangePass.js";
import DelegateModal from "../modals/Delegate.js";
import Derive from "../modals/Derive.js";
import IdentityMain from "../modals/IdentityMain.js";
import IdentitySub from "../modals/IdentitySub.js";
import MultisigApprove from "../modals/MultisigApprove.js";
import ProxyOverview from "../modals/ProxyOverview.js";
import RecoverAccount from "../modals/RecoverAccount.js";
import RecoverSetup from "../modals/RecoverSetup.js";
import Transfer from "../modals/Transfer.js";
import UndelegateModal from "../modals/Undelegate.js";
import { useTranslation } from "../translate.js";
import { createMenuGroup } from "../util.js";
import useMultisigApprovals from "./useMultisigApprovals.js";
import useProxies from "./useProxies.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

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
    return BN_ZERO;
  }

  const filtered = stakingInfo.unlocking.filter(({
    remainingEras,
    value
  }) => value.gt(BN_ZERO) && remainingEras.gt(BN_ZERO)).map(unlock => unlock.value);
  const total = filtered.reduce((total, value) => total.iadd(value), new BN(0));
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
  } = useTranslation();
  const [isExpanded, toggleIsExpanded] = useToggle(false);
  const {
    theme
  } = useContext(ThemeContext);
  const {
    queueExtrinsic
  } = useContext(StatusContext);
  const api = useApi();
  const {
    getLedger
  } = useLedger();
  const bestNumber = useBestNumber();
  const balancesAll = useBalancesAll(address);
  const stakingInfo = useStakingInfo(address);
  const democracyLocks = useCall((_api$api$derive$democ = api.api.derive.democracy) === null || _api$api$derive$democ === void 0 ? void 0 : _api$api$derive$democ.locks, [address]);
  const recoveryInfo = useCall((_api$api$query$recove = api.api.query.recovery) === null || _api$api$query$recove === void 0 ? void 0 : _api$api$query$recove.recoverable, [address], transformRecovery);
  const multiInfos = useMultisigApprovals(address);
  const proxyInfo = useProxies(address);
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
  } = useAccountInfo(address);
  const [{
    democracyUnlockTx
  }, setUnlockableIds] = useState({
    democracyUnlockTx: null,
    ids: []
  });
  const [vestingVestTx, setVestingTx] = useState(null);
  const [isBackupOpen, toggleBackup] = useToggle();
  const [isDeriveOpen, toggleDerive] = useToggle();
  const [isForgetOpen, toggleForget] = useToggle();
  const [isIdentityMainOpen, toggleIdentityMain] = useToggle();
  const [isIdentitySubOpen, toggleIdentitySub] = useToggle();
  const [isMultisigOpen, toggleMultisig] = useToggle();
  const [isProxyOverviewOpen, toggleProxyOverview] = useToggle();
  const [isPasswordOpen, togglePassword] = useToggle();
  const [isRecoverAccountOpen, toggleRecoverAccount] = useToggle();
  const [isRecoverSetupOpen, toggleRecoverSetup] = useToggle();
  const [isTransferOpen, toggleTransfer] = useToggle();
  const [isDelegateOpen, toggleDelegate] = useToggle();
  const [isUndelegateOpen, toggleUndelegate] = useToggle();
  useEffect(() => {
    if (balancesAll) {
      var _stakingInfo$stakingL, _stakingInfo$redeemab, _api$api$tx$vesting;

      setBalance(address, {
        bonded: (_stakingInfo$stakingL = stakingInfo === null || stakingInfo === void 0 ? void 0 : stakingInfo.stakingLedger.active.unwrap()) !== null && _stakingInfo$stakingL !== void 0 ? _stakingInfo$stakingL : BN_ZERO,
        locked: balancesAll.lockedBalance,
        redeemable: (_stakingInfo$redeemab = stakingInfo === null || stakingInfo === void 0 ? void 0 : stakingInfo.redeemable) !== null && _stakingInfo$redeemab !== void 0 ? _stakingInfo$redeemab : BN_ZERO,
        total: balancesAll.freeBalance.add(balancesAll.reservedBalance),
        transferrable: balancesAll.availableBalance,
        unbonding: calcUnbonding(stakingInfo)
      });
      ((_api$api$tx$vesting = api.api.tx.vesting) === null || _api$api$tx$vesting === void 0 ? void 0 : _api$api$tx$vesting.vest) && setVestingTx(() => balancesAll.vestingLocked.isZero() ? null : api.api.tx.vesting.vest());
    }
  }, [address, api, balancesAll, setBalance, stakingInfo]);
  useEffect(() => {
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
  const isVisible = useMemo(() => calcVisible(filter, accName, tags), [accName, filter, tags]);

  const _onFavorite = useCallback(() => toggleFavorite(address), [address, toggleFavorite]);

  const _onForget = useCallback(() => {
    if (!address) {
      return;
    }

    const status = {
      account: address,
      action: 'forget'
    };

    try {
      keyring.forgetAccount(address);
      status.status = 'success';
      status.message = t('account forgotten');
    } catch (error) {
      status.status = 'error';
      status.message = error.message;
    }
  }, [address, t]);

  const _clearDemocracyLocks = useCallback(() => democracyUnlockTx && queueExtrinsic({
    accountId: address,
    extrinsic: democracyUnlockTx
  }), [address, democracyUnlockTx, queueExtrinsic]);

  const _vestingVest = useCallback(() => vestingVestTx && queueExtrinsic({
    accountId: address,
    extrinsic: vestingVestTx
  }), [address, queueExtrinsic, vestingVestTx]);

  const _showOnHardware = useCallback( // TODO: we should check the hardwareType from metadata here as well,
  // for now we are always assuming hardwareType === 'ledger'
  () => {
    showLedgerAddress(getLedger, meta).catch(error => {
      console.error(`ledger: ${error.message}`);
    });
  }, [getLedger, meta]);

  const menuItems = useMemo(() => {
    var _api$api$tx$identity, _api$api$tx$identity2, _api$api$tx$democracy, _api$api$tx$vesting2, _api$api$tx$recovery, _api$api$tx$multisig, _api$api$query$democr, _api$api$query$democr2, _api$api$query$proxy;

    return [createMenuGroup('identityGroup', [isFunction((_api$api$tx$identity = api.api.tx.identity) === null || _api$api$tx$identity === void 0 ? void 0 : _api$api$tx$identity.setIdentity) && !isHardware && /*#__PURE__*/_jsx(Menu.Item, {
      icon: "link",
      onClick: toggleIdentityMain,
      children: t('Set on-chain identity')
    }, 'identityMain'), isFunction((_api$api$tx$identity2 = api.api.tx.identity) === null || _api$api$tx$identity2 === void 0 ? void 0 : _api$api$tx$identity2.setSubs) && (identity === null || identity === void 0 ? void 0 : identity.display) && !isHardware && /*#__PURE__*/_jsx(Menu.Item, {
      icon: "vector-square",
      onClick: toggleIdentitySub,
      children: t('Set on-chain sub-identities')
    }, 'identitySub'), isFunction((_api$api$tx$democracy = api.api.tx.democracy) === null || _api$api$tx$democracy === void 0 ? void 0 : _api$api$tx$democracy.unlock) && democracyUnlockTx && /*#__PURE__*/_jsx(Menu.Item, {
      icon: "broom",
      onClick: _clearDemocracyLocks,
      children: t('Clear expired democracy locks')
    }, 'clearDemocracy'), isFunction((_api$api$tx$vesting2 = api.api.tx.vesting) === null || _api$api$tx$vesting2 === void 0 ? void 0 : _api$api$tx$vesting2.vest) && vestingVestTx && /*#__PURE__*/_jsx(Menu.Item, {
      icon: "unlock",
      onClick: _vestingVest,
      children: t('Unlock vested amount')
    }, 'vestingVest')], t('Identity')), createMenuGroup('deriveGroup', [!(isExternal || isHardware || isInjected || isMultisig) && /*#__PURE__*/_jsx(Menu.Item, {
      icon: "download",
      onClick: toggleDerive,
      children: t('Derive account via derivation path')
    }, 'deriveAccount'), isHardware && /*#__PURE__*/_jsx(Menu.Item, {
      icon: "eye",
      onClick: _showOnHardware,
      children: t('Show address on hardware device')
    }, 'showHwAddress')], t('Derive')), createMenuGroup('backupGroup', [!(isExternal || isHardware || isInjected || isMultisig || isDevelopment) && /*#__PURE__*/_jsx(Menu.Item, {
      icon: "database",
      onClick: toggleBackup,
      children: t('Create a backup file for this account')
    }, 'backupJson'), !(isExternal || isHardware || isInjected || isMultisig || isDevelopment) && /*#__PURE__*/_jsx(Menu.Item, {
      icon: "edit",
      onClick: togglePassword,
      children: t("Change this account's password")
    }, 'changePassword'), !(isInjected || isDevelopment) && /*#__PURE__*/_jsx(Menu.Item, {
      icon: "trash-alt",
      onClick: toggleForget,
      children: t('Forget this account')
    }, 'forgetAccount')], t('Backup')), isFunction((_api$api$tx$recovery = api.api.tx.recovery) === null || _api$api$tx$recovery === void 0 ? void 0 : _api$api$tx$recovery.createRecovery) && createMenuGroup('reoveryGroup', [!recoveryInfo && /*#__PURE__*/_jsx(Menu.Item, {
      icon: "redo",
      onClick: toggleRecoverSetup,
      children: t('Make recoverable')
    }, 'makeRecoverable'), /*#__PURE__*/_jsx(Menu.Item, {
      icon: "screwdriver",
      onClick: toggleRecoverAccount,
      children: t('Initiate recovery for another')
    }, 'initRecovery')], t('Recovery')), isFunction((_api$api$tx$multisig = api.api.tx.multisig) === null || _api$api$tx$multisig === void 0 ? void 0 : _api$api$tx$multisig.asMulti) && isMultisig && createMenuGroup('multisigGroup', [/*#__PURE__*/_jsx(Menu.Item, {
      disabled: !multiInfos || !multiInfos.length,
      icon: "file-signature",
      onClick: toggleMultisig,
      children: t('Multisig approvals')
    }, 'multisigApprovals')], t('Multisig')), isFunction((_api$api$query$democr = api.api.query.democracy) === null || _api$api$query$democr === void 0 ? void 0 : _api$api$query$democr.votingOf) && (delegation === null || delegation === void 0 ? void 0 : delegation.accountDelegated) && createMenuGroup('undelegateGroup', [/*#__PURE__*/_jsx(Menu.Item, {
      icon: "user-edit",
      onClick: toggleDelegate,
      children: t('Change democracy delegation')
    }, 'changeDelegate'), /*#__PURE__*/_jsx(Menu.Item, {
      icon: "user-minus",
      onClick: toggleUndelegate,
      children: t('Undelegate')
    }, 'undelegate')], t('Undelegate')), createMenuGroup('delegateGroup', [isFunction((_api$api$query$democr2 = api.api.query.democracy) === null || _api$api$query$democr2 === void 0 ? void 0 : _api$api$query$democr2.votingOf) && !(delegation !== null && delegation !== void 0 && delegation.accountDelegated) && /*#__PURE__*/_jsx(Menu.Item, {
      icon: "user-plus",
      onClick: toggleDelegate,
      children: t('Delegate democracy votes')
    }, 'delegate'), isFunction((_api$api$query$proxy = api.api.query.proxy) === null || _api$api$query$proxy === void 0 ? void 0 : _api$api$query$proxy.proxies) && /*#__PURE__*/_jsx(Menu.Item, {
      icon: "sitemap",
      onClick: toggleProxyOverview,
      children: proxy !== null && proxy !== void 0 && proxy[0].length ? t('Manage proxies') : t('Add proxy')
    }, 'proxy-overview')], t('Delegate')), isEditable && !api.isDevelopment && createMenuGroup('genesisGroup', [/*#__PURE__*/_jsx(ChainLock, {
      className: "accounts--network-toggle",
      genesisHash: genesisHash,
      onChange: onSetGenesisHash
    }, 'chainlock')])].filter(i => i);
  }, [_clearDemocracyLocks, _showOnHardware, _vestingVest, api, delegation, democracyUnlockTx, genesisHash, identity, isDevelopment, isEditable, isExternal, isHardware, isInjected, isMultisig, multiInfos, onSetGenesisHash, proxy, recoveryInfo, t, toggleBackup, toggleDelegate, toggleDerive, toggleForget, toggleIdentityMain, toggleIdentitySub, toggleMultisig, togglePassword, toggleProxyOverview, toggleRecoverAccount, toggleRecoverSetup, toggleUndelegate, vestingVestTx]);

  if (!isVisible) {
    return null;
  }

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs("tr", {
      className: `${className}${isExpanded ? ' noBorder' : ''}`,
      children: [/*#__PURE__*/_jsx("td", {
        className: "favorite",
        children: /*#__PURE__*/_jsx(Icon, {
          color: isFavorite ? 'orange' : 'gray',
          icon: "star",
          onClick: _onFavorite
        })
      }), /*#__PURE__*/_jsxs("td", {
        className: "together",
        children: [meta.genesisHash ? /*#__PURE__*/_jsx(Badge, {
          color: "transparent"
        }) : isDevelopment ? /*#__PURE__*/_jsx(Badge, {
          className: "devBadge",
          color: "orange",
          hover: t('This is a development account derived from the known development seed. Do not use for any funds on a non-development network.'),
          icon: "wrench"
        }) : /*#__PURE__*/_jsx(Badge, {
          color: "orange",
          hover: /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx("p", {
              children: t('This account is available on all networks. It is recommended to link to a specific network via the account options ("only this network" option) to limit availability. For accounts from an extension, set the network on the extension.')
            }), /*#__PURE__*/_jsx("p", {
              children: t('This does not send any transaction, rather is only sets the genesis in the account JSON.')
            })]
          }),
          icon: "exclamation-triangle"
        }), recoveryInfo && /*#__PURE__*/_jsx(Badge, {
          color: "green",
          hover: /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx("p", {
              children: t('This account is recoverable, with the following friends:')
            }), /*#__PURE__*/_jsx("div", {
              children: recoveryInfo.friends.map((friend, index) => /*#__PURE__*/_jsx(IdentityIcon, {
                value: friend
              }, index))
            }), /*#__PURE__*/_jsx("table", {
              children: /*#__PURE__*/_jsxs("tbody", {
                children: [/*#__PURE__*/_jsxs("tr", {
                  children: [/*#__PURE__*/_jsx("td", {
                    children: t('threshold')
                  }), /*#__PURE__*/_jsx("td", {
                    children: formatNumber(recoveryInfo.threshold)
                  })]
                }), /*#__PURE__*/_jsxs("tr", {
                  children: [/*#__PURE__*/_jsx("td", {
                    children: t('delay')
                  }), /*#__PURE__*/_jsx("td", {
                    children: formatNumber(recoveryInfo.delayPeriod)
                  })]
                }), /*#__PURE__*/_jsxs("tr", {
                  children: [/*#__PURE__*/_jsx("td", {
                    children: t('deposit')
                  }), /*#__PURE__*/_jsx("td", {
                    children: formatBalance(recoveryInfo.deposit)
                  })]
                })]
              })
            })]
          }),
          icon: "shield"
        }), multiInfos && multiInfos.length !== 0 && /*#__PURE__*/_jsx(Badge, {
          color: "red",
          hover: t('Multisig approvals pending'),
          info: multiInfos.length
        }), isProxied && !proxyInfo.hasOwned && /*#__PURE__*/_jsx(Badge, {
          color: "red",
          hover: t('Proxied account has no owned proxies'),
          info: "0"
        }), (delegation === null || delegation === void 0 ? void 0 : delegation.accountDelegated) && /*#__PURE__*/_jsx(Badge, {
          color: "blue",
          hover: t('This account has a governance delegation'),
          icon: "calendar-check",
          onClick: toggleDelegate
        }), !!(proxy !== null && proxy !== void 0 && proxy[0].length) && api.api.tx.utility && /*#__PURE__*/_jsx(Badge, {
          color: "blue",
          hover: t('This account has {{proxyNumber}} proxy set.', {
            replace: {
              proxyNumber: proxy[0].length
            }
          }),
          icon: "arrow-right",
          onClick: toggleProxyOverview
        })]
      }), /*#__PURE__*/_jsxs("td", {
        className: "address",
        children: [/*#__PURE__*/_jsx(AddressSmall, {
          parentAddress: meta.parentAddress,
          value: address,
          withShortAddress: true
        }), isBackupOpen && /*#__PURE__*/_jsx(Backup, {
          address: address,
          onClose: toggleBackup
        }, 'modal-backup-account'), isDelegateOpen && /*#__PURE__*/_jsx(DelegateModal, {
          onClose: toggleDelegate,
          previousAmount: delegation === null || delegation === void 0 ? void 0 : delegation.amount,
          previousConviction: delegation === null || delegation === void 0 ? void 0 : delegation.conviction,
          previousDelegatedAccount: delegation === null || delegation === void 0 ? void 0 : delegation.accountDelegated,
          previousDelegatingAccount: address
        }, 'modal-delegate'), isDeriveOpen && /*#__PURE__*/_jsx(Derive, {
          from: address,
          onClose: toggleDerive
        }, 'modal-derive-account'), isForgetOpen && /*#__PURE__*/_jsx(Forget, {
          address: address,
          onClose: toggleForget,
          onForget: _onForget
        }, 'modal-forget-account'), isIdentityMainOpen && /*#__PURE__*/_jsx(IdentityMain, {
          address: address,
          onClose: toggleIdentityMain
        }, 'modal-identity-main'), isIdentitySubOpen && /*#__PURE__*/_jsx(IdentitySub, {
          address: address,
          onClose: toggleIdentitySub
        }, 'modal-identity-sub'), isPasswordOpen && /*#__PURE__*/_jsx(ChangePass, {
          address: address,
          onClose: togglePassword
        }, 'modal-change-pass'), isTransferOpen && /*#__PURE__*/_jsx(Transfer, {
          onClose: toggleTransfer,
          senderId: address
        }, 'modal-transfer'), isProxyOverviewOpen && /*#__PURE__*/_jsx(ProxyOverview, {
          onClose: toggleProxyOverview,
          previousProxy: proxy,
          proxiedAccount: address
        }, 'modal-proxy-overview'), isMultisigOpen && multiInfos && /*#__PURE__*/_jsx(MultisigApprove, {
          address: address,
          onClose: toggleMultisig,
          ongoing: multiInfos,
          threshold: meta.threshold,
          who: meta.who
        }, 'multisig-approve'), isRecoverAccountOpen && /*#__PURE__*/_jsx(RecoverAccount, {
          address: address,
          onClose: toggleRecoverAccount
        }, 'recover-account'), isRecoverSetupOpen && /*#__PURE__*/_jsx(RecoverSetup, {
          address: address,
          onClose: toggleRecoverSetup
        }, 'recover-setup'), isUndelegateOpen && /*#__PURE__*/_jsx(UndelegateModal, {
          accountDelegating: address,
          onClose: toggleUndelegate
        }, 'modal-delegate')]
      }), /*#__PURE__*/_jsx("td", {
        className: "number",
        children: /*#__PURE__*/_jsx(CryptoType, {
          accountId: address
        })
      }), /*#__PURE__*/_jsx("td", {
        className: "number media--1500",
        children: (balancesAll === null || balancesAll === void 0 ? void 0 : balancesAll.accountNonce.gt(BN_ZERO)) && formatNumber(balancesAll.accountNonce)
      }), /*#__PURE__*/_jsx("td", {
        className: "number",
        children: /*#__PURE__*/_jsx(AddressInfo, {
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
      }), /*#__PURE__*/_jsx("td", {
        className: "fast-actions",
        children: /*#__PURE__*/_jsxs("div", {
          className: "fast-actions-row",
          children: [/*#__PURE__*/_jsx(LinkExternal, {
            className: "ui--AddressCard-exporer-link media--1400",
            data: address,
            isLogo: true,
            type: "address"
          }), isFunction((_api$api$tx$balances = api.api.tx.balances) === null || _api$api$tx$balances === void 0 ? void 0 : _api$api$tx$balances.transfer) && /*#__PURE__*/_jsx(Button, {
            className: "send-button",
            icon: "paper-plane",
            label: t('send'),
            onClick: toggleTransfer
          }), /*#__PURE__*/_jsx(Popup, {
            className: `theme--${theme}`,
            isDisabled: !menuItems.length,
            value: /*#__PURE__*/_jsx(Menu, {
              children: menuItems
            })
          }), /*#__PURE__*/_jsx(ExpandButton, {
            expanded: isExpanded,
            onClick: toggleIsExpanded
          })]
        })
      })]
    }), /*#__PURE__*/_jsxs("tr", {
      className: `${className} ${isExpanded ? 'isExpanded' : 'isCollapsed'}`,
      children: [/*#__PURE__*/_jsx("td", {
        colSpan: 2
      }), /*#__PURE__*/_jsx("td", {
        children: /*#__PURE__*/_jsx("div", {
          className: "tags",
          "data-testid": "tags",
          children: /*#__PURE__*/_jsx(Tags, {
            value: tags,
            withTitle: true
          })
        })
      }), /*#__PURE__*/_jsx("td", {
        className: "media--1500"
      }), /*#__PURE__*/_jsx("td", {}), /*#__PURE__*/_jsx("td", {
        children: /*#__PURE__*/_jsx(AddressInfo, {
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
      }), /*#__PURE__*/_jsx("td", {
        colSpan: 2
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Account).withConfig({
  displayName: "Account",
  componentId: "sc-qj9s1p-0"
})(["&.isCollapsed{visibility:collapse;}&.isExpanded{visibility:visible;}.tags{width:100%;min-height:1.5rem;}.devBadge{opacity:0.65;}&& td.button{padding-bottom:0.5rem;}&& td.fast-actions{padding-left:0.2rem;padding-right:1rem;width:1%;.fast-actions-row{display:flex;align-items:center;justify-content:flex-end;& > * + *{margin-left:0.35rem;}.send-button{min-width:6.5rem;}}}"]));