<template>
  <v-ons-navigator swipable
    :page-stack="pageStack"
    :options="options"
  >
  </v-ons-navigator>
</template>

<script>
import Login from '@/pages/Login/Login'

export default {
  name: 'app_navigator',
  beforeCreate () {
    const env = process.env
    console.log('API_HOST: ' + env.API_HOST)
    console.log('API_PATH: ' + env.API_PATH)
    console.log('NODE_ENV: ' + env.NODE_ENV)
    this.$store.commit('navigator/push', Login)
  },
  computed: {
    pageStack () {
      return this.$store.state.navigator.stack
    },
    options () {
      return this.$store.state.navigator.options
    }
  }
}
</script>
