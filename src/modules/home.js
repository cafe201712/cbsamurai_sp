import Api from '@/api'

export default {
  strict: true,
  namespaced: true,
  state: {
    likes: [],
    selections: [],
    unreadCount: 0,
    progressing: false
  },
  mutations: {
    likes (state, likes = []) {
      state.likes = likes
    },
    selections (state, selections = []) {
      state.selections = selections
    },
    unreadCount (state, unreadCount) {
      state.unreadCount = unreadCount
    },
    progressing (state, progressing = false) {
      state.progressing = progressing
    }
  },
  actions: {
    getLikes ({commit, rootState, rootGetters}) {
      const axios = rootState.axios
      const apiToken = rootState.loginUser.api_token

      let tasks = []
      if (rootGetters.isCast) {
        tasks = [
          Api.home.selectingGuests(axios, apiToken),
          Api.home.likingGuests(axios, apiToken)
        ]
      } else {
        tasks = [
          Api.home.selectedCasts(axios, apiToken),
          Api.home.likedCasts(axios, apiToken)
        ]
      }
      tasks.push(Api.messages.unreadCount(axios, apiToken))

      commit('progressing', true)
      Promise.all(tasks).then(res => {
        commit('selections', res[0].data.selections)
        commit('likes', res[1].data.likes)
        commit('unreadCount', res[2].data.count)
        commit('progressing', false)
      }).catch(() => {
        commit('progressing', false)
      })
    }
  }
}
