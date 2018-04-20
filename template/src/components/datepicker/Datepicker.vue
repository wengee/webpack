<template lang="pug">
  .datepicker
    .input-wrapper(@mouseenter="showCancel = true" @mouseleave="showCancel = false")
      .input(:class="{ 'is-placeholder': !formatedValue }" @click="toggleCalendar" v-text="formatedValue ? formatedValue : placeholder")
      transition(name="fade")
        span.cancel-btn(v-show="showCancel" @click="clear") &times;
    transition(name="toggle")
      .calendar(v-if="showCalendar")
        .calendar-hd.level
          .level-left
            a.level-item.preview-btn(href="#" @click.prevent="changePage('prev')")
              app-icon(icon="chevron-left")

          span.level-item.is-1(v-show="panelType === 'year'") {{ tmpYear }} - {{ tmpYear2 }}

          a.level-item.is-1.change-btn(href="#" v-show="panelType !== 'year'" @click.prevent="togglePanel('year')") {{ tmpYear }}
          a.level-item.is-1.change-btn(href="#" v-show="panelType !== 'year'" @click.prevent="togglePanel('month')") {{ tmpMonth | month(language) }}

          .level-right
            a.level-item.preview-btn(href="#" @click.prevent="changePage('next')")
              app-icon(icon="chevron-right")

        .calendar-bd.type-date(v-show="panelType === 'date'")
          .is-clearfix
            span.is-pulled-left.has-text-centered(v-for="weekday in weekList") {{ weekday | week(language) }}
            a.is-pulled-left.has-text-centered(:class="{ 'is-prev': d.previousMonth, 'is-next': d.nextMonth, 'is-active': isCurrentDate(d.item), 'is-today': isToday(d.item) }" v-for="d in dateList" @click.prevent="selectDate(d.item)") {{ d.value }}

        .calendar-hd.type-month(v-show="panelType === 'month'")
          .is-clearfix
            a.is-pulled-left.has-text-centered(v-for="m in monthList" @click.prevent="changeMonth(m)") {{ m | month(language) }}

        .calendar-hd.type-year(v-show="panelType === 'year'")
          .is-clearfix
            a.is-pulled-left.has-text-centered(v-for="y in yearList" @click.prevent="changeYear(y)") {{ y }}

</template>

