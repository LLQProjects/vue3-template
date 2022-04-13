import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => {
    return { locale: 'zh-CN' }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {}
})
