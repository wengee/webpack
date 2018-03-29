import Vue from 'vue'
import VueRouter from 'vue-router'
import IndexView from '@/views/index'

Vue.use(VueRouter)

/*
function createRouteConfig{{#if_eq lintConfig "standard"}} {{/if_eq}}(path, view, options = {}) {
  if (typeof view === 'object') {
    options = view
    view = null
  }

  view = view || path
  options.path = `/${path}`
  options.name = options.name || path.replace(/\//g, '-')
  options.meta = options.meta || {}
  options.meta.nav = options.meta.nav || options.nav || options.name
  options.component = () => import(`@/views/${view}.vue`)
  return options
}
*/

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView,
      children: [
      ],
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
})

export default router
