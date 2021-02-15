/*
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: -1,
      avatar: '',
      email: '',
      nickname: '管理员',
      username: '',
    }
  },
  mutations: {
    saveUser(state, user) {
      state.user = user
    },
    removeUser(state) {
      state.user = {
        id: -1,
        avatar: '',
        email: '',
        nickname: '管理员',
        username: '',
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
