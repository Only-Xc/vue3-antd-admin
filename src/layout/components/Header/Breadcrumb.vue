<template>
  <a-breadcrumb class="breadcrumb-container">
    <a-breadcrumb-item
      v-for="breadcrumb of breadcrumbs"
      :key="breadcrumb.path"
      >{{ breadcrumb.title }}</a-breadcrumb-item
    >
  </a-breadcrumb>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'HeaderBreadcrumb',
  setup() {
    const route = useRoute()
    const breadcrumbs = ref([])

    function getBreadcrumb() {
      const tempData = []
      // 只显示有 meta.title 属性的路由
      // 通过 route.matched 可以获取路由层级
      const matched = route.matched.filter(item => item?.meta?.title)

      matched.forEach(item => {
        const { path, meta } = item

        tempData.push({
          path,
          title: meta.title
        })
      })

      breadcrumbs.value = tempData
    }

    watch(route, getBreadcrumb, { immediate: true })

    return { breadcrumbs }
  }
})
</script>

<style lang="less" scoped>
.breadcrumb-container {
  height: 100%;
  line-height: 48px;
}
</style>
