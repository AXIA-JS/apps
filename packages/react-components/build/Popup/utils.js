// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
// 0.8rem
const POINTER_OFFSET = 14 * 0.8; // we don't want our popup window to cover apps menu

const MENU_BAR_HEIGHT = 56; // adds 1rem margin between browsers window and popup

const FIXED_VERTICAL_OFFSET_MARGIN = 14;
export function getPosition(triggerPosition, positionX, positionY, windowPosition, scrollY, windowSize) {
  const globalX = triggerPosition.x + triggerPosition.width / 2;
  const globalY = triggerPosition.y + scrollY + triggerPosition.height / 2;
  return {
    x: globalX - getHorizontalOffset(windowPosition.width, positionX),
    y: fitsInView(positionY, triggerPosition, windowPosition.height, windowSize, scrollY) ? globalY + getVerticalOffset(triggerPosition.height, positionY, windowPosition.height) : getFixedVerticalPosition(scrollY, positionY, windowSize, windowPosition.height)
  };
}

function getHorizontalOffset(popupWindowWidth, position) {
  if (position === 'left') {
    return popupWindowWidth - POINTER_OFFSET;
  }

  if (position === 'right') {
    return POINTER_OFFSET;
  }

  return popupWindowWidth / 2;
}

function fitsInView(positionY, trigger, popupWindowHeight, windowSize, scrollY) {
  const {
    height: triggerHeight,
    y: triggerY
  } = trigger;

  if (positionY === 'bottom') {
    return windowSize.height - triggerHeight - triggerY - FIXED_VERTICAL_OFFSET_MARGIN > popupWindowHeight;
  }

  return scrollY < MENU_BAR_HEIGHT ? triggerY - (MENU_BAR_HEIGHT - scrollY) > popupWindowHeight : triggerY > popupWindowHeight;
}

function getVerticalOffset(triggerHeight, position, windowHeight) {
  if (position === 'bottom') {
    return triggerHeight / 2;
  }

  return (triggerHeight / 2 + windowHeight + POINTER_OFFSET) * -1;
}

function getFixedVerticalPosition(scrollY, position, windowSize, popupWindowHeight) {
  if (position === 'bottom') {
    return scrollY + windowSize.height - popupWindowHeight - FIXED_VERTICAL_OFFSET_MARGIN;
  }

  return scrollY < MENU_BAR_HEIGHT ? MENU_BAR_HEIGHT : scrollY;
}