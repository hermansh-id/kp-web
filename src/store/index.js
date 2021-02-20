import Vue from 'vue'
import Vuex from 'vuex'
import VuexEasyFirestore from 'vuex-easy-firestore'
import { firebase, initFirebase } from '@/firebase'
// Modules
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import auth from './auth'
import ajuan from './ajuan'

const ls = new SecureLS({ isCompression: false })
Vue.use(Vuex)

const easyFirestore = VuexEasyFirestore(
  [ajuan],
  { logging: true, FirebaseDependency: firebase },
)

const store = new Vuex.Store({
  modules: {
    auth,
    app,
    appConfig,
    verticalMenu,
  },
  strict: process.env.DEV,
  plugins: [
    easyFirestore,
    createPersistedState({
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key),
      },
    }),
  ],
})
initFirebase()

export default store
