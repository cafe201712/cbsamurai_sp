import Api from '@/api'

export default {
  strict: true,
  namespaced: true,
  state: {
    guest: {     // guest オブジェクトは API の返り値で上書きされる
      nickname: '',
      introduction: '',
      birthday: '',
      photoUrl: ''
    },
    numOfTickets: 0,
    progressing: false
  },
  mutations: {
    guest (state, guest = {}) {
      state.guest = guest
    },
    numOfTickets (state, numOfTickets = 0) {
      state.numOfTickets = numOfTickets
    },
    progressing (state, progressing = false) {
      state.progressing = progressing
    }
  },
  actions: {
    clear ({commit, state}) {
      commit('guest', {
        nickname: '',
        introduction: '',
        birthday: '',
        photoUrl: ''
      })
    },
    async get ({commit, state, rootState}, id) {
      commit('progressing', true)
      try {
        const res = await Api.guests.view(rootState.axios, rootState.loginUser.api_token, id)
        commit('guest', res.data.guest)
      } finally {
        commit('progressing', false)
      }
    },
    async addTickets ({commit, state, rootState}, id) {
      let success = false

      commit('progressing', true)
      try {
        const res = await Api.guests.addTickets(rootState.axios, rootState.loginUser.api_token, id)
        if (res.data.success) {
          commit('numOfTickets', res.data.num_of_tickets)
          success = true
        }
      } finally {
        commit('progressing', false)
      }
      return success
    }
  }
}
