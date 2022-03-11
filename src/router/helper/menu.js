/**
 * @file 处理菜单数据的一系列方法
 */

import { cloneDeep } from '@/utils'
import { isUrl } from '@/utils/is'

/**
 * 将路由转换为菜单
 * @param {Array} routes 路由
 * @returns
 */
export function transformRouteToMenu(routes) {
  const newRoutes = filterHiddenRoute(routes)

  joinParentPath(newRoutes)

  return newRoutes
}

/**
 * 连接父路径
 * @description 解决嵌套路由路径问题
 * @param {*} menus
 * @param {*} parentPath
 */
function joinParentPath(menus, parentPath = '') {
  for (let i = 0; i < menus.length; i++) {
    const menu = menus[i]

    // 不是根目录则对路径进行拼接（以 / 开头的视为根目录）
    if (!(menu.path.startsWith('/') || isUrl(menu.path))) {
      menu.path = `${parentPath}/${menu.path}`
    }

    if (menu?.children?.length) {
      joinParentPath(menu.children, menu.path)
    }
  }
}

function filterHiddenRoute(routes) {
  const res = []
  routes.forEach(route => {
    if (!route.hidden) {
      if (route.children?.length) {
        route.children = filterHiddenRoute(route.children)
      }

      res.push(route)
    }
  })

  return res
}
