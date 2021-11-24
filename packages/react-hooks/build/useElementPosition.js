// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useEffect, useState } from 'react';
import { useScroll } from '@axia-js/react-hooks/useScroll';
import { useWindowSize } from '@axia-js/react-hooks/useWindowSize';
export function useElementPosition(ref) {
  const [elementPosition, setElementPosition] = useState();
  const windowSize = useWindowSize();
  const scrollY = useScroll();
  useEffect(() => {
    if (ref && ref.current) {
      var _ref$current;

      const {
        height,
        width,
        x,
        y
      } = (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.getBoundingClientRect();
      setElementPosition({
        height,
        width,
        x,
        y
      });
    }
  }, [ref, scrollY, windowSize]);
  return elementPosition;
}