<template lang="pug">
  .bul-table.gap-bottom-m
    slot

    table.table(:class="{ 'is-bordered': bordered, 'is-striped': striped, 'is-narrow': narrowed, 'has-mobile-cards': mobileCards, 'is-fullwidth': fullWidth, 'is-hoverable': hoverable }")
      thead
        tr
          th(v-for="(column, index) in columns" :key="index"
            :class="[column.headerAlign ? alignClasses[column.headerAlign] : null]"
            :style="{ width: column.width }")
            span.th-wrap {{ column.label }}

      tbody(v-if="loading")
        tr
          td.loading(:colspan="columns.length")
            i.fa.fa-spinner.fa-spin.fa-fw
            | {{ loadingText }}

      table-body(:data="data" :showIndex="false" v-else-if="data && data.length > 0")

      tbody(v-else)
        tr
          td.no-data(:colspan="columns.length")
            span {{ emptyText }}

    .header-right(v-if="showHeader")
      slot(name="header")
</template>

<script>
import TableBody from './TableBody'

export default {
  name: 'AppTable',

  props: {
    bordered: Boolean,
    striped: Boolean,
    narrowed: Boolean,
    mobileCards: Boolean,
    fullWidth: {
      type: Boolean,
      default: true,
    },
    hoverable: {
      type: Boolean,
      default: true,
    },
    data: Array,
    emptyText: {
      type: String,
      default: '暂无数据',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    loadingText: {
      type: String,
      default: '数据加载中...',
    },
    children: {
      type: Boolean,
      default: false,
    },
    childrenField: {
      type: String,
      default: 'children',
    },
  },

  data () {
    return {
      columns: [],
      alignClasses: {
        'left': 'has-text-left',
        'right': 'has-text-right',
        'center': 'has-text-centered',
      },
    }
  },

  components: { TableBody },

  computed: {
    showHeader () {
      return this.$slots.header
    },
  },
}
</script>
