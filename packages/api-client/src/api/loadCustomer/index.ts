// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function loadCustomer(context, params) {
  const url = new URL(context.config.api.url + context.config.api.restPath + '/accountInfo');

  const { data } = await context.client.get(url.href, {
    headers: {
      Cookie: params.key + '=' + params.value + ';'
    }
  });

  return data;
}
