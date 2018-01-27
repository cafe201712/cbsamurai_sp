<template>
<v-ons-page>
  <v-ons-list>
    <v-ons-list-header>プロフィール</v-ons-list-header>
    <user-list-item
      :user="loginUser"
      @click="profile()"
    ></user-list-item>

    <v-ons-list-header v-show="hasSelections">永久指名</v-ons-list-header>
    <user-list-item v-for="selection in selections" :key="selection.id"
      :user="getUser(selection)"
      :numOfTickets="selection.num_of_tickets"
      @click="view(selection)"
    ></user-list-item>

    <v-ons-list-header>いいね</v-ons-list-header>
    <v-ons-list-item v-if="!hasLikes">
      まだ、「いいね」している人はいません
    </v-ons-list-item>
    <user-list-item v-for="like in likes" :key="like.id"
      :user="getUser(like)"
      :numOfTickets="like.num_of_tickets"
      @click="view(like)"
    ></user-list-item>
  </v-ons-list>
</v-ons-page>
</template>

<script>
import { mapState } from 'vuex'
import AppSplitter from '@/AppSplitter'
import castView from '@/pages/Casts/View'
import userListItem from './userListItem'
import guestView from './Guest'

export default {
  name: 'profiles_index',
  components: {
    userListItem
  },
  computed: {
    loginUser () {
      return this.$store.state.loginUser
    },
    hasSelections () {
      return this.selections.length > 0
    },
    hasLikes () {
      return this.likes.length > 0
    },
    ...mapState('home', {
      selections: state => state.selections,
      likes: state => state.likes
    })
  },
  methods: {
    getUser (like) {
      return like.guest ? like.guest : like.cast
    },
    profile () {
      this.$store.commit('navigator/push', AppSplitter)
    },
    view (like) {
      const user = this.getUser(like)
      if (user.role === 'cast') {
        this.viewCast(user.id)
      } else {
        this.viewGuest(user.id, like.num_of_tickets)
      }
    },
    viewCast (id) {
      this.$store.commit('navigator/push', {
        extends: castView,
        data () {
          return {
            id: id
          }
        }
      })
    },
    viewGuest (id, numOfTickets) {
      this.$store.commit('guest/numOfTickets', numOfTickets)
      this.$store.commit('navigator/push', {
        extends: guestView,
        data () {
          return {
            id: id
          }
        }
      })
    }
  }
}
</script>
