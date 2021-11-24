// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { keyring } from '@axia-js/ui-keyring';
import { isFunction } from '@axia-js/util';
export function checkVisibility(api, address, accountInfo, filterName = '', onlyNamed = false) {
  let isVisible = false;
  const filterLower = filterName.toLowerCase();

  if (filterLower || onlyNamed) {
    if (accountInfo) {
      var _api$query$identity;

      const {
        accountId,
        accountIndex,
        identity,
        nickname
      } = accountInfo;

      if (!onlyNamed && (accountId !== null && accountId !== void 0 && accountId.toString().includes(filterName) || accountIndex !== null && accountIndex !== void 0 && accountIndex.toString().includes(filterName))) {
        isVisible = true;
      } else if (isFunction((_api$query$identity = api.query.identity) === null || _api$query$identity === void 0 ? void 0 : _api$query$identity.identityOf)) {
        isVisible = !!(identity !== null && identity !== void 0 && identity.display) && identity.display.toLowerCase().includes(filterLower) || !!(identity !== null && identity !== void 0 && identity.displayParent) && identity.displayParent.toLowerCase().includes(filterLower);
      } else if (nickname) {
        isVisible = nickname.toLowerCase().includes(filterLower);
      }
    }

    if (!isVisible) {
      var _account$meta;

      const account = keyring.getAddress(address);
      isVisible = account !== null && account !== void 0 && (_account$meta = account.meta) !== null && _account$meta !== void 0 && _account$meta.name ? account.meta.name.toLowerCase().includes(filterLower) : false;
    }
  } else {
    isVisible = true;
  }

  return isVisible;
}