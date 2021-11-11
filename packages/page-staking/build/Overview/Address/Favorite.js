// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Icon } from '@axia-js/react-components';
import { jsx as _jsx } from "react/jsx-runtime";

function Favorite({
  address,
  className,
  isFavorite,
  toggleFavorite
}) {
  const _onFavorite = useCallback(() => toggleFavorite(address), [address, toggleFavorite]);

  return /*#__PURE__*/_jsx(Icon, {
    className: className,
    color: isFavorite ? 'orange' : 'gray',
    icon: "star",
    onClick: _onFavorite
  });
}

export default /*#__PURE__*/React.memo(styled(Favorite).withConfig({
  displayName: "Favorite",
  componentId: "sc-suvosu-0"
})(["margin-right:1rem;"]));