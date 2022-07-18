import axios from 'axios';
import { ApiClientExtension, apiClientFactory } from '@vue-storefront/core';
import * as api from './api';
import type { Setttings, Endpoints } from './types';
import cookieExtension from './extensions/cookie-config';
import { cookieParser } from './helpers/cookieParser';

const init = (settings) => {
  axios.defaults.headers.common.cookie = 'JSESSIONID=\'\';';

  const client = axios.create({
    baseURL: settings.api.url + settings.api.restPath,
    xsrfHeaderName: 'x-csrf-token',
    withCredentials: true
  });

  // client.interceptors.response.use((res) => {
  //   const cookieObject = cookieParser(res.headers);
  // });

  return {
    config: settings,
    client
  };
};

const onCreate = (settings) => {
  if (!settings?.client) {
    return init(settings);
  }

  return {
    config: settings,
    client: settings.client
  };
};

const parseToken = (rawToken) => {
  try {
    return JSON.parse(rawToken);
  } catch (e) {
    return null;
  }
};

const tokenExtension: ApiClientExtension = {
  name: 'tokenExtension',
  hooks: (req, res) => {
    const rawCurrentToken = req.cookies.JSESSIONID;
    const currentToken = parseToken(rawCurrentToken);

    return {
      beforeCreate: ({ configuration }) => ({
        ...configuration,
        // ...getI18nConfig(req, configuration),
        auth: {
          onTokenChange: (newToken) => {
            if (!currentToken || currentToken.access_token !== newToken.access_token) {
              res.cookie(
                'JSESSIONID',
                JSON.stringify(newToken),
                newToken?.expires_at ? { expires: new Date(newToken.expires_at) } : {}
              );
            }
          },

          onTokenRead: () => {
            res.cookie(
              'JSESSIONID',
              rawCurrentToken,
              currentToken?.expires_at ? { expires: new Date(currentToken.expires_at) } : {}
            );
            return currentToken;
          },

          onTokenRemove: () => {
            delete req.cookies.JSESSIONID;
          }
        }
      })
    };
  }
};

const { createApiClient } = apiClientFactory<Setttings, Endpoints>({
  onCreate,
  api,
  extensions: [
    cookieExtension,
    // tokenExtension
  ]
});

export {
  createApiClient,
  init
};
