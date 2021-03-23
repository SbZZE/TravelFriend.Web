import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import store from './store';

import VueCookie from 'vue-cookie'
import apiConfig from './utils/apiConfig'
// import httpRequest from '@/utils/httpRequest' // api: https://github.com/axios/axios
import { isAuth } from '@/utils'
import cloneDeep from 'lodash/cloneDeep'

import myHttp from '@/utils/myHttpServer'

const app = createApp(App).use(router).use(store)
app.use(ElementPlus)
app.mount('#app')
// 挂载全局
// app.prototype.$http = httpRequest // ajax请求方法
app.prototype.isAuth = isAuth     // 权限方法

app.prototype.$$ = myHttp // 自定义请求方法
app.prototype.$c = apiConfig // 自定义请求方法
app.prototype.$cookie = VueCookie

// 保存整站vuex本地储存初始状态
window.SITE_CONFIG['storeState'] = cloneDeep(store.state)