<template>
  <div class="login-container">
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finish-failed="onFinishFailed"
    >
      <a-form-item
        label="用户名"
        name="username"
        :rules="[{ required: true, message: '请输入用户名！' }]"
      >
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item
        label="密码"
        name="password"
        :rules="[{ required: true, message: '请输入密码！' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store'

export default defineComponent({
  setup() {
    const router = useRouter()

    const formState = reactive({
      username: '',
      password: ''
    })

    const onFinish = async values => {
      const userStore = useUserStore()
      try {
        const res = await userStore.login(values)
        console.log('登录成功', res)
        router.replace('/')
      } catch (error) {
        console.log('登录失败', error)
      }
    }

    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo)
    }

    return {
      formState,
      onFinish,
      onFinishFailed
    }
  }
})
</script>

<style lang="less" scoped>
.login-container {
  width: 400px;
  margin: 200px auto 0;
}
</style>
