import axios from 'axios'
import { MessageBox } from 'element-ui'
import { Notification } from 'element-ui'
import store from '@/store'
import { serialize } from '@/utils'
import qs from 'qs'
import i18n from '@/lang'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000, // request timeout
  withCredentials: true,
  validateStatus: function(status) {
    return status >= 200 && status <= 500 // 默认的
  }
})

// request interceptor
service.interceptors.request.use(
  config => {
    const token = store.getters.token
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }

    // headers中配置serialize为true开启序列化
    if (config.methods === 'post' && config.headers.serialize) {
      config.data = serialize(config.data)
      delete config.data.serialize
    }

    // 处理get 请求的数组 springmvc 可以处理
    if (config.method === 'get') {
      config.paramsSerializer = function(params) {
        return qs.stringify(params, { arrayFormat: 'repeat' })
      }
    }

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const status = Number(response.status) || 200
    let message = response.data.msg
    if (!message && status !== 200) {
      message = i18n.tc('error.' + status) || i18n.tc('error.default')
    }

    // 后台定义 424 针对令牌过去的特殊响应码
    if (status === 424) {
      MessageBox.confirm(i18n.tc('login.reLoginText'), i18n.tc('login.reLoginTitle'), {
        confirmButtonText: i18n.tc('login.reLoginConfirm'),
        cancelButtonText: i18n.tc('login.reLoginCancel'),
        type: 'warning'
      }).then(() => {
        store.dispatch('user/logout').then(() => {
          location.reload()
        })
      })
    }

    if (status !== 200 || response.data.code === 1) {
      Notification.error(message)
      return Promise.reject(new Error(message))
    }

    return response
  },
  error => {
    console.log('err' + error) // for debug
    Notification.error(error.message)
    return Promise.reject(error)
  }
)

export default service
