import { computed } from '@nuxtjs/composition-api';
import { sharedRef, useVSFContext, Logger } from '@vue-storefront/core';
import { handleRequest } from '../helpers';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useBootstrap = () => {
  const context = useVSFContext();

  const menuItems = sharedRef(null, 'menuItems');

  const loading = sharedRef(false, 'bootstrap-loading');

  const error = sharedRef({
    search: null
  }, 'bootstrap-error');

  const boot = async () => {
    Logger.debug('bootstrap/boot');

    try {
      console.log('useBootstrap');
      loading.value = true;

      // const data = await handleRequest({method: 'get',
      //   url: '/lightbootstrap',
      //   params: {
      //     // eslint-disable-next-line camelcase
      //     menu_with_images: 'single',
      //     requestHostName: context.req?.headers?.host
      //   },
      //   useCredentials: true
      // });
      const { data, headers, cookieObject } = await context.$prestashop.api.bootstrap();
      context.$cookies.set(cookieObject.vsfPsKeyCookie, cookieObject.vsfPsValCookie);
      console.log('isSSR', !!process.server)
      console.log('isClient', !!process.client)
      console.log('cookieObject', cookieObject);
      console.log('GD');
      console.log('key= ' + cookieObject.vsfPsKeyCookie + 'val=' + cookieObject.vsfPsValCookie);

      setTimeout(() => console.log('context.$cookies.get(\'cookieObject.vsfPsKeyCookie\') ' + context.$cookies.get(cookieObject.vsfPsKeyCookie)), 2000);

      if (data?.psdata?.menuItems && menuItems.value !== data?.psdata?.menuItems) menuItems.value = data?.psdata?.menuItems;
      return data;

      error.value.boot = null;
    } catch (err) {
      error.value.boot = err;
      Logger.error('bootstrap/boot', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    boot,
    menuItems: menuItems,
    loading: computed(() => loading.value),
    error: computed(() => error.value)
  };
};
