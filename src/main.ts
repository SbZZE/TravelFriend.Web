import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from './utils/http'
import apiConfig from './utils/apiConfig'


const app = createApp(App)

//全局挂载
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$apiConfig = apiConfig;//所有api地址

app.use(ElementPlus)
app.use(store)
app.use(router)
app.mount('#app');

console.log(app.config);