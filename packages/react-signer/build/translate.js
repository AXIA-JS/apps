// Copyright 2017-2021 @axia-js/react-signer authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useTranslation as useTranslationBase, withTranslation } from 'react-i18next';
export function useTranslation() {
  return useTranslationBase('react-signer');
}
export default withTranslation(['react-signer']);