// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'
import '@/main.css'

import Vue from 'vue'
import VueOnsen from 'vue-onsenui'
import BootstrapVue from 'bootstrap-vue'
import store from '@/store'
import App from '@/AppNavigator'
import CustomToolbar from '@/partials/CustomToolbar.vue'
import ProgressCircular from '@/partials/ProgressCircular.vue'

Vue.config.productionTip = false
Vue.use(VueOnsen)
Vue.use(BootstrapVue)
Vue.component('custom-toolbar', CustomToolbar)
Vue.component('progress-circular', ProgressCircular)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App },
  beforeCreate () {
    // Shortcut for Material Design
    Vue.prototype.md = this.$ons.platform.isAndroid()

    // Set iPhoneX flag based on URL
    if (window.location.search.match(/iphonex/i)) {
      document.documentElement.setAttribute('onsflag-iphonex-portrait', '')
      document.documentElement.setAttribute('onsflag-iphonex-landscape', '')
    }
  }
})
