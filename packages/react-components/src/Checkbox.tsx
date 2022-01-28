// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback } from 'react';
import styled from 'styled-components';

import Icon from './Icon';

interface Props {
  className?: string;
  isDisabled?: boolean;
  label: React.ReactNode;
  onChange?: (isChecked: boolean) => void;
  value?: boolean;
}

function Checkbox ({ className = '', isDisabled, label, onChange, value }: Props): React.ReactElement<Props> {
  const _onClick = useCallback(
    (): void => {
      !isDisabled && onChange && onChange(!value);
    },
    [isDisabled, onChange, value]
  );

  return (
    <div
      className={`ui--Checkbox${isDisabled ? ' isDisabled' : ''} ${className}`}
      onClick={_onClick}
    >
      <Icon
        color={value ? 'normal' : 'none'}
        icon='check-square'
      />
      {label && <label>{label}</label>}
    </div>
  );
}

export default React.memo(styled(Checkbox)`
  display: inline-block;
  cursor: pointer;

  &.isDisabled {
    opacity: 0.5;
  }

  &:not(.isDisabled) {
    cursor: pointer;
  }

  > label {
    color: var(--color-text);
    display: inline-block;
    margin: 0 0.5rem;
    opacity: 1;
    cursor: pointer;
    user-select: none;
  }

  > label,
  > .ui--Icon {
    vertical-align: middle;
  }

  .ui--Icon {
    color:#178FE1;
    font-size:21px;
  }
`);
