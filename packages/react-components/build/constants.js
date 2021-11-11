// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
export let BitLengthOption;

(function (BitLengthOption) {
  BitLengthOption[BitLengthOption["CHAIN_SPEC"] = 128] = "CHAIN_SPEC";
  BitLengthOption[BitLengthOption["NORMAL_NUMBERS"] = 32] = "NORMAL_NUMBERS";
})(BitLengthOption || (BitLengthOption = {}));

export const ScreenSizes = {
  DESKTOP: 992,
  PHONE: 576,
  TABLET: 768
};
export const rewardDestinationOptions = [{
  text: 'Stash account (increase the amount at stake)',
  value: 0
}, {
  text: 'Stash account (do not increase the amount at stake)',
  value: 1
}, {
  text: 'Controller account',
  value: 2
}];