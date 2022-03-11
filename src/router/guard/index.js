/**
 * @file 路由守卫入口文件
 */

import { createPermissionGuard } from './permission.guard'

export function setupRouterGuard(router) {
  createPermissionGuard(router)
}
