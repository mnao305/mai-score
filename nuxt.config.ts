import { Configuration } from '@nuxt/types'
require('dotenv').config()

interface nuxtConfg extends Configuration {
  env?: any
}

const config: nuxtConfg = {
  dev: process.env.NODE_ENV !== 'production',
  mode: 'universal',
  srcDir: 'client/',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + '舞スコア',
    title: '舞スコア',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'maimaiでらっくすのスコア管理ツールです。スコアの一覧表示や画像つきのスコア更新ツイートなどが可能です。'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/localStorage.ts',
    { src: '~/plugins/ga.js', ssr: false }
  ],
  /*
   ** Nuxt.js modules
   */
  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxt/typescript-build',
    [
      '@nuxt/typescript-build',
      {
        typeCheck: true,
        ignoreNotFoundWarnings: true
      }
    ]
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv',
    'cookie-universal-nuxt'
    // [
    //   '@nuxtjs/google-analytics',
    //   {
    //     id: 'UA-57438486-7'
    //   }
    // ]
  ],

  router: {
    middleware: ['authenticated']
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false
    }
  },

  env: {
    API_KEY: process.env.API_KEY,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    DATABASE_URL: process.env.DATABASE_URL,
    PROJECT_ID: process.env.PROJECT_ID,
    STORAGE_BUCKET: process.env.STORAGE_BUCKET,
    MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID
  },
  /*
   ** Build configuration
   */
  build: {
    publicPath: '/assets/',
    templates: [
      {
        src: 'client/templates/robots.txt',
        dst: '../client/static/robots.txt',
        options: {
          env: process.env.NODE_ENV
        }
      }
    ],
    /*
     ** You can extend webpack config here
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    extend(config, ctx) {}
  }
}

export default config
