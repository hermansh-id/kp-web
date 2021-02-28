import { $themeBreakpoints } from '@themeConfig'
import axios from '@axios'

export default {
  namespaced: true,
  state: {
    windowWidth: 0,
    shallShowOverlay: false,
    stat: {},
  },
  getters: {
    currentBreakPoint: state => {
      const { windowWidth } = state
      if (windowWidth >= $themeBreakpoints.xl) return 'xl'
      if (windowWidth >= $themeBreakpoints.lg) return 'lg'
      if (windowWidth >= $themeBreakpoints.md) return 'md'
      if (windowWidth >= $themeBreakpoints.sm) return 'sm'
      return 'xs'
    },
  },
  mutations: {
    UPDATE_WINDOW_WIDTH(state, val) {
      state.windowWidth = val
    },
    TOGGLE_OVERLAY(state, val) {
      state.shallShowOverlay = val !== undefined ? val : !state.shallShowOverlay
    },
    STAT(state, val) {
      state.stat = val
    },
  },
  actions: {
    ambilStat({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('/statistic')
          .then(response => {
            commit('STAT', response.data)
            resolve(response.data)
          })
          .catch(error => { reject(error) })
      })
    },
  },
}
