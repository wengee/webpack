<template lang="pug">
  .field(:class="{ 'is-horizontal': horizontal, 'has-addons': hasAddons, 'is-switch': isSwitch }")
    template(v-if="horizontal")
      .field-label.is-normal
        label.label {{ label }}

      .field-body
        .field
          .control(:class="{ 'is-grouped': grouped, 'is-expanded': expanded }")
            slot

    .control(:class="{ 'is-grouped': grouped, 'is-expanded': expanded }" v-else)
      .level(style="margin-bottom:0.5em;" v-if="$slots.label")
        .level-left
          label.label(v-if="label") {{ label }}
        .level-right
          slot(name="label")
      label.label(v-else-if="label") {{ label }}

      slot

    .control(v-if="hasAddons")
      slot(name="addons")
</template>

<script>
export default {
  name: 'AppFormItem',

  props: {
    label: String,
    hasAddons: {
      type: Boolean,
      default: false,
    },
    isSwitch: {
      type: Boolean,
      default: false,
    },
    grouped: {
      type: Boolean,
      default: false,
    },
    expanded: {
      type: Boolean,
      default: false,
    },
    horizontal: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
