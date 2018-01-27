<template>
<v-ons-page>
  <custom-toolbar backLabel="戻る">
    プロフィール編集
  </custom-toolbar>

  <div class="container">
    <b-alert variant="danger" :show="showAlert">{{ message }}</b-alert>

    <b-form>
      <b-form-group>
        <b-form-input placeholder="メールアドレス" type="email" require
          v-model="profile.email"
          :state="hasError('email')"
          aria-describedby="email-error"
        ></b-form-input>
        <b-form-invalid-feedback id="email-error">{{ errorMessage('email') }}</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group>
        <b-form-input placeholder="ニックネーム" require
          v-model="profile.nickname"
          :state="hasError('nickname')"
          aria-describedby="nickname-error"
        ></b-form-input>
        <b-form-invalid-feedback id="nickname-error">{{ errorMessage('nickname') }}</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group>
        <b-form-textarea placeholder="自己紹介" :rows="3"
          v-model="profile.introduction"
          :state="hasError('introduction')"
          aria-describedby="introduction-error"
        ></b-form-textarea>
        <b-form-invalid-feedback id="introduction-error">{{ errorMessage('introduction') }}</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group>
        <b-form-input type="date"
          v-model="profile.birthday"
          :state="hasError('birthday')"
          aria-describedby="birthday-error"
        ></b-form-input>
        <b-form-invalid-feedback id="date-error">{{ errorMessage('birthday') }}</b-form-invalid-feedback>
      </b-form-group>
      <v-ons-button modifier="large" @click="submit">保存</v-ons-button>
    </b-form>
  </div><!-- /.container -->

  <progress-circular v-show="showProgress"></progress-circular>
</v-ons-page>
</template>

<script>
import Config from '@/config'

export default {
  name: 'profile_edit',
  data () {
    return {
      profile: {
        email: '',
        nickname: '',
        introduction: '',
        birthday: ''
      },
      message: '',
      errors: {}
    }
  },
  computed: {
    showAlert () {
      return this.message.length > 0
    },
    showProgress () {
      return this.$store.state.profile.progressing
    }
  },
  methods: {
    async submit () {
      this.message = ''
      this.errors = {}

      try {
        const res = await this.$store.dispatch('profile/set', this.profile)
        let data = res.data
        if (data.success === true) {
          this.$ons.notification.toast(data.message, {timeout: Config.timeout})
          this.$store.commit('navigator/pop')
        } else {
          this.message = data.message
          this.errors = data.errors
        }
      } catch (e) {
        console.log(e)
        this.$ons.notification.toast(e.message, {timeout: Config.timeout})
      }
    },
    refreshProfile () {
      let sourceProfile = this.$store.state.profile.user
      for (const key of Object.keys(this.profile)) {
        this.profile[key] = sourceProfile[key]
      }
    },
    hasError (prop) {
      return this.errors.hasOwnProperty(prop) ? false : null
    },
    errorMessage (prop) {
      if (this.errors.hasOwnProperty(prop)) {
        // 最初のエラーメッセージを返す
        let keys = Object.keys(this.errors[prop])
        return this.errors[prop][keys[0]]
      }
      return ''
    }
  },
  beforeMount () {
    this.refreshProfile()
  }
}
</script>

<style scoped>
.container {
  margin-top: 20px;
}
</style>