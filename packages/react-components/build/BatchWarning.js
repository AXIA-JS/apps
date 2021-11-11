// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { MarkWarning } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import { isFunction } from '@axia-js/util';
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";

function BatchWarning() {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();

  if (isFunction(api.tx.utility.batchAll)) {
    return null;
  }

  return /*#__PURE__*/_jsx(MarkWarning, {
    content: t('This chain does not yet support atomic batch operations. This means that if the transaction gets executed and one of the operations do fail (due to invalid data or lack of available funds) some of the changes made may not be applied.')
  });
}

export default /*#__PURE__*/React.memo(BatchWarning);