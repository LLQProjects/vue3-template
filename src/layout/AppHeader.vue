<template>
  <div class="app-header">
    <span class="app-header__title">Cocos Insight</span>
    <span class="app-header__store">app store</span>
  </div>
</template>

<style lang="scss" scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  width: 100%;

  &__title {
    padding-left: 4px;
    font-size: 18px;
    line-height: 48px;
    color: #fff;
  }

  &__store {
    line-height: 48px;
    color: #fff;
    cursor: pointer;
  }
}
</style>
