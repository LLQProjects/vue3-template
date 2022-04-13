import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

export const basicRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    redirect: '/listAnalysis/sstw'
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: () => import('@/views/exception.vue')
  }
]

export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/listAnalysis',
    name: 'listAnalysis',
    meta: { title: '榜单分析' },
    component: Layout,
    children: [
      {
        path: 'sstw',
        name: 'sstw',
        meta: { title: '' },
        component: () => import('@/views/index.vue')
      }
    ]
  }
]

export const routes = asyncRoutes.concat(basicRoutes)
