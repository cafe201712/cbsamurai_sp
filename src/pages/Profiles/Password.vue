<template>
<v-ons-page>
  <custom-toolbar backLabel="戻る">
    パスワード変更
  </custom-toolbar>

  <div class="container">
    <b-alert variant="danger" :show="showAlert">{{ message }}</b-alert>

    <b-form>
      <b-form-group>
        <b-form-input placeholder="現在のパスワード" type="password" require
          v-model="formData.current_password"
          :state="hasError('current_password')"
          aria-describedby="current_password-error"
        ></b-form-input>
        <b-form-invalid-feedback id="current_password-error">{{ errorMessage('current_password') }}</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group>
        <b-form-input placeholder="パスワード（8文字以上）" type="password" require
          v-model="formData.password"
          :state="hasError('password')"
          aria-describedby="password-error"
        ></b-form-input>
        <b-form-invalid-feedback id="password-error">{{ errorMessage('password') }}</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group>
        <b-form-input placeholder="パスワード（確認用）" type="password" require
          v-model="formData.password_confirm"
          :state="hasError('password_confirm')"
          aria-describedby="password_confirm-error"
        ></b-form-input>
        <b-form-invalid-feedback id="password_confirm-error">{{ errorMessage('password_confirm') }}</b-form-invalid-feedback>
      </b-form-group>
      <v-ons-button modifier="large" @click="submit">パスワード変更</v-ons-button>
    </b-form>
  </div><!-- /.container -->

  <progress-circular v-show="showProgress"></progress-circular>
</v-ons-page>
</template>

<script>
import Config from '@/config'

export default {
  name: 'profile_password',
  data () {
    return {
      formData: {
        current_password: '',
        password: '',
        password_confirm: ''
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
        const res = await this.$store.dispatch('profile/changePassword', this.formData)
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
  }
}
</script>

<style scoped>
.container {
  margin-top: 20px;
}
</style>