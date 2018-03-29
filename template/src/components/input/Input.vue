<template lang="pug">
  textarea.textarea(
    v-if="type === 'textarea'"
    :class="[ color ? 'is-' + color : '', size ? 'is-' + size : '' ]"
    :value="newValue"
    :disabled="disabled"
    :placeholder="placeholder"
    @input="handleInput"
  )
  p.control.has-icons-left(v-else-if="icon")
    input.input(
      :class="[ color ? 'is-' + color : '', size ? 'is-' + size : '' ]"
      :type="type"
      :value="newValue"
      :disabled="disabled"
      :placeholder="placeholder"
      @input="handleInput"
    )
    span.icon.is-small.is-left
      i.fa.fa-fw(:class="'fa-' + icon")
  input.input(
    v-else
    :class="[ color ? 'is-' + color : '', size ? 'is-' + size : '' ]"
    :type="type"
    :value="newValue"
    :disabled="disabled"
    :placeholder="placeholder"
    @input="handleInput"
  )
</template>

<script>
export default {
  name: 'AppInput',

  data () {
    return {
      newValue: this.value,
    }
  },

  props: {
    type: {
      type: String,
      default: 'text',
    },
    icon: String,
    color: String,
    size: String,
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: String,
    value: [String, Number],
  },

  methods: {
    handleInput (e) {
      let value = e.target.value
      if (this.type === 'number') {
        value = parseInt(value)
      }

      this.$emit('input', value)
    },
  },

  watch: {
    value (value) {
      this.newValue = value
    },
  },
}
</script>
