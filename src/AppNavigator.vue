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
    console.log(process.env)
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
