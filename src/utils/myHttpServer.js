import axios from 'axios'
import qs from 'qs'
// import { Message } from 'element-plus'
// axios 配置
axios.defaults.timeout = 30000;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.withCredentials = true;
axios.defaults.headers['x-requested-with'] = 'XMLHttpRequest';
// 模拟环境
// axios.defaults.baseURL = 'http://myqqy'+process.env.VUE_APP_BASE_URL;
// axios.defaults.baseURL = window.location.origin.split('.')[0]+process.env.VUE_APP_BASE_URL;
axios.defaults.baseURL = window.location.origin + '/app'
// axios.defaults.baseURL = 'http://myqqy.vicp.io/app'

// POST传参序列化
// axios.interceptors.request.use((config) => {
//   if (config.method === 'post') {
//     config.data = qs.stringify(config.data);
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// })

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // console.log(response.data)
  // response.status == '401'
  // 对响应数据做点什么
  if (response.data.code == 0) {
    console.log('x')
    return response;
  } else {
    console.log(response.data)
    Message({
      type: 'error',
      message: response.data.msg
    })
    return Promise.reject()
  }
}, function (error) {
  // 对响应错误做点什么
  if (error.message == 'Network Error') {
    Message({
      message: '连接失败，请重试！',
      type: 'error'
    });
  } else if (error.message == 'timeout of 30000ms') {
    Message({
      message: '连接超时，请重试！',
      type: 'error'
    });
  } else {
    Message({
      message: '请求失败，请重试！',
      type: 'error'
    });
  }
  return Promise.reject(error);
});

export default function fetch(conf, params) {
  let methodStatus = conf.method.toUpperCase();
  let parameters = JSON.parse(JSON.stringify(params)) || {};
  if (methodStatus == 'POST') {
    return new Promise((resolve, reject) => {
      axios.post(conf.url, parameters)
        .then(response => {
          if (response.data.code === 0) {
            resolve(response.data);
          } else {
            reject(response.data)
          }
        }, err => {
          reject(err);
        })
        .catch((error) => {
          reject(error);
        })
    })
  } else if (methodStatus == 'GET') {
    return new Promise((resolve, reject) => {
      axios.get(conf.url + '?' + qs.stringify(parameters))
        .then(response => {
          if (response.data.code === 0) {
            resolve(response.data);
          } else {
            reject(response.data)
          }
        }, err => {
          reject(err);
        })
        .catch((error) => {
          reject(error);
        })
    })
  } else if (methodStatus == 'DELETE') {
    return new Promise((resolve, reject) => {
      axios.delete(conf.url, {data: parameters})
        .then(response => {
          resolve(response.data);
        }, err => {
          reject(err);
        })
        .catch((error) => {
          reject(error);
        })
    })
  } else {
    throw new Error(`暂不支持这个method：${conf.method}`);
  }
}

export const downLoadFetch = (conf, params, name) => {
  let fileName = name || 'export'
  axios({
    method: 'get', 
    url: `${conf.url}?${qs.stringify(params)}`,
    responseType: 'blob'
  }).then(response => {
    if (!response.data) {
      return
    }
    let url = window.URL.createObjectURL(new Blob([response.data]))
    let link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', `${fileName}.xls`)
    
    document.body.appendChild(link)
    link.click()
  }).catch((error) => {
    console.log(error);
  })
}
