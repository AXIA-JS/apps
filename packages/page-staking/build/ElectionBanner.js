// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { MarkWarning } from '@axia-js/react-components';
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";

function ElectionBanner({
  isInElection
}) {
  const {
    t
  } = useTranslation();

  if (!isInElection) {
    return null;
  }

  return /*#__PURE__*/_jsx(MarkWarning, {
    className: "warning centered",
    content: t('There is currently an ongoing election for new validator candidates. As such staking operations are not permitted.')
  });
}

export default /*#__PURE__*/React.memo(ElectionBanner);