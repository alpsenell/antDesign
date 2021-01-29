import Vue from 'vue'
import axios from 'axios';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import App from './App.vue'
import store from './store';

Vue.config.productionTip = false

window.axios = axios;

Vue.use(Antd);

new Vue({
  render: h => h(App),
  store: store
}).$mount('#app')
