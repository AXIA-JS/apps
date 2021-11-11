// Copyright 2017-2021 @axia-js/app-contracts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useTranslation as useTranslationBase, withTranslation } from 'react-i18next';
export function useTranslation() {
  return useTranslationBase('app-contracts');
}
export default withTranslation(['app-contracts']);