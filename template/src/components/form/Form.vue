<template lang="pug">
  form(:action="url" :method="method" @submit.prevent="submit" ref="appForm")
    slot
</template>

<script>
export default {
  name: 'AppForm',

  props: {
    url: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      default: 'post',
    },
    autoError: {
      type: [String, Boolean],
      default: 'toast',
    },
    model: null,
    callback: Function,
  },

  methods: {
    showError (error) {
      if (Array.isArray(error)) {
        for (let err of error) {
          if (err.message) {
            this.showError(err.message)
            break
          }
        }
      } else if (error && this.autoError !== false) {
        this.$message.error(error)
      }
    },

    submit () {
      let req
      if (this.method.toLowerCase() === 'post') {
        req = this.axios.post(this.url, this.model)
      } else {
        req = this.axios.get(this.url, {
          params: this.model,
        })
      }

      req.then(res => {
        if (res.data.errcode === 0) {
          if (res.data.errmsg && this.autoError !== false) {
            this.$message.success(res.data.errmsg)
          }
        } else {
          this.showError(res.data.errmsg || res.data.errors)
        }

        let callback = this.callback
        if (typeof callback === 'function') {
          callback(res.data)
        } else {
          return true
        }
      }).catch(err => {
        console.error(err)
        this.$message.warning('接口异常，请联系管理员')
      })
    },
  },
}
</script>
