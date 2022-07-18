// import { cookieParser } from '../../helpers/cookieParser';

import { cookieParser } from "../../helpers/cookieParser";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function login(context, params) {
  const url = new URL(context.config.api.url + context.config.api.restPath + '/login');
  const { username, password, psCookieKey, psCookieValue } = params;

  const { data, headers } = await context.client.post(url.href, {
    email: username,
    password: password
  }, {
    // headers: {
    //   Cookie: psCookieKey + '=' + psCookieValue + ';'
    // }
  });

  console.log('data', data);
  console.log('headers', headers);
  const cookieObject = cookieParser(headers);
  console.log('cookieObject', cookieObject);

  // const cookieObject = cookieParser(headers);

  return {
    data
    // cookieObject
  };
}
