import Vue from 'vue'
import Notification from './Notification'

function open (propsData) {
  const NotificationComponent = Vue.extend(Notification)
  return new NotificationComponent({
    el: document.createElement('div'),
    propsData,
  })
}

export default {
  open (params) {
    return open(params)
  },

  info (params) {
    if (typeof params === 'string') {
      params = { content: params }
    }
    const propsData = Object.assign({ color: 'info' }, params)
    return open(propsData)
  },

  warning (params) {
    if (typeof params === 'string') {
      params = { content: params }
    }
    const propsData = Object.assign({ color: 'warning' }, params)
    return open(propsData)
  },

  success (params) {
    if (typeof params === 'string') {
      params = { content: params }
    }
    const propsData = Object.assign({ color: 'success' }, params)
    return open(propsData)
  },

  error (params) {
    if (typeof params === 'string') {
      params = { content: params }
    }
    const propsData = Object.assign({ color: 'danger' }, params)
    return open(propsData)
  },
}

export { Notification }
