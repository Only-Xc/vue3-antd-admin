import { toRaw } from 'vue'
import { defineStore } from 'pinia'

import { useUserStore } from './user'

import { getRootRoute, asyncRoutes } from '@/router/routes'

import { isUrl } from '@/utils/is'

function hasPermission(roles, route) {
  if (route.meta?.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  }
  return true
}

/**
 * 通过角色过滤路由
 * 通常作为前端过滤权限时使用
 * @param {Array} routes 路由表
 * @param {Array} roles 角色列表
 */
function filterAsyncRoutesByRole(routes, roles) {
  const res = []

  routes.forEach(route => {
    if (hasPermission(roles, route)) {
      if (route.children?.length) {
        route.children = filterAsyncRoutesByRole(route.children, roles)
      }
      res.push(route)
    }
  })

  return res
}

function filterUrlRoute(routes) {
  const res = []

  routes.forEach(route => {
    if (!isUrl(route.path)) {
      if (route.children?.length) {
        route.children = filterUrlRoute(route.children)
      }
      res.push(route)
    }
  })

  return res
}

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    menus: [], // 显示的菜单
    addRoutes: [] // 新增的动态路由
  }),

  actions: {
    buildRoutes() {
      const userStore = useUserStore()

      // 获取菜单
      const menus = filterAsyncRoutesByRole(asyncRoutes, toRaw(userStore.roles))
      this.menus = menus

      // 获取路由
      const routes = filterUrlRoute(menus)
      // 指定首页
      routes.unshift(getRootRoute(userStore.homePath))

      console.log(routes)

      this.addRoutes = routes
      return routes
    }
  }
})