<script>
export default {
  name: 'AppDatepicker',

  props: {
    value: [String, Array],
    format: {
      type: String,
      default: 'YYYY-MM-DD',
    },
    range: {
      type: Boolean,
      default: false,
    },
    language: {
      type: String,
      default: 'zh',
    },
    placeholder: {
      type: String,
      default: '请选择时间',
    },
  },

  data () {
    let now = new Date()

    return {
      today: now,
      showCancel: false,
      showCalendar: false,
      panelType: 'date',
      tmpYear: now.getFullYear(),
      tmpMonth: now.getMonth() + 1,
      tmpDate: now.getDate(),
      monthList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      weekList: [0, 1, 2, 3, 4, 5, 6],
      newValue: [],
    }
  },

  computed: {
    tmpYear2 () {
      return this.tmpYear + 11
    },

    formatedValue () {
      if (!this.value) {
        return null
      }

      if (this.range) {
        if (this.value[0]) {
          let startDate = this.formatDate(this.value[0])
          let endDate = this.formatDate(this.value[1])

          return (!endDate || startDate === endDate) ? startDate : [startDate, endDate].join(' -- ')
        } else {
          return null
        }
      } else {
        return this.formatDate(this.value)
      }
    },

    yearList () {
      return Array.from({length: 12}, (value, index) => this.tmpYear + index)
    },

    dateList () {
      let monthDays = new Date(this.tmpYear, this.tmpMonth, 0).getDate()
      let dateList = Array.from({length: monthDays}, (val, index) => {
        return {
          currentMonth: true,
          value: index + 1,
          item: [this.tmpYear, this.tmpMonth, index + 1],
        }
      })

      let startDay = new Date(this.tmpYear, this.tmpMonth - 1, 1).getDay()
      let previousMongthDays = new Date(this.tmpYear, this.tmpMonth - 1, 0).getDate()
      for (let i = 0, len = startDay; i < len; i++) {
        let date = previousMongthDays - i
        dateList = [{ previousMonth: true, value: date, item: [this.tmpYear, this.tmpMonth - 1, date] }].concat(dateList)
      }

      for (let i = dateList.length, date = 1; i < 42; i++, date++) {
        dateList[dateList.length] = { nextMonth: true, value: date, item: [this.tmpYear, this.tmpMonth + 1, date] }
      }

      return dateList
    },
  },

  methods: {
    setTmpTime (value) {
      value = this.dateObj(value)
      if (value) {
        this.tmpYear = value.getFullYear()
        this.tmpMonth = value.getMonth() + 1
        this.tmpDate = value.getDate()
      }
    },

    isToday (value) {
      let valueTime = this.dateObj(value)
      let today = this.today
      return today.getFullYear() === valueTime.getFullYear() && today.getMonth() === valueTime.getMonth() && today.getDate() === valueTime.getDate()
    },

    isCurrentDate (value) {
      let fmt = 'YYYY-MM-DD'
      value = this.formatDate(value, fmt)
      if (this.range) {
        let r = this.value || []
        if (r) {
          let value0 = this.formatDate(r[0], fmt)
          let value1 = this.formatDate(r[1], fmt)
          value1 = value1 || value0
          return value >= value0 && value <= value1
        }
      } else {
        return this.formatDate(this.value, fmt) === value
      }
    },

    clear () {
      this.$emit('input', null)
      this.setTmpTime(this.today)
    },

    close (e) {
      if (!this.$el.contains(e.target)) {
        this.showCalendar = false
        this.newValue = []
      }
    },

    toggleCalendar () {
      this.showCalendar = !this.showCalendar
    },

    togglePanel (t) {
      this.panelType = t
    },

    changeYear (y) {
      this.tmpYear = y
      this.togglePanel('month')
    },

    changeMonth (n) {
      if (typeof n === 'number') {
        if (n >= 1 && n <= 12) {
          this.tmpMonth = n
        }
        this.togglePanel('date')
      } else if (n === 'prev') {
        this.tmpMonth -= 1
      } else if (n === 'next') {
        this.tmpMonth += 1
      }

      if (this.tmpMonth < 1) {
        this.tmpYear -= 1
        this.tmpMonth = 12
      } else if (this.tmpMonth > 12) {
        this.tmpYear += 1
        this.tmpMonth = 1
      }
    },

    changePage (p) {
      if (this.panelType === 'year') {
        if (p === 'prev') {
          this.tmpYear -= 12
        } else if (p === 'next') {
          this.tmpYear += 12
        }
      } else if (this.panelType !== 'month') {
        this.changeMonth(p)
      }
    },

    selectDate (value) {
      value = this.formatDate(value)
      if (this.range) {
        if (this.newValue[0]) {
          if (this.newValue[0] !== value) {
            this.newValue.push(value)
            this.newValue.sort()
          }
          this.$emit('input', this.newValue)
          this.setTmpTime(this.newValue[0])
          this.newValue = []
          this.showCalendar = false
        } else {
          this.newValue = [value]
          this.$emit('input', this.newValue)
        }
      } else {
        this.$emit('input', value)
        this.showCalendar = false
      }
    },

    dateObj (value) {
      if (!value) {
        return null
      } else if (Array.isArray(value)) {
        value = new Date(value[0], value[1] - 1, value[2])
      } else if (!(value instanceof Date)) {
        value = new Date(value)
      }

      return value
    },

    formatDate (value, fmt) {
      if (!value) {
        return null
      } else {
        value = this.dateObj(value)
      }

      let o = {
        'M+': value.getMonth() + 1,
        'D+': value.getDate(),
        'H+': value.getHours(),
        'm+': value.getMinutes(),
        's+': value.getSeconds(),
        'q+': Math.floor((value.getMonth() + 3) / 3),
        'S': value.getMilliseconds(),
      }

      fmt = fmt || this.format
      if (/(Y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (value.getFullYear() + '').substr(4 - RegExp.$1.length))
      }

      for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
        }
      }

      return fmt
    },
  },

  filters: {
    week: (item, lang) => {
      switch (lang) {
        case 'en':
          return {0: 'Su', 1: 'Mo', 2: 'Tu', 3: 'We', 4: 'Th', 5: 'Fr', 6: 'Sa'}[item]
        case 'zh':
          return {0: '日', 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六'}[item]
        default:
          return item
      }
    },

    month: (item, lang) => {
      switch (lang) {
        case 'en':
          return {1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec'}[item]
        case 'zh':
          return {1: '一月', 2: '二月', 3: '三月', 4: '四月', 5: '五月', 6: '六月', 7: '七月', 8: '八月', 9: '九月', 10: '十月', 11: '十一月', 12: '十二月'}[item]
        default:
          return item
      }
    },
  },

  mounted () {
    this.$nextTick(() => {
      window.addEventListener('click', this.close)
    })
  },

  beforeDestroy () {
    window.removeEventListener('click', this.close)
  },
}
</script>
