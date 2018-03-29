<template lang="pug">
  a.button(:class="buttonClass" href="#" @click.stop="handleClick" :disabled="disabled" v-if="type === 'button'")
    span.icon(:class="iconSize ? 'is-' + iconSize : ''" v-if="icon")
      i.fa(:class="'fa-' + icon")
    span
      slot
  button.button(:class="buttonClass" @click.stop="handleClick" :disabled="disabled" v-else)
    span.icon(:class="iconSize ? 'is-' + iconSize : ''" v-if="icon")
      i.fa(:class="'fa-' + icon")
    span
      slot
</template>

<script>
export default {
  name: 'AppButton',

  props: {
    type: {
      type: String,
      default: 'button',
    },
    color: String,
    size: String,
    outlined: {
      type: Boolean,
      default: false,
    },
    inverted: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: String,
    iconSize: {
      type: String,
      default: 'small',
    },
  },

  computed: {
    buttonClass () {
      let classes = []
      this.color && classes.push('is-' + this.color)
      this.size && classes.push('is-' + this.size)
      this.outlined && classes.push('is-outlined')
      this.inverted && classes.push('is-inverted')
      this.loading && classes.push('is-loading')
      this.disabled && classes.push('is-disabled')

      return classes
    },
  },

  methods: {
    handleClick (evt) {
      this.$emit('click', evt)
    },
  },
}
</script>
