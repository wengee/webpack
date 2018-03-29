<template>
  <div class="control has-addons radio-group">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'BulRadioGroup',

    data () {
      return {
        checked: '',
        isRadioGroup: true
      }
    },

    mounted () {
      this.initChecked()
    },

    computed: {
      radioItems () {
        return this.$children
      }
    },

    watch: {
      value () {
        this.initChecked()
      }
    },

    methods: {
      updateValue (index) {
        this.checked = ''
        this.$children.forEach((child, i) => {
          if (index !== i) {
            child.isChecked = false
          } else {
            this.checked = child.val
          }
        })

        this.$emit('input', this.checked)
        this.onChange(this.checked)
      },

      initChecked () {
        this.$children.forEach((child) => {
          if (this.value === child.val) {
            child.isChecked = true
            child.realVal = child.val
          } else {
            child.isChecked = false
            child.realVal = ''
          }
        })
      }
    },

    props: {
      value: [String, Number]
    }
  }
</script>
