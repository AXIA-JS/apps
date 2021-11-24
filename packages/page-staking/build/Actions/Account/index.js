// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useContext, useMemo } from 'react';
import styled from 'styled-components';
import { AddressInfo, AddressMini, AddressSmall, Badge, Button, Menu, Popup, StakingBonded, StakingRedeemable, StakingUnbonding, StatusContext, TxButton } from '@axia-js/react-components';
import { useApi, useCall, useToggle } from '@axia-js/react-hooks';
import { formatNumber, isFunction } from '@axia-js/util';
import { useTranslation } from "../../translate.js";
import BondExtra from "./BondExtra.js";
import InjectKeys from "./InjectKeys.js";
import KickNominees from "./KickNominees.js";
import ListNominees from "./ListNominees.js";
import Nominate from "./Nominate.js";
import SetControllerAccount from "./SetControllerAccount.js";
import SetRewardDestination from "./SetRewardDestination.js";
import SetSessionKey from "./SetSessionKey.js";
import Unbond from "./Unbond.js";
import Validate from "./Validate.js";
import WarnBond from "./WarnBond.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function extractSlashes(stashId, allSlashes = []) {
  return allSlashes.map(([era, all]) => ({
    era,
    slashes: all.filter(({
      others,
      validator
    }) => validator.eq(stashId) || others.some(([nominatorId]) => nominatorId.eq(stashId)))
  })).filter(({
    slashes
  }) => slashes.length);
}

const transformSpan = {
  transform: optSpans => optSpans.isNone ? 0 : optSpans.unwrap().prior.length + 1
};

function useStashCalls(api, stashId) {
  var _api$derive$balances;

  const params = useMemo(() => [stashId], [stashId]);
  const balancesAll = useCall((_api$derive$balances = api.derive.balances) === null || _api$derive$balances === void 0 ? void 0 : _api$derive$balances.all, params);
  const spanCount = useCall(api.query.staking.slashingSpans, params, transformSpan);
  const stakingAccount = useCall(api.derive.staking.account, params);
  return {
    balancesAll,
    spanCount,
    stakingAccount
  };
}

