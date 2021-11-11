// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useCallback, useEffect, useState } from 'react';
export function useScroll() {
  const [scrollY, setScrollY] = useState(window.pageYOffset);
  const setYOffset = useCallback(() => setScrollY(window.pageYOffset), []);
  useEffect(() => {
    function watchScroll() {
      window.addEventListener('scroll', setYOffset);
    }

    watchScroll();
    return () => {
      window.removeEventListener('scroll', setYOffset);
    };
  }, [setYOffset]);
  return scrollY;
}