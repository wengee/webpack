<template lang="pug">
  .tabs-wrapper
    .tabs(:class="[ type ? 'is-' + type : null, size ? 'is-' + size : null, align ? 'is-' + align : null, { 'is-fullwidth': fullwidth } ]")
      ul
        li(v-for="(tab, index) in tabPanes" :class="{ 'is-active': defaultActive && defaultActive === tab.uniqueName }")
          a(href="#" @click.prevent="changeTab(tab, index)")
            span.icon.is-small(v-if="tab.icon")
              app-icon(:icon="tab.icon")
            span {{ tab.label }}

    .tabs-content.is-clearfix
      slot
</template>

<script>
export default {
  name: 'AppTabs',

  props: {
    value: String,
    type: String,
    size: String,
    align: String,
    fullwidth: {
      type: Boolean,
      default: false,
    },
  },

  data () {
    return {
      activeName: null,
      tabPanes: [],
    }
  },

  computed: {
    defaultActive () {
      return this.activeName || this.value
    },
  },

  methods: {
    changeTab (tab, index) {
      this.activeName = tab.uniqueName
      this.$emit('input', tab.uniqueName)
      this.$emit('change', index)
    },
  },

  watch: {
    value (val) {
      this.activeName = val
    },
  },
}
</script>
