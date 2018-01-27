import Api from '@/api'

export default {
  strict: true,
  namespaced: true,
  state: {
    fromUser: {},
    messages: [],
    page: 0,
    pageCount: null,
    progressing: false
  },
  getters: {
    isLastPage (state) {
      return state.pageCount !== null && state.page >= state.pageCount
    }
  },
  mutations: {
    fromUser (state, fromUser) {
      state.fromUser = fromUser
    },
    messages (state, messages = []) {
      state.messages = messages
    },
    addMessage (state, message) {
      state.messages.push(message)
    },
    concatMessages (state, messages = []) {
      state.messages = messages.concat(state.messages)
    },
    page (state, page = 0) {
      state.page = page
    },
    pageCount (state, pageCount = 0) {
      state.pageCount = pageCount
    },
    progressing (state, progressing = false) {
      state.progressing = progressing
    }
  },
  actions: {
    async refresh ({dispatch, commit}, fromUserId) {
      commit('messages', [])
      commit('page', 0)
      commit('pageCount', null)
      await dispatch('get', fromUserId)
    },
    async get ({commit, state, getters, rootState}, fromUserId) {
      // Load more 時の API ページネーションを考慮
      // すでに最終ページまで表示していたら、何もしない
      if (getters.isLastPage) {
        return
      }
      commit('progressing', true)
      try {
        const res = await Api.messages.index(rootState.axios, rootState.loginUser.api_token, fromUserId, state.page + 1)
        const messages = res.data.messages.reverse()  // 配列は作成日の降順となっている為、反転させる
        commit('fromUser', res.data.from_user)
        commit('concatMessages', messages)  // 検索結果を既存の一覧に追加
        commit('page', parseInt(res.data.page))
        commit('pageCount', parseInt(res.data.pageCount))
      } finally {
        commit('progressing', false)
      }
    },
    async add ({commit, rootState}, data) {
      commit('progressing', true)
      try {
        const res = await Api.messages.add(rootState.axios, rootState.loginUser.api_token, data)
        if (res.data.success === true) {
          const message = res.data.data
          commit('addMessage', message)
        }
        return res
      } finally {
        commit('progressing', false)
      }
    }
  }
}
