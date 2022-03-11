import { AesEncryption } from '@/utils/encryption'
import {
  cacheTime,
  aseCipher,
  enableStorageEncryption
} from '@/configs/encryption'
import { PKG_NAME } from '@/configs/app'

/**
 * 创建一个 Storage 存储
 * @param {Object} param 参数
 * @returns
 */
export function createStorage({
  prefixKey = '', // 前缀
  storage = sessionStorage, // 使用的缓存器
  key = aseCipher.key, // 加密 key
  iv = aseCipher.iv, // 加密 iv
  timeout = null, // 过期时间
  hasEncrypt = true // 是否加密
} = {}) {
  if (hasEncrypt && [key.length, iv.length].some(item => item !== 16)) {
    throw new Error('开启加密时 key 和 iv 长度必须为16位！')
  }

  const encryption = new AesEncryption({ key, iv })

  class WebStorage {
    constructor() {
      this.prefixKey = prefixKey
      this.storage = storage
      this.hasEncrypt = hasEncrypt
    }

    /**
     * 获取键值
     * @param {String} key 存储 key
     * @returns 拼接之后全大写的 key 值
     */
    getKey(key) {
      return `${this.prefixKey}_${key}`.toUpperCase()
    }

    /**
     * 设置指定 key 值的数据
     * @param {String} key 键值
     * @param {*} value 数据
     * @param {Number} expire 过期时间（单位：秒）
     */
    set(key, value, expire = timeout) {
      const stringData = JSON.stringify({
        value,
        time: Date.now(),
        expire: expire ? Date.now() + expire * 1000 : null
      })

      const stringifyValue = this.hasEncrypt
        ? encryption.encrypt(stringData)
        : stringData

      this.storage.setItem(this.getKey(key), stringifyValue)
    }

    /**
     * 获取指定 key 的数据
     * @param {String} key 键值
     * @param {*} def 默认值
     */
    get(key, def) {
      const stringifyValue = this.storage.getItem(this.getKey(key))

      if (!stringifyValue) return def

      try {
        const stringData = this.hasEncrypt
          ? encryption.decrypt(stringifyValue)
          : stringifyValue

        const { value, expire } = JSON.parse(stringData)

        if (expire >= Date.now()) {
          return value
        }

        this.remove(key)
      } catch (error) {
        return def
      }
    }

    /**
     * 删除指定 key 的数据
     * @param {String} key 键值
     */
    remove(key) {
      this.storage.removeItem(this.getKey(key))
    }

    /**
     * 清空所有数据
     */
    clear() {
      this.storage.clear()
    }
  }

  return new WebStorage()
}

function getOptions(storage) {
  return {
    prefixKey: PKG_NAME,
    storage,
    timeout: cacheTime,
    hasEncrypt: enableStorageEncryption
  }
}

export function createLocalStorage() {
  return createStorage(getOptions(localStorage))
}

export function createSessionStorage() {
  return createStorage(getOptions(sessionStorage))
}