function Account({
  allSlashes,
  className = '',
  info: {
    controllerId,
    destination,
    hexSessionIdNext,
    hexSessionIdQueue,
    isLoading,
    isOwnController,
    isOwnStash,
    isStashNominating,
    isStashValidating,
    nominating,
    sessionIds,
    stakingLedger,
    stashId
  },
  isDisabled,
  targets
}) {
  var _stakingAccount$staki, _stakingAccount$staki2, _targets$validators;

  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const {
    queueExtrinsic
  } = useContext(StatusContext);
  const [isBondExtraOpen, toggleBondExtra] = useToggle();
  const [isInjectOpen, toggleInject] = useToggle();
  const [isKickOpen, toggleKick] = useToggle();
  const [isNominateOpen, toggleNominate] = useToggle();
  const [isRewardDestinationOpen, toggleRewardDestination] = useToggle();
  const [isSetControllerOpen, toggleSetController] = useToggle();
  const [isSetSessionOpen, toggleSetSession] = useToggle();
  const [isUnbondOpen, toggleUnbond] = useToggle();
  const [isValidateOpen, toggleValidate] = useToggle();
  const {
    balancesAll,
    spanCount,
    stakingAccount
  } = useStashCalls(api, stashId);
  const slashes = useMemo(() => extractSlashes(stashId, allSlashes), [allSlashes, stashId]);
  const withdrawFunds = useCallback(() => {
    queueExtrinsic({
      accountId: controllerId,
      extrinsic: api.tx.staking.withdrawUnbonded.meta.args.length === 1 ? api.tx.staking.withdrawUnbonded(spanCount || 0) // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore (We are doing toHex here since we have a Vec<u8> input)
      : api.tx.staking.withdrawUnbonded()
    });
  }, [api, controllerId, queueExtrinsic, spanCount]);
  const hasBonded = !!(stakingAccount !== null && stakingAccount !== void 0 && stakingAccount.stakingLedger) && !((_stakingAccount$staki = stakingAccount.stakingLedger.active) !== null && _stakingAccount$staki !== void 0 && _stakingAccount$staki.isEmpty);
  return /*#__PURE__*/_jsxs("tr", {
    className: className,
    children: [/*#__PURE__*/_jsx("td", {
      className: "badge together",
      children: slashes.length !== 0 && /*#__PURE__*/_jsx(Badge, {
        color: "red",
        hover: t('Slashed in era {{eras}}', {
          replace: {
            eras: slashes.map(({
              era
            }) => formatNumber(era)).join(', ')
          }
        }),
        icon: "skull-crossbones"
      })
    }), /*#__PURE__*/_jsxs("td", {
      className: "address",
      children: [/*#__PURE__*/_jsx(AddressSmall, {
        value: stashId
      }), isBondExtraOpen && /*#__PURE__*/_jsx(BondExtra, {
        controllerId: controllerId,
        onClose: toggleBondExtra,
        stakingInfo: stakingAccount,
        stashId: stashId
      }), isInjectOpen && /*#__PURE__*/_jsx(InjectKeys, {
        onClose: toggleInject
      }), isKickOpen && controllerId && /*#__PURE__*/_jsx(KickNominees, {
        controllerId: controllerId,
        onClose: toggleKick,
        stashId: stashId
      }), isNominateOpen && controllerId && /*#__PURE__*/_jsx(Nominate, {
        controllerId: controllerId,
        nominating: nominating,
        onClose: toggleNominate,
        stashId: stashId,
        targets: targets
      }), isSetControllerOpen && controllerId && /*#__PURE__*/_jsx(SetControllerAccount, {
        defaultControllerId: controllerId,
        onClose: toggleSetController,
        stashId: stashId
      }), isRewardDestinationOpen && controllerId && /*#__PURE__*/_jsx(SetRewardDestination, {
        controllerId: controllerId,
        defaultDestination: destination,
        onClose: toggleRewardDestination,
        stashId: stashId
      }), isSetSessionOpen && controllerId && /*#__PURE__*/_jsx(SetSessionKey, {
        controllerId: controllerId,
        onClose: toggleSetSession,
        stashId: stashId
      }), isUnbondOpen && /*#__PURE__*/_jsx(Unbond, {
        controllerId: controllerId,
        onClose: toggleUnbond,
        stakingLedger: stakingLedger,
        stashId: stashId
      }), isValidateOpen && controllerId && /*#__PURE__*/_jsx(Validate, {
        controllerId: controllerId,
        onClose: toggleValidate,
        stashId: stashId
      })]
    }), /*#__PURE__*/_jsx("td", {
      className: "address",
      children: /*#__PURE__*/_jsx(AddressMini, {
        value: controllerId
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "start media--1200",
      children: destination !== null && destination !== void 0 && destination.isAccount ? /*#__PURE__*/_jsx(AddressMini, {
        value: destination.asAccount
      }) : destination === null || destination === void 0 ? void 0 : destination.toString()
    }), /*#__PURE__*/_jsxs("td", {
      className: "number",
      children: [/*#__PURE__*/_jsx(StakingBonded, {
        stakingInfo: stakingAccount
      }), /*#__PURE__*/_jsx(StakingUnbonding, {
        stakingInfo: stakingAccount
      }), /*#__PURE__*/_jsx(StakingRedeemable, {
        stakingInfo: stakingAccount
      })]
    }), isStashValidating ? /*#__PURE__*/_jsxs("td", {
      className: "all",
      children: [/*#__PURE__*/_jsx(AddressInfo, {
        address: stashId,
        withBalance: false,
        withHexSessionId: hexSessionIdNext !== '0x' && [hexSessionIdQueue, hexSessionIdNext],
        withValidatorPrefs: true
      }), /*#__PURE__*/_jsx(WarnBond, {
        minBond: targets.minValidatorBond,
        stakingInfo: stakingAccount
      })]
    }) : /*#__PURE__*/_jsx("td", {
      className: "all expand left",
      children: isStashNominating && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(ListNominees, {
          nominating: nominating,
          stashId: stashId
        }), /*#__PURE__*/_jsx(WarnBond, {
          minBond: targets.minNominatorBond,
          stakingInfo: stakingAccount
        })]
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "button",
      children: !isLoading && /*#__PURE__*/_jsxs(_Fragment, {
        children: [isStashNominating || isStashValidating ? /*#__PURE__*/_jsx(TxButton, {
          accountId: controllerId,
          icon: "stop",
          isDisabled: !isOwnController || isDisabled,
          label: t('Stop'),
          tx: api.tx.staking.chill
        }, 'stop') : /*#__PURE__*/_jsxs(Button.Group, {
          children: [!sessionIds.length || hexSessionIdNext === '0x' ? /*#__PURE__*/_jsx(Button, {
            icon: "sign-in-alt",
            isDisabled: !isOwnController || isDisabled,
            label: t('Session Key'),
            onClick: toggleSetSession
          }, 'set') : /*#__PURE__*/_jsx(Button, {
            icon: "certificate",
            isDisabled: !isOwnController || isDisabled || !hasBonded,
            label: t('Validate'),
            onClick: toggleValidate
          }, 'validate'), /*#__PURE__*/_jsx(Button, {
            icon: "hand-paper",
            isDisabled: !isOwnController || isDisabled || !hasBonded,
            label: t('Nominate'),
            onClick: toggleNominate
          }, 'nominate')]
        }), /*#__PURE__*/_jsx(Popup, {
          isDisabled: isDisabled,
          value: /*#__PURE__*/_jsxs(Menu, {
            children: [/*#__PURE__*/_jsx(Menu.Item, {
              disabled: !isOwnStash || !(balancesAll !== null && balancesAll !== void 0 && balancesAll.freeBalance.gtn(0)),
              onClick: toggleBondExtra,
              children: t('Bond more funds')
            }), /*#__PURE__*/_jsx(Menu.Item, {
              disabled: !isOwnController || !stakingAccount || !stakingAccount.stakingLedger || ((_stakingAccount$staki2 = stakingAccount.stakingLedger.active) === null || _stakingAccount$staki2 === void 0 ? void 0 : _stakingAccount$staki2.isEmpty),
              onClick: toggleUnbond,
              children: t('Unbond funds')
            }), /*#__PURE__*/_jsx(Menu.Item, {
              disabled: !isOwnController || !stakingAccount || !stakingAccount.redeemable || !stakingAccount.redeemable.gtn(0),
              onClick: withdrawFunds,
              children: t('Withdraw unbonded funds')
            }), /*#__PURE__*/_jsx(Menu.Divider, {}), /*#__PURE__*/_jsx(Menu.Item, {
              disabled: !isOwnStash,
              onClick: toggleSetController,
              children: t('Change controller account')
            }), /*#__PURE__*/_jsx(Menu.Item, {
              disabled: !isOwnController,
              onClick: toggleRewardDestination,
              children: t('Change reward destination')
            }), isStashValidating && /*#__PURE__*/_jsxs(_Fragment, {
              children: [/*#__PURE__*/_jsx(Menu.Item, {
                disabled: !isOwnController,
                onClick: toggleValidate,
                children: t('Change validator preferences')
              }), isFunction(api.tx.staking.kick) && /*#__PURE__*/_jsx(Menu.Item, {
                disabled: !isOwnController,
                onClick: toggleKick,
                children: t('Remove nominees')
              })]
            }), /*#__PURE__*/_jsx(Menu.Divider, {}), !isStashNominating && /*#__PURE__*/_jsx(Menu.Item, {
              disabled: !isOwnController,
              onClick: toggleSetSession,
              children: t('Change session keys')
            }), isStashNominating && /*#__PURE__*/_jsx(Menu.Item, {
              disabled: !isOwnController || !((_targets$validators = targets.validators) !== null && _targets$validators !== void 0 && _targets$validators.length),
              onClick: toggleNominate,
              children: t('Set nominees')
            }), !isStashNominating && /*#__PURE__*/_jsx(Menu.Item, {
              onClick: toggleInject,
              children: t('Inject session keys (advanced)')
            })]
          })
        }, 'settings')]
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Account).withConfig({
  displayName: "Account",
  componentId: "sc-1xqmqg1-0"
})([".ui--Button-Group{display:inline-block;margin-right:0.25rem;vertical-align:inherit;}"]));