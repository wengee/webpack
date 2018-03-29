<template lang="pug">
  .is-clearfix(v-if="isActive")
    slot
</template>

<script>
export default {
  name: 'AppTabPane',

  props: {
    label: String,
    icon: String,
    name: String,
  },

  data () {
    return {
      isTabPane: true,
      currentTabPane: false,
      myName: null,
    }
  },

  computed: {
    uniqueName () {
      return this.name || this.myName
    },

    isActive () {
      return this.$parent.defaultActive && this.$parent.defaultActive === this.uniqueName
    },
  },

  mounted () {
    if (!this.name) {
      let n = this.$parent.tabPanes.length
      this.myName = 'tabPane' + n
    }

    this.$parent.tabPanes.push(this)
  },
}
</script>
