<template>
  <v-ons-list-item modifier="chevron" @click="click()">
    <div class="left">
      <img class="list-item__thumbnail" :src="user.thumbnailUrl" alt="">
    </div>
    <div class="center">
      <div class="list-item__title">
        {{ user.nickname }}
        <b-badge :variant="ticketsBadgeVariant(numOfTickets)" v-show="isGuest">{{ numOfTickets }}</b-badge>
      </div>
      <div class="list-item__subtitle">{{ shopName }}</div>
    </div>
  </v-ons-list-item>
</template>

<script>
import mixin from '@/mixin'

export default {
  name: 'likes_userListItem',
  mixins: [mixin],
  props: {
    user: Object,
    numOfTickets: Number
  },
  computed: {
    shopName () {
      return this.user.shop ? this.user.shop.name : ''
    },
    isGuest () {
      return this.user.role === 'user'
    }
  },
  methods: {
    click () {
      this.$emit('click', this.user)
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
.badge-warning {
  color: white;
}
</style>