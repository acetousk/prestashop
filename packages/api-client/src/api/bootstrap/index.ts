// import { cookieParser } from '../../helpers/cookieParser';
import { cookieParser } from '../../helpers/cookieParser';
import { logger } from '../../helpers/logging';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// export default async function bootstrap(context, params) {
//   // logger.warn("params " + JSON.stringify(params));
//   // console.log("params " + JSON.stringify(params));

//   // logger.warn('context.$prestashop.config.app.$cookies.get(\'moquiSessionToken\') ' + JSON.stringify(context.$prestashop.config.app.$cookies.get('moquiSessionToken')));
//   // console.log('context.$prestashop.config.app.$cookies.get(\'moquiSessionToken\') ' + JSON.stringify(context.$prestashop.config.app.$cookies.get('moquiSessionToken')));

//   let response;
//   // let cookieObject;
//   try {
//     // logger.warn(JSON.stringify(params.url) + ' context.client.defaults.headers ' + JSON.stringify(context.client.defaults.headers));
//     response = await context.client(params);
//     // logger.warn(JSON.stringify(params.url) + ' response.headers ' + JSON.stringify(response.headers));
//     // cookieObject = cookieParser(response?.headers);

//     return {
//       data: response?.data, headers: response?.headers,
//       // cookieObject
//     };
//   } catch (error) {
//     // TODO: Only log this in not production
//     logger.error(error);
//     if (response) {
//       // cookieObject = cookieParser(response?.headers);
//       return {
//         data: response?.data, headers: response?.headers,
//         // cookieObject
//       };
//     }
//   }

export default async function bootstrap(context, params) {
  try {
    // const { psCookieKey, psCookieValue } = params;
    const url = new URL(context.config.api.url + context.config.api.restPath + '/lightbootstrap');

    // if (psCookieKey && psCookieValue) {
    // It's not possible to get cart items without cookies (or any operation on cart)
    const { data, headers } = await context.client.get(url.href, {
      withCredentials: true,
      useCredentials: true
      // headers: {
      //   Cookie: psCookieKey + '=' + psCookieValue + ';',
      //   moquiSessionToken: moquiSessionToken
      // }
    });

    console.log("api/bootstrap")
    console.log("data", data)
    console.log("headers", headers)
    // console.log("context", JSON.stringify(context))
    const cookieObject = cookieParser(headers);
    // context.$cookies.set(cookieObject.vsfPsKeyCookie, cookieObject.vsfPsValCookie);

    console.log("cookieObject", cookieObject)
    // console.log("GD")
    // console.log('key= ' + cookieObject.vsfPsKeyCookie + 'val=' + cookieObject.vsfPsValCookie);
    // console.log('context.$cookies.get(\'cookieObject.vsfPsKeyCookie\') ' + context.$cookies.get(cookieObject.vsfPsKeyCookie));

    return {
      data,
      cookieObject
    };
  }
  catch (e) {
    logger.error(e)
  }
  // } else return null;
}

// }
