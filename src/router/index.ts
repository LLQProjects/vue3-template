import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
