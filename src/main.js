// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import AntUi from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import { message } from 'ant-design-vue'
import store from './store'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
Vue.use(AntUi)
Vue.config.productionTip = false
Vue.prototype.$message = message
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
