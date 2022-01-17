// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ConstantCodec } from '@axia-js/types/metadata/decorate/types';
import type { DropdownOptions } from '../util/types';
import type { ConstValue, ConstValueBase } from './types';

import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { ApiPromise } from '@axia-js/api';
import { useApi } from '@axia-js/react-hooks';

import LinkedWrapper from '../InputExtrinsic/LinkedWrapper';
import keyOptions from './options/key';
import sectionOptions from './options/section';
import SelectKey from './SelectKey';
import SelectSection from './SelectSection';

interface Props {
  className?: string;
  defaultValue: ConstValueBase;
  help?: React.ReactNode;
  isError?: boolean;
  label: React.ReactNode;
  onChange?: (value: ConstValue) => void;
  withLabel?: boolean;
}

function getValue (api: ApiPromise, { method, section }: ConstValueBase): ConstValue {
  const firstSec = Object.keys(api.consts)[0];
  const firstMet = Object.keys(api.consts[firstSec])[0];
  const value = (api.consts[section] && api.consts[section][method])
    ? { method, section }
    : { method: firstMet, section: firstSec };

  return {
    ...value,
    meta: (api.consts[value.section][value.method] as ConstantCodec).meta
  };
}

function InputConsts ({ className = '', defaultValue, help, label, onChange, withLabel }: Props): React.ReactElement<Props> {
  const { api } = useApi();
  const [optionsMethod, setOptionsMethod] = useState<DropdownOptions>(() => keyOptions(api, defaultValue.section));
  const [optionsSection] = useState<DropdownOptions>(() => sectionOptions(api));
  const [value, setValue] = useState<ConstValue>(() => getValue(api, defaultValue));

  const _onKeyChange = useCallback(
    (newValue: ConstValueBase): void => {
      if (value.section === newValue.section && value.method === newValue.method) {
        return;
      }

      const { method, section } = newValue;
      const meta = (api.consts[section][method] as ConstantCodec).meta;
      const updated = { meta, method, section };

      setValue(updated);
      onChange && onChange(updated);
    },
    [api, onChange, value]
  );

  const _onSectionChange = useCallback(
    (section: string): void => {
      if (section === value.section) {
        return;
      }

      const optionsMethod = keyOptions(api, section);

      setOptionsMethod(optionsMethod);
      _onKeyChange({ method: optionsMethod[0].value, section });
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
        onChange={_onSectionChange}
        options={optionsSection}
        value={value}
      />
      <SelectKey
        className='large CustomLarge'
        onChange={_onKeyChange}
        options={optionsMethod}
        value={value}
      />
    </LinkedWrapper>
  );
}

export default React.memo(styled(InputConsts)`
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
