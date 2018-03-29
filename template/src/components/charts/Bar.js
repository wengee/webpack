import Chart, { Bar } from 'vue-chartjs'

export default Bar.extend({
  props: {
    labels: Array,
    datasets: Array,
  },

  methods: {
    updateChart () {
      this.renderChart({
        labels: this.labels,
        datasets: this.datasets,
      })
    },
  },

  watch: {
    labels (val) {
      this.updateChart()
    },

    datasets (val) {
      this.updateChart()
    },
  },

  mounted () {
    this.updateChart()
  },
})
