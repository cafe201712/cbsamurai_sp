<template>
  <v-ons-page>
    <v-ons-list>
      <v-ons-list-item v-for="(item, index) in items" :key="item.title"
        :modifier="md && 'nodivider'"
        @click="push(item.page)"
      >
        <div class="left">
          <v-ons-icon fixed-width class="list-item__icon" :icon="item.icon"></v-ons-icon>
        </div>
        <div class="center">{{ item.title }}</div>
      </v-ons-list-item>

      <v-ons-list-item :modifier="md && 'nodivider'" @click="logout" >
        <div class="left">
          <v-ons-icon fixed-width class="list-item__icon" icon="ion-android-exit, material:md-square-right"></v-ons-icon>
        </div>
        <div class="center">ログアウト</div>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
import Edit from './Edit'
import Password from './Password'

export default {
  name: 'menu',
  methods: {
    push (page) {
      this.$store.commit('navigator/push', page)
      this.$store.commit('splitter/toggle')
    },
    logout () {
      this.$store.commit('logout')
      this.$store.commit('navigator/reset')
      this.$store.commit('tabbar/set', 0)
      this.$store.commit('splitter/toggle')
    }
  },
  data () {
    return {
      items: [
        {
          title: 'プロフィール編集',
          icon: 'ion-person, material:md-account',
          page: Edit
        },
        {
          title: 'パスワード変更',
          icon: 'ion-locked, material:md-lock',
          page: Password
        }
      ]
    }
  }
}
</script>
