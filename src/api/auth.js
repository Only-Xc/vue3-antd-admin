import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export function logout(data) {
  return request({
    url: '/auth/logout',
    method: 'post',
    data
  })
}
