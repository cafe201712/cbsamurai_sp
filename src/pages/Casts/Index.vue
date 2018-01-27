<template>
<v-ons-page :infinite-scroll="getCastsMore">
  <v-ons-row>
    <v-ons-col width="50%" v-for="cast in casts" :key="cast.id" @click="view(cast.id)">
      <v-ons-card>
        <img :src="cast.thumbnailUrl" alt="">
        <p class="title">{{ cast.nickname }}</p>
        <p class="place">{{ cast.shop.pref }} {{ cast.shop.area }}</p>
        <p class="desc">{{ cast.shop.name }}</p>
      </v-ons-card>
    </v-ons-col>
  </v-ons-row>

  <progress-circular v-show="showProgress"></progress-circular>
</v-ons-page>
</template>

<script>
import { mapState } from 'vuex'
import View from './View'
import Config from '@/config'

export default {
  name: 'casts_index',
  computed: {
    ...mapState('casts', {
      casts: state => state.casts,
      showProgress: state => state.progressing
    })
  },
  methods: {
    view (id) {
      this.$store.commit('navigator/push', {
        extends: View,
        data () {
          return {
            id: id
          }
        }
      })
    },
    async refreshCasts () {
      try {
        await this.$store.dispatch('casts/refresh')
      } catch (e) {
        console.log(e)
        this.$ons.notification.toast(e.message, {timeout: Config.timeout})
      }
    },
    async getCastsMore (done) {
      try {
        await this.$store.dispatch('casts/get')
      } catch (e) {
        console.log(e)
        this.$ons.notification.toast(e.message, {timeout: Config.timeout})
      } finally {
        done()
      }
    }
  },
  beforeMount () {
    this.refreshCasts()
  }
}
</script>

<style scoped>
ons-search-input {
  display: block;
  margin: 10px;
}
img {
  width: 100%;
}
.card {
  padding: 5px;
  margin: 5px;
}
.card p {
  margin: 5px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.title {
  font-size: 14px;
  font-weight: bold;
}
.place {
  font-size: 12px;
}
.desc {
  font-size: 12px;
}
</style>