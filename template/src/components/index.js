const components = [
]{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

export default {
  install{{#if_eq lintConfig "standard"}} {{/if_eq}}(Vue) {
    components.forEach({{#if_eq lintConfig "airbnb"}}({{/if_eq}}component{{#if_eq lintConfig "airbnb"}}){{/if_eq}} => {
      Vue.component(component.name, component){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    }){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  },
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
