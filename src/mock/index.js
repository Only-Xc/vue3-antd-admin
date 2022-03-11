import Mock from 'mockjs'

import './services/login'
import './services/user'

import { isDev } from '@/utils/env'

if (isDev()) {
  Mock.setup({
    timeout: 800
  })
}
