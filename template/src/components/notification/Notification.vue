<template>
  <transition :name="transitionName">
    <div class="notification" :class="color ? 'is-' + color : ''" v-show="isShow">
      <button class="delete" v-if="closable" @click="handleClose"></button>
      <slot>
        <div class="notification-content" v-html="content"></div>
      </slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BulNotification',

  data () {
    return {
      isShow: false,
      placementTransition: {
        'top-right': 'fadeRight',
        'top-center': 'fadeDown',
        'top-left': 'fadeLeft',
        'bottom-right': 'fadeRight',
        'bottom-center': 'fadeUp',
        'bottom-left': 'fadeLeft',
      },
    }
  },

  beforeMount () {
    let parent = document.querySelector(`.notifications.${this.placement}`)
    if (!parent) {
      parent = document.createElement('div')
      parent.classList.add('notifications', this.placement)
      document.body.appendChild(parent)
    }
    parent.appendChild(this.$el)
  },

  mounted () {
    this.isShow = true
    this.timer = setTimeout(() => this.close(), this.duration)
  },

  computed: {
    transitionName () {
      if (this.transition) return this.transition
      return this.placementTransition[this.placement]
    },
  },

  methods: {
    handleClose () {
      this.isShow = false
      setTimeout(() => this.close(), 100)
    },

    close () {
      clearTimeout(this.timer)
      this.isShow = false
      this.$destroy()
      this.$el.remove()
    },
  },

  props: {
    color: String,
    content: null,
    closable: {
      type: Boolean,
      default: true,
    },
    duration: {
      type: Number,
      default: 3000,
    },
    placement: {
      type: String,
      default: 'top-center',
    },
    transition: String,
  },
}
</script>
