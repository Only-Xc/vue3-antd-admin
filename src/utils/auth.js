import { TOKEN_KEY } from '@/configs/app'
import { createLocalStorage } from './storage'

const ls = createLocalStorage()

export function getToken() {
  return ls.get(TOKEN_KEY, '')
}

export function setToken(token) {
  return ls.set(TOKEN_KEY, token)
}

export function removeToken() {
  ls.remove(TOKEN_KEY)
}
