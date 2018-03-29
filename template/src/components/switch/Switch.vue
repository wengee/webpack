<template lang="pug">
  label.switch(:class="{ 'is-disabled': disabled }" :disabled="disabled")
    input(:class="{ 'is-on-off': onOff }" type="checkbox" :name="name" :disabled="disabled" v-model="newValue" @change="$emit('change', newValue, $event)")
    span
      slot
</template>

<script>
export default {
  name: 'AppSwitch',

  props: {
    value: Boolean,
    disabled: Boolean,
    onOff: Boolean,
    name: String,
    checked: Boolean,
  },

  data () {
    return {
      newValue: this.value,
    }
  },

  watch: {
    value (value) {
      this.newValue = value
    },

    newValue (value) {
      this.$emit('input', value)
    },
  },

  mounted () {
    if (this.checked) {
      this.newValue = this.checked
    }
  },
}
</script>
