<template>
<v-ons-page>
  <v-ons-list>
    <v-ons-list-header v-show="hasSelections">永久指名</v-ons-list-header>
    <user-list-item v-for="selection in selections" :key="selection.id"
      :user="getUser(selection)"
      :numOfTickets="selection.num_of_tickets"
      @click="view"
    ></user-list-item>

    <v-ons-list-header>いいね</v-ons-list-header>
    <v-ons-list-item v-if="!hasLikes">
      まだ、「いいね」している人はいません
    </v-ons-list-item>
    <user-list-item v-for="like in likes" :key="like.id"
      :user="getUser(like)"
      :numOfTickets="like.num_of_tickets"
      @click="view"
    ></user-list-item>
  </v-ons-list>

  <progress-circular v-show="showProgress"></progress-circular>
</v-ons-page>
</template>

<script>
import { mapState } from 'vuex'
import userListItem from './userListItem'
import Messages from './Messages/Index'
import Config from '@/config'

export default {
  name: 'likes_index',
  components: {
    userListItem
  },
  computed: {
    hasSelections () {
      return this.selections.length > 0
    },
    hasLikes () {
      return this.likes.length > 0
    },
    ...mapState('home', {
      selections: state => state.selections,
      likes: state => state.likes,
      showProgress: state => state.progressing
    })
  },
  methods: {
    getUser (like) {
      return like.guest ? like.guest : like.cast
    },
    view (user, numOfTickets) {
      this.$store.commit('navigator/push', {
        extends: Messages,
        data () {
          return {
            fromUserId: user.id,
            numOfTickets: numOfTickets
          }
        }
      })
    }
  },
  beforeMount () {
    try {
      this.$store.dispatch('home/getLikes')
    } catch (e) {
      console.log(e)
      this.$ons.notification.toast(e.message, {timeout: Config.timeout})
    }
  }
}
</script>

<style scoped>
.alert {
  margin: 10px;
}
</style>
