import { PKG_NAME } from '@/configs/app'

export function warn(msg) {
  console.warn(`[${PKG_NAME} warn]`, msg)
}
