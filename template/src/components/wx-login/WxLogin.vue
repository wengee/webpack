<template lang="pug">
  iframe(:src="loginUrl" frameBorder="0" allowTransparency="true" scrolling="no" :width="width" :height="height")
</template>

<script>
export default {
  name: 'AppWxLogin',

  props: {
    appId: String,
    scope: {
      type: String,
      default: 'snsapi_login',
    },
    redirectUrl: String,
    state: {
      type: String,
      default: '',
    },
    colorStyle: String,
    cssUrl: String,
    width: {
      type: [Number, String],
      default: 300,
    },
    height: {
      type: [Number, String],
      default: 400,
    },
  },

  computed: {
    loginUrl () {
      if (!this.appId || !this.redirectUrl) {
        return null
      }

      let url = 'https://open.weixin.qq.com/connect/qrconnect?appid=' + this.appId + '&scope=' + this.scope + '&redirect_uri=' + encodeURIComponent(this.redirectUrl) + '&state=' + this.state + '&login_type=jssdk'
      url += this.colorStyle ? '&style=' + this.colorStyle : ''
      url += this.cssUrl ? '&href=' + encodeURIComponent(this.cssUrl) : ''
      return url
    },
  },
}
</script>
