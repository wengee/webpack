<template>
  <span class="district-selector">
    <el-cascader
      :options="options2"
      @active-item-change="handleItemChange"
      :props="props"
    ></el-cascader>

    <el-select
      v-for="(label, index) in levels"
      :key="label"
      v-if="index <= level - 1 && (index === 0 || (value[index - 1] && list[index] && list[index].length > 0))"
      style="width:120px;"
      :style="{ 'margin-left': index ? '10px' : '' }"
      v-model="value[index]"
      :placeholder="label"
      @change="(n) => changeValue(index, n)"
      @visible-change="(n) => changeVisible(index, n)"
      :size="size"
      clearable
    >
      <el-option
        v-for="item in list[index]"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      ></el-option>
    </el-select>
  </span>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'AppDistrict',

  data () {
    return {
      levels: ['省', '市', '区'],
      list: [],
      visibled: false,
    }
  },

  props: {
    value: {
      type: Array,
      default () {
        return []
      },
    },
    level: {
      type: Number,
      default: 3,
    },
    size: String,
  },

  computed: {
    ...mapState({
      districts: 'districts',
    }),
  },

  methods: {
    ...mapMutations(['setDistricts']),

    fetchDistrict (index = 0, parentId = 0) {
      if (index === 0) {
        return this.districts[0] || []
      } else {
        let list = this.districts[index] || {}
        return list[parentId] || []
      }
    },

    fetchData (index = 0, parentId = 0) {
      parentId = parentId || 0
      if (this.districts.length === 0) {
        this.axios.get('/api/district/').then(res => {
          if (res.data.errcode === 0) {
            this.setDistricts(res.data.data)

            let districtData = this.fetchDistrict(index, parentId)
            this.list = this.list.slice(0, index)
            this.list.push(districtData)
          } else {
            this.$message.error(res.data.errmsg || '无法加载数据')
          }
        })
      } else {
        let districtData = this.fetchDistrict(index, parentId)
        this.list = this.list.slice(0, index)
        this.list.push(districtData)
      }
    },

    changeValue (index, n) {
      let value
      if (this.visibled) {
        value = this.value.slice(0, index + 1)
        this.visibled = false

        if (index <= this.level - 1) {
          this.fetchData(index + 1, n)
        }
        value = value.filter(v => v)
        value.$data = value.map((v, i) => {
          let l = this.list[i] || []
          return l.filter(vv => vv.id === v).pop()
        })
        this.$emit('input', value)
      }
    },

    changeVisible (index, n) {
      this.visibled = true
    },

    initialize () {
      this.fetchData()
      for (let i = 0; i < Math.min(this.value.length, this.level) - 1; i++) {
        let parentId = this.value[i]
        parentId && this.fetchData(i + 1, parentId)
      }
    },
  },

  watch: {
    value (val) {
      if (!this.visibled) {
        this.initialize()
      }
    },
  },

  created () {
    this.initialize()
  },
}
</script>
