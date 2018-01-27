<template>
<v-ons-page>
  <custom-toolbar>
    {{ title }}
  </custom-toolbar>

  <v-ons-tabbar swipeable position="auto" :index.sync="index">
    <template slot="pages">
      <casts></casts>
      <likes></likes>
      <profiles></profiles>
    </template>

    <v-ons-tab
      icon='ion-ios-search, material:md-search'
      :label="this.label('キャバ嬢')"
    ></v-ons-tab>
    <v-ons-tab
      icon='ion-chatbubble-working, material:md-comments'
      :label="this.label('メッセージ')"
      :badge="this.unreadCount"
    ></v-ons-tab>
    <v-ons-tab
      icon='ion-ios-person, material:md-account'
      :label="this.label('プロフィール')"
    ></v-ons-tab>
  </v-ons-tabbar>
</v-ons-page>
</template>

<script>
import Likes from '@/pages/Likes/Index'
import Casts from '@/pages/Casts/Index'
import Profiles from '@/pages/Profiles/Index'

export default {
  name: 'app_tabbar',
  components: {
    Likes,
    Casts,
    Profiles
  },
  data () {
    return {
      titles: [
        'キャバ嬢',
        'メッセージ',
        'プロフィール'
      ]
    }
  },
  computed: {
    index: {
      get () {
        return this.$store.state.tabbar.index
      },
      set (newValue) {
        this.$store.commit('tabbar/set', newValue)
      }
    },
    title () {
      return this.titles[this.index]
    },
    unreadCount () {
      return this.$store.state.home.unreadCount > 0 ? this.$store.state.home.unreadCount : null
    }
  },
  methods: {
    label (label) {
      return this.md ? null : label
    }
  }
}
</script>
