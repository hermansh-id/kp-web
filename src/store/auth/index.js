import * as fb from '@/firebase'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    userProfile: {},
  },
  getters: {
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val
    },
  },
  actions: {
    async login(context, form) {
      // sign user in
      const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)

      // fetch user profile and set in state
      return (user)
    },
    async fetchUserProfile({ commit }, user) {
      // set user profile in state
      commit('setUserProfile', user)

      // change route to dashboard
      if (router.currentRoute.path === '/login') {
        router.push('/')
      }
    },
    async logout({ commit }) {
      await fb.auth.signOut()

      // clear userProfile and redirect to /login
      commit('setUserProfile', {})
      router.push('/login')
    },
  },
}
