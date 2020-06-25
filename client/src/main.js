import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './routers'
import { store } from './store/store'
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store: store,
  created () {

  },
  render: h => h(App)
}).$mount('#app')
