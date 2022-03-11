import { asyncRoutes } from './async-routes'
import {
  getRootRoute,
  LOGIN_ROUTE,
  REDIRECT_ROUTE,
  PAGE_NOT_FIND_ROUTE
} from './basic'

// 初始化时挂载的路由表
export const basicRoutes = [LOGIN_ROUTE, REDIRECT_ROUTE, PAGE_NOT_FIND_ROUTE]

export { getRootRoute, asyncRoutes }
