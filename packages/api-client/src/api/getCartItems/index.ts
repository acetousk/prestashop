// import { cookieParser } from '../../helpers/cookieParser';
import { logger } from '../../helpers/logging';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function getCartItems(context, params) {
  const { psCookieKey, psCookieValue } = params;
  const url = new URL(context.config.api.url + context.config.api.restPath + '/cart');

  url.searchParams.set('image_size', 'medium_default');

  logger.warn('cartItems psCookieKey ' + psCookieKey);
  logger.warn('cartItems psCookieValue ' + psCookieValue);

  if (psCookieKey && psCookieValue) {
    // It's not possible to get cart items without cookies (or any operation on cart)
    const { data, headers } = await context.client.get(url.href, {
      // headers: {
      //   Cookie: psCookieKey + '=' + psCookieValue + ';'
      // }
    });

    // const cookieObject = cookieParser(headers);
    return {
      data,
      // cookieObject
    };
  } else {
    return {};
  }
}
