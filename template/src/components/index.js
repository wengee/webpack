import Aside from './aside'
import Breadcrumb from './breadcrumb'
import Button from './button'
import { Checkbox, CheckboxGroup } from './checkbox'
import Datepicker from './datepicker'
import dialog from './dialog'
import Form from './form'
import FormItem from './form-item'
import Icon from './icon'
import Input from './input'
import Modal from './modal'
import notification from './notification'
import { Pagination, Paginator } from './pagination'
import { Option, Select } from './select'
import Switch from './switch'
import { Tabs, TabPane } from './tab'
import { Table, TableColumn } from './table'
import Tag from './tag'
import Uploader from './uploader'
import Widget from './widget'
import WxLogin from './wx-login'

// import * as charts from './charts'

const components = [
  Aside,
  Breadcrumb,
  Button,
  Checkbox,
  CheckboxGroup,
  Datepicker,
  Form,
  FormItem,
  Icon,
  Input,
  Modal,
  Option,
  Pagination,
  Paginator,
  Select,
  Switch,
  Tabs,
  TabPane,
  Table,
  TableColumn,
  Tag,
  Uploader,
  Widget,
  WxLogin,
]

export default {
  install (Vue) {
    components.map(component => {
      Vue.component(component.name, component)
    })

    // for (let name in charts) {
    //   Vue.component(name, charts[name])
    // }

    Vue.prototype.$dialog = dialog
    Vue.prototype.$message = notification

    Vue.prototype.$showError = function (error) {
      if (Array.isArray(error)) {
        for (let err of error) {
          if (err.msg) {
            this.$showError(err.msg)
          }
        }
      } else {
        this.$message.error(error)
      }
    }
  },
}
