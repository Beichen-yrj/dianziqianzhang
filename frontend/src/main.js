import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router'
import routes from './router'
import axios from "axios";
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'
axios.defaults.baseURL='/api'

import './assets/css/style.css'

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(VueCookies)
Vue.config.productionTip = false


const router = new VueRouter({
  routes
})


new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
