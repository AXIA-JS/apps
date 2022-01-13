// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { SubmittableExtrinsicFunction } from '@axia-js/api/types';
import type { DropdownOptions } from '../util/types';

import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { useApi } from '@axia-js/react-hooks';

import methodOptions from './options/method';
import sectionOptions from './options/section';
import LinkedWrapper from './LinkedWrapper';
import SelectMethod from './SelectMethod';
import SelectSection from './SelectSection';

interface Props {
  className?: string;
  defaultValue: SubmittableExtrinsicFunction<'promise'>;
  help?: React.ReactNode;
  isDisabled?: boolean;
  isError?: boolean;
  isPrivate?: boolean;
  label: React.ReactNode;
  onChange?: (value: SubmittableExtrinsicFunction<'promise'>) => void;
  withLabel?: boolean;
}

function InputExtrinsic ({ className = '', defaultValue, help, isDisabled, label, onChange, withLabel }: Props): React.ReactElement<Props> {
  const { api } = useApi();
  const [optionsMethod, setOptionsMethod] = useState<DropdownOptions>(() => methodOptions(api, defaultValue.section));
  const [optionsSection] = useState<DropdownOptions>(() => sectionOptions(api));
  const [value, setValue] = useState<SubmittableExtrinsicFunction<'promise'>>((): SubmittableExtrinsicFunction<'promise'> => defaultValue);

  const _onKeyChange = useCallback(
    (newValue: SubmittableExtrinsicFunction<'promise'>): void => {
      if (value.section === newValue.section && value.method === newValue.method) {
        return;
      }

      // set this via callback, since the we are setting a function (alternatively... we have issues)
      setValue((): SubmittableExtrinsicFunction<'promise'> => newValue);
      onChange && onChange(newValue);
    },
    [onChange, value]
  );

  const _onSectionChange = useCallback(
    (section: string): void => {
      if (section === value.section) {
        return;
      }

      const optionsMethod = methodOptions(api, section);

      setOptionsMethod(optionsMethod);
      _onKeyChange(api.tx[section][optionsMethod[0].value]);
    },
    [_onKeyChange, api, value]
  );

  return (
    <LinkedWrapper
      className={className}
      help={help}
      label={label}
      withLabel={withLabel}
    >
      <SelectSection
        className='small CustomSmall'
        defaultValue={isDisabled ? value.section : undefined}
        isDisabled={isDisabled}
        onChange={isDisabled ? undefined : _onSectionChange}
        options={optionsSection}
        value={value}
      />
      <SelectMethod
        api={api}
        className='large CustomLarge'
        defaultValue={isDisabled ? value.method : undefined}
        isDisabled={isDisabled}
        onChange={isDisabled ? undefined : _onKeyChange}
        options={optionsMethod}
        value={value}
      />
    </LinkedWrapper>
  );
}

export default React.memo(styled(InputExtrinsic)`
  .CustomSmall .ui.selection.dropdown{
    border: 2px solid #B1B5C4;
    border-radius: 12px 0px 0px 12px !important;
    border-right-style: inset !important;
  }
  .CustomLarge .ui.selection.dropdown{
    border: 2px solid #B1B5C4;
    border-radius: 0px 12px 12px 0px !important;
    border-left-style: 0 !important;
  }
`);
