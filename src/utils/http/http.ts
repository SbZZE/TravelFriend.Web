import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElLoading } from 'element-plus';

axios.defaults.baseURL = 'http://localhost:8080'
let loading: any;

const startLoading = () => {

  interface Options {
    lock: boolean;
    text: string;
    background: string;
  };

  const options: Options = {
    lock: true,
    text: "加载中...",
    background: 'rgba(0,0,0,0.7)'
  }
  loading = ElLoading.service(options);
}

const endLoading = () => {
  loading.close();
}

// 请求拦截
axios.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers.Authorization = "Bearer " + localStorage.getItem('msToken');
  // 加载
  startLoading();
  return config;
})


// 响应拦截
axios.interceptors.response.use((response: AxiosResponse<any>) => {
  // 结束loading
  endLoading();
  if (response.data.status == 603) {
    window.location.href = "/"
  }
  return response;
}, error => {
  // 结束loading
  endLoading();
  // 错误提醒
  return Promise.reject(error);
})

export default axios;
