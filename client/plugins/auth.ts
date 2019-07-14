import firebase from '~/plugins/firebase'

const twitter = new firebase.auth.TwitterAuthProvider()

const auth = {
  // Twitterサインイン
  twitterLogin() {
    return new Promise<firebase.auth.UserCredential>((resolve, reject) => {
      firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          firebase
            .auth()
            .signInWithPopup(twitter)
            .then((result) => resolve(result))
            .catch((error) => reject(error))
        })
    })
  },
  // メール登録
  mailRegist(email: string, passwd: string) {
    return new Promise<firebase.auth.UserCredential>((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, passwd)
        .then((result) => resolve(result))
        .catch((error) => reject(error))
    })
  },
  // メールログイン
  mailLogin(email: string, passwd: string) {
    return new Promise<firebase.auth.UserCredential>((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, passwd)
        .then((result) => resolve(result))
        .catch((error) => reject(error))
    })
  },
  // サインアウト
  logout() {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signOut()
        .then(() => resolve())
        .catch((error) => reject(error))
    })
  },
  // 認証状態の変更検知
  auth() {
    return new Promise<firebase.User | null>((resolve) => {
      firebase.auth().onAuthStateChanged((user) => resolve(user))
    })
  }
}

export default auth
