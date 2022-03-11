import { BASE_HOME } from '../constants'

export const getRootRoute = (redirect = BASE_HOME) => ({
  path: '/',
  name: 'Root',
  redirect
})

export const LOGIN_ROUTE = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login/index.vue')
}

export const REDIRECT_ROUTE = {
  path: '/redirect',
  name: 'Redirect',
  component: () => import('@/views/redirect/index.vue')
}

export const PAGE_NOT_FIND_ROUTE = {
  path: '/:not-found(.*)*',
  name: 'NotFound',
  component: () => import('@/views/not-found/index.vue')
}
