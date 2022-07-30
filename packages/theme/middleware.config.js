module.exports = {
  integrations: {
    moqui: {
      location: '@vue-storefront/moqui-api/server',
      configuration: {
        api: {
          // url: 'https://rest.binshops.com/rest',
          url: 'http://localhost:8080/rest/s1/pop'
        }
      }
    }
  }
};
