const functions = require('firebase-functions')
const admin = require('firebase-admin')
const Twitter = require('twit')
const express = require('express')
const cors = require('cors')
const tweet = express()
const axios = require('axios')
admin.initializeApp()

async function tweetScore(req, res) {
  if (!req.header('Authorization')) {
    res.status(401).send('non auth')
    return
  }
  const idToken = req.header('Authorization').split(' ')[1]
  let secureData
  let userData
  let scoreImgUrl
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken)
    const secureDocs = await admin
      .firestore()
      .collection('users')
      .doc(decodedToken.uid)
      .collection('secure')
      .doc(decodedToken.uid)
      .get()
    secureData = secureDocs.data()
    const userDocs = await admin
      .firestore()
      .collection('users')
      .doc(decodedToken.uid)
      .get()
    userData = userDocs.data()
    scoreImgUrl = await admin
      .storage()
      .bucket()
      .file(`userData/${decodedToken.uid}/updateScore.jpg`)
      .getSignedUrl({
        action: 'read',
        expires: '03-01-2500'
      })
  } catch (error) {
    res.status(401).send(error)
    return
  }

  let imageData
  try {
    const res = await axios.get(scoreImgUrl[0], { responseType: 'arraybuffer' })
    imageData = Buffer.from(res.data, 'binary').toString('base64')
  } catch (error) {
    res.status(500).send('get image error')
    return
  }

  try {
    const client = new Twitter({
      consumer_key: functions.config().twitter.apikey,
      consumer_secret: functions.config().twitter.apisecret,
      access_token: secureData.accessToken,
      access_token_secret: secureData.secret
    })
    const uploadRes = await client.post('media/upload', {
      media_data: imageData
    })
    const tweetRes = await client.post('statuses/update', {
      status: `スコア更新しました！ #舞スコア https://mai-score.com/user/${userData.displayName}`,
      media_ids: [uploadRes.data.media_id_string]
    })
    res.send(tweetRes)
  } catch (error) {
    res.status(500).send(error)
  }
}

tweet.use(cors({ origin: true }))
tweet.use(tweetScore)

module.exports = tweet
