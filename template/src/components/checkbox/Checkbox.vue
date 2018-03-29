<template lang="pug">
  label.checkbox.bul-checkbox(:class="{ 'is-disabled': disabled }" :disabled="disabled")
    input(type="checkbox" :disabled="disabled" :name="name" v-model="newValue" @change="$emit('change', newValue, $event)")
    span
      slot
</template>

<script>
export default {
  name: 'AppCheckbox',

  props: {
    name: String,
    disabled: Boolean,
    checked: Boolean,
    value: Boolean,
    customValue: [String, Number, Boolean],
  },

  data () {
    return {
      newValue: this.value,
    }
  },

  mounted () {
    if (this.checked) {
      this.newValue = this.checked
    }
  },

  watch: {
    value (value) {
      this.newValue = value
    },

    newValue (value) {
      this.$emit('input', value)
      this.$parent.isCheckboxGroup && this.$parent.updateValue()
    },
  },
}
</script>
