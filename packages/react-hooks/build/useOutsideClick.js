// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useCallback, useEffect } from 'react';

function getClickedElement(refs, e) {
  return refs.find(ref => ref.current && ref.current.contains(e.target));
}

export const useOutsideClick = (elements, callback) => {
  const handleClick = useCallback(e => {
    if (elements.length && !getClickedElement(elements, e)) {
      callback();
    }
  }, [elements, callback]);
  useEffect(() => {
    document.addEventListener('click', handleClick, true);
    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [handleClick, callback]);
};