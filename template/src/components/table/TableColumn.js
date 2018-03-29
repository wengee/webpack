export default {
  name: 'AppTableColumn',

  props: {
    label: String,
    width: [String, Number],
    headerAlign: String,
    align: String,
    field: String,
  },

  data () {
    return {
      column: {},
    }
  },

  created () {
    let columnWidth = typeof this.width === 'number' ? this.width + 'px' : this.width
    this.column = {
      label: this.label,
      width: columnWidth,
      headerAlign: this.headerAlign,
      align: this.align,
      field: this.field,
    }

    this.column.renderCell = (h, { row, column }) => {
      if (this.$scopedSlots.default) {
        return this.$scopedSlots.default({ row })
      }

      return row[column.field]
    }
  },

  mounted () {
    this.$parent.columns.push(this.column)
  },

  render (h) {
    return null
  },
}
