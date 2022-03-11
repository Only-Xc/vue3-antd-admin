import { isProd } from '@/utils/env'

// 系统缓存时间（单位：秒）
export const cacheTime = 60 * 60 * 24 * 7

// AES 加密密钥
export const aseCipher = {
  key: 'rwxC&BEavcf2kH2x',
  iv: 'BzcunHJ6vjBa1p!Z'
}

// 系统缓存是否加密
export const enableStorageEncryption = isProd() // 生产环境时加密数据
