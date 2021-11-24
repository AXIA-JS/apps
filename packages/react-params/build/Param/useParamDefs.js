// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useEffect, useState } from 'react';
import { getTypeDef } from '@axia-js/types/create';

function expandDef(registry, td) {
  try {
    return getTypeDef(registry.createType(td.type).toRawType());
  } catch (e) {
    return td;
  }
}

export default function useParamDefs(registry, type) {
  const [params, setParams] = useState([]);
  useEffect(() => {
    const typeDef = expandDef(registry, type);

    if (!typeDef.sub) {
      return setParams([]);
    }

    setParams((Array.isArray(typeDef.sub) ? typeDef.sub : [typeDef.sub]).map(td => ({
      length: typeDef.length,
      name: td.name,
      type: td // expandDef(td)

    })));
  }, [registry, type]);
  return params;
}