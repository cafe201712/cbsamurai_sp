import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import navigatorModule from '@/modules/navigator'
import splitterModule from '@/modules/splitter'
import tabbarModule from '@/modules/tabbar'

import homeModule from '@/modules/home'
import messagesModule from '@/modules/messages'
import castsModule from '@/modules/casts'
import castModule from '@/modules/cast'
import guestModule from '@/modules/guest'
import profileModule from '@/modules/profile'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    axios: axios.create({
      baseURL: process.env.API_HOST + process.env.API_PATH,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',

        // "X-Requested-With:XMLHttpRequest" があるかどうかで権限エラー時にリダイレクトするかを CakePHP が判断している
        'X-Requested-With': 'XMLHttpRequest'
      }
    }),
    // ログインユーザ情報をオブジェクトとして格納
    // id, email, role, api_token
    loginUser: null
  },
  getters: {
    isGuest (state) {
      if (state.loginUser) {
        return state.loginUser.role === 'user'
      }
      return false
    },
    isCast (state) {
      if (state.loginUser) {
        return state.loginUser.role === 'cast'
      }
      return false
    }
  },
  mutations: {
    login (state, loginUser) {
      state.loginUser = loginUser
      localStorage.setItem('loginUser', JSON.stringify(loginUser))
    },
    logout (state) {
      state.loginUser = null
      localStorage.removeItem('loginUser')
    }
  },
  modules: {
    navigator: navigatorModule,
    splitter: splitterModule,
    tabbar: tabbarModule,
    home: homeModule,
    messages: messagesModule,
    casts: castsModule,
    cast: castModule,
    guest: guestModule,
    profile: profileModule
  }
})
