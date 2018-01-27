<template>
<v-ons-page>
  <custom-toolbar backLabel="戻る">
    {{ guest.nickname }}
  </custom-toolbar>

  <img :src="guest.photoUrl" class="photo">

  <v-ons-list>
    <v-ons-list-item>
      <span class="list-item__title">ニックネーム</span>
      <span class="list-item__subtitle">{{ guest.nickname }}</span>
    </v-ons-list-item>
    <v-ons-list-item>
      <span class="list-item__title">自己紹介</span>
      <span class="list-item__subtitle">{{ guest.introduction }}</span>
    </v-ons-list-item>
    <v-ons-list-item>
      <span class="list-item__title">生年月日</span>
      <span class="list-item__subtitle">{{ guest.birthday }}</span>
    </v-ons-list-item>
    <v-ons-list-item>
      <span class="list-item__title">チケット数</span>
      <span class="list-item__subtitle">{{ numOfTickets }} 枚</span>
    </v-ons-list-item>
    <v-ons-list-item>
      <v-ons-button modifier="large" @click="addTickets">+ チケット {{additionalTickets}}枚</v-ons-button>
    </v-ons-list-item>
  </v-ons-list>

  <progress-circular v-show="showProgress"></progress-circular>
</v-ons-page>
</template>

<script>
import { mapState } from 'vuex'
import Config from '@/config'

export default {
  name: 'profile_guest',
  data () {
    return {
      id: null,   // 画面に遷移してくる際に継承で上書きされる値
      additionalTickets: Config.additionalTickets,
      message: '',
      messageType: 'success'
    }
  },
  computed: {
    ...mapState('guest', {
      guest: state => state.guest,
      numOfTickets: state => state.numOfTickets,
      showProgress: state => state.progressing
    })
  },
  methods: {
    async getGuest () {
      try {
        this.$store.dispatch('guest/clear')
        await this.$store.dispatch('guest/get', this.id)
      } catch (e) {
        console.log(e)
        this.$ons.notification.toast(e.message, {timeout: Config.timeout})
      }
    },
    async addTickets () {
      try {
        const success = await this.$store.dispatch('guest/addTickets', this.id)
        if (success === true) {
          this.$ons.notification.toast('チケットを追加しました', {timeout: Config.timeout})

          // プロフィール一覧のチケット残をリフレッシュする
          this.refresh()
        }
      } catch (e) {
        console.log(e)
        this.$ons.notification.toast(e.message, {timeout: Config.timeout})
      }
    },
    refresh () {
      this.$store.dispatch('home/getLikes')
    }
  },
  beforeMount () {
    this.getGuest()
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
