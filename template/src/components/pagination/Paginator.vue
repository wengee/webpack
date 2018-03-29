<template lang="pug">
  .datalist
    slot(name="header")

    app-table(:data="pagination.items" :bordered="false" :mobile-cards="true" :paginated="false" v-if="useTable" :loading="dataLoading")
      slot

    .data-list.is-clearfix(v-else)
      template(v-if="pagination.items && pagination.items.length > 0")
        .data-item.is-clearfix(:class="['row-' + Math.ceil((index + 1) / 5), 'col-' + (index % 5 + 1)]" v-for="(row, index) in pagination.items" :key="row")
          slot(:row="row")
      .no-data(v-else) 暂无数据

    .pagination-container.is-clearfix.gap-top-m
      .is-pulled-left
        slot(name="pagination")

      pagination.is-pulled-right.is-clearfix(
        :total="pagination.totalItems"
        :current-page="pagination.current"
        :page-size="pagination.limit"
        @change="handleCurrentChange"
        v-if="pagination.totalItems > 0")
</template>

<script>
import Pagination from './Pagination'

export default {
  name: 'AppPaginator',

  data () {
    return {
      dataLoading: false,
      pagination: {
        rows: [],
      },
      currentPage: 1,
      lastReload: null,
    }
  },

  components: { Pagination },

  props: {
    url: {
      type: String,
      required: true,
    },
    page: {
      type: Number,
      default: 1,
    },
    method: {
      type: String,
      default: 'get',
    },
    queryData: {
      type: Object,
      default () {
        return {}
      },
    },
    pagerSmall: {
      type: Boolean,
      default: false,
    },
    useTable: {
      type: Boolean,
      default: true,
    },
  },

  methods: {
    handleCurrentChange (page) {
      if (this.currentPage !== page) {
        this.currentPage = Math.max(page, 1)
        this.reload()
      }
    },

    reload (page) {
      this.dataLoading = true
      let req
      let queryData = Object.assign({}, this.queryData || {})
      this.currentPage = page || this.currentPage
      queryData.page = this.currentPage
      if (this.method.toLowerCase() === 'post') {
        req = this.axios.post(this.url, queryData)
      } else {
        req = this.axios.get(this.url, {
          params: queryData,
        })
      }

      req.then(res => {
        this.dataLoading = false
        if (res.data.errcode === 0) {
          this.pagination = res.data.pagination || { rows: [] }
          this.$emit('reload', res.data)
        } else {
          this.$message.error(res.data.errmsg || '出错啦！')
        }
      }).catch((err) => {
        console.error(err)
        this.dataLoading = false
        this.$message.error('接口异常，请联系管理员')
      })
    },

    rowClick (row, event, column) {
      this.$emit('row-click', row, event, column)
    },
  },

  watch: {
    queryData (val) {
      this.currentPage = 1
      this.reload()
    },
  },

  mounted () {
    this.currentPage = this.page
    this.reload()
  },
}
</script>
