// vuex插件的安装
import Vue from 'vue'
import Vuex from 'vuex'
import Address from 'js/addressService.js'
Vue.use(Vuex)
// 创建store实例
const store = new Vuex.Store({
  state: {
    lists: null
  },
  mutations: {
    init(state, lists) {
      state.lists = lists
    },
    add(state, instance) {
      state.lists.push(instance)
    },
    remove(state, id) {
      let index = state.lists.findIndex(item => {
        return item.id === id
      })
      state.lists.splice(index, 1)
    },
    update(state, instance) {
      let index = state.lists.findIndex(item => {
        return item.id === id
      })
      state.lists[index] = instance
    },
    setDefault(state, id) {
      state.lists.forEach(element => {
        element.isDefalut = element.id === id ? true : false;
      });
    }
  },
  actions: {
    getLists({
      commit
    }) {
      Address.list().then(res => {
        commit('init', res.data.lists)
      })
    },
    addAction({
      commit
    }, instance) {
      Address.add(instance).then(res => {
        commit('add', instance)
      })
    },
    removeAction({
      commit
    }, id) {
      Address.remove(id).then(res => {
        commit('remove', id)
      })
    },
    updateAction({
      commit
    }, instance) {
      Address.update(instance).then(res => {
        commit('update', instance)
      })
    },
    setDefaultAction({
      commit
    }, id) {
      Address.setDefault(id).then(res => {
        commit('setDefault', id)
      })
    }
  }
})

export default store
