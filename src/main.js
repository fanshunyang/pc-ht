import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import axios from 'axios'
import moment from 'moment'
Vue.config.productionTip = false
Vue.use(ElementUI)

// ------------------------------axios优化
axios.defaults.baseURL = 'http://localhost:3000'

Vue.prototype.axios = axios

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

Vue.filter('item', function (input, format = 'YYYY-MM-DD') {
  return moment(input).format(format)
})
Vue.prototype.revision = function (url) {
  if (url.startsWith('http')) {
    return url
  } else {
    return axios.defaults.baseURL + url
  }
}
