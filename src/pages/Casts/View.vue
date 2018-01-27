<template>
<v-ons-page>
  <custom-toolbar backLabel="戻る">
    {{ cast.nickname }}
  </custom-toolbar>

  <b-alert :variant="messageType" :show="showAlert" v-html="message"></b-alert>

  <img :src="cast.photoUrl" class="photo">

  <div v-if="isLoginUserGuest">
    <v-ons-row v-if="showSelectBtn">
      <v-ons-col width="50%">
        <v-ons-button modifier="large" disabled>いいね済</v-ons-button>
      </v-ons-col>
      <v-ons-col width="50%">
        <v-ons-button modifier="large" @click="select" :disabled="cast.isSelected">{{ selectBtnLabel }}</v-ons-button>
      </v-ons-col>
    </v-ons-row>
    <v-ons-row v-else>
      <v-ons-col width="100%">
        <v-ons-button modifier="large" @click="like">いいね</v-ons-button>
      </v-ons-col>
    </v-ons-row>
  </div>

  <v-ons-list>
    <v-ons-list-header>プロフィール</v-ons-list-header>
    <v-ons-list-item>
      <div class="list-item__title">ニックネーム</div>
      <div class="list-item__subtitle">{{ cast.nickname }}</div>
    </v-ons-list-item>
    <v-ons-list-item>
      <div class="list-item__title">自己紹介</div>
      <div class="list-item__subtitle">
        <pre>{{ cast.introduction }}</pre>
      </div>
    </v-ons-list-item>
    <v-ons-list-item>
      <div class="list-item__title">生年月日</div>
      <div class="list-item__subtitle">{{ cast.birthday }}</div>
    </v-ons-list-item>

    <v-ons-list-header>お店情報</v-ons-list-header>
    <v-ons-list-item>
      <div class="list-item__title">店名</div>
      <div class="list-item__subtitle">{{ cast.shop.name }}</div>
    </v-ons-list-item>
    <v-ons-list-item>
      <div class="list-item__title">お店情報</div>
      <div class="list-item__subtitle">
        <pre>{{ cast.shop.description }}</pre>
      </div>
    </v-ons-list-item>
    <v-ons-list-item>
      <div class="list-item__title">住所</div>
      <div class="list-item__subtitle">{{ cast.shop.address }}</div>
    </v-ons-list-item>
    <v-ons-list-item>
      <div class="list-item__title">TEL</div>
      <div class="list-item__subtitle">{{ cast.shop.tel }}</div>
    </v-ons-list-item>
  </v-ons-list>

  <progress-circular v-show="showProgress"></progress-circular>
</v-ons-page>
</template>

<script>
import { mapState } from 'vuex'
import Config from '@/config'
import mixin from '@/mixin'

export default {
  name: 'casts_view',
  mixins: [mixin],
  data () {
    return {
      id: null,   // 画面に遷移してくる際に継承で上書きされる値
      message: '',
      messageType: 'success'
    }
  },
  computed: {
    selectBtnLabel () {
      return this.cast.isSelected ? '永久指名済' : '永久指名'
    },
    showSelectBtn () {
      return this.cast.isLiked === true
    },
    showAlert () {
      return this.message.length > 0
    },
    isLoginUserGuest () {
      return this.$store.getters.isGuest
    },
    ...mapState('cast', {
      cast: state => state.cast,
      showProgress: state => state.progressing
    })
  },
  methods: {
    async getCast () {
      this.$store.dispatch('cast/clear')
      try {
        await this.$store.dispatch('cast/get', this.id)
      } catch (e) {
        console.log(e)
        this.$ons.notification.toast(e.message, {timeout: Config.timeout})
      }
    },
    async like () {
      const response = await this.$ons.notification.confirm('本当によろしいですか？')
      if (response) {
        try {
          const res = await this.$store.dispatch('cast/like', this.id)
          this.message = res.data.message
          this.messageType = res.data.success === true ? 'success' : 'danger'

          if (res.data.success === true) {
            // いいね一覧、永久指名一覧をリフレッシュする
            this.refresh()
          } else {
            this.message += '<br>' + this.firstErrorMessage(res.data.errors)
          }
        } catch (e) {
          console.log(e)
          this.$ons.notification.toast(e.message, {timeout: Config.timeout})
        }
      }
    },
    async select () {
      const response = await this.$ons.notification.confirm('本当によろしいですか？')
      if (response) {
        try {
          const res = await this.$store.dispatch('cast/select', this.id)
          this.message = res.data.message
          this.messageType = res.data.success === true ? 'success' : 'danger'
          if (res.data.success === true) {
            // いいね一覧、永久指名一覧をリフレッシュする
            this.refresh()
          } else {
            this.message += '<br>' + this.firstErrorMessage(res.data.errors)
          }
        } catch (e) {
          console.log(e)
          this.$ons.notification.toast(e.message, {timeout: Config.timeout})
        }
      }
    },
    refresh () {
      this.$store.dispatch('casts/refresh')
      this.$store.dispatch('home/getLikes')
    }
  },
  beforeMount () {
    this.getCast()
  }
}
</script>

<style scoped>
ons-row {
  margin-bottom: 10px;
}
ons-col {
  padding: 5px;
}
ons-list-item div {
  word-break: break-all;
}
pre {
  margin-top: 5px;
  margin-bottom: 0;

  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: auto;
}
.alert {
  margin-bottom: 0;
  border-radius: unset;
}
.photo {
  width: 100%;
}
</style>