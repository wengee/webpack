<template lang="pug">
  <span class="icon" :class="size ? 'is-' + size : ''" v-if="isWrap">
    <i class="fa" :class="className" aria-hidden="true"></i>
  </span>
  <i class="fa" :class="className" aria-hidden="true" v-else></i>
</template>

<script>
export default {
  name: 'AppIcon',

  props: {
    isWrap: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      required: true,
    },
    size: String,
    rotate: [Number, String],
    flip: String,
    pull: String,
    fixed: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: false,
    },
    spin: {
      type: Boolean,
      default: false,
    },
    pulse: {
      type: Boolean,
      default: false,
    },
    inverse: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    className () {
      const classes = ['fa-' + this.icon]
      if (this.size && !this.isWrap) {
        classes.push('is-' + this.size)
      }
      if (this.fixed) {
        classes.push('fa-fw')
      }
      if (this.border) {
        classes.push('fa-border')
      }
      if (this.spin) {
        classes.push('fa-spin')
      }
      if (this.pulse) {
        classes.push('fa-pulse')
      }
      if (this.inverse) {
        classes.push('fa-inverse')
      }
      if (this.rotate) {
        classes.push('fa-rotate-' + this.rotate)
      }
      if (this.flip) {
        classes.push('fa-flip-' + this.flip)
      }
      if (this.pull) {
        classes.push('fa-pull-' + this.pull)
      }
      return classes
    },
  },
}
</script>
