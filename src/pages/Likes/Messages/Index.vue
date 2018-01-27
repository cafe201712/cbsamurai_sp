<template>
<v-ons-page>
  <custom-toolbar backLabel="戻る">
    メッセージ
  </custom-toolbar>

  <v-ons-pull-hook
    :action="getMessagesMore"
    @changestate="state = $event.state"
  >
    <span v-show="state === 'initial'"> もっと表示 </span>
    <span v-show="state === 'preaction'"> 手を離す </span>
    <span v-show="state === 'action'"> 読み込み中... </span>
  </v-ons-pull-hook>

  <div id="container" class="container">
    <b-alert variant="secondary" :show="showAlert">
      まだ、メッセージがありません
    </b-alert>

    <message v-for="message in messages" :key="message.id"
      :from-user="fromUser"
      :message="message"
      :start-of-year="startOfYear"
      :start-of-day="startOfDay"
    >
    </message>

    <div class="num_of_tickets">
      <b-badge :variant="ticketsBadgeVariant(numOfTickets)">チケット残: {{ numOfTickets }}枚</b-badge>
    </div>
  </div>

  <v-ons-bottom-toolbar>
    <div class="msgbox">
      <b-form-input v-model="message" placeholder="メッセージ" require></b-form-input>
      <v-ons-button @click="send()">
        <v-ons-icon icon="ion-android-send, material:md-mail-send"></v-ons-icon>
      </v-ons-button>
    </div>
  </v-ons-bottom-toolbar>

  <progress-circular v-show="showProgress"></progress-circular>
</v-ons-page>
</template>

<script>
import { mapState } from 'vuex'
import startOfDay from 'date-fns/start_of_day'
import startOfYear from 'date-fns/start_of_year'
import message from './Message'
import mixin from '@/mixin'
import Config from '@/config'

export default {
  name: 'messages_index',
  components: {
    message
  },
  mixins: [mixin],
  data () {
    return {
      state: 'initial',
      message: '',
      fromUserId: -1,         // 画面遷移してくる際に上書きされる値
      numOfTickets: -1        // 画面遷移してくる際に上書きされる値
    }
  },
  computed: {
    startOfYear () {
      return startOfYear(new Date())
    },
    startOfDay () {
      return startOfDay(new Date())
    },
    showAlert () {
      return this.pageCount !== null && this.messages.length === 0
    },
    loginUser () {
      return this.$store.state.loginUser
    },
    ...mapState('messages', {
      fromUser: state => state.fromUser,
      messages: state => state.messages,
      page: state => state.page,
      pageCount: state => state.pageCount,
      showProgress: state => state.progressing
    })
  },
  methods: {
    async refreshMessages () {
      try {
        await this.$store.dispatch('messages/refresh', this.fromUserId)
      } catch (e) {
        console.log(e)
        this.$ons.notification.toast(e.message, {timeout: Config.timeout})
      }
    },
    async getMessagesMore (done) {
      try {
        await this.$store.dispatch('messages/get', this.fromUserId)
      } catch (e) {
        console.log(e)
        this.$ons.notification.toast(e.message, {timeout: Config.timeout})
      } finally {
        done()
      }
    },
    async send () {
      if (!this.message.trim()) {
        return  // 未入力の時は何もしない
      }
      const msgObj = {
        to_id: this.fromUserId,
        body: this.message
      }
      try {
        const res = await this.$store.dispatch('messages/add', msgObj)
        if (res.data.success !== true) {
          this.$ons.notification.alert(this.firstErrorMessage(res.data.errors))
        }
      } catch (e) {
        console.log(e)
        this.$ons.notification.toast(e.message, {timeout: Config.timeout})
      }
      this.message = ''
    },
    scrollToBottom () {
      const container = this.$el.querySelector('#container')
      this.$el.scrollTop = container.scrollHeight
    }
  },
  beforeMount () {
    this.refreshMessages()
  },
  updated () {
    if (this.page === 1) {
      this.scrollToBottom()
    }
  },
  destroyed () {
    try {
      // 新着メッセージ件数を最新にする為に、いいね一覧を永久指名一覧を再取得する
      this.$store.dispatch('home/getLikes')
    } catch (e) {
      console.log(e)
      this.$ons.notification.toast(e.message, {timeout: Config.timeout})
    }
  }
}
</script>

<style scoped>
.msgbox {
  display: table;
  width: 100%;
  height: 100%;
}
input {
  display: table-cell;
  height: 100%;
  border-radius: 0;
}
ons-button {
  display: table-cell;
  border-radius: 0;
  width: 1%;
}
ons-icon {
  vertical-align: 0 !important;
}
.container {
  margin: 10px 0;
}
.num_of_tickets {
  margin-bottom: 10px;
  float: right;
}
</style>
