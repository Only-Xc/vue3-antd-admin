<template>
  <a-layout class="layout-container" :class="{ hideSider: collapsed }">
    <a-layout-sider
      v-model:collapsed="collapsed"
      class="layout-container__left"
      collapsible
      :trigger="null"
    >
      <Menu></Menu>

      <div
        class="layout-container__trigger"
        @click="() => (collapsed = !collapsed)"
      >
        <menu-unfold-outlined v-if="collapsed" class="icon" />
        <menu-fold-outlined v-else class="icon" />
      </div>
    </a-layout-sider>

    <a-layout class="layout-container__right">
      <Header></Header>

      <a-layout-content>
        <router-view />
      </a-layout-content>

      <a-layout-footer style="text-align: center">
        Vue3-Antd-Admin ©2022 Created by XC
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'

import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'

import Header from './components/Header/index.vue'
import Menu from './components/Menu/index.vue'

export default defineComponent({
  components: {
    Header,
    Menu,
    MenuUnfoldOutlined,
    MenuFoldOutlined
  },
  data() {
    return {
      collapsed: ref(false),
      selectedKeys: ref(['1'])
    }
  }
})
</script>

<style lang="less" scoped>
.layout-container {
  @self: layout-container;

  min-height: 100%;

  &.hideSider {
    .@{self}__right {
      margin-left: 80px;
    }
  }

  &__left {
    position: fixed;
    left: 0;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;

    ::v-deep(.ant-layout-sider-children) {
      position: relative;
      height: auto;
      min-height: 100%;
      padding-bottom: 38px;
    }
  }

  &__right {
    margin-left: 200px;
    transition: all 0.2s;
  }

  &__trigger {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 38px;
    line-height: 38px;
    text-align: center;
    background: #002140;
    cursor: pointer;

    .icon {
      color: #fff;
    }
  }
}
</style>
