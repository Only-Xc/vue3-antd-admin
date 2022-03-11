import { LAYOUT } from '../constants'

/**
 * 一个完整的路由结构示例
 * {
 *   path: '/settings',
 *   name: 'Settings',
 *   component: LAYOUT,
 *   meta: {
 *     icon: 'HomeOutlined',
 *     title: '系统设置'
 *   },
 *   children: [
 *     {
 *       path: 'user-center',
 *       name: 'UserCenter',
 *       component: () => import('@/views/settings/user-center/index.vue'),
 *       meta: {
 *         title: '用户中心'
 *       }
 *     },
 *     {
 *       path: 'user-setting',
 *       name: 'UserSetting',
 *       component: () => import('@/views/settings/user-setting/index.vue'),
 *       meta: {
 *         title: '用户设置'
 *       }
 *     }
 *   ]
 * },
 */

export const asyncRoutes = [
  {
    path: '/home',
    component: LAYOUT,
    redirect: '/home/index',
    meta: { roles: ['admin'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/home.vue'),
        meta: {
          title: '首页',
          icon: 'HomeOutlined'
        }
      }
    ]
  },

  {
    path: '/nested-menu',
    component: LAYOUT,
    redirect: '/nested-menu/menu1',
    meta: {
      title: '嵌套菜单',
      icon: 'AppstoreAddOutlined',
      roles: ['admin', 'test']
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested-menu/menu1/index.vue'),
        redirect: '/nested-menu/menu1/menu1-1',
        meta: {
          title: '菜单1'
        },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested-menu/menu1/menu1-1.vue'),
            meta: {
              title: '菜单1-1'
            }
          },
          {
            path: 'menu1-2',
            component: () =>
              import('@/views/nested-menu/menu1/menu1-2/index.vue'),
            redirect: '/nested-menu/menu1/menu1-2/menu1-2-1',
            meta: {
              title: '菜单1-2'
            },
            children: [
              {
                path: 'menu1-2-1',
                component: () =>
                  import('@/views/nested-menu/menu1/menu1-2/menu1-2-1.vue'),
                meta: {
                  title: '菜单1-2-1'
                }
              },
              {
                path: 'menu1-2-2',
                component: () =>
                  import('@/views/nested-menu/menu1/menu1-2/menu1-2-2.vue'),
                meta: {
                  title: '菜单1-2-2'
                }
              }
            ]
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested-menu/menu2/index.vue'),
        meta: {
          title: '菜单2'
        }
      }
    ]
  },

  {
    path: 'http://www.baidu.com',
    meta: { title: '外链', roles: ['admin', 'test'] }
  }
]
