import firebase from '~/plugins/firebase'

const db = firebase.firestore()
const FieldValue = firebase.firestore.FieldValue

export { db, FieldValue }
