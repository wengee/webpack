<template lang="pug">
  .widget.is-clearfix(:class="[type ? 'is-' + type : null]")
    .widget-hd.level(v-if="title")
      .level-left
        p.level-item {{ title }}
      .level-right
        slot(name="title")

    .widget-bd
      slot
</template>

<script>
export default {
  name: 'AppWidget',

  props: {
    title: String,
    type: String,
  },
}
</script>
