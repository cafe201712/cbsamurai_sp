import Api from '@/api'

export default {
  strict: true,
  namespaced: true,
  state: {
    // api/v1/profile.json の戻り値を格納
    user: {     // user オブジェクトは API の返り値で上書きされる
      nickname: '',
      email: '',
      introduction: '',
      birthday: '',
      photoUrl: ''
    },
    qrcode: '',
    progressing: false
  },
  mutations: {
    user (state, user = {}) {
      state.user = user
    },
    merge (state, user = {}) {
      let newUser = Object.assign({}, state.user)
      Object.assign(newUser, user)
      state.user = newUser
    },
    qrcode (state, qrcode = '') {
      state.qrcode = qrcode
    },
    progressing (state, progressing = false) {
      state.progressing = progressing
    }
  },
  actions: {
    clear ({commit, state}) {
      commit('user', {
      })
      commit('qrcode', '')
    },
    async get ({commit, state, rootState}) {
      commit('progressing', true)
      try {
        const res = await Api.profile.view(rootState.axios, rootState.loginUser.api_token)
        commit('user', res.data.profile)
        commit('qrcode', res.data.qrcode)
      } finally {
        commit('progressing', false)
      }
    },
    async set ({commit, state, rootState}, data) {
      commit('progressing', true)
      try {
        const res = await Api.profile.edit(rootState.axios, rootState.loginUser.api_token, data)
        if (res.data.success === true) {
          commit('merge', data)
        }
        return res
      } finally {
        commit('progressing', false)
      }
    },
    async changePassword ({commit, state, rootState}, data) {
      commit('progressing', true)
      try {
        const res = await Api.profile.changePassword(rootState.axios, rootState.loginUser.api_token, data)
        return res
      } finally {
        commit('progressing', false)
      }
    }
  }
}
