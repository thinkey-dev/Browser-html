import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import i18n from './i18n/langs';
import store from './store'
import '../theme/index.css'
import utils from './utils/index'
import echarts from 'echarts';
Vue.prototype.$echarts = echarts;
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(utils)
Vue.config.productionTip=false
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})
