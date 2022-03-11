/**
 * @file 权限鉴定守卫
 */

import { useUserStore } from '@/store'
import { usePermissionStore } from '@/store'

import { whiteList, BASE_HOME } from '../constants'
import { LOGIN_ROUTE, PAGE_NOT_FIND_ROUTE } from '../routes/basic'

export function createPermissionGuard(router) {
  const userStore = useUserStore()
  const permissionStore = usePermissionStore()

  router.beforeEach(async (to, form, next) => {
    const token = userStore.token

    if (token) {
      if (to.path === LOGIN_ROUTE.path) {
        next({ path: BASE_HOME })
      } else {
        if (!userStore.id) {
          try {
            await userStore.getUserInfo(token)

            const routes = await permissionStore.buildRoutes()

            routes.forEach(router.addRoute)

            // 解决异步路由跳转问题
            if (to.name === PAGE_NOT_FIND_ROUTE.name) {
              next({ path: to.fullPath, replace: true, query: to.query })
            } else {
              next({ ...to, replace: true })
            }
          } catch (error) {
            console.log('获取用户信息出错', error)
            next({ path: LOGIN_ROUTE.path })
          }
        } else {
          next()
        }
      }
    } else {
      if (whiteList.includes(to.path)) {
        // 如果为白名单则进入
        next()
      } else {
        // 其余都跳转到登录页
        next({ path: LOGIN_ROUTE.path })
      }
    }
  })
}
