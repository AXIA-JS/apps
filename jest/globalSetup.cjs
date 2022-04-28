// Copyright 2017-2021 @axia-js/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

const { AlwaysPullPolicy, GenericContainer, Wait } = require('testcontainers');

const startSubstrate = async () => {
  console.log('Substrate container starting...');

  const startedTestContainer = await new GenericContainer('axia/substrate')
    .withPullPolicy(new AlwaysPullPolicy())
    .withName('axia-apps-test-substrate')
    .withExposedPorts(9944)
    .withCmd(['--dev', '--ws-port=9944', '--unsafe-ws-external'])
    .withWaitStrategy(Wait.forLogMessage('New round 0 launching'))
    .start();

  console.log('Done.');

  process.env.TEST_SUBSTRATE_PORT = startedTestContainer.getMappedPort(9944)?.toString() || '';
  global.__SUBSTRATE__ = startedTestContainer;
};

module.exports = async () => {
  await startSubstrate();
};
