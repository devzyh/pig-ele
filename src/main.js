import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import '@/styles/element-variables.scss'
import '@/styles/index.scss' // global css

import Avue from '@smallwei/avue'
import '@smallwei/avue/lib/index.css'
import AvueFormDesign from '@sscfaith/avue-form-design'

import App from './App'
import store from './store'
import router from './router'
import i18n from './lang' // internationalization
import '@/icons' // icon
import '@/permission' // permission control
import '@/utils/error-log' // error log

import * as filters from './filters' // global filters

Vue.use(Element, {
  size: Cookies.get('size') || 'mini', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

Vue.use(Avue, {
  size: 'mini', // set element-ui default size
  menuType: 'text'
})
Vue.use(AvueFormDesign)

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
