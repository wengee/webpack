import Vue from 'vue'
import Dialog from './Dialog'

function open (propsData) {
  const DialogComponent = Vue.extend(Dialog)
  return new DialogComponent({
    el: document.createElement('div'),
    propsData,
  })
}

export default {
  alert (params) {
    if (typeof params === 'string') {
      params = { message: params, type: 'warning', hasIcon: true }
    }

    const defaultParam = {
      canCancel: false,
    }
    const propsData = Object.assign(defaultParam, params)
    return open(propsData)
  },

  confirm (params) {
    if (typeof params === 'string') {
      params = { message: params, type: 'info', hasIcon: true }
    }

    const defaultParam = {}
    const propsData = Object.assign(defaultParam, params)
    return open(propsData)
  },

  prompt (params) {
    if (typeof params === 'string') {
      params = { message: params }
    }

    const defaultParam = {
      hasInput: true,
      confirmText: 'Done',
    }
    const propsData = Object.assign(defaultParam, params)
    return open(propsData)
  },
}
