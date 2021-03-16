import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: 'AIzaSyBwO7JbHrCrLPJY1dm5AGxSYTta-FhMg-k',
  authDomain: 'ftunsil.firebaseapp.com',
  databaseURL: 'https://ftunsil.firebaseio.com',
  projectId: 'ftunsil',
  storageBucket: 'ftunsil.appspot.com',
  messagingSenderId: '468631610356',
  appId: '1:468631610356:web:56d7ce5ad66ffe0c498fa1',
  measurementId: 'G-6990JN81Q7',
}
const fapp = firebase.initializeApp(firebaseConfig)

// utils
const db = fapp.firestore()
const auth = fapp.auth()
const { Timestamp, GeoPoint } = firebase.firestore

function initFirebase() {
  return new Promise((resolve, reject) => {
    db.enablePersistence()
      .then(resolve)
      .catch(err => {
        if (err.code === 'failed-precondition') {
          reject(err)
        } else if (err.code === 'unimplemented') {
          reject(err)
        }
      })
  })
}
// collection references
const usersCollection = db.collection('users')
const ajuanCollection = db.collection('ajuan')

// export utils/refs
export {
  db,
  auth,
  initFirebase,
  firebase,
  usersCollection,
  ajuanCollection,
  Timestamp,
  GeoPoint,
}
