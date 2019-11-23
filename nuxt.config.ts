import colors from 'vuetify/es5/util/colors'
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
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    '@nuxt/typescript-build'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv',
    'cookie-universal-nuxt',
    'nuxt-logrocket'
  ],

  logRocket: {
    logRocketId: 'vvvq4t/mai-score',
    devModeAllowed: false
  },

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
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
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
