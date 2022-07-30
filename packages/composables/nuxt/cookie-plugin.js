import { integrationPlugin } from '@vue-storefront/core';

const moduleOptions = JSON.parse('<%= JSON.stringify(options) %>');

// transfer set-cookie header from api to client on SSR
export default integrationPlugin(({ integration, app }) => {
  integration.configure('moqui', {
    ...moduleOptions,
    app
  });

  // TODO: See if this is needed to get cookies working server side
  /**
  const isSSR = process.server;
  console.log('cookie-plugin isSSR: ' + JSON.stringify(isSSR));
  if (isSSR) {
    app.$vsf.$moqui.client.interceptors.response.use(response => {
      console.log('cookie-plugin response.headers: ' + JSON.stringify(response.headers));
      if (response.headers) {
        const setCookie = response.headers['set-cookie'];
        console.log('cookie-plugin setCookie: ' + JSON.stringify(setCookie));
        if (setCookie) {
          app.context.res.setHeader('Set-cookie', setCookie);
        }
      }
      return response;
    });
    // transferApiCookie(app.$vsf.$moqui.client, app.context.res);
  }*/
}
);

