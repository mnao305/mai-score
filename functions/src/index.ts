import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
admin.initializeApp(functions.config().firebase)

const firestore = admin.firestore()

export const addmusics = functions
  .region('asia-northeast1')
  .https.onRequest((req, res) => {
    if (req.method !== 'POST') {
      res.status(405).send('Method Not Allowed')
      return
    }
    if (!req.body) {
      res.status(400).send('Request Body Not Found')
      return
    }

    const data = req.body.scores
    res.send(data)
    // for (let i = 0; i < data.length; i++) {
    // firestore
    //   .collection('musics')
    //   .doc('master')
    //   .set(data.master, { merge: true })
    //   .then((val) => {
    //     res.send(data)
    //   })
    //   .catch((e) => {
    //     res.send(e)
    //   })
    // }
  })
