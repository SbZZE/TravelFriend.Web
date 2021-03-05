import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
// axios 配置
axios.defaults.timeout = 30000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.withCredentials = true
axios.defaults.headers['x-requested-with'] = 'XMLHttpRequest'

axios.defaults.baseURL = 'http://localhost:8001/proxyApi'

axios.interceptors.request.use(function (config) {
  
  // 在发送请求之前做些什么
  config.headers['token'] = Vue.cookie.get('token') // 请求头带上token
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  console.log(response.data.code)
  if (response.data.code === 0) {
    return response
  } else if (response.data.code === 401) {
    window.location.reload()
  } else if (!response.data.msg) {
    return response
  } else {
    Message({
      message: response.data.msg,
      type: 'error'
    })
    return Promise.reject(response)
  }
}, function (error) {
  // 对响应错误做点什么
  if (error.data.code === 401) {
    window.location.reload()
  }
  Message({
    message: error.data.msg,
    type: 'error'
  })
  return Promise.reject(error)
})

export default function fetch (conf, params) {
  console.log('conf: ', conf)
  let methodStatus = conf.method.toUpperCase()
  let parameters = JSON.parse(JSON.stringify(params)) || {}
  if (methodStatus === 'POST') {
    return new Promise((resolve, reject) => {
      axios.post(conf.url, parameters)
        .then(response => {
          if (response.data.code === 401) {
            window.location.reload()
          }
          resolve(response.data)
        }, err => {
          reject(err)
        })
        .catch((error) => {
          reject(error)
        })
    })
  } else if (methodStatus === 'GET') {
    return new Promise((resolve, reject) => {
      axios.get(conf.url + '?' + qs.stringify(parameters))
        .then(response => {
          if (response.data.code === 401) {
            window.location.reload()
          }
          resolve(response.data)
        }, err => {
          reject(err)
        })
        .catch((error) => {
          reject(error)
        })
    })
  } else if (methodStatus === 'DELETE') {
    return new Promise((resolve, reject) => {
      axios.delete(conf.url, {data: parameters})
        .then(response => {
          if (response.data.code === 401) {
            window.location.reload()
          }
          resolve(response.data)
        }, err => {
          reject(err)
        })
        .catch((error) => {
          reject(error)
        })
    })
  } else {
    throw new Error(`暂不支持这个method：${conf.method}`)
  }
}

export function downLoadFetch (conf, params, name) {
  let fileName = name || 'export'
  return new Promise((resolve, reject) => {
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
      link.setAttribute('download', `${fileName}.txt`)
      document.body.appendChild(link)
      link.click()
      resolve(response)
    }).catch((error) => {
      // console.log(error)
      if (!error.data) {
        return
      }
      let url = window.URL.createObjectURL(new Blob([error.data]))
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', `${fileName}.txt`)
      document.body.appendChild(link)
      link.click()
      reject(error)
    })
  })
}