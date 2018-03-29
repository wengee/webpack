<template lang="pug">
  .dialog.modal.is-active(v-if="isActive")
    .modal-background(@click.prevent="cancel")
    transition(name="bounce" @after-leave="remove")
      .modal-card(v-show="displayModal")
        header.modal-card-head(v-if="title")
          p.modal-card-title {{ title }}

        section.modal-card-body(:class="{ 'is-titleless': !title, 'is-flex': hasIcon }")
          span.is-large.custom-icon(v-if="icon && hasIcon")
            i.fa.fa-fw(:class="['fa-' + icon, 'is-' + type]")
          p(v-html="message")

        footer.modal-card-foot
          button.button.is-grey(ref="cancelButton" @click.prevent="cancel" v-if="canCancel") {{ cancelText }}
          button.button(ref="confirmButton" :class="'is-' + buttonType" @click.prevent="confirm") {{ confirmText }}
</template>

<script>
export default {
  name: 'AppDialog',

  props: {
    title: String,
    message: String,
    hasIcon: Boolean,
    type: {
      type: String,
      default: 'primary',
    },
    buttonType: {
      type: String,
      default: 'primary',
    },
    confirmText: {
      type: String,
      default: '确定',
    },
    cancelText: {
      type: String,
      default: '取消',
    },
    canCancel: {
      type: Boolean,
      default: true,
    },
    hasInput: Boolean,
    inputPlaceholder: String,
    inputName: String,
    inputMaxlength: [Number, String],
    onConfirm: {
      type: Function,
      default: () => {},
    },
    onCancel: {
      type: Function,
      default: () => {},
    },
  },

  data () {
    return {
      isActive: true,
      displayModal: false,
      prompt: '',
    }
  },

  computed: {
    icon () {
      switch (this.type) {
        case 'info':
          return 'info-circle'
        case 'success':
          return 'check-circle'
        case 'warning':
          return 'exclamation-circle'
        case 'danger':
          return 'times-circle'
        default:
          return null
      }
    },
  },

  methods: {
    confirm () {
      this.onConfirm()
      this.toggle(false)
    },

    cancel () {
      if (!this.canCancel) return
      this.onCancel()
      this.toggle(false)
    },

    keyPress (event) {
      // Esc key
      if (event.keyCode === 27) {
        this.cancel()
      }
    },

    toggle (val) {
      if (typeof val !== 'boolean') {
        val = this.isActive
      }

      if (val) {
        this.isActive = true
        setTimeout(() => {
          this.displayModal = true
        }, 5)
      } else {
        this.displayModal = false
      }
    },

    remove () {
      this.isActive = false
      this.$destroy()
      this.$el.remove()
    },
  },

  created () {
    if (typeof window !== 'undefined') {
      document.addEventListener('keyup', this.keyPress)
    }
  },

  beforeMount () {
    // Insert the Dialog component in body tag
    document.body.appendChild(this.$el)
  },

  mounted () {
    // Handle which element receives focus
    this.toggle()
    if (this.hasInput) {
      this.$refs.input.$refs.input.focus()
    } else if (this.canCancel) {
      this.$refs.cancelButton.focus()
    } else {
      this.$refs.confirmButton.focus()
    }
  },

  beforeDestroy () {
    if (typeof window !== 'undefined') {
      document.removeEventListener('keyup', this.keyPress)
    }
  },
}
</script>
