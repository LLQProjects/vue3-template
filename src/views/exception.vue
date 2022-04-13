<template>
  <el-result title="404" sub-title="Not Found">
    <template #icon>
      <el-image src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" />
    </template>
    <template #extra>
      <el-button type="primary" @click="navBack">返回</el-button>
    </template>
  </el-result>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const navBack = () => {
  router.replace('/')
}
</script>
