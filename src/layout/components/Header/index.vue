<template>
  <a-layout-header class="header">
    <Breadcrumb class="header-breadcrumb"></Breadcrumb>

    <div class="header-right">
      <AvatarDropdown :name="name"></AvatarDropdown>
    </div>
  </a-layout-header>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useUserStore } from '@/store'

import Breadcrumb from './Breadcrumb.vue'
import AvatarDropdown from './AvatarDropdown.vue'

export default defineComponent({
  name: 'Header',
  components: {
    Breadcrumb,
    AvatarDropdown
  },
  setup() {
    const userStore = useUserStore()

    return {
      name: computed(() => userStore.userInfo.name)
    }
  }
})
</script>

<style lang="less" scoped>
.header {
  height: 48px;
  padding: 0 16px;
  overflow: hidden;
  line-height: 48px;
  background: #fff;

  &-breadcrumb {
    float: left;
  }

  &-right {
    float: right;
  }
}
</style>
