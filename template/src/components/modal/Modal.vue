<template lang="pug">
  .modal.is-active(v-if="createElm")
    .modal-background(@click.prevent="closeOnBlank && close()")
    transition(:name="transitionName" @after-leave="createElm = false")
      .modal-card(v-show="visible" :style="modalStyle")
        header.modal-card-head(v-if="title")
          p.modal-card-title {{ title }}
          button.delete(type="button" @click="close")

        section.modal-card-body
          slot

        footer.modal-card-foot(v-if="$slots.footer")
          slot(name="footer")
</template>

<script>
export default {
  name: 'AppModal',

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: String,
    transitionName: {
      type: String,
      default: 'bounce',
    },
    width: {
      type: [String, Number],
      default: null,
    },
    closeOnBlank: {
      type: Boolean,
      default: true,
    },
  },

  data () {
    return {
      createElm: false,
      visible: false,
    }
  },

  computed: {
    modalStyle () {
      if (this.width) {
        let width = this.width
        if (typeof width === 'number') {
          width = width + 'px'
        }

        return { width }
      }

      return null
    },
  },

  methods: {
    open () {
      this.$emit('input', true)
    },

    close () {
      this.$emit('input', false)
    },

    toggle (val) {
      if (typeof val !== 'boolean') {
        val = this.value
      }

      if (val) {
        this.createElm = true
        setTimeout(() => {
          this.visible = true
        }, 5)
      } else {
        this.visible = false
      }
    },
  },

  watch: {
    value (val) {
      this.toggle(val)
    },
  },

  mounted () {
    this.toggle()
  },
}
</script>
