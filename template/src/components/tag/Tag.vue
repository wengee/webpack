<template lang="pug">
  span.tag(:class="[color ? 'is-' + color : null, size ? 'is-' + size : null]")
    slot {{ label }}
    button.delete.is-small(type="button" v-if="closable")
</template>

<script>
export default {
  name: 'AppTag',

  props: {
    color: String,
    size: String,
    closable: {
      type: Boolean,
      default: false,
    },
    label: String,
  },
}
</script>
