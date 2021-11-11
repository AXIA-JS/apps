// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useEffect, useState } from 'react';
import { getPosition } from '@axia-js/react-components/Popup/utils';
import { useElementPosition } from "./useElementPosition.js";
import { useScroll } from "./useScroll.js";
import { useWindowSize } from "./useWindowSize.js";
export function usePopupWindow(windowRef, triggerRef, position) {
  const [renderWindowPosition, setRenderWindowPosition] = useState();
  const [verticalPosition, setVerticalPosition] = useState();
  const windowPosition = useElementPosition(windowRef);
  const triggerPosition = useElementPosition(triggerRef);
  const scrollY = useScroll();
  const windowSize = useWindowSize();
  useEffect(() => {
    if (windowSize && triggerPosition) {
      setVerticalPosition(triggerPosition.y > windowSize.height / 2 ? 'top' : 'bottom');
    }
  }, [triggerPosition, windowSize]);
  useEffect(() => {
    if (windowPosition && triggerPosition && verticalPosition) {
      setRenderWindowPosition(getPosition(triggerPosition, position, verticalPosition, windowPosition, scrollY, windowSize));
    }
  }, [position, scrollY, triggerPosition, verticalPosition, windowPosition, windowSize]);
  return {
    renderWindowPosition,
    verticalPosition
  };
}