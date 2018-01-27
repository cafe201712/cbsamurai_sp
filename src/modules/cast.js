import Api from '@/api'

export default {
  strict: true,
  namespaced: true,
  state: {
    cast: {     // cast オブジェクトは API の返り値で上書きされる
      nickname: '',
      introduction: '',
      birthday: '',
      photoUrl: '',
      isLiked: false,
      isSelected: false,
      shop: {
        name: '',
        description: '',
        address: '',
        tel: ''
      }
    },
    progressing: false
  },
  mutations: {
    cast (state, cast = {}) {
      state.cast = cast
    },
    isLiked (state, isLiked = false) {
      state.cast.isLiked = isLiked
    },
    isSelected (state, isSelected = false) {
      state.cast.isSelected = isSelected
    },
    progressing (state, progressing = false) {
      state.progressing = progressing
    }
  },
  actions: {
    clear ({commit, state}) {
      commit('cast', {
        nickname: '',
        introduction: '',
        birthday: '',
        photoUrl: '',
        isLiked: false,
        isSelected: false,
        shop: {
          name: '',
          description: '',
          address: '',
          tel: ''
        }
      })
    },
    async get ({commit, state, rootState}, id) {
      commit('progressing', true)
      try {
        const res = await Api.casts.view(rootState.axios, rootState.loginUser.api_token, id)
        commit('cast', res.data.cast)
      } finally {
        commit('progressing', false)
      }
    },
    async like ({dispatch, commit, state, rootState}, id) {
      let res = null

      commit('progressing', true)
      try {
        res = await Api.casts.like(rootState.axios, rootState.loginUser.api_token, id)
        if (res.data.success) {
          commit('isLiked', true)
        }
        commit('progressing', false)
      } finally {
        commit('progressing', false)
      }
      return res
    },
    async select ({dispatch, commit, state, rootState}, id) {
      let res = null

      commit('progressing', true)
      try {
        res = await Api.casts.select(rootState.axios, rootState.loginUser.api_token, id)
        if (res.data.success) {
          commit('isSelected', true)
        }
        commit('progressing', false)
      } finally {
        commit('progressing', false)
      }
      return res
    }
  }
}
