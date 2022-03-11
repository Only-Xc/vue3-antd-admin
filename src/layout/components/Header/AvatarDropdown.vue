<template>
  <a-dropdown placement="bottomRight">
    <div class="avatar-container">
      <a-avatar
        size="small"
        src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
        class="avatar"
      />
      <span>{{ name }}</span>
    </div>
    <template #overlay>
      <a-menu class="avatar-drop-down" :selected-keys="[]">
        <a-menu-item key="center"><user-outlined /> 个人中心</a-menu-item>
        <a-menu-item key="settings"><setting-outlined /> 个人设置</a-menu-item>
        <a-menu-divider />
        <a-menu-item key="logout" @click="logout"
          ><logout-outlined /> 退出登录</a-menu-item
        >
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store'

import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons-vue'

export default defineComponent({
  name: 'AvatarDropdown',
  components: {
    UserOutlined,
    SettingOutlined,
    LogoutOutlined
  },
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const router = useRouter()
    const userStore = useUserStore()

    return {
      async logout() {
        await userStore.logout()
        router.replace({ path: '/login' })
      }
    }
  }
})
</script>

<style lang="less" scoped>
.avatar {
  margin-top: -4px;
  margin-right: 8px;
  vertical-align: middle;

  &-container {
    height: 48px;
    padding: 0 10px;
    overflow: hidden;
    font-size: 12px;
    cursor: pointer;

    &:hover {
      background-color: #f6f6f6;
    }
  }
}
</style>

<style lang="less">
.avatar-drop-down {
  min-width: 160px;

  .ant-dropdown-menu-item {
    min-width: 160px;
  }
}
</style>
