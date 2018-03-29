<template>
  <progress
    class="progress"
    :value="value"
    :max="max"
  >{{ currentHtml }}</progress>
</template>

<script>
  export default {
    name: 'BulProgress',

    props: {
      color: String,
      max: {
        type: Number,
        default: 100
      },
      value: Number
    },

    computed: {
      currentHtml () {
        return parseInt(this.value / this.max * 10000) / 100 + '%'
      }
    }
  }
</script>
