<template>
  <a-menu
    :selected-keys="activeRoute"
    mode="inline"
    theme="dark"
    :style="{ height: '100%', borderRight: 0 }"
    @select="handleMenuSelect"
  >
    <menu-item
      v-for="route of routes"
      :key="route.path"
      :item="route"
    ></menu-item>
  </a-menu>
</template>

<script>
import { defineComponent, computed, toRaw } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { usePermissionStore } from '@/store'

import { transformRouteToMenu } from '@/router/helper/menu'
import { isUrl } from '@/utils/is'

import MenuItem from './MenuItem.vue'

export default defineComponent({
  name: 'Menu',
  components: {
    MenuItem
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const permissionStore = usePermissionStore()

    const activeRoute = computed(() => [route.path])
    const cloneRoutes = toRaw(permissionStore.menus)
    const routes = transformRouteToMenu(cloneRoutes)

    function handleMenuSelect(item) {
      const { key } = item

      console.log(key)

      if (isUrl(key)) {
        return window.open(key, '_blank')
      }

      router.push(key)
    }

    return { activeRoute, routes, handleMenuSelect }
  }
})
</script>
