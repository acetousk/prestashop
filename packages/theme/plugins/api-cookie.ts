import { Plugin } from '@nuxt/types';

const plugin: Plugin = ({ app }) => {
  const isSSR: boolean = process.server;
  if (isSSR) {
    app.$vsf.$prestashop.client.interceptors.response.use((response) => {
      if (response.headers) {
        const setCookie = response.headers['set-cookie'];
        console.log('#### PLUGIN API-COOKIE');
        console.log('#### setCookie');
        console.log(setCookie);
        console.log(response.headers);
        console.log(process.server);
        if (setCookie) {
          app.context.res.setHeader('Set-cookie', setCookie);
        }
      }
      return response;
    });
  }
};

export default plugin;
