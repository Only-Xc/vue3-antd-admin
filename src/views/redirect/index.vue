<template>
  <div></div>
</template>

<script>
import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()

    const { redirect, query } = route.query

    router.replace({ path: redirect, query })
  }
})
</script>
