import { defineStore } from 'pinia'
import { getToken, setToken, removeToken } from '@/utils/auth'

import { login, logout } from '@/api/auth'
import { getUserInfo } from '@/api/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    id: '',
    username: '',
    name: '',
    homePath: '',
    roles: [],
    token: getToken()
  }),

  getters: {
    userInfo() {
      return {
        id: this.id,
        username: this.username,
        name: this.name,
        homePath: this.homePath,
        roles: this.roles
      }
    }
  },

  actions: {
    setToken(token) {
      this.token = token || ''
      setToken(token)
    },

    login(data) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await login(data)
          this.setToken(res.token)
          resolve(res)
        } catch (error) {
          reject(error)
        }
      })
    },

    getUserInfo(token) {
      return new Promise(async (resolve, reject) => {
        try {
          const userInfo = await getUserInfo({ token })
          console.log(userInfo)
          const { id, username, name, homePath, roles } = userInfo
          this.id = id
          this.username = username
          this.name = name
          this.homePath = homePath
          this.roles = roles
          resolve(userInfo)
        } catch (error) {
          reject(error)
        }
      })
    },

    logout() {
      return new Promise(async (resolve, reject) => {
        try {
          await logout({ token: this.token })
          this.token = ''
          removeToken()
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    }
  }
})
