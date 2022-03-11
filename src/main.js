import { createApp } from 'vue'
import App from './App.vue'

// 注意：请在开发环境中移除 mock
import './mock'

import { router, setupRouter } from './router'
import { setupRouterGuard } from './router/guard'
import { setupStore } from './store'

import Antd from 'ant-design-vue'

import './styles/index.less'
import 'ant-design-vue/dist/antd.css'

const app = createApp(App)

// 注册路由
setupRouter(app)

// 注册 store
setupStore(app)

// 注册路由守卫
setupRouterGuard(router)

// 注册 AntdV 组件库
app.use(Antd)

// 挂载
app.mount('#app')
