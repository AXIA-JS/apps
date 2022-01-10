// Copyright 2017-2021 @axia-js/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Route } from '@axia-js/apps-routing/types';

import React, { Suspense, useContext, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import createRoutes from '@axia-js/apps-routing';
import { ErrorBoundary, Spinner, StatusContext, TabsContext } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';

import { findMissingApis } from '../endpoint';
import { useTranslation } from '../translate';
import NotFound from './NotFound';
import Status from './Status';

interface Props {
  className?: string;
}

const NOT_FOUND: Route = {
  Component: NotFound,
  display: {
    needsApi: undefined
  },
  group: 'settings',
  icon: 'times',
  isIgnored: false,
  name: 'unknown',
  text: 'Unknown'
};

function Content ({ className }: Props): React.ReactElement<Props> {
  const location = useLocation();
  const { t } = useTranslation();
  const { api, isApiConnected, isApiReady } = useApi();
  const { queueAction } = useContext(StatusContext);

  const { Component, display: { needsApi, needsApiInstances }, icon, name, text } = useMemo(
    (): Route => {
      const app = location.pathname.slice(1) || '';

      return createRoutes(t).find((route) => !!(route && app.startsWith(route.name))) || NOT_FOUND;
    },
    [location, t]
  );

  const missingApis = useMemo(
    () => needsApi
      ? isApiReady && isApiConnected
        ? findMissingApis(api, needsApi, needsApiInstances)
        : null
      : [],
    [api, isApiConnected, isApiReady, needsApi, needsApiInstances]
  );

  return (
    <div className={className}>
      {!missingApis
        ? (
          <div className='connecting'>
            <Spinner label={t<string>('Initializing connection')} />
          </div>
        )
        : (
          <>
            <Suspense fallback='...'>
              <ErrorBoundary trigger={name}>
                <TabsContext.Provider value={{ icon, text }}>
                  {missingApis.length
                    ? (
                      <NotFound
                        basePath={`/${name}`}
                        location={location}
                        missingApis={missingApis}
                        onStatusChange={queueAction}
                      />
                    )
                    : (
                      <Component
                        basePath={`/${name}`}
                        location={location}
                        onStatusChange={queueAction}
                      />
                    )
                  }
                </TabsContext.Provider>
              </ErrorBoundary>
            </Suspense>
            <Status />
          </>
        )
      }
    </div>
  );
}

export default React.memo(styled(Content)`
  flex-grow: 1;
  overflow: hidden auto;
  padding: 0 0 1rem 0;
  position: relative;
  width: 100%;

  .connecting {
    padding: 2rem 0;
  }

  & main > *:not(header):not(.hasOwnMaxWidth) {
    max-width: var(--width-full);
    margin-right: auto;
    margin-left: auto;
    width: 88%;
    padding: 0 1.5rem;
    text-transform: capitalize;
  }
`);
