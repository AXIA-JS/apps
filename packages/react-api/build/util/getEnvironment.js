// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
// https://github.com/electron/electron/issues/2288
function isElectron() {
  var _process, _process$versions, _window, _window$process, _navigator, _navigator$userAgent;

  if ((_process = process) !== null && _process !== void 0 && (_process$versions = _process.versions) !== null && _process$versions !== void 0 && _process$versions.electron) {
    return true;
  }

  if (((_window = window) === null || _window === void 0 ? void 0 : (_window$process = _window.process) === null || _window$process === void 0 ? void 0 : _window$process.type) === 'renderer') {
    return true;
  }

  return ((_navigator = navigator) === null || _navigator === void 0 ? void 0 : (_navigator$userAgent = _navigator.userAgent) === null || _navigator$userAgent === void 0 ? void 0 : _navigator$userAgent.indexOf('Electron')) >= 0;
}

export default function getEnvironment() {
  if (isElectron()) {
    return 'app';
  }

  return 'web';
}