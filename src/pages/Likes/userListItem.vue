<template>
  <v-ons-list-item modifier="chevron" @click="click()">
    <div class="left">
      <img class="list-item__thumbnail" :src="user.thumbnailUrl" alt="">
    </div>
    <div class="center">
      <div class="list-item__title">
        {{ user.nickname }}
        <b-badge v-show="hasUnreadMessages" variant="success">{{ unreadMessages }}</b-badge>
      </div>
      <div class="list-item__subtitle">{{ shopName }}</div>
    </div>
  </v-ons-list-item>
</template>

<script>
export default {
  name: 'likes_userListItem',
  props: {
    user: Object,
    numOfTickets: Number
  },
  computed: {
    shopName () {
      return this.user.shop ? this.user.shop.name : ''
    },
    hasUnreadMessages () {
      if ('sent_messages' in this.user) {
        return this.unreadMessages > 0
      }
      return false
    },
    unreadMessages () {
      if ('sent_messages' in this.user) {
        return this.user.sent_messages.length
      }
      return 0
    }
  },
  methods: {
    click () {
      this.$emit('click', this.user, this.numOfTickets)
    }
  }
}
</script>

<style scoped>
.list-item__title,
.list-item__subtitle {
  /* 超長い文字列の時、右側を...で省略する */
  width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.list-item__thumbnail {
  object-fit: cover;
}
</style>