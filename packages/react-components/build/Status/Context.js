// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
const defaultState = {
  stqueue: [],
  txqueue: []
};
const StatusContext = /*#__PURE__*/React.createContext(defaultState);
const QueueConsumer = StatusContext.Consumer;
const QueueProvider = StatusContext.Provider;
export default StatusContext;
export { QueueConsumer, QueueProvider };