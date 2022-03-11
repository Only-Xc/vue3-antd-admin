/**
 * @file 处理动态路由的一系列方法
 */
import { warn } from '@/utils/log'
import { cloneDeep } from '@/utils'
import { LAYOUT } from '../constants'

let dynamicViewsModules

/**
 * 动态生成路由
 * @param {*} routes
 * @returns
 */
function asyncGeneratorRoute(routes) {
  dynamicViewsModules =
    dynamicViewsModules || import.meta.glob('../../views/**/*.{vue,tsx}')
  return routes.map(route => {
    const { title, icon } = route.meta || {}

    const tempRoute = {
      path: route.path,
      name: route.name || route.key,
      component: dynamicImport(dynamicViewsModules, route.component),
      meta: { title, icon }
    }

    if (route.children?.length > 0) {
      route.children = asyncGeneratorRoute(route.children)
    }

    return tempRoute
  })
}

/**
 * 动态引入组件
 * @param {Module} dynamicViewsModules
 * @param {string} component
 */
function dynamicImport(dynamicViewsModules, component) {
  const keys = Object.keys(dynamicViewsModules)

  const matchKeys = keys.filter(key => {
    const k = key.replace('../../views', '')
    const startFlag = component.startsWith('/')
    const endFlag = component.endsWith('.vue') || component.endsWith('.jsx')
    const startIndex = startFlag ? 1 : 0
    const endIndex = endFlag ? k.length : k.lastIndexOf('.')
    return k.substring(startIndex, endIndex) === component
  })

  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0]
    return dynamicViewsModules[matchKey]
  } else if (matchKeys?.length > 1) {
    warn(
      '请不要在 views 文件夹下的同一层次目录中创建相同名称的 .vue 和 .jsx 文件。这还导致动态引入失败。'
    )
  } else {
    warn(
      '在src/views/下找不到`' +
        component +
        '.vue` 或 `' +
        component +
        '.jsx`, 请自行创建!'
    )
  }
}

/**
 * 将后端返回的路由表转换为 vue-router 需要的数据结构
 * @param {Object} routes
 */
export function transformObjToRoute(routes) {
  const newRoutes = routes.map(route => {
    const { key, name, component, meta = {} } = route
    if (component) {
      if (component.toUpperCase() === 'LAYOUT') {
        route.component = LAYOUT
      } else {
        // 在路由外包装一层 Layout
        route.children = [cloneDeep(route)]
        route.component = LAYOUT
        route.name = `${name || key}Parent`
        route.path = ''
        route.meta = { ...meta, single: true }
      }
    } else {
      warn(`请配置路由 ${name} 的 component 属性`)
    }
    if (route.children) {
      route.children = asyncGeneratorRoute(route.children)
    }
  })

  return newRoutes
}
