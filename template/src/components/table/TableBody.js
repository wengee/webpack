export default {
  name: 'AppTableBody',

  props: {
    data: Array,
  },

  data () {
    return {
      classes: {
        'left': 'has-text-left',
        'right': 'has-text-right',
        'center': 'has-text-centered',
      },
    }
  },

  computed: {
    cols () {
      return this.$parent.columns
    },

    children () {
      return this.$parent.children
    },

    childrenField () {
      return this.$parent.childrenField
    },
  },

  methods: {
    renderRow (h, row) {
      let childrenNodes = []
      if (this.children) {
        let field = this.$parent.childrenField
        let children = row[field] || []
        if (children && children.length > 0) {
          childrenNodes = children.map(r => {
            return this.renderRow(h, r)
          })
        }
      }

      return [h('tr', this.cols.map(column => {
        return h('td', {
          class: [column.align ? this.classes[column.align] : null, column.class],
        }, [
          column.renderCell.call(this._renderProxy, h, { row, column }),
        ])
      }))].concat(childrenNodes)
    },
  },

  render (h) {
    return h('tbody', this.data.map(row => {
      return this.renderRow(h, row)
    }))
  },
}
