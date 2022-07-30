import { useVSFContext, Logger } from '@vue-storefront/core';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const handleRequest = async (context, params) => {
  const _context = context;

  const psCookieKey = _context.$moqui.config.app.$cookies.get(await _context.$moqui.config.app.$config.psCustomerCookieKey);
  const psCookieValue = _context.$moqui.config.app.$cookies.get(await _context.$moqui.config.app.$config.psCustomerCookieValue);
  const moquiSessionToken = _context.$moqui.config.app.$cookies.get('moquiSessionToken');

  if (psCookieValue && moquiSessionToken) {
    params.headers = {
      Cookie: psCookieKey + '=' + psCookieValue + ';',
      moquiSessionToken: moquiSessionToken
    };
  }
  let data; let headers; let cookieObject;

  try {
    // Logger.error('isSSR: ' + JSON.stringify(process.server) + ' at ' + JSON.stringify(params.url) + ' params.headers: ' + JSON.stringify(params.headers));
    const response = await _context.$moqui.api.bootstrap(params);
    data = response.data;
    headers = response.headers;
    cookieObject = response.cookieObject;

    // Logger.error('isSSR: ' + JSON.stringify(process.server) + ' at ' + JSON.stringify(params.url) + ' headers: ' + JSON.stringify(headers));
    // Logger.error('isSSR: ' + JSON.stringify(process.server) + ' at ' + JSON.stringify(params.url) + ' handleRequest data: ' + JSON.stringify(data));

    if (cookieObject) {
      const psCookieKeyNew = cookieObject?.vsfPsKeyCookie;
      if (psCookieKeyNew && psCookieKeyNew !== psCookieKey) {
        await _context.$moqui.config.app.$cookies.set(await _context.$moqui.config.app.$config.psCustomerCookieKey, psCookieKeyNew);
      }
      const psCookieValueNew = cookieObject?.vsfPsValCookie;
      if (psCookieValueNew && psCookieValueNew !== psCookieValue) {
        await _context.$moqui.config.app.$cookies.set(await _context.$moqui.config.app.$config.psCustomerCookieValue, psCookieValueNew);
      }
    }
    if (headers) {
      const moquiSessionTokenNew = headers.moquisessiontoken ? headers.moquisessiontoken : headers['x-csrf-token'];
      if (moquiSessionTokenNew && moquiSessionTokenNew !== moquiSessionToken) {
        await _context.$moqui.config.app.$cookies.set('moquiSessionToken', moquiSessionTokenNew);
        // Logger.error('isSSR: ' + JSON.stringify(process.server) + ' at ' + JSON.stringify(params.url) + ' moquiSessionTokenNew: ' + JSON.stringify(moquiSessionTokenNew));
        // Logger.error('isSSR: ' + JSON.stringify(process.server) + ' at ' + JSON.stringify(params.url) + ' moquiSessionTokenNewNew: ' + JSON.stringify(await _context.$moqui.config.app.$cookies.get('moquiSessionToken')));
      }
    }

    if (data?.errors) throw { message: data?.errors };
    return data;

  } catch (err) {
    // Currently, when getting accountInfo and the user isn't logged in an error is thrown with this and that is expected behavior at the moment.
    Logger.error('isSSR: ' + JSON.stringify(process.server) + ' at ' + JSON.stringify(params.url) + ' handleRequest: ', err);

    return data;
  }

};

export default handleRequest;
