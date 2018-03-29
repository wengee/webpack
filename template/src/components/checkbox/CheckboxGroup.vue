<template lang="pug">
  .checkbox-group
    slot
</template>

<script>
export default {
  name: 'AppCheckboxGroup',

  props: {
    value: Array,
  },

  data () {
    return {
      checkedList: [],
      isCheckboxGroup: true,
    }
  },

  watch: {
    value () {
      this.initChecked()
    },
  },

  methods: {
    updateValue () {
      this.checkedList = []
      this.$children.forEach(child => {
        child.newValue && this.checkedList.push(child.customValue)
      })

      this.$emit('input', this.checkedList)
      this.$emit('change', this.checkedList)
    },

    initChecked () {
      this.$children.forEach(child => {
        if (this.value && this.value.indexOf(child.customValue) >= 0) {
          child.newValue = true
        } else {
          child.newValue = false
        }
      })
    },
  },

  mounted () {
    this.initChecked()
  },
}
</script>
