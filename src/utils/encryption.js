import AES from 'crypto-js/aes'
import UTF8 from 'crypto-js/enc-utf8'

import pkcs7 from 'crypto-js/pad-pkcs7'
import ECB from 'crypto-js/mode-ecb'

/**
 * Aes 加密/解密方法
 */
export class AesEncryption {
  constructor(opt) {
    const { key, iv } = opt
    if (key) {
      this.key = UTF8.parse(key)
    }

    if (iv) {
      this.iv = UTF8.parse(iv)
    }
  }

  get getOptions() {
    return {
      mode: ECB,
      padding: pkcs7,
      iv: this.iv
    }
  }

  /**
   * 加密
   * @param {String} val 字符串值
   * @returns 加密后的数据
   */
  encrypt(val) {
    return AES.encrypt(val, this.key, this.getOptions).toString()
  }

  /**
   * 解密
   * @param {String} val 字符串值
   * @returns 解密后的数据
   */
  decrypt(val) {
    return AES.decrypt(val, this.key, this.getOptions).toString(UTF8)
  }
}
