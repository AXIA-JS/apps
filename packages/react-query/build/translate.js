// Copyright 2017-2021 @axia-js/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useTranslation as useTranslationBase, withTranslation } from 'react-i18next';
export function useTranslation() {
  return useTranslationBase('react-query');
}
export default withTranslation(['react-query']);