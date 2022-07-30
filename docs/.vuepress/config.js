module.exports = {
  title: 'Vue Storefront 2 for Moqui',
  base: '/',
  description: 'Documentation for the Moqui connector for Vue Storefront 2',
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }]
  ],
  configureWebpack: (config) => {
    config.module.rules = config.module.rules.map(rule => ({
      ...rule,
      use: rule.use && rule.use.map(useRule => ({
        ...useRule,
        options: useRule.loader === 'url-loader' ?
            /**
             Hack for loading images properly.
             ref: https://github.com/vuejs/vue-loader/issues/1612#issuecomment-559366730
             */
            {  ...useRule.options, esModule: false } :
            useRule.options
      }))
    }))
  },
  plugins: [
    '@vuepress/plugin-back-to-top',
    [
      '@vuepress/plugin-medium-zoom',
      {
        // This selector excludes images from the "Integrations" page
        selector: 'main :not(.tile-image) > img'
      }
    ],
    '@vuepress/active-header-links',
    '@vuepress/search'
  ],
  themeConfig: {
    repo: 'https://github.com/vuestorefront-community/moqui',
    editLinks: false,
    docsDir: 'docs',
    docsBranch: 'develop',
    nav: [
      { text: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      { text: 'Core Doc', link: 'https://docs.vuestorefront.io/v2/' },
      { text: 'Moqui POP REST Store API', link: 'https://demo.moqui.org/toolstatic/lib/swagger-ui/index.html?url=https://demo.moqui.org/rest/service.swagger/pop' },
    ],
    sidebar: [
      {
        title: 'Essentials',
        collapsable: false,
        children: [
          ['/', 'Introduction'],
          ['/guide/getting-started', 'Getting started'],
          ['/guide/about', 'About'],
        ]
      },
      {
        title: 'Composables',
        collapsable: true,
        children: [
          ['/guide/composables/useBootstrap', 'useBootstrap'],
          ['/guide/composables/useCart', 'useCart'],
          ['/guide/composables/useCountryList', 'useCountryList'],
          ['/guide/composables/useFacet', 'useFacet'],
          ['/guide/composables/useMakeOrder', 'useMakeOrder'],
          ['/guide/composables/usePayment', 'usePayment'],
          ['/guide/composables/useProduct', 'useProduct'],
          ['/guide/composables/useReview', 'useReview'],
          ['/guide/composables/useUser', 'useUser'],
          ['/guide/composables/useUserShipping', 'useUserShipping'],
        ]
      }
    ]
  }
}
