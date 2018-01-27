import Api from '@/api'

export default {
  strict: true,
  namespaced: true,
  state: {
    casts: [],
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
    casts (state, casts = []) {
      state.casts = casts
    },
    concatCasts (state, casts = []) {
      state.casts = state.casts.concat(casts)
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
    async refresh ({dispatch, commit}) {
      commit('casts', [])
      commit('page', 0)
      commit('pageCount', null)
      await dispatch('get')
    },
    async get ({commit, state, getters, rootState}) {
      // Load more 時の API ページネーションを考慮
      // すでに最終ページまで表示していたら、何もしない
      if (getters.isLastPage) {
        return
      }
      commit('progressing', true)
      try {
        const res = await Api.casts.index(rootState.axios, rootState.loginUser.api_token, state.page + 1)
        commit('concatCasts', res.data.casts) // 検索結果を既存の一覧に追加
        commit('page', parseInt(res.data.page))
        commit('pageCount', parseInt(res.data.pageCount))
      } finally {
        commit('progressing', false)
      }
    }
  }
}
