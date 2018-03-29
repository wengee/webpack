<template lang="pug">
  .breadcrumb.level
    .level-left
      slot(name="title")

    .level-right
      ul
        li
          router-link(:to="homeLink")
            app-icon(icon="home")
            | {{ homeText }}

        li(v-for="(link, index) in links" :key="index")
          router-link(:to="link.to") {{ link.title }}
</template>

<script>
export default {
  name: 'AppBreadcrumb',

  props: {
    separator: {
      type: String,
      default: '/',
    },
    links: {
      type: Array,
      default: () => [],
    },
    icon: {
      type: String,
      default: 'home',
    },
    homeLink: {
      type: String,
      default: '/',
    },
    homeText: {
      type: String,
      default: '首页',
    },
  },
}
</script>
