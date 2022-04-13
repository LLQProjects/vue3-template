<template>
  <div class="page-container">
    <div :class="namespace">
      <!-- bread crumb -->
      <el-breadcrumb v-if="breadcrumb" separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">promotion management</a></el-breadcrumb-item>
        <el-breadcrumb-item>promotion list</el-breadcrumb-item>
        <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- heading -->
      <div :class="`${namespace}-heading`">
        <div class="page-header-heading-left">
          <div v-if="backIcon" class="page-header-heading-icon">
            <el-button plain type="text" :icon="IconBack" />
          </div>
          <span v-if="title" class="page-header-heading-title">{{ title }}</span>
          <span v-if="subTitle" class="page-header-heading-sub-title">{{ subTitle }}</span>
          <span class="page-header-heading-tags">
            <slot name="tag"></slot>
          </span>
        </div>
        <div class="page-header-heading-extra">
          <slot name="extra"></slot>
        </div>
      </div>
      <div class="page-header-content">
        <slot name="content"></slot>
      </div>
    </div>
    <!-- content -->
    <div class="page-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Back as IconBack } from '@element-plus/icons-vue'
import VueTypes from 'vue-types'
import { createNamespace } from '@/utils'

const [namespace, bem] = createNamespace('page-header')

export default defineComponent({
  name: 'PageContainer',

  props: {
    title: VueTypes.string,
    subTitle: VueTypes.string,
    backIcon: VueTypes.bool.def(true),
    breadcrumb: VueTypes.bool.def(true)
  },

  setup() {
    // Todo:
    // dynamic calc route

    return {
      namespace,
      bem,
      IconBack
    }
  }
})
</script>

<style lang="scss">
.page-container {
  flex-grow: 1;

  .page-header {
    position: relative;
    width: 100%;
    padding: 16px 24px;
    background-color: #fff;
    border: 1px solid #ebedf0;
    border-left: unset;

    &-heading {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;

      &-left {
        display: flex;
        align-items: center;
      }

      &-icon {
        margin-right: 16px;

        .el-button {
          font-size: 16px;
          color: #000;
        }
      }

      &-title {
        margin-right: 12px;
        margin-bottom: 0;
        overflow: hidden;
        font-size: 20px;
        font-weight: 600;
        color: rgba($color: #000, $alpha: 85%);
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      &-sub-title {
        margin-right: 12px;
        overflow: hidden;
        font-size: 14px;
        line-height: 1.4;
        color: rgba($color: #000, $alpha: 73%);
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      &-extra {
        margin: 4px 0;
        white-space: nowrap;
      }
    }

    &-content {
      padding-top: 12px;
    }

    .el-breadcrumb + .page-header-heading {
      margin-top: 8px;
    }

    .el-breadcrumb {
      line-height: 22px;

      &__separator {
        margin: 0 4px;
      }
    }
  }

  .page-content {
    padding: 20px;
  }
}
</style>
