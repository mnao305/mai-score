const functions = require('firebase-functions')
const { Nuxt } = require('nuxt')
const express = require('express')
const app = express()

const nuxt = new Nuxt({ buildDir: '.nuxt', dev: false })

app.use(async (req, res) => {
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600')
  await nuxt.ready()
  nuxt.render(req, res)
})

exports.ssr = functions.https.onRequest(app)
exports.tweet = functions.https.onRequest(require('./tweet'))
