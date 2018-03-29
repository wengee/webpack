<template lang="pug">
  nav.pagination(:class="size ? 'is-' + size : null")
    ul.pagination-list
      li(v-for="page in pages")
        span.pagination-ellipsis(v-if="page === false") &hellip;
        a.pagination-link(:class="{ 'is-current': page === currentPageNum }" @click.prevent="handleChangePage(page)" v-else) {{ page }}
</template>

<script>
export default {
  name: 'AppPagination',

  data () {
    return {
      currentPageNum: this.currentPage,
    }
  },

  props: {
    size: String,
    pageSize: {
      type: Number,
      default: 10,
    },
    total: Number,
    pageCount: Number,
    currentPage: {
      type: Number,
      default: 1,
    },
  },

  methods: {
    handleChangePage (page) {
      if (this.currentPageNum !== page) {
        this.currentPageNum = page
        this.$emit('change', page)
      }
    },
  },

  watch: {
    currentPage (val) {
      this.currentPageNum = val
    },
  },

  computed: {
    totalPages () {
      if (this.pageCount) {
        return this.pageCount
      } else {
        return Math.ceil(this.total / this.pageSize)
      }
    },

    pages () {
      let last = 0
      let totalPages = this.totalPages
      let currentPage = Math.min(totalPages, Math.max(1, this.currentPage))
      let result = []
      for (let i = 1; i <= totalPages; i++) {
        if (i <= 2 || (i > currentPage - 2 && i < currentPage + 4) || i > totalPages - 2) {
          if (last + 1 !== i) {
            result.push(false)
          }

          result.push(i)
          last = i
        }
      }

      return result
    },
  },
}
</script>
