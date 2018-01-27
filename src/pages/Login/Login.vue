<template>
<v-ons-page>
  <div class="container">
    <div class="header">
      <img src="../../assets/logo.png">
    </div>

    <v-ons-card>
      <h3>ログイン</h3>

      <b-alert variant="danger" :show="showAlert">{{ message }}</b-alert>
      <b-form>
        <b-form-group>
          <b-form-input placeholder="メールアドレス" require v-model="email"></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input placeholder="パスワード" type="password" require v-model="password"></b-form-input>
        </b-form-group>
        <v-ons-button modifier="large" @click="login">ログイン</v-ons-button>
      </b-form>
    </v-ons-card>
    <v-ons-card>
      <div class="fieldblock">
        <v-ons-button modifier="large cta" @click="signup" style="font-size: 12px">
          アカウントを持っていない方は登録してください
        </v-ons-button>
      </div>
      <div class="fieldblock">
        <v-ons-button modifier="large outline" @click="resetPassword">
          パスワードを忘れた方はこちら
        </v-ons-button>
      </div>
    </v-ons-card>

  </div><!-- /.container -->

  <progress-circular v-show="showProgress"></progress-circular>
</v-ons-page>
</template>

<script>
import AppTabbar from '@/AppTabbar'
import Api from '@/api'
import Config from '@/config'

export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: '',

      message: '',
      showProgress: false
    }
  },
  computed: {
    showAlert () {
      return this.message.length > 0
    }
  },
  methods: {
    async login () {
      this.message = ''
      this.showProgress = true

      try {
        const res = await Api.login(this.$store.state.axios, this.email, this.password)
        if (res.data.success === true) {
          this.$store.commit('login', res.data.user)
          this.$store.commit('navigator/push', AppTabbar)
        } else {
          this.message = res.data.message
        }
      } catch (e) {
        console.log(e)
        this.$ons.notification.toast(e.message, {timeout: Config.timeout})
      } finally {
        this.showProgress = false
      }
    },
    resetPassword () {
      window.open(process.env.API_HOST + '/request-reset-password', '_blank')
    },
    signup () {
      window.open(process.env.API_HOST + '/register', '_blank')
    }
  },
  beforeCreate () {
    let strLoginUser = localStorage.getItem('loginUser')
    if (strLoginUser) {
      // restore login data
      let loginUser = JSON.parse(strLoginUser)
      this.$store.commit('login', loginUser)

      // ログイン情報がある時、ログイン画面をスキップする
      this.$store.commit('navigator/push', AppTabbar)
    }
  }
}
</script>

<style scoped>
ons-card {
  margin-bottom: 20px
}
</style>
