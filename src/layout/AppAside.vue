<template>
  <!-- 路由这里暂时先写死 -->
  <el-menu default-active="1" class="app-menu">
    <el-sub-menu index="1">
      <template #title>
        <el-icon><icon-menu /></el-icon>
        <span>菜单</span>
      </template>
      <el-menu-item-group title="子菜单">
        <el-menu-item index="1-1">
          <router-link to="/listAnalysis/sstw">子菜单1</router-link>
        </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Menu as IconMenu } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'AppAside',

  components: {
    IconMenu
  }
})
</script>

<style lang="scss" scoped>
.app-menu {
  height: 100%;

  a:any-link {
    color: inherit;
  }
}
</style>
