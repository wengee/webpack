<template lang="pug">
  .uploader(:style="autoStyle" @mouseenter="hover = true" @mouseleave="hover = false")
    template(v-if="preview")
      .preview
        img(:src="fileUrl" :style="autoStyle" v-if="fileUrl")
        .default-image(v-else)
          img(src="../../assets/no-image.png" :style="autoStyle" v-if="placeholder === true")
          span(v-html="placeholder" :style="previewStyle" v-else-if="placeholder")

      .columns.is-gapless.btns(:style="autoStyle" v-show="hover")
        span.column.btn-upload
          app-icon(icon="upload" fixed)
          form(:action="uploadUrl" method="post" enctype="multipart/form-data" :target="uploadTarget" ref="uploadForm")
            input(type="file" :name="fieldName" :accept="accept" @change="startUpload" ref="uploadControl")

        a.column.btn-remove(href="#" @click.prevent="clear" v-if="clearable && myValue")
          app-icon(icon="trash-o" fixed)

    .field.has-addons.is-marginless(v-else)
      p.control.is-expanded
        input.input(type="text" :placeholder="placeholder === true ? '请上传文件' : placeholder" :value="fileUrl" :readonly="readonly")
      p.control
        span.button.btn-upload
          app-icon(icon="upload" fixed)
          span(v-html="buttonText" v-if="buttonText")
          form(:action="uploadUrl" method="post" enctype="multipart/form-data" :target="uploadTarget" ref="uploadForm")
            input(type="file" :name="fieldName" :accept="accept" @change="startUpload" ref="uploadControl")

    iframe(:id="uploadTarget" :name="uploadTarget" @load="completeUpload" ref="uploadRes")
</template>

<script>
export default {
  name: 'AppUploader',

  props: {
    preview: {
      type: Boolean,
      default: true,
    },
    useName: {
      type: Boolean,
      default: false,
    },
    buttonText: {
      type: String,
      default: null,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    url: {
      type: String,
      default: '/api/upload/',
    },
    fieldName: {
      type: String,
      default: 'uploadFile',
    },
    accept: {
      type: String,
      default: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
    },
    postData: null,
    width: {
      type: [String, Number],
      default: 140,
    },
    height: {
      type: [String, Number],
      default: 140,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    value: String,
    placeholder: {
      type: [String, Boolean],
      default: true,
    },
    csrf: {
      type: String,
      default: null,
    },
    csrfToken: {
      type: String,
      default: 'csrfToken',
    },
  },

  data () {
    return {
      hover: false,
      myValue: null,
    }
  },

  computed: {
    autoStyle () {
      if (!this.preview) {
        return null
      }

      let width = this.width
      let height = this.height

      if (typeof width === 'number') {
        width = width + 'px'
      }

      if (typeof height === 'number') {
        height = height + 'px'
      }

      return { width, height }
    },

    previewStyle () {
      let styles = this.autoStyle
      styles['line-height'] = styles.height
      styles['text-align'] = 'center'
      styles['display'] = 'block'
      styles['color'] = '#ccc'
      styles['font-size'] = '1.5em'
      return styles
    },

    uploadTarget () {
      return 'uploadForm' + this._uid
    },

    uploadUrl () {
      if (this.csrf) {
        let csrfToken = this.$cookies.get(this.csrfToken)
        return this.url + '?' + this.csrf + '=' + csrfToken
      } else {
        return this.url
      }
    },

    fileUrl () {
      return this.myValue || this.value
    },
  },

  methods: {
    startUpload (e) {
      if (e.target.value) {
        this.$refs.uploadForm.submit()
      }
    },

    completeUpload () {
      let iFrame = this.$refs.uploadRes
      let resStr = iFrame.contentWindow.document.body.innerText
      let res = resStr ? JSON.parse(resStr) : null
      if (res) {
        if (res.errcode === 0) {
          if (this.useName) {
            this.myValue = res.attachment.name
          } else {
            this.myValue = res.attachment.url
          }

          this.$emit('change', res.attachment)
          this.$emit('input', this.myValue)
        } else {
          this.$message.error(res.errmsg || '上传失败')
        }
      }
      this.$refs.uploadControl.value = null
    },

    clear () {
      if (this.clearable) {
        this.myValue = null
        this.$emit('input', null)
        this.$emit('change', null)
      }
    },
  },

  watch: {
    value (val) {
      this.myValue = this.value
    },
  },

  mounted () {
    this.myValue = this.value
  },
}
</script>
