<template>
<v-ons-page>
  <custom-toolbar backLabel="戻る">
    プロフィール
    <v-ons-toolbar-button slot="right" @click="$store.commit('splitter/toggle')">
      <v-ons-icon icon="ion-navicon, material:md-menu"></v-ons-icon>
    </v-ons-toolbar-button>
  </custom-toolbar>

  <img :src="profile.photoUrl" class="photo">

  <v-ons-list>
    <v-ons-list-item>
      <span class="list-item__title">ニックネーム</span>
      <span class="list-item__subtitle">{{ profile.nickname }}</span>
    </v-ons-list-item>
    <v-ons-list-item>
      <span class="list-item__title">メールアドレス</span>
      <span class="list-item__subtitle">{{ profile.email }}</span>
    </v-ons-list-item>
    <v-ons-list-item>
      <span class="list-item__title">自己紹介</span>
      <span class="list-item__subtitle">{{ profile.introduction }}</span>
    </v-ons-list-item>
    <v-ons-list-item>
      <span class="list-item__title">生年月日</span>
      <span class="list-item__subtitle">{{ profile.birthday }}</span>
    </v-ons-list-item>
    <v-ons-list-item>
      <span class="list-item__title" v-show="qrcode">招待コード</span>
      <span class="list-item__subtitle qrcode" v-html="qrcode"></span>
    </v-ons-list-item>
  </v-ons-list>

  <progress-circular v-show="showProgress"></progress-circular>
</v-ons-page>
</template>

<script>
import { mapState } from 'vuex'
import Config from '@/config'

export default {
  name: 'profile_view',
  computed: {
    ...mapState('profile', {
      profile: state => state.user,
      qrcode: state => state.qrcode,
      showProgress: state => state.progressing
    })
  },
  methods: {
    async getProfile () {
      try {
        this.$store.dispatch('profile/clear')
        await this.$store.dispatch('profile/get')
      } catch (e) {
        console.log(e)
        this.$ons.notification.toast(e.message, {timeout: Config.timeout})
      }
    }
  },
  beforeMount () {
    this.getProfile()
  }
}
</script>

<style scoped>
.photo {
  width: 100%;
}
.qrcode {
  text-align: center;
}
</style>
