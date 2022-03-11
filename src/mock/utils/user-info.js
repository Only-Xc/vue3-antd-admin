export const users = [
  {
    username: 'admin',
    token: 'f360og6crr2270n667vwmpfsn9r982cq',
    roles: ['admin'],
    homePath: '/home'
  },
  {
    username: 'test',
    token: 'f360og6crr2270n667vwmpfsn9r982cz',
    roles: ['test'],
    homePath: '/nested-menu'
  }
]

export function getUserInfo(token) {
  const user = users.find(item => item.token === token)

  const userInfo = {
    id: '6554504294113152',
    name: '小菜Der',
    password: '',
    ...user
  }
  return userInfo
}
