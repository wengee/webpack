import Vue from 'vue'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import VueRouter from 'vue-router'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import IndexView from '@/views/index'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

Vue.use(VueRouter){{#if_eq lintConfig "airbnb"}};{{/if_eq}}

/*
function createRouteConfig{{#if_eq lintConfig "standard"}} {{/if_eq}}(path, view, options = {}) {
  if (typeof view === 'object') {
    options = view{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    view = null{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  }

  view = view || path{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  options.path = `/${path}`{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  options.name = options.name || path.replace(/\//g, '-'){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  options.meta = options.meta || {}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  options.meta.nav = options.meta.nav || options.nav || options.name{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  // options.component = {{#if_eq lintConfig "airbnb"}}({{/if_eq}}resolve{{#if_eq lintConfig "airbnb"}}){{/if_eq}} => {
  //   const handler = require(`bundle-loader!babel-loader!../views/${view}.vue`){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  //   handler(module => resolve(module)){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  // }{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  options.component = require(`@/views/${view}`){{#if_eq lintConfig "airbnb"}};{{/if_eq}}

  return options{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
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
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}

export default router{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
