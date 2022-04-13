<template>
  <el-config-provider :button="{ autoInsertSpace: true }">
    <el-container class="app-container">
      <el-header height="50px" class="app-header__wrapper">
        <app-header />
      </el-header>
      <el-container class="app-content__wrapper">
        <el-aside width="240px">
          <app-aside />
        </el-aside>
        <router-view />
      </el-container>
    </el-container>
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from './AppHeader.vue'
import AppAside from './AppAside.vue'

export default defineComponent({
  name: 'AppLayout',

  components: {
    AppHeader,
    AppAside
  }
})
</script>

<style lang="scss" scoped>
.app {
  &-container {
    height: 100%;
  }

  &-header {
    &__wrapper {
      background-color: #001529;
    }
  }

  &-content {
    &__wrapper {
      width: 100%;
      overflow-x: hidden;
    }
  }
}
</style>
