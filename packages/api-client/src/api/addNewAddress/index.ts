
import { cookieParser } from '../../helpers/cookieParser';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function addNewAddress(context, params) {
  const { address } = params;
  const url = new URL(context.config.api.url + '/rest/address');

  const { data, headers } = await context.client.post(url.href, address, {
    headers: {
      Cookie: params.psCookieKey + '=' + params.psCookieValue + ';'
    }
  }
  );

  const cookieObject = cookieParser(headers);
  return {data, cookieObject};
}
