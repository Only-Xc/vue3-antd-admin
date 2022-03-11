import Mock from 'mockjs'

import { resultSuccess, urlParser } from '../utils'
import { getUserInfo } from '../utils/user-info'

const info = options => {
  const { token } = urlParser(options.url)

  const data = getUserInfo(token)

  // data.routeList = [
  //   {
  //     id: 1,
  //     path: '/back',
  //     component: 'LAYOUT',
  //     meta: {
  //       title: '后台动态菜单'
  //     }
  //   },
  //   {
  //     id: 11,
  //     pid: 1,
  //     path: 'a',
  //     component: 'back-menu/a',
  //     meta: {
  //       title: 'a 页面'
  //     }
  //   },
  //   {
  //     id: 12,
  //     pid: 1,
  //     path: 'b',
  //     component: 'back-menu/b',
  //     meta: {
  //       title: 'b 页面'
  //     }
  //   }
  // ]

  return resultSuccess({ data })
}

Mock.mock(new RegExp('/api/user/info'), 'get', info)
