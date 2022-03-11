<template>
  <a-menu-item v-if="!hasChildren" :key="menu.path">
    <template v-if="menu.meta?.icon" #icon>
      <Icon :name="menu.meta.icon" />
    </template>
    {{ menu.meta?.title }}
  </a-menu-item>
  <a-sub-menu v-else :key="menu.name">
    <template v-if="menu.meta?.icon" #icon>
      <Icon :name="menu.meta.icon" />
    </template>
    <template #title>
      {{ menu.meta?.title }}
    </template>
    <MenuItem
      v-for="route of menu.children"
      :key="route.path"
      :item="route"
    ></MenuItem>
  </a-sub-menu>
</template>

<script>
import { defineComponent, computed } from 'vue'
import Icon from '@/components/Icon.vue'

export default defineComponent({
  name: 'MenuItem',
  components: {
    Icon
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const menu = computed(() => {
      const { item } = props

      // 如果 children 只有一个，则直接显示
      if (item.children?.length === 1) {
        const child = item.children[0]
        return child
      }

      return item
    })

    const hasChildren = computed(() => menu.value.children?.length > 0)

    return { menu, hasChildren }
  }
})
</script>
