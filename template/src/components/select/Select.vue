<template lang="pug">
  span.select.is-fullwidth(:class="[size ? 'is-' + size : null, { 'is-empty': selected === '' }]")
    slot
    select(v-model="selected" ref="select" :disabled="disabled" :readonly="readonly" :name="name" :required="required" @focus="$emit('focus', $event)" @blur="blur")
      option(v-if="placeholder" value="" selected disabled hidden) {{ placeholder }}
      template(v-for="(option, i) in options")
        optgroup(v-if="isOptgroup(option, options[i - 1], i)" :label="option.group")
        option(:value="option.value" :disabled="option.disabled") {{ option.label }}
</template>

<script>
import Vue from 'vue'
import Option from './Option'

export default {
  name: 'AppSelect',

  props: {
    value: [String, Number, Object],
    placeholder: String,
    // Native options to use in HTML5 validation
    name: String,
    disabled: Boolean,
    readonly: Boolean,
    required: Boolean,
    size: String,
    data: null,
    optionValue: {
      type: String,
      default: 'value',
    },
    optionLabel: {
      type: String,
      default: 'label',
    },
  },

  data () {
    return {
      options: [],
      selected: this.value,
      isValid: true,
      isSelectComponent: true, // Used internally by Option
    }
  },

  watch: {
    /**
     * When v-model is changed:
     *   1. Set the selected option.
     *   2. If it's invalid, validate again.
     */
    value (value) {
      if (value === null || typeof value === 'undefined') {
        this.selected = ''
      } else {
        this.selected = value
      }
      !this.isValid && this.html5Validation()
    },

    options (value) {
    },
    /**
     * When selected:
     *   1. Emit input event to update the user v-model.
     *   3. If it's invalid, validate again.
     */
    selected (value) {
      this.$emit('input', value)
      this.$emit('change', value)
      !this.isValid && this.html5Validation()
    },

    data (value) {
      this.updateData()
    },
  },

  methods: {
    /**
     * Verify if next item is a optgroup (another group chunk).
     */
    isOptgroup (option, previousOption, i) {
      if (!option.group) return
      // If it's first and has group property already show as subheader
      if (i === 0) return true
      if (previousOption === undefined) return
      return option.group !== previousOption.group
    },
    /**
     * Blur listener.
     * Fire the HTML5 validation.
     */
    blur (event) {
      this.$emit('blur', event)
      this.html5Validation()
    },
    /**
     * HTML5 validation, set isValid property.
     * If validation fail, send 'is-danger' type,
     * and error message to parent if it's a Field.
     */
    html5Validation () {
      let type = null
      let message = null
      let isValid = true
      if (!this.$refs.select.checkValidity()) {
        type = 'is-danger'
        message = this.$refs.select.validationMessage
        isValid = false
      }
      this.isValid = isValid
      if (this.$parent.isFieldComponent) {
        // Set type only if user haven't defined
        if (!this.$parent.type) {
          this.$parent.newType = type
        }
        // Set message only if user haven't defined
        if (!this.$parent.message) {
          this.$parent.newMessage = message
        }
      }
    },

    updateData () {
      this.options = []
      if (this.data) {
        const OptionComponent = Vue.extend(Option)
        for (let i in this.data) {
          let item = this.data[i]
          this.options.push(new OptionComponent({
            propsData: {
              value: item[this.optionValue],
              label: item[this.optionLabel],
            },
          }))
        }
      }
    },
  },

  mounted () {
    if (this.data && this.data.length > 0) {
      this.updateData()
    }
  },
}
</script>
