import Mock from 'mockjs'

import { bodyParser, resultSuccess, resultError } from '../utils'
import { users, getUserInfo } from '../utils/user-info'

const login = options => {
  const { username, password } = bodyParser(options.body)

  if (!username || !password) {
    return resultError({ message: '请输入用户名或密码！' })
  }

  const user = users.find(item => item.username === username)

  if (!user) {
    return resultError({ message: '请输入正确的用户名！' })
  }

  const data = getUserInfo(user.token)

  return resultSuccess({ data })
}

const logout = options => {
  return resultSuccess({ message: '注销成功' })
}

Mock.mock(new RegExp('/api/auth/login'), 'post', login)
Mock.mock(new RegExp('/api/auth/logout'), 'post', logout)
