import axios from 'axios'

import { getToken } from '@/utils/auth'

import { message } from 'ant-design-vue'

const services = axios.create({
  baseURL: '/api',
  timeout: 8000
})

// 请求拦截
services.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      config.headers.token = token
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

services.interceptors.response.use(
  response => {
    const res = response.data

    if (res.code === -1) {
      const msg = res.message || '未知错误，请联系管理员查看'

      message.error(msg)

      return Promise.reject(msg)
    }

    return res.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default services
