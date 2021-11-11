// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect } from 'react';
import CurrentList from "./CurrentList.js";
import { jsx as _jsx } from "react/jsx-runtime";

function Overview({
  className = '',
  favorites,
  hasQueries,
  isIntentions,
  paraValidators,
  stakingOverview,
  targets,
  toggleFavorite,
  toggleLedger
}) {
  useEffect(() => {
    toggleLedger && toggleLedger();
  }, [toggleLedger]);
  return /*#__PURE__*/_jsx("div", {
    className: `staking--Overview ${className}`,
    children: /*#__PURE__*/_jsx(CurrentList, {
      favorites: favorites,
      hasQueries: hasQueries,
      isIntentions: isIntentions,
      paraValidators: paraValidators,
      stakingOverview: stakingOverview,
      targets: targets,
      toggleFavorite: toggleFavorite
    })
  });
}

export default /*#__PURE__*/React.memo(Overview);