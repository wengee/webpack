<template>
  <div class="app-aside">
    <div class="transparent-back" v-show="visible" @click.stop="close"></div>
    <transition name="bounceRight">
      <div v-show="visible" class="right-aside" :style="{ width: myWidth, height: myHeight }">
        <div class="aside-header">
          <a href="#" @click.prevent="close" class="aside-close">&times;</a>
          <slot name="title"><h3>{{ title }}</h3></slot>
        </div>

        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AppAside',

  data () {
    return {
      visible: false,
    }
  },

  props: {
    value: null,
    title: {
      type: String,
      default: '温馨提示',
    },
    width: {
      type: [Number, String],
      default: 640,
    },
  },

  computed: {
    ...mapState({
      contentWidth: 'contentWidth',
      contentHeight: 'contentHeight',
    }),

    myWidth () {
      if (typeof this.width === 'number') {
        if (this.width > 1) {
          return Math.min(this.width, this.contentWidth) + 'px'
        } else if (this.width > 0) {
          return parseInt(this.contentWidth * this.width) + 'px'
        } else {
          return '640px'
        }
      } else {
        return this.width
      }
    },

    myHeight () {
      return this.contentHeight + 'px'
    },
  },

  watch: {
    value (val) {
      if (val) {
        this.open()
      }
    },
  },

  methods: {
    open () {
      this.visible = true
      this.$emit('opened')
    },

    close () {
      this.visible = false
      this.$emit('closed')
    },
  },

  mounted () {
    // document.querySelector('body').appendChild(this.$el)
    if (this.value) {
      this.open()
    }
  },
}
</script>
