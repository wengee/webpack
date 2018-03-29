<template>
  <div>
    <p class="menu-label" v-if="label">{{ label }}</p>
    <ul class="menu-list" :class="type">
      <slot></slot>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'BulMenus',

    data () {
      return {
        typeClass: this.type,
        isOpen: false
      }
    },

    mounted () {
      this.hasOpened()
    },

    methods: {
      hasOpened () {
        this.$children.every(item => {
          if (item.isOpen) this.isOpen = true
          return true
        })
        return false
      }
    },

    props: {
      label: String,
      type: {
        type: String,
        default: 'collapse'
      }
    }
  }
</script>
